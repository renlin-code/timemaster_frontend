<template>
  <section class="home-page">
    <InnerTabbedPage
      :staticContentHeight="280"
      :tabsNames="['Today’s tasks', 'Pending', 'Done']"
      :tabsLengths="tabsLengths"
    >
      <template #title>
        {{ `Hello, ${profileData.name}!` }}
      </template>

      <template #static-content>
        <h2>Categories</h2>
        <CategoriesCarousell :categories="profileData.categories" />
      </template>

      <template #tab1>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in todaysTasks"
            :color="task.category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #tab2>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in pendingTasks"
            :color="task.category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #tab3>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in doneTasks"
            :color="task.category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #button>
        <AddTaskButton
          :animated="allTasks.length === 0"
          @addTask="
            $nuxt.$emit('openTasksModal', {
              from: 'home',
              edit: false,
              data: {},
            })
          "
        />
      </template>
    </InnerTabbedPage>
  </section>
</template>

<script>
import InnerTabbedPage from "~/components/layout/InnerTabbedPage.vue";
import CategoryCard from "~/components/uiKit/CategoryCard.vue";
import CategoriesCarousell from "~/components/complexItems/CategoriesCarousell.vue";
import AddTaskButton from "~/components/buttons/AddTaskButton.vue";
import InnerInputModal from "~/components/modals/InnerInputModal.vue";
import Task from "~/components/uiKit/Task.vue";

export default {
  name: "IndexPage",
  layout: "inner",
  components: {
    InnerTabbedPage,
    CategoryCard,
    CategoriesCarousell,
    AddTaskButton,
    InnerInputModal,
    Task,
  },

  async asyncData({ $axios, redirect }) {
    let profileData, allTasks;

    try {
      [profileData, allTasks] = await Promise.all([
        await $axios.$get("/profile"),
        await $axios.$get("/profile/my-tasks"),
      ]);
    } catch (error) {
      console.error(error);
      redirect("/start");
    }
    return { profileData, allTasks };
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
      return this.allTasks.filter((task) => task.date == this.todaysDate);
    },
    pendingTasks() {
      return this.allTasks.filter((task) => !task.done);
    },
    doneTasks() {
      return this.allTasks.filter((task) => task.done);
    },
    tabsLengths() {
      return [this.todaysTasks.length, this.pendingTasks.length, this.doneTasks.length];
    },
  },

  mounted() {
    this.$nuxt.$on("refreshView", () => {
      // //console.log("REFRESH");
      this.$nuxt.refresh();
    });
  },
};
</script>
