<template>
  <app-link :key="item.id" :to="item.to">
    <div class="flex items-center rounded-lg p-4 text-indigo-200 hover:bg-indigo-700"
      :class="{ 'bg-indigo-800': isActive }">
      <Icon :icon="item.icon" aria-hidden="true">  </Icon> 
      <span class="sr-only">{{ item.label }}</span>
    </div>
  </app-link>
</template>

<script setup lang="ts">
import AppLink from './AppLink.vue';
import { useMenuItem } from "./hooks/navigation"
import {watch} from "vue"

const props = defineProps<{
  item: Base.Component.Menu.MenuItem,
}>()

const emits = defineEmits(['change:isActive'])

const { isActive } = useMenuItem(props.item)

  watch(
  () => isActive.value,
  (val) => {
    emits("change:isActive", val);
  },
  {
    immediate: true,
  }
);


</script>