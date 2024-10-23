<script>
	import { auth } from '$lib/firebase';
	import { signOut } from 'firebase/auth';

	let isNavOpen = $state(true);

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
		class=" left-0 top-0 flex h-screen w-64 flex-col items-center justify-between bg-secondary text-primary"
	>
		<div class="relative flex w-full flex-col items-center justify-center">
			<button class="absolute left-0 top-0 h-12 w-12 text-lg" onclick={toggleNav}>
				<i class="bi bi-x"></i>
			</button>
			<h2 class="my-10 p-2 text-2xl font-bold">PennyWise</h2>

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
		<button class="p-4 text-lg hover:text-gray-400" onclick={signOutSSR}>Sign Out</button>
	</nav>
{:else}
	<button class="left-0 top-0 m-6 h-full text-xl" onclick={toggleNav}>
		<i class="bi bi-list"></i>
	</button>
{/if}

<style>
	.bi-x,
	.bi-list {
		font-size: 1.5rem;
	}
</style>
