<template>
    <InnerPage class="home-page"
      blur
      :staticContentHeight="424"
      :preloader="preloader"
    >
      <template #title>
        Calendar
      </template>

      <template #static-content>
        <div class="main-content-wrapper">
          <MainCalendar
            :trigger="refreshTrigger"
            @selectDate="loadTasks"
          />
        </div>
      </template>

      <template #scroll-content>
        <h2s>Tasks for this date</h2s>
        <ul class="tasks-list">
          <Task
            v-for="task in pendingTasks"
            :color="task.category.color"
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
            :color="task.category.color"
            :task="task"
          />
        </ul>

      </template>

      <template #button>
        <AddTaskButton
          :animated="tasksOfTheDate.length === 0"
          @click.native="$nuxt.$emit('openTaskModalFromCalendar', date)"
        />
      </template>

    </InnerPage>
</template>

<script>
import AddTaskButton from '~/components/buttons/AddTaskButton.vue';
import InnerPage from '~/components/layout/InnerPage.vue';
import MainCalendar from '~/components/uiKit/MainCalendar.vue';
import Task from '~/components/uiKit/Task.vue';

export default {
    name: "IndexPage",
    layout: "inner",
    components: { InnerPage, MainCalendar, AddTaskButton, Task },
    data: () => ({
        preloader: true,
        tasksOfTheDate: [],
        date: null,
        refreshTrigger: false
    }),
    computed: {
      pendingTasks() {
        return this.tasksOfTheDate.filter(i => !i.done);
      },
      doneTasks() {
        return this.tasksOfTheDate.filter(i => i.done);
      }
    },
    methods: {
      loadTasks(date) {
        this.date = date.fullDate;
        this.tasksOfTheDate = date.tasks ? date.tasks : [];
      }
    },
    created() {
      setTimeout(() => {
          this.preloader = false;
      }, 0);

      this.$nuxt.$on("refreshView", () => {
        this.refreshTrigger = !this.refreshTrigger;
      })
    },
    beforeDestroy() {
      this.$nuxt.$off("refreshView")
    }
}
</script>


<style scoped lang="scss">
  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 15rem;
    margin-bottom: 100rem;
  }
</style>
