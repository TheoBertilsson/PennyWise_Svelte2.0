<script lang="ts">
	import { createSelect, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	const options: { [key: string]: string[] } = {
		savings: ['Emergency fund', 'Investment', 'Retirement'],
		income: ['Salary', 'Bonus', 'Gift'],
		food: ['Groceries', 'Dining out'],
		transport: ['Public transport', 'Uber', 'Car'],
		housing: ['Rent', 'Mortgage', 'Utilities'],
		entertainment: ['Movies', 'Concerts', 'Games'],
		subscription: ['TV', 'Spotify', 'Gym', 'Phone']
	};
	const {
		elements: { trigger, menu, option, group, groupLabel },
		states: { selectedLabel, open }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		}
	});
	let selectedGroup = $derived(
		Object.keys(options).find((groupName: string) => options[groupName].includes($selectedLabel))
	);
</script>

<div class="flex flex-col gap-1">
	<button
		class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2 text-neutral-800 shadow transition-opacity hover:opacity-90"
		use:melt={$trigger}
		aria-label="category"
	>
		{$selectedLabel || 'Select category'}
		<img src="/chevronDown.svg" alt="chevron down" />
	</button>
	{#if $open}
		<div
			class="z-50 flex max-h-[300px] flex-col overflow-y-auto rounded-lg bg-white p-1 shadow focus:!ring-0"
			use:melt={$menu}
			transition:fade={{ duration: 150 }}
		>
			{#each Object.entries(options) as [key, array]}
				<div use:melt={$group(key)} class="flex flex-col gap-1">
					<div
						class="px-4 py-1 font-semibold text-neutral-800 capitalize"
						use:melt={$groupLabel(key)}
					>
						{key}
					</div>
					{#each array as item}
						<div
							class=" hover:bg-text/10 focus:text-text/70 data-[highlighted]:bg-text/20 data-[highlighted]:text-text/90 cursor-pointer rounded-lg
						py-1 pr-4
						pl-8
						text-neutral-800 focus:z-10
						data-[disabled]:opacity-50"
							use:melt={$option({ value: item, label: item })}
						>
							{item}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
	<input type="hidden" name="subCategory" value={$selectedLabel} />
	<input type="hidden" name="category" value={selectedGroup} />
</div>
