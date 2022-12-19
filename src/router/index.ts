import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useLayout, dashboardLayout, emptyLayout } from "../layout/layout";


//import Chart from "../views/ChartView.vue";
const HomePage = "/dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: HomePage,
  },
  {
    path: "/user",
    redirect:"/user/login",
    component: () => import("@/layout/Empty.vue"),
    children: [{
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    }]

  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: 
      () => import("../views/admin/Dashboard.vue")
  },

  {
    path: "/pasien",
    redirect: "/pasien/index",
    component: () => import("@/layout/Dashboard.vue"), 
    children: [
      {
        path: "index",
        name: "PasienIndex",
        component:  () => import("@/views/admin/pasien/index.vue"),
        children: [
          {
            path:"delete/:id",
            component: import("@/views/admin/pasien/delete.vue")
          }
        ]
      },
      {
        path: "create",
        name: "PasienCreate",
        component:  () => import("@/views/admin/pasien/create.vue")
      },
      {
        path: "edit/:id",
        name: "PasienEdit",
        component:  () => import("@/views/admin/pasien/edit.vue")
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name:"NotFound",
    components: useLayout(emptyLayout, () => import("../views/NotFound.vue")),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASEURL || "/"),
  routes,
});

router.beforeEach((to, from, next) => {
  let publicPages = ["/login"];
  let guestOnlyPages = ["/login"];
  let authRequired = !publicPages.includes(to.path);
  let guestRequired = guestOnlyPages.includes(to.path);

  const loggedIn = localStorage.getItem("auth");

  if (authRequired && !loggedIn) {
    next("/login");
  }
  if (guestRequired && loggedIn) {
    next("/dashboard");
  } else {
    next();
  }
});
export default router;
