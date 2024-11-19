<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/chart/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	interface Props {
		data: BudgetData;
	}

	let { data }: Props = $props();

</script>

<DonutChart budgetItems={data.budgetItems}/>
<AddBudgetItem />
