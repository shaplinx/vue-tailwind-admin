<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("icd10.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="icd10-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="icd10"
        :except="['delete','submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'Icd10Create' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'Icd10Index' })"
        @close="() => router.push({ name: 'Icd10Index' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import icd10CRUD from "@/services/api/modules/icd10CRUD";
import { defineIcd10Schema } from "@/forms/icd10Form";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Administrasi.ICD10>>) => {
  router.push({ name: "Icd10Edit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Administrasi.ICD10>({
  crud: icd10CRUD,
  formId: "icd10-create",
});

const schema = defineIcd10Schema({ t, formData });
</script>
