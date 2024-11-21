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
			<span class=" text-lg font-bold underline">All</span>
			<span class=" text-lg font-bold underline">{totalSum.toLocaleString()} kr</span>
		</div>

		{#each budgetItems as item}
			<div class="flex w-full justify-between border-b-2 border-[#0000070]">
				<span class="font-bold">{item.subCategory}</span>
				<span class="capitalize opacity-70">{item.category}</span>
				<h3>{item.price.toLocaleString()}kr</h3>
				<button
					class="flex h-6 w-6 items-center justify-center rounded-sm border-[0.5px] border-red-500 bg-white p-1 hover:bg-slate-100 active:bg-slate-300"
					><img src="/trash.svg" alt="Trashcan" /></button
				>
			</div>
		{/each}
	</div>
{:else}
	<div class="flex w-full flex-col items-center justify-center gap-2 px-5">
		{#if clickedChartInfo.budgetCategory && clickedChartInfo.budgetSum}
			<div class="flex w-full justify-between">
				<span class=" text-lg font-bold capitalize underline"
					>{clickedChartInfo.budgetCategory}</span
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
