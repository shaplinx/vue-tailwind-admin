<template>
  <div class="grid grid-col-1 gap-1">
    <component :is="element" :key="item.id" :to="item.to " @click="onToggle()">
      <div
        class="group flex items-center rounded-md p-2 text-base font-medium text-gray-600 hover:bg-gray-100 active:bg-gray-200  hover:text-indigo-600"
        :class="[
          {'bg-gray-200 text-indigo-600': (isChildActive && !isDropdownOpen) || routeActive},
          linkClass
          ]"
        >
        <Icon :icon="item.icon" class="mr-3 h-6 w-6" aria-hidden="true"></Icon>
        {{ item.label }}
        <icon v-if="item.child" class="ml-auto transition-all transform" :class="{'rotate-180': isDropdownOpen}" :icon="faChevronDown"></icon>
      </div>
    </component>

    <Collapse :when="isDropdownOpen" v-if="item.child?.length">
      <div class="ml-6 relative before:absolute before:w-[1px] before:h-full  before:bg-gray-200 before:-left-1.5 before:top-0 before:bottom-0 before:my-auto" >
      <TreeNavItem v-for="child in item.child" :item="child"></TreeNavItem>
      </div>
    </Collapse>
  </div>
</template>
<script setup lang="ts">

import AppLink from './AppLink.vue';
import TreeNavItem from './TreeNavItem.vue';
import { ref, computed, watch } from 'vue';
import { Collapse } from 'vue-collapsed'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useMenuItem } from './hooks/navigation';


const props = defineProps<{
  item: Base.Component.Menu.MenuItem,
  linkClass?: string
}>()

const emits = defineEmits(["change:isActive"]);

const element = computed(()=> props.item.to ? AppLink : 'div');

const isDropdownOpen = ref(false);

const {
    isChildActive,
    routeActive,
    isActive
  } = useMenuItem(props.item)


watch(
  () => isActive.value,
  (val) => {
    if (val) isDropdownOpen.value = val
    emits("change:isActive", val);
  },
  {
    immediate: true,
  }
);


const onToggle = () => {
  if(props.item.child?.length) {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
}


</script>