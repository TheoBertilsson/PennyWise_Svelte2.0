<script lang="ts">
	import { onMount } from 'svelte';
	import { Chart, type ChartConfiguration, type ChartData, type ChartOptions } from 'chart.js/auto';
	import { currentDateIntervall, monthlyBudgetItems } from '../stores/budgetStores.svelte';

	let chart: Chart<'doughnut', number[], unknown> | null = null;
	let chartRef: HTMLCanvasElement | null = null;

	function calculateChartData() {
		const uniqueCategories = Array.from(
			new Set(monthlyBudgetItems?.monthItems?.map((item) => item.category) || [])
		);
		const categorySums = uniqueCategories.map((category) => {
			return (monthlyBudgetItems?.monthItems || [])
				.filter((item) => {
					if (item.category === category) {
						const createdDate = new Date(item.createdAt);
						if (item.dueDate) {
							const dueDate = new Date(item.dueDate);
							return (
								dueDate >= currentDateIntervall.startDate && dueDate <= currentDateIntervall.endDate
							);
						} else {
							return (
								createdDate >= currentDateIntervall.startDate &&
								createdDate <= currentDateIntervall.endDate
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

	// Define chart options
	const options: ChartOptions<'doughnut'> = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
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
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});

	$effect(() => {
		if (chart && monthlyBudgetItems?.monthItems) {
			const newData = calculateChartData();
			chart.data = newData;
			chart.update();
		}
	});
</script>

<div class="chart-container relative max-h-60 max-w-60">
	<canvas bind:this={chartRef}></canvas>
</div>
