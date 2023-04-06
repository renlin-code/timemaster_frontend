<template>
  <main>
    <DesktopRejetion />
    <Transition name="fade">
      <Nuxt />
    </Transition>
  </main>
</template>

<script>
import DesktopRejetion from "~/components/others/DesktopRejetion.vue";

export default {
  components: { DesktopRejetion },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },
};
</script>

<style scoped lang="scss">
main {
  background-image: url("~/static/img/background1.png");
  background-color: #ffffff;
  background-position: center;
  background-size: cover;
  min-height: 100vh;
}
</style>
