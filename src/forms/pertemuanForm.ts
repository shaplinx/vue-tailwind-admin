import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { computed } from "vue";

export const definePertemuanSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}) => {
  return computed<FormKitSchemaNode[]>(() => {
    return [
      {
        $formkit: "hidden",
        name: "id",
      },
      {
        $formkit: "vSelect",
        name: "pasien",
        displayLabel: "dropDownLabel",
        label: t("pertemuan.form.pasien"),
        object: true,
        valueProp: "id",
        "filter-results": false,
        "min-chars": 1,
        "resolve-on-aload": true,
        clearOnSearch: true,
        debounce: 500,
        searchable: true,
        options: (search: string): Promise<any[]> => {
          return http
            .get("/pasien", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
  
      {
        $formkit: "vSelect",
        name: "poliklinik",
        displayLabel: "nama",
        label: t("pertemuan.form.poliklinik"),
        object: true,
        valueProp: "id",
        "filter-results": false,
        "min-chars": 1,
        "resolve-on-load": true,
        clearOnSearch: true,
        debounce: 500,
        searchable: true,
        options: (search: string): Promise<any[]> => {
          return http
            .get("/fasilitas/poliklinik", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "vSelect",
        name: "pemeriksa",
        displayLabel: "fullname",
        label: t("pertemuan.form.pemeriksa"),
        object: true,
        disabled: formData.value?.poliklinik?.id ? false : true,
        valueProp: "id",
        "filter-results": false,
        "min-chars": 1,
        placeholder:t("formkit.searchPlaceholder"),
        "resolve-on-load": true,
        clearOnSearch: true,
        debounce: 500,
        searchable: true,
        options: (search: string): Promise<any[]> => {
          return http
            .get("/administrasi/pegawai", {
              params: {
                search,
                role: "Pemeriksa",
                Poliklinik_id: formData.value?.poliklinik?.id,
              },
            })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "vSelect",
        name: "asisten",
        displayLabel: "fullname",
        label: t("pertemuan.form.asisten"),
        object: true,
        placeholder:t("formkit.searchPlaceholder"),
        disabled: formData.value?.poliklinik?.id ? false : true,
        valueProp: "id",
        "filter-results": false,
        "min-chars": 1,
        "resolve-on-load": true,
        clearOnSearch: true,
        debounce: 500,
        searchable: true,
        options: (search: string): Promise<any[]> => {
          return http
            .get("/administrasi/pegawai", {
              params: {
                search,
                role: "Asisten",
                Poliklinik_id: formData.value?.poliklinik?.id || null,
              },
            })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "datepicker",
        name: "waktu_pertemuan",
        label: t("pertemuan.form.waktu_pertemuan"),
      },
    ];
  
  });
};
