<template>
  <button class="settings-button timemaster-caption"
    :class="{'settings-button--selected' : computedSelected}"
    @click="selected = !selected"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "SettingsButton",
  props: {
    radio: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selected: false
  }),
  computed: {
    computedSelected() {
      if(this.radio) {
        return this.selected;
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .settings-button {
    padding: 5rem 20rem;
    border: 2rem solid $main-color;
    border-radius: 30rem;
    color: $dark-gray;
    background: transparent;
    transition: all 320ms ease-in-out;
    &--selected {
      background: $white;
    }
  }
</style>
