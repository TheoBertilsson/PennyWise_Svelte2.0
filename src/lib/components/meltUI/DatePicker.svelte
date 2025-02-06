<script lang="ts">
	import { createDatePicker, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { CalendarDate } from '@internationalized/date';

	const today = new Date();
	const currentDay = today.getDate();
	const currentMonth = today.getMonth() + 1;
	const currentYear = today.getFullYear();

	const {
		elements: {
			calendar,
			cell,
			content,
			field,
			grid,
			heading,
			label,
			nextButton,
			prevButton,
			segment,
			trigger,
			hiddenInput
		},
		states: { months, headingValue, weekdays, segmentContents, open },
		helpers: { isDateDisabled, isDateUnavailable },
		options: { locale }
	} = createDatePicker({
		name: 'dueDate',
		forceVisible: true,
		defaultValue: new CalendarDate(currentYear, currentMonth, currentDay)
	});
</script>

<section>
	<div>
		<span use:melt={$label}>Due Date</span>
		<div use:melt={$field}>
			{#key $locale}
				{#each $segmentContents as seg}
					<div use:melt={$segment(seg.part)}>
						{seg.value}
					</div>
				{/each}
			{/key}
			<div>
				<button type="button" use:melt={$trigger}> IMG </button>
			</div>
			<input use:melt={$hiddenInput} />
		</div>
	</div>
	{#if $open}
		<div transition:fade={{ duration: 100 }} use:melt={$content}>
			<div use:melt={$calendar}>
				<header>
					<button use:melt={$prevButton}> prev </button>
					<div use:melt={$heading}>
						{$headingValue}
					</div>
					<button use:melt={$nextButton}> next </button>
				</header>
				<div>
					{#each $months as month}
						<table use:melt={$grid}>
							<thead aria-hidden="true">
								<tr>
									{#each $weekdays as day}
										<th>
											<div>
												{day}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each month.weeks as weekDates}
									<tr>
										{#each weekDates as date}
											<td
												role="gridcell"
												aria-disabled={$isDateDisabled(date) || $isDateUnavailable(date)}
											>
												<div use:melt={$cell(date, month.value)}>
													{date.day}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
							</tbody>
						</table>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</section>
