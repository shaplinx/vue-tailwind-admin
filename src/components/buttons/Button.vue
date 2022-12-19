<template>
  <button
    v-ripple="{ isDisabled: disableRipple }"
    :disabled="props.isLoading"
    :class="`btn ${classes}`"
  >
    <template v-if="props.isLoading">
      <rhombus-loader :color="props.loadingColor"></rhombus-loader>
    </template>
    <template v-else>
      <slot name="default" :props="props"
        ><div class="flex flex-row gap-2 justify-around align-middle">
          <fa :icon="iconClass" />

          <span>{{ props.label }}</span>
        </div>
      </slot>
    </template>
  </button>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import RhombusLoader from "../loader/RhombusLoader.vue";
import {
  ButtonVariantClasses,
  ButtonColorClasses,
  ButtonSizeClasses,
  ButtonWidthClasses,
  ButtonProp,
} from "./buttons";

const colors: ButtonColorClasses = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
  ghost: "btn-ghost",
  link: "btn-link",
  default: "",
};

const sizes: ButtonSizeClasses = {
  large: "btn-lg",
  medium: "btn-md",
  small: "btn-sm",
  xsmall: "btn-xs",
  default: "",
};

const widths: ButtonWidthClasses = {
  wide: "btn-wide",
  block: "btn-block",
  default: "",
};

const variants: ButtonVariantClasses = {
  outline: "btn-outline",
  circle: "btn-circle",
  square: "btn-square",
  default: "",
};
const props = defineProps<ButtonProp>();
const classes = computed(() => {
  let cl: String = "";
  cl = cl + " " + colors[props.color || "default"] || colors.default;
  cl = cl + " " + variants[props.variant || "default"] || variants.default;
  cl = cl + " " + sizes[props.size || "default"] || sizes.default;
  cl = cl + " " + widths[props.width || "default"] || widths.default;
  if (props.outline) cl = "btn-outline " + cl;
  if (props.active) cl = "btn-active " + cl;

  return cl;
});
</script>
<style></style>
