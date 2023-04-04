<template>
  <section class="desktop-rejection">
    <TimemasterLogo class="desktop-rejection__logo" width="288rem" height="40rem" />
    <DesktopRejFigure class="desktop-rejection__figure" width="727rem" height="521rem" />
    <p class="desktop-rejection__text timemaster-title">
      Sorry, there is not available version for this screen width by the moment :(
    </p>
  </section>
</template>

<script>
import DesktopRejFigure from "../figures/DesktopRejFigure.vue";
import TimemasterLogo from "../logos/TimemasterLogo.vue";

export default {
  name: "DesktopRejection",
  components: { TimemasterLogo, DesktopRejFigure },
};
</script>

<style scoped lang="scss">
.desktop-rejection {
  padding: 44rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url("~/static/img/background1.png");
  background-color: #ffffff;
  background-position: center;
  background-size: cover;
  min-width: 100vw;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  @media only screen and (max-width: 650px) {
    display: none;
  }

  &__logo {
    margin-bottom: 70rem;
  }
  &__figure {
    margin-bottom: 60rem;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &__text {
    color: $black;
  }
}
</style>
