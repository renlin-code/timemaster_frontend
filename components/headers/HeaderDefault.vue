<template>
  <div class="header">
    <div class="header__content main-content-wrapper">
      <button class="header__burger" @click="openMenu">
        <burger />
      </button>
      <button class="header__search">
        <search @click.native="showModal = true" />
      </button>
    </div>
    <Transition name="fade">
      <SearchModal v-if="showModal" @close="showModal = false" />
    </Transition>
  </div>
</template>

<script>
import burger from "../icons/burger.vue";
import search from "../icons/search.vue";
import SearchModal from "../modals/innerInputInstances/SearchModal.vue";

export default {
  components: { burger, search, SearchModal },
  data: () => ({
    showModal: false,
  }),
  methods: {
    openMenu() {
      this.$emit("openMenu");
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  padding: 43rem 0 38rem;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
