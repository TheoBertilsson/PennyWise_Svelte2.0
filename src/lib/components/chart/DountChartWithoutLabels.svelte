<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, type ChartConfiguration, type ChartData, type ChartOptions } from 'chart.js/auto';
	import type { Budget } from '../models/types';
	import { currentDateIntervall } from '../stores/budgetStores.svelte';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems }: Props = $props();
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
	// Define the data structure
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

	// Define chart options
	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		}
	};

	// Lifecycle hook
	onMount(() => {
		if (chartRef) {
			const config: ChartConfiguration<'doughnut'> = {
				type: 'doughnut',
				data,
				options
			};

			chart = new Chart(chartRef, config);
		}

		return () => {
			if (chart) {
				chart.destroy(); // Cleanup on unmount
				chart = null;
			}
		};
	});
</script>

<div class="chart-container relative max-h-60 max-w-60">
	<canvas bind:this={chartRef}></canvas>
</div>

<style>
</style>
