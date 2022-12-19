<template>
  <div class="flex w-full min-h-screen font-sans">
    <div
      class="relative flex flex-grow flex-col w-full min-h-screen bg-base-300 overflow-y-auto overflow-x-hidden"
    >
      <main class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl h-full mx-auto">
        <RouterView v-slot="{ Component }">
          <FadeInOut entry="left" exit="left" :duration="200" mode="out-in">
            <component :is="Component" />
          </FadeInOut>
        </RouterView>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
