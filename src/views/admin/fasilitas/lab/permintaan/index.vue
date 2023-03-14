<template>
  <div>
    <TableCard
      :title="t('permintaanLab.index-title')"
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
              >({{
                dateTime(row.pertemuan?.waktu_pertemuan).format("ll")
              }})</span
            >
          </p>
          <p class="font-light text-sm">
            {{ row.pertemuan?.pemeriksa?.fullname }}
          </p>
        </template>
        <template #item-status="row">
          <dv-badge
            :type="
              row.status == 2
                ? 'success'
                : row.status == 1
                ? 'warning'
                : 'error'
            "
          >
            {{ t(`menu.status.${row.status}`) }}
          </dv-badge>
        </template>
        <template #item-pemeriksaan_labs="row">
          <template v-for="pemeriksaan in row.pemeriksaan_labs">
            <VTooltip>
              <dv-badge :id="`pemeriksaan${pemeriksaan.id}`" type="success"
                >{{ pemeriksaan.nama }}
              </dv-badge>

              <template #popper>
                <ul ul class="mb-0 list-unstyled">
                  <li
                    v-for="komponen in pemeriksaan.komponen_lab"
                    :key="komponen.id"
                  >
                    <small
                      class="text-mute"
                      v-html="
                        `${komponen.nama} : ${getHasilValue(
                          row.hasil_labs,
                          komponen.id,
                          pemeriksaan.id
                        )} ${komponen.satuan} (${komponen.nilai_rujukan})`
                      "
                    />
                  </li>
                </ul>
              </template>
            </VTooltip>
          </template>
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
import { dateTime } from "@/services/moment/moment";
import { useI18n } from "vue-i18n";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/permintaanLabCRUD";
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
} = new IndexCRUD<App.Models.Fasilitas.Lab.PermintaanLab>({
  moduleName: "PermintaanLab",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "ref_number", sortable: true },
    { text: t("menu.pertemuan"), value: "pertemuan", sortable: false },
    { text: t("permintaanLab.form.status"), value: "status", sortable: false },
    {
      text: t("permintaanLab.form.pemeriksaan_labs"),
      value: "pemeriksaan_labs",
      sortable: false,
    },
    { text: t("menu.created_at"), value: "created_at", sortable: true },
    { text: t("menu.action"), value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("permintaanLab.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () =>
        index.router.push({ name: "forms", params: { pages: "lab" } }),
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null, status:null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      status: index.serverOptions.value.status
    };
  })
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
    }
  ])
  .clear(["actions"], 0)
  .addActions([
    {
      icon: "pencil",
      label: "Edit",
      callback: (id: any, row:any) => {
        router.push({ name: `LabForm`, params: { id: row.pertemuan_id } });
      },
    },
    {
      icon: "eye",
      label: "Read",
      callback: (id: any, row: any) => {
        router.push({
          name: "PermintaanLabRead",
          params: { id: row.pertemuan_id },
        });
      },
    },
  ]);

// initial load
loadFromServer();

function getHasilValue(
  allHasilLab: App.Models.Pertemuan.HasilLab[],
  KomponenLabId: number,
  PemeriksaanLabId: number
) {
  let output = allHasilLab.filter(
    (hasil) =>
      hasil.pemeriksaan_lab_id == PemeriksaanLabId &&
      hasil.komponen_lab_id == KomponenLabId
  );
  return output[0].hasil
    ? output[0].hasil
    : '<span class="badge text-error">n/a</span>';
}

watch(
  serverOptions,
  (value) => {
    loadFromServer();
  },
  { deep: true }
);
</script>
