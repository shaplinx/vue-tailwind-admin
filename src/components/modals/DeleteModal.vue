<template>
  <vue-final-modal
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="w-10/12 sm:w-8/12"
  >
    <dv-card class="bg-base-100" bordered>
      <dv-button @click="close" variant="ghost" class="absolute right-3 top-3"
        ><fa size="lg" icon="circle-xmark"></fa
      ></dv-button>
      <dv-card-body>
        <dv-card-title>
          {{ t(`${params.moduleName}.delete-modal-title`) }}
        </dv-card-title>
        {{ t(`${params.moduleName}.delete-modal-content`) }}

        <div class="flex flex-wrap gap-2">
          <template v-if="Array.isArray(params.id)">
            <dv-badge v-for="id in params.id">{{ id }}</dv-badge>
          </template>
          <template v-else>
            <dv-badge>{{ params.id }}</dv-badge>
          </template>
        </div>
        <div
          class="ml-auto w-full sm:w-8/12 mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2"
        >
          <dv-button @click="close()" variant="accent">{{
            t("menu.no")
          }}</dv-button>
          <dv-button
            :loading="isDeleting"
            @click="onYes(params, close)"
            variant="secondary"
            >{{ t("menu.yes") }}</dv-button
          >
        </div>
      </dv-card-body>
    </dv-card>
  </vue-final-modal>
</template>

<script lang="ts" setup>
import { CRUD } from "@/services/api/modules/crud/crud";

import { useI18n } from "vue-i18n";
import { ref } from "vue";

interface DeleteModalParams<T> {
  id: any;
  moduleName: string;
  deleteFn: CRUD<any>["destroy"];
  onSuccess: Function;
}

const isDeleting = ref(false);

const deleteFn = (
  params: DeleteModalParams<any>,
  id: number | string,
  close: any,
  execute: boolean
) => {
  isDeleting.value = true;
  params.deleteFn!({ id })
    .then(() => {
      if (execute) {
        close();
        params.onSuccess();
      }
    })
    .finally(() => {
      if (execute) {
        isDeleting.value = false;
      }
    });
};

const onYes = (params: DeleteModalParams<any>, close: any) => {
  if (Array.isArray(params.id)) {
    params.id.forEach((el, key) => {
      deleteFn(params, el, close, key === params.id.length - 1);
    });
  } else {
    deleteFn(params, params.id, close, true);
  }
};

const { t } = useI18n();
</script>
