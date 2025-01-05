import type { Budget } from '../models/types';

export const budgetData = $state<{ items: Budget[] | undefined }>({ items: undefined });

export let clickedChartInfo = $state<{
	budgetCategory: string | undefined;
	budgetSum: number | undefined;
}>({
	budgetCategory: undefined,
	budgetSum: undefined
});

export let monthlyBudgetItems = $state<{ monthItems: Budget[] | undefined }>({ monthItems: undefined });

const today = new Date();
	const currentDay = today.getDate();
	const currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	if (currentDay < 25) {
		currentMonth -= 1;
	}
	const startDate = new Date(currentYear, currentMonth, 24);
	const endDate = new Date(currentYear, currentMonth + 1, 25);
	
export const currentDateIntervall = <{ startDate: Date; endDate: Date }>({
	startDate: startDate,
	endDate: endDate
});
