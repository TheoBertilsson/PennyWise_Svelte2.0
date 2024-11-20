import type { Budget } from '../models/types';

export const budgetData = $state<{items:Budget[] | undefined}>({items:undefined});


export let clickedChartInfo = $state<{
	budgetCategory: string | undefined;
	budgetSum: number | undefined;
}>({
	budgetCategory: undefined,
	budgetSum: undefined
});
