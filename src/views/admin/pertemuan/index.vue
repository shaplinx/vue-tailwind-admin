<template>
  <div>
    <Overview />
    <TableCard :title="t('pertemuan.index-title')" :useFilter="true" :filterSchema="filterSchema" :buttons="buttons"
      v-model="serverOptions">
      <DataTable v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :loading="loading"
        :headers="headers" :items="items" buttons-pagination :rows-items="[5, 10, 15]" alternating
        table-class-name="light-table" must-sort>
        <template #item-nama_lengkap="row">
          <p class="font-bold">{{ row.pasien.nama_lengkap }}</p>
          <p>
            <span class="font-semibold">({{ dateTime(row.pasien.tgl_lahir).format("ll") }})</span>
            {{ age(row.pasien.tgl_lahir) }}
          </p>
          <p class="font-light text-xs">{{ row.pasien.alamat }}</p>
        </template>
        <template #item-poliklinik="row">
          <dv-badge size="small" type="primary">{{
            row.poliklinik.nama
          }}</dv-badge>
        </template>
        <template #item-pemeriksa="row">
          {{ row.pemeriksa.fullname }}
        </template>
        <template #item-waktu_pertemuan="row">
          {{ dateTime(row.waktu_pertemuan).format("llll") }}
        </template>
        <template #item-status="row">
          <div class="flex gap-1">
            <dv-badge :type="renderStatus(row.pemeriksaan).color" v-tooltip="renderStatus(row.pemeriksaan).text"> {{
              t("menu.pemeriksaan") }} </dv-badge>
            <dv-badge :type="renderStatus(row.permintaan_lab).color" v-tooltip="renderStatus(row.permintaan_lab).text"> {{
              t("menu.permintaan_lab") }} </dv-badge>
            <dv-badge :type="renderStatus(row.resep).color" v-tooltip="renderStatus(row.resep).text"> {{ t("menu.resep")
            }} </dv-badge>
            <dv-badge :type="renderStatus(row.pertemuan_tindakan).color"
              v-tooltip="renderStatus(row.pertemuan_tindakan).text"> {{ t("menu.pertemuan_tindakan") }} </dv-badge>
            <dv-badge :type="renderStatus(row.invoice).color" v-tooltip="renderStatus(row.invoice).text"> {{
              t("menu.invoice") }} </dv-badge>
          </div>
        </template>
        <template #item-action="row">
          <DropdownMenuVue>
            <dv-button variant="primary" size="small">
              <fa icon="ellipsis"></fa>
            </dv-button>
            <template #popper>
              <li v-close-popper v-for="action in actions" @click="action.callback?.(row.id)">
                <a>
                  <fa v-if="action.icon" :icon="action.icon"></fa>{{ action.label }}
                </a>
              </li>
            </template>
          </DropdownMenuVue>
        </template>
      </DataTable>
    </TableCard>
  </div>
</template>
<script setup lang="ts">
import Overview from "@/views/admin/pertemuan/overview.vue"
import TableCard from "@/components/cards/TableCard.vue";
import { dateTime, age } from "@/services/moment/moment";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/pertemuanCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import http from "@/services/api/base";
import router from "@/router";

const { t } = useI18n();
const schema = defineFilterSchema({ t });

const {
  actions,
  buttons,
  filterSchema,
  items,
  headers,
  loading,
  serverItemsLength,
  serverOptions,
  loadFromServer,
} = new IndexCRUD<App.Models.Pertemuan>({
  moduleName: "Pertemuan",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("pertemuan.form.pasien"), value: "nama_lengkap", sortable: true },
    {
      text: t("pertemuan.form.poliklinik"),
      value: "poliklinik",
      sortable: false,
    },
    {
      text: t("pertemuan.form.pemeriksa"),
      value: "pemeriksa",
      sortable: false,
    },
    {
      text: t("pertemuan.form.waktu_pertemuan"),
      value: "waktu_pertemuan",
      sortable: true,
    },
    {
      text: t("pertemuan.form.status"),
      value: "status",
      sortable: false,
    },

    { text: t("menu.action"), value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("pertemuan.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "PertemuanCreate" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      doctor: index.serverOptions.value.doctor?.id,
    };
  })
  .addFilterSchema([
    {
      $formkit: "vSelect",
      name: "doctor",
      displayLabel: "fullname",
      label: t("pertemuan.form.pemeriksa"),
      object: true,
      valueProp: "id",
      "filter-results": false,
      "min-chars": 1,
      placeholder: t("formkit.searchPlaceholder"),
      "resolve-on-load": true,
      mode: "single",
      clearOnSearch: true,
      debounce: 500,
      searchable: true,
      options: (search: string): Promise<any[]> => {
        return http
          .get("/administrasi/pegawai", {
            params: {
              search,
              role: "Pemeriksa",
            },
          })
          .then((res) => res.data.data)
          .catch(() => []);
      },
      "outer-class": "mb-0",
      "label-class": "$reset text-sm",
      "wrapper-class":
        "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
      "inner-class":
        "bg-base-100 text-sm w-full sm:min-w-[14rem] sm:max-w-full rounded-lg",
    },
  ])
  .addActions([
    {
      label: t("menu.pemeriksaan"),
      icon: "stethoscope",
      callback: (id) =>
        router.push({ name: "PemeriksaanForm", params: { id } }),
    },
    {
      label: t("menu.permintaanLab"),
      icon: "flask",
      callback: (id) => router.push({ name: "LabForm", params: { id } }),
    },
    {
      label: t("menu.resep"),
      icon: "prescription",
      callback: (id) => router.push({ name: "ResepForm", params: { id } }),
    },
    {
      label: t("menu.tindakan"),
      icon: "syringe",
      callback: (id) => router.push({ name: "TindakanForm", params: { id } }),
    },
    {
      label: t("menu.invoice"),
      icon: "receipt",
      callback: (id) => router.push({ name: "InvoiceForm", params: { id } }),
    },
    {
      label: t("menu.sehat"),
      icon: "envelope-open-text",
      callback: (id) => router.push({ name: "SuratSehatForm", params: { id } }),
    },
    {
      label: t("menu.sakit"),
      icon: "head-side-cough",
      callback: (id) => router.push({ name: "SuratSakitForm", params: { id } }),
    },
  ]);
// initial load
loadFromServer();

watch(
  serverOptions,
  (value) => {
    loadFromServer();
  },
  { deep: true }
);

function renderStatus(object?: {
  [key: string]: any,
  processed_at?: string,
  completed_at?: string,
  created_at: string
}): { color: string, text: string } {

  if (object?.completed_at) return { color: "success", text: t("menu.status.2") }
  if (!object?.completed_at && object?.processed_at) return { color: "warning", text: t("menu.status.1") }
  if (!object?.completed_at && !object?.processed_at &&object?.created_at) return { color: "error", text: t("menu.status.0") }

  return { color: "default", text: t("menu.status.null") }

}
</script>
