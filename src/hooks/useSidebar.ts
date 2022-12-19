import { ref } from "vue";

const isOpen = ref(false)

const isCompact = ref(false)

export function useSidebar() {
  return {
    isOpen, isCompact
  };
}
