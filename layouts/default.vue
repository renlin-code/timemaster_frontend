<template>
  <main>
    <DesktopRejetion />
    <Transition name="fade">
      <OfflineView v-if="$nuxt.isOffline" />
    </Transition>
    <Transition name="fade">
      <Nuxt />
    </Transition>
  </main>
</template>

<script>
import DesktopRejetion from "~/components/others/DesktopRejetion.vue";
import OfflineView from "~/components/others/OfflineView.vue";

export default {
  components: { DesktopRejetion, OfflineView },
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
