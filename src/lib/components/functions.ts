import type { Budget } from "./models/types";
import { currentDateIntervall, monthlyBudgetItems } from "./stores/budgetStores.svelte";

export function getMonthlyBudgetItems(budgetItems:Budget[], ) {
  const monthlyBudget = budgetItems.filter((item) => {
    const createdDate = new Date(item.createdAt);
    if (item.dueDate) {
      const dueDate = new Date(item.dueDate);
      return dueDate >= currentDateIntervall.startDate && dueDate <= currentDateIntervall.endDate;
    } else {
      return createdDate >= currentDateIntervall.startDate && createdDate <= currentDateIntervall.endDate;
    }
  });
  return monthlyBudget;

}
