import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";

export const definePertemuanTindakanSchema = ({
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
      $formkit: "status",
      name: "status",
      label: t("pemeriksaan.form.status"),
    },
    {
      $formkit: "vRepeater",
      name: "tindakan_contents",
      label: t("pertemuanTindakan.form.tindakan_contents"),
      addLabel: t("formkit.repeater-new"),
      children: [
        {
          $el: "div",
          attrs: {
            class: "grid grid-cols-2 gap-2"
          },
          children: [
            {
              $formkit: "vSelect",
              name: "tindakan",
              displayLabel: "nama",
              label: t("pertemuanTindakan.form.tindakan_contents_tindakan"),
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
                  .get("/administrasi/tindakan", { params: { search } })
                  .then((res) => res.data.data)
                  .catch(() => []);
              },
            },
            {
              $formkit: "vSelect",
              name: "operator",
              displayLabel: "fullname",
              label: t("pertemuanTindakan.form.tindakan_contents_operator"),
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
                  .get("/administrasi/pegawai", { params: { search } })
                  .then((res) => res.data.data)
                  .catch(() => []);
              },
            },
            {
              $formkit: "vSelect",
              name: "asisten",
              displayLabel: "fullname",
              label: t("pertemuanTindakan.form.tindakan_contents_asisten"),
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
                  .get("/administrasi/pegawai", { params: { search } })
                  .then((res) => res.data.data)
                  .catch(() => []);
              },
            },
            {
              $formkit: "number",
              name: "jumlah",
              label:t('pertemuanTindakan.form.tindakan_contents_jumlah'),
            },
          ]
        },
       

      ]
    },
  ];
};


