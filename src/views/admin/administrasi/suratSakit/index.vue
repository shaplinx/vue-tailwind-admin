<template>
  <div>
    <TableCard
      :title="t('suratSakit.index-title')"
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
        <template #item-pertemuan="row">
          <p class="font-bold">{{ row.pertemuan?.pasien?.nama_lengkap }}</p>
          <p>
            <span class="font-thin text-xs"
              >({{ dateTime(row.pertemuan?.waktu_pertemuan).format("ll") }})</span
            >
          </p>
          <p class="font-light text-sm">
            {{ row.pertemuan?.pemeriksa?.fullname }}
          </p>
        </template>
        <template #item-dari="row">
          {{ dateTime(row.dari).format("llll") }}
        </template>
        <template #item-sampai="row">
          {{ dateTime(row.sampai).format("llll") }}
        </template>
        <template #item-created_at="row">
          {{ dateTime(row.created_at).format("llll") }}
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
                @click="action.callback?.(row.id, row)"
              >
                <a><fa v-if="action.icon" :icon="action.icon"></fa>{{ action.label }}</a>
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
import { dateTime } from "@/services/moment/moment";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/SuratSakitCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";

const { t } = useI18n();
const schema = defineFilterSchema({ t });

const {
  router,
  actions,
  buttons,
  filterSchema,
  items,
  headers,
  loading,
  serverItemsLength,
  serverOptions,
  loadFromServer,
} = new IndexCRUD<App.Models.Pertemuan.SuratSakit>({
  moduleName: "suratSakit",
  crud,
  primaryKey: "pertemuan_id",
  filterSchema: schema,
  headers: [
    { text: "ID", value: "ref_number", sortable: true },
    { text: t("menu.pertemuan"), value: "pertemuan", sortable: false },
    { text: t("suratSakit.form.dari"), value: "dari", sortable: false },
    { text: t("suratSakit.form.sampai"), value: "sampai", sortable: false },
    { text: t("menu.created_at"), value: "created_at", sortable: true },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("suratSakit.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "SuratSakitForm" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
    };
  })
  .clear(["actions"], 0)
  .addActions([
    {
      icon: "pencil",
      label: "Edit",
      callback: (id: any, row: any) => {
        router.push({
          name: "SuratSakitForm",
          params: { id: row.pertemuan_id },
        });
      },
    },
    {
      icon: "eye",
      label: "Read",
      callback: (id: any, row: any) => {
        router.push({
          name: "SuratSakitRead",
          params: { id: row.pertemuan_id },
        });
      },
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
</script>
