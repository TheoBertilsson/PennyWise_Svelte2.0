<script lang="ts">
	import { setBudget } from './functions';
	import type { Budget } from './models/types';
	import { currentDateIntervall } from './stores/budgetStores.svelte';
	interface Props {
		budgetItems: Budget[];
	}
	let { budgetItems }: Props = $props();
	function subtractOneMonth() {
		const newStartDate = new Date(currentDateIntervall.startDate);
		const newEndDate = new Date(currentDateIntervall.endDate);
		newStartDate.setMonth(newStartDate.getMonth() - 1);
		newEndDate.setMonth(newEndDate.getMonth() - 1);
		currentDateIntervall.startDate = newStartDate;
		currentDateIntervall.endDate = newEndDate;
		setBudget(budgetItems);
	}
	function addOneMonth() {
		const newStartDate = new Date(currentDateIntervall.startDate);
		const newEndDate = new Date(currentDateIntervall.endDate);
		newStartDate.setMonth(newStartDate.getMonth() + 1);
		newEndDate.setMonth(newEndDate.getMonth() + 1);
		currentDateIntervall.startDate = newStartDate;
		currentDateIntervall.endDate = newEndDate;
		setBudget(budgetItems);
	}
</script>

<div class="flex items-center justify-between">
	<button onclick={subtractOneMonth}>&lt;</button>
	<div>
		<span
			>{new Date(currentDateIntervall.startDate).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})}</span
		>
		-
		<span
			>{new Date(currentDateIntervall.endDate).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})}</span
		>
	</div>
	<button onclick={addOneMonth}>&gt;</button>
</div>
