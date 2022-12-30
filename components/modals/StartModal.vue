<template>
  <Transition name="fade">
    <div class="start-modal">
      <div class="start-modal__inner-box">
        <p class="start-modal__inner-box-text timemaster-text">
          <slot name="main-text" />
        </p>
        <MainButton
          type="1"
          @click.native="$emit('close')"
        >
          <slot name="button-text" />
        </MainButton>
      </div>
    </div>
  </Transition>
</template>

<script>
import MainButton from '../buttons/MainButton.vue';

export default {
    name: "StartModal",
    components: { MainButton }
}
</script>

<style scoped lang="scss">
  .start-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-content: center;
    z-index: 10;
    backdrop-filter: blur(20rem);
    &__inner-box {
      width: 378rem;
      height: 254rem;
      border-radius: 30rem;
      background: #ffffff;
      box-shadow: inset 0 4rem 4rem $main-color;
      padding: 55rem 41rem;
      &-text {
        margin-bottom: 40rem;
      }
    }
  }
</style>
