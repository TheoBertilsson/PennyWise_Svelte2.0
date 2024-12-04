<script lang="ts">
import 'iconify-icon';
</script>
<footer class="w-full h-16 bg-primary flex justify-evenly items-center fixed bottom-0">
<a href="/dashboard" aria-label="Dashboard">
    <iconify-icon icon="line-md:home" class="icons"></iconify-icon>
  </a>
<a href="/budget" aria-label="Budget">
    <iconify-icon icon="mdi:chart-arc" class="icons"></iconify-icon>
  </a>
  <a href="/savings" aria-label="Savings">
    <iconify-icon icon="mdi:attach-money" class="icons"></iconify-icon>
  </a>
  <a href="/settings" aria-label="Settings">
    <iconify-icon icon="mdi:settings" class="icons"></iconify-icon>
  </a>
  <a href="/logout" aria-label="Log out">
    <iconify-icon icon="mdi:logout" class="icons"></iconify-icon>
  </a>
</footer>

<style>
  .icons{
    font-size: 32px;
    color: #f8f5ef;
  }
</style>
