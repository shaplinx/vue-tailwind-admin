import { FormKitSchemaNode } from "@formkit/core";

export const defineSuratSakitSchema = ({
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
      label:t("suratSakit.form.ref_number")
    },
    {
      $formkit: "hidden",
      name: "pertemuan_id",
    },
    {
      $formkit: "datepicker",
      name: "dari",
      "enable-time-picker":false,
      label:t("suratSakit.form.dari")
    },
    {
      $formkit: "datepicker",
      name: "sampai",
      "enable-time-picker":false,
      label:t("suratSakit.form.sampai")
    }
  ];
};

