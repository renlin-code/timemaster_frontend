<template>
  <section class="category">
    <InnerTabbedPage
      :staticContentHeight="73"
      :tabsNames="['Today’s tasks', 'Pending', 'Done']"
      :tabsLengths="tabsLengths"
    >
      <template #title>
        <div class="category__title">
          {{ category.name }}
          <categories :color="category.color" />
        </div>
      </template>

      <template #tab1>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in todaysTasks"
            :color="category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #tab2>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in pendingTasks"
            :color="category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #tab3>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in doneTasks"
            :color="category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #button>
        <AddTaskButton
          :animated="tasks.length === 0"
          @addTask="
            $nuxt.$emit('openTasksModal', {
              from: 'category',
              edit: false,
              data: {
                categoryId: category.id,
              },
            })
          "
        />
      </template>
    </InnerTabbedPage>
  </section>
</template>

<script>
import AddTaskButton from "~/components/buttons/AddTaskButton.vue";
import categories from "~/components/icons/categories.vue";
import InnerTabbedPage from "~/components/layout/InnerTabbedPage.vue";
import Task from "~/components/uiKit/Task.vue";

export default {
  layout: "inner",
  components: { categories, AddTaskButton, InnerTabbedPage, Task },
  async asyncData({ params, $axios, redirect }) {
    let category, tasks;
    try {
      category = await $axios.$get(`/profile/my-categories/${params.id}`);
      tasks = category.tasks;
    } catch (error) {
      console.error(error);
      redirect("/start");
    }
    return { category, tasks };
  },
  computed: {
    todaysDate() {
      const fullDate = new Date();
      const date =
        fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate();
      const month =
        fullDate.getMonth() < 9 ? `0${fullDate.getMonth() + 1}` : fullDate.getMonth() + 1;
      const year = fullDate.getFullYear();
      return `${year}-${month}-${date}`;
    },
    todaysTasks() {
      return this.tasks.filter((task) => task.date == this.todaysDate);
    },
    pendingTasks() {
      return this.tasks.filter((task) => !task.done);
    },
    doneTasks() {
      return this.tasks.filter((task) => task.done);
    },
    tabsLengths() {
      return [this.todaysTasks.length, this.pendingTasks.length, this.doneTasks.length];
    },
  },
  methods: {
    async fetchCategory() {
      try {
        this.category = await this.$axios.$get(
          `/profile/my-categories/${this.$route.params.id}`
        );
        this.tasks = this.category.tasks;
      } catch (error) {
        console.error(error);
        if (error.response.data.statusCode == 401) {
          this.$router.push("/start/login");
        } else {
          this.$router.push("/start");
        }
      }
      this.preloader = false;
    },
  },
  mounted() {
    this.$nuxt.$on("refreshView", () => {
      console.log("REFRESH");
      this.$nuxt.refresh();
    });
  },
};
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
</style>
