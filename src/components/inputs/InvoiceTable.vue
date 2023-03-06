<template>
  <div v-if="model?.length">
    <table class="table w-full my-4 px-6 table-compact">
      <!-- head -->
      <thead>
        <tr>
          <th class="text-center" v-for="col in columns">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover" v-for="(datum, rowIndex) in data">
          <td class="text-center" v-for="col in columns">
            {{
              col.render
                ? col.render(datum[col.dataIndex!], datum, rowIndex)
                : datum[col.dataIndex!]
            }}
          </td>
        </tr>
      </tbody>
      <thead class>
        <tr class="border-t border-base-300">
          <th :colspan="columns.length - 1" class="text-center">{{ t("invoice.form.jumlah") }}</th>
          <th class="text-center">{{ money(sum).toFormat() }}</th>
        </tr>
      </thead>
    </table>
    <div v-if="!printMode" class="w-full flex sm:w-52 items-center justify-between">
      <Toggle v-model="details"></Toggle
      ><span class="text-sm">{{ $t("invoice.form.details") }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { chain, sumBy, map, isArray } from "lodash";
import { ITableColumn } from "daisyui-vue";
import { money } from "@/services/dinero/dinero";
import Toggle from "./Toggle.vue";
import { ref, computed, defineProps } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps(["modelValue", "id", "title","printMode", "propDetails"]);

const model = computed(() => {
  return isArray(props.modelValue) ? props.modelValue : [];
});

const details = ref<boolean>(false);

const columns: ITableColumn<any>[] = [
  {
    dataIndex: "deskripsi",
    title: t("invoice.form.deskripsi"),
  },
  {
    dataIndex: "jumlah",
    title: t("invoice.form.jumlah"),
  },
  {
    dataIndex: "subTotal",
    title: t("invoice.form.subTotal"),
    render: (text: string): string => money(text).toFormat(),
  },
];

const data = computed<any[]>((): any[] => {
  {
    if (model.value?.length === 0) return [];
    var parsedData: any[] = map(model.value, (item: any): any => {
      return {
        content_type: item.content_type,
        deskripsi: item.deskripsi,
        harga: item.harga,
        jumlah: item.jumlah,
        subTotal: item.jumlah * item.harga,
      };
    });
    if (props.printMode ? props.propDetails : details.value) {
      return parsedData ?? ([] as any[]);
    }
    return (
      chain(parsedData)
        .groupBy("content_type")
        .map((item, key) => {
          return {
            deskripsi: t(
              `menu.${chain(key).split("\\").last().value().toLowerCase()}`
            ),
            jumlah: 1,
            subTotal: sumBy(item, (item) => Number(item.subTotal)),
          };
        })
        .value() ?? ([] as any[])
    );
  }
});
const sum = computed(() => {
  return sumBy(data.value, (item) => Number(item.subTotal));
});
</script>
