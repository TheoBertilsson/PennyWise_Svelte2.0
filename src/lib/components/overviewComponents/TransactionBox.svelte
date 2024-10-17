<script lang="ts">
	export let transactions
</script>

<div class="border-b-2 border-zinc-500">
	<button class="absolute top-2 right-2 text-xl">+</button>
<span class="text-xl font-semibold">Transactions</span>
</div>
<div class="flex flex-col gap-2 overflow-scroll max-h-[90%] p-3 scrollbar-hide">
	{#each transactions as transaction}
		<div class="flex justify-between p-2 border-2 border-zinc-400 shadow-md rounded-lg">
			<span>{transaction.name}</span>
			<span class="text-zinc-500 capitalize">{transaction.category}</span>
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
