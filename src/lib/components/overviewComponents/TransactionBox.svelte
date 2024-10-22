<script lang="ts">
	export let transactions;
</script>

<div class="border-b-2 border-zinc-500">
	<span class="text-xl font-semibold">Transactions</span>
</div>
<div class="scrollbar-hide flex max-h-[90%] flex-col gap-2 overflow-scroll p-3">
	{#each transactions as transaction}
		<div class="flex justify-between rounded-lg border-2 border-zinc-400 p-2 shadow-md">
			<span>{transaction.name}</span>
			<span class="capitalize text-zinc-500">{transaction.category}</span>
			<span>{transaction.price} $</span>
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
