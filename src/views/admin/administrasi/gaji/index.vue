<template>
  <div>
    <TableCard
      :title="t('gaji.index-title')"
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
        <template #item-user="row">
          {{ row.user.fullname }}
        </template>
        <template #item-start_date="row">
          <dv-badge type="primary">{{
            dateTime(row.start_date).format("ll")
          }}</dv-badge>
        </template>
        <template #item-end_date="row">
          <dv-badge type="primary">{{
            dateTime(row.end_date).format("ll")
          }}</dv-badge>
        </template>
        <template #item-totalGaji="row">
          <dv-badge type="success">{{
            money(row.totalGaji).toFormat()
          }}</dv-badge>
        </template>
        <template #item-totalCustomGaji="row">
          <dv-badge type="success">{{
            money(row.totalCustomGaji).toFormat()
          }}</dv-badge>
        </template>
        <template #item-totalJasa="row">
          <dv-badge type="success">{{
            money(row.totalJasa).toFormat()
          }}</dv-badge>
        </template>
        <template #item-status="row">
          <dv-badge :type="statusBadge(row.status)">{{
            t(`menu.status.${row.status}`)
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
import crud from "@/services/api/modules/gajiCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import { dateTime } from "@/services/moment/moment";
import http from "@/services/api/base"

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
} = new IndexCRUD<App.Models.Administrasi.Gaji>({
  moduleName: "Gaji",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("gaji.form.user"), value: "user", sortable: false },
    { text: t("gaji.form.start_date"), value: "start_date", sortable: true },
    { text: t("gaji.form.end_date"), value: "end_date", sortable: true },
    { text: t("gaji.form.totalJasa"), value: "totalJasa", sortable: false },
    {
      text: t("gaji.form.totalCustomGaji"),
      value: "totalCustomGaji",
      sortable: false,
    },
    { text: t("gaji.form.totalGaji"), value: "totalGaji", sortable: false },
    { text: t("gaji.form.status"), value: "status", sortable: false },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("gaji.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "GajiCreate" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null, status:null, user:null })
  .addFilterSchema([
    {
      $formkit:"select",
      label:t("invoice.form.status"),
      name:"status",
      options: [
        {
          label: t("menu.all"),
          value:null
        },
        {
          label: t("menu.status.2"),
          value:2
        },
        {
          label: t("menu.status.1"),
          value:1
        },
        {
          label: t("menu.status.0"),
          value:0
        },
      ],
      "label-class": "$reset text-sm",
        "outer-class":"mb-0",
        "inner-class": "bg-base-100 text-sm",
        "wrapper-class": "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
    },
    {
      $formkit: "vSelect",
      name: "user",
      displayLabel: "fullname",
      label: t("menu.pegawai"),
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
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      status: index.serverOptions.value.status,
      user: index.serverOptions.value.user?.id
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
</script>
