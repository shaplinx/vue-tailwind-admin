import { FormKitSchemaNode } from "@formkit/core";

export const defineIcd10Schema = ({
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
      name: "code",
      label: t("icd10.form.code"),
    },
    {
      $formkit: "text",
      name: "name_en",
      help: t("icd10.form.name_en_help"),
      label: t("icd10.form.name_en"),
    },
    {
      $formkit: "text",
      name: "name_locale",
      help: t("icd10.form.name_locale_help"),
      label: t("icd10.form.name_locale"),
    },
  ];
};
