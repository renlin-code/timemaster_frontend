<template>
  <TransitionGroup name="list" class="tasks-list" tag="ul">
    <Task
      v-for="task in tasks"
      :color="task.category.color"
      :task="task"
      :key="task.id"
    />
  </TransitionGroup>
</template>

<script>
import Task from "../uiKit/Task.vue";

export default {
  name: "TasksList",
  props: {
    tasks: {
      type: Array,
    },
  },
  components: { Task },
};
</script>

<style scoped lang="scss">
.tasks-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15rem;
  margin-bottom: 100rem;
}
</style>
