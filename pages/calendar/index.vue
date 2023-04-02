<template>
  <section class="calendar">
    <InnerTabbedPage
      :staticContentHeight="415"
      :tabsNames="['Tasks for this day', 'Done']"
      :tabsLengths="tabsLengths"
    >
      <template #title> Calendar </template>

      <template #static-content>
        <div class="calendar__calendar main-content-wrapper">
          <MainCalendar @selectDate="loadTasks" />
        </div>
      </template>

      <template #tab1>
        <TransitionGroup name="list" class="tasks-list" tag="ul">
          <Task
            v-for="task in pendingTasks"
            :color="task.category.color"
            :task="task"
            :key="task.id"
          />
        </TransitionGroup>
      </template>

      <template #tab2>
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
          :animated="tasksOfTheDate.length === 0"
          @addTask="
            $nuxt.$emit('openTasksModal', {
              from: 'calendar',
              edit: false,
              data: {
                date: '',
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
import InnerTabbedPage from "~/components/layout/InnerTabbedPage.vue";
import MainCalendar from "~/components/uiKit/MainCalendar.vue";
import Task from "~/components/uiKit/Task.vue";

export default {
  name: "IndexPage",
  layout: "inner",
  components: { MainCalendar, AddTaskButton, Task, InnerTabbedPage },
  data: () => ({
    tasksOfTheDate: [],
    date: null,
  }),
  computed: {
    pendingTasks() {
      return this.tasksOfTheDate.filter((i) => !i.done);
    },
    doneTasks() {
      return this.tasksOfTheDate.filter((i) => i.done);
    },
    tabsLengths() {
      return [this.pendingTasks.length, this.doneTasks.length];
    },
  },
  methods: {
    loadTasks(date) {
      this.date = date.fullDate;
      this.tasksOfTheDate = date.tasks ? date.tasks : [];
      console.log("PAGE DATE", date);
    },
  },
};
</script>

<style scoped lang="scss">
.calendar__calendar {
  height: 342rem;
}
</style>
