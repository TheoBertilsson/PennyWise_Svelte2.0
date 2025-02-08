import type { Budget } from './models/types';
import { budgetSums, currentDateIntervall, monthlyBudgetItems } from './stores/budgetStores.svelte';

export function setBudget(budgetItems: Budget[]) {
	if (!currentDateIntervall.startDate || !currentDateIntervall.endDate) {
		setDates();
	}
	monthlyBudgetItems.monthItems = getMonthlyBudgetItems(
		budgetItems,
		currentDateIntervall.startDate ? currentDateIntervall.startDate : new Date(),
		currentDateIntervall.endDate ? currentDateIntervall.endDate : new Date()
	);
	getBudgetExpenses();
	getBudgetIncome();
	getBudgetSum();
}

export function getMonthlyBudgetItems(budgetItems: Budget[], startDate: Date, endDate: Date) {
	return budgetItems.filter((item: Budget) => {
		const createdDate = new Date(item.createdAt);
		const isWithinDateRange = item.dueDate
			? new Date(item.dueDate) >= startDate && new Date(item.dueDate) <= endDate
			: createdDate >= startDate && createdDate <= endDate;

		return isWithinDateRange;
	});
}

function setDates() {
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
function getBudgetExpenses() {
	if (!monthlyBudgetItems.monthItems) throw new Error('No monthly budget items found');
	budgetSums.expenses = monthlyBudgetItems.monthItems
		.filter((item) => item.category !== 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
}
function getBudgetIncome() {
	if (!monthlyBudgetItems.monthItems) throw new Error('No monthly budget items found');
	budgetSums.income = monthlyBudgetItems.monthItems
		.filter((item) => item.category === 'income')
		.reduce((sum, item) => sum + Number(item.price), 0);
}
function getBudgetSum() {
	budgetSums.remaining = budgetSums.income - budgetSums.expenses;
}
