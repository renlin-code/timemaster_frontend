<template>
  <Transition name="fade">
    <div class="form-preloader" v-if="loading">
      <DotsPreloader />
    </div>
  </Transition>
</template>

<script>
import DotsPreloader from "./DotsPreloader.vue";

export default {
  name: "BasicPreloader",
  components: { DotsPreloader },
  data: () => ({
    loading: true,
  }),

  methods: {
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.form-preloader {
  z-index: 10;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba($white, 0.8);
  display: grid;
  place-content: center;
}
</style>
