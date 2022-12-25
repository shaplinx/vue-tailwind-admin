import baseForm from "@/base/form"
import hasStatus from "@/base/form/extends/hasStatus";
export default {
  mixins: [baseForm, hasStatus],
  data() {
    return {
      options: {
        farmasis: [],
        obat:[],
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
          name: "farmasis",
          errors: this.errors.farmasis_id || [],
          vuelabel: "fullname",
          searchable: true,
          filterable: false,
          label: t("resep.form.farmasis"),
          options: this.options.farmasis,
          "@search": (search, loading) =>
            this.handleSearch(loading, {
              url: "/api/administrasi/pegawai",
              field: "farmasis",
              params: {
                search: search,
                role: 'Farmasis'
              },
            }),
        },
        this.statusField,
        {
          "type": "group",
          "name": "resep_contents",
          "repeatable": true,
          errors: this.errors.resep_contents || [],
          label: t("resep.form.resep_contents"),
          "add-label": `+ ${t("menu.add-new")}`,
          "children": [
            {
              $formkit: "vue-select",
              name: "obat",
              vuelabel: "label",
              searchable: true,
              filterable: false,
              label: t("resep.form.resep_contents_obat"),
              options: this.options.obat,
              "@search": (search, loading) =>
                this.handleSearch(loading, {
                  url: "/api/fasilitas/farmasi/obat",
                  field: "obat",
                  params: {
                    search: search,
                  },
                }),
            },
            {
              $formkit: "number",
              name: "jumlah",
              label:t('resep.form.resep_contents_jumlah'),
            },
            {
              $formkit: "text",
              name: "aturan_pakai",
              label:t('resep.form.resep_contents_aturan_pakai'),
            },
          ]
        },
        {
          $formkit: "vue-loading-button",
          block: true,
          buttonType: "submit",
          loading: this.isSaving,
          variant: "primary",
          label: t("resep.form.submit"),
        },
      ];
    },
  }
}
