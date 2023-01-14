<template>
  <dv-card class="bg-base-100">
    <SpinnerOverlay :show="isLoading" />
    <dv-card-body>
      <FormKit
        :actions="false"
        v-model="model"
        type="form"
        :disabled="isSubmitting"
        id="permintaanLabForm"
      >
        <FormKitSchema :schema="schema" />
      </FormKit>
      <SaveButtons
        module="pemeriksaan"
        :is-saving="isSubmitting"
        :only="['submit', 'delete']"
        @submit="submit()"
        @delete="destroy"
      />
    </dv-card-body>
  </dv-card>
</template>
<script setup lang="ts">
import { defineEmits, watch } from "vue";
import SpinnerOverlay from "@/components/loader/SpinnerOverlay.vue";
import { BelongsToPertemuan } from "@/hooks/crud/extends/useBelongsToPertemuan";
import permintaanLabCrud from "@/services/api/modules/permintaanLabCRUD";
import { definePermintaanLabSchema } from "@/forms/permintaanLabForm";
import { useI18n } from "vue-i18n";
import SaveButtons from "@/components/buttons/SaveButtons.vue";
import { mergeErrorsWithPrefix, renameErrors, values } from "@/hooks/misc";
import { merge, flatMap, pick, keys, keyBy, map } from "lodash";
import { FormKit, FormKitSchema } from "@formkit/vue";

const { t } = useI18n();

const emit = defineEmits(["changed"]);

const { model, isLoading, isSubmitting, submit, init, destroy, getForm } =
  new BelongsToPertemuan<App.Models.Fasilitas.Lab.PermintaanLab>({
    onGetModelSuccess: (data: App.Models.Fasilitas.Lab.PermintaanLab) => {
      emit("changed", data.pertemuan_id);
    },
    processData: (data) => {
      return {
        ...data,
        laborat_id: data?.laborat?.id || null,
      } as App.Models.Fasilitas.Lab.PermintaanLab;
    },
    processErrors: (err) => {
      return {
        ...err,
        pemeriksaan_labs: mergeErrorsWithPrefix("pemeriksaan_labs", err),
        ...renameErrors("komponen_lab_id", "komponen_lab", err),
        ...renameErrors("pemeriksaan_lab_id", "pemeriksaan_lab", err),
      };
    },
    afterDelete: (form) => {
      form?.children.find((x) => x.name === "hasil_labs")?.input([]);
    },
    crud: permintaanLabCrud,
    formId: "permintaanLabForm",
    moduleName: "permintaanLab",
    model: {
      pemeriksaan_labs: null,
      laborat: null,
    } as App.Models.Fasilitas.Lab.PermintaanLab,
  });
const schema = definePermintaanLabSchema({ t, formData: model });

const renderHasilLabs = async (
  data: App.Models.Fasilitas.Lab.PermintaanLab["pemeriksaan_labs"]
) => {
  const hasilLabs = getForm()?.children.find((x) => x.name === "hasil_labs");
  let hasilLabFromInput = flatMap<App.Models.Fasilitas.Lab.PemeriksaanLab, any>(
    data!,
    (obj) => {
      let formatted = map(obj.komponen_lab!, (n) => {
        return {
          komponen_lab_id: n.id,
          komponen_lab: n,
          pemeriksaan_lab_id: obj.id,
          pemeriksaan_lab: obj,
        };
      });
      return formatted;
    }
  );

  if (hasilLabFromInput.length == 0) {
    hasilLabs?.input([]).then(() => {
      hasilLabs?.input([]);
    });
    return;
  }
  function makeKeys(obj: any) {
    return keyBy(obj, (o: any) => {
      return o.pemeriksaan_lab_id + "" + o.komponen_lab_id;
    });
  }

  let finalResult = makeKeys(hasilLabFromInput);

  let merged = merge(makeKeys(model.value?.hasil_labs), finalResult);

  let finalized = values(pick(merged, keys(finalResult)));

  if (model.value.hasil_labs?.length === 0) {
    hasilLabs?.input([]).then(() => {
      hasilLabs?.input(finalized);
    });
  }

  hasilLabs?.input(finalized);

  return;
};

watch(
  () => model.value?.pemeriksaan_labs,
  (val) => {
    if (val) {
      renderHasilLabs(val);
    }
  },
  { deep: true }
);

init();
</script>
