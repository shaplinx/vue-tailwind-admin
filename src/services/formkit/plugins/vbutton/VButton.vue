<template>
  <dv-button v-bind="context?.attrs" :label="context?.attrs.buttonLabel"></dv-button>
</template>
<script setup lang="ts">

import { FormKitFrameworkContext } from "@formkit/core";
import { PropType } from "vue";
import Button from "@/components/buttons/Button.vue";
defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});

</script>
