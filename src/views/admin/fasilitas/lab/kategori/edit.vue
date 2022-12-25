<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("kategoriLab.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="kategoriLab-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="kategoriLab"
        :is-saving="isSaving"
        @submit="submit()"
        :except="['submitNext']"
        @submitNew="submit({ name: 'KategoriLabCreate' })"
        @submitClose="submit({ name: 'KategoriLabIndex' })"
        @close="router.push({ name: 'KategoriLabIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import kategoriLabCRUD from "@/services/api/modules/kategoriLabCRUD";
import { defineKategoriLabSchema } from "@/forms/kategoriLabForm";
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
} = new useEditCrud<App.Models.Fasilitas.Lab.KategoriLab>({
  crud: kategoriLabCRUD,
  formId: "kategoriLab-edit",
  moduleName: "KategoriLab",
});

const schema = defineKategoriLabSchema({ t, formData });

loadFormData();
</script>
