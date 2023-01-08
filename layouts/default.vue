<template>
  <Transition name="fade">
    <main>
      <DesktopRejetion />
      <Nuxt />
    </main>
  </Transition>
</template>

<script>
import DesktopRejetion from '~/components/others/DesktopRejetion.vue';

  export default {
    components: { DesktopRejetion }
  }
</script>

<style scoped lang="scss">
  main {
    background-image: url("~/static/img/background1.png");
    background-color: #FFFFFF;
    background-position: center;
    background-size: cover;
    min-height: 100vh;
  }
</style>
