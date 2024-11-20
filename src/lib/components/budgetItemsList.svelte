<script lang="ts">
	import type { Budget } from './models/types';
	import { clickedChartInfo } from './stores/budgetStores.svelte';
	interface Props {
		budgetItems: Budget[];
	}

	let { budgetItems }: Props = $props();
</script>

{#if !clickedChartInfo.budgetCategory}
	<div class="flex flex-col justify-center items-center w-full px-5 gap-2">
		<h2 class="w-full text-left font-bold text-lg underline">All budget items</h2>
		{#each budgetItems as item}
			<div class="flex justify-between w-full border-b-2 border-[#0000070]">
				<span class="font-bold">{item.subCategory}</span>
				<span class="capitalize opacity-70">{item.category}</span>
				<h3>{item.price}kr</h3>
			</div>
		{/each}
	</div>
{:else}
	<div>
		<h2>{clickedChartInfo.budgetCategory}</h2>
		<h3>{clickedChartInfo.budgetSum}</h3>
	</div>
{/if}
