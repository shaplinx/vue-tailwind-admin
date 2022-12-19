<template>
  <div class="w-full">
    <dv-navbar class="bg-base-100 shadow-lg border-b-4 border-primary">
      <dv-navbar-start class="flex-1 gap-x-2">
        <dv-button
          @click="preferences.toggleMenu()"
          class="block"
          variant="ghost"
          ><svg
            v-if="!preferences.isMenuCompact"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            class="w-5 h-5"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <path d="M9 4v16"></path>
              <path d="M15 10l-2 2l2 2"></path>
            </g>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            class="w-5 h-5"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="4" y="4" width="16" height="16" rx="2"></rect>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </g>
          </svg>
        </dv-button>

        <dv-input
          class="max-w-xs"
          :border="false"
          placeholder="Search"
          size="md"
        />
      </dv-navbar-start>
      <dv-navbar-end class="gap-x-3">
        <input
          type="checkbox"
          class="toggle"
          v-model="theme"
          v-tooltip.down="{
            content: `${theme ? 'Dark' : 'Light'} Mode`,
          }"
        />
        <dv-indicator>
          <dv-indicator-item>
            <dv-badge size="sm" type="secondary">99+</dv-badge>
          </dv-indicator-item>
          <dv-button variant="link" class="w-10 rounded-full">
            <dv-avatar
              src="http://daisyui.com/tailwind-css-component-profile-1@94w.png"
              size="md"
            />
          </dv-button>
        </dv-indicator>

        <dv-button @click="$router.push({name: 'Login'})" data-set-theme="dark" variant="ghost">
          <icon-ellipsis-horizontal />
        </dv-button>
      </dv-navbar-end>
    </dv-navbar>
  </div>
</template>
<script lang="ts" setup>
import {  IconEllipsisHorizontal } from "daisyui-vue";
import { ref, watch,  } from "vue";
import { usePreferencesStore } from "../../store/preferences";

const preferences = usePreferencesStore();
const theme = ref(preferences.theme == "dark" ? false :true);

watch(theme, (val) => {
  preferences.changeTheme(val ? "light" : "dark");
});
</script>
