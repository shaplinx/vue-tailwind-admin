<template>
  <div>
    <fieldset class="border border-base-300 rounded-lg px-2 pb-1 mb-4">
      <legend v-if="props.context?.label" class="font-bold text-sm">
        {{ props.context?.label }}
      </legend>
      <div class=" mt-4">
        <FormKit
          v-for="item in items"
          :key="item"
          :order="item"
          type="customGroup"
        >
          <slot />
        </FormKit>
        <FormKit
        input-class="w-full"
          type="button"
          :label="props.context?.attrs.addLabel || 'Add Item'"
          @click.prevent="addItem"
        ></FormKit>
      </div>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { FormKitFrameworkContext } from "@formkit/core";
import { ComputedRef, PropType, Ref, ref, watch, computed } from "vue";
import { token } from "@formkit/utils";

const props = defineProps({
  context: {
    type: Object as PropType<FormKitFrameworkContext>,
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
    for (let index = 0; index <= newVal.length - 1; index++) {
      let empty = true;

      Object.keys(newVal[index]).forEach((element) => {
        empty = empty && newVal[index][element] === undefined;
      });

      if (empty) {
        items.value.splice(index - offset, 1);
        offset++;
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

