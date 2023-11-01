<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-shrink-0" v-on-click-outside="onClickOutsideMenu">
    <div class="flex w-20 flex-col">
      <div class="flex min-h-0 flex-1 flex-col overflow-hidden bg-neutral">
          <div class="flex items-center justify-center bg-primary py-4">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />

          </div>
        <nav aria-label="Sidebar" class="flex flex-1  flex-col items-center space-y-3 overflow-y-auto py-6">
            <DesktopNavItem v-for="(item, key) in navigation" :item="item"
              @change:is-active="(val) => onChildActive(val, key)" @click="() => lastClicked = key"></DesktopNavItem>
          </nav>
        <div class="flex  flex-shrink-0 py-5">
          <a href="#" class="w-full flex-shrink-0">
            <img class="mx-auto block h-10 w-10 rounded-full" src="" alt="" />
            <div class="sr-only">
              <p>{{ user.name }}</p>
              <p>Account settings</p>
            </div>
          </a>
        </div>
        <div @click="() => isCompact =!isCompact" class="flex items-center text-primary-content justify-center h-16 hover:cursor-pointer hover:bg-primary-focus active:bg-primary bg-primary py-4">
          <svg
            v-if="!isCompact"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            class="h-6"
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
            class="h-6"

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
          </div>
      </div>
    </div>
    <aside class="overflow-hidden transition-all transform bg-base-100 "
      :class="[isCompact ? 'absolute top-0 left-20 h-full' : '']">

      <template v-for="(item, key) in navigation">
        <Transition :css="enableTransition" mode="in-out" class="overflow-hidden" enter-active-class="transition-[width]"
          enter-to-class="w-60" enter-from-class="w-0" leave-to-class="w-0" leave-from-class="w-60"
          leave-active-class="transition-[width]">
          <div v-if="item.child?.length && (activeStates[key] || lastClicked == key)"
            class="flex h-full flex-col overflow-x-hidden overflow-y-hidden  border-r border-base-300 ">
            <div class="p-3 mt-4 mx-4 font-medium text-xl text-900">{{ item.label }}</div>
            <div class="h-full m-4 border-dashed border-2 rounded-md border-base-300">
            <TreeNav class="w-60  overflow-x-hidden overflow-y-auto  " :navigation="item.child"></TreeNav>
            </div>
          </div>
        </Transition>
      </template>

    </aside>
  </div>
</template>
<script setup lang="ts">
import { Transition, ref, watch } from 'vue';
import TreeNav from './TreeNav.vue';
import DesktopNavItem from './DesktopNavItem.vue';
import { vOnClickOutside } from '@vueuse/components'
const props = defineProps<{
  navigation: Base.Component.Menu.MenuItem[],
  user: Base.User,
}>()


const activeStates = ref<boolean[]>([])
const lastClicked = ref<number | null>(null)
const enableTransition = ref(true);

watch(lastClicked, (nv, ov) => {
  checkAnimation(nv, ov)
})

function menuHasChild(key: number) {
  return props.navigation[key].child?.length ? true : false
}

function checkAnimation(newval: number | null, oldval: number | null) {


  enableTransition.value = (newval === null || oldval === null)
  if (enableTransition.value) return
  enableTransition.value = (menuHasChild(oldval!) && menuHasChild(newval!)) ? false : true
}


function onChildActive(val: boolean, key: number) {
  activeStates.value[key] = val;
  if (val) lastClicked.value = key
}

const isCompact = ref(true);

function onClickOutsideMenu() {
  if (!isCompact.value) return
  lastClicked.value = null;
  activeStates.value.fill(false);
}




</script>