<script lang="ts">
	import type { Budget } from './models/types';
	import { clickedChartInfo } from './stores/budgetStores.svelte';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems }: Props = $props();
	const totalExpense = budgetItems
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => (sum += item.price), 0);
	const totalIncome = budgetItems
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => (sum += item.price), 0);
</script>

<div class="flex w-full items-center justify-between">
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Income:</span>
		<span >{totalIncome.toLocaleString()} kr</span>
	</div>
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Expense:</span>
		<span >{totalExpense.toLocaleString()} kr</span>
	</div>
</div>

{#each budgetItems as item}
	<form
		method="POST"
		action="?/deleteBudgetItem"
		class="flex w-full justify-between border-b-2 border-[#0000070]"
	>
		<input type="hidden" name="id" value={item.id} />
		<span class="font-bold">{item.subCategory}</span>
		<span class="capitalize opacity-70">{item.category}</span>
		<h3>{item.price.toLocaleString()}kr</h3>

		<button
			type="submit"
			class="flex h-6 w-6 items-center justify-center rounded-sm border-[0.5px] border-red-500 bg-white p-1 hover:bg-slate-100 active:bg-slate-300"
		>
			<img src="/trash.svg" alt="Trashcan" />
		</button>
	</form>
{/each}
