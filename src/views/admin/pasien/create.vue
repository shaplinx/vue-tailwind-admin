<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("pasien.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="pasien-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pasien"
        :except="['delete']"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        @submitNext="
          submit((res) => {
            router.push({
              name: 'PertemuanCreate',
              params: {
                pasienId: res.data.data.id,
              },
            });
          })
        "
        @submitNew="submit({ name: 'PasienCreate' })"
        @submitClose="submit({ name: 'PasienIndex' })"
        @close="() => router.push({ name: 'PasienIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template>

<script lang="ts" setup>
import pasienCRUD from "@/services/api/modules/pasienCRUD";
import { definePasienSchema } from "@/forms/pasienForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Pasien>>) => {
  router.push({ name: "PasienEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit, router } =
  new useCreateCrud<App.Models.Pasien>({
    crud: pasienCRUD,
    formId: "pasien-create",
    formData: {
      alamat_idn: null,
      tmp_lahir: null,
    },
    processData: (values: any): App.Models.Pasien => {
      return {
        ...values,
        tmp_lahir_id: values.tmp_lahir?.id || null,
        alamat_id: values.alamat_idn?.id || null,
      };
    },
    processErrors: (errors) => {
      return {
        ...errors,
        tmp_lahir: errors.tmp_lahir_id ?? [],
        alamat_idn: errors.alamat_id ?? [],
      };
    },
  });

const schema = definePasienSchema({ t, formData });
</script>
