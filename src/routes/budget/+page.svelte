<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	import { clickedChartInfo, monthlyBudgetItems } from '$lib/components/stores/budgetStores.svelte';
	import BudgetItemsList from '$lib/components/AllBudgetList.svelte';
	import CategoryBudgetList from '$lib/components/CategoryBudgetList.svelte';
	import MonthSlider from '$lib/components/MonthSlider.svelte';
	import { setBudget } from '$lib/components/functions';
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';

	const { data }: { data: BudgetData } = $props();
	setBudget(data.budgetItems);
</script>

<main
	class="mb-16 flex h-full w-full max-w-screen-lg flex-col items-center justify-start gap-10 p-5"
>
	<div class="flex h-full w-full flex-col items-center justify-between gap-6">
		<MonthSlider />
		{#if data.budgetItems.length === 0}
			<span class="p-8 text-center text-lg"
				>This months budget is empty, add an item to start budgeting</span
			>
		{:else}
			<DountChartWithoutLabels />
			<div class="flex w-full flex-col items-center justify-center gap-2">
				{#if !clickedChartInfo.budgetCategory}
					<BudgetItemsList />
				{:else if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
					<CategoryBudgetList />
				{/if}
			</div>
		{/if}
		<AddBudgetItem />
	</div>
</main>
