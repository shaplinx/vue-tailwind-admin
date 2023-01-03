<template>
  <ButtonGroupInput :buttons="buttons" v-model="model" />
</template>
<script setup lang="ts">
import ButtonGroupInput from "@/components/buttons/ButtonGroupInput.vue";
import { FormKitFrameworkContext } from "@formkit/core";
import { PropType, ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});

const { t } = useI18n();

const model = computed<string | number>({
  get() {
    return props.context?._value;
  },

  set(val: string | number) {
    props.context?.node.input(val);
  },
});

const buttons = ref([
  {
    value: 0,
    variant: model.value == 0 ? "error" : "default",
    label: t("menu.status.0"),
  },
  {
    value: 1,
    label: t("menu.status.1"),
    variant: model.value == 1 ? "warning" : "default",
    
  },
  {
    value: 2,
    label: t("menu.status.2"),
    variant: model.value == 2 ? "success" : "default",
  },
]);

const colorMaps = ["error", "warning", "success"];

const renderColor = (index: number): string => {
  if (index < 0 || index > 3) {
    return "default";
  }
  return colorMaps[index];
};

watch(model, (val: string | number) => {
  for (let i = 0; i < buttons.value.length; i++) {
    if (+buttons.value[i].value !== +val) {
      buttons.value[i].variant = "default";
    } else {
      buttons.value[i].variant = renderColor(+val);
    }
  }
});
</script>
