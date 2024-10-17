<script lang="ts">
	import { user } from '$lib/stores/firebaseUser';
</script>

{#if $user}
	<slot />
{:else}
	<p>
		You must be signed in to view this page
		<a href="/">Sign in</a>
	</p>
{/if}
