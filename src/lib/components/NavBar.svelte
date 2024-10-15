<script>
	import { auth } from "$lib/firebase";
	import { signOut } from "firebase/auth";

	let isNavOpen = true;

	function toggleNav() {
		isNavOpen = !isNavOpen;
	}
	async function signOutSSR() {
		const res = await fetch('/api/signin', { method: 'DELETE' });
		await signOut(auth);
	}
</script>

{#if isNavOpen}
	<nav
		class=" top-0 left-0 h-screen w-64 bg-secondary text-primary flex flex-col justify-between items-center"
	>
		<div class="w-full flex flex-col justify-center items-center relative">
			<button class="absolute top-0 left-0 text-lg w-12 h-12" on:click={toggleNav}>
				<i class="bi bi-x"></i>
			</button>
			<h2 class="text-2xl font-bold my-10 p-2">PennyWise</h2>

			<ul class="p-2">
				<li class="mb-2"><a href="/overview" class="text-lg hover:text-gray-400">Overview</a></li>
				<li class="mb-2">
					<a href="/transaction" class="text-lg hover:text-gray-400">Transactions</a>
				</li>
				<li class="mb-2"><a href="/budget" class="text-lg hover:text-gray-400">Budget</a></li>
				<li class="mb-2"><a href="/Pot" class="text-lg hover:text-gray-400">Pot</a></li>
				<li class="mb-2"><a href="/Recurring" class="text-lg hover:text-gray-400">Recurring</a></li>
			</ul>
		</div>
		<button class="text-lg hover:text-gray-400 p-4" on:click={signOutSSR}>Sign Out</button>
	</nav>
{:else}
	<button class="top-0 left-0 m-6 h-full text-xl" on:click={toggleNav}>
		<i class="bi bi-list"></i>
	</button>
{/if}

<style>
	.bi-x,
	.bi-list {
		font-size: 1.5rem;
	}
</style>
