<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { goto } from '$app/navigation';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('User is signed in');
				goto('/dashboard');
			} else {
				goto('/login');
			}
		});
	});
</script>

<slot />
