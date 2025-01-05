<script lang="ts">
	import type { Budget } from './models/types';
	import { budgetSums, currentDateIntervall, monthlyBudgetItems } from './stores/budgetStores.svelte';

	function getMonthlyBudget(budgetItems: Budget[], currentDateIntervall: { startDate: Date, endDate: Date }) {
		return budgetItems.filter((item: Budget) => {
			const createdDate = new Date(item.createdAt);
			const isWithinDateRange = item.dueDate
				? new Date(item.dueDate) >= currentDateIntervall.startDate && new Date(item.dueDate) <= currentDateIntervall.endDate
				: createdDate >= currentDateIntervall.startDate && createdDate <= currentDateIntervall.endDate;

			return isWithinDateRange;
		});
	}

	let monthlyBudget = $state(getMonthlyBudget(monthlyBudgetItems.monthItems!,currentDateIntervall));
	$effect(() => {
		if (monthlyBudgetItems?.monthItems) {
			monthlyBudget = getMonthlyBudget(monthlyBudgetItems.monthItems, currentDateIntervall);
		}
	});
</script>

<div class="flex w-full items-center justify-between px-4">
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Income:</span>
		<span>{budgetSums.income.toLocaleString()} kr</span>
	</div>
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Expense:</span>
		<span>{budgetSums.expenses.toLocaleString()} kr</span>
	</div>
</div>

{#each monthlyBudget as item}
	<form
		method="POST"
		action="?/deleteBudgetItem"
		class="flex w-full justify-between border-b-2 border-opacity-10 border-black"
	>
		<input type="hidden" name="id" value={item.id} />
		<span class="font-semibold pb-1">{item.subCategory}</span>

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
