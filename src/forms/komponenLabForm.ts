import { FormKitSchemaNode } from "@formkit/core";


export const defineKomponenLabSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}) :FormKitSchemaNode[]  => {
    return [
      {
        $formkit: "hidden",
        name: "id",
      },
      {
        $formkit: "text",
        name: "nama",
        label: t("komponenLab.form.nama"),
      },
      {
        $formkit: "text",
        name: "kode",
        help:t('komponenLab.form.kode_help'),
        label: t("komponenLab.form.kode"),
      },
      {
        $formkit: "text",
        name: "satuan",
        help:t('komponenLab.form.satuan_help'),
        label: t("komponenLab.form.satuan"),
      },
      {
        $formkit: "textarea",
        name: "nilai_rujukan",
        label: t("komponenLab.form.nilai_rujukan"),
      },
      {
        $formkit: "number",
        name: "stock",
        label: t("komponenLab.form.stock"),
      },
      {
        $formkit: "number",
        name: "alert_stock",
        label: t("komponenLab.form.alert_stock"),
        help: t("komponenLab.form.alert_stock_help"),
      },

    ];
};

