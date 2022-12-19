<template>
  <div :class="`btn-group ${props.mode == 'vertical' ? 'btn-group-vertical': ''}`">
    <dv-button
      v-for="button,k in buttons"
      :key="k"
      :color="props.modelValue == button.value ? button.color : undefined"
      :variant="button.variant"
      :size="button.size"
      :outline="button.outline"
      :isLoading="button.isLoading"
      :label="button.label"
      @click.prevent="$emit('update:modelValue', button.value)"
    ></dv-button>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import Button from "./Button.vue";
import {ButtonGroupMode, ButtonProp} from "./buttons"

const props = defineProps({
  buttons: {
    type: Object as PropType<ButtonProp[]>,
    required: true,
  },
  modelValue: {
    type: [Number, String],
  },
  mode: {
    type: String as PropType<ButtonGroupMode>,
    default : 'horizontal'
  }
});

// const onInput = (value) => {
//   console.log(value)
//   $emit('update:modelValue', button.key)
// }
</script>

