<template>
  <button class="main-button timemaster-subtitle"
    :class="[
      { 'main-button--type1' : type == 1 },
      { 'main-button--type2' : type == 2 }
    ]"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "MainButton",
  props: {
    type: {
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">
  .main-button {
    width: 100%;
    padding: 13rem;
    border-radius: 20rem;
    border: 1px solid $main-color;
    transition: all 320ms ease-in-out;
    &:focus {
      border-color: #FF9A7D;
    }
    &--type1 {
      background-color: $main-color;
      color: $white;
      &:focus {
        background-color: #FF9A7D;
      }
    }
    &--type2 {
      background-color: transparent;
      color: $black;
    }
  }
</style>
