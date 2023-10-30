<template>
  <!-- Static sidebar for desktop -->
  <div class="hidden lg:flex lg:flex-shrink-0">
    <div class="flex w-20 flex-col">
      <div class="flex min-h-0 flex-1 flex-col overflow-y-auto bg-indigo-600">
        <div class="flex-1">
          <div class="flex items-center justify-center bg-indigo-700 py-4">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />

          </div>
          <nav aria-label="Sidebar" class="flex flex-col items-center space-y-3 py-6">
            <app-link @click="openDrawer(key); isDrawerContainerOpen =  menuHasChild(key)" v-for="(item, key) in navigation" :key="item.id" :to="item.to">
              <div class="flex items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700"
                :class="{ 'bg-indigo-800': item.active || item.childActive}">
                <Icon :icon="item.icon" aria-hidden="true"></Icon>
                <span class="sr-only">{{ item.label }}</span>
              </div>

              <!-- <Teleport v-if="item.child" to="body" disabled>
                <div v-show="isDrawerOpened(key)" @click="closeDrawer()" @mouseover="closeDrawer()" class="fixed inset-20 bg-transparent" />
                <Transition :enter-active-class="enableTransition ? 'transition-all ease-in-out duration-300 transform' : 'transition-none' " enter-from-class="w-0"
                  enter-to-class="w-56" :leave-active-class="enableTransition ? 'transition-all ease-in-out duration-300 transform' : 'transition-none'"
                  leave-from-class="w-56" leave-to-class="w-0">
                  <div v-show="isDrawerOpened(key)"
                    class="absolute left-20 top-0  flex h-full w-56  flex-col overflow-y-auto overflow-x-hidden border-r border-gray-200 bg-white">
                    {{ item.label }}
                    <TreeNav class="w-56" :navigation="item.child"></TreeNav>
                  </div>
                </Transition>
              </Teleport> -->

            </app-link>
          </nav>

        </div>
        <div class="flex flex-shrink-0 pb-5">
          <a href="#" class="w-full flex-shrink-0">
            <img class="mx-auto block h-10 w-10 rounded-full" src="" alt="" />
            <div class="sr-only">
              <p>{{ user.name }}</p>
              <p>Account settings</p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <Teleport to="body" :disabled="!isCompact">
    <Transition :enter-active-class="'transition-all ease-in-out duration-300 transform'"
      enter-from-class="w-0" enter-to-class="w-56"
      :leave-active-class="'transition-all ease-in-out duration-300 transform'"
      leave-from-class="w-56" leave-to-class="w-0">
      <aside class="overflow-x-hidden border-r transition-all transform border-gray-200 bg-white" :class="{'absolute left-20 top-0 h-full':isCompact}" v-show="isDrawerContainerOpen || !isCompact">
        <template v-for="(item, key) in navigation">
          <div  v-if="!isCompact" v-show="activeParentMenu === key" @click="closeDrawer()" @mouseover="closeDrawer()" class="fixed tup-0 left-80 h-full w-full bg-transparent" />
          <div v-if="item.child?.length && activeParentMenu === key"
            class="flex h-full w-60 flex-col overflow-y-auto">
            <TreeNav :navigation="item.child"></TreeNav>
          </div>

        </template>
      </aside>
    </Transition>
  </Teleport>
  </div>
</template>
<script setup lang="ts">
import { Transition, ref, onMounted, computed } from 'vue';
import AppLink from './AppLink.vue';
import TreeNav from './TreeNav.vue';
const props = defineProps<{
  navigation: Base.Component.Menu.MenuItem[],
  user: Base.User,
}>()


function getChildActive() {
  for (let id = 0; id < props.navigation.length; id++) {
    const element = props.navigation[id];
    if (element.active || element.childActive) {
      return id 
    }
  }
  return null
 
}

const openedDrawer = ref<number | null>(null);

const activeParentMenu= computed(()=> {
  return getChildActive();
})

const enableTransition = ref(true);

function menuHasChild(key: number) {
    return props.navigation[key].child?.length ? true : false
  }

function checkAnimation(newval: number | null, oldval: number | null) {


  enableTransition.value = (newval === null || oldval === null)
  if (enableTransition.value) return
  enableTransition.value = (menuHasChild(oldval!) && menuHasChild(newval!)) ? false : true
}

function openDrawer(id: number | null): void {
  checkAnimation(id, openedDrawer.value)
  openedDrawer.value = id
}

function closeDrawer(): void {
  isDrawerContainerOpen.value =false;
}

function isDrawerOpened(id: number | null): boolean {
  return openedDrawer.value === id
}

const isDrawerContainerOpen = ref(false)

const isCompact = ref(false);


</script>