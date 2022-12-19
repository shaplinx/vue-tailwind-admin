<template>
  <div
    class="w-full bg-base-300 m-auto py-16 min-h-screen flex items-center justify-center"
  >
    <dv-card width="6/12">
      <div class="text-center py-6">
        <h1 class="text-9xl font-bold text-purple-400">404</h1>
        <h1 class="text-6xl font-medium py-8">oops! Page not found</h1>
        <p class="text-2xl pb-8 px-12 font-medium">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <router-link to="/dashboard">
          <dv-button class="mx-5" color="primary" label="HOME" >Home</dv-button>
        </router-link>
        <router-link to="/">
          <dv-button class="mx-5" color="secondary" label="ABOUT US" >About Us</dv-button>
        </router-link>
      </div>
    </dv-card>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>
.text-9xl {
  font-size: 14rem;
}
@media (max-width: 645px) {
  .text-9xl {
    font-size: 5.75rem;
  }
  .text-6xl {
    font-size: 1.75rem;
  }
  .text-2xl {
    font-size: 1rem;
    line-height: 1.2rem;
  }
  .py-8 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  .px-6 {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
  .mr-6 {
    margin-right: 0.5rem;
  }
  .px-12 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
