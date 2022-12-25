import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { currency } from "@/services/dinero/dinero";

export const definePemeriksaanLabSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}): FormKitSchemaNode[] => {
  return [
    {
      $formkit: "hidden",
      name: "id",
    },
    {
      $formkit: "text",
      name: "nama",
      label: t("pemeriksaanLab.form.nama"),
    },
    {
      $formkit: "text",
      name: "kode",
      help: t("pemeriksaanLab.form.kode_help"),
      label: t("pemeriksaanLab.form.kode"),
    },
    {
      $el: "div",
      attrs: {
        class: "grid grid-cols-2 gap-2",
      },
      children: [
        {
          $formkit: "number",
          "sections-schema": {
            prefix: currency(),
          },
          name: "harga_jual",
          label: t("pemeriksaanLab.form.harga_jual"),
        },
        {
          $formkit: "number",
          "sections-schema": {
            prefix: currency(),
          },
          name: "harga_beli",
          label: t("pemeriksaanLab.form.harga_beli"),
        },
      ],
    },

    {
      $formkit: "vSelect",
      name: "kategori_lab",
      displayLabel: "nama",
      label: t("pemeriksaanLab.form.kategori_lab"),
      object: true,
      valueProp: "id",
      "filter-results": false,
      "min-chars": 1,
      "resolve-on-load": true,
      clearOnSearch: true,
      debounce: 400,
      searchable: true,
      options: (search: string): Promise<any[]> => {
        return http
          .get("/fasilitas/lab/kategori", { params: { search } })
          .then((res) => res.data.data)
          .catch(() => []);
      },
    },
    {
      $formkit: "vSelect",
      name: "komponen_lab",
      displayLabel: "nama",
      label: t("pemeriksaanLab.form.komponen_lab"),
      object: true,
      mode: "tags",
      valueProp: "id",
      "filter-results": false,
      "min-chars": 1,
      "resolve-on-load": true,
      clearOnSearch: true,
      debounce: 400,
      searchable: true,
      options: (search: string): Promise<any[]> => {
        return http
          .get("/fasilitas/lab/komponen", { params: { search } })
          .then((res) => res.data.data)
          .catch(() => []);
      },
    },
  ];
};
