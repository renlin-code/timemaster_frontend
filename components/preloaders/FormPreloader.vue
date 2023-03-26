<template>
  <Transition name="fade">
    <div class="form-preloader">
      <SimplePreloader />
    </div>
  </Transition>
</template>

<script>
import SimplePreloader from "./SimplePreloader.vue";

export default {
  name: "FormPreloader",
  components: { SimplePreloader },
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
  background: rgba($black, 0.2);
  display: grid;
  place-content: center;
}
</style>
