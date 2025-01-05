<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	import { clickedChartInfo, monthlyBudgetItems } from '$lib/components/stores/budgetStores.svelte';
	import BudgetItemsList from '$lib/components/AllBudgetList.svelte';
	import CategoryBudgetList from '$lib/components/CategoryBudgetList.svelte';
	import { setBudget } from '$lib/components/functions';

	interface Props {
		data: BudgetData
	}

	let { data }: Props = $props();
	if (!monthlyBudgetItems.monthItems) {
		setBudget(data.budgetItems);
	}
	if (!monthlyBudgetItems.monthItems) throw new Error('No monthly items found');

</script>

<main class="flex h-full flex-col items-center justify-start gap-2 mb-16">
	<div class="flex h-full w-full flex-col items-center justify-between gap-6 p-4">
		{#if !data.budgetItems.length}
			<span class="p-8 text-center text-lg"
				>This months budget is empty, add an item to start budgeting</span
			>
		{:else}
			<DonutChart budgetItems={data.budgetItems}/>
			<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
				{#if !clickedChartInfo.budgetCategory}
					<BudgetItemsList budgetItems={data.budgetItems} />
				{:else if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
					<CategoryBudgetList />
				{/if}
			</div>
		{/if}
		<AddBudgetItem />
	</div>
</main>
