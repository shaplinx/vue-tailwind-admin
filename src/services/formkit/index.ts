import {
  plugin as formkitPlugin,
  defaultConfig,
  createInput,
} from "@formkit/vue";
import Repeater from "./plugins/repeater/Repeater.vue";
import CustomGroup from "./plugins/repeater/CustomGroup.vue";
import { createAutoAnimatePlugin } from "@formkit/addons";
import vSelect from "./plugins/vueselect/VueSelect.vue";
import VButtonVue from "./plugins/vbutton/VButton.vue";
import RadioButton from "./plugins/radiobutton/RadioButton.vue";
import VueDatepickerVue from "./plugins/vue-datepicker/VueDatepicker.vue";
import { markRaw } from "vue";
import { generateClasses } from "@formkit/themes";
import Status from "./plugins/status/Status.vue";
import Toggle from "./plugins/toggle/Toggle.vue";
import theme from "./theme";
import { repeater } from "./plugins/vRepeater";
import InvoiceTable from "./plugins/invoice-table/InvoiceTable.vue";
import AutoSuggest from "./plugins/autosuggest/AutoSuggest.vue";
import ColorBlind from "./plugins/colorBlind/ColorBlind.vue"

const formkitConfig = defaultConfig({
  config: {
    classes: generateClasses(theme),
  },
  inputs: {
    customGroup: {
      type: "group",
      component: CustomGroup,
    },
    invoiceTable: createInput(InvoiceTable, { props: ["title"] }),
    vRepeater: repeater,
    vRepeater2: {
      type: "list",
      component: Repeater,
    },
    vSelect: createInput(vSelect),
    autoSuggest: createInput(AutoSuggest, { props: ["onSearch"] }),
    vButton: {
      type: "input",
      component: VButtonVue,
    },
    status: createInput(Status),
    colorBlind: createInput(ColorBlind),
    toggle: createInput(Toggle),
    datepicker: createInput(VueDatepickerVue),
    radioButton: {
      type: "input",
      library: {
        rb: markRaw(RadioButton),
      },
      schema: [
        {
          $el: "label",
          if: "$label",
          attrs: {
            class: "$classes.label",
          },
          children: "$label",
        },
        {
          $cmp: "rb",
          props: {
            context: "$node.context",
          },
        },
        {
          $el: "div",
          if: "$help",
          attrs: {
            class: "$classes.help",
          },
          children: "$help",
        },
        {
          $el: "ul",
          attrs: {
            class: "$classes.messages",
          },
          children: [
            {
              $el: "li",
              for: ["message", "$messages"],
              attrs: {
                class: "$classes.message",
              },
              children: "$message.value",
            },
          ],
        },
      ],
    },
  },
  plugins: [createAutoAnimatePlugin()],
});

export { formkitPlugin, formkitConfig };
