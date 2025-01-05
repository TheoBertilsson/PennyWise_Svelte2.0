import type { Budget } from './models/types';
import { budgetSums, currentDateIntervall, monthlyBudgetItems } from './stores/budgetStores.svelte';

export function setBudget(budgetItems: Budget[]) {
	monthlyBudgetItems.monthItems = getMonthlyBudgetItems(budgetItems);
	getBudgetExpenses();
	getBudgetIncome();
	getBudgetSum();
}
function getMonthlyBudgetItems(budgetItems: Budget[]) {
	const monthlyBudget = budgetItems.filter((item) => {
		const createdDate = new Date(item.createdAt);
		if (item.dueDate) {
			const dueDate = new Date(item.dueDate);
			return dueDate >= currentDateIntervall.startDate && dueDate <= currentDateIntervall.endDate;
		} else {
			return (
				createdDate >= currentDateIntervall.startDate && createdDate <= currentDateIntervall.endDate
			);
		}
	});
	return monthlyBudget;
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
