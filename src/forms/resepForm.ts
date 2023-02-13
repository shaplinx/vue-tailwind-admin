import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";

export const defineResepSchema = ({
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
      $formkit: "hidden",
      name: "pertemuan_id",
    },
    {
      $formkit: "text",
      name: "ref_number",
      readOnly:true,
      label:t("resep.form.ref_number")
    },
    {
      $formkit: "vSelect",
      name: "farmasis",
      displayLabel: "fullname",
      label: t("resep.form.farmasis"),
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
          .get("/administrasi/pegawai", {
            params: { search, role: "Farmasis" },
          })
          .then((res) => res.data.data)
          .catch(() => []);
      },
    },
    {
      $formkit: "status",
      name: "status",
      label: t("pemeriksaan.form.status"),
    },

    {
      $formkit: "vRepeater",
      name: "resep_contents",
      label: t("resep.form.resep_contents"),
      addLabel: t("formkit.repeater-new"),
      children: [
        {
          $formkit: "vSelect",
          name: "obat",
          displayLabel: "label",
          label: t("resep.form.resep_contents_obat"),
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
              .get("/fasilitas/farmasi/obat", { params: { search } })
              .then((res) => res.data.data)
              .catch(() => []);
          },
        },
        {
          $el: "div",
          attrs: {
            class: "grid grid-cols-1 sm:grid-cols-2 gap-2",
          },
          children: [
            {
              $formkit: "number",
              name: "jumlah",
              label: t("resep.form.resep_contents_jumlah"),
            },
            {
              $formkit: "text",
              name: "aturan_pakai",
              label: t("resep.form.resep_contents_aturan_pakai"),
            },
          ],
        },
      ],
    },
    {
      $formkit: "vRepeater",
      name: "resep_luars",
      label: t("resep.form.resep_luars"),
      addLabel: t("formkit.repeater-new"),
      children: [
        {
          $formkit: "text",
          name: "nama_obat",
          label: t("resep.form.resep_luars_nama_obat"),
        },
        {
          $el: "div",
          attrs: {
            class: "grid grid-cols-1 sm:grid-cols-2 gap-2",
          },
          children: [
            {
              $formkit: "number",
              name: "jumlah",
              label: t("resep.form.resep_luars_jumlah"),
            },
            {
              $formkit: "text",
              name: "signa",
              label: t("resep.form.resep_luars_signa"),
            },
          ],
        },
      ],
    },
  ];
};
