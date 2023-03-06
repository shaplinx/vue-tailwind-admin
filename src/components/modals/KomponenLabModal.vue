<template>
    <vue-final-modal
      v-slot="{ params, close }: { params: MutasiKomponenLabParams, close: any }"
      v-bind="$attrs"
      classes="flex justify-center items-center"
      content-class="w-10/12 h-4/5"
    >
      <dv-card class="bg-base-100 w-full h-full" bordered>
        <div class="w-full h-full overflow-auto">
          <dv-button @click="close" variant="ghost" class="absolute z-10 right-3 top-3"
            ><fa size="lg" icon="circle-xmark"></fa
          ></dv-button>
          <dv-card-body v-if="params.KomponenLabId">
            <MutasiKomponenLab :KomponenLab="params.KomponenLab" :KomponenLabId="params.KomponenLabId"> </MutasiKomponenLab>
          </dv-card-body>
        </div>
      </dv-card>
    </vue-final-modal>
  </template>
  <script setup lang="ts">
  import MutasiKomponenLab from "@/views/admin/fasilitas/lab/komponen/mutation.vue";
  
  interface MutasiKomponenLabParams {
    KomponenLabId: string | number;
    KomponenLab: App.Models.Fasilitas.Lab.KomponenLab
  }
  </script>
  