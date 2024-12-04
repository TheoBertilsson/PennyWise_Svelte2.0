<script lang="ts">
  import { clickedChartInfo } from '../stores/budgetStores.svelte';
  import { onMount } from 'svelte';
  import Chart, {type ChartConfiguration, type ChartData, type ChartOptions } from 'chart.js/auto';
	import type { Budget } from '../models/types';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems }: Props = $props();
  let chart: Chart<'doughnut', number[], unknown> | null = null;
  let chartRef: HTMLCanvasElement | null = null;

	const uniqueCategories = Array.from(new Set(budgetItems.map((item) => item.category)));
	const categorySums = uniqueCategories.map(category => {
		return budgetItems
			.filter(item => item.category === category)
			.reduce((sum, item) => sum += item.price, 0);
	});

  const data: ChartData<'doughnut'> = {
		labels: uniqueCategories.map(category => category.charAt(0).toUpperCase() + category.slice(1)),
    datasets: [
      {
        data: categorySums,
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
    const points = chart.getElementsAtEventForMode(event, "nearest", { intersect: true }, false);
    if (points.length) {
      const firstPoint = points[0];
      const label = chart.data.labels[firstPoint.index];
      const value = chart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
      clickedChartInfo.budgetCategory = label.toLowerCase();
      clickedChartInfo.budgetSum = value;
    }
    else {
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
      chart.canvas.addEventListener("click", handleClick);
    }

    return () => {
      if (chart) {
        chart.destroy();
        chart = null;
      }
    };
  });
</script>

<div class="chart-container">
  <canvas bind:this={chartRef}></canvas>
</div>
<style>
  .chart-container {
    width: 100%;
    height: 100%;
    max-width: 500px;
    max-height: 500px;
    min-height: 375px;
    position: relative;
  }
</style>
