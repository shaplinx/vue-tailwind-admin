<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("tindakan.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="tindakan-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="tindakan"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'TindakanCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'TindakanIndex' })"
        @close="router.push({ name: 'TindakanIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import tindakanCRUD from "@/services/api/modules/tindakanCRUD";
import { defineTindakanSchema } from "@/forms/tindakanForm";
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
} = new useEditCrud<App.Models.Administrasi.Tindakan>({
  crud: tindakanCRUD,
  formId: "tindakan-edit",
  moduleName: "Tindakan",
  formData: {
    bagian_operator: 0.5,
  }
});

const schema = defineTindakanSchema({ t, formData });

loadFormData();
</script>
