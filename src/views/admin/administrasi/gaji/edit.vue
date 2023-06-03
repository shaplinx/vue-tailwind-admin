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
      <div class="font-bold">{{ t("gaji.form.jasa") }}</div>
      <DataTable
      v-if="formData.all_filtered_jasa!"
      :headers="jasaMedisHeader"
      :items="formData.all_filtered_jasa!"
      class="mb-6"
      >
      <template #item-content_type="row">
          {{ row.content_type.split('\\').pop() }}
      </template>
      <template #item-created_at="row">
          {{ dateTime(row.created_at).format("llll") }}
        </template>
        <template #item-harga="row">
          {{ money(row.harga).toFormat() }}
        </template>
        <template #item-_action="row">
          <DropdownMenuVue>
            <dv-button variant="primary" size="xs"
              ><fa icon="ellipsis"></fa
            ></dv-button>
            <template #popper>
              <li
                v-close-popper
                v-for="action in jasaMedisActions"
                @click="action.callback?.(row.id,row)"
              >
                <a
                  ><fa v-if="action.icon" :icon="action.icon"></fa
                  >{{ action.label }}</a
                >
              </li>
            </template>
          </DropdownMenuVue>
        </template>
      </DataTable>
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
import { dateTime } from "@/services/moment/moment";
import { useI18n } from "vue-i18n";
import { money } from "@/services/dinero/dinero";
import { sumBy } from "lodash";
import { mergeErrorsWithPrefix } from "@/hooks/misc";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";


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

const jasaMedisHeader = [
  { text: 'ID', value: 'id', sortable: true },
  { text: 'Type', value: 'content_type', sortable: true },
  { text: t("menu.created_at"), value: "created_at", sortable: true },
  { text: t("gaji.form.harga"), value: "harga", sortable: true },
  { text: t("gaji.form.deskripsi"), value: "deskripsi", sortable: true },
  { text: t("menu.invoice") + " ID", value: "invoice_id", sortable: true },
  { text: t("menu.action") + " ID", value: "_action", sortable: true },
  ]
  const jasaMedisActions = [
      {
        icon: "invoice",
        label: t("menu.invoice"),
        callback: (id: any, row:any) => {
          router.push({ name: `InvoiceForm`, params: { id: row.invoice?.pertemuan_id } });
        },
      },
    ]
</script>
