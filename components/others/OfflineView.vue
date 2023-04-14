<template>
  <section class="offline-view">
    <div class="offline-view__content main-content-wrapper">
      <h1 class="offline-view__title timemaster-title">
        Oops...<br />
        It seems you are offline
      </h1>
      <OfflineFigure width="378rem" height="382rem" />
      <MainButton @click.native="$nuxt.refresh()">Try again</MainButton>
    </div>
  </section>
</template>

<script>
import LogoutButton from "../buttons/LogoutButton.vue";
import MainButton from "../buttons/MainButton.vue";
import OfflineFigure from "../figures/OfflineFigure.vue";

export default {
  name: "OfflineView",
  components: { LogoutButton, OfflineFigure, MainButton },
};
</script>

<style scoped lang="scss">
.offline-view {
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  background-image: url("~/static/img/background1.png");
  background-color: #ffffff;
  background-position: center;
  background-size: cover;
  &__content {
    padding-top: 100rem;
    padding-bottom: 67rem;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__title {
    color: $black;
  }
}
</style>
