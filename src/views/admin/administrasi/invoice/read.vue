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
        <dv-button
          @click="back({ name: 'SuratSakitIndex' })"
          variant="secondary"
          size="sm"
          ><fa icon="arrow-left" class="mr-1" /> {{ t("menu.back") }}</dv-button
        >
        <dv-button
          @click="
            edit({ name: 'SuratSakitForm', params: { id: route.params.id } })
          "
          variant="warning"
          size="sm"
          ><fa icon="pencil" class="mr-1" /> {{ t("menu.edit") }}</dv-button
        >
        <dv-button variant="primary" size="sm" v-print="'#print-area'"
          ><fa icon="print" class="mr-1" /> {{ t("menu.print") }}</dv-button
        >
      </div>
    </dv-navbar>
    <dv-card class="bg-base-100" bordered>
      <SpinnerOverlay :show="isLoadingModel"></SpinnerOverlay>
      <dv-card-body>
        <div id="print-area">
          <h1 class="text-center font-bold text-lg">
            {{ t("suratSakit.title") }}
          </h1>
          <h2 class="text-center mb-4">
            {{ t("suratSakit.ref_number") }} {{ model.ref_number }}
          </h2>
          <p>{{ t("suratSakit.opening") }}</p>
          <table class="mb-2">
            <tr>
              <td>{{ t("pasien.form.nama_lengkap") }}</td>
              <td>:</td>
              <td>{{ model.pertemuan?.pasien?.nama_lengkap }}</td>
            </tr>
            <tr>
              <td>
                {{ t("pasien.form.tgl_lahir") }} ({{ t("pasien.form.usia") }})
              </td>
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
                    `formkit.options.gender.${
                      model.pertemuan?.pasien?.kelamin.toLowerCase() ?? "l"
                    }`
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
              <td>{{ model.pertemuan?.pasien?.pekerjaan ?? "-" }}</td>
            </tr>
          </table>
          <p>
            {{ t("suratSakit.inter") }}
            <span class="font-bold"
              >{{ days }} ({{ t(`suratSakit.${days ?? "1"}`) }})</span
            >
            {{ t("suratSakit.day") }}
            {{
              new CaseConversion(t("suratSakit.form.dari")).toLowerCase().get()
            }}
            <span class="font-bold">
              {{ dateTime(model.dari).format("ll") }}
            </span>
            {{
              new CaseConversion(t("suratSakit.form.sampai"))
                .toLowerCase()
                .get()
            }}
            <span class="font-bold">{{
              dateTime(model.sampai).format("ll")
            }}</span>
          </p>
          <p class="mb-6">
            {{ t("suratSakit.closing") }}
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
import SuratSakitCrud from "@/services/api/modules/SuratSakitCRUD";
import { useI18n } from "vue-i18n";
import useReadCrud from "@/hooks/crud/useReadCrud";
import { dateTime, age } from "@/services/moment/moment";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import { CaseConversion } from "@/hooks/helpers/string";
import { computed } from "vue";

const { t } = useI18n();

const {
  route,
  model,
  isLoadingModel,
  loadModel,
  config,
  destroy,
  back,
  edit,
} = new useReadCrud<App.Models.Pertemuan.SuratSakit>({
  moduleName: "SuratSakit",
  crud: SuratSakitCrud,
  onLoadSuccess: (Res, Read) => {
    if (!Res.data.id) {
      Read.router.push({ name: "NotFound" });
    }
  },
});

const days = computed(() => {
  return dateTime(model.value.sampai).diff(model.value.dari, "days") + 1;
});

loadModel();
</script>
