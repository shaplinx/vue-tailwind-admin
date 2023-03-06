<template>
  <footer
    class="w-full mt-auto h-16 flex items-center justify-center bg-base-200 text-base-content border-t-4 border-primary"
  >
    <span>©<strong> {{ AppName }}</strong> All Rights Reserverd</span>
  </footer>
</template>
<script setup lang="ts">
const AppName = import.meta.env.VITE_APP_NAME || 'BZ App';

</script>
