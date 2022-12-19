<template>
  <div class="formkit-wrapper wrap">
    <div class="formkit-inner repeater-wrapper">
      <div class="formkit-content">
        <slot />
      </div>
      <button
        class="repeater-delete"
        @click.prevent="context?.node.emit('remove',props.context?.node.context?.attrs.order)"
        
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash3"
          viewBox="0 0 16 16"
        >
          <path
            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FormKitFrameworkContext } from "@formkit/core";

const props = defineProps({
  context: Object as PropType<FormKitFrameworkContext>,
});

</script>

<style>
.wrap {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.repeater-delete {
  background-color: rgb(239 68 68);
  border-radius: 0px 0.25rem 0.25rem 0px;
  color: rgb(255 255 255);
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 30px;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}


.repeater-delete:hover {
  background-color: rgb(185 28 28);
}


.repeater-delete:disabled {
  background-color: rgb(239 68 68);
  opacity: 50%;
  cursor: not-allowed;
}


.formkit-content {
  flex-grow: 1;
  padding: var(--fk-padding-input);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.repeater-wrapper {
  display: flex;
  align-items: stretch;
}
</style>
