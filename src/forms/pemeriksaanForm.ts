import { FormKitSchemaNode, FormKitNode } from "@formkit/core";
import http from "@/services/api/base";
import { computed } from "vue";

export const definePemeriksaanSchema = ({
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
        $formkit: "hidden",
        name: "pertemuan_id",
      },
      {
        $formkit: "textarea",
        name: "anamnesis",
        rows:"5",
        label: t("pemeriksaan.form.anamnesis"),
      },
      {
        $el: "div",
        attrs: {
          class: "grid grid-cols-2 sm:grid-cols-3 gap-2",
        },
        children: [
          {
            $formkit: "text",
            "sections-schema": {
              suffix: t("formkit.ttv.bp"),
            },
            name: "tekanan_darah",
            label: t("pemeriksaan.form.tekanan_darah"),
            help: t("pemeriksaan.form.tekanan_darah_help"),
          },
          {
            $formkit: "number",
            "sections-schema": {
              suffix: t("formkit.ttv.hr"),
            },
            name: "laju_nadi",
            label: t("pemeriksaan.form.laju_nadi"),
          },
          {
            $formkit: "number",
            "sections-schema": {
              suffix: t("formkit.ttv.rr"),
            },
            name: "laju_nafas",
            label: t("pemeriksaan.form.laju_nafas"),
          },
          {
            $formkit: "number",
            "sections-schema": {
              suffix: t("formkit.ttv.temp"),
            },
            name: "suhu",
            label: t("pemeriksaan.form.suhu"),
          },
          {
            $formkit: "number",
            "sections-schema": {
              suffix: t("formkit.ttv.spo2"),
            },
            name: "saturasi",
            label: t("pemeriksaan.form.saturasi"),
          },
        ],
      },
      {
        $formkit: "textarea",
        name: "px_fisik",
        rows:"5",
        label: t("pemeriksaan.form.px_fisik"),
      },
      {
        $formkit: "status",
        name: "status",
        label: t("pemeriksaan.form.status"),
      },
      {
        $formkit: "vRepeater",
        name: "diagnosis",
        repeatable: true,
        label: t("pemeriksaan.form.diagnosis"),
        "add-label": `+ ${t("menu.add-new")}`,
        children: [
          {
            $formkit: "autoSuggest",
            name: "nama",
            label: t("pemeriksaan.form.diagnosis_nama"),
            labelKey: "nama",
            valueKey: "id",
            onSelect: (val: string, item: any, node: FormKitNode) => {
             
              node?.parent?.input?.(item).then(()=> {
                node.parent?.input(item)
              });
            },
            onSearch: (search: string, loading: any, set: any) => {
              loading(true);
              return http
                .get("administrasi/diagnosis", { params: { search } })
                .then((res) => {
                  set(res.data.data);
                  return res.data.data;
                })
                .catch(() => {
                  set([]);
                  return [];
                })
                .finally(() => {
                  loading(false);
                });
            },
            reduce: (item: any) => item.nama,
          },
          {
            $formkit: "vSelect",
            name: "icd10",
            label: t("pemeriksaan.form.diagnosis_icd10"),
            displayLabel: "label_locale",
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
                .then((res) => res.data.data)
                .catch(() => []);
            },
          },
        ],
      },
    ];
  });
};
