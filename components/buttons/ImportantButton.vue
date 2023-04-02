<template>
  <button
    class="important-button timemaster-subtitle"
    :class="{ selected: selected }"
    @click="select"
  >
    <flag :color="flagColor" />
    Important
  </button>
</template>

<script>
import flag from "../icons/flag.vue";

export default {
  name: "ImportantButton",
  components: { flag },
  props: {
    inyectedImportant: null,
  },
  data: () => ({
    selected: false,
  }),
  methods: {
    setInyectedImportant() {
      if (this.inyectedImportant) {
        this.selected = this.inyectedImportant;
      }
    },
    select() {
      this.selected = !this.selected;
      this.$emit("select", this.selected);
    },
  },
  computed: {
    flagColor() {
      return this.selected ? "#ffffff" : "#F5805E";
    },
  },
  created() {
    this.setInyectedImportant();
  },
};
</script>

<style scoped lang="scss">
.important-button {
  width: 300rem;
  height: 70rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10rem;
  border-radius: 30rem;
  background: #ffffff;
  color: $main-color;
  box-shadow: 0rem 2rem 2rem rgba(0, 0, 0, 0.25);
  transition: all 320ms ease-in-out;
  &.selected {
    background: $main-color;
    color: #ffffff;
  }
}
</style>
