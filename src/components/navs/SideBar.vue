<template>
  <div>
    <Transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div
        v-show="!preferences.isMenuCompact"
        @click="preferences.toggleMenu(false)"
        class="w-full h-full md:hidden fixed inset-0 z-10 bg-black/70"
      ></div>
    </Transition>
    <aside
      class="z-40 top-0 fixed md:sticky lg:left-auto translate-x-0 h-screen overflow-x-hidden overflow-y-auto shrink-0 bg-neutral transition-all"
      :class="[
        preferences.isMenuCompact
          ? 'md:w-16 md:translate-x-0 md:p-0 -translate-x-full w-0'
          : 'w-64 ',
      ]"
    >
      <SideNav :compact="preferences.isMenuCompact" :items="NavItems" />
    </aside>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SideNav from "./SideNav.vue";
import { usePreferencesStore } from "../../store/preferences";

const preferences = usePreferencesStore();

const NavItems = ref<NavItem[]>([
  {
    label: "Dashoard",
    icon: "desktop",
    child: [
      {
        label: "Child 1",
        icon:"compass",
        child: [
          {
            label: "Child 1",
            icon: "cogs"
          },
        ],
      },
    ],
  },
  {
    label: "Home 2",
  },
  {
    label: "Home 3",
  },
]);
</script>
