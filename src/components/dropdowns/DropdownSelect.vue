<template>
  <VDropdown>
    <dv-button v-bind="props.buttonProps">
      <div class="flex flex-row flex-grow align-middle">
        <fa v-if="modelValue.icon" :icon="modelValue.icon"></fa
        ><span class="mr-auto">{{
          modelValue[props.labelkey] || placeholder
        }}</span>
      </div>
      <fa class="ml-4" icon="fa-square-caret-down"></fa>
    </dv-button>
    <template #popper>
      <DropdownMenuContent>
        <li
          v-close-popper
          v-for="option in props.options"
          @click="$emit('update:modelValue', option)"
        >
          <a
            ><fa v-if="option.icon" :icon="option.icon"></fa
            >{{ option[props.labelkey] }}</a
          >
        </li>
      </DropdownMenuContent>
    </template>
  </VDropdown>
</template>

<script setup lang="ts">
import Button from "../buttons/Button.vue";
import { ButtonProp } from "../buttons/buttons";
import { DropdownOption } from "./dropdown";
import DropdownMenuContent from "./DropdownMenuContent.vue";
const props = withDefaults(
  defineProps<{
    options: DropdownOption[];
    labelkey?: string;
    modelValue: any;
    placeholder?: string;
    buttonProps?: ButtonProp;
  }>(),
  {
    labelkey: "label",
    placeholder: "Select One",
  }
);
</script>

<style scoped></style>
