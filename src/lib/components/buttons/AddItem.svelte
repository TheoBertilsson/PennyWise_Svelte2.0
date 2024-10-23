<script lang="ts">
	import DatePicker from '../meltUI/DatePicker.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({ forceVisible: true });
</script>

<button class=" w-full rounded-lg border-2 border-black p-4 shadow-md" use:melt={$trigger}>
	Add transaction</button
>

{#if $open}
	<div use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 500 }}
		></div>
		<div
			class="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg"
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-center text-lg font-medium text-black underline">
				Add Transaction
			</h2>

			<form method="POST" action="?/addItem" class="flex flex-col gap-4">
				<label for="name">Name</label>
				<input type="text" id="name" name="name" placeholder="Name" required />
				<label for="price">Price</label>
				<input type="number" id="price" name="price" placeholder="Price" min="0" required />

				<label for="category">Category</label>
				<select name="category" id="category">
					<option value="select" disabled selected>Select Category</option>
					<option value="savings">Savings</option>
					<option value="income">Income</option>
					<option value="food">Food</option>
					<option value="transport">Transport</option>
					<option value="housing">Housing</option>
					<option value="entertainment">Entertainment</option>
					<option value="subscription">Subscription</option>

					<option value="other">Other</option>
				</select><DatePicker />
				<div>
					<label for="monthly">Monthly</label>
					<input type="checkbox" id="monthly" name="monthly" placeholder="Monthly" checked />
				</div>


				<div class="mt-6 flex justify-end gap-4">
					<button
						use:melt={$close}
						class="inline-flex h-8 items-center justify-center rounded-sm
												bg-zinc-100 px-8 py-4 font-medium leading-none text-zinc-600"
					>
						Cancel
					</button>
					<button
						use:melt={$close}
						type="submit"
						class="bg-magnum-100 text-magnum-900 inline-flex h-8 items-center
												justify-center rounded-sm px-8 py-4 font-semibold leading-none"
					>
						Add Transaction
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
