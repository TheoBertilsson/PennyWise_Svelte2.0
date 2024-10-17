<script lang="ts">
	import type { Transaction } from '../models/types';

	export let monthlyTransactions: Transaction[];
	const income = monthlyTransactions.filter((transaction) => transaction.category === 'income');
	const expenses = monthlyTransactions.filter((transaction) => transaction.category !== 'income');
	const expenseSum = expenses.reduce((sum, transaction) => sum + Number(transaction.price), 0);
	const incomeSum = income.reduce((sum, transaction) => sum + Number(transaction.price), 0);
</script>

<div class="border-b-2 border-zinc-500">
	<span class="line-clamp-1 text-lg font-semibold">Reccuring expenses</span>
</div>
<div>
	<span class=" text-xl font-semibold">{expenseSum}$ / month</span>
</div>
