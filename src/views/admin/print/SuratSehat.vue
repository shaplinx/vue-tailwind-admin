<template>
  <div class="grid grid-cols-1 gap-5">
    <dv-navbar class="bg-base-100 rounded-box">
      <div class="flex w-full justify-end gap-2 items-center">
        <dv-button class="mr-auto" variant="accent" @click="destroy" size="sm"
          ><fa icon="trash" class="mr-1" /> {{ t("menu.delete") }}</dv-button
        >
        <FormKit
          type="toggle"
          v-model="config.anonSignature"
          label="Anonymous"
          :classes="{
            outer: '$reset mt-2 flex gap-3 items-center mb-0',
            inner: '$reset',
            label: 'mb-1',
          }"
        />
        <dv-button @click="back" variant="secondary" size="sm"
          ><fa icon="arrow-left" class="mr-1" /> {{ t("menu.back") }}</dv-button
        >
        <dv-button variant="primary" size="sm" @click="print()"
          ><fa icon="print" class="mr-1" /> {{ t("menu.print") }}</dv-button
        >
      </div>
    </dv-navbar>
    <dv-card class="bg-base-100" bordered>
    <SpinnerOverlay :show="isLoadingModel"></SpinnerOverlay>
      <dv-card-body>
        <div id="print-area">
          <h1 class="text-center font-bold text-lg">{{ t("suratSehat.title") }}</h1>
          <h2 class="text-center mb-4">{{ t("suratSehat.ref_number") }} {{ model.ref_number }}</h2>
          <p>{{ t("suratSehat.opening") }}</p>
          <table class="mb-2">
            <tr>
              <td>{{ t("pasien.form.nama_lengkap") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pasien?.nama_lengkap }}</td>
            </tr>
            <tr>
              <td>{{ t("pasien.form.tgl_lahir") }} ({{  t("pasien.form.usia") }})</td>
              <td>:</td>
              <td>
                {{ dateTime(model.pertemuan?.pasien?.tgl_lahir).format("ll") }}
                ({{ age(model.pertemuan?.pasien?.tgl_lahir) }})
              </td>
            </tr>
            <tr>
              <td>{{ t("pasien.form.kelamin") }}</td>
              <td>:</td>
              <td>
                {{
                  t(
                    `formkit.options.gender.${model.pertemuan?.pasien?.kelamin.toLowerCase()}`
                  )
                }}
              </td>
            </tr>
            <tr>
              <td>{{ t("pasien.form.alamat") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pasien?.alamatLengkap }}</td>
            </tr>
            <tr>
              <td>{{ t("pasien.form.pekerjaan") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pasien?.pekerjaan ?? '-' }}</td>
            </tr>
          </table>
          <p>{{ t("suratSehat.inter") }}</p>
          <table class="mb-2">
            <tr>
              <td>{{ t("pemeriksaan.form.TB") }}/{{  t("pemeriksaan.form.BB") }}</td>
              <td>:</td>
              <td>
                {{ model.pertemuan?.pemeriksaan?.TB ?? '-' }} {{  t("formkit.ttv.tb") }} /
                {{ model.pertemuan?.pemeriksaan?.BB ?? '-' }}  {{  t("formkit.ttv.bb") }}
              </td>
            </tr>
            <tr>
              <td> {{  t("pemeriksaan.form.tekanan_darah") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pemeriksaan?.tekanan_darah }} {{ t("formkit.ttv.td") }} </td>
            </tr>
            <tr>
              <td>{{  t("pasien.form.goldar") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pasien?.goldar ?? "-" }}</td>
            </tr>
            <tr>
              <td>{{  t("pemeriksaan.form.buta_warna") }}</td>
              <td>:</td>
              <td>
                {{ renderColorBlind(model.pertemuan?.pemeriksaan?.buta_warna) }}
              </td>
            </tr>
          </table>
          <p class="mb-6">
            {{ t("suratSehat.closing") }} {{ model.keperluan ??  t("suratSehat.default_keperluan") }}.
          </p>
          <div class="flex flex-row-reverse">
            <div class="flex flex-col">
              <p class="mb-20 text-center">
                {{ dateTime(model.pertemuan?.waktu_pertemuan).format("ll") }}
              </p>
              <p v-if="config.anonSignature" class="text-center">
                (___________________)
              </p>
              <p class="text-center" v-else>
                {{ model.pertemuan?.pemeriksa?.fullname }}
              </p>
            </div>
          </div>
        </div>
      </dv-card-body>
    </dv-card>
  </div>
</template>
<script setup lang="ts">
import SuratSehatCrud from "@/services/api/modules/SuratSehatCRUD";
import { useI18n } from "vue-i18n";
import useReadCrud from "@/hooks/crud/useReadCrud";
import { dateTime, age } from "@/services/moment/moment";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";

const { t } = useI18n();

const { model, isLoadingModel, loadModel, config, destroy, back, print } =
  new useReadCrud<App.Models.Pertemuan.SuratSehat>({
    moduleName: "SuratSehat",
    crud: SuratSehatCrud,
  });

function renderColorBlind(val: boolean | null | undefined) {
  if (val === null || val === undefined) {
    return t("formkit.colorBlind.null");
  }
  return val ? t("formkit.colorBlind.1") : t("formkit.colorBlind.0");
}

loadModel();
</script>
