<template>
  <div>
    <Transition as="template" enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0" enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300" leave-from-class="opacity-100"
      leave-to-class="opacity-0">
      <div v-show="isOpen" @click="() => $emit('update:isOpen', false)" class="fixed inset-0 bg-gray-600 bg-opacity-75" />
    </Transition>
    <Transition enter-active-class="transition-all ease-in-out duration-300 transform"
      enter-from-class="-translate-x-full" enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform" leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full">
      <div v-if="isOpen" class="fixed inset-0 z-40 flex max-w-xs">
        <div class="relative flex  max-w-xs flex-1 flex-col bg-white focus:outline-none">
          <div class="pt-5 pb-4">
            <div class="flex w-full items-center pl-4 pr-1">
              <img class="h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company" />
              <button type="button"
                class=" ml-auto flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                @click="() => $emit('update:isOpen', false)">
                <span class="sr-only">Close sidebar</span>
                <Icon :icon="faXmark" class="text-gray-400" />
              </button>
            </div>
            <TreeNav :navigation="navigation"></TreeNav>
          </div>
          <div class="flex flex-shrink-0 border-t border-gray-200 p-4">
            <a href="#" class="group block flex-shrink-0">
              <div class="flex items-center">
                <div>
                  <img class="inline-block h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="" />
                </div>
                <div class="ml-3">
                  <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">{{ user.name }}</p>
                  <p class="text-sm font-medium text-gray-500 group-hover:text-gray-700">Account Settings</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TreeNav from './TreeNav.vue';
import { Transition } from 'vue';

defineProps<{
  navigation: Base.Component.Menu.MenuItem[],
  user: Base.User,
  isOpen: boolean
}>()

defineEmits(['update:isOpen'])

</script>