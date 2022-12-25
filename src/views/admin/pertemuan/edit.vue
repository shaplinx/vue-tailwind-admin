<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("pertemuan.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pertemuan-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pertemuan"
        :is-saving="isSaving"
        @submit="submit()"
        @submitNew="submit({ name: 'PertemuanCreate' })"
        @submitNext="submit()"
        @submitClose="submit({ name: 'PertemuanIndex' })"
        @close="router.push({ name: 'PertemuanIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pertemuanCRUD from "@/services/api/modules/pertemuanCRUD";
import { definePertemuanSchema } from "@/forms/pertemuanForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import { dateTime } from "@/services/moment/moment";

import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";

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
} = new useEditCrud<App.Models.Pertemuan>({
  crud: pertemuanCRUD,
  formId: "pertemuan-edit",
  moduleName: "Pertemuan",
  formData: {
    pasien: null,
    pemeriksa: null,
    asisten: null,
    poliklinik: null,
    waktu_pemeriksaan: dateTime()
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

loadFormData();
</script>
