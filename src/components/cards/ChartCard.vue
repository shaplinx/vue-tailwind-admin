<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay v-show="isLoading"></SpinnerOverlay>

    <dv-card-body>
      <dv-card-title>
        <div class="flex flex-row gap-2 items-center justify-end w-full">
          <span class="font-semibold text-md">{{ heading }}</span>
          <span class="font-light text-xs block mr-auto">{{ subHeading }}</span>

          <span class="text-sm font-light">
            {{ t("formkit.select") }}
            {{ dropdown == "daily" ? t("formkit.month") : t("formkit.year") }}
          </span>
          <DropDown
            v-if="dropdown == 'daily'"
            size="sm"
            :options="dailyDropdown"
            :modelValue="modelValue"
            @update:modelValue="
              (option) => $emit('update:modelValue', option.value)
            "
          />
          <DropDown
            v-if="dropdown == 'monthly'"
            size="sm"
            :options="monthlyDropdown"
            :modelValue="modelValue"
            @update:modelValue="
              (option) => $emit('update:modelValue', option.value)
            "
          />
        </div>
      </dv-card-title>

      <AreaChart :chartData="datasets" :chartOptions="chartOptions" />
    </dv-card-body>
  </dv-card>
</template>
<script setup lang="ts">
import AreaChart from "../charts/AreaChart.vue";
import DropDown from "@/components/inputs/DropDown.vue";
import SpinnerOverlay from "../loader/SpinnerOverlay.vue";
import { dateTime } from "@/services/moment/moment";
import { reactive, computed, defineProps, ref, watch } from "vue";
import { ChartOptions } from "chart.js/dist/types/index";
import { usePreferencesStore } from "@/store/preferences";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const preferences = usePreferencesStore();

const props = defineProps([
  "chartData",
  "isLoading",
  "heading",
  "subHeading",
  "dropdown",
  "moduleName",
  "modelValue",
]);

const data = reactive({
  dailyModel: {
    value: +dateTime().format("m"),
    label: dateTime().format("MMMM"),
  },
  monthlyModel: {
    value: +dateTime().format("yyyy"),
    label: dateTime().format("yyyy"),
  },
});
const dailyDropdown = computed(() => {
  let options = [];
  for (let month = 1; month <= 12; month++) {
    options.push({
      value: month,
      label: dateTime({ month: month - 1 }).format("MMMM"),
    });
  }
  return options;
});
const monthlyDropdown = computed(() => {
  let options = [];
  let year = +dateTime().format("yyyy");
  let end = year - 5;
  for (year; year >= end; year--) {
    options.push({
      value: year,
      label: dateTime({ year: year }).format("yyyy"),
    });
  }
  return options;
});
const style = ref();
const colors = ref();

refreshColors();

function refreshColors() {
  style.value = getComputedStyle(document.body);
  colors.value = {
    primary: `hsl(${style.value.getPropertyValue("--p")})`,
    secondary: `hsl(${style.value.getPropertyValue("--s")})`,
    accent: `hsl(${style.value.getPropertyValue("--ac")})`,
    primaryContent: `hsl(${style.value.getPropertyValue("--pc")})`,
    baseContent: `hsl(${style.value.getPropertyValue("--bc")})`,
    base100: `hsl(${style.value.getPropertyValue("--b1")})`,
    base200: `hsl(${style.value.getPropertyValue("--b2")})`,
    base300: `hsl(${style.value.getPropertyValue("--b3")})`,
  };
}

watch(
  () => preferences.theme,
  () => {
    refreshColors();
  }
);

const chartOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: colors.value.baseContent,
      },
    },

  },
};

const datasets = computed(() => {
  return {
    labels: props.chartData?.labels,
    datasets: [
      {
        label: props.moduleName,
        backgroundColor: colors.value.primary,
        borderColor: colors.value.primary,
        data: props.chartData?.data,
      },
    ],
  };
});
</script>
