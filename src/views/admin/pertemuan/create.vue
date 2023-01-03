<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("pertemuan.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pertemuan-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pertemuan"
        :except="['delete']"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitNew="submit({ name: 'PertemuanCreate' })"
        @submitClose="submit({ name: 'PertemuanIndex' })"
        @close="() => router.push({ name: 'PertemuanIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pertemuanCRUD from "@/services/api/modules/pertemuanCRUD";
import { definePertemuanSchema } from "@/forms/pertemuanForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { dateTime } from "@/services/moment/moment";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";


const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Pertemuan>>) => {
  router.push({ name: "PertemuanEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit, router } = new useCreateCrud<App.Models.Pertemuan>({
  crud: pertemuanCRUD,
  formId: "pertemuan-create",
  formData: {
    pasien: null,
    pemeriksa: null,
    asisten: null,
    poliklinik: null,
    waktu_pertemuan: dateTime().toISOString()
  },
  processData: (values: any): App.Models.Pertemuan => {
    return {
      ...values,
      pasien_id: values.pasien?.id,
      pemeriksa_id: values.pemeriksa?.id,
      asisten_id: values.asisten?.id,
      poliklinik_id: values.poliklinik?.id,
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      pasien: errors.pasien_id ?? [],
      pemeriksa: errors.pemeriksa_id ?? [],
      asisten: errors.asisten_id ?? [],
      poliklinik: errors.poliklinik_id ?? [],
    };
  },
});

const schema = definePertemuanSchema({ t, formData });
</script>
