<script lang="ts">
	import MobileNav from '$lib/components/navBar/MobileNav.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { budget, currentDateIntervall, user } from '$lib/components/stores/budgetStores.svelte';
	import type { Budget } from '$lib/components/models/types';
	import { setBudget } from '$lib/components/functions';
	import type { Load } from '@sveltejs/kit';

	let { children } = $props();
	// const setStores: Load = async () => {
	// 	if (!budget.items) {
	// 		const res = await fetch('/api/budgetItems');

	// 		if (res.ok) {
	// 			const data = await res.json();
	// 			budget.items = data.budgetItems;
	// 			budget.monthlyItems = data.budgetItems.filter((item: Budget) => {
	// 				const createdDate = new Date(item.createdAt);

	// 				const isWithinDateRange = item.dueDate
	// 					? currentDateIntervall.startDate &&
	// 						currentDateIntervall.endDate &&
	// 						new Date(item.dueDate) >= currentDateIntervall.startDate &&
	// 						new Date(item.dueDate) <= currentDateIntervall.endDate
	// 					: currentDateIntervall.startDate &&
	// 						currentDateIntervall.endDate &&
	// 						createdDate >= currentDateIntervall.startDate &&
	// 						createdDate <= currentDateIntervall.endDate;

	// 				return isWithinDateRange;
	// 			});

	// 			user.name = data.user.displayName;
	// 			user.email = data.user.email;
	// 			setBudget(data.budgetItems);
	// 		} else {
	// 			console.error('Failed to fetch data');
	// 		}
	// 	}
	// };
</script>

{@render children()}
<MobileNav />
