<script lang="ts">
	import { clickedChartInfo, currentDateIntervall, budget } from '../stores/budgetStores.svelte';
	import { onMount } from 'svelte';
	import Chart, { type ChartConfiguration, type ChartOptions } from 'chart.js/auto';
	let chart: Chart<'doughnut', number[], unknown> | null = null;
	let chartRef: HTMLCanvasElement | null = null;

	function calculateChartData() {
		const uniqueCategories = Array.from(
			new Set(budget?.monthlyItems?.map((item) => item.category) || [])
		);
		const categorySums = uniqueCategories.map((category) => {
			return (budget?.monthlyItems || [])
				.filter((item) => {
					if (item.category === category) {
						const createdDate = new Date(item.createdAt);
						if (item.dueDate) {
							const dueDate = new Date(item.dueDate);
							return (
								dueDate >= (currentDateIntervall.startDate ?? new Date(0)) &&
								dueDate <= (currentDateIntervall.endDate ?? new Date())
							);
						} else {
							return (
								createdDate >= (currentDateIntervall.startDate ?? new Date(0)) &&
								createdDate <= (currentDateIntervall.endDate ?? new Date())
							);
						}
					}
				})
				.reduce((sum, item) => (sum += item.price), 0);
		});

		return {
			labels: uniqueCategories.map(
				(category) => category.charAt(0).toUpperCase() + category.slice(1)
			),
			datasets: [
				{
					data: categorySums
				}
			]
		};
	}

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
				data: calculateChartData(),
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
	$effect(() => {
		if (chart && budget?.monthlyItems) {
			const newData = calculateChartData();
			chart.data = newData;
			chart.update();
		}
	});
</script>

<div
	class="chart-container relative flex max-h-[500px] min-h-[320px] max-w-[500px] items-center justify-center"
>
	<canvas bind:this={chartRef} class="h-[320px] w-[320px]"></canvas>
</div>
