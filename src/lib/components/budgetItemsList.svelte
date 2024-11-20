<script lang="ts">
	import type { Budget } from './models/types';
	import { clickedChartInfo } from './stores/budgetStores.svelte';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems }: Props = $props();
	const totalSum = budgetItems.reduce((sum, item) => (sum += item.price), 0);
</script>

{#if !clickedChartInfo.budgetCategory}
	<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
		<div class="flex w-full justify-between">
			<span class=" text-lg font-bold underline">All budget items</span>
			<span class=" text-lg font-bold underline">{totalSum} kr</span>
		</div>

		{#each budgetItems as item}
			<div class="flex w-full justify-between border-b-2 border-[#0000070]">
				<span class="font-bold">{item.subCategory}</span>
				<span class="capitalize opacity-70">{item.category}</span>
				<h3>{item.price}kr</h3>
			</div>
		{/each}
	</div>
{:else}
	<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
		{#if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
			<div class="flex w-full justify-between">
				<span class=" text-lg font-bold capitalize underline"
					>{clickedChartInfo.budgetCategory} budget items</span
				>
				<span class=" text-lg font-bold underline"
					>{clickedChartInfo.budgetSum.toLocaleString()} kr</span
				>
			</div>

			{#each budgetItems.filter((item) => item.category === clickedChartInfo.budgetCategory) as item}
				<div class="flex w-full justify-between border-b-2 border-[#0000070]">
					<span class="font-bold">{item.subCategory}</span>
					<span class="capitalize opacity-70">{item.category}</span>
					<h3>{item.price.toLocaleString()} kr</h3>
				</div>
			{/each}
		{/if}
	</div>
{/if}
