import { HasOverviewActions } from "@/services/api/modules/crud/crud";
import { ref, reactive, Ref, ComputedRef, computed, watch } from "vue";
import map from "lodash/map";
import keys from "lodash/keys";
import values from "lodash/values";
import { dateTime } from "@/services/moment/moment";
interface OverviewConfig<T> {
  crud: HasOverviewActions<T>;
  processData?: (data: any) => any;
}

interface OverviewModel {
  monthlyReport: {
    date: string;
    reports: { [key: string]: any }[];
  };
  dailyReport: {
    date: string;
    reports: { [key: string]: any }[];
  };
  countAllTime: number;
  countThisMonth: number;
}

interface Reports {
  labels: string[];
  data: any[];
}

export function useOverview(conf: OverviewConfig<any>): {
  rawParams: any;
  overviewModel: Ref<any>;
  getOverview: () => void;
  isLoadingOverview: Ref<boolean>;
  monthlyReport: ComputedRef<Reports | null>;
  dailyReport: ComputedRef<Reports | null>;
  dateMonthly: ComputedRef<string>;
  dateDaily: ComputedRef<string>;
  countAllTime: ComputedRef<number>;
  countThisMonth: ComputedRef<number>;
  init: () => void;
} {
  const rawParams = reactive({ dateDaily: dateTime().month() + 1, dateMonthly: dateTime().year() });
  const overviewModel = ref<OverviewModel>({} as OverviewModel);
  const isLoadingOverview = ref(false);

  function getOverview() {
    isLoadingOverview.value = true;
    return conf.crud.getOverview!({
      config: { params: conf.processData?.(rawParams) ?? rawParams },
    })
      .then((res) => {
        overviewModel.value = res.data;
      })
      .catch(() => {
        overviewModel.value = {} as OverviewModel;
      })
      .finally(() => {
        isLoadingOverview.value = false;
      });
  }
  const monthlyReport = computed<Reports | null>(() => {
    if (overviewModel.value.monthlyReport) {
      let monthly = overviewModel.value.monthlyReport.reports;
      return {
        labels: map(monthly, (val) => {
          return keys(val)[0];
        }),
        data: map(monthly, (val) => {
          return values(val)[0];
        }),
      };
    } else {
      return null;
    }
  });
  const dailyReport = computed<Reports | null>(() => {
    if (overviewModel.value && overviewModel.value.dailyReport) {
      let daily = overviewModel.value.dailyReport.reports;
      return {
        labels: map(daily, (val) => {
          return keys(val)[0];
        }),
        data: map(daily, (val) => {
          return values(val)[0];
        }),
      };
    }
    return null;
  });
  const dateMonthly = computed<string>(() => {
    if (isLoadingOverview.value) {
      return "";
    }
    return overviewModel.value.monthlyReport
      ? overviewModel.value.monthlyReport.date
      : "";
  });
  const dateDaily = computed<string>(() => {
    if (isLoadingOverview.value) {
      return "";
    }
    return overviewModel.value.dailyReport
      ? overviewModel.value.dailyReport.date
      : "";
  });
  const countAllTime = computed<number>(() => {
    return overviewModel.value.countAllTime;
  });
  const countThisMonth = computed<number>(() => {
    return overviewModel.value.countThisMonth;
  });

  function init() {
    return watch(
      rawParams,
      (value) => {
        getOverview();
        console.log(value);
      },
      { deep: true }
    );
  }

  return {
    rawParams,
    overviewModel,
    getOverview,
    isLoadingOverview,
    monthlyReport,
    dailyReport,
    dateMonthly,
    dateDaily,
    countAllTime,
    countThisMonth,
    init,
  };
}
