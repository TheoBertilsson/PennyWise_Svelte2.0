<script lang="ts">
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import { setBudget, setDates } from '$lib/components/functions';
	import type { Budget } from '$lib/components/models/types';
	import MonthSlider from '$lib/components/MonthSlider.svelte';
	import {
		budget,
		budgetSums,
		currentDateIntervall,
		user
	} from '$lib/components/stores/budgetStores.svelte';
	let { data } = $props();

	if (!budget.monthlyItems) {
		if (!currentDateIntervall.startDate || !currentDateIntervall.endDate) {
			setDates();
		}
		user.name = data.user.displayName;
		user.email = data.user.email;
		budget.items = data.budgetItems;
		const asd = data.budgetItems.filter((item: Budget) => {
			const createdDate = new Date(item.createdAt);

			const isWithinDateRange = item.dueDate
				? currentDateIntervall.startDate &&
					currentDateIntervall.endDate &&
					new Date(item.dueDate) >= currentDateIntervall.startDate &&
					new Date(item.dueDate) <= currentDateIntervall.endDate
				: currentDateIntervall.startDate &&
					currentDateIntervall.endDate &&
					createdDate >= currentDateIntervall.startDate &&
					createdDate <= currentDateIntervall.endDate;

			return isWithinDateRange;
		});
		console.log(asd);

		budget.monthlyItems = asd;
		setBudget(budget.monthlyItems);
	}
</script>

<main class="flex w-full">
	<div class="mb-12 flex h-full w-full flex-col items-center justify-center gap-6 p-5">
		<h1 class="text-3xl font-bold">{user.name.split(' ')[0]}s Budget!</h1>
		<MonthSlider />
		<div class="flex w-full flex-col justify-between gap-4">
			<div class="bg-primary flex w-full flex-col rounded-lg p-4 shadow-md">
				<span class=" text-white">Remaining</span>
				<span class="text-3xl font-bold text-white">{budgetSums.expenses}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Income</span>
				<span class="text-3xl font-bold">{budgetSums.income}$</span>
			</div>
			<div class="flex w-full flex-col rounded-lg bg-white p-4 shadow-md">
				<span class="text-text">Expenses</span>
				<span class="text-3xl font-bold">{budgetSums.remaining}$</span>
			</div>
		</div>
		<div class="flex w-full flex-col gap-4 pb-4">
			<div class="relative min-h-52 rounded-lg bg-white p-4 shadow-md">
				<a href="/budget" class="text-xl font-semibold">Budget</a>
				<div class=" flex flex-col items-center justify-center">
					{#if budget.items?.length === 0}
						<span class="p-8 text-center text-lg"
							>This months budget is empty, add an item to start budgeting</span
						>
					{:else}
						<DountChartWithoutLabels />
					{/if}
				</div>
			</div>
			<a href="/savings" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<span class="text-xl font-semibold">Savings</span>
			</a>
		</div>
	</div>
</main>
