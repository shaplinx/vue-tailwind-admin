import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base"


export const defineKategoriLabSchema = ({
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
        label: t("kategoriLab.form.nama"),
      },
      {
        $formkit: "text",
        name: "kode",
        help:t('kategoriLab.form.kode_help'),
        label: t("kategoriLab.form.kode"),
      },
    ];
};

