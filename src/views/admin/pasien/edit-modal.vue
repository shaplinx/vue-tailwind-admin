<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("pasien.edit-title") }} </dv-card-title>
      <FormKit :actions="false" v-model="formData" type="form" :disabled="isSaving" id="pasien-edit">
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons module="pasien" :is-saving="isSaving" @submit="submitMod({id:formData.id, afterSubmitSuccess: ()=> $emit('saved')})" :only="['submit']" />
    </dv-card-body>
  </dv-card>
</template>
  
<script lang="ts" setup>
import pasienCRUD from "@/services/api/modules/pasienCRUD";
import { definePasienSchema } from "@/forms/pasienForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import useEditCrud from "@/hooks/crud/useEditCrud";
import { defineProps, PropType } from "vue";
import { useI18n } from "vue-i18n";
import { RouteLocationRaw } from "vue-router";

type callback = (...args: any[]) => any;


const { t } = useI18n();

const props = defineProps({ pasienId: [Number, String], pasien: Object as PropType<App.Models.Pasien> })

const {
  isSaving,
  formData,
  isLoadingFormData,
  loadFormData,
  submit
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

const submitMod = async (
  { afterSubmitSuccess,
    afterSubmitError,
    id,
  }: {
    afterSubmitSuccess?: callback
    | undefined
    | string
    | RouteLocationRaw,
    afterSubmitError?: callback
    | undefined
    | string
    | RouteLocationRaw,
    id?: any
  } = {}) => {
    submit(afterSubmitSuccess,afterSubmitError,id)
};

const schema = definePasienSchema({ t, formData });

if (props.pasienId) {
  loadFormData(props.pasienId)
}
</script>
  