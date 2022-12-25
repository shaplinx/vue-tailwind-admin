<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("poliklinik.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="poliklinik-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="poliklinik"
        :except="['delete', 'submitNext']"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        @submitNew="submit({ name: 'PoliklinikCreate' })"
        @submitClose="submit({ name: 'PoliklinikIndex' })"
        @close="() => router.push({ name: 'PoliklinikIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import poliklinikCRUD from "@/services/api/modules/poliklinikCRUD";
import { definePoliklinikSchema } from "@/forms/poliklinikForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";

const router = useRouter();
const onSubmit = (
  res: AxiosResponse<ResponseData<App.Models.Fasilitas.Poliklinik>>
) => {
  router.push({ name: "PoliklinikEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } =
  new useCreateCrud<App.Models.Fasilitas.Poliklinik>({
    crud: poliklinikCRUD,
    formId: "poliklinik-create",
    formData: {
    profesi: null,
  },
  processData: (values: any) => {
    return {
      ...values,
      profesi: values.profesi.map((pro: any) => pro.id),
    };
  },
  processErrors: (errors) => {
    return {
      ...errors,
      profesi: mergeErrorsWithPrefix('profesi', errors),
    };
  },
  });

const schema = definePoliklinikSchema({ t, formData });
</script>
