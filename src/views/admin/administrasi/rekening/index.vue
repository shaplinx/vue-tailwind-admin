<template>
  <div>
    <Overview />
    <TableCard :title="t('rekening.index-title')" :useFilter="true" :filterSchema="filterSchema" :buttons="buttons"
      v-model="filterParams">
      <DataTable v-model:server-options="serverOptions" :server-items-length="serverItemsLength" :loading="loading"
        :headers="headers" :items="items" buttons-pagination :rows-items="[5, 10, 15]" alternating
        table-class-name="light-table" must-sort>
        <template #item-amount="row">
          <span :class="row.amount < 0 ? 'text-error' : 'text-success'">
            {{ money(row.amount).toFormat() }}
          </span>
        </template>
        <template #item-mutator_type="row">
          <dv-badge v-if="row.mutator" type="secondary">
            {{ row.mutator_type.split("\\").pop() }}
          </dv-badge>
        </template>
        <template #item-created_at="row">
          {{ dateTime(row.created_at).format("llll") }}
        </template>
        <template #item-active="row">
          <dv-badge :type="row.active == 1 ? 'success' : 'error'">
            {{ t(`menu.boolean.${row.active}`) }}
          </dv-badge>
        </template>
        <template #item-action="row">
          <DropdownMenuVue>
            <dv-button variant="primary" size="small">
              <fa icon="ellipsis"></fa>
            </dv-button>
            <template #popper>
              <li v-close-popper v-for="action in actions" @click="action.callback?.(row.id)">
                <a>
                  <fa v-if="action.icon" :icon="action.icon"></fa>{{ action.label }}
                </a>
              </li>
            </template>
          </DropdownMenuVue>
        </template>
      </DataTable>
    </TableCard>
  </div>
</template>
<script setup lang="ts">
import Overview from "./overview.vue";
import TableCard from "@/components/cards/TableCard.vue";
import { useI18n } from "vue-i18n";
import { money } from "@/services/dinero/dinero";
import { watch } from "vue";
import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
import crud from "@/services/api/modules/rekeningCRUD";
import IndexCRUD from "@/hooks/crud/useIndexCrud";
import { defineFilterSchema } from "@/forms/defaultFilters";
import { dateTime } from "@/services/moment/moment";

const { t } = useI18n();
const schema = defineFilterSchema({ t });

const {
  actions,
  buttons,
  filterSchema,
  items,
  headers,
  loading,
  serverItemsLength,
  serverOptions,
  filterParams,
} = new IndexCRUD<App.Models.Administrasi.BallanceMutation>({
  moduleName: "Rekening",
  crud,
  filterSchema: schema,
  headers: [
    { text: "ID", value: "id", sortable: true },
    { text: t("rekening.form.amount"), value: "amount", sortable: true },
    {
      text: t("rekening.form.mutator_type"),
      value: "mutator_type",
      sortable: true,
    },
    {
      text: t("rekening.form.mutator_id"),
      value: "mutator_id",
      sortable: true,
    },
    {
      text: t("rekening.form.description"),
      value: "description",
      sortable: true,
    },

    { text: t("rekening.form.active"), value: "active", sortable: false },
    { text: t("menu.created_at"), value: "created_at", sortable: true },
    { text: "Aksi", value: "action", sortable: false },
  ],
  buttons: (index) => [
    {
      label: t("rekening.add-new-title"),
      iconClass: "plus",
      variant: "primary",
      outline: true,
      onClick: () => index.router.push({ name: "RekeningCreate" }),
    },
  ],
}).addFilterParams({ date_start: null, date_end: null, active: undefined })
  .addFilterSchema([
    {
      $formkit: "select",
      name: "active",
      options: [
        { label: t("menu.all"), value: undefined },
        { label: t("menu.yes"), value: true },
        { label: t("menu.no"), value: false },
      ],
      label: t("menu.active"),
      "label-class": "$reset text-sm",
      "outer-class": "mb-0",
      "inner-class": "bg-base-100 text-sm",
      "wrapper-class": "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
    }
  ])
  .extRequestParams((index: any) => {
    return {
      active: index.filterParams.value.active,
    };
  });

// initial load

</script>
