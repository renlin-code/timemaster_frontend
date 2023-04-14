<template>
  <InnerInputModal
    class="search-modal"
    :blur="searchQuery.length !== 0"
    placeholder="Search for tasks"
    v-model="searchQuery"
    :maxlength="40"
    @close="$emit('close')"
  >
    <template #scroll-content>
      <Transition name="fade">
        <ul
          class="tasks-list"
          v-if="searchQuery.length !== 0 && searchResults.length !== 0 && !pending"
        >
          <Task v-for="task in searchResults" :task="task" />
        </ul>
      </Transition>

      <Transition name="fade">
        <div
          class="search-modal__no-results main-content-wrapper"
          v-if="searchQuery.length !== 0 && searchResults.length === 0 && !pending"
        >
          <h1 class="search-modal__no-results-text">Ups!... No results</h1>
          <NoResults width="296" height="221" />
        </div>
      </Transition>

      <Transition name="fade">
        <BasicPreloader v-if="pending" />
      </Transition>
    </template>
  </InnerInputModal>
</template>

<script>
import NoResults from "~/components/figures/NoResults.vue";
import BasicPreloader from "~/components/preloaders/BasicPreloader.vue";
import Task from "~/components/uiKit/Task.vue";
import InnerInputModal from "../InnerInputModal.vue";

export default {
  name: "SearchModal",
  components: { InnerInputModal, NoResults, Task, BasicPreloader },
  data: () => ({
    pending: false,

    searchQuery: "",
    searchResults: [],
  }),
  methods: {
    async searchTask(query) {
      try {
        if (query.length !== 0) {
          this.pending = true;
          this.searchResults = await this.$axios.$get(
            `/profile/search-tasks?searchQuery=${query}`
          );
          //console.log(this.searchResults);
        } else {
          this.searchResults = [];
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
      this.pending = false;
    },
  },
  watch: {
    searchQuery(value) {
      this.searchTask(value);
    },
  },
  created() {
    this.$nuxt.$on("refreshView", () => {
      //console.log("REFRESH");
      this.searchTask(this.searchQuery);
    });
  },
  beforeDestroy() {
    this.$nuxt.$off("refreshView");
  },
};
</script>

<style lang="scss" scoped>
.search-modal {
  position: fixed;
  top: 0;
  &__no-results {
    position: fixed;
    top: 274rem;
    width: 100%;
    &-text {
      margin-bottom: 108rem;
    }
  }
}
</style>
