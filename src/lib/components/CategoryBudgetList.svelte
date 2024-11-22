<script lang='ts'>
  import { clickedChartInfo } from "./stores/budgetStores.svelte"
  import type { Budget } from "./models/types";
  interface Props {
    budgetItems: Budget[];
  }
  let { budgetItems }: Props = $props();
</script>
<div class="flex w-full justify-between">
  <span class=" text-lg font-bold capitalize underline"
    >{clickedChartInfo.budgetCategory}</span
  >
  <span class=" text-lg font-bold underline"
    >{clickedChartInfo.budgetSum?.toLocaleString()} kr</span
  >
</div>

{#each budgetItems.filter((item) => item.category === clickedChartInfo.budgetCategory) as item}
  <div class="flex w-full justify-between border-b-2 border-[#0000070]">
    <span class="font-bold">{item.subCategory}</span>
    <span class="capitalize opacity-70">{item.category}</span>
    <h3>{item.price.toLocaleString()} kr</h3>
  </div>
{/each}
