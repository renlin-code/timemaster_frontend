<template>
  <div class="category-card">
    <div v-if="extended" class="category-card__top">
      <categories :color="category.color" />
      <edit
        @click.native="editCategory"
      />
    </div>
    <h2 class="category-card__title timemaster-subtitle">{{ category.name }}</h2>
    <span class="category-card__tasks timemaster-caption">{{ taskCount }}</span>
    <span class="category-card__tasks-deprecated">{{ deprecatedTaskCount }}</span>
    <div class="category-card__progress"
      :style="`background-color: ${category.color}`"
    >
      <div class="category-card__progress-opacity"></div>
      <div class="category-card__progress-inner"
        :style="`background-color: ${category.color}; width: ${progressBarWidth}`"
      ></div>
    </div>
  </div>
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
    taskCount() {
      const tasks = this.category.tasks;
      const totalTasks = tasks.length;
      const totalDoneTasks = tasks.filter(task => task.done).length;
      if(totalTasks === 0) {
        return "No tasks"
      } else {
        if(totalDoneTasks === 1) {
          return `${totalDoneTasks} done task of ${totalTasks}`
        } else {
          return `${totalDoneTasks} done tasks of ${totalTasks}`
        }
      }
    },
    deprecatedTaskCount() {
      const tasks = this.category.tasks;
      const unDoneTasks = tasks.filter(task => !task.done);
      const totalDeprecatedTasks = unDoneTasks.filter(i => {
        const todaysDate = new Date().setHours(0,0,0,0);
        const taskDate = new Date(i.date).setHours(0,0,0,0);
        if(taskDate < todaysDate) {
          return i;
        }
      }).length;

      if(totalDeprecatedTasks === 0) {
        return ""
      } else {
        if(totalDeprecatedTasks === 1) {
          return `${totalDeprecatedTasks} deprecated task`
        } else {
          return `${totalDeprecatedTasks} deprecated tasks`
        }
      }
    },
    progressBarWidth() {
      const tasks = this.category.tasks;
      const totalTasks = tasks.length;
      const totalDoneTasks = tasks.filter(task => task.done == true).length;
      return `${(totalDoneTasks * 100) / totalTasks}%`;
    }
  },
  methods: {
    editCategory() {
      this.$nuxt.$emit("openCategoryModal", this.category.id);
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
      margin-bottom: 8rem;
    }
    &__tasks {
      display: block;
      color: $dark-gray;
      margin-bottom: 3rem;
      &-deprecated {
        display: block;
        font-family: 'Poppins', sans-serif;
        font-size: 12rem;
        line-height: 18rem;
        font-weight: 400;
        letter-spacing: -0.3rem;
        color: #DE2424;
        margin-bottom: 7rem;
        min-height: 18rem;
      }
    }
    &__progress {
        position: relative;
        filter: drop-shadow(0rem 1rem 1rem rgba($black, 0.25));
        width: 100%;
        height: 10rem;
        border-radius: 20rem;
        overflow: hidden;
        &-opacity {
          position: absolute;
          left: -2rem;
          top: -2rem;
          height: 150%;
          width: 150%;
          border: none;
          background-color: rgba($white, 0.8);
        }
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
