<template>
  <section>
    <InnerTabbedPage
      class="home-page"
      :staticContentHeight="280"
      :tabsNames="['Today’s tasks', 'Pending', 'Done']"
      :tabsLengths="tabsLengths"
    >
      <template #title v-if="profileData.name">
        {{ `Hello, ${profileData.name}!` }}
      </template>

      <template #static-content>
        <h2>Categories</h2>
        <CategoriesCarousell :categories="profileData.categories" />
      </template>

      <template #tab1>
        <TasksList :tasks="todaysTasks" />
      </template>

      <template #tab2>
        <TasksList :tasks="pendingTasks" />
      </template>

      <template #tab3>
        <TasksList :tasks="doneTasks" />
      </template>

      <template #button>
        <AddTaskButton
          :animated="allTasks.length === 0"
          @click.native="$nuxt.$emit('openTaskModalFromHome')"
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
import TasksList from "~/components/complexItems/TasksList.vue";

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
    TasksList,
  },

  async asyncData({ $axios, redirect }) {
    let profileData, allTasks;

    try {
      profileData = await $axios.$get("/profile");
      allTasks = await $axios.$get("/profile/my-tasks");
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
    doneTasks() {
      return this.allTasks.filter((task) => task.done);
    },
    pendingTasks() {
      return this.allTasks.filter((task) => !task.done);
    },
    tabsLengths() {
      return [this.todaysTasks.length, this.pendingTasks.length, this.doneTasks.length];
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
