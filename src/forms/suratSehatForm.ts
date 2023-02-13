import { FormKitSchemaNode } from "@formkit/core";


export const defineSuratSehatSchema = ({
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
      name: "ref_number",
      readOnly:true,
      label:t("suratSehat.form.ref_number")
    },
    {
      $formkit: "hidden",
      name: "pertemuan_id",
    },

    {
      $formkit: "text",
      name: "keperluan",
      label:t("suratSehat.form.keperluan")
    }
  ];
};

