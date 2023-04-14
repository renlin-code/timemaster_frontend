<template>
  <div class="input-modal-layout">
    <Transition name="fade">
      <BasicPreloader class="input-modal-layout__preloader" v-if="preloader" />
    </Transition>

    <div
      class="input-modal-layout__bg"
      :class="{ 'input-modal-layout__bg--blur': blur }"
    ></div>

    <div class="input-modal-layout__content">
      <button class="input-modal-layout__close" @click="$emit('close')">
        <close />
      </button>
      <textarea
        class="input-modal-layout__textarea timemaster-title main-content-wrapper"
        ref="textarea"
        :maxlength="maxlength"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      ></textarea>
      <span
        class="input-modal-layout__error timemaster-caption main-content-wrapper"
        v-if="showError"
        :class="{ 'input-modal-layout__error--shake': animateError }"
      >
        {{ errorText }}
      </span>

      <div
        class="input-modal-layout__static-block"
        :class="{ 'input-modal-layout__static-block--empty': !staticContentHeight }"
        :style="`height: ${staticContentHeight}rem;`"
      >
        <slot name="static-content" />
      </div>

      <div
        class="input-modal-layout__scroll-block"
        :style="`height: calc(100vh - 280rem - ${staticContentHeight}rem);`"
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
import close from "../icons/close.vue";
import BasicPreloader from "../preloaders/BasicPreloader.vue";

export default {
  name: "StartPage",
  components: { close, BasicPreloader },
  props: {
    trigger: false,
    value: null,
    preloader: false,
    blur: {
      type: Boolean,
      default: false,
    },
    staticContentHeight: {
      type: Number,
      default: 0,
    },
    errorText: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxlength: {
      type: Number,
      default: null,
    },
  },
  data: () => ({
    showError: false,
    animateError: false,
  }),
  watch: {
    animateError(value) {
      if (value) {
        setTimeout(() => {
          this.animateError = false;
        }, 1300);
      }
    },
    trigger() {
      if (!this.value) {
        this.showError = true;
        this.animateError = true;
      } else {
        this.showError = false;
      }
    },
  },
  mounted() {
    this.$refs.textarea.focus();
  },
};
</script>

<style scoped lang="scss">
.input-modal-layout {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-image: url("~/static/img/background1.png");
  background-color: #ffffff;
  background-position: center;
  background-size: cover;
  &__bg {
    left: calc(50% - 160rem);
    top: 504rem;
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
    margin-bottom: 60rem;
    &::placeholder {
      color: rgba($dark-gray, 0.5);
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
  &__error {
    position: absolute;
    top: 226rem;
    width: 100%;
    color: #de2424;
    display: flex;
    margin-top: 2rem;
    &--shake {
      animation: shake 1200ms 1;
      @keyframes shake {
        10% {
          transform: translateX(10rem);
        }
        20% {
          transform: translateX(-10rem);
        }
        30% {
          transform: translateX(10rem);
        }
        40% {
          transform: translateX(-10rem);
        }
        50% {
          transform: translateX(0);
        }
      }
    }
  }
}
</style>
