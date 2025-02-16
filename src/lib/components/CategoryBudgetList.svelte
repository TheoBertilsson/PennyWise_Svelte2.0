<script lang="ts">
	import { clickedChartInfo, budget } from './stores/budgetStores.svelte';
</script>

{#if clickedChartInfo.budgetCategory === 'income'}
	<div class="flex w-full justify-center gap-4 underline">
		<span class=" text-lg font-bold capitalize">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold">{clickedChartInfo.budgetSum?.toLocaleString()} kr</span>
	</div>
{:else}
	<div class="flex w-full justify-center gap-4 underline">
		<span class=" text-lg font-bold capitalize">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold">{clickedChartInfo.budgetSum?.toLocaleString()} kr</span>
	</div>
{/if}
{#each budget.monthlyItems!.filter((item) => item.category === clickedChartInfo.budgetCategory) as item}
	<div class="border-opacity-10 flex w-full justify-between border-b-2 border-black">
		<span class="font-bold">{item.subCategory}</span>
		<h3>{item.price.toLocaleString()} kr</h3>
	</div>
{/each}
