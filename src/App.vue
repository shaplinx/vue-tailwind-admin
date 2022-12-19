<template>
  <div>
    <RouterView v-slot="{ Component }">
      <FadeInOut entry="left" exit="left" :duration="200" mode="out-in">
        <component :is="Component" />
      </FadeInOut>
    </RouterView>
    <ModalsContainer />
  </div>
</template>
<script setup lang="ts">
import { usePreferencesStore } from "./store/preferences";

const preferences = usePreferencesStore();

preferences.changeTheme();
</script>
