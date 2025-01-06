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
	function getStartDate(): Date {
		const startDate = new Date(currentYear, currentMonth, 25);
		return startDate;
	}
	function getEndDate(): Date {
		const endDate = new Date(currentYear, currentMonth + 1, 24);
		return endDate;
	}
	export const currentDateIntervall = $state<{ startDate: Date; endDate: Date }>({
	startDate: getStartDate(),
	endDate: getEndDate()
});


export const budgetSums = $state<{expenses:number; income:number; remaining:number;}>({
	expenses: 0,
	income: 0,
	remaining: 0
})
