import { library } from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";


import { Plugin } from "vue";
import {
  IconPack,
  IconDefinition,
} from "@fortawesome/fontawesome-common-types";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface FaPluginOptions {
  iconPacks: IconPack[];
  icons: IconDefinition[];
}
export default {
  install: (
    app: any,
    options: FaPluginOptions = { iconPacks: [fas,far], icons: [] }
  ) => {
    library.add(...options.iconPacks, ...options.icons);
    app.component("fa", FontAwesomeIcon);
  },
} as Plugin;