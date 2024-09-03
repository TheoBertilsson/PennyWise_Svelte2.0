<script lang="ts">
  import LoginButton from "$lib/components/LoginButton.svelte";
import SignUpButton from "$lib/components/SignUpButton.svelte";
</script>

<header class="flex justify-center">
	<img src="/pennywise.png" alt="Clown face" class="w-[25%]" />
</header>
<main class="flex flex-col justify-evenly items-center gap-10">
	<section class="flex flex-row w-[25%] gap-5">
		<img src="/flying-money(1).png" alt="A five dollar bill with wings" />
		<div class="flex flex-col">
			<span class="font-semibold">Track your spending</span>
			<p>Add your expenses to see where your money is floating away</p>
		</div>
	</section>
	<section class="flex flex-row w-[25%] gap-5">
		<img src="budget.png" alt="Circle chart of a budget" />
		<div class="flex flex-col">
			<span class="font-semibold">Build a personal budget</span>
			<p>Make a personal budget and get tips for your economy</p>
		</div>
	</section>
	<section class="flex flex-row w-[25%] gap-5">
		<img src="/piggy-bank.png" alt="Piggy bank with a coin inserted" />
		<div class="flex flex-col">
			<span class="font-semibold">Start saving</span>
			<p>Start tracking your savings and reach your goal</p>
		</div>
	</section>
  <SignUpButton/>
	<LoginButton/>
</main>
