<template>
  <dv-button-group>
    <dv-button
      v-for="(button, k) in buttons"
      :key="k"
      :v-bind="button"
      :variant="button.variant"
      @click.prevent="$emit('update:modelValue', button.value)"
      >{{ button.label }}</dv-button
    >
  </dv-button-group>
</template>
<script setup lang="ts">
import { PropType, defineProps } from "vue";

 defineProps({
  buttons: {
    type: Array as PropType<ButtonProp[]>,
    required: true,
  },
  modelValue: {
    type: [Number, String],
  },
  mode: {
    type: String as PropType<ButtonGroupMode>,
    default: "horizontal",
  },
});
</script>
