<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("obat.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="obat-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="obat"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'ObatCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'ObatIndex' })"
        @close="router.push({ name: 'ObatIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import obatCRUD from "@/services/api/modules/obatCRUD";
import { defineObatSchema } from "@/forms/obatForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
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
} = new useEditCrud<App.Models.Fasilitas.Farmasi.Obat>({
  crud: obatCRUD,
  formId: "obat-edit",
  moduleName: "Obat",
  formData: {
    nama: '',
    pabrik: '',
    sediaan: '',
    kemasan:'',
    harga_jual:null,
    harga_beli: null,
    stock: null,
    alert_stock: null,
  }
});

const schema = defineObatSchema({ t, formData });

loadFormData();
</script>
