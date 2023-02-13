<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="surat-sehat-form"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="surat_sakit"
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
import SuratSakitCRUD from "@/services/api/modules/SuratSakitCRUD";
import { defineSuratSakitSchema } from "@/forms/suratSakitForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Pertemuan.SuratSakit>({
    onGetModelSuccess: (data: App.Models.Pertemuan.SuratSakit) => {
      emit("changed", data.pertemuan_id, data.pertemuan);
    },
    processData: (data) => {
      if (data) {
        data.pertemuan = undefined;
      }
      return data;
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "suratsakit_contents")?.input([]);
    },
    crud: SuratSakitCRUD,
    formId: "surat-sakit-form",
    moduleName: "surat_sakit",
  });
const schema = defineSuratSakitSchema({ t, formData: model });

init();
</script>
