import { RouteComponent } from "vue-router";
import {defineComponent} from 'vue'


type Layout = {
  [key: string]: RouteComponent | Promise<RouteComponent>;
};

const defaultComponent = defineComponent({
  template: `<router-view></router-view>`
})

export function useLayout(
  layout: Layout = {},
  component: RouteComponent | Promise<RouteComponent> | undefined = undefined
): Layout {
  return Object.assign(layout, { default: component ?? defaultComponent });
}

export const dashboardLayout: Layout = {
  SideBar: () => import("@/components/navs/SideBar.vue"),
  TopBar: () => import("@/components/navs/TopBar.vue"),
  Header: () => import("@/components/partials/Header.vue"),
  Footer: () => import("@/components/partials/Footer.vue"),
};

export const emptyLayout: Layout = {};
