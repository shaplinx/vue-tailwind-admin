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
        <dv-button v-if="router.options.history.state.back" @click="router.back()">
          <fa class="mr-2" icon="arrow-left"></fa>
          {{ t("menu.back") }}
        </dv-button>
      </dv-navbar-start>
      <dv-navbar-end class="gap-x-3">
        <ThemeSelector v-model="theme"/>
        <DropdownMenuVue>
          <dv-button data-set-theme="dark" variant="ghost">
            <icon-ellipsis-horizontal />
          </dv-button>
          <template #popper>
            <li>
              <a v-close-popper @click="onProfile">{{ t("menu.profile") }}</a>
            </li>
            <li>
              <a v-close-popper @click="onLogOut">{{ t("menu.logout") }}</a>
            </li>
          </template>
        </DropdownMenuVue>
      </dv-navbar-end>
    </dv-navbar>
  </div>
</template>
<script lang="ts" setup>
import { IconEllipsisHorizontal } from "daisyui-vue";
import { computed} from "vue";
import { ThemeName, usePreferencesStore } from "../../store/preferences";
import { useAuthStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import ThemeSelector from "../inputs/ThemeSelector.vue";
const { t } = useI18n();
const preferences = usePreferencesStore();


const theme = computed({
  get() {
    return preferences.theme
  },
  set(val) {
    preferences.changeTheme(val as ThemeName)
  }
})

const auth = useAuthStore();
const router = useRouter();
function onLogOut() {
  return auth
    .logout()
    .then((res) => {
      router.push({ name: "Login" });
      return res;
    })
    .catch((err) => {
      return err;
    });
}

function onProfile() {
  let id = auth?.user?.id;
  router.push({ name: "PegawaiEdit", params: { id } });
}
</script>
