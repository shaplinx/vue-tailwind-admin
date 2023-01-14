<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="pemeriksaan-form"
        @keydown.enter.prevent

      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pemeriksaan"
        :is-saving="isSubmitting"
        :only="['submit', 'delete']"
        @submit="submit()"
        @delete="destroy"
      />
   
    </dv-card-body>
  </dv-card>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import { BelongsToPertemuan } from "@/hooks/crud/extends/useBelongsToPertemuan";
import pemeriksaanCrud from "@/services/api/modules/pemeriksaanCRUD";
import { definePemeriksaanSchema } from "@/forms/pemeriksaanForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import { mergeErrorsWithPrefix, renameErrors } from "@/hooks/misc";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Pertemuan.Pemeriksaan>({
    onGetModelSuccess: (data: App.Models.Pertemuan.Pemeriksaan) => {
      emit("changed", data.pertemuan_id);
    },

    processErrors: (err) => {
      return {
        ...err,
        ...renameErrors("obat_id", "obat", err),
        farmasis: mergeErrorsWithPrefix("farmasis", err),
      };
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "diagnosis")?.input([]);
    },
    crud: pemeriksaanCrud,
    formId: "pemeriksaan-form",
    moduleName: "pemeriksaan",
  });
const schema = definePemeriksaanSchema({ t, formData: model });

init();
</script>
