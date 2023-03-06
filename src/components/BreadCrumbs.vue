<template>
  <div class="grid grid-cols-1  gap-1 mb-5">
    <dv-breadcrumb>
      <dv-breadcrumb-item @click="() => router.push(HomePage)">
        <fa :icon="{prefix:'far', iconName: 'hard-drive'}" class="mr-1" />
      </dv-breadcrumb-item>
      <dv-breadcrumb-item v-for="(crumb, key) in breadcrumbs" @click="breadcrumbClick(key)">
        <fa :icon="{ prefix: 'far', iconName: key == breadcrumbs.length - 1 ? 'file' : 'folder-open' }" class="mr-1" />
        {{ +crumb ? crumb : t(`menu.${crumb}`) }}
      </dv-breadcrumb-item>
    </dv-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { HomePage } from "@/router/index"


const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  let bread = route.fullPath.split('/');
  bread.splice(0, 2);
  if (+bread[bread.length-1]) {
    bread.pop()
  } 
  return bread;
})

function generateURL(key: number) {
  let str = import.meta.env.VITE_ADMIN_ROOT
  for (let index = 0; index <= key; index++) {
    str = str + '/' + breadcrumbs.value[index]
  }
  return str
}

function breadcrumbClick(key:number) {
  if (key != breadcrumbs.value.length -1) {
    router.push(generateURL(key))
  }
}
</script>
