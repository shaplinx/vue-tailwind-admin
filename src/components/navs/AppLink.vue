<template>
  <a v-if="isExternalLink" v-bind="$attrs" :href="to" target="_blank">
    <slot />
  </a>
  <router-link v-else v-bind="$props" custom v-slot="{ isActive, href, navigate, isExactActive }">
    <a v-bind="$attrs" :href="href" @click="navigate" :class="[
      isActive ? activeClass : inactiveClass,
      isExactActive ? exactActiveClass : exactInactiveClass,
    ]">
      <slot :isExternalLink="isExternalLink" :href="href" :navigate="navigate" :isActive="isActive"
        :isExactActive="isExactActive"> </slot>
    </a>
  </router-link>
</template>

<script lang="ts">
import { computed, watch } from 'vue';
import { RouterLink, useLink } from 'vue-router';

export default {
  name: 'AppLink',

  props: {
    //@ts-ignore
    ...RouterLink.props,
    inactiveClass: String,
    exactActiveClass: String,
    exactInactiveClass: String
  },



  setup(props, {emit}) {
    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )
    //@ts-ignore
    const { route, href, isActive, isExactActive, navigate } = useLink(props)


    watch(isActive, () => {
      emit('onActiveChange', isExactActive.value)
    })


    return { isExternalLink, route, href, isActive, isExactActive, navigate }
  },





}


</script>