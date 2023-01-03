<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("pegawai.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pegawai-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pegawai"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'PegawaiCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'PegawaiIndex' })"
        @close="router.push({ name: 'PegawaiIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pegawaiCRUD from "@/services/api/modules/pegawaiCRUD";
import { definePegawaiSchema } from "@/forms/pegawaiForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";
import { useI18n } from "vue-i18n";
import { mergeErrorsWithPrefix } from "@/hooks/misc";



const { t } = useI18n();

const {
  destroy,
  router,
  isSaving,
  formData,
  isLoadingFormData,
  loadFormData,
  submit,
} = new useEditCrud<App.Models.User>({
  crud: pegawaiCRUD,
  formId: "pegawai-edit",
  moduleName: "Pegawai",
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

loadFormData();
</script>
