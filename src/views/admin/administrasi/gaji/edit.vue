<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("gaji.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="gaji-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="gaji"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'GajiCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'GajiIndex' })"
        @close="router.push({ name: 'GajiIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import gajiCRUD from "@/services/api/modules/gajiCRUD";
import { defineGajiSchema } from "@/forms/gajiForm";
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
} = new useEditCrud<App.Models.Administrasi.Gaji>({
  crud: gajiCRUD,
  formId: "gaji-edit",
  moduleName: "Gaji",
  formData: {
    user: null,
  },
  processData: (values) => {
    return {
      ...values,
      user_id: values.user?.id,
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      user: mergeErrorsWithPrefix("user", errors),
    };
  },
});

const schema = defineGajiSchema({ t, formData });

loadFormData();
</script>
