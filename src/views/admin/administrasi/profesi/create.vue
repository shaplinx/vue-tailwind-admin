<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("profesi.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="profesi-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="profesi"
        :except="['delete','submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'ProfesiCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'ProfesiIndex' })"
        @close="() => router.push({ name: 'ProfesiIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import profesiCRUD from "@/services/api/modules/profesiCRUD";
import { defineProfesiSchema } from "@/forms/profesiForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Administrasi.Profesi>>) => {
  router.push({ name: "ProfesiEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Administrasi.Profesi>({
  crud: profesiCRUD,
  formId: "profesi-create",
  formData: {
    poliklinik: null,
  },
  processErrors: (errors) => {
    return {
      ...errors,
      icd10: mergeErrorsWithPrefix("poliklinik", errors),
    };
  },
});

const schema = defineProfesiSchema({ t, formData });
</script>
