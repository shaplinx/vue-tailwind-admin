<template>
  <InvoiceTable :modelValue="context?._value" v-bind="context?.attrs"></InvoiceTable>
</template>

<script setup lang="ts">
import InvoiceTable from '@/components/inputs/InvoiceTable.vue';
import { FormKitFrameworkContext } from "@formkit/core";
import { PropType } from "vue";


defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});


</script>
<style scoped>

</style>
