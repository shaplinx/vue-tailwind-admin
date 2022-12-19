<template>
  <li
    v-if="item"
    :class="[
      compact ? 'rounded-3xl bg-neutral-focus  w-10' : 'w-full',
      isOpen && !compact ? 'bg-neutral-focus rounded-md' : '',
    ]"
    class="items-center text-neutral-content overflow-visible flex flex-col transition-width ease-in"
  >
    <a
      class="flex items-center  h-10 p-3 transition-all duration-300 ease-in-out"
      v-tooltip.right="{
        content: `${labelPrefix ?? ''}${item.label}`,
        distance: 17,
        disabled: !compact,
      }"
      :class="[
        compact
          ? 'rounded-3xl w-10 align-middle justify-center active:bg-primary-focus hover:bg-primary hover:text-primary-content   active:rounded-md hover:rounded-md '
          : 'align-middle w-full rounded-md gap-4 justify-start hover:bg-primary active:bg-primary-focus active:text-primary-content hover:text-primary-content active:border-l-4',
      ]"
      @click="onToggle()"
    >
      <fa :icon="item.icon ?? 'dot-circle'" size="sm"/>
      <span
        v-show="!compact"
        class="transition-opacity ease-in-out duration-300"
        :class="[compact ? 'opacity-0' : 'opacity-100']"
        >{{ item.label }}</span
      >
      <fa
        v-if="item.child?.length"
        v-show="!compact"

        class="bi bi-chevron-down h-4 w-4 ml-auto transition-all"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        icon="chevron-down"
      >

      </fa>
    </a>
    <div
      v-if="item.child?.length"
      as="div"
      v-show="isOpen"
      :class="[
        compact ? 'rounded-3xl' : 'p-1 w-full',
        isOpen ? 'max-h-96' : 'max-h-10',
      ]"
      class="flex justify-between p-0 text-sm transition-all"
    >
      <ul :class="compact ? 'rounded-3xl' : 'ml-1'" class="w-full">
        <NavItem
          :compact="compact"
          v-for="ch in item.child"
          :item="ch"
          :label-prefix="((labelPrefix ?? '') + item.label + ' / ')"
        ></NavItem>
      </ul>
    </div>
  </li>
</template>
<script setup lang="ts">
import { ref, PropType, defineProps, defineEmits } from "vue";
import NavItem from "./NavItem.vue";

const props = defineProps({
  compact: Boolean,
  item: Object as PropType<NavItem>,
  openChild: Boolean,
  labelPrefix: String
});

const isOpen = ref(false);

const onToggle = () => {
  if (!props.item?.child) return;
  isOpen.value = !isOpen.value;
};
</script>
