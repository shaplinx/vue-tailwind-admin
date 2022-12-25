import baseForm from "@/base/form"
import hasStatus from "@/base/form/extends/hasStatus";
export default {
  mixins: [baseForm, hasStatus],
  data() {
    return {
      options: {
        tindakan: [],
        operator:[],
        asisten:[],


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
        this.statusField,
        {
          "type": "group",
          "name": "tindakan_contents",
          "repeatable": true,
          errors: this.errors.tindakan_contents || [],
          label: t("pertemuanTindakan.form.tindakan_contents"),
          "add-label": `+ ${t("menu.add-new")}`,
          "children": [
            {
              $formkit: "vue-select",
              name: "tindakan",
              vuelabel: "nama",
              searchable: true,
              filterable: false,
              label: t("pertemuanTindakan.form.tindakan_contents_tindakan"),
              options: this.options.tindakan,
              "@search": (search, loading) =>
                this.handleSearch(loading, {
                  url: "/api/administrasi/tindakan",
                  field: "tindakan",
                  params: {
                    search: search,
                  },
                }),
            },
            {
              $formkit: "vue-select",
              name: "operator",
              vuelabel: "fullname",
              searchable: true,
              filterable: false,
              label: t("pertemuanTindakan.form.tindakan_contents_operator"),
              options: this.options.operator,
              "@search": (search, loading) =>
                this.handleSearch(loading, {
                  url: "/api/administrasi/pegawai",
                  field: "operator",
                  params: {
                    search: search,
                  },
                }),
            },
            {
              $formkit: "vue-select",
              name: "asisten",
              vuelabel: "fullname",
              searchable: true,
              filterable: false,
              label: t("pertemuanTindakan.form.tindakan_contents_asisten"),
              options: this.options.asisten,
              "@search": (search, loading) =>
                this.handleSearch(loading, {
                  url: "/api/administrasi/pegawai",
                  field: "asisten",
                  params: {
                    search: search,
                  },
                }),
            },
            {
              $formkit: "number",
              name: "jumlah",
              label:t('pertemuanTindakan.form.tindakan_contents_jumlah'),
            },
          ]
        },
        {
          $formkit: "vue-loading-button",
          block: true,
          buttonType: "submit",
          loading: this.isSaving,
          variant: "primary",
          label: t("pertemuanTindakan.form.submit"),
        },
      ];
    },
  }
}
