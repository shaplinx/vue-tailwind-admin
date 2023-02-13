<template>
  <div>
    <Overview/>
    <TableCard
      :title="t('pasien.index-title')"
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
        <template #item-kelamin="row">
          <dv-badge
            size="large"
            outline
            :type="row.kelamin == 'L' ? 'primary' : 'secondary'"
            ><fa :icon="row.kelamin == 'L' ? 'mars' : 'venus'"></fa></dv-badge
        ></template>
        <template #item-tgl_lahir="row">
          {{ dateTime(row.tgl_lahir).format("ll") }}
          <dv-badge size="small" type="primary">{{
            age(row.tgl_lahir)
          }}</dv-badge>
        </template>
        <template #item-alamat="row"> {{ row.alamatLengkap }} </template>
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
import Overview from "./overview.vue"
import TableCard from "@/components/cards/TableCard.vue";
import { dateTime, age } from "@/services/moment/moment";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/pasienCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import { $vfm } from "vue-final-modal";
import RekamMedisModal from "@/components/modals/RekamMedisModal.vue";

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
} = new IndexCRUD<App.Models.Pasien>({
  moduleName: "Pasien",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: "Nama Lengkap", value: "nama_lengkap", sortable: true },
    { text: "Kelamin", value: "kelamin", sortable: true },
    { text: "Tanggal Lahir", value: "tgl_lahir", sortable: true },
    { text: "Alamat", value: "alamat", sortable: true },
    { text: "Tanggal Pendaftaran", value: "created_at", sortable: true },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("pasien.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "PasienCreate" }),
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
  .addActions([
    {
      label: t("menu.rm"),
      icon: "file-medical",
      callback: (id, pasien) =>
        $vfm.show(
          { component: RekamMedisModal },
          {
            pasienId: id,
            pasien,
          }
        ),
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
