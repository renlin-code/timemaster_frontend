<template>
  <div class="category-circle"
    :class="{
      'category-circle--extended' : extended,
      'selected' : selected
      }"

    :style="`background: ${color}; border: 5rem solid ${color};`"
  >
    <div class="category-circle__inner"
      :style="`background: ${color}`"
    ></div>
  </div>
</template>

<script>
export default {
  name: "categoryCircle",
  props: {
    color: {
      type: String,
      default: "#777777"
    },
    extended: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
  .category-circle {
    width: 20rem;
    height: 20rem;
    border-radius: 50%;
    &--extended {
      width: 40rem;
      height: 40rem;
      &.selected {
        display: grid;
        place-content: center;
        background: transparent !important;
        .category-circle {
          padding: 10rem;
          &__inner {
            width: 20rem;
            height: 20rem;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>
