import type { Budget } from './models/types';
import { budgetSums, currentDateIntervall, monthlyBudgetItems } from './stores/budgetStores.svelte';

export function setBudget(budgetItems: Budget[]) {
	monthlyBudgetItems.monthItems = getMonthlyBudgetItems(budgetItems, currentDateIntervall);
	getBudgetExpenses();
	getBudgetIncome();
	getBudgetSum();
}
export function getMonthlyBudgetItems(
	budgetItems: Budget[],
	currentDateIntervall: { startDate: Date; endDate: Date }
) {
	return budgetItems.filter((item: Budget) => {
		const createdDate = new Date(item.createdAt);
		const isWithinDateRange = item.dueDate
			? new Date(item.dueDate) >= currentDateIntervall.startDate &&
				new Date(item.dueDate) <= currentDateIntervall.endDate
			: createdDate >= currentDateIntervall.startDate &&
				createdDate <= currentDateIntervall.endDate;

		return isWithinDateRange;
	});
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
