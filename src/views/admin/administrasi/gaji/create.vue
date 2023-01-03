<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("gaji.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="gaji-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="gaji"
        :except="['delete', 'submitNext']"
        :is-saving="isSaving"
        @submitNew="submit({ name: 'GajiCreate' })"
        @submit="submit(onSubmit)"
        @submitNext="submit()"
        @submitClose="submit({ name: 'GajiIndex' })"
        @close="() => router.push({ name: 'GajiIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import gajiCRUD from "@/services/api/modules/gajiCRUD";
import { defineGajiSchema } from "@/forms/gajiForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";
import { mergeErrorsWithPrefix } from "@/hooks/misc";

const router = useRouter();
const onSubmit = (
  res: AxiosResponse<ResponseData<App.Models.Administrasi.Gaji>>
) => {
  router.push({ name: "GajiEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } =
  new useCreateCrud<App.Models.Administrasi.Gaji>({
    crud: gajiCRUD,
    formId: "gaji-create",
    formData: {
      user: null,
      status: 0,
    },
    processData: (values) => {
      return {
        ...values,
        user_id: values.user?.id,
      };
    },
    processErrors: (errors) => {
      return {
        ...errors,
        user: mergeErrorsWithPrefix("user", errors),
      };
    },
  });

const schema = defineGajiSchema({ t, formData });
</script>
