<template>
  <div class="simple-preloader">
    <div class="simple-preloader__spin-1"></div>
    <div class="simple-preloader__spin-2"></div>
  </div>
</template>

<style lang="scss" scoped>
.simple-preloader {
  position: relative;
  height: 32rem;
  width: 32rem;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  &__spin-1,
  &__spin-2 {
    position: absolute;
    display: block;
    margin: auto;
    border: 3rem solid transparent;
    border-radius: 50%;
  }
  &__spin-1 {
    height: 32rem;
    width: 32rem;
    border-top: 3rem solid $light_gray;
    border-left: 3rem solid $light_gray;
    animation: spin1 1.8s linear infinite;
    @keyframes spin1 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(-720deg);
      }
    }
  }
  &__spin-2 {
    height: 52rem;
    width: 52rem;
    border-bottom: 3rem solid $main_color;
    border-left: 3rem solid $main_color;
    animation: spin2 1.2s linear infinite;
    @keyframes spin2 {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
