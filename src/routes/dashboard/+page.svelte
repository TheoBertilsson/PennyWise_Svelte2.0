<script lang="ts">
	import AddItem from '$lib/components/buttons/AddTransaction.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import type { DashboardData } from '$lib/components/models/types';
	import ReccuringBox from '$lib/components/overviewComponents/ReccuringBox.svelte';
	import TransactionBox from '$lib/components/overviewComponents/TransactionBox.svelte';

	interface Props {
		data: DashboardData;
	}

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

	const monthlyBudget = data.budgetItems.filter((item) => {
		if (item.dueDate) {
			const dueDate = new Date(item.dueDate);
			return !item.monthly && dueDate >= startDate && dueDate < endDate;
		}
		if (item.monthly) {
			return item;
		}
	});
	const budgetExpense = monthlyBudget
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const budgetIncome = monthlyBudget
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const remainingSum = budgetIncome - budgetExpense;
</script>

<main class="flex w-full">
	<div class="flex h-screen w-full flex-col gap-8 p-5">
		<h1 class="text-3xl font-bold">Welcome, {data.user.displayName}!</h1>
		<div class="flex flex-col justify-between gap-4">
			<div class="flex w-full flex-col rounded-lg bg-primary p-4 shadow-md">
				<span class=" text-white">Current budget</span>
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
			<!--
			<a href="/transaction" class="relative min-h-52 rounded-lg bg-white p-4 shadow-md">
				<TransactionBox {expenseTransactions} />
			</a> -->
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
			<!-- <a href="/recurring" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<ReccuringBox {monthlyBudget} />
			</a> -->
		</div>
	</div>
</main>
