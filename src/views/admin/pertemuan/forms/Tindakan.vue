<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="pertemuan-tindakan-form"
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
import pertemuanTindakanCrud from "@/services/api/modules/pertemuanTindakanCRUD";
import { definePertemuanTindakanSchema } from "@/forms/pertemuanTindakanForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import { renameErrors } from "@/hooks/misc";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Pertemuan.PertemuanTindakan>({
    onGetModelSuccess: (data: App.Models.Pertemuan.PertemuanTindakan) => {
      emit("changed", data.pertemuan_id);
    },
    processData: (data) => {
      return {
        ...data,
        tindakan_contents: data?.tindakan_contents?.map((content) => {
          return {
            ...content,
            tindakan_id: content.tindakan?.id,
            operator_id: content.operator?.id,
            asisten_id: content.asisten?.id,
          };
        }),
      } as App.Models.Pertemuan.PertemuanTindakan;
    },
    processErrors: (err) => {
      return {
        ...err,
        ...renameErrors("tindakan_id", "tindakan", err),
        ...renameErrors("operator_id", "operator", err),
        ...renameErrors("asisten_id", "asisten", err),
      };
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "tindakan_contents")?.input([]);
    },
    crud: pertemuanTindakanCrud,
    formId: "pertemuan-tindakan-form",
    moduleName: "pertemuanTindakan",
    model: {} as App.Models.Pertemuan.PertemuanTindakan,
  });
const schema = definePertemuanTindakanSchema({ t, formData: model });

init();
</script>
