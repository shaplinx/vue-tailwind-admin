<template>
  <div
    class="grid grid-cols-1 gap-4"
    :class="[
      only.length > 3 ? 'lg:grid-cols-3' : '',
      only.length < 3 && only.length > 1 ? 'md:grid-cols-2' : '',
    ]"
  >
    <dv-button
      v-for="(btn, key) in props.only.filter((x) => !except.includes(x))"
      :variant="buttonMap[btn].variant"
      :class="[
        key === 0 ? 'col-span-1 md:col-span-2 lg:col-span-1' : '',
        key === only.length - 1 && key % 2 !== 0
          ? 'col-span-1 md:col-span-2 lg:col-span-1'
          : '',
        key === 0 && only.length - (1 % 2) == 0
          ? 'col-span-1 md:col-span-2 lg:col-span-2'
          : '',
      ]"
      :disabled="isSaving"
      @click="$emit(`${btn}`)"
      :loading="isSaving"
      ><fa :icon="buttonMap[btn].icon" class="mr-2" />{{
        buttonMap[btn].label ?? t(module + ".form." + btn)
      }}
    </dv-button>

  </div>
</template>
<script setup lang="ts">
import { defineProps, ref, PropType } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps({
  isSaving: Boolean,
  only: {
    type: Array as PropType<string[]>,
    default: [
      "submit",
      "submitClose",
      "submitNext",
      "submitNew",
      "close",
      "delete",
    ],
  },
  except: {
    type: Array,
    default: [],
  },
  module: {
    type: String,
    required: true,
  },
});
const buttonMap = ref<any>({
  submit: {
    variant: "primary",
    icon: "save",
  },
  submitClose: {
    variant: "secondary",
    icon: "arrow-left",
  },
  submitNext: {
    variant: "success",
    icon: "arrow-right",
  },
  submitNew: {
    variant: "accent",
    icon: "plus",
  },
  close: {
    variant: "warning",
    icon: "window-close",
    label: t("menu.close"),
  },
  delete: {
    variant: "error",
    icon: "trash",
    label: t("menu.delete"),
  },
  print: {
    variant:"default",
    icon: "print",
    label: t("menu.print")
  }
});
</script>
