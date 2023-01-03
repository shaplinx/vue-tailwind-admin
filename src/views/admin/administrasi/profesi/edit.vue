<template>
  <dv-card class="bg-base-100 text-base-content">
    <SpinnerOverlay :show="isLoadingFormData" />
    <dv-card-body>
      <dv-card-title> {{ t("profesi.edit-title") }} </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="profesi-edit"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="profesi"
        :is-saving="isSaving"
        :except="['submitNext']"
        @submitNew="submit({ name: 'ProfesiCreate' })"
        @submit="submit()"
        @submitNext="submit()"
        @submitClose="submit({ name: 'ProfesiIndex' })"
        @close="router.push({ name: 'ProfesiIndex' })"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import profesiCRUD from "@/services/api/modules/profesiCRUD";
import { defineProfesiSchema } from "@/forms/profesiForm";
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
} = new useEditCrud<App.Models.Administrasi.Profesi>({
  crud: profesiCRUD,
  formId: "profesi-edit",
  moduleName: "Profesi",
  formData: {
    poliklinik: null,
  },
  processErrors: (errors) => {
    return {
      ...errors,
      icd10: mergeErrorsWithPrefix("poliklinik", errors),
    };
  },

});

const schema = defineProfesiSchema({ t, formData });

loadFormData();
</script>
