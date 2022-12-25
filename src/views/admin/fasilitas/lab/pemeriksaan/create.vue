<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("pemeriksaanLab.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pemeriksaanLab-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pemeriksaanLab"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        :except="['delete','submitNext']"
        @submitNew="submit({ name: 'PemeriksaanLabCreate' })"
        @submitClose="submit({ name: 'PemeriksaanLabIndex' })"
        @close="() => router.push({ name: 'PemeriksaanLabIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pemeriksaanLabCRUD from "@/services/api/modules/pemeriksaanLabCRUD";
import { definePemeriksaanLabSchema } from "@/forms/pemeriksaanLabForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import {mergeErrorsWithPrefix} from "@/hooks/misc"

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Fasilitas.Lab.PemeriksaanLab>>) => {
  router.push({ name: "PemeriksaanLabEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Fasilitas.Lab.PemeriksaanLab>({
  crud: pemeriksaanLabCRUD,
  formId: "pemeriksaanLab-create",
  formData: {
    kategori_lab:null,
    komponen_lab: null,
  },
  processData: (values: any): App.Models.Fasilitas.Lab.PemeriksaanLab => {
    return {
      ...values,
      kategori_lab_id: values.kategori_lab.id
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      kategori_lab: mergeErrorsWithPrefix('kategori_lab',errors),
      komponen_lab: mergeErrorsWithPrefix('komponen_lab',errors),
    };
  },
});

const schema = definePemeriksaanLabSchema({ t, formData });
</script>
