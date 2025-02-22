<script lang="ts">
	import { getMonthlyBudgetItems, setBudget } from '$lib/components/functions';
	import MobileNav from '$lib/components/navBar/MobileNav.svelte';
	import { budget, currentDateIntervall } from '$lib/components/stores/budgetStores.svelte';
	import { untrack } from 'svelte';

	import '../app.css';

	let { children } = $props();

	$effect(() => {
		if (!currentDateIntervall.startDate && !currentDateIntervall.endDate) return;
		console.log('fisk');
		untrack(() => {
			budget.monthlyItems = getMonthlyBudgetItems(
				budget.items || [],
				currentDateIntervall.startDate,
				currentDateIntervall.endDate
			);
			setBudget(budget.monthlyItems);
		});
	});
</script>

{@render children()}
<MobileNav />
