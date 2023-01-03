<template>
  <div>
    <TableCard
      :title="t('tindakan.index-title')"
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
        <template #item-harga_jual="row">
          <dv-badge type="success">{{
            money(row.harga_jual).toFormat()
          }}</dv-badge>
        </template>
        <template #item-jasa="row">
          <dv-badge type="success">{{ money(row.jasa).toFormat() }}</dv-badge>
        </template>
        <template #item-bagian_operator="row">
          {{ decimalToPrecent(row.bagian_operator) }}
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
import crud from "@/services/api/modules/tindakanCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import { decimalToPrecent } from "@/hooks/misc";

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
} = new IndexCRUD<App.Models.Administrasi.Tindakan>({
  moduleName: "Tindakan",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("tindakan.form.nama"), value: "nama", sortable: true },
    {
      text: t("tindakan.form.harga_jual"),
      value: "harga_jual",
      sortable: true,
    },
    { text: t("tindakan.form.jasa"), value: "jasa", sortable: true },
    {
      text: t("tindakan.form.bagian_operator"),
      value: "bagian_operator",
      sortable: true,
    },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("tindakan.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "TindakanCreate" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })

  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      warning: index.serverOptions.value.warning,
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
