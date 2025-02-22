<script lang="ts">
	import type { Budget } from './models/types';
	import { clickedChartInfo, budget } from './stores/budgetStores.svelte';
</script>

{#snippet budgetList(budget: Budget[])}
	<div class="flex w-full flex-col items-center justify-center gap-2">
		{#each budget as item}
			<form
				method="POST"
				action="?/deleteBudgetItem"
				class="border-opacity-10 flex w-full justify-between border-b-2 border-black p-1"
			>
				<input type="hidden" name="id" value={item.id} />
				<span class="pb-1 font-semibold">{item.subCategory}</span>

				<div class="flex gap-2">
					<span>{item.price.toLocaleString()} kr</span>
					<button
						type="submit"
						class="flex h-6 w-6 items-center justify-center rounded-sm border-[0.5px] border-red-500 bg-white p-1 hover:bg-slate-100 active:bg-slate-300"
					>
						<img src="/trash.svg" alt="Trashcan" />
					</button>
				</div>
			</form>
		{/each}
	</div>
{/snippet}

{#if clickedChartInfo.budgetCategory === 'income' || clickedChartInfo.budgetCategory === 'savings'}
	<div
		class="flex w-full flex-col items-center justify-center gap-5 rounded-lg border-2 border-green-700 bg-white p-4 px-4 shadow-md"
	>
		<span class=" text-lg font-bold capitalize">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold">{clickedChartInfo.budgetSum?.toLocaleString()} kr</span>
		{@render budgetList(
			budget.monthlyItems!.filter((item) => item.category === clickedChartInfo.budgetCategory)
		)}
	</div>
{:else}
	<div
		class="flex w-full flex-1 flex-col items-center justify-center gap-5 rounded-lg border-2 border-red-700 bg-white p-4 px-4 shadow-md"
	>
		<span class=" text-lg font-bold capitalize">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold">{clickedChartInfo.budgetSum?.toLocaleString()} kr</span>
		{@render budgetList(
			budget.monthlyItems!.filter((item) => item.category === clickedChartInfo.budgetCategory)
		)}
	</div>
{/if}
