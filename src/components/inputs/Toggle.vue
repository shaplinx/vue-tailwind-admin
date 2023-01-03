<template>
  <dv-toggle
    :type="type"
    :size="size"
    @click="$emit('update:modelValue', !modelValue)"
    :checked="modelValue"
  />
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";

defineProps({
  modelValue: Boolean,
  size: String as PropType<"xs" | "sm" | "md" | "lg">,
  type: String as PropType<"neutral" | "primary" | "secondary" | "accent">,
});
</script>
