<template>
  <div class="grid grid-cols-1 gap-5">
    <dv-navbar class="bg-base-100 rounded-box">
      <div class="flex w-full justify-end gap-2 items-center">
        <dv-button class="mr-auto" variant="accent" @click="destroy" size="sm">
          <fa icon="trash" class="mr-1" /> {{ t("menu.delete") }}
        </dv-button>
        <FormKit type="toggle" v-model="config.anonSignature" label="Anonymous" :classes="{
          outer: '$reset mt-2 flex gap-3 items-center mb-0',
          inner: '$reset',
          label: 'mb-1',
        }" />
        <FormKit type="toggle" v-model="config.details" label="Details" :classes="{
          outer: '$reset mt-2 flex gap-3 items-center mb-0',
          inner: '$reset',
          label: 'mb-1',
        }" />
        <dv-button @click="back({ name: 'InvoiceIndex' })" variant="secondary" size="sm">
          <fa icon="arrow-left" class="mr-1" /> {{ t("menu.back") }}
        </dv-button>
        <dv-button @click="
          edit({ name: 'InvoiceForm', params: { id: route.params.id } })
        " variant="warning" size="sm">
          <fa icon="pencil" class="mr-1" /> {{ t("menu.edit") }}
        </dv-button>
        <dv-button variant="primary" size="sm" v-print="'#print-area'">
          <fa icon="print" class="mr-1" /> {{ t("menu.print") }}
        </dv-button>
      </div>
    </dv-navbar>
    <dv-card class="bg-base-100" bordered>
      <SpinnerOverlay :show="isLoadingModel"></SpinnerOverlay>
      <dv-card-body>
        <div id="print-area">
          <h1 class="text-center font-bold text-lg">
            {{ t("invoice.title") }}
          </h1>
          <h2 class="text-center mb-4">
            {{ t("invoice.ref_number") }} {{ model.ref_number }}
          </h2>
          <div class="w-6/12">
            <p >{{ t("invoice.opening") }}</p>
          <p class="font-bold text-sm mt-4">{{ model.pertemuan?.pasien?.nama_lengkap }}</p>
          <p class="text-sm">{{ model.pertemuan?.pasien?.alamatLengkap }}</p>
          <p class="mt-2">{{ t("invoice.form.status") }} : 
            <dv-badge :type="statusBadge(model.status)">{{
            t(`menu.status.${model.status}`)
          }}</dv-badge>
          </p>

          </div>
          <FormKit v-if="model.invoice_contents" type="invoiceTable" v-model="model.invoice_contents" :printMode="true" :propDetails="config.details" />
          <div class="flex flex-row-reverse">
            <div class="flex flex-col">
              <p class="mb-20 text-center">
                {{ t("invoice.signature") }} <br>
                {{ dateTime(model.pertemuan?.waktu_pertemuan).format("ll") }}
              </p>
              <p v-if="config.anonSignature" class="text-center">
                (___________________)
              </p>
              <p class="text-center" v-else>
                {{ model.pertemuan?.pemeriksa?.fullname }}
              </p>
            </div>
          </div>
        </div>
      </dv-card-body>
    </dv-card>
  </div>
</template>
<script setup lang="ts">
import InvoiceCrud from "@/services/api/modules/invoiceCRUD";
import { useI18n } from "vue-i18n";
import useReadCrud from "@/hooks/crud/useReadCrud";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import { dateTime } from "@/services/moment/moment";


const { t } = useI18n();

const {
  route,
  model,
  isLoadingModel,
  loadModel,
  config,
  destroy,
  back,
  edit,
} = new useReadCrud<App.Models.Invoice>({
  moduleName: "Invoice",
  crud: InvoiceCrud,
  onLoadSuccess: (Res, Read) => {
    if (!Res.data.id) {
      Read.router.push({ name: "NotFound" });
    }
  },
});

const statusBadge = (value: number) => {
  switch (value) {
    case 0:
      return "error";
    case 1:
      return "warning";
    case 2:
      return "success";
    default:
      return "default";
  }
};



loadModel();
</script>
