<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("obat.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="obat-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="obat"
        :except="['delete','submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'ObatCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'ObatIndex' })"
        @close="() => router.push({ name: 'ObatIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import obatCRUD from "@/services/api/modules/obatCRUD";
import { defineObatSchema } from "@/forms/obatForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Fasilitas.Farmasi.Obat>>) => {
  router.push({ name: "ObatEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Fasilitas.Farmasi.Obat>({
  crud: obatCRUD,
  formId: "obat-create",
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
</script>
