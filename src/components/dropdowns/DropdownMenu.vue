<template>
  <VDropdown>
    <slot> </slot>

    <template #popper>
      <DropdownMenuContent>
        <slot name="popper" :option="props.options">
          <li
            @click="option.action ? option.action(id) : () => {}"
            v-for="option in props.options"
            v-close-popper
          >
            <a
              ><fa v-if="option.icon" :icon="option.icon"></fa
              >{{ option[props.labelkey] }}</a
            >
          </li></slot
        >
      </DropdownMenuContent>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import { DropdownOption } from "./dropdown";
import DropdownMenuContent from "./DropdownMenuContent.vue";
const props = withDefaults(
  defineProps<{
    options?: DropdownOption[];
    label?: string;
    labelkey?: string;
    id?: any
  }>(),
  { labelkey: "label" }
);
</script>

<style scoped></style>
