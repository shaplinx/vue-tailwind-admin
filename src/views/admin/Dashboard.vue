<template>
  <div class="grid grid-cols-1 gap-4">
    <PasienOverview></PasienOverview>
    <PertemuanOverview></PertemuanOverview>
    <RekeningOverview></RekeningOverview>
  </div>
</template>
<script setup lang="ts">
import PasienOverview from "@/views/admin/pasien/overview.vue";
import PertemuanOverview from "@/views/admin/pertemuan/overview.vue"
import RekeningOverview from "@/views/admin/administrasi/rekening/overview.vue";
</script>
