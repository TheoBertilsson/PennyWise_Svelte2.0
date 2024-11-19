<script lang="ts">
	import AddItem from '$lib/components/buttons/AddTransaction.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import type { DashboardData } from '$lib/components/models/types';
	import ReccuringBox from '$lib/components/overviewComponents/ReccuringBox.svelte';
	import TransactionBox from '$lib/components/overviewComponents/TransactionBox.svelte';
	import { getBudgetItems } from '$lib/components/stores/items.svelte';

	interface Props {
		data: DashboardData;
	}

	let { data }: Props = $props();

	const budget = getBudgetItems();
	budget.setBudgetItems(data.budgetItems);
	const today = new Date();
	const currentDay = today.getDate();
	const currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	if (currentDay < 25) {
		currentMonth -= 1;
	}
	const startDate = new Date(currentYear, currentMonth, 24);
	const endDate = new Date(currentYear, currentMonth + 1, 25);

	const monthlyTransactions = data.transactions.filter((transaction) => {
		const transactionDate = new Date(transaction.createdAt);
		return transaction.monthly && transactionDate < endDate;
	});
	const filteredTransactions = data.transactions.filter((transaction) => {
		const transactionDate = new Date(transaction.createdAt);
		return transactionDate >= startDate && transactionDate < endDate && !transaction.monthly;
	});

	const currentTransactions = [...monthlyTransactions, ...filteredTransactions];
	const income = currentTransactions.filter((transaction) => transaction.category === 'income');
	const expenseTransactions = currentTransactions.filter(
		(transaction) => transaction.category !== 'income'
	);
	const expenseSum = expenseTransactions.reduce(
		(sum, transaction) => sum + Number(transaction.price),
		0
	);
	const incomeSum = income.reduce((sum, transaction) => sum + Number(transaction.price), 0);
	const remainingSum = incomeSum - expenseSum;
</script>

<main class="flex w-full">
	<div class="flex h-screen w-full flex-col gap-8 p-5">
		<h1 class="text-3xl font-bold">Welcome, {data.user.displayName}!</h1>
		<div class="flex flex-col justify-between gap-4">
			<div class="flex w-full flex-col rounded-lg bg-primary p-4 shadow-md">
				<span class=" text-white">Current balance</span>
				<span class="text-3xl font-bold text-white">{remainingSum}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Income</span>
				<span class="text-3xl font-bold">{incomeSum}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Expenses</span>
				<span class="text-3xl font-bold">-{expenseSum}$</span>
			</div>
		</div>
		<AddItem />
		<div class="flex w-full flex-col gap-4 pb-4">
			<a href="/savings" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<span class="text-xl font-semibold">Savings</span>
			</a>
			<a href="/transaction" class="relative min-h-52 rounded-lg bg-white p-4 shadow-md">
				<TransactionBox {expenseTransactions} />
			</a>

			<div class="relative min-h-52 rounded-lg bg-white p-4 shadow-md">
				<a href="/budget" class="text-xl font-semibold ">Budget</a>
				<div class=" flex justify-center items-center flex-col">
					<DountChartWithoutLabels budgetItems={data.budgetItems} />
				</div>

			</div>
			<a href="/recurring" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<ReccuringBox {monthlyTransactions} />
			</a>
		</div>
	</div>
</main>
