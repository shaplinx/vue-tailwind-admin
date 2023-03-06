<template>
  <vue-final-modal
    v-slot="{ params, close }: { params: MutasiObatParams, close: any }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="w-10/12 h-4/5"
  >
    <dv-card class="bg-base-100 w-full h-full" bordered>
      <div class="w-full h-full overflow-auto">
        <dv-button @click="close" variant="ghost" class="absolute z-10 right-3 top-3"
          ><fa size="lg" icon="circle-xmark"></fa
        ></dv-button>
        <dv-card-body v-if="params.obatId">
          <MutasiObat :obat="params.obat" :obat-id="params.obatId"> </MutasiObat>
        </dv-card-body>
      </div>
    </dv-card>
  </vue-final-modal>
</template>
<script setup lang="ts">
import MutasiObat from "@/views/admin/fasilitas/farmasi/obat/mutation.vue";

interface MutasiObatParams {
  obatId: string | number;
  obat: App.Models.Fasilitas.Farmasi.Obat
}
</script>
