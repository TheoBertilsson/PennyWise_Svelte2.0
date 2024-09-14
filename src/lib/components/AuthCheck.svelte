<script lang="ts">
import { user } from "$lib/stores/stores";
</script>

 {#if $user}
  <slot />
	{:else}
		<p>
			You must be signed in to view this page
			<a href="/">Sign in</a>
		</p>
 {/if}
