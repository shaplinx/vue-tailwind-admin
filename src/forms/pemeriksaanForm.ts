import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { computed } from "vue";

export const definePasienSchema = ({
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
        label: t("pemeriksaan.form.anamnesis"),
      },
      {
        component: "div",
        class: "row",
        children: [
          {
            component: "div",
            class: "col-sm-12 col-md-6 col-lg-4",
            children: [
              {
                $formkit: "inputGroup",
                inputType: "text",
                append: "mmHg",
                name: "tekanan_darah",
                label: t("pemeriksaan.form.tekanan_darah"),
                help: t("pemeriksaan.form.tekanan_darah_help"),
              },
            ],
          },
          {
            component: "div",
            class: "col-sm-12 col-md-6 col-lg-4",
            children: [
              {
                $formkit: "inputGroup",
                inputType: "text",
                append: "x/menit",
                name: "laju_nadi",
                label: t("pemeriksaan.form.laju_nadi"),
              },
            ],
          },
          {
            component: "div",
            class: "col-sm-12 col-md-6 col-lg-4",
            children: [
              {
                $formkit: "inputGroup",
                inputType: "text",
                append: "x/menit",
                name: "laju_nafas",
                label: t("pemeriksaan.form.laju_nafas"),
              },
            ],
          },
          {
            component: "div",
            class: "col-sm-12 col-md-6 col-lg-3",
            children: [
              {
                $formkit: "inputGroup",
                inputType: "text",
                append: "°C",
                name: "suhu",
                label: t("pemeriksaan.form.suhu"),
              },
            ],
          },
          {
            component: "div",
            class: "col-sm-12 col-md-6 col-lg-3",
            children: [
              {
                $formkit: "inputGroup",
                inputType: "text",
                append: "%",
                name: "saturasi",
                label: t("pemeriksaan.form.saturasi"),
              },
            ],
          },
        ],
      },
      {
        $formkit: "textarea",
        name: "px_fisik",
        label: t("pemeriksaan.form.px_fisik"),
      },
      this.statusField,
      {
        $formkit: "group",
        name: "diagnosis",
        repeatable: true,
        label: t("pemeriksaan.form.diagnosis"),
        "add-label": `+ ${t("menu.add-new")}`,
        children: [
          {
            $formkit: "auto-suggest",
            name: "nama",
            label: t("pemeriksaan.form.diagnosis_nama"),
            list: this.options.diagnosis,
            "display-attribute": "nama",
            "value-attribute": "nama",
            "@search": (search) =>
              this.handleSearchAutoSuggest({
                url: "/api/administrasi/diagnosis",
                field: "diagnosis",
                params: {
                  search: search,
                },
              }),
          },
          {
            $formkit: "vue-select",
            name: "icd10",
            errors:
              (this.errors.diagnosis && this.errors.diagnosis.icd10_id) || [],
            vuelabel: "label_locale",
            searchable: true,
            filterable: false,
            label: t("pemeriksaan.form.diagnosis_icd10"),
            options: this.options.icd10,
            "@search": (search, loading) =>
              this.handleSearch(loading, {
                url: "/api/administrasi/icd10",
                field: "icd10",
                params: {
                  search: search,
                },
              }),
          },
        ],
      },
      {
        $formkit: "vue-loading-button",
        block: true,
        buttonType: "submit",
        loading: this.isSaving,
        variant: "primary",
        label: t("pemeriksaan.form.submit"),
      },
    ];
  });
};
