import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { currency } from "@/services/dinero/dinero";

export const defineGajiSchema = ({
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
      $formkit: "vSelect",
      name: "user",
      label: t("gaji.form.user"),
      displayLabel: "fullname",
      placeholder: t("formkit.searchPlaceholder"),
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
          .get("/administrasi/pegawai", { params: { search } })
          .then((res: any) => res.data.data);
      },
    },
    {
      $formkit: "status",
      name: "status",
      label: t("gaji.form.status"),
    },
    {
      $el: "div",
      attrs: {
        class: "grid grid-cols-1 md:grid-cols-2 gap-2",
      },
      children: [
        {
          $formkit: "date",
          name: "start_date",
          help: t("gaji.form.start_date_help"),
          label: t("gaji.form.start_date"),
        },
        {
          $formkit: "date",
          name: "end_date",
          help: t("gaji.form.end_date_help"),
          label: t("gaji.form.end_date"),
        },
      ],
    },
    {
      $formkit: "vRepeater",
      name: "custom_gaji_contents",
      addLabel: t("formkit.repeater-new"),
      label: t("gaji.form.customGaji"),
      children: [
        {
          $formkit: "text",
          name: "deskripsi",
          label: t("gaji.form.deskripsi"),
        },
        {
          $formkit: "number",
          "sections-schema": {
            prefix: currency(),
          },
          name: "harga",
          label: t("gaji.form.harga"),
        },
      ],
    },
    {
      $el: "div",
      attrs: {
        class: "grid grid-cols-1 md:grid-cols-3 gap-2",
      },
      children: [
        {
          $el: "div",
          children: [
            {
              $formkit: "number",
              "sections-schema": {
                prefix: currency(),
              },
              name: "totalJasa",
              readonly: true,
              label: t("gaji.form.totalJasa"),
            },
          ],
        },
        {
          $el: "div",
          children: [
            {
              $formkit: "number",
              "sections-schema": {
                prefix: currency(),
              },
              name: "totalCustomGaji",
              readonly: true,
              label: t("gaji.form.totalCustomGaji"),
            },
          ],
        },
        {
          $el: "div",
          children: [
            {
              $formkit: "number",
              "sections-schema": {
                prefix: currency(),
              },
              name: "totalGaji",
              readonly: true,
              label: t("gaji.form.totalGaji"),
            },
          ],
        },
      ],
    },
  ];
};
