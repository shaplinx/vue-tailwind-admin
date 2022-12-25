import { FormKitSchemaNode } from '@formkit/core';
export const defineFilterSchema = ({ t }: { t: any }) : FormKitSchemaNode[] => {
    return [
      {
        $formkit: "search",
        placeholder: t("formkit.searchPlaceholder"),
        name: "search",
        delay: 400,
        label: t("formkit.searchLabel"),
        "label-class": "$reset text-sm",
        "outer-class":"mb-0",
        "inner-class": "bg-base-100 text-sm",
        "wrapper-class": "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
        "suffix-icon": "search",
      },
      {
        $formkit: "date",
        label: t("formkit.date_start"),
        name: "date_start",
        "outer-class":"mb-0",
        "label-class": "$reset text-sm",
        "wrapper-class": "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
        "inner-class": "bg-base-100 text-sm text-base-content w-full sm:w-auto",
      },
      {
        $formkit: "date",
        label: t("formkit.date_end"),
        name: "date_end",
        "outer-class":"mb-0",
        "wrapper-class": "max-sm:flex max-sm:flex-row max-sm:gap-2 max-sm:items-center",
        "label-class": "$reset text-sm",
        "inner-class": "bg-base-100 text-sm w-full sm:w-auto",
      },
    ];
};
