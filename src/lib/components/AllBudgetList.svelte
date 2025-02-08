<script lang="ts">
	import type { Budget } from './models/types';
	import { budgetSums, monthlyBudgetItems } from './stores/budgetStores.svelte';

	export const snipper = budgetList;
	let expenseBudget: Budget[] = $state([]);
	let incomeBudget: Budget[] = $state([]);

	$effect(() => {
		if (monthlyBudgetItems.monthItems) {
			expenseBudget = monthlyBudgetItems.monthItems
				.filter((item: Budget) => item.category !== 'income')
				.sort((a, b) => {
					// First sort by category
					const categoryCompare = a.category.localeCompare(b.category);
					// If categories are the same, sort by subCategory
					if (categoryCompare === 0) {
						return a.subCategory.localeCompare(b.subCategory);
					}
					return categoryCompare;
				});
			incomeBudget = monthlyBudgetItems.monthItems.filter(
				(item: Budget) => item.category === 'income'
			);
		}
	});
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

<div class="flex w-full flex-wrap gap-10">
	<div class="flex min-w-80 flex-1 flex-col items-start justify-start gap-5">
		<div
			class="border-primary flex w-full flex-col items-center justify-center gap-5 rounded-lg border-2 bg-white p-4 px-4 shadow-md"
		>
			<span class="text-lg font-bold"
				>Remaining: {(budgetSums.income - budgetSums.expenses).toLocaleString()} kr</span
			>
		</div>
		<div
			class="flex w-full flex-col items-center justify-center gap-5 rounded-lg border-2 border-green-700 bg-white p-4 px-4 shadow-md"
		>
			<span class="text-lg font-bold">Income: {budgetSums.income.toLocaleString()} kr</span>
			{@render budgetList(incomeBudget)}
		</div>
	</div>

	<div
		class="flex min-w-80 flex-1 flex-col items-center justify-center gap-5 rounded-lg border-2 border-red-700 bg-white p-4 px-4 shadow-md"
	>
		<span class="text-lg font-bold">Expense: {budgetSums.expenses.toLocaleString()} kr</span>
		{@render budgetList(expenseBudget)}
	</div>
</div>
