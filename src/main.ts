import { createApp } from "vue";
import "./assets/sass/assets.scss";
import App from "./App.vue";
import router from "./router";
import PerfectScrollbar from "vue3-perfect-scrollbar";
import Vue3Transitions from "vue3-transitions";
import Vue3EasyDataTable from "vue3-easy-data-table";
import { formkitPlugin, formkitConfig } from "@/services/formkit/index";
import i18n from "./services/lang/i18n";
import Toast from "vue-toastification";
import Ripple from "@/services/ripple/ripple";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import fontawesome from "./services/icons/FontAwesome/index";
import daisyuiVue from "daisyui-vue";
import floatingVue from "floating-vue";
import {vfmPlugin} from 'vue-final-modal';
import Dashboard from "./layout/Dashboard.vue";
import Empty from "./layout/Empty.vue";

const app = createApp(App);
const pinia = createPinia();
app
  .component("DataTable", Vue3EasyDataTable)
  .component("DashboardLayout",Dashboard)
  .component("EmptyLayout",Empty)
  .directive("ripple", Ripple)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(vfmPlugin)
  .use(floatingVue)
  .use(daisyuiVue)
  .use(PerfectScrollbar)
  .use(Vue3Transitions)
  .use(formkitPlugin, formkitConfig)
  .use(Toast)
  .use(fontawesome)
  .use(autoAnimatePlugin)
  .mount("#app");
