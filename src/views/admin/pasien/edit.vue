<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("pasien.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pasien-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pasien"
        :is-saving="isSaving"
        @submit="submit()"
        @submitNext="
          submit((res) => {
            router.push({
              name: 'PertemuanCreate',
              params: {
                pasienId: res.data.data.id,
              },
            });
          })
        "
        @submitNew="submit({ name: 'PasienCreate' })"
        @submitClose="submit({ name: 'PasienIndex' })"
        @close="router.push({ name: 'PasienIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pasienCRUD from "@/services/api/modules/pasienCRUD";
import { definePasienSchema } from "@/forms/pasienForm";
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
} = new useEditCrud<App.Models.Pasien>({
  crud: pasienCRUD,
  formId: "pasien-edit",
  moduleName: "Pasien",
  formData: {
    alamat_idn: null,
    tmp_lahir: null,
  },
  processData: (values: any) => {
    return {
      ...values,
      tmp_lahir_id: values.tmp_lahir?.id || null,
      alamat_id: values.alamat_idn?.id || null,
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      tmp_lahir: errors.tmp_lahir_id ?? [],
      alamat_idn: errors.alamat_id ?? [],
    };
  },
});

const schema = definePasienSchema({ t, formData });

loadFormData();
</script>
