<template>
  <div>
    <TableCard
      :title="t('pemeriksaanLab.index-title')"
      :useFilter="true"
      :filterSchema="filterSchema"
      :buttons="buttons"
      v-model="filterParams"
    >
      <DataTable
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :loading="loading"
        :headers="headers"
        :items="items"
        buttons-pagination
        :rows-items="[5, 10, 15]"
        alternating
        table-class-name="light-table"
        must-sort
      >
        <template #item-kode="row">
          <dv-badge size="large" outline type="accent">{{
            row.kode
          }}</dv-badge></template
        >
        <template #item-harga_jual="row">
          <dv-badge type="success">{{
            money(row.harga_jual).toFormat()
          }}</dv-badge>
        </template>
        <template #item-harga_beli="row">
          <dv-badge type="success">{{
            money(row.harga_beli).toFormat()
          }}</dv-badge>
        </template>
        <template #item-komponen_lab="row">
          <div
            v-if="row.komponen_lab.length"
            class="flex flex-wrap items-center justify-start gap-2"
          >
            <dv-badge
              v-for="komponen_lab in row.komponen_lab"
              type="primary"
              v-tooltip="komponen_lab.nama"
              >{{ komponen_lab.kode }}</dv-badge
            >
          </div>
        </template>

        <template #item-kategori_lab="row">
            <dv-badge
              type="primary"
              v-tooltip="row.kategori_lab.nama"
              >{{ row.kategori_lab.kode }}</dv-badge
            >
        </template>
        <template #item-action="row">
          <DropdownMenuVue>
            <dv-button variant="primary" size="small"
              ><fa icon="ellipsis"></fa
            ></dv-button>
            <template #popper>
              <li
                v-close-popper
                v-for="action in actions"
                @click="action.callback?.(row.id)"
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
    </TableCard>
  </div>
</template>
<script setup lang="ts">
import TableCard from "@/components/cards/TableCard.vue";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/pemeriksaanLabCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import { money } from "@/services/dinero/dinero";

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
  filterParams,
} = new IndexCRUD<App.Models.Fasilitas.Lab.PemeriksaanLab>({
  moduleName: "PemeriksaanLab",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("pemeriksaanLab.form.nama"), value: "nama", sortable: true },
    { text: t("pemeriksaanLab.form.kode"), value: "kode", sortable: true },
    {
      text: t("pemeriksaanLab.form.harga_jual"),
      value: "harga_jual",
      sortable: true,
    },
    {
      text: t("pemeriksaanLab.form.harga_beli"),
      value: "harga_beli",
      sortable: true,
    },
    {
      text: t("pemeriksaanLab.form.komponen_lab"),
      value: "komponen_lab",
      sortable: false,
    },
    {
      text: t("pemeriksaanLab.form.kategori_lab"),
      value: "kategori_lab",
      sortable: false,
    },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("pemeriksaanLab.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "PemeriksaanLabCreate" }),
    },
  ],
})
  .addFilterParams({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.filterParams.value.date_start,
      date_end: index.filterParams.value.date_end,
    };
  });

// initial load

</script>
