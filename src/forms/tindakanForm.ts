import { computed } from "vue";
import { currency } from "@/services/dinero/dinero";
import { decimalToPrecent } from "@/hooks/misc";

export const defineTindakanSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}) => {
  return computed(() => {
    return [
      {
        $formkit: "hidden",
        name: "id",
      },
      {
        $formkit: "text",
        name: "nama",
        label: t("tindakan.form.nama"),
      },
      {
        $formkit: "number",
        name: "harga_jual",
        "sections-schema": {
          prefix: currency(),
        },
        label: t("tindakan.form.harga_jual"),
      },
      {
        $formkit: "number",
        "sections-schema": {
          prefix: currency(),
        },
        name: "jasa",
        label: t("tindakan.form.jasa"),
      },
      {
        $formkit: "status",
        name: "status",
        label: t("tindakan.form.jasa"),
      },
      {
        $formkit: "range",
        min: 0,
        step: 0.05,
        max: 1,
        name: "bagian_operator",
        label: t("tindakan.form.bagian_operator"),
        help: t("tindakan.form.bagian_operator_help"),
      },
      {
        $el: "div",
        attrs: {
          class: "flex justify-center -mt-3 mb-3",
        },
        children: [
          {
            $cmp: "dv-badge",
            props: {
              type: "primary",
            },
            children: decimalToPrecent(formData.value.bagian_operator),
          },
        ],
      },
    ];
  });
};
