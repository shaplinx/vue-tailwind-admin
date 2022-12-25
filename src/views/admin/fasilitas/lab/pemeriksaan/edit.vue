<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("pemeriksaanLab.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pemeriksaanLab-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pemeriksaanLab"
        :is-saving="isSaving"
        @submit="submit()"
        :except="['submitNext']"
        @submitNew="submit({ name: 'PemeriksaanLabCreate' })"
        @submitClose="submit({ name: 'PemeriksaanLabIndex' })"
        @close="router.push({ name: 'PemeriksaanLabIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pemeriksaanLabCRUD from "@/services/api/modules/pemeriksaanLabCRUD";
import { definePemeriksaanLabSchema } from "@/forms/pemeriksaanLabForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";

import { useI18n } from "vue-i18n";
import { mergeErrorsWithPrefix } from "@/hooks/misc";

const { t } = useI18n();

const {
  destroy,
  router,
  isSaving,
  formData,
  isLoadingFormData,
  loadFormData,
  submit,
} = new useEditCrud<App.Models.Fasilitas.Lab.PemeriksaanLab>({
  crud: pemeriksaanLabCRUD,
  formId: "pemeriksaanLab-edit",
  moduleName: "PemeriksaanLab",
  formData: {
    kategori_lab:null,
    komponen_lab: null,
  },
  processErrors: (errors) => {
    return {
      ...errors,
      kategori_lab: mergeErrorsWithPrefix('kategori_lab',errors),
      komponen_lab: mergeErrorsWithPrefix('komponen_lab',errors),
    };
  },
});

const schema = definePemeriksaanLabSchema({ t, formData });

loadFormData();
</script>
