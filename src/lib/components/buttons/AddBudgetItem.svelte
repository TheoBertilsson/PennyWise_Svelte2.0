<script lang="ts">
	import DatePicker from '../meltUI/DatePicker.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import Select from '../meltUI/Select.svelte';
	import { currentDateIntervall, monthlyBudgetItems } from '../stores/budgetStores.svelte';
	const {
		elements: { trigger, overlay, content, title, close, portalled },
		states: { open }
	} = createDialog({ forceVisible: true });

	let isPaid = true;

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const response = await fetch('?/addBudgetItem', {
			method: 'POST',
			body: formData
		});
		if (response.ok) {
			console.log('Item added successfully!');
			const data = await response.json();
			monthlyBudgetItems.monthItems = data.budgetItems;
			console.log(response);
		} else {
			console.error('Failed to add item:', response.statusText);
		}
	}
</script>

<button
	class="flex w-full max-w-80 items-center justify-center rounded-lg border-2 border-black bg-white p-4 shadow-md"
	use:melt={$trigger}
>
	Add to budget</button
>

{#if $open}
	<div use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 500 }}
		></div>
		<div
			class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-lg"
			use:melt={$content}
		>
			<form
				onsubmit={handleSubmit}
				method="POST"
				action="?/addBudgetItem"
				class="flex flex-col gap-4"
			>
				<Select />
				<input type="hidden" name="createdAt" value={currentDateIntervall.startDate} />
				<input
					type="number"
					id="price"
					name="price"
					placeholder="Price"
					min="0"
					required
					class="flex h-10 min-w-[220px] items-center justify-between rounded-lg bg-white px-3 py-2 text-neutral-800 shadow transition-opacity hover:opacity-90"
				/>
				<div class="flex flex-col items-center justify-center gap-2">
					<div class="flex items-center justify-center gap-4">
						<label class="w-20" for="monthly">Monthly</label>
						<input
							class="h-4 w-4 cursor-pointer"
							type="checkbox"
							id="monthly"
							name="monthly"
							placeholder="Monthly"
							checked
						/>
					</div>
					<div class="flex items-center justify-center gap-4">
						<label class="w-20" for="isPaid">Paid</label>
						<input
							class="h-4 w-4 cursor-pointer"
							type="checkbox"
							id="isPaid"
							name="isPaid"
							placeholder="Paid"
							bind:checked={isPaid}
						/>
					</div>
				</div>
				{#if !isPaid}
					<DatePicker />
				{/if}
				<div class="mt-6 flex justify-center gap-4">
					<button
						use:melt={$close}
						class="inline-flex h-10 w-28 items-center justify-center
												rounded-lg border-2 border-neutral-500 bg-neutral-500 px-8 py-4 font-medium leading-none text-white hover:text-white/60"
					>
						Cancel
					</button>
					<button
						use:melt={$close}
						type="submit"
						class="h-10 w-48 rounded-lg border-2 border-neutral-800 bg-white font-semibold text-neutral-800 hover:text-neutral-800/60"
					>
						Add to budget
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
