<template>
  <div
    class="w-full bg-base-300 m-auto py-16 min-h-screen flex items-center justify-center"
  >
    <dv-card width="6/12" class="bg-base-100 shadow-xl">
      <div class="text-center py-6">
        <h1 class="text-9xl font-bold text-purple-400">404</h1>
        <h1 class="text-6xl font-medium py-8"> {{ t("message.error.404-title") }}</h1>
        <p class="text-2xl pb-8 px-12 font-medium">
          {{ t("message.error.404-text") }}
        </p>
        <router-link to="admin/dashboard">
          <dv-button class="mx-5" color="primary" label="HOME" > {{ t("menu.dashboard") }}</dv-button>
        </router-link>
          <dv-button @click="$router.go(-2)" class="mx-5" color="primary" label="HOME" >{{ t("menu.back") }}</dv-button>
      </div>
    </dv-card>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const {t} = useI18n()
</script>

<style>
.text-9xl {
  font-size: 14rem;
}
@media (max-width: 645px) {
  .text-9xl {
    font-size: 5.75rem;
  }
  .text-6xl {
    font-size: 1.75rem;
  }
  .text-2xl {
    font-size: 1rem;
    line-height: 1.2rem;
  }
  .py-8 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .px-6 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
  .mr-6 {
    margin-right: 0.5rem;
  }
  .px-12 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
