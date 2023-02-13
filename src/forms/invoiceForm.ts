import { FormKitSchemaNode } from "@formkit/core";
import http from "@/services/api/base";

export const defineInvoiceSchema = ({
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
      label:t("invoice.form.ref_number")
    },
    {
      $formkit: "hidden",
      name: "pertemuan_id",
    },
    {
      $formkit: "status",
      name: "status",
      label: t("invoice.form.status"),
    },
    {
      if:formData?.invoice_contents?.length,
      $formkit: 'invoiceTable',
      name:'invoice_contents',
      title:t("menu.invoice"),
    },
  ];
};

