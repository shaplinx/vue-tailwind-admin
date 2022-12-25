<template>
  <span v-ripple :class="`badge ${classes}`">
    <slot name="default" :props="props">
      <fa v-if="iconClass" :icon="iconClass" />

      <span class="mx-1">
        {{ props.label }}
      </span>
    </slot>
  </span>
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import {
  BadgeColor,
  BadgeColorClasses,
  BadgeSize,
  BadgeSizeClasses,
} from "./badge";

const colors: BadgeColorClasses = {
  primary: "badge-primary",
  secondary: "badge-secondary",
  accent: "badge-accent",
  info: "badge-info",
  success: "badge-success",
  warning: "badge-warning",
  error: "badge-error",
  ghost: "badge-ghost",
  default: "",
};

const sizes: BadgeSizeClasses = {
  large: "badge-lg",
  medium: "badge-md",
  small: "badge-sm",
  xsmall: "badge-xs",
  default: "",
};

const props = defineProps({
  color: {
    type:String as PropType<BadgeColor>,
  },
  iconClass: {
    type:String,
  },
  label: {
    type:String,
  },
  size: {
    type:String as unknown as PropType<BadgeSize>,
  },
  outline: {
    type:Boolean,
    default: false,
  },
});
const classes = computed(() => {
  let cl: String = "";
  cl = (colors[props.color || "default"] || colors.default )+ " " + cl;
  cl = (sizes[props.size || "default"] || sizes.default) + " " + cl;
  if (props.outline) cl = "badge-outline " + cl;

  return cl;
});
</script>
<style></style>
