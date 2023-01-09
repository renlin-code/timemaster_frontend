<template>
  <section>
    <InnerPage class="home-page"
    :blur="!noTasks"
    :staticContentHeight="200"
    :preloader="preloader"
  >
      <template #title
        v-if="profileData.name"
      >
        {{ `Hello, ${profileData.name}!` }}
      </template>

      <template #static-content
      >
        <h2>Categories</h2>
        <CategoriesCarousell
          :categories="profileData.categories"
        />
      </template>

      <template #scroll-content>
        <h2>Today’s tasks</h2>
        <ul class="tasks-list">
          <Task
            v-for="task in pendingTasks"
            :task="task"
          />
        </ul>

        <h2
          v-if="doneTasks.length !== 0"
        >Done</h2>
        <div class="tasks-list"
          v-if="doneTasks.length !== 0"
        >
          <Task
            v-for="task in doneTasks"
            :task="task"
          />
        </div>

      </template>

      <template #button>
      <AddTaskButton
        :animated="noTasks"
        @click.native="$nuxt.$emit('openTaskModalFromHome')"
      />
      </template>
    </InnerPage>
  </section>
</template>

<script>
import { startCategoriesMixin } from "~/mixins/startCategoriesMixin";

import InnerPage from '~/components/layout/InnerPage.vue';
import CategoryCard from '~/components/uiKit/CategoryCard.vue';
import CategoriesCarousell from '~/components/complexItems/CategoriesCarousell.vue';
import AddTaskButton from '~/components/buttons/AddTaskButton.vue';
import InnerInputModal from '~/components/modals/InnerInputModal.vue';
import Task from '~/components/uiKit/Task.vue';

export default {
    name: "IndexPage",
    layout: "inner",
    components: { InnerPage, CategoryCard, CategoriesCarousell, AddTaskButton, InnerInputModal, Task },
    mixins: [startCategoriesMixin()],
    data: () => ({
      profileData: {},
      preloader: true,
      todaysTasks: []
    }),
    methods: {
      async fetchProfileData() {
        try {
          const data = await this.$axios.$get("/profile/");
          if(data.categories.length === 0) {
            await this.createStartCategories();
            this.profileData = await this.$axios.$get("/profile/");
          } else {
            this.profileData = data;
          }
        } catch (error) {
          console.error(error)
          if (error.response.data.statusCode == 401) {
            this.$router.push("/start/login");
          } else {
            this.$router.push("/start");
          }
        }
        this.preloader = false;
      },

      async fetchTodayTasks() {
        try {
          this.todaysTasks = await this.$axios.$get(`/profile/my-tasks?date=${this.todaysDate}`);
        } catch (error) {
          console.error(error)
          if (error.response.data.statusCode == 401) {
            this.$router.push("/start/login");
          } else {
            this.$router.push("/start");
          }
        }
      }
    },
    computed: {
      todaysDate() {
        const fullDate = new Date();
        const date = fullDate.getDate() < 10 ? `0${fullDate.getDate()}` : fullDate.getDate();
        const month = fullDate.getMonth() < 9 ? `0${fullDate.getMonth() + 1}` : fullDate.getMonth() + 1;
        const year = fullDate.getFullYear();

        return `${year}-${month}-${date}`;
      },
      noTasks() {
        return this.todaysTasks.length === 0;
      },
      pendingTasks() {
        return this.todaysTasks.filter(i => !i.done);
      },
      doneTasks() {
        return this.todaysTasks.filter(i => i.done);
      }
    },

    async created() {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.$router.push("/start/login");
      } else {
        await this.fetchProfileData();
        await this.fetchTodayTasks();
      }
    },
    mounted() {
      this.$nuxt.$on("refreshHome", () => {
        this.fetchProfileData();
        this.fetchTodayTasks();
      })
    }
  }
</script>

<style scoped lang="scss">
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 15rem;
    margin-bottom: 40rem;
  }
</style>
