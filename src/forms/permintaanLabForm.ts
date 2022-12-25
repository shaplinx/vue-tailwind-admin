import baseForm from "@/base/form"
import hasStatus from "@/base/form/extends/hasStatus";
export default {
  mixins: [baseForm, hasStatus],
  data() {
    return {
      options: {
        laborat: [],
        pemeriksaan_labs: []
      },
    }
  },
  computed: {
    formSchema() {
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
          $formkit: "vue-select",
          name: "laborat",
          errors: this.errors.laborat_id || [],
          vuelabel: "fullname",
          searchable: true,
          filterable: false,
          label: t("permintaanLab.form.laborat"),
          options: this.options.laborat,
          "@search": (search, loading) =>
            this.handleSearch(loading, {
              url: "/api/administrasi/pegawai",
              field: "laborat",
              params: {
                search: search,
                role: 'Laborat'
              },
            }),
        },
        {
          $formkit: "vue-select",
          name: "pemeriksaan_labs",
          errors: this.errors.pemeriksaan_labs || [],
          vuelabel: "nama",
          searchable: true,
          filterable: false,
          multiple: true,
          label: t("permintaanLab.form.pemeriksaan_labs"),
          options: this.options.pemeriksaan_labs,
          "@search": (search, loading) =>
            this.handleSearch(loading, {
              url: "/api/fasilitas/lab/pemeriksaan",
              field: "pemeriksaan_labs",
              params: {
                search: search,
              },
            }),

        },
        this.statusField,
        {
          "type": "group",
          "name": "hasil_labs",
          "repeatable": false,
          groupRepeatableClass:"row",
          label: t("permintaanLab.form.hasil_lab"),
          "children": [
            {
              $formkit: "vue-select",
              name: "pemeriksaan_lab",
              vuelabel: "nama",
              disabled: true,
              outerClass:"col-md-4",
              label: t("permintaanLab.form.hasil_pemeriksaan_lab"),
            },
            {
              $formkit: "vue-select",
              name: "komponen_lab",
              vuelabel: "nama",
              disabled: true,
              outerClass:"col-md-4",
              label: t("permintaanLab.form.hasil_komponen_lab"),

            },
            {
              $formkit: "text",
              name: "hasil",
              outerClass:"col-md-4",
              inputClass:"form-control",
              label: t("permintaanLab.form.hasil_hasil_lab"),
              help: t("permintaanLab.form.hasil_hasil_lab_help"),

            },
          ]
        },
        {
          $formkit: "vue-loading-button",
          block: true,
          buttonType: "submit",
          loading: this.isSaving,
          variant: "primary",
          label: t("permintaanLab.form.submit"),
        },
      ];
    },
  }
}
