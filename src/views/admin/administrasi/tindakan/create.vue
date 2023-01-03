<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("tindakan.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="tindakan-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="tindakan"
        :except="['delete','submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'TindakanCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'TindakanIndex' })"
        @close="() => router.push({ name: 'TindakanIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import tindakanCRUD from "@/services/api/modules/tindakanCRUD";
import { defineTindakanSchema } from "@/forms/tindakanForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Administrasi.Tindakan>>) => {
  router.push({ name: "TindakanEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Administrasi.Tindakan>({
  crud: tindakanCRUD,
  formId: "tindakan-create",
  formData: {
    bagian_operator: 0.5,
  }
});

const schema = defineTindakanSchema({ t, formData });
</script>
