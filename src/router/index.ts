import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import RouterView from "@/components/RouterView.vue";

//import Chart from "../views/ChartView.vue";
const HomePage = "/admin/dashboard";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: HomePage,
  },
  {
    path: "/user",
    redirect: "/user/login",
    component: () => import("@/layout/Empty.vue"),
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("../views/Login.vue"),
      },
    ],
  },

  {
    path: "/admin",
    name: "AdminRoot",
    redirect: "/admin/dashboard",
    component: () => import("@/layout/Dashboard.vue"),
    children: [
      {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },

      {
        path: "/admin/pasien",
        redirect: "/admin/pasien/index",
        component: RouterView,
        children: [
          {
            path: "index",
            name: "PasienIndex",
            component: () => import("@/views/admin/pasien/index.vue"),
          },
          {
            path: "create",
            name: "PasienCreate",
            component: () => import("@/views/admin/pasien/create.vue"),
          },
          {
            path: "edit/:id",
            name: "PasienEdit",
            component: () => import("@/views/admin/pasien/edit.vue"),
          },
        ],
      },
      {
        path: "/admin/pertemuan",
        redirect: "/admin/pertemuan/index",
        component: RouterView,
        children: [
          {
            path: "index",
            name: "PertemuanIndex",
            component: () => import("@/views/admin/pertemuan/index.vue"),
          },
          {
            path: "create/:pasienId?",
            name: "PertemuanCreate",
            component: () => import("@/views/admin/pertemuan/create.vue"),
          },
          {
            path: "edit/:id",
            name: "PertemuanEdit",
            component: () => import("@/views/admin/pertemuan/edit.vue"),
          },
          {
            path: "forms/:pages?",
            name: "forms",
            component: () => import("@/views/admin/pertemuan/forms/Index.vue"),
            beforeEnter: (to, from, next) => {
              if (
                [
                  "PemeriksaanForm",
                  "ResepForm",
                  "InvoiceForm",
                  "LabForm",
                  "TindakanForm",
                ].includes(to.name as string)
              ) {
                return next();
              }
              if (typeof to.params.pages !== "string") {
                return next({ name: "NotFound" });
              }
              let allowedPageParam = [
                "pemeriksaan",
                "resep",
                "lab",
                "tindakan",
                "invoice",
                "",
              ];
              return allowedPageParam.includes(to.params.pages as string)
                ? next()
                : next({ name: "NotFound" });
            },
            children: [
              {
                path: "pemeriksaan/:id",
                name: "PemeriksaanForm",
                component: () =>
                  import("@/views/admin/pertemuan/forms/Pemeriksaan.vue"),
              },
              {
                path: "resep/:id",
                name: "ResepForm",
                component: () =>
                  import("@/views/admin/pertemuan/forms/Resep.vue"),
              },
              {
                path: "lab/:id",
                name: "LabForm",
                component: () =>
                  import("@/views/admin/pertemuan/forms/Lab.vue"),
              },
              {
                path: "tindakan/:id",
                name: "TindakanForm",
                component: () =>
                  import("@/views/admin/pertemuan/forms/Tindakan.vue"),
              },
              {
                path: "invoice/:id",
                name: "InvoiceForm",
                component: () =>
                  import("@/views/admin/pertemuan/forms/Invoice.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/admin/administrasi",
        redirect: "/admin/administrasi/diagnosis",
        component: RouterView,
        children: [
          {
            path: "diagnosis",
            redirect: "/admin/administrasi/diagnosis/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "DiagnosisIndex",
                component: () =>
                  import("@/views/admin/administrasi/diagnosis/index.vue"),
              },
              {
                path: "create",
                name: "DiagnosisCreate",
                component: () =>
                  import("@/views/admin/administrasi/diagnosis/create.vue"),
              },
              {
                path: "edit/:id",
                name: "DiagnosisEdit",
                component: () =>
                  import("@/views/admin/administrasi/diagnosis/edit.vue"),
              },
            ],
          },
          {
            path: "icd10",
            redirect: "/admin/administrasi/icd10/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "Icd10Index",
                component: () =>
                  import("@/views/admin/administrasi/icd10/index.vue"),
              },
              {
                path: "create",
                name: "Icd10Create",
                component: () =>
                  import("@/views/admin/administrasi/icd10/create.vue"),
              },
              {
                path: "edit/:id",
                name: "Icd10Edit",
                component: () =>
                  import("@/views/admin/administrasi/icd10/edit.vue"),
              },
            ],
          },
          {
            path: "pegawai",
            redirect: "/admin/administrasi/pegawai/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "PegawaiIndex",
                component: () =>
                  import("@/views/admin/administrasi/pegawai/index.vue"),
              },
              {
                path: "create",
                name: "PegawaiCreate",
                component: () =>
                  import("@/views/admin/administrasi/pegawai/create.vue"),
              },
              {
                path: "edit/:id",
                name: "PegawaiEdit",
                component: () =>
                  import("@/views/admin/administrasi/pegawai/edit.vue"),
              },
            ],
          },
          {
            path: "gaji",
            redirect: "/admin/administrasi/gaji/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "GajiIndex",
                component: () =>
                  import("@/views/admin/administrasi/gaji/index.vue"),
              },
              {
                path: "create",
                name: "GajiCreate",
                component: () =>
                  import("@/views/admin/administrasi/gaji/create.vue"),
              },
              {
                path: "edit/:id",
                name: "GajiEdit",
                component: () =>
                  import("@/views/admin/administrasi/gaji/edit.vue"),
              },
            ],
          },
          {
            path: "rekening",
            redirect: "/admin/administrasi/rekening/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "RekeningIndex",
                component: () =>
                  import("@/views/admin/administrasi/rekening/index.vue"),
              },
              {
                path: "create",
                name: "RekeningCreate",
                component: () =>
                  import("@/views/admin/administrasi/rekening/create.vue"),
              },
              {
                path: "edit/:id",
                name: "RekeningEdit",
                component: () =>
                  import("@/views/admin/administrasi/rekening/edit.vue"),
              },
            ],
          },
          {
            path: "tindakan",
            redirect: "/admin/administrasi/tindakan/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "TindakanIndex",
                component: () =>
                  import("@/views/admin/administrasi/tindakan/index.vue"),
              },
              {
                path: "create",
                name: "TindakanCreate",
                component: () =>
                  import("@/views/admin/administrasi/tindakan/create.vue"),
              },
              {
                path: "edit/:id",
                name: "TindakanEdit",
                component: () =>
                  import("@/views/admin/administrasi/tindakan/edit.vue"),
              },
            ],
          },
          {
            path: "profesi",
            redirect: "/admin/administrasi/profesi/index",
            component: () => import("@/views/admin/administrasi/index.vue"),
            children: [
              {
                path: "index",
                name: "ProfesiIndex",
                component: () =>
                  import("@/views/admin/administrasi/profesi/index.vue"),
              },
              {
                path: "create",
                name: "ProfesiCreate",
                component: () =>
                  import("@/views/admin/administrasi/profesi/create.vue"),
              },
              {
                path: "edit/:id",
                name: "ProfesiEdit",
                component: () =>
                  import("@/views/admin/administrasi/profesi/edit.vue"),
              },
            ],
          },
        ],
      },
      {
        path: "/admin/fasilitas",
        redirect: "/admin/fasilitas/poliklinik",
        component: RouterView,
        children: [
          {
            path: "poliklinik",
            redirect: "/admin/fasilitas/poliklinik/index",
            component: RouterView,
            children: [
              {
                path: "index",
                name: "PoliklinikIndex",
                component: () =>
                  import("@/views/admin/fasilitas/poliklinik/index.vue"),
              },
              {
                path: "create",
                name: "PoliklinikCreate",
                component: () =>
                  import("@/views/admin/fasilitas/poliklinik/create.vue"),
              },
              {
                path: "edit/:id",
                name: "PoliklinikEdit",
                component: () =>
                  import("@/views/admin/fasilitas/poliklinik/edit.vue"),
              },
            ],
          },
          {
            path: "farmasi",
            redirect: "/admin/fasilitas/farmasi/obat",
            component: RouterView,
            children: [
              {
                path: "obat",
                redirect: "/admin/fasilitas/farmasi/obat/index",
                component: RouterView,
                children: [
                  {
                    path: "index",
                    name: "ObatIndex",
                    component: () =>
                      import("@/views/admin/fasilitas/farmasi/obat/index.vue"),
                  },
                  {
                    path: "create",
                    name: "ObatCreate",
                    component: () =>
                      import("@/views/admin/fasilitas/farmasi/obat/create.vue"),
                  },
                  {
                    path: "edit/:id",
                    name: "ObatEdit",
                    component: () =>
                      import("@/views/admin/fasilitas/farmasi/obat/edit.vue"),
                  },
                ],
              },
              {
                path: "resep",
                redirect: "/admin/fasilitas/farmasi/resep/index",
                component: () =>
                  import("@/views/admin/fasilitas/farmasi/resep/index.vue"),
                children: [
                  {
                    path: "index",
                    name: "ResepIndex",
                    component: () =>
                      import("@/views/admin/fasilitas/farmasi/resep/index.vue"),
                  },
                ],
              },
            ],
          },
          {
            path: "/admin/fasilitas/lab",
            redirect: "/admin/fasilitas/lab/komponen",
            component: RouterView,
            children: [
              {
                path: "komponen",
                redirect: "/admin/fasilitas/lab/komponen/index",
                component: RouterView,
                children: [
                  {
                    path: "index",
                    name: "KomponenLabIndex",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/komponen/index.vue"),
                  },
                  {
                    path: "create",
                    name: "KomponenLabCreate",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/komponen/create.vue"),
                  },
                  {
                    path: "edit/:id",
                    name: "KomponenLabEdit",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/komponen/edit.vue"),
                  },
                ],
              },
              {
                path: "kategori",
                redirect: "/admin/fasilitas/lab/kategori/index",
                component: RouterView,
                children: [
                  {
                    path: "index",
                    name: "KategoriLabIndex",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/kategori/index.vue"),
                  },
                  {
                    path: "create",
                    name: "KategoriLabCreate",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/kategori/create.vue"),
                  },
                  {
                    path: "edit/:id",
                    name: "KategoriLabEdit",
                    component: () =>
                      import("@/views/admin/fasilitas/lab/kategori/edit.vue"),
                  },
                ],
              },
              {
                path: "pemeriksaan",
                redirect: "/admin/fasilitas/lab/pemeriksaan/index",
                component: RouterView,
                children: [
                  {
                    path: "index",
                    name: "PemeriksaanLabIndex",
                    component: () =>
                      import(
                        "@/views/admin/fasilitas/lab/pemeriksaan/index.vue"
                      ),
                  },
                  {
                    path: "create",
                    name: "PemeriksaanLabCreate",
                    component: () =>
                      import(
                        "@/views/admin/fasilitas/lab/pemeriksaan/create.vue"
                      ),
                  },
                  {
                    path: "edit/:id",
                    name: "PemeriksaanLabEdit",
                    component: () =>
                      import(
                        "@/views/admin/fasilitas/lab/pemeriksaan/edit.vue"
                      ),
                  },
                ],
              },
              {
                path: "permintaan",
                redirect: "/admin/fasilitas/lab/permintaan/index",
                component: RouterView,
                children: [
                  {
                    path: "index",
                    name: "PermintaanLabIndex",
                    component: () =>
                      import(
                        "@/views/admin/fasilitas/lab/permintaan/index.vue"
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { layout: "Empty" },
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASEURL || "/"),
  routes,
});

router.beforeEach((to, from, next) => {
  let publicPages = ["/user/login"];
  let guestOnlyPages = ["/user/login"];
  let authRequired = !publicPages.includes(to.path);
  let guestRequired = guestOnlyPages.includes(to.path);

  const loggedIn = localStorage.getItem("auth");

  if (authRequired && !loggedIn) {
    next("/user/login");
  }
  if (guestRequired && loggedIn) {
    next(HomePage);
  } else {
    next();
  }
});
export default router;
