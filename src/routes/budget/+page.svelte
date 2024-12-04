<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	import { clickedChartInfo } from '$lib/components/stores/budgetStores.svelte';
	interface Props {
		data: BudgetData;
	}
	import BudgetItemsList from '$lib/components/AllBudgetList.svelte';
	import CategoryBudgetList from '$lib/components/CategoryBudgetList.svelte';

	let { data }: Props = $props();
</script>

<main class="flex flex-col items-center justify-center gap-10">
	{#if !data.budgetItems.length}
		<span class="text-center text-lg p-8">This months budget is empty, add an item to start budgeting</span>
	{:else}
		<DonutChart budgetItems={data.budgetItems} />
		<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
			{#if !clickedChartInfo.budgetCategory}
				<BudgetItemsList budgetItems={data.budgetItems} />
			{:else if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
				<CategoryBudgetList budgetItems={data.budgetItems} />
			{/if}
		</div>{/if}
	<AddBudgetItem />
</main>
