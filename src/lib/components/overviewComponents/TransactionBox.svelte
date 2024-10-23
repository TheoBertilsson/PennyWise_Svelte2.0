<script lang="ts">
	import type { Transaction } from '../models/types';

	interface Props {
		expenseTransactions: Transaction[];
	}

	let { expenseTransactions }: Props = $props();
	const transactionsWithDate = expenseTransactions.map((transaction) => {
		const createdAt = new Date(transaction.createdAt);
		const month = createdAt.toLocaleString('default', { month: 'short' });
		const day = createdAt.getDate();
		const year = createdAt.getFullYear();
		return {
			...transaction,
			createdAt: `${day} ${month} ${year}`,
		};
	});
</script>

<div class="mb-4 border-b-2 border-zinc-500">
	<span class="text-xl font-semibold">Transactions</span>
</div>
<div class="scrollbar-hide flex max-h-[90%] flex-col gap-4 overflow-scroll">
	{#each transactionsWithDate as transaction}
		<div class="flex justify-between border-b-2 border-[#f7f7f7] p-2">
			<div class="flex items-center gap-4">
				<span class="h-8 w-8 rounded-full bg-text"></span>
				<span class="line-clamp-1 capitalize">{transaction.name}</span>
			</div>
			<div class="flex flex-col items-end">
				<span class="font-bold text-base">{transaction.price}$</span>
				<span class="capitalize text-sm text-text">{transaction.createdAt}</span>
			</div>
		</div>
	{/each}
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
