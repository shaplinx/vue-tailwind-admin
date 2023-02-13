<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="resep-form"
        @keydown.enter.prevent
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="resep"
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
import resepCrud from "@/services/api/modules/resepCRUD";
import { defineResepSchema } from "@/forms/resepForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import { mergeErrorsWithPrefix, renameErrors } from "@/hooks/misc";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Fasilitas.Farmasi.Resep>({
    onGetModelSuccess: (data: App.Models.Fasilitas.Farmasi.Resep) => {
      emit("changed", data.pertemuan_id, data.pertemuan);
    },
    processData: (data) => {
      if (data) {
        data.pertemuan = undefined;
      }
      return {
        ...data,
        farmasis_id: data?.farmasis?.id,
        resep_contents: data?.resep_contents?.map((content) => {
          return { ...content, obat_id: content.obat?.id };
        }),
      } as App.Models.Fasilitas.Farmasi.Resep;
    },
    processErrors: (err) => {
      return {
        ...err,
        ...renameErrors("obat_id", "obat", err),
        farmasis: mergeErrorsWithPrefix("farmasis", err),
      };
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "resep_contents")?.input([]);
    },
    crud: resepCrud,
    formId: "resep-form",
    moduleName: "pemeriksaan",
    model: {
      farmasis: null,
    } as App.Models.Fasilitas.Farmasi.Resep,
  });
const schema = defineResepSchema({ t, formData: model });

init();
</script>
