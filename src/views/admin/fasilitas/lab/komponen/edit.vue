<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("komponenLab.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="komponenLab-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="komponenLab"
        :is-saving="isSaving"
        @submit="submit()"
        :except="['submitNext']"
        @submitNew="submit({ name: 'KomponenLabCreate' })"
        @submitClose="submit({ name: 'KomponenLabIndex' })"
        @close="router.push({ name: 'KomponenLabIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import komponenLabCRUD from "@/services/api/modules/komponenLabCRUD";
import { defineKomponenLabSchema } from "@/forms/komponenLabForm";
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
} = new useEditCrud<App.Models.Fasilitas.Lab.KomponenLab>({
  crud: komponenLabCRUD,
  formId: "komponenLab-edit",
  moduleName: "KomponenLab",

});

const schema = defineKomponenLabSchema({ t, formData });

loadFormData();
</script>
