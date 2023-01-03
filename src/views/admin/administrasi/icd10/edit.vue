<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("icd10.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="icd10-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="icd10"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'Icd10Create' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'Icd10Index' })"
        @close="router.push({ name: 'Icd10Index' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import icd10CRUD from "@/services/api/modules/icd10CRUD";
import { defineIcd10Schema } from "@/forms/icd10Form";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";

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
} = new useEditCrud<App.Models.Administrasi.ICD10>({
  crud: icd10CRUD,
  formId: "icd10-edit",
  moduleName: "Icd10",
});

const schema = defineIcd10Schema({ t, formData });

loadFormData();
</script>
