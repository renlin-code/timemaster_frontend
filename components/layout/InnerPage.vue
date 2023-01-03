<template>
  <div class="inner-page-layout">
    <div class="inner-page-layout__bg"
      :class="{ 'inner-page-layout__bg--blur' : blur }"
    ></div>

    <div class="inner-page-layout__content">
      <h1 class="inner-page-layout__title timemaster-title main-content-wrapper">
        <slot name="title" />
      </h1>

      <div class="inner-page-layout__static-block"
        :class="{'inner-page-layout__static-block--empty' : !staticContentHeight}"
        :style="`height: ${staticContentHeight}rem;`"
      >
        <slot name="static-content"/>
      </div>

      <div class="inner-page-layout__scroll-block"
        :style="`height: calc(100vh - 193rem - ${staticContentHeight}rem);`"
      >
        <slot name="scroll-content" />
      </div>

      <div class="inner-page-layout__button">
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StartPage",
  props: {
    blur: {
      type: Boolean,
      default: false
    },
    staticContentHeight: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .inner-page-layout {
    position: relative;
    &__bg {
      left: calc(50% - 160rem);
      top: 320rem;
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
    }
    &__title {
      margin-bottom: 34rem;
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
