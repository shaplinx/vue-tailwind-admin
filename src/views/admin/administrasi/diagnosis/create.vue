<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("diagnosis.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="diagnosis-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="diagnosis"
        :except="['delete', 'submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'DiagnosisCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'DiagnosisIndex' })"
        @close="() => router.push({ name: 'DiagnosisIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import diagnosisCRUD from "@/services/api/modules/diagnosisCRUD";
import { defineDiagnosisSchema } from "@/forms/diagnosisForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Diagnosis>>) => {
  router.push({ name: "DiagnosisEdit", params: { id: res.data.data.id } });
};


const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Diagnosis>({
  crud: diagnosisCRUD,
  formId: "diagnosis-create",
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
      icd10: mergeErrorsWithPrefix('icd10', errors),
    };
  },
});

const schema = defineDiagnosisSchema({ t, formData });
</script>
