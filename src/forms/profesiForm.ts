import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";

export const definePasienSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}) : FormKitSchemaNode[] => {
    return [
      {
        $formkit: "hidden",
        name: "id",
      },
      {
        $formkit: "text",
        name: "nama",
        label: t("profesi.form.nama"),
      },
      {
        $formkit: "text",
        name: "gelar_depan",
        help: t("profesi.form.gelar_depan_help"),
        label: t("profesi.form.gelar_depan"),
      },
      {
        $formkit: "text",
        name: "gelar_belakang",
        help: t("profesi.form.gelar_belakang_help"),
        label: t("profesi.form.gelar_belakang"),
      },
      {
        $formkit: "number",
        name: "gaji_pokok",
        label: t("profesi.form.gaji_pokok"),
      },
      {
        $formkit: "vSelect",
        name: "poliklinik",
        displayLabel: "nama",
        help: t("profesi.form.poliklinik_help"),
        label: t("profesi.form.poliklinik"),
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
            .get("/fasilitas/poliklinik", {
              params: { search },
            })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
    ];
};
