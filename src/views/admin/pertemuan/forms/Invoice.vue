<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="invoice-form"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="invoice"
        :is-saving="isSubmitting"
        :only="['submit', 'delete','print']"
        @print=" $router.push({name: 'InvoiceRead', params: {id:$route.params.id}})"
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
import invoiceCrud from "@/services/api/modules/invoiceCRUD";
import { defineInvoiceSchema } from "@/forms/invoiceForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy } =
  new BelongsToPertemuan<App.Models.Invoice>({
    onGetModelSuccess: (data: App.Models.Invoice) => {
      emit("changed", data.pertemuan_id, data.pertemuan);
    },
    processData: (data) => {
      if (data) {
        data.pertemuan = undefined;
      }
      return data;
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "invoice_contents")?.input([]);
    },
    crud: invoiceCrud,
    formId: "invoice-form",
    moduleName: "invoice",
  });
const schema = defineInvoiceSchema({ t, formData: model });

init();
</script>
