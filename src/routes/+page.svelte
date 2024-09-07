<script lang="ts">
	import LoginButton from '$lib/components/LoginButton.svelte';
	import SignUpButton from '$lib/components/SignUpButton.svelte';
</script>

<header class="flex justify-center h-[30vh]">
	<img src="/pennywise.png" alt="Clown face" />
</header>
<main class="flex flex-col justify-center items-center">
	<article class="flex flex-col justify-evenly items-center gap-[8vh] mt-5 mb-10">
		<section class="flex flex-row gap-5 w-[70%]">
			<img src="/flying-money(1).png" alt="A five dollar bill with wings" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="font-semibold underline">Track your spending</span>
				<p class="text-sm">Add your expenses to see where your money is floating away</p>
			</div>
		</section>
		<section class="flex flex-row w-[70%] gap-5">
			<img src="budget.png" alt="Circle chart of a budget" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="font-semibold underline text-md">Build a budget</span>
				<p class="text-sm">Make a personal budget and get tips for your economy</p>
			</div>
		</section>
		<section class="flex flex-row w-[70%] gap-5">
			<img src="/piggy-bank.png" alt="Piggy bank with a coin inserted" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="font-semibold underline">Start saving</span>
				<p class="text-sm">Start tracking your savings and reach your goal</p>
			</div>
		</section>
	</article>
	<SignUpButton />
	<LoginButton />
</main>
