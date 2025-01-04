<script lang="ts">
	import type { Budget } from './models/types';
	interface Props {
		budgetItems: Budget[];
		startDate: Date;
		endDate: Date;
	}

	let { budgetItems, startDate, endDate }: Props = $props();
	const { monthlyBudget } = budgetItems.reduce(
		(acc: { monthlyBudget: Budget[] }, item: Budget) => {
			const createdDate = new Date(item.createdAt);
			const isWithinDateRange = item.dueDate
				? new Date(item.dueDate) >= startDate && new Date(item.dueDate) <= endDate
				: createdDate >= startDate && createdDate <= endDate;

			if (isWithinDateRange) {
				acc.monthlyBudget.push(item);
			}
			return acc;
		},
		{ monthlyBudget: [] }
	);

	const { totalExpense, totalIncome } = monthlyBudget.reduce(
		(acc, item) => {
			if (item.category === 'income') {
				acc.totalIncome += item.price;
			} else {
				acc.totalExpense += item.price;
			}
			return acc;
		},
		{ totalExpense: 0, totalIncome: 0 }
	);
</script>

<div class="flex w-full items-center justify-between px-4">
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Income:</span>
		<span>{totalIncome.toLocaleString()} kr</span>
	</div>
	<div class="flex flex-col items-center justify-center">
		<span class="text-lg font-bold underline">Expense:</span>
		<span>{totalExpense.toLocaleString()} kr</span>
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
