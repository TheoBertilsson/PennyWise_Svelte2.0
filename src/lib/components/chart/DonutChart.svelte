<script lang="ts">
	import { clickedChartInfo, currentDateIntervall } from '../stores/budgetStores.svelte';
	import { onMount } from 'svelte';
	import Chart, { type ChartConfiguration, type ChartData, type ChartOptions } from 'chart.js/auto';
	import type { Budget } from '../models/types';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems}: Props = $props();
	let chart: Chart<'doughnut', number[], unknown> | null = null;
	let chartRef: HTMLCanvasElement | null = null;

	const uniqueCategories = Array.from(new Set(budgetItems.map((item) => item.category)));
	const categorySums = uniqueCategories.map((category) => {
		return budgetItems
			.filter((item) => {
				if (item.category === category) {
					const createdDate = new Date(item.createdAt);
					if (item.dueDate) {
						const dueDate = new Date(item.dueDate);
						return dueDate >= currentDateIntervall.startDate && dueDate <= currentDateIntervall.endDate;
					} else {
						return createdDate >= currentDateIntervall.startDate && createdDate <= currentDateIntervall.endDate;
					}
				}
			})
			.reduce((sum, item) => (sum += item.price), 0);
	});

	const data: ChartData<'doughnut'> = {
		labels: uniqueCategories.map(
			(category) => category.charAt(0).toUpperCase() + category.slice(1)
		),
		datasets: [
			{
				data: categorySums
			}
		]
	};

	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top'
			}
		}
	};

	const handleClick = (event: MouseEvent) => {
		const points = chart?.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
		if (points?.length) {
			const firstPoint = points[0];
      if (!chart || !chart.data.labels) return;
			const label = chart?.data.labels[firstPoint.index] as string;
			const value = chart?.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
			clickedChartInfo.budgetCategory = label.toLowerCase();
			clickedChartInfo.budgetSum = value;
		} else {
			clickedChartInfo.budgetCategory = undefined;
			clickedChartInfo.budgetSum = undefined;
		}
	};

	onMount(() => {
		if (chartRef) {
			const config: ChartConfiguration<'doughnut'> = {
				type: 'doughnut',
				data,
				options
			};

			chart = new Chart(chartRef, config);
			chart.canvas.addEventListener('click', handleClick);
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});
</script>

<div class="chart-container max-w-[500px] max-h-[500px] min-h-[375px] relative">
	<canvas bind:this={chartRef} class="w-[350px] h-[350px]"></canvas>
</div>

<style>
</style>
