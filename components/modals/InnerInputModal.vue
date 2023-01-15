<template>
  <div class="input-modal-layout">
    <div class="input-modal-layout__bg"
      :class="{ 'input-modal-layout__bg--blur' : blur }"
    ></div>

    <div class="input-modal-layout__content">
    <button class="input-modal-layout__close"
      @click="$emit('close')"
    >
      <close />
    </button>
      <textarea class="input-modal-layout__textarea timemaster-title main-content-wrapper"
        :maxlength="maxlength"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      ></textarea>

      <div class="input-modal-layout__static-block"
        :class="{'input-modal-layout__static-block--empty' : !staticContentHeight}"
        :style="`height: ${staticContentHeight}rem;`"
      >
        <slot name="static-content"/>
      </div>

      <div class="input-modal-layout__scroll-block"
        :style="`height: calc(100vh - 256rem - ${staticContentHeight}rem);`"
      >
        <slot name="scroll-content" />
      </div>

      <div class="input-modal-layout__button">
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<script>
import close from '../icons/close.vue';

export default {
    name: "StartPage",
    props: {
        value: null,

        blur: {
            type: Boolean,
            default: false
        },
        staticContentHeight: {
            type: Number,
            default: 0
        },
        placeholder: {
            type: String,
            default: ""
        },
        maxlength: {
          type: Number,
            default: null
        }
    },
    components: { close }
}
</script>

<style scoped lang="scss">
  .input-modal-layout {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-image: url("~/static/img/background1.png");
    background-color: #FFFFFF;
    background-position: center;
    background-size: cover;
    &__bg {
      left: calc(50% - 160rem);
      top: 432rem;
      width: 320rem;
      height: 320rem;
      position: absolute;
      background-image: url("~/static/img/background-figure.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transition: all 320ms ease-in-out;
      &--blur {
        filter: blur(25rem);
      }
    }
    &__content {
      position: absolute;
      width: 100%;
      padding-top: 126rem;
    }
    &__close {
      position: absolute;
      top: 43rem;
      right: 25rem;
      padding: 0;
      width: 40rem;
      height: 40rem;
    }
    &__textarea {
      border: none;
      background: transparent;
      color: $dark-gray;
      width: 100%;
      resize: none;
      margin-bottom: 34rem;
      &::placeholder {
        color: rgba( $dark-gray, 0.5);
      }
      &:focus {
        outline: none;
      }
    }
    &__static-block {
      &::v-deep > h2 {
        margin-bottom: 13rem;
        color: $dark-gray;
        padding: 0 25rem;
      }
      padding-bottom: 40rem;
      &--empty {
        display: none;
      }
    }
    &__scroll-block {
      overflow-y: scroll;
      padding-bottom: 27rem;
      &::v-deep > h2 {
        margin-bottom: 13rem;
        color: $dark-gray;
        padding: 0 25rem;
      }
    }
    &__button {
      position: absolute;
      bottom: 27rem;
      right: 25rem;
    }
  }
</style>
