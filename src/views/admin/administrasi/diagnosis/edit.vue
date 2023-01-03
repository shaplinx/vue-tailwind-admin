<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("diagnosis.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="diagnosis-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="diagnosis"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'DiagnosisCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'DiagnosisIndex' })"
        @close="router.push({ name: 'DiagnosisIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import diagnosisCRUD from "@/services/api/modules/diagnosisCRUD";
import { defineDiagnosisSchema } from "@/forms/diagnosisForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";
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
} = new useEditCrud<App.Models.Diagnosis>({
  crud: diagnosisCRUD,
  formId: "diagnosis-edit",
  moduleName: "Diagnosis",
  formData: {
    icd10: null,
  },
  processData: (values) => {
    return {
      ...values,
      icd10_id: values.icd10.id,
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      icd10: mergeErrorsWithPrefix("icd10", errors),
    };
  },
});

const schema = defineDiagnosisSchema({ t, formData });

loadFormData();
</script>
