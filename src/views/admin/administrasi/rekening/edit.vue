<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("rekening.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="rekening-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="rekening"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'RekeningCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'RekeningIndex' })"
        @close="router.push({ name: 'RekeningIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import rekeningCRUD from "@/services/api/modules/rekeningCRUD";
import { defineRekeningSchema } from "@/forms/rekeningForm";
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
} = new useEditCrud<App.Models.Administrasi.BallanceMutation>({
  crud: rekeningCRUD,
  formId: "rekening-edit",
  moduleName: "Rekening",
});

const schema = defineRekeningSchema({ t, formData });

loadFormData();
</script>
