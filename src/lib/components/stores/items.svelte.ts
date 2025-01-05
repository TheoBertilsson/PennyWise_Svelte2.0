
import type { Budget } from '../models/types';

let budgetItems: Budget[] | undefined = $state(undefined);

export function getBudgetItems() {
	function setBudgetItems(items: Budget[]) {
		budgetItems = items;
	}
	return {
		get budgetItems() {
			return budgetItems;
		},
		setBudgetItems
	};
}
