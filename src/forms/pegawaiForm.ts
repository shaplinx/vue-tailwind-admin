
 import { FormKitSchemaNode } from "@formkit/core";
 import http from "@/services/api/base";
 import { computed } from "vue";
 
 export const definePegawaiSchema = ({
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
        $formkit: "text",
        name: "name",
        label: t("pegawai.form.name"),
        help: t('pegawai.form.name_help'),
      },
      {
        $formkit: "email",
        name: "email",
        label: t("pegawai.form.email"),
      },
      {
        $formkit: "password",
        name: "password",
        label: t("pegawai.form.password"),
      },
      {
        $formkit: "password",
        name: "password_confirm",
        label: t("pegawai.form.password_confirmation"),
      },
      {
        $formkit: "vSelect",
        name: "profesi",
        label: t("pegawai.form.profesi"),
        displayLabel: "nama",
        placeholder: t("formkit.searchPlaceholder"),
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
            .get("/administrasi/profesi", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "vSelect",
        name: "roles",
        label: t("pegawai.form.roles"),
        displayLabel: "name",
        placeholder: t("formkit.searchPlaceholder"),
        object: true,
        mode:"tags",
        valueProp: "id",
        "filter-results": false,
        "min-chars": 1,
        "resolve-on-load": true,
        clearOnSearch: true,
        debounce: 500,
        searchable: true,
        options: (search: string): Promise<any[]> => {
          return http
            .get("/administrasi/roles", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
    ];
   });
 };
 
 
 
