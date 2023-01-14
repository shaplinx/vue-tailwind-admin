<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-info">
          <fa icon="money-bill" size="2xl" />
        </div>
        <div class="stat-title">{{ t("rekening.incomes") }}</div>
        <span
          class="stat-value animate-pulse w-24 h-9 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        >
        </span>
        <div class="stat-value text-info" v-show="!isLoadingOverview">
          {{ money(overviewModel.incomes?.real).toFormat() }}
        </div>
        <span
          class="stat-value animate-pulse w-30 h-4 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        />
        <div class="stat-desc" v-show="!isLoadingOverview">
          {{ t("rekening.projected") }} :
          {{ money(overviewModel.incomes?.projected).toFormat() }}
        </div>
      </div>
    </div>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-error">
          <fa icon="file-invoice-dollar" size="2xl" />
        </div>
        <div class="stat-title">{{ t("rekening.expenses") }}</div>
        <span
          class="stat-value animate-pulse w-24 h-9 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        >
        </span>
        <div class="stat-value text-error" v-show="!isLoadingOverview">
          {{ money(overviewModel.expenses?.real).toFormat() }}
        </div>
        <span
          class="stat-value animate-pulse w-30 h-4 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        />
        <div class="stat-desc" v-show="!isLoadingOverview">
          {{ t("rekening.projected") }} :
          {{ money(overviewModel.expenses?.projected).toFormat() }}
        </div>
      </div>
    </div>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-figure text-primary">
          <fa icon="hand-holding-dollar" size="2xl" />
        </div>
        <div class="stat-title">{{ t("rekening.ballances") }}</div>
        <span
          class="stat-value animate-pulse w-24 h-9 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        >
        </span>
        <div class="stat-value text-primary" v-show="!isLoadingOverview">
          {{ money(overviewModel.ballances?.real).toFormat() }}
        </div>
        <span
          class="stat-value animate-pulse w-30 h-4 mt-1 bg-base-200 rounded-lg"
          v-show="isLoadingOverview"
        />
        <div class="stat-desc" v-show="!isLoadingOverview">
          {{ t("rekening.projected") }} :
          {{ money(overviewModel.ballances?.projected).toFormat() }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOverview } from "@/hooks/crud/extends/useOverview";
import rekeningCrud from "@/services/api/modules/rekeningCRUD";
import { dateTime } from "@/services/moment/moment";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { money } from "@/services/dinero/dinero";

const { t } = useI18n();

const { overviewModel, getOverview, isLoadingOverview } = useOverview({
  crud: rekeningCrud,
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
</script>
