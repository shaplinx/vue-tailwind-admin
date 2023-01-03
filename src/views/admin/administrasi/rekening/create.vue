<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("rekening.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="rekening-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="rekening"
        :except="['delete', 'submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'RekeningCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'RekeningIndex' })"
        @close="() => router.push({ name: 'RekeningIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import rekeningCRUD from "@/services/api/modules/rekeningCRUD";
import { defineRekeningSchema } from "@/forms/rekeningForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (
  res: AxiosResponse<ResponseData<App.Models.Administrasi.BallanceMutation>>
) => {
  router.push({ name: "RekeningEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } =
  new useCreateCrud<App.Models.Administrasi.BallanceMutation>({
    crud: rekeningCRUD,
    formId: "rekening-create",
  });

const schema = defineRekeningSchema({ t, formData });
</script>
