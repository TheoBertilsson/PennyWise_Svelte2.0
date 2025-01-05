<script lang="ts">
	import DountChartWithoutLabels from '$lib/components/chart/DountChartWithoutLabels.svelte';
	import { setBudget } from '$lib/components/functions';
	import type { DashboardData } from '$lib/components/models/types';
	import MonthSlider from '$lib/components/MonthSlider.svelte';
	import {
	budgetSums,
		currentDateIntervall,
		monthlyBudgetItems
	} from '$lib/components/stores/budgetStores.svelte';
	import { derived } from 'svelte/store';

	interface Props {
		data: DashboardData;
	}

	let { data }: Props = $props();
	if (!monthlyBudgetItems.monthItems) {
		setBudget(data.budgetItems);
	}
	if (!monthlyBudgetItems.monthItems) throw new Error('No monthly budget items found');
</script>

<main class="flex w-full">
	<div class="mb-12 flex h-full w-full flex-col gap-8 p-5">
		<h1 class="text-3xl font-bold">{data.user.displayName.split(' ')[0]}s Budget!</h1>
		<MonthSlider budgetItems={data.budgetItems} />
		<div class="flex flex-col justify-between gap-4">
			<div class="flex w-full flex-col rounded-lg bg-primary p-4 shadow-md">
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
					{#if monthlyBudgetItems.monthItems?.length === 0}
						<span class="p-8 text-center text-lg"
							>This months budget is empty, add an item to start budgeting</span
						>
					{:else}
						<DountChartWithoutLabels/>
					{/if}
				</div>
			</div>
			<a href="/savings" class="relative min-h-36 rounded-lg bg-white p-4 shadow-md">
				<span class="text-xl font-semibold">Savings</span>
			</a>
		</div>
	</div>
</main>
