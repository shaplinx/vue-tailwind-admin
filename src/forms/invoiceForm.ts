import baseForm from "@/base/form"
import hasStatus from "@/base/form/extends/hasStatus";
export default {
  mixins: [baseForm, hasStatus],
  data() {
    return {
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
          $formkit'invoice-card',
          name:'invoice_contents',
          title:t("menu.tagihan"),
        },
        {
          $formkit: "vue-loading-button",
          block: true,
          buttonType: "submit",
          loading: this.isSaving,
          variant: "primary",
          label: t("tagihan.form.submit"),
        },
      ];
    },
  }
}
