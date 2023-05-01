<template>
  <div class="flex flex-col lg:flex-row gap-6 items-start">
    <dv-card class="bg-base-100 overflow-visible w-full lg:w-4/12">
      <SpinnerOverlay :show="isLoading" />

      <dv-card-body>
        <FormKit
          :actions="false"
          type="form"
          v-model="model"
          id="pertemuan-search"
        >
          <FormKitSchema :schema="schema" />
        </FormKit>
        <div
          class="rounded-lg bg-base-200 p-6 flex flex-col gap-3"
          v-show="model.pertemuan"
        >
        <ColumnWrapper>
          <ColumnItem :field=" t('pertemuan.form.id')" :value="model.pertemuan?.id"/>
          <ColumnItem :field=" t('pasien.form.tgl_lahir')" :value="`${model.pertemuan?.pasien?.tgl_lahir} (${age(model.pertemuan?.pasien?.tgl_lahir)})`"/>
          <ColumnItem :field=" t('pasien.form.nama_lengkap')" :value="model.pertemuan?.pasien?.nama_lengkap"/>
          <ColumnItem :field=" t('pasien.form.alamat')" :value="model.pertemuan?.pasien?.alamatLengkap"/>
          <ColumnItem :field=" t('pasien.form.pekerjaan')" :value=" model.pertemuan?.pasien?.pekerjaan ?? '-'"/>
          <ColumnItem :field=" t('pasien.form.goldar')" :value="model.pertemuan?.pasien?.goldar ?? '-'"/>
          <ColumnItem :field=" t('pertemuan.form.waktu_pertemuan')" :value="dateTime(model.pertemuan?.waktu_pertemuan).format('llll')"/>
          <ColumnItem :field=" t('pertemuan.form.poliklinik')" :value="model.pertemuan?.poliklinik?.nama"/>
          <ColumnItem :field=" t('pertemuan.form.pemeriksa')" :value="model.pertemuan?.pemeriksa?.fullname"/>
        </ColumnWrapper>

          <dv-button @click="showRekamMedis" type="primary">
            {{ t("menu.rm") }}</dv-button
          >
          <dv-button @click="editPasien" type="secondary">
            {{ t("menu.edit") }} {{ t("menu.pasien") }}</dv-button
          >
        </div>
        <div class="space-y-5 rounded-lg bg-base-200 p-4" v-show="!model.pertemuan && show">
          <div class=" grid grid-cols-2 gap-4">
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-3/4 rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-full rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-3/4 rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse row-span-3 rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-full rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-full rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-3/4 rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-full rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-3/4 rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse  rounded-lg bg-base-300"></div>
            <div class="h-5 animate-pulse w-3/4 rounded-lg bg-base-300"></div>
          </div>
          <div class="h-12 rounded-lg w-full bg-base-300"></div>
        </div>
      </dv-card-body>
    </dv-card>
    <div v-if="show" class="w-full lg:w-8/12">
      <div class="tabs tabs-boxed w-fit mt-4 lg:mt-0 mb-2">
        <a
          class="tab"
          :class="active('PemeriksaanForm') ? 'tab-active' : ''"
          @click="tabClicked('PemeriksaanForm', model.pertemuan?.id!)"
          >{{ t("menu.pemeriksaan") }}</a
        >
        <a
          class="tab"
          :class="active('ResepForm') ? 'tab-active' : ''"
          @click="tabClicked('ResepForm', model.pertemuan?.id!)"
          >{{ t("menu.resep") }}</a
        >
        <a
          class="tab"
          :class="active('LabForm') ? 'tab-active' : ''"
          @click="tabClicked('LabForm', model.pertemuan?.id!)"
          >{{ t("menu.lab") }}</a
        >
        <a
          class="tab"
          :class="active('TindakanForm') ? 'tab-active' : ''"
          @click="tabClicked('TindakanForm', model.pertemuan?.id!)"
          >{{ t("menu.tindakan") }}</a
        >
        <a
          class="tab"
          :class="active('InvoiceForm') ? 'tab-active' : ''"
          @click="tabClicked('InvoiceForm', model.pertemuan?.id!)"
          >{{ t("menu.tagihan") }}</a
        >
        <a
          class="tab"
          :class="active('SuratSakitForm') ? 'tab-active' : ''"
          @click="tabClicked('SuratSakitForm', model.pertemuan?.id!)"
          >{{ t("menu.surat_sakit") }}</a
        >
        <a
          class="tab"
          :class="active('SuratSehatForm') ? 'tab-active' : ''"
          @click="tabClicked('SuratSehatForm', model.pertemuan?.id!)"
          >{{ t("menu.surat_sehat") }}</a
        >
      </div>
      <router-view
        :loading="!isLoading || model.pertemuan == null"
        ref="form"
        @changed="changed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { dateTime, age, moment } from "@/services/moment/moment";
