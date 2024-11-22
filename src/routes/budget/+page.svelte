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

<main class="flex flex-col gap-10">
	<DonutChart budgetItems={data.budgetItems} />
	<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
		{#if !clickedChartInfo.budgetCategory}
			<BudgetItemsList budgetItems={data.budgetItems} />
			{:else if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
			<CategoryBudgetList budgetItems={data.budgetItems} />
		{/if}

	</div>
	<AddBudgetItem />
</main>
