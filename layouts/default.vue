<template>
  <main>
    <DesktopRejetion />
    <MainPreloader
      :render="preloader"
      :minTime="1000"
    />

    <Transition name="fade">
      <Nuxt />
    </Transition>
  </main>
</template>

<script>
  import DesktopRejetion from '~/components/others/DesktopRejetion.vue';
  import MainPreloader from '~/components/preloaders/MainPreloader.vue';

  export default {
    components: { DesktopRejetion, MainPreloader },
    data: () => ({
      preloader: true
    }),
    mounted() {
      this.preloader = false
    },
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
