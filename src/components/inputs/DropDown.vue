<template>
  <DropdownMenuVue v-bind="$attrs">
    <dv-button outline :size="size">{{ options.find((x:any)=> x.value === modelValue)?.label ?? $t("menu.selectDate") }}</dv-button>

    <template #popper>
      <li
        v-close-popper
        v-for="option in options"
        @click="$emit('update:modelValue', option)"
      >
        <a
          ><fa v-if="option.icon" :icon="option.icon"></fa>{{ option.label }}</a
        >
      </li>
    </template>
  </DropdownMenuVue>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";

defineProps(["modelValue", "options", "size"]);
</script>
