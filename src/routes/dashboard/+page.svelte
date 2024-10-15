<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
</script>

	<main class="flex">
		<NavBar />
		<div class="w-full p-8">
			<h1 class="text-3xl font-bold mb-12">Current month</h1>
			<div class="flex justify-between space-x-4">
				<div class="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
					<span class="font-semibold">Remaining</span>
					<span class="text-2xl">0.0$</span>
				</div>
				<div class="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
					<span class="font-semibold">Income</span>
					<span class="text-2xl">0.0$</span>
				</div>
				<div class="w-1/3 bg-gray-200 p-4 rounded-lg shadow-md flex flex-col">
					<span class="font-semibold">Expenses</span>
					<span class="text-2xl">0.0$</span>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 mt-16">
				<a href="/savings" class="relative bg-gray-200 p-4 rounded-lg shadow-md h-32 ">
					<button class="absolute top-2 right-2 text-xl">+</button>
					<span class="text-xl font-semibold">Savings</span>
				</a>
				<a href="/budget" class="relative bg-gray-200 p-4 rounded-lg shadow-md h-90 row-span-2">
					<button class="absolute top-2 right-2 text-xl">+</button>
					<span class="text-xl font-semibold">Budget</span>
				</a>
				<a href="/transaction" class="relative bg-gray-200 p-4 rounded-lg shadow-md h-96 row-span-2">
					<button class="absolute top-2 right-2 text-xl">+</button>
					<span class="text-xl font-semibold">Transaction</span>
				</a>
				<a href="/recurring" class="relative bg-gray-200 p-4 rounded-lg shadow-md h-44">
					<button class="absolute top-2 right-2 text-xl">+</button>
					<span class="text-xl font-semibold">Recurring</span>
				</a>
			</div>
		</div>
	</main>
