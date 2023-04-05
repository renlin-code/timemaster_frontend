<template>
  <div class="color-picker">
    <div class="color-picker__picker">
      <CategoryCircle
        v-for="color in colors"
        extended
        :selected="selected === colors.indexOf(color)"
        :color="color"
        @click.native="select(color)"
      />
    </div>
    <span
      class="color-picker__error timemaster-caption"
      v-if="showError"
      :class="{ 'color-picker__error--shake': animateError }"
    >
      Select a color
    </span>
  </div>
</template>

<script>
import CategoryCircle from "../icons/categoryCircle.vue";

export default {
  name: "ColorPicker",
  components: { CategoryCircle },
  props: {
    trigger: {
      type: Boolean,
      default: false,
    },
    inyectedColor: null,
  },
  data: () => ({
    colors: [
      "#D75EF5",
      "#4E9DA1",
      "#A93EBD",
      "#47FFF3",
      "#FC2F2F",
      "#EF5DA8",
      "#7FFFD4",
      "#FAFF03",
      "#7879F1",
      "#2ED435",
    ],
    selected: null,

    showError: false,
    animateError: false,
  }),
  methods: {
    select(color) {
      this.$emit("selectColor", color);
      this.selected = this.colors.indexOf(color);
    },
    setInyectedColor() {
      if (this.inyectedColor) {
        this.select(this.inyectedColor);
      }
    },
  },
  watch: {
    animateError(value) {
      if (value) {
        setTimeout(() => {
          this.animateError = false;
        }, 1300);
      }
    },
    trigger() {
      if (this.selected === null) {
        this.showError = true;
        this.animateError = true;
      } else {
        this.showError = false;
      }
    },
  },
  created() {
    this.setInyectedColor();
  },
};
</script>
<style scoped lang="scss">
.color-picker {
  &__picker {
    width: 100%;
    max-width: 268rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    place-items: center;
    row-gap: 14rem;
  }
  &__error {
    color: #de2424;
    display: flex;
    justify-content: center;
    margin-top: 10rem;
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
