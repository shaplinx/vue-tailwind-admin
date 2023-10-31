<template>
  <div class="flex h-full">
    <MobileNav :navigation="navigation" :user="user" v-model:is-open="mobileMenuOpen"></MobileNav>
    <DesktopNav :navigation="navigation" :user="user"></DesktopNav>

    <!-- Main Area -->
    <div class="flex min-w-0 flex-1 flex-col overflow-hidden">
      <MobileTopNav v-model:is-open="mobileMenuOpen"></MobileTopNav>

      <main class="flex flex-1 overflow-hidden">
        <!-- Primary column -->

        <section aria-labelledby="primary-heading"
          class="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last">
          <h1 id="primary-heading" class="sr-only">Accounts</h1>
          <!-- Your content -->
          askjdhajksdhjkashdjkashdjkasasdasdasdhdjkashdkb {{ mobileMenuOpen }}
          <pre>{{  }}</pre>
        </section>

        <!-- Secondary column (hidden on smaller screens) -->
         <!--  <aside  class="hidden lg:order-first lg:block lg:flex-shrink-0">
          
        </aside>-->
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MobileNav from './components/navs/MobileNav.vue';
import DesktopNav from "./components/navs/DesktopNav.vue"
import { computed, ref } from 'vue'
import {
  faChartBar,
  faBookmark,
  faStar,
  faChessRook,
} from '@fortawesome/free-regular-svg-icons'

import MobileTopNav from './components/navs/MobileTopNav.vue';
import { useRoute } from 'vue-router';


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
  { id: 'About2', label: 'About2', to:'#', icon: faStar, child: [{ id: "Child2", label: 'Child2', to: '/about/child2', icon: faStar }] }

]

const mobileMenuOpen = ref(false)


</script>