<template>
  <Line :data="chartData!" :options="chartOptions" />
</template>
<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { ChartData, ChartOptions, Point } from "chart.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

defineProps({
  chartData: Object as PropType<
    ChartData<"line", (number | Point | null)[], unknown>
  >,
  chartOptions: Object as PropType<ChartOptions>,
});

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, Filler
)
</script>
