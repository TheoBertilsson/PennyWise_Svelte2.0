import type { Budget } from '../models/types';

export let clickedChartInfo = $state<{
	budgetCategory: string | undefined;
	budgetSum: number | undefined;
}>({
	budgetCategory: undefined,
	budgetSum: undefined
});

export let monthlyBudgetItems = $state<{ monthItems: Budget[] | undefined }>({
	monthItems: undefined
});

export const budgetSums = $state<{ expenses: number; income: number; remaining: number }>({
	expenses: 0,
	income: 0,
	remaining: 0
});
export const currentDateIntervall = $state<{ startDate?: Date; endDate?: Date }>({});
