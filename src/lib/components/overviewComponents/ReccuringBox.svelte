<script lang="ts">
	import { getPaidReccuringTransactions, getUpcomingReccuringTransactions } from '$lib/monthlyTransactions';
	import type { Transaction } from '../models/types';

	export let monthlyTransactions: Transaction[];
	const expenses = monthlyTransactions.filter((transaction) => transaction.category !== 'income');
	const totalRecurringExpenses = expenses.reduce((sum, transaction) => sum + Number(transaction.price), 0);
	const paidReccuringExpensesSum = getPaidReccuringTransactions(monthlyTransactions).reduce((sum,transaction)=>sum+Number(transaction.price),0)
	const upcomingRecurringExpensesSum = getUpcomingReccuringTransactions(monthlyTransactions).reduce((sum,transaction)=>sum+Number(transaction.price),0)
</script>

<div class="flex flex-col justify-between gap-4">
	<span class="line-clamp-1 text-xl font-semibold">Reccuring Bills</span>

	<div class="flex justify-between rounded-lg border-l-4 border-green-600 bg-background p-4">
		<span class="text-base font-semibold text-text">Paid bills:</span>
		<span class="text-base font-bold">${paidReccuringExpensesSum}</span>
	</div>

	<div class="flex justify-between rounded-lg border-l-4 border-yellow-500 bg-background p-4">
		<span class="text-base font-semibold text-text">Upcoming bills:</span>
		<span class="text-base font-bold">${upcomingRecurringExpensesSum}</span>
	</div>
	<div class="flex justify-between rounded-lg border-l-4 border-red-600 bg-background p-4">
		<span class="text-base font-semibold text-text">Total bills: </span>
		<span class="text-base font-bold">${totalRecurringExpenses}</span>
	</div>
</div>
