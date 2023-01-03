import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";
import { currency } from "@/services/dinero/dinero";

export const defineRekeningSchema = ({
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
        $formkit: "number",
        name: "amount",
        "sections-schema": {
          prefix: currency(),
        },
        label: t("rekening.form.amount"),
        help: t("rekening.form.amount_help"),
      },
      {
        $formkit: "text",
        name: "description",
        label: t('rekening.form.description'),
      },
      {
        $formkit: "toggle",
        size:"lg",
        color:"primary",
        name: "active",
        label: t("rekening.form.active"),
      },
    ];
};

