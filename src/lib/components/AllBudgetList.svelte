<script lang="ts">
	import type { Budget } from './models/types';
	import {
		budgetSums,
		currentDateIntervall,
		monthlyBudgetItems
	} from './stores/budgetStores.svelte';

	function getMonthlyBudget(
		budgetItems: Budget[],
		currentDateIntervall: { startDate: Date; endDate: Date }
	) {
		return budgetItems.filter((item: Budget) => {
			const createdDate = new Date(item.createdAt);
			const isWithinDateRange = item.dueDate
				? new Date(item.dueDate) >= currentDateIntervall.startDate &&
					new Date(item.dueDate) <= currentDateIntervall.endDate
				: createdDate >= currentDateIntervall.startDate &&
					createdDate <= currentDateIntervall.endDate;

			return isWithinDateRange;
		});
	}

	let monthlyBudget = $state(
		getMonthlyBudget(monthlyBudgetItems.monthItems!, currentDateIntervall)
	);
	const expenseBudget = $derived(
		monthlyBudget
			.filter((item: Budget) => item.category !== 'income')
			.sort((a, b) => {
				// First sort by category
				const categoryCompare = a.category.localeCompare(b.category);
				// If categories are the same, sort by subCategory
				if (categoryCompare === 0) {
					return a.subCategory.localeCompare(b.subCategory);
				}
				return categoryCompare;
			})
	);
	const incomeBudget = $derived(monthlyBudget.filter((item: Budget) => item.category === 'income'));
	$effect(() => {
		if (monthlyBudgetItems?.monthItems) {
			monthlyBudget = getMonthlyBudget(monthlyBudgetItems.monthItems, currentDateIntervall);
		}
	});
</script>

{#snippet budgetList(budget: Budget[])}
	<div class="flex w-full flex-col items-center justify-center gap-2">
		{#each budget as item}
			<form
				method="POST"
				action="?/deleteBudgetItem"
				class="flex w-full justify-between border-b-2 border-black border-opacity-10"
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

<div class="flex w-full flex-col items-center gap-10 px-4">
	<div class="flex w-full flex-col items-center justify-center gap-5">
		<span class="text-lg font-bold underline">Income: {budgetSums.income.toLocaleString()} kr</span>
		{@render budgetList(incomeBudget)}
	</div>
	<div class="flex w-full flex-col items-center justify-center gap-5">
		<span class="text-lg font-bold underline"
			>Expense: {budgetSums.expenses.toLocaleString()} kr</span
		>
		{@render budgetList(expenseBudget)}
	</div>
</div>
