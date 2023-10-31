import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { 
    path: '/', 
    component: ()=> import("./view/Home.vue"),
  },

  { 
    path: '/about',  
    component: ()=> import("./view/About.vue"),
    children: [
      {
        path: "/about/child",
        component: () => import("./view/Child.vue")
      },
      {
        path: "/about/child2",
        component: () => import("./view/Child.vue")
      },
    ]
  },
]

export default  createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, 
})