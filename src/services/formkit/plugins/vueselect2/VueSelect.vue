<template>
  <div class="vue-select-container">
    <VueSelect
      :modelValue="props.context?._value"
      @update:modelValue="(value: any) => props.context?.node.input(value)"
      v-bind="props.context?.attrs"
      :label="props.context?.attrs.displayLabel"
      @search="(search: string, loading:Function) => props.context?.attrs.onSearch?.()"
    />
  </div>
</template>
<script setup lang="ts">
import "vue-select/dist/vue-select.css";
import VueSelect from "vue-select";
import { FormKitFrameworkContext } from "@formkit/core";
import { PropType } from "vue";
const props = defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});

</script>
<style>
.vue-select-container {
  width: 100%;
}
</style>
