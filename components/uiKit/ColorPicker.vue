<template>
  <div class="color-picker">
    <CategoryCircle
      v-for="color in colors"
      extended
      :selected="selected === colors.indexOf(color)"
      :color="color"
      @click.native="select(color)"
    />
  </div>
</template>

<script>
import CategoryCircle from '../icons/categoryCircle.vue';

export default {
  name: "ColorPicker",
  components: { CategoryCircle },
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
          "#2ED435"
      ],
      selected: null
  }),
  methods: {
    select(color) {
      this.$emit("selectColor", color);
      this.selected = this.colors.indexOf(color);
    }
  }
}
</script>
<style scoped lang="scss">
.color-picker {
  width: 268rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  row-gap: 14rem;
}
</style>