import { AxiosResponse } from "axios";
import { ref, computed } from "vue";
import pertemuanCRUD from "@/services/api/modules/pertemuanCRUD";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import http from "@/services/api/base";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute, RouteRecordName } from "vue-router";
import { FormKitSchemaNode } from "@formkit/core";
import { CaseConversion } from "@/hooks/helpers/string";
import RekamMedisModal from "@/components/modals/RekamMedisModal.vue";
import { $vfm } from "vue-final-modal";
import PasienEditModal from "@/components/modals/PasienEditModal.vue";
import ColumnWrapper from "@/components/columns/ColumnWrapper.vue";
import ColumnItem from "@/components/columns/ColumnItem.vue";

const route = useRoute();
const router = useRouter();

const { t } = useI18n();

const model = ref<{ pertemuan: App.Models.Pertemuan | null }>({
  pertemuan: null,
});

const show = computed(() => {
  return route.name === "forms" ? false : true;
});

const active = (tabName: string): boolean => {
  return route.name == tabName ? true : false;
};

const tabClicked = (
  tabName: string | RouteRecordName,
  id: string | number
): void => {
  if (route.name != tabName || route.params?.id != id) {
    router.push({
      name: tabName,
      params: { id },
    });
  }
};
const isLoading = ref(false);

const changed = (val: number | string, data: App.Models.Pertemuan) => {
  if (data) {
    model.value = { pertemuan: data };
    return;
  }
  isLoading.value = true;
  pertemuanCRUD.show!({ id: val })
    .then((res) => {
      model.value = { pertemuan: res.data };
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const pertemuanSelected = (val: App.Models.Pertemuan) => {
  if (!(val == null)) {
    let navigations = [
      "PemeriksaanForm",
      "ResepForm",
      "LabForm",
      "TindakanForm",
      "InvoiceForm",
    ];

    if (active("forms")) {
      let RouteName = new CaseConversion(route.params.pages as string)
        .toPascalCase()
        .get();
      if (navigations.includes(`${RouteName}Form`)) {
        tabClicked(`${RouteName}Form`, val.id);
      } else {
        tabClicked(`PemeriksaanForm`, val.id);
      }
    } else {
      tabClicked(route.name || "", val.id);
    }
  }
};
const schema: FormKitSchemaNode[] = [
  {
    $formkit: "vSelect",
    name: "pertemuan",
    displayLabel: "label",
    label: t("menu.pertemuan"),
    object: true,
    onInput: pertemuanSelected,
    valueProp: "id",
    canDeselect: false,
    "filter-results": false,
    "min-chars": 1,
    "resolve-on-load": true,
    clearOnSearch: true,
    debounce: 500,
    searchable: true,
    options: (search: string): Promise<App.Models.Pertemuan[]> => {
      return http
        .get("/pertemuan", { params: { search } })
        .then(
          (res: AxiosResponse<{ data: App.Models.Pertemuan[] }>) =>
            res.data.data
        )
        .catch(() => []);
    },
  },
];

const showRekamMedis = () => {
  $vfm.show(
    { component: RekamMedisModal },
    {
      pasienId: model.value.pertemuan?.pasien?.id,
      pasien: model.value.pertemuan?.pasien,
    }
  );
};
const editPasien = () => {
  $vfm.show(
    { component: PasienEditModal },
    {
      pasienId: model.value.pertemuan?.pasien?.id,
      pasien: model.value.pertemuan?.pasien,
    }
  );
};
</script>
