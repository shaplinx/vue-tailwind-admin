<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div>
        <ChartCard
          :chart-data="dailyReport"
          dropdown="daily"
          :isLoading="isLoadingOverview"
          module-name="Pertemuan"
          :heading="$t('pertemuan.dailyReport')"
          @update:modelValue="(val) => (rawParams.dateDaily = val)"
          :modelValue="rawParams.dateDaily"
          :subHeading="dateDaily"
        />
      </div>
      <div>
        <ChartCard
          :heading="$t('pertemuan.monthlyReport')"
          :subHeading="dateMonthly"
          :chartData="monthlyReport"
          dropdown="monthly"
          module-name="Pertemuan"
          :modelValue="rawParams.dateMonthly"
          :isLoading="isLoadingOverview"
          @update:modelValue="(val) => (rawParams.dateMonthly = val)"
        />
      </div>
    </div>
    <div class="grid grid-cols-1">
      <div class="stats shadow overflow-hidden">
        <div class="stat">
          <div class="stat-figure text-primary">
            <fa icon="heart-circle-plus" size="2xl" />
          </div>
          <div class="stat-title">{{ t("pertemuan.countAllTime") }}</div>
          <span
            class="stat-value animate-pulse w-24 h-9 mt-1 bg-base-200 rounded-lg"
            v-show="isLoadingOverview"
          >
          </span>
          <div class="stat-value text-primary" v-show="!isLoadingOverview">
            {{ countAllTime }}
          </div>
        </div>
        <div class="stat">
          <div class="stat-figure text-primary">
            <fa icon="heart-circle-check" size="2xl" />
          </div>
          <div class="stat-title">{{ t("pertemuan.countThisMonth") }}</div>
          <span
            class="stat-value animate-pulse w-24 h-9 mt-1 bg-base-200 rounded-lg"
            v-show="isLoadingOverview"
          >
          </span>

          <div class="stat-value text-primary" v-show="!isLoadingOverview">
            {{ countThisMonth }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ChartCard from "@/components/cards/ChartCard.vue";
import { useOverview } from "@/hooks/crud/extends/useOverview";
import pertemuanCrud from "@/services/api/modules/pertemuanCRUD";
import { dateTime } from "@/services/moment/moment";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const {
  rawParams,
  getOverview,
  isLoadingOverview,
  monthlyReport,
  dailyReport,
  dateMonthly,
  dateDaily,
  countAllTime,
  countThisMonth,
  init,
} = useOverview({
  crud: pertemuanCrud,
  processData: (data) => {
    return {
      dateMonthly: data.dateMonthly
        ? dateTime({ year: data.dateMonthly }).add({ year: 1 }).toISOString()
        : dateTime().toISOString(),
      dateDaily: dateTime({
        month: data.dateDaily,
        year: data.dateMonthly,
      }).toISOString(),
    };
  },
});

onMounted(() => {
  getOverview();
});

init();
</script>
