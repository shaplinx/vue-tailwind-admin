import { FormKitSchemaNode } from "@formkit/core";
import { currency } from "@/services/dinero/dinero";

export const defineObatSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}): FormKitSchemaNode[] => {
  return [
    {
      $formkit: "hidden",
      name: "id",
    },
    {
      $formkit: "text",
      name: "nama",
      label: t("obat.form.nama"),
    },
    {
      $formkit: "text",
      name: "pabrik",
      help: t("obat.form.pabrik_help"),
      label: t("obat.form.pabrik"),
    },
    {
      $formkit: "text",
      name: "sediaan",
      help: t("obat.form.sediaan_help"),
      label: t("obat.form.sediaan"),
    },
    {
      $formkit: "text",
      name: "kemasan",
      help: t("obat.form.kemasan_help"),
      label: t("obat.form.kemasan"),
    },
    {
      $el: "div",
      attrs: {
        class: "grid grid-cols-2 gap-2",
      },
      children: [
        {
          $formkit: "number",
          "sections-schema": {
            prefix: currency(),
          },
          name: "harga_jual",
          label: t("obat.form.harga_jual"),
        },
        {
          $formkit: "number",
          "sections-schema": {
            prefix: currency(),
          },
          name: "harga_beli",
          label: t("obat.form.harga_beli"),
        },
      ],
    },
    {
      $el: "div",
      attrs: {
        class: "grid grid-cols-2 gap-2",
      },
      children: [
        {
          $formkit: "number",
          name: "stock",
          label: t("obat.form.stock"),
        },
        {
          $formkit: "number",
          name: "alert_stock",
          label: t("obat.form.alert_stock"),
          help: t("obat.form.alert_stock_help"),
        },
      ],
    },
  ];
};
