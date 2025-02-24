<script lang="ts">
	import { getMonthlyBudgetItems, setBudget } from '$lib/components/functions';
	import MobileNav from '$lib/components/navBar/MobileNav.svelte';
	import { budget, currentDateIntervall } from '$lib/components/stores/budgetStores.svelte';
	import { untrack } from 'svelte';

	import '../app.css';

	let { children } = $props();

	$effect(() => {
		if (!currentDateIntervall.startDate && !currentDateIntervall.endDate) return;
		const startDate = currentDateIntervall.startDate;
		const endDate = currentDateIntervall.endDate;
		console.log('fisk');
		untrack(() => {
			budget.monthlyItems = getMonthlyBudgetItems(budget.items || [], startDate, endDate);
			console.log('horse');
		});
	});
	$inspect(budget);
</script>

{@render children()}
<MobileNav />
