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
            :enter-active-class="transitionCss?.enterActive"
            :enter-from-class="transitionCss?.enterFrom"
            :enter-to-class="transitionCss?.enterTo"
            :leave-active-class="transitionCss?.leaveActive"
            :leave-from-class="transitionCss?.leaveFrom"
            :leave-to-class="transitionCss?.leaveTo"
            mode="out-in"
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
import { usePreferencesStore } from "@/store/preferences";
import { computed } from "vue";

const preferences = usePreferencesStore();

const transitionCss = computed(() => {
  if (preferences.isTransitionEnabled) {
    return {
      enterActive: "transform-gpu duration-300 ease-out",
      enterFrom: "opacity-0 -translate-x-40",
      enterTo: "opacity-100 translate-x-0",
      leaveActive: "transform-gpu duration-200 ease-in",
      leaveFrom: "opacity-100 translate-x-0",
      leaveTo: "opacity-0 -translate-x-40",
    };
  } else return undefined;
});
</script>
