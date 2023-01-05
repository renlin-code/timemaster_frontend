<template>
  <button
    class="important-button"
    :class="{ selected: selected }"
    @click="select"
  >
    <flag :color="flagColor" />
  </button>
</template>

<script>
import flag from "../icons/flag.vue";

export default {
  name: "ImportantButton",
  components: { flag },
  data: () => ({
    selected: true,
  }),
  methods: {
    select() {
      this.selected = !this.selected;
      this.$emit('select', this.selected);
    }
  },
  computed: {
    flagColor() {
      return this.selected ? "#ffffff" : "#F5805E";
    },
  },
  created() {
    this.select();
  }
};
</script>

<style scoped lang="scss">
.important-button {
  width: 150rem;
  height: 70rem;
  margin: 0 auto;
  display: grid;
  place-content: center;
  border-radius: 30rem;
  background: #ffffff;
  box-shadow: 0rem 2rem 2rem rgba(0, 0, 0, 0.25);
  transition: background 320ms ease-in-out;
  &.selected {
    background: $main-color;
  }
}
</style>
