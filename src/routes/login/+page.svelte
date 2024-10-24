<script lang="ts">
	import SignInWithGoogle from '$lib/components/SignInWithGoogle.svelte';
</script>

<header class="flex h-[30vh] justify-center">
	<img src="/pennywise.png" alt="Clown face" />
</header>
<main class="flex flex-col items-center justify-center">
	<article class="mb-10 mt-5 flex flex-col items-center justify-evenly gap-[8vh]">
		<section class="flex w-[70%] flex-row gap-5">
			<img src="/flying-money(1).png" alt="A five dollar bill with wings" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="font-semibold underline">Track your spending</span>
				<p class="text-sm">Add your expenses to see where your money is floating away</p>
			</div>
		</section>
		<section class="flex w-[70%] flex-row gap-5">
			<img src="budget.png" alt="Circle chart of a budget" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="text-md font-semibold underline">Build a budget</span>
				<p class="text-sm">Make a personal budget and get tips for your economy</p>
			</div>
		</section>
		<section class="flex w-[70%] flex-row gap-5">
			<img src="/piggy-bank.png" alt="Piggy bank with a coin inserted" class="h-[7vh]" />
			<div class="flex flex-col">
				<span class="font-semibold underline">Start saving</span>
				<p class="text-sm">Start tracking your savings and reach your goal</p>
			</div>
		</section>
	</article>
	<SignInWithGoogle />
</main>
