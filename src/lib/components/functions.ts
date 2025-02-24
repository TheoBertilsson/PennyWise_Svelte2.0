import type { Budget } from './models/types';
import { currentDateIntervall, getBudgetSums, user } from './stores/budgetStores.svelte';
let budgetSums = getBudgetSums() || { income: 0, expenses: 0, remaining: 0 };

export async function setBudget(monthlyItems: Budget[]) {
	getBudgetExpenses(monthlyItems);
	getBudgetIncome(monthlyItems);
	getBudgetSum();
}

export function setDates() {
	const today = new Date();
	const currentDay = today.getDate();
	const currentYear = today.getFullYear();
	let currentMonth = today.getMonth();

	if (currentDay < 25) {
		currentMonth -= 1;
	}
	const startDate = new Date(currentYear, currentMonth, 25);
	const endDate = new Date(currentYear, currentMonth + 1, 24);
	currentDateIntervall.startDate = startDate;
	currentDateIntervall.endDate = endDate;
}
function getBudgetExpenses(monthlyItems: Budget[]) {
	budgetSums.expenses = monthlyItems
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
}
function getBudgetIncome(monthlyItems: Budget[]) {
	budgetSums.income = monthlyItems
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
}
function getBudgetSum() {
	budgetSums.remaining = budgetSums.income - budgetSums.expenses;
}

export function getMonthlyBudgetItems(
	budgetItems: Budget[],
	startDate: Date | undefined,
	endDate: Date | undefined
) {
	if (!startDate && !endDate) throw Error('No date range provided');
	const asd = budgetItems.filter((item: Budget) => {
		const createdDate = new Date(item.createdAt);

		const isWithinDateRange = item.dueDate
			? startDate &&
				endDate &&
				new Date(item.dueDate) >= startDate &&
				new Date(item.dueDate) <= endDate
			: startDate && endDate && createdDate >= startDate && createdDate <= endDate;

		return isWithinDateRange;
	});
	return asd;
}
