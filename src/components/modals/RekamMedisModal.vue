<template>
  <vue-final-modal
    v-slot="{ params, close }: { params: RekamMedisParams, close: any }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="w-10/12 h-4/5"
  >
    <dv-card class="bg-base-100 w-full h-full" bordered>
      <div class="w-full h-full overflow-auto">
        <dv-button @click="close" variant="ghost" class="absolute z-10 right-3 top-3"
          ><fa size="lg" icon="circle-xmark"></fa
        ></dv-button>
        <dv-card-body v-if="params.pasienId">
          <RekamMedis :pasien="params.pasien" :pasien-id="params.pasienId"> </RekamMedis>
        </dv-card-body>
      </div>
    </dv-card>
  </vue-final-modal>
</template>
<script setup lang="ts">
import RekamMedis from "@/views/admin/rekam-medis/index.vue";

interface RekamMedisParams {
  pasienId: string | number;
  pasien: App.Models.Pasien
}
</script>
