<template>
    <div>
      <TableCard
        :title="t('menu.mutasi') + ' ' + KomponenLab?.nama"
        :useFilter="true"
        :filterSchema="filterSchema"
        :buttons="buttons"
        v-model="serverOptions"
      >
        <DataTable
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :loading="loading"
          :headers="headers"
          :items="items"
          buttons-pagination
          :rows-items="[5, 10, 15]"
          alternating
          table-class-name="light-table"
          must-sort
        >
          <template #item-created_at="row">
            {{ dateTime(row.created_at).format("llll") }}
          </template>
          <template #item-reference_type="row">
            <p v-if="row.reference_type">{{ row.reference_type.split('\\').pop() }}</p>
          </template>
          <template #item-action="row">
            <DropdownMenuVue>
              <dv-button variant="primary" size="small"
                ><fa icon="ellipsis"></fa
              ></dv-button>
              <template #popper>
                <li
                  v-close-popper
                  v-for="action in actions"
                  @click="action.callback?.(row.id)"
                >
                  <a
                    ><fa v-if="action.icon" :icon="action.icon"></fa
                    >{{ action.label }}</a
                  >
                </li>
              </template>
            </DropdownMenuVue>
          </template>
        </DataTable>
      </TableCard>
    </div>
  </template>
  <script setup lang="ts">
  import TableCard from "@/components/cards/TableCard.vue";
  import { dateTime } from "@/services/moment/moment";
  import { useI18n } from "vue-i18n";
  import { watch, defineProps, PropType } from "vue";
  import DropdownMenuVue from "@/components/dropdowns/DropdownMenu.vue";
  import crud from "@/services/api/modules/stockMutationCRUD";
  import IndexCRUD from "@/hooks/crud/useIndexCrud";
  import { defineFilterSchema } from "@/forms/defaultFilters";

  
  const props = defineProps({
    KomponenLabId: [String, Number],
    KomponenLab: Object as PropType<App.Models.Fasilitas.Lab.KomponenLab>
  });
  
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
    loadFromServer,
  } = new IndexCRUD<App.Models.StockMutation>({
    moduleName: "stockMutation",
    crud,
    filterSchema: schema,
    headers: [
      { text: "ID", value: "id", sortable: true },
      { 
        text : t("menu.created_at"),
        value: "created_at",
        sortable:true,
    },
    { 
        text : t("menu.reference_type"),
        value: "reference_type",
        sortable:true,
    },
    { 
        text : t("menu.reference_id"),
        value: "reference_id",
        sortable:true,
    },
    { 
        text : t("menu.description"),
        value: "description",
        sortable:true,
    }
    
    ],
  })
    .addServerOptions({ date_start: null, date_end: null })
    .extRequestParams((index: any) => {
      return {
        date_start: index.serverOptions.value.date_start,
        date_end: index.serverOptions.value.date_end,
        stockable_id: props.KomponenLabId,
        stockable_type: `App\\Models\\Fasilitas\\Lab\\KomponenLab`
      };
    });
  
  loadFromServer();
  watch(
    serverOptions,
    (value) => {
      loadFromServer();
    },
    { deep: true }
  );
  </script>
  