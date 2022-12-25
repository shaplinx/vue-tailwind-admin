import { FormKitSchemaNode } from "@formkit/core";

export const defineTindakanSchema = ({
  t,
  formData = undefined,
}: {
  t: any;
  formData: any | undefined;
}) : FormKitSchemaNode[] => {
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
        prefix: 'Rp',
        label: t("tindakan.form.harga_jual"),
      },
      {
        $formkit: "number",
        prefix: 'Rp',
        name: "jasa",
        label: t("tindakan.form.jasa"),
      },
      {
        $formkit: "slider",
        min:0,
        interval:0.05,
        max:1,
        name: "bagian_operator",
        label: t("tindakan.form.bagian_operator"),
        help: t("tindakan.form.bagian_operator_help"),
      },
    ];
};


