<template>
  <div>
    <fieldset class="border border-base-300 rounded-lg px-2 pb-1 ">
      <legend v-if="props.context?.label" class="font-bold text-sm">
        {{ props.context?.label }}
      </legend>
      <FormKit
        v-for="(item) in items"
        :key="item"
        :order="item"
        type="customGroup"
      >
        <slot />
      </FormKit>
      <FormKit
        type="button"
        :label="props.context?.attrs.addLabel || 'Add Item'"
        @click.prevent="addItem"
      ></FormKit>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { FormKitFrameworkContext } from "@formkit/core";
import { ComputedRef, PropType, Ref, ref,watch,computed } from "vue";
import { token } from "@formkit/utils";

const props = defineProps({
  context: {
    type:Object as PropType<FormKitFrameworkContext>,
    required: true,
  },
});

const items: Ref<string[]> = ref(props.context._value.map(() => token()));

const model: ComputedRef<any[]> = computed(() => {
  return props.context._value;
});

watch(model, (newVal, oldVal) => {
  if (items.value.length < newVal.length) {
    for (let index = items.value.length; index < newVal.length; index++) {
      items.value.push(token());
    }
  } else {
    var offset = 0;
    for (let index = 0; index <= newVal.length-1; index++) {
      let empty = true;
     
      Object.keys(newVal[index]).forEach((element) => {
        empty = empty && newVal[index][element] === undefined;
      });

      if (empty) {
        items.value.splice(index-offset,1);
        offset++
      }
    }
  }
});

const addItem = async () => {
  await items.value.push(token());
  return;
};

props.context.node.on("child", (e) => {
  e.payload.on("remove", async (e: any) => {
    items.value = items.value.filter((item) => item !== e.payload);
  });
});

</script>
<style>
/* fieldset {
  display: block;
  margin-inline-start: 2px;
  margin-inline-end: 2px;
  padding-block-start: 0.35em;
  padding-inline-start: 0.75em;
  padding-inline-end: 0.75em;
  padding-block-end: 0.625em;
  min-inline-size: min-content;
  border-width: 2px;
  border-style: groove;
  border-color: rgb(192, 192, 192);
  border-image: initial;
}

.formkit-fieldset {
  margin: var(--fk-margin-fieldset);
  padding: var(--fk-padding-fieldset);
  border-radius: var(--fk-border-radius);
  margin-bottom: 1.5rem;

}

.formkit-legend {
  font-family: var(--fk-font-family-legend);
  font-size: var(--fk-font-size-legend);
  font-weight: var(--fk-font-weight-legend);
} */
</style>
