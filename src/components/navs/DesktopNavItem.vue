<template>
  <app-link :key="item.id" :to="item.to">
    <div class="flex flex-col items-center align-middle"  v-element-hover="onHover">
      <div
        class="flex items-center rounded-lg p-4 text-neutral-content max-w-min hover:bg-primary-focus active:bg-primary active:ring-primary-content active:ring-1"
        :class="[isActive ? 'bg-primary text-primary-content' : 'bg-neutral-focus']">
        <Icon :icon="item.icon" aria-hidden="true"> </Icon>
        <span class="sr-only">{{ item.label }}</span>
      </div>
      <Collapse :when="isHovered ||isActive">
      <div class="text-xs truncate line-clamp-1 h-5 text-neutral-content text-center pt-1 px-2">
       {{ item.label }}
      </div>
    </Collapse>
    </div>

  </app-link>
</template>

<script setup lang="ts">
import AppLink from './AppLink.vue';
import { useMenuItem } from "./hooks/navigation"
import { watch, ref } from "vue"
import { vElementHover } from '@vueuse/components'
import { Collapse } from 'vue-collapsed';

const props = defineProps<{
  item: Base.Component.Menu.MenuItem,
}>()

const isHovered = ref(false)
function onHover (state:boolean) {
  isHovered.value=state
}
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