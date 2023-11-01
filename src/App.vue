<template>
  <div class="flex h-full">
    <MobileNav :navigation="navigation" :user="user" v-model:is-open="mobileMenuOpen"></MobileNav>
    <DesktopNav :navigation="navigation" :user="user"></DesktopNav>

    <!-- Main Area -->
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <MobileTopNav v-model:is-open="mobileMenuOpen"></MobileTopNav>

      <main class="flex flex-1 overflow-hidden">
        <!-- Primary column -->

        <section class="flex h-full w-full flex-1 flex-col overflow-y-auto lg:order-last">
          <div class="flex items-center justify-between bg-base-100 h-[65px] py-auto border-b-2 shadow-sm border-base-300  px-4 sm:px-6 lg:px-8">
            <div>
              <FormKit  type="text" placeholder="Search..." suffix-icon="search" outer-class="$reset mb-0" inner-class="$reset formkit-inner formkit-disabled:bg-gray-200 formkit-disabled:cursor-not-allowed formkit-disabled:pointer-events-none flex items-center max-w-md ring-1 ring-gray-400 focus-within:ring-blue-500 focus-within:ring-2 [&>label:first-child]:focus-within:text-blue-500 rounded"></FormKit>
            </div>
            <Button  color="link" icon outline><icon class="h-6" :icon="faEllipsis" /></Button>
          </div>

        </section>
        <!-- Secondary column (hidden on smaller screens) -->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MobileNav from './components/navs/MobileNav.vue';
import DesktopNav from "./components/navs/DesktopNav.vue"
import Button from "./components/buttons/Button.vue"
import {  ref } from 'vue'
import {
  faStar,
} from '@fortawesome/free-regular-svg-icons'

import {
  faEllipsis,
} from '@fortawesome/free-solid-svg-icons'

import MobileTopNav from './components/navs/MobileTopNav.vue';



const user: Base.User = {
  id: 112,
  name: 'Emily Selman',
  email: 'emily.selman@example.com',
  email_verified_at: "September",
  profesi_id: 1,
  created_at: null,
  updated_at: null
}
const navigation: Base.Component.Menu.MenuItem[] = [
  { id: 'Home', label: 'Home', to: '/', icon: faStar, },
  { id: 'About', label: 'About', to: '/about', icon: faStar, child: [{ id: "Child", label: 'Child', to: '/about/child', icon: faStar }] },
  { id: 'About2', label: 'About2', to: '#', icon: faStar, child: [{ id: "Child2", label: 'Child2', to: '/about/child2', icon: faStar }] }

]

const mobileMenuOpen = ref(false)


</script>