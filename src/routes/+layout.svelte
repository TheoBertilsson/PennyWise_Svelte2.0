<script lang="ts">
	import MobileNav from '$lib/components/navBar/MobileNav.svelte';
	import { monthlyBudgetItems } from '$lib/components/stores/budgetStores.svelte';
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
<MobileNav />
