<template>
  <div>
    <TableCard
      :title="t('menu.rm') + ' ' + pasien?.nama_lengkap"
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
        <template #item-waktu_pertemuan="row">
          {{ dateTime(row.waktu_pertemuan).format("llll") }}
        </template>
        <template #item-subjective="row">
          <p v-if="row.pemeriksaan">
            {{ row.pemeriksaan.anamnesis }}
          </p>
        </template>
        <template #item-objective="row">
          <template v-if="row.pemeriksaan">
            <div class="flex flex-grow">
              <div class="w-6/12">{{ $t("pemeriksaan.form.TD") }} :</div>
              <div class="w-6/12">
                {{ row.pemeriksaan.tekanan_darah }}
              </div>
            </div>
            <div class="flex flex-grow">
              <div class="w-6/12">{{ $t("pemeriksaan.form.RR") }} :</div>
              <div class="w-6/12">
                {{ row.pemeriksaan.laju_nafas }}
              </div>
            </div>
            <div class="flex flex-grow">
              <div class="w-6/12">{{ $t("pemeriksaan.form.HR") }} :</div>
              <div class="w-6/12">
                {{ row.pemeriksaan.laju_nadi }}
              </div>
            </div>
            <div class="flex flex-grow">
              <div class="w-6/12">{{ $t("pemeriksaan.form.T") }} :</div>
              <div class="w-6/12">
                {{ row.pemeriksaan.suhu }}
              </div>
            </div>
            <div class="flex flex-grow">
              <div class="w-6/12">{{ $t("pemeriksaan.form.Spo2") }} :</div>
              <div class="w-6/12">
                {{ row.pemeriksaan.saturasi }}
              </div>
            </div>
            {{ row.pemeriksaan.px_fisik }}
          </template>

          <br />

          <template
            v-if="row.permintaan_lab && row.permintaan_lab.pemeriksaan_labs"
          >
            {{ $t("menu.permintaanlab") }} :
            <br />

            <template
              v-for="pemeriksaan in row.permintaan_lab.pemeriksaan_labs"
            >
              <VTooltip>
                <dv-badge
                  :id="`pemeriksaan${pemeriksaan.id}${row.id}`"
                  type="success"
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
                            row.permintaan_lab.hasil_labs,
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
        </template>
        <template #item-assestment="row">
          <div v-if="row.pemeriksaan?.diagnosis">
            <ul class="list-disc">
              <template v-for="diagnosis in row.pemeriksaan.diagnosis">
                <li>
                  {{ diagnosis.nama }}

                  <dv-badge
                    v-if="diagnosis.icd10"
                    type="success"
                    :id="`icd10${row.id}${diagnosis.icd10.id}`"
                    v-tooltip="diagnosis.icd10.name_locale"
                  >
                    {{ diagnosis.icd10.code }}
                  </dv-badge>
                </li>
              </template>
            </ul>
          </div>
        </template>
        <template #item-plan="row">
          <div v-if="row.resep?.resep_contents?.length">
            <ul class="list-disc">
              <li v-for="resep in row.resep.resep_contents">
                {{ resep.obat.nama }} {{ resep.obat.kemasan }}
                {{ resep.obat.sediaan }} ({{ resep.aturan_pakai }})
              </li>
            </ul>
          </div>
          <div v-if="row.resep?.resep_luars?.length">
            <span class="text-sm font-semibold text-left">{{ t("resep.form.resep_luars") }} : </span>
            <ul class="list-disc">
              <li v-for="resep in row.resep.resep_luars">
                {{ resep.nama_obat }} ({{ resep.signa }})
              </li>
            </ul>
          </div>
          <div class="mt-2" v-if="row.invoice?.total">
            {{ t("invoice.form.jumlah") + " : " }}
            <span class="text-success fomt-mono font-bold">{{
              money(row.invoice.total).toFormat()
            }}</span>
          </div>
        </template>

        <template #item-pemeriksa="row">
          {{ row.pemeriksa.fullname }}
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
import { dateTime } from "@/services/moment/moment";
import { money } from "@/services/dinero/dinero";
import { useI18n } from "vue-i18n";
import { watch, defineProps, PropType } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/pertemuanCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import http from "@/services/api/base";

const props = defineProps({
  pasienId: [String, Number],
  pasien: Object as PropType<App.Models.Pasien>,
});

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
    {
      text: t("pertemuan.form.waktu_pertemuan"),
      value: "waktu_pertemuan",
      sortable: true,
    },
    {
      text: t("menu.subjective"),
      value: "subjective",
      sortable: false,
    },
    {
      text: t("menu.objective"),
      value: "objective",
      sortable: false,
    },
    {
      text: t("menu.assessment"),
      value: "assestment",
      sortable: false,
    },
    {
      text: t("menu.plan"),
      value: "plan",
      sortable: false,
    },
    {
      text: t("pertemuan.form.pemeriksa"),
      value: "pemeriksa",
      sortable: false,
    },
  ],
})
  .addServerOptions({ date_start: null, date_end: null })
  .extRequestParams((index: any) => {
    return {
      date_start: index.serverOptions.value.date_start,
      date_end: index.serverOptions.value.date_end,
      doctor: index.serverOptions.value.doctor?.id,
      pasien: props.pasienId,
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
  ]);

function getHasilValue(
  allHasilLab: any,
  KomponenLabId: any,
  PemeriksaanLabId: any
) {
  let output = allHasilLab.filter(
    (hasil: any) =>
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
