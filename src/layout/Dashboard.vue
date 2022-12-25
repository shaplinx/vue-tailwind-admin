<template>
  <div class="flex w-full min-h-screen font-sans">
    <!-- <SideBar /> -->
    <SideBarVue />
    <div
      class="relative flex flex-grow flex-col w-full min-h-screen bg-base-300 overflow-y-auto overflow-x-hidden"
    >
      <TopBarVue />

      <main class="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl h-full mx-auto">
        <RouterView v-slot="{ Component, route }">
          <Transition
            mode="out-in"
            enter-from-class="-translate-x-24 opacity-0"
            enter-active-class="transition duration-150 transform"
            enter-to-class="translate-x-0 opacity-100"
            leave-from-class="translate-x-100 opacity-100"
            leave-active-class="transition duration-150 transform"
            leave-to-class="-translate-x-24 opacity-0"
          >
            <component :is="Component" :key="route.path" />
          </Transition>
        </RouterView>
      </main>
      <FooterVue />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FooterVue from "@/components/partials/Footer.vue";
import TopBarVue from "@/components/navs/TopBar.vue";
import SideBarVue from "@/components/navs/SideBar.vue";
</script>
