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
        module="surat_sehat"
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
import SuratSehatCRUD from "@/services/api/modules/SuratSehatCRUD";
import { defineSuratSehatSchema } from "@/forms/suratSehatForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Pertemuan.SuratSehat>({
    onGetModelSuccess: (data: App.Models.Pertemuan.SuratSehat) => {
      emit("changed", data.pertemuan_id, data.pertemuan);
    },
    processData: (data) => {
      if (data) {
        data.pertemuan = undefined;
      }
      return data;
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "suratsehat_contents")?.input([]);
    },
    crud: SuratSehatCRUD,
    formId: "surat-sehat-form",
    moduleName: "surat_sehat",
  });
const schema = defineSuratSehatSchema({ t, formData: model });

init();
</script>
