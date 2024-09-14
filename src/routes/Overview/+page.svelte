<script lang="ts">
  import AuthCheck from '$lib/components/AuthCheck.svelte';
  import NavBar from '$lib/components/NavBar.svelte';
</script>
<AuthCheck>
<header>
  <NavBar />
</header>
<main>
  <h1>Overview</h1>
</main>
</AuthCheck>
