import { FormKitSchemaNode } from "@formkit/core";
import { computed } from "vue";
import http from "@/services/api/base";
import { currency } from "@/services/dinero/dinero";

export const definePoliklinikSchema = ({
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
        $el: "div",
        attrs: {
          class: "grid grid-cols-1 lg:grid-cols-2 lg:gap-4",
        },
        children: [
          {
            $formkit: "text",
            name: "nama",
            label: t("poliklinik.form.nama"),
          },
          {
            $formkit: "text",
            name: "kode",
            help: t("poliklinik.form.kodeHelp"),
            label: t("poliklinik.form.kode"),
          },
        ],
      },

      {
        $el: "div",
        attrs: {
          class: "grid grid-cols-1 lg:grid-cols-3 lg:gap-4",
        },
        children: [
          {
            $formkit: "text",
            name: "fee",
            "sections-schema": {
              prefix: currency(),
            },
            help: t("poliklinik.form.feeHelp"),
            label: t("poliklinik.form.fee"),
          },
          {
            $formkit: "text",
            name: "jasa_klinisi",
            "sections-schema": {
              prefix: currency(),
            },
            help: t("poliklinik.form.jasa_klinisiHelp"),
            label: t("poliklinik.form.jasa_klinisi"),
          },
          {
            $formkit: "text",
            name: "jasa_asisten",
            "sections-schema": {
              prefix: currency(),
            },
            help: t("poliklinik.form.jasa_asistenHelp"),
            label: t("poliklinik.form.jasa_asisten"),
          },
        ],
      },
      {
        $formkit: "vSelect",
        name: "profesi",
        label: t("poliklinik.form.profesi"),
        displayLabel: "nama",
        placeholder: t("formkit.searchPlaceholder"),
        object: true,
        valueProp: "id",
        mode: "tags",
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
    ];
  });
};
