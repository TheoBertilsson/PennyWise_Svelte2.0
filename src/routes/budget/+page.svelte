<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	import { clickedChartInfo } from '$lib/components/stores/budgetStores.svelte';
	import MobileNav from '$lib/components/navBar/MobileNav.svelte';
	interface Props {
		data: BudgetData
	}
	import BudgetItemsList from '$lib/components/AllBudgetList.svelte';
	import CategoryBudgetList from '$lib/components/CategoryBudgetList.svelte';

	let { data }: Props = $props();
	const today = new Date();
	const currentDay = today.getDate();
	const currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	if (currentDay < 25) {
		currentMonth -= 1;
	}
	const startDate = new Date(currentYear, currentMonth, 24);
	const endDate = new Date(currentYear, currentMonth + 1, 25);
</script>

<main class="flex h-full flex-col items-center justify-start gap-2">
	<div class="flex h-full w-full flex-col items-center justify-between gap-6 p-4">
		{#if !data.budgetItems.length}
			<span class="p-8 text-center text-lg"
				>This months budget is empty, add an item to start budgeting</span
			>
		{:else}
			<DonutChart budgetItems={data.budgetItems} {startDate} {endDate}/>
			<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
				{#if !clickedChartInfo.budgetCategory}
					<BudgetItemsList budgetItems={data.budgetItems} {startDate} {endDate} />
				{:else if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
					<CategoryBudgetList budgetItems={data.budgetItems} {startDate} {endDate} />
				{/if}
			</div>
		{/if}
		<AddBudgetItem />
	</div>
</main>
