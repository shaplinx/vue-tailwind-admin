<template>
  <dv-card class="bg-base-100 text-base-content">
    <dv-card-body>
      <dv-card-title class="flex">
        {{ t("kategoriLab.add-new-title") }}
      </dv-card-title>
      <FormKit
        :actions="false"
        v-model="formData"
        type="form"
        :disabled="isSaving"
        id="kategoriLab-create"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="kategoriLab"
        :is-saving="isSaving"
        @submit="submit(onSubmit)"
        :except="['delete','submitNext']"
        @submitNew="submit({ name: 'KategoriLabCreate' })"
        @submitClose="submit({ name: 'KategoriLabIndex' })"
        @close="() => router.push({ name: 'KategoriLabIndex' })"
      />
    </dv-card-body>
  </dv-card>
</template> 

<script lang="ts" setup>
import kategoriLabCRUD from "@/services/api/modules/kategoriLabCRUD";
import { defineKategoriLabSchema } from "@/forms/kategoriLabForm";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import useCreateCrud from "@/hooks/crud/useCreateCrud";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { AxiosResponse } from "axios";
import { ResponseData } from "@/services/api/modules/crud/crud";

const router = useRouter();
const onSubmit = (res: AxiosResponse<ResponseData<App.Models.Fasilitas.Lab.KategoriLab>>) => {
  router.push({ name: "KategoriLabEdit", params: { id: res.data.data.id } });
};

const { t } = useI18n();

const { isSaving, formData, submit } = new useCreateCrud<App.Models.Fasilitas.Lab.KategoriLab>({
  crud: kategoriLabCRUD,
  formId: "kategoriLab-create",
});

const schema = defineKategoriLabSchema({ t, formData });
</script>
