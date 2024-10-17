<script lang="ts">
	import AddItem from '$lib/components/buttons/AddItem.svelte';
	import type { DashboardData } from '$lib/components/models/types';
	import NavBar from '$lib/components/NavBar.svelte';
	import TransactionBox from '$lib/components/overviewComponents/TransactionBox.svelte';

	import { derived, get } from 'svelte/store';
	import { writable } from 'svelte/store';
	export let data: DashboardData;

	const today = new Date();
	const currentDay = today.getDate();
	let currentMonth = today.getMonth();
	const currentYear = today.getFullYear();

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
	const income = currentTransactions
		.filter((transaction) => transaction.category === 'income')
		.reduce((sum, transaction) => sum + Number(transaction.price), 0);
	const expenses = currentTransactions
		.filter((transaction) => transaction.category !== 'income')
		.reduce((sum, transaction) => sum + Number(transaction.price), 0);
	const remaining = income - expenses;
</script>

<main class="flex w-full">
	<div class="flex flex-col gap-8 p-5 w-full h-screen">
		<h1 class="text-3xl font-bold">Welcome, {data.user.displayName}!</h1>
		<div class="flex flex-col justify-between gap-4">
			<div class="w-full bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
				<span class="font-semibold underline">Remaining</span>
				<span class="text-2xl">{remaining}$</span>
			</div>
			<div class="w-full bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
				<span class="font-semibold underline">Income</span>
				<span class="text-2xl">{income}$</span>
			</div>
			<div class="w-full bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
				<span class="font-semibold underline">Expenses</span>
				<span class="text-2xl">{expenses}$</span>
			</div>
		</div>
		<div>
			<AddItem />
		</div>
		<div class="w-full flex flex-col gap-4 pb-4">
			<div class="flex gap-4 w-full">
				<a href="/savings" class="relative bg-gray-200 p-4 rounded-lg shadow-md min-h-36 w-1/2">
					<span class="text-xl font-semibold">Savings</span>
				</a>
				<a href="/recurring" class="relative bg-gray-200 p-4 rounded-lg shadow-md min-h-36 w-1/2">
					<span class="text-xl font-semibold">Recurring</span>
				</a>
			</div>

			<a href="/transaction" class="relative bg-gray-200 p-4 rounded-lg shadow-md  min-h-52">
				<TransactionBox transactions={currentTransactions} />
			</a>
			<a
				href="/budget"
				class="relative bg-gray-200 p-4 rounded-lg shadow-md min-h-52 "
			>
				<span class="text-xl font-semibold">Budget</span>
			</a>
		</div>
	</div>
</main>
