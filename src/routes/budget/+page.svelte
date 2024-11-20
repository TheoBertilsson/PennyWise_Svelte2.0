<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	interface Props {
		data: BudgetData;
	}
	import BudgetItemsList from '$lib/components/budgetItemsList.svelte';

	let { data }: Props = $props();
</script>

<main class="flex flex-col gap-10">
	<DonutChart budgetItems={data.budgetItems} />
	<BudgetItemsList budgetItems={data.budgetItems} />
	<AddBudgetItem />
</main>
