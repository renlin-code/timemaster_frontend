<template>
  <div class="start-modal">
    <div class="start-modal__inner-box">
      <p class="start-modal__inner-box-text timemaster-text">
        <slot name="main-text" />
      </p>
      <div class="start-modal__buttons">
        <MainButton
          type="2"
          v-if="twoButtons"
          @click.native="$emit('action')"
        >
          <slot name="secondary-button" />
        </MainButton>

        <MainButton
          type="1"
          @click.native="$emit('close')"
        >
          <slot name="primary-button" />
        </MainButton>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from '../buttons/MainButton.vue';

export default {
    name: "StartModal",
    components: { MainButton },
    props: {
      twoButtons: {
        type: Boolean,
        defaul: false
      }
    }
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
        color: $dark-gray;
        text-align: center;
      }
    }
    &__buttons {
      display: flex;
      gap: 35rem;
    }
  }
</style>
