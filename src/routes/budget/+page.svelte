<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import type { Budget } from '$lib/components/models/types';
	import {
		clickedChartInfo,
		budget,
		currentDateIntervall,
		user
	} from '$lib/components/stores/budgetStores.svelte';
	import BudgetItemsList from '$lib/components/AllBudgetList.svelte';
	import CategoryBudgetList from '$lib/components/CategoryBudgetList.svelte';
	import MonthSlider from '$lib/components/MonthSlider.svelte';
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import { getMonthlyBudgetItems, setBudget, setDates } from '$lib/components/functions';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';

	let { data } = $props();

	if (!budget.monthlyItems) {
		if (!currentDateIntervall.startDate || !currentDateIntervall.endDate) {
			setDates();
		}
		user.name = data.user.displayName;
		user.email = data.user.email;
		budget.items = data.budgetItems;
		budget.monthlyItems = getMonthlyBudgetItems(
			budget.items,
			currentDateIntervall.startDate,
			currentDateIntervall.endDate
		);
		setBudget(budget.monthlyItems);
	}
</script>

<main
	class="mb-16 flex h-full w-full max-w-screen-lg flex-col items-center justify-start gap-10 p-5"
>
	<div class="flex h-full w-full flex-col items-center justify-between gap-6">
		<MonthSlider />
		{#if budget.monthlyItems?.length === 0}
			<span class="p-8 text-center text-lg"
				>This months budget is empty, add an item to start budgeting</span
			>
		{:else}
			<DonutChart />
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
