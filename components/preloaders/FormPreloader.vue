<template>
  <Transition name="fade">
    <div class="form-preloader">
      <div class="form-preloader__preloader">
        <div class="form-preloader__preloader-spin-1"></div>
        <div class="form-preloader__preloader-spin-2"></div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "FormPreloader"
}
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
  &__preloader {
    position: relative;
    height: 32rem;
    width: 32rem;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    &-spin-1,
    &-spin-2 {
      position: absolute;
      display: block;
      margin: auto;
      border: 3rem solid transparent;
      border-radius: 50%;
    }
    &-spin-1 {
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
    &-spin-2 {
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
}


</style>
