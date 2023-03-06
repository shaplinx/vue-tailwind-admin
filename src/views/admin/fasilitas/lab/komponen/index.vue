<template>
  <div>
    <TableCard
      :title="t('komponenLab.index-title')"
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
          <dv-badge size="large" outline type="accent">{{
            row.kode
          }}</dv-badge></template
        >
        <template #item-stock="row">
          <dv-badge
            :type="row.stock <= row.alert_stock ? 'error' : 'success'"
            >{{ row.stock }}</dv-badge
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
                @click="action.callback?.(row.id, row)"
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
import crud from "@/services/api/modules/komponenLabCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import MutasiKomponenLabModal from "@/components/modals/KomponenLabModal.vue";
import { $vfm } from "vue-final-modal";

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
} = new IndexCRUD<App.Models.Fasilitas.Lab.KomponenLab>({
  moduleName: "KomponenLab",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("komponenLab.form.nama"), value: "nama", sortable: true },
    { text: t("komponenLab.form.kode"), value: "kode", sortable: true },
    {
      text: t("komponenLab.form.satuan"),
      value: "satuan",
      sortable: true,
    },
    {
      text: t("komponenLab.form.nilai_rujukan"),
      value: "nilai_rujukan",
      sortable: true,
    },
    {
      text: t("komponenLab.form.stock"),
      value: "stock",
      sortable: false,
    },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("komponenLab.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "KomponenLabCreate" }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      warning: index.serverOptions.value?.warning,
    };
  })
  .addFilterSchema([
    {
      $formkit: "toggle",
      name: "warning",
      size: "lg",
      type: "secondary",
      label: t("formkit.low-on-stock"),
      "label-class": "$reset text-sm",
      "outer-class": "mb-0",
      "inner-class": "flex flex-col justify-center sm:mt-2",
      "wrapper-class":
        "$reset flex-row h-full max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-center",
    },
  ]).addActions([
    {
      label: t("menu.mutasi"),
      icon: 'timeline',
      callback: (id, komponen) => {
        $vfm.show(
          { component: MutasiKomponenLabModal },
          {
            KomponenLabId: id,
            KomponenLab: komponen
          }
        );
      }
    }
  ]);;

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
