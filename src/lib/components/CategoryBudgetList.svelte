<script lang="ts">
	import { clickedChartInfo } from './stores/budgetStores.svelte';
	import type { Budget } from './models/types';
	interface Props {
		budgetItems: Budget[];
		startDate: Date;
		endDate: Date;
	}
	let { budgetItems, startDate, endDate }: Props = $props();
	const monthlyBudget = budgetItems.filter((item) => {
		const createdDate = new Date(item.createdAt);
		if (item.dueDate) {
			const dueDate = new Date(item.dueDate);
			return dueDate >= startDate && dueDate <= endDate;
		} else {
			return createdDate >= startDate && createdDate <= endDate;
		}
	});
  $inspect(clickedChartInfo);

</script>

{#if clickedChartInfo.budgetCategory === 'income'}
	<div class="flex w-full justify-center gap-4">
		<span class=" text-lg font-bold capitalize underline">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold underline"
			>{clickedChartInfo.budgetSum?.toLocaleString()} kr</span
		>
	</div>
{:else}
	<div class="flex w-full justify-center gap-4">
		<span class=" text-lg font-bold capitalize underline">{clickedChartInfo.budgetCategory}</span>
		<span class=" text-lg font-bold underline"
			>{clickedChartInfo.budgetSum?.toLocaleString()} kr</span
		>
	</div>
{/if}
{#each monthlyBudget.filter((item) => {
	if (item.category === clickedChartInfo.budgetCategory) {
	}
}) as item}
	<div class="flex w-full justify-between border-b-2 border-[#0000070]">
		<span class="font-bold">{item.subCategory}</span>
		<span class="capitalize opacity-70">{item.category}</span>
		<h3>{item.price.toLocaleString()} kr</h3>
	</div>
{/each}
