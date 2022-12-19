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
import theme from "./theme";

const formkitConfig = defaultConfig({
  config: {
    classes: generateClasses(theme),
  },
  inputs: {
    customGroup: {
      type: "group",
      component: CustomGroup,
    },
    vRepeater: {
      type: "list",
      component: Repeater,
    },
    vSelect: createInput(vSelect),
    vButton: {
      type: "input",
      component: VButtonVue,
    },
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
