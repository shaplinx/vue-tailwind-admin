<template>
  <div>
    <TableCard
      :title="t('poliklinik.index-title')"
      :useFilter="true"
      :filterSchema="filterSchema"
      :buttons="buttons"
      v-model="serverOptions"
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
          <dv-badge
            size="large"
            outline
            type="secondary"
            >{{row.kode}}</dv-badge
        ></template>
        <template #item-fee="row">
          <dv-badge type="success">{{
            money(row.fee).toFormat()
          }}</dv-badge>
        </template>
        <template #item-jasa_klinisi="row">
          <dv-badge type="success">{{
            money(row.jasa_klinisi).toFormat()
          }}</dv-badge>
        </template>
        <template #item-jasa_asisten="row">
          <dv-badge type="success">{{
            money(row.jasa_asisten).toFormat()
          
          }}</dv-badge>
        </template>
        <template #item-profesi="row">
        <div v-if="row.profesi" class="flex flex-wrap items-center justify-center gap-2">
          <dv-badge v-for="profesi in row.profesi" type="primary">{{profesi.nama}}</dv-badge>
        </div>
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
import {money } from "@/services/dinero/dinero"
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/poliklinikCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";

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
} = new IndexCRUD<App.Models.Fasilitas.Poliklinik>({
  moduleName: "Poliklinik",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("poliklinik.form.nama"), value: "nama", sortable: true },
    { text: t("poliklinik.form.kode"), value: "kode", sortable: true },
    { text: t("poliklinik.form.fee"), value: "fee", sortable: true },
    { text: t("poliklinik.form.jasa_klinisi"), value: "jasa_klinisi", sortable: true },
    { text: t("poliklinik.form.jasa_asisten"), value: "jasa_asisten", sortable: true },
    { text: t("poliklinik.form.profesi"), value: "profesi", sortable: false },
    { text: t("menu.action"), value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("poliklinik.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "PoliklinikCreate" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
    };
  });

// initial load
loadFromServer();

watch(
  serverOptions,
  (value) => {
    loadFromServer();
  },
  { deep: true }
);
</script>
