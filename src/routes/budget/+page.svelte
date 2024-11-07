<script lang="ts">
	import AddBudgetItem from '$lib/components/buttons/AddBudgetItem.svelte';
	import DonutChart from '$lib/components/DonutChart.svelte';
	import type { BudgetData } from '$lib/components/models/types';
	interface Props {
		data: BudgetData;
	}

	let { data }: Props = $props();
	console.log(data.budgetItems);

</script>

<AddBudgetItem />
<DonutChart budgetItems={data.budgetItems}/>
