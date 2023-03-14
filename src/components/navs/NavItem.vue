<template>
  <li
    v-if="item"
    :class="[
      compact ? 'rounded-3xl bg-neutral-focus  w-10' : 'w-full',
      isOpen && !compact ? 'bg-neutral-focus rounded-md' : '',
    ]"
    class="items-center text-neutral-content overflow-visible flex flex-col transition-width ease-in"
  >
    <a
      class="flex items-center h-10 p-3 transition-all duration-300 ease-in-out cursor-pointer"
      v-tooltip.right="{
        content: `${labelPrefix ?? ''}${t(item.label)}`,
        distance: 17,
        disabled: !compact,
      }"
      :class="[
        compact
          ? 'rounded-3xl w-10 align-middle justify-center active:bg-primary-focus hover:bg-primary hover:text-primary-content   active:rounded-md hover:rounded-md '
          : 'align-middle w-full rounded-md gap-4 justify-start hover:bg-primary active:bg-primary-focus active:text-primary-content hover:text-primary-content active:border-l-4',
        isActive && !isOpen ? 'bg-primary text-primary-content' : '',
      ]"
      @click="onToggle()"
    >
      <fa :icon="item.icon ?? 'dot-circle'" size="sm" />
      <span
        v-show="!compact"
        class="transition-opacity ease-in-out duration-300"
        :class="[compact ? 'opacity-0' : 'opacity-100']"
        >{{ t(item.label) }}</span
      >
      <fa
        v-if="item.subs?.length"
        v-show="!compact"
        class="bi bi-chevron-down h-4 w-4 ml-auto transition-all"
        :class="isOpen ? 'rotate-180' : 'rotate-0'"
        icon="chevron-down"
      >
      </fa>
    </a>
    <div
      v-if="item.subs?.length"
      as="div"
      v-show="isOpen"
      :class="[
        compact ? 'rounded-3xl mt-1' : 'p-1 w-full border-l-2',
        isOpen ? '' : 'max-h-10',
      ]"
      class="flex justify-between p-0 text-sm transition-all"
    >
      <ul :class="compact ? 'rounded-3xl flex flex-col gap-1' : 'ml-1'" class="w-full">
        <NavItem
          :compact="compact"
          v-for="ch in item.subs"
          :item="ch"
          :label-prefix="(labelPrefix ?? '') + t(item.label) + ' / '"
        ></NavItem>
      </ul>
    </div>
  </li>
</template>
<script setup lang="ts">
import {
  ref,
  PropType,
  defineProps,
  computed,
  defineEmits,
  watch,
} from "vue";
import NavItem from "./NavItem.vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const props = defineProps({
  compact: Boolean,
  item: Object as PropType<NavItem>,
  openSubs: Boolean,
  labelPrefix: String,
});

const emits = defineEmits(["childIsActive"]);

const isOpen = ref(false);

const routeActive = computed(() => {
  return route.name === props.item?.to;
});

const isChildActive = computed(() => {
  return nestedSome(props.item?.subs, (sub) => sub.to === route.name);
});

function nestedSome(
  array: any[] | undefined,
  callback: (item: any) => boolean
): boolean {
  if (!array) return false;
  return array.some(function (item: any) {
    if (item.subs) {
      return nestedSome(item.subs, callback);
    }
    return callback(item);
  });
}

const isActive = computed(() => {
  return isChildActive.value || routeActive.value;
});

watch(
  () => isActive.value,
  (val) => {
    emits("childIsActive", val);
  },
  {
    immediate: true,
  }
);


const onToggle = () => {
  if (props.item?.subs?.length) {
    isOpen.value = !isOpen.value;
  }

  if (props.item?.to) {
    router.push({ name: props.item.to });
  }
};
</script>
