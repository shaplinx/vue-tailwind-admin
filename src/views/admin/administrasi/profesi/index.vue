<template>
  <div>
    <TableCard
      :title="t('profesi.index-title')"
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
        <template #item-poliklinik="row">
          <div class="flex gap-2 flew-wrap">
            <dv-badge
              v-if="row.poliklinik"
              v-tooltip="poliklinik.nama"
              v-for="poliklinik in row.poliklinik"
              type="primary"
              >{{ poliklinik.kode }}</dv-badge
            >
          </div>
        </template>
        <template #item-gaji_pokok="row">
          <dv-badge type="success">{{
            money(row.gaji_pokok).toFormat()
          }}</dv-badge>
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
import { money } from "@/services/dinero/dinero";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/profesiCRUD";
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
  filterParams,
} = new IndexCRUD<App.Models.Administrasi.Profesi>({
  moduleName: "Profesi",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("profesi.form.nama"), value: "nama", sortable: true },
    {
      text: t("profesi.form.gelar_depan"),
      value: "gelar_depan",
      sortable: true,
    },
    {
      text: t("profesi.form.gelar_belakang"),
      value: "gelar_belakang",
      sortable: true,
    },
    { text: t("profesi.form.gaji_pokok"), value: "gaji_pokok", sortable: true },
    { text: t("profesi.form.poliklinik"), value: "poliklinik", sortable: true },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("profesi.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "ProfesiCreate" }),
    },
  ],
})
  .addFilterParams({ date_start: null, date_end: null })

  .extRequestParams((index: any) => {
    return {
      date_start: index.filterParams.value.date_start,
      date_end: index.filterParams.value.date_end,
      warning: index.filterParams.value.warning,
    };
  });

// initial load

</script>
