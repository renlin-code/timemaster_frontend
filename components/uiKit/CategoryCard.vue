<template>
  <transition name="scale">
    <div class="category-card">
      <div v-if="extended" class="category-card__top">
        <categories :color="category.color" />
        <edit />
      </div>
      <h2 class="category-card__title timemaster-subtitle">{{ category.name }}</h2>
      <span class="category-card__tasks timemaster-caption">{{ computedTaskCount }}</span>
      <div class="category-card__progress">
        <div class="category-card__progress-inner"
          :style="`background-color: ${category.color}; width: ${progressBarWidth}`"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script>
import categories from '../icons/categories.vue';
import edit from '../icons/edit.vue';

export default {
  name: "CategoryCard",
  components: {categories, edit},
  props: {
    extended: {
      type: Boolean,
      default: false
    },
    category: {
      type: Object,
      default:() => ({})
    }
  },
  computed: {
    computedTaskCount() {
      const tasks = this.category.tasks;
      const totalTasks = tasks.length;
      const totalDoneTasks = tasks.filter(task => task.done == true).length;
      if(totalTasks === 0) {
        return "0 tasks"
      } else {
        if(totalDoneTasks === 1) {
          return `${totalDoneTasks} done task of ${totalTasks}`
        } else {
          return `${totalDoneTasks} done tasks of ${totalTasks}`
        }
      }
    },
    progressBarWidth() {
      const tasks = this.category.tasks;
      const totalTasks = tasks.length;
      const totalDoneTasks = tasks.filter(task => task.done == true).length;
      return `${(totalDoneTasks * 100) / totalTasks}%`;
    }
  }
}
</script>

<style scoped lang="scss">
  .category-card {
    background-color: #FFFFFF;
    padding: 15rem 20rem 21rem 20rem;
    border-radius: 20rem;
    box-shadow: 0rem 2rem 2rem rgba($black, 0.25);
    &__top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 7rem;
    }
    &__title {
      margin-bottom: 2rem;
    }
    &__tasks {
      display: inline-block;
      color: $dark-gray;
      margin-bottom: 18rem;
    }
    &__progress {
        position: relative;
        filter: drop-shadow(0rem 1rem 1rem rgba($black, 0.25));
        width: 100%;
        height: 10rem;
        border-radius: 20rem;
        background-color: $white;
        overflow: hidden;
        &-inner {
          position: absolute;
          left: 0;
          height: 100%;
          border-radius: 20rem;
          box-shadow: 0rem 1rem 1rem rgba($black, 0.25);
        }
    }
  }
</style>
