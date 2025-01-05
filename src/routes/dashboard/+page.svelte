<script lang="ts">
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import { getMonthlyBudgetItems } from '$lib/components/functions';
	import type { DashboardData } from '$lib/components/models/types';
	import { monthlyBudgetItems } from '$lib/components/stores/budgetStores.svelte';

	interface Props {
		data: DashboardData;
	}

	let { data }: Props = $props();
	if (!monthlyBudgetItems.monthItems) {
		monthlyBudgetItems.monthItems = getMonthlyBudgetItems(data.budgetItems);
	}
	if (!monthlyBudgetItems.monthItems) throw new Error('No monthly budget items found');
	const budgetExpense = monthlyBudgetItems.monthItems
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const budgetIncome = monthlyBudgetItems.monthItems
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const remainingSum = budgetIncome - budgetExpense;
</script>

<main class="flex w-full">
	<div class="mb-12 flex h-full w-full flex-col gap-8 p-5">
		<h1 class="text-3xl font-bold">Welcome, {data.user.displayName}!</h1>
		<div class="flex flex-col justify-between gap-4">
			<div class="flex w-full flex-col rounded-lg bg-primary p-4 shadow-md">
				<span class=" text-white">Remaining</span>
				<span class="text-3xl font-bold text-white">{remainingSum}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Income</span>
				<span class="text-3xl font-bold">{budgetIncome}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Expenses</span>
				<span class="text-3xl font-bold">-{budgetExpense}$</span>
			</div>
		</div>
		<div class="flex w-full flex-col gap-4 pb-4">
			<div class="relative min-h-52 rounded-lg bg-white p-4 shadow-md">
				<a href="/budget" class="text-xl font-semibold">Budget</a>
				<div class=" flex flex-col items-center justify-center">
					{#if !data.budgetItems.length}
						<span class="p-8 text-center text-lg"
							>This months budget is empty, add an item to start budgeting</span
						>
					{:else}
						<DountChartWithoutLabels budgetItems={data.budgetItems} />
					{/if}
				</div>
			</div>
			<a href="/savings" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<span class="text-xl font-semibold">Savings</span>
			</a>
		</div>
	</div>
</main>
