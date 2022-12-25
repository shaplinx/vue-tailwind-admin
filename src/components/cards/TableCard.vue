<template>
  <div class="mt-8">
    <div class="mt-6">
      <div class="flex gap-2 my-2 flex-row-reverse items-start">
        <slot name="buttons" :buttons="buttons">
          <div v-if="buttons" class="btn-group">
          <dv-button v-for="button in buttons" v-bind="button" ><fa v-if="button.iconClass" class="mr-3"  :icon="button.iconClass"></fa>{{button.label}}</dv-button>
          </div>
        </slot>
        <slot name="title">
          <h2
            v-if="props.title"
            class="text-xl font-semibold mr-auto leading-tight text-base-content mb-2"
          >
            {{ props.title }}
          </h2>
        </slot>
        
      </div>
      <div v-if="useFilter">
        <FormKit
          @keydown.enter.prevent
          class=""
          :actions="false"
          :model-value="modelValue"
          @input="(val) => $emit('update:modelValue', val)"
          type="form"
          @submit.prevent
        >
          <div class="flex gap-2 mb-0 flex-col flex-wrap flex-grow sm:flex-row sm:flex-grow">
            <FormKitSchema :schema="props.filterSchema" />
          </div>
        </FormKit>
      </div>

      <div class="px-4 pt-0 pb-4 -mx-4 sm:-mx-8 sm:px-8">
        <div class="min-w-full bg-base-100 rounded-lg pb-5 shadow-md">
          <slot> </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FormKitSchemaNode } from "@formkit/core";
import { FormKitSchema } from "@formkit/vue";


const props = defineProps<{
  title?: String;
  buttons?: ButtonProp[];
  useFilter?: Boolean;
  filterTitle?: String;
  filterSchema: FormKitSchemaNode[];
  modelValue: any;
}>();
</script>
