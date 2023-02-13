import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { computed } from "vue";

export const definePermintaanLabSchema = ({
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
        $formkit: "text",
        name: "ref_number",
        readOnly:true,
        label:t("permintaanLab.form.ref_number")
      },
      {
        $formkit: "vSelect",
        name: "laborat",
        displayLabel: "fullname",
        label: t("permintaanLab.form.laborat"),
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
              params: { search, role: "Laborat" },
            })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "vSelect",
        name: "pemeriksaan_labs",
        displayLabel: "nama",
        label: t("permintaanLab.form.pemeriksaan_labs"),
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
            .get("/fasilitas/lab/pemeriksaan", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "status",
        name: "status",
        label: t("permintaanLab.form.status"),
      },
      {
        $formkit: "vRepeater",
        name: "hasil_labs",
        repeatable:false,
        label: t("permintaanLab.form.hasil_lab"),
        children: [
          {
            $el: "div",
            attrs: {
              class: "grid grid-cols-3 gap-2",
            },
            children: [
              {
                $formkit: "vSelect",
                name: "pemeriksaan_lab",
                displayLabel: "nama",
                label: t("permintaanLab.form.hasil_pemeriksaan_lab"),
                object: true,
                valueProp: "id",
                disabled: true,
              },
              {
                $formkit: "vSelect",
                name: "komponen_lab",
                displayLabel: "nama",
                label: t("permintaanLab.form.hasil_komponen_lab"),
                object: true,
                valueProp: "id",
                disabled: true,
              },
              {
                $formkit: "text",
                name: "hasil",
                label: t("permintaanLab.form.hasil_hasil_lab"),
                help: t("permintaanLab.form.hasil_hasil_lab_help"),
              },
            ],
          },
        ],
      },
    ];
  });
};
