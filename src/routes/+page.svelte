<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { auth } from '$lib/firebase';

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (!user) {
				goto('/login');
			} else {
				goto('/dashboard');
			}
		});
	});
</script>
