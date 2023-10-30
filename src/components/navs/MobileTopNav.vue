<template>
        <!-- Mobile top navigation -->
        <div class="lg:hidden">
        <div class="flex items-center justify-between bg-indigo-600 py-2 px-4 sm:px-6 lg:px-8">
          <div>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company" />
          </div>
          <div>
            <button type="button"
              class="-mr-3 inline-flex cursor-pointer h-12 w-12 items-center justify-center rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="()=> $emit('update:isOpen',true)">
              <span class="sr-only">Open sidebar</span>
              <Icon :icon="faBars" />
            </button>
          </div>
        </div>
      </div>
</template>
<script setup lang="ts">
import {  faBars } from '@fortawesome/free-solid-svg-icons';

defineProps<{isOpen:boolean}>()
defineEmits(['update:isOpen'])
</script>