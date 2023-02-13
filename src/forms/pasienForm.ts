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
        $formkit: "text",
        label: t("pasien.form.nama_lengkap"),
        name: "nama_lengkap",
      },
      {
        $formkit: "text",
        name: "no_id",
        label: t("pasien.form.no_id"),
      },
      {
        $formkit: "select",
        name: "kelamin",
        options: [
          {
            value: null,
            label: t("formkit.selectPlaceholder"),
            selected: true,
          },
          { value: "L", label: t("pasien.form.L") },
          { value: "P", label: t("pasien.form.P") },
        ],
        label: t("pasien.form.kelamin"),
      },
      {
        $formkit: "vSelect",
        name: "tmp_lahir",
        label: t("pasien.form.tmp_lahir_id"),
        displayLabel: "name",
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
            .get("/indonesia/kabupaten", { params: { search } })
            .then((res) => res.data.data)
            .catch(() => []);
        },
      },
      {
        $formkit: "date",
        name: "tgl_lahir",
        label: t("pasien.form.tgl_lahir"),
      },
      {
        $formkit: "text",
        name: "alamat",
        label: t("pasien.form.alamat"),
      },

      {
        $formkit: "vSelect",
        name: "alamat_idn",
        label: t("pasien.form.alamat_id"),
        help: t("pasien.form.alamat_idHelp"),
        displayLabel: "AlamatLengkap",
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
            .get("/indonesia/desa", { params: { search } })
            .then((res) => res.data.data);
        },
      },
      {
        $formkit: "text",
        label: t("pasien.form.hp"),
        name: "hp",
      },
      {
        $el: "div",
        attrs: {
          class: "grid grid-cols-2 gap-4",
        },
        children: [
          {
            $formkit: "text",
            label: t("pasien.form.pekerjaan"),
            name: "pekerjaan",
          },
          {
            $formkit: "select",
            label: t("pasien.form.goldar"),
            name: "goldar",
            options: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          },
        ],
      },
    ];
  });
};
