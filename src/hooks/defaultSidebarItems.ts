import { MenuSchema } from "./../components/sidebar/types.d";
import { ref } from "vue";

const defaultSidebarItems: MenuSchema = {
  GENERAL: [
    {
      routeName: "Dashboard",
      iconClass: "home",
      label: "Dashboard",
    },
  ],

  UI: [
    {
      label: "Components",
      iconClass: "tv",
      childs: [
        {
          routeName: "Cards",
          iconClass: "id-card",
          label: "Cards",
        },
        {
          routeName: "Forms",
          label: "Forms",
          iconClass: "list-ul",
        },
        {
          routeName: "Buttons",
          iconClass: "ad",
          label: "Buttons",
        },
        {
          routeName: "Badges",
          iconClass: "id-badge",
          label: "Badges",
        },
        {
          routeName: "Tooltips",
          iconClass: "comment-dots",
          label: "Tooltips",
        },
        {
          routeName: "Tables",
          iconClass: "table",
          label: "Tables",
        },
        {
          routeName: "Dropdowns",
          iconClass: "square-caret-down",
          label: "Dropdowns",
        },
      ],
    },
  ],
  MAIN: [
    {
      routeName: "PasienIndex",
      iconClass: "home",
      label: "Pasien",
    },
  ],
};

export default ref(defaultSidebarItems);
