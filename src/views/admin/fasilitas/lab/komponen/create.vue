<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("komponenLab.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="komponenLab-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="komponenLab"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        :except="['delete','submitNext']"
        @submitNew="submit({ name: 'KomponenLabCreate' })"
        @submitClose="submit({ name: 'KomponenLabIndex' })"
        @close="() => router.push({ name: 'KomponenLabIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import komponenLabCRUD from "@/services/api/modules/komponenLabCRUD";
import { defineKomponenLabSchema } from "@/forms/komponenLabForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Fasilitas.Lab.KomponenLab>>) => {
  router.push({ name: "KomponenLabEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Fasilitas.Lab.KomponenLab>({
  crud: komponenLabCRUD,
  formId: "komponenLab-create",
});

const schema = defineKomponenLabSchema({ t, formData });
</script>
