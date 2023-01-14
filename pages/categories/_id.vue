<template>
  <section class="category"
    v-if="category !== {}"
  >
    <InnerPage
      :preloader="preloader"
      :blur="!noTasks"
    >
      <template #title>
        <div class="category__title">
          {{ category.name }}
          <categories
            :color="category.color"
          />
        </div>
      </template>

      <template #scroll-content>
        <ul class="tasks-list">
          <Task
            v-for="task in pendingTasks"
            :color="category.color"
            :task="task"
          />
        </ul>

        <h2
          v-if="doneTasks.length !== 0"
        >Done</h2>
        <ul class="tasks-list"
          v-if="doneTasks.length !== 0"
        >
          <Task
            v-for="task in doneTasks"
            :color="category.color"
            :task="task"
          />
        </ul>

      </template>

      <template #button>
        <AddTaskButton
          :animated="noTasks"
          @click.native="$nuxt.$emit('openTaskModalFromCategory', category.id)"
        />
      </template>
    </InnerPage>
  </section>
</template>

<script>
import AddTaskButton from '~/components/buttons/AddTaskButton.vue';
import categories from '~/components/icons/categories.vue';
import InnerPage from '~/components/layout/InnerPage.vue';
import Task from '~/components/uiKit/Task.vue';

export default {
  layout: "inner",
  components: { InnerPage, categories, AddTaskButton, Task },
  data: () => ({
    preloader: true,
    category: {},
    tasks: []
  }),
  computed: {
    noTasks() {
        return this.tasks.length === 0;
      },
      pendingTasks() {
        return this.tasks.filter(i => !i.done);
      },
      doneTasks() {
        return this.tasks.filter(i => i.done);
      }
  },
  methods: {
    async fetchCategory() {
      try {
        this.category = await this.$axios.$get(`/profile/my-categories/${this.$route.params.id}`);
        this.tasks = this.category.tasks;
      } catch (error) {
        console.error(error)
        if (error.response.data.statusCode == 401) {
          this.$router.push("/start/login");
        } else {
          this.$router.push("/start");
        }
      }
      this.preloader = false;
    }
  },
  created() {
    this.fetchCategory();

    this.$nuxt.$on("refreshView", () => {
      this.fetchCategory();
    })
  },
  beforeDestroy() {
    this.$nuxt.$off("refreshView")
  }
}
</script>

<style scoped lang="scss">
  .category {
    &__title {
      display: flex;
      align-items: center;
      gap: 10rem;
      &::v-deep svg {
        width: 22rem;
        height: 22rem;
      }
    }
  }
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 15rem;
    margin-bottom: 100rem;
  }
</style>
