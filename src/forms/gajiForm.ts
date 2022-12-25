import baseForm from "@/base/form"
import hasStatus from "@/base/form/extends/hasStatus";
export default {
  mixins: [baseForm, hasStatus],
  data() {
    return {
      options: {
        user: [],
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
          $formkit: "vue-select",
          name: "user",
          errors: this.errors.user_id || [],
          vuelabel: "fullname",
          searchable: true,
          filterable: false,
          label: t("gaji.form.user"),
          options: this.options.user,
          "@search": (search, loading) =>
            this.handleSearch(loading, {
              url: "/api/administrasi/pegawai",
              field: "user",
              params: {
                search: search,
              },
            }),
        },
        this.statusField,
        {
          $formkit: "vue-datetime",
          datetype: "date",
          name: "start_date",
          help:  t("gaji.form.start_date_help"),
          label: t("gaji.form.start_date"),
        },
        {
          $formkit: "vue-datetime",
          datetype: "date",
          name: "end_date",
          help:  t("gaji.form.end_date_help"),
          label: t("gaji.form.end_date"),
        },

        {
          "type": "group",
          "name": "custom_gaji_contents",
          "repeatable": true,
          label: t("gaji.form.customGaji"),
          "add-label": `+ ${t("menu.add-new")}`,
          "children": [

            {
              "type": "text",
              "name": "deskripsi",
              label: t("gaji.form.deskripsi"),
            },
            {
              $formkit: "inputGroup",
              inputType: "number",
              prepend: "Rp.",
              name: "harga",
              label: t("gaji.form.harga"),
            },
          ]
        },
        {
          component: 'div',
          class: 'row',
          children: [
            {
              component: 'div',
              class: "col-md-4 col-sm-12",
              children: [
                {
                  $formkit: "inputGroup",
                  inputType: "number",
                  prepend: "Rp.",
                  name: "totalJasa",
                  disabled: true,
                  label: t("gaji.form.totalJasa"),
                },
              ]
            },
            {
              component: 'div',
              class: "col-md-4 col-sm-12",
              children: [
                {
                  $formkit: "inputGroup",
                  inputType: "number",
                  prepend: "Rp.",
                  name: "totalCustomGaji",
                  disabled: true,
                  label: t("gaji.form.totalCustomGaji"),
                },
              ]
            },
            {
              component: 'div',
              class: "col-md-4 col-s-12",
              children: [
                {
                  $formkit: "inputGroup",
                  inputType: "number",
                  prepend: "Rp.",
                  name: "totalGaji",
                  disabled: true,
                  label: t("gaji.form.totalGaji"),
                },
              ]
            }
          ]
        },

        {
          $formkit: "vue-loading-button",
          block: true,
          buttonType: "submit",
          loading: this.isSaving,
          variant: "primary",
          label: t("gaji.form.submit"),
        },
      ];
    },
  }
}
