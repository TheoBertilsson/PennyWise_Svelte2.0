<script lang="ts">
	import type { Transaction } from '../models/types';

	interface Props {
		expenseTransactions: Transaction[];
	}

	let { expenseTransactions }: Props = $props();
	const transactionsWithDate = expenseTransactions.map((transaction) => {
		const dueDate = new Date(transaction.dueDate);
		const month = dueDate.toLocaleString('default', { month: 'short' });
		const day = dueDate.getDate();
		const year = dueDate.getFullYear();
		return {
			...transaction,
			dueDate: `${day} ${month} ${year}`
		};
	});
</script>

<div class="mb-4 border-b-2 border-zinc-500">
	<span class="text-xl font-semibold">Transactions</span>
</div>
<div class="scrollbar-hide flex max-h-[90%] flex-col gap-4 overflow-scroll">
	{#if transactionsWithDate.length === 0}
		<div class="flex h-36 items-center justify-center rounded-lg bg-white shadow-md">
			<span class="text-lg text-text">No transactions</span>
		</div>
	{:else}
		{#each transactionsWithDate as transaction}
			<div class="flex justify-between border-b-2 border-[#f7f7f7] p-2">
				<div class="flex items-center gap-4">
					<span class="h-8 w-8 rounded-full bg-text"></span>
					<span class="line-clamp-1 capitalize">{transaction.name}</span>
				</div>
				<div class="flex flex-col items-end">
					<span class="text-base font-bold">{transaction.price}$</span>
					<span class="text-sm capitalize text-text">{transaction.dueDate}</span>
				</div>
			</div>
		{/each}
	{/if}
</div>

<style>
	/* Custom scrollbar for Chrome, Safari and Opera */
	.scrollbar-hide::-webkit-scrollbar {
		width: 12px; /* Adjust the width as needed */
	}

	.scrollbar-hide::-webkit-scrollbar-track {
		background: transparent; /* Hide the background */
	}

	.scrollbar-hide::-webkit-scrollbar-thumb {
		background-color: #000000; /* Color of the scrollbar thumb */
		border-radius: 10px; /* Roundness of the scrollbar thumb */
		border: 3px solid transparent; /* Padding around the thumb */
	}

	/* Custom scrollbar for IE, Edge and Firefox */
	.scrollbar-hide {
		scrollbar-color: #b4b1b1 transparent; /* Thumb color and track color */
		scrollbar-width: thin; /* Scrollbar width */
	}
</style>
