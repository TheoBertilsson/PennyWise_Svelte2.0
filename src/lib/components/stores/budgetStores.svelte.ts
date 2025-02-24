import { untrack } from 'svelte';
import { getMonthlyBudgetItems } from '../functions';
import type { Budget } from '../models/types';

export let clickedChartInfo = $state<{
	budgetCategory: string | undefined;
	budgetSum: number | undefined;
}>({
	budgetCategory: undefined,
	budgetSum: undefined
});

export let budget = $state<{ items: Budget[] | undefined; monthlyItems: Budget[] | undefined }>({
	items: undefined,
	monthlyItems: undefined
});

let budgetSums = $derived.by(() => {
	console.log('budgetSums');

	if (!budget.monthlyItems) return;
	const expenses = budget.monthlyItems
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const income = budget.monthlyItems
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
	const remaining = income - expenses;
	return { expenses, income, remaining };
});
export const getBudgetSums = () => budgetSums;
export const currentDateIntervall = $state<{ startDate?: Date; endDate?: Date }>({});

export let user = $state<{ name: string; email: string }>({ name: '', email: '' });
