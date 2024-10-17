<script lang="ts">
	export let transactions
</script>

<div class="border-b-2 border-zinc-500">
	<button class="absolute top-2 right-2 text-xl">+</button>
<span class="text-xl font-semibold">Transactions</span>
</div>
<div class="flex flex-col gap-2 mt-2 overflow-auto">
	{#each transactions as transaction}
		<div class="flex justify-between p-2 border-2 border-zinc-400 shadow-md rounded-lg">
			<span >{transaction.name}</span>
			<span class="text-zinc-500 capitalize">{transaction.category}</span>
			<span>{transaction.price} $</span>
		</div>
	{/each}
</div>
