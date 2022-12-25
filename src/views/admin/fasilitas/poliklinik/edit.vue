<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("poliklinik.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="poliklinik-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="poliklinik"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submit="submit()"
        @submitClose="submit({ name: 'PoliklinikIndex' })"
        @submitNew="submit({ name: 'PoliklinikCreate' })"
        @close="router.push({ name: 'PoliklinikIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import poliklinikCRUD from "@/services/api/modules/poliklinikCRUD";
import { definePoliklinikSchema } from "@/forms/poliklinikForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";
import {mergeErrorsWithPrefix} from "@/hooks/misc"

import { useI18n } from "vue-i18n";

const { t } = useI18n();

const {
  destroy,
  router,
  isSaving,
  formData,
  isLoadingFormData,
  loadFormData,
  submit,
} = new useEditCrud<App.Models.Fasilitas.Poliklinik>({
  crud: poliklinikCRUD,
  formId: "poliklinik-edit",
  moduleName: "Poliklinik",
  formData: {
    profesi: null,
  },
  processData: (values: any) => {
    return {
      ...values,
      profesi: values.profesi.map((pro: any) => pro.id),
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      profesi: mergeErrorsWithPrefix('profesi', errors),
    };
  },
});

const schema = definePoliklinikSchema({ t, formData });

loadFormData();
</script>
