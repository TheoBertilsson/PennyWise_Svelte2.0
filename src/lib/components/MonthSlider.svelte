<script lang="ts">
	import { currentDateIntervall } from './stores/budgetStores.svelte';

	function subtractOneMonth() {
		const newStartDate = new Date(currentDateIntervall.startDate || new Date());
		const newEndDate = new Date(currentDateIntervall.endDate || new Date());
		newStartDate.setMonth(newStartDate.getMonth() - 1);
		newEndDate.setMonth(newEndDate.getMonth() - 1);
		currentDateIntervall.startDate = newStartDate;
		currentDateIntervall.endDate = newEndDate;
	}
	function addOneMonth() {
		const newStartDate = new Date(currentDateIntervall.startDate || new Date());
		const newEndDate = new Date(currentDateIntervall.endDate || new Date());
		newStartDate.setMonth(newStartDate.getMonth() + 1);
		newEndDate.setMonth(newEndDate.getMonth() + 1);
		currentDateIntervall.startDate = newStartDate;
		currentDateIntervall.endDate = newEndDate;
	}
</script>

<div class="flex max-w-[270px] items-center justify-between gap-6">
	<button onclick={subtractOneMonth}>&lt;</button>
	<div>
		<span
			>{new Date(currentDateIntervall.startDate || new Date()).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})}</span
		>
		-
		<span
			>{new Date(currentDateIntervall.endDate || new Date()).toLocaleDateString('en-GB', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			})}</span
		>
	</div>
	<button onclick={addOneMonth}>&gt;</button>
</div>
