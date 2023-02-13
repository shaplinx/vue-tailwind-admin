<template>
  <div>
    <Transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
    >
      <div
        v-show="!preferences.isMenuCompact"
        @click="preferences.toggleMenu(false)"
        class="w-full h-full md:hidden fixed inset-0 z-10 bg-black/70"
      ></div>
    </Transition>
    <aside
      class="z-40 top-0 fixed md:sticky lg:left-auto translate-x-0 h-screen overflow-x-hidden overflow-y-auto shrink-0 bg-neutral transition-all"
      :class="[
        preferences.isMenuCompact
          ? 'md:w-16 md:translate-x-0 md:p-0 -translate-x-full w-0'
          : 'w-64 ',
      ]"
    >
      <SideNav :compact="preferences.isMenuCompact" :items="NavItems" />
    </aside>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import SideNav from "./SideNav.vue";
import { usePreferencesStore } from "../../store/preferences";



const preferences = usePreferencesStore();

const NavItems = ref<NavItem[]>([{
  id: "dashboards",
  icon: "gauge-high",
  label: "menu.dashboard",
  to: `Dashboard`,
},
{
  id: "pasien",
  icon: "hospital-user",
  label: "menu.pasien",
  to: `PasienIndex`,
},
{
  id: "pertemuan",
  icon: "comment-medical",
  label: "menu.pertemuan",
  to: `PertemuanIndex`,
},
{
  id: "fasilitas",
  icon: "hospital",
  label: "menu.fasilitas",
  subs: [{
    icon: "house-medical-flag",
    label: "menu.poliklinik",
    to: `PoliklinikIndex`,

  },
  {
    icon: "prescription-bottle-medical",
    label: "menu.farmasi",
    type: "none",
    subs: [
      {
        icon: "pills",
        label: "menu.obat",
        to: `ObatIndex`,

      },
      {
        icon: "prescription",
        label: "menu.resep",
        to: `ResepIndex`,

      }
    ]
  },
  {
    icon: "flask-vial",
    label: "menu.laboraturium",
    type:"none",
    subs: [
      {
        icon: "vials",
        label: "menu.permintaanLab",
        to: `PermintaanLabIndex`,

      },
      {
        icon: "vial-virus",
        label: "menu.pemeriksaanLab",
        to: `PemeriksaanLabIndex`,

      },
      {
        icon: "vial",
        label: "menu.komponenLab",
        to: `KomponenLabIndex`,

      },
      {
        icon: "tag",
        label: "menu.kategoriLab",
        to: `KategoriLabIndex`,

      },

    ]
  }
  ]
},
{
  id: "administrasi",
  icon: "folder",
  label: "menu.administrasi",
  type:"none",
  subs: [
    {
      icon: "user-tie",
      label: "menu.profesi",
      to: `ProfesiIndex`,

    },
    {
      icon: "square-virus",
      label: "menu.icd10",
      to: `Icd10Index`,
    },
    {
      icon: "users",
      label: "menu.pegawai",
      to: `PegawaiIndex`,
    },
    {
      icon: "syringe",
      label: "menu.tindakan",
      to: `TindakanIndex`,
    },
    {
      icon: "disease",
      label: "menu.diagnosis",
      to: `DiagnosisIndex`,
    },
    {
      icon: "money-check-dollar",
      label: "menu.gaji",
      to: `GajiIndex`,
    },
    {
      icon: "vault",
      label: "menu.rekening",
      to: `RekeningIndex`,
    }
  ]
},
])
</script>
