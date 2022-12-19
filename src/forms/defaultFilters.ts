import { FormKitSchemaNode } from '@formkit/core';
export const defineFilterSchema = ({ t }: { t: any }) : FormKitSchemaNode[] => {
    return [
      {
        $formkit: "search",
        placeholder: t("formkit.searchPlaceholder"),
        name: "search",
        delay: 400,
        "outer-class":"mb-0",
        "inner-class": "bg-base-100 text-sm",
        "suffix-icon": "search",
      },
      {
        $formkit: "date",
        label: t("formkit.date_start"),
        name: "date_start",
        "outer-class":"mb-0",
        "wrapper-class": "flex flex-row gap-2 items-center",
        "label-class": "$reset text-sm",
        "inner-class": "bg-base-100 text-sm text-base-content w-full sm:w-auto",
      },
      {
        $formkit: "date",
        label: t("formkit.date_end"),
        name: "date_end",
        "outer-class":"mb-0",
        "wrapper-class": "flex flex-row gap-2 items-center",
        "label-class": "$reset text-sm",
        "inner-class": "bg-base-100 text-sm w-full sm:w-auto",
      },
    ];
};
