<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("pegawai.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pegawai-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pegawai"
        :except="['delete','submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'PegawaiCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'PegawaiIndex' })"
        @close="() => router.push({ name: 'PegawaiIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pegawaiCRUD from "@/services/api/modules/pegawaiCRUD";
import { definePegawaiSchema } from "@/forms/pegawaiForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";


const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.User>>) => {
  router.push({ name: "PegawaiEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.User>({
  crud: pegawaiCRUD,
  formId: "pegawai-create",
  formData: {
    profesi:null,
    roles: null,
  },
  processData: (values) => {
    return {
      ...values,
      profesi_id: values.profesi?.id,
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      profesi: mergeErrorsWithPrefix('profesi', errors),
      roles: mergeErrorsWithPrefix('roles', errors)
    };
  },
});

const schema = definePegawaiSchema({ t, formData });
</script>
