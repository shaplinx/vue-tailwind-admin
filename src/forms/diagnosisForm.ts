import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";

export const defineDiagnosisSchema = ({
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
      label: t("diagnosis.form.nama"),
    },
    {
      $formkit: "vSelect",
      name: "icd10",
      label: t("diagnosis.form.icd10_id"),
      displayLabel: "name_locale",
      placeholder: t("formkit.searchPlaceholder"),
      object: true,
      valueProp: "id",
      "filter-results": false,
      "min-chars": 1,
      "resolve-on-load": false,
      clearOnSearch: true,
      debounce: 500,
      searchable: true,
      options: (search: string): Promise<any[]> => {
        return http
          .get("/administrasi/icd10", { params: { search } })
          .then((res: any) => res.data.data);
      },
    },
  ];
};
