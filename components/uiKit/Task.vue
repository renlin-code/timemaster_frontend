<template>
  <li class="task"
    :class="{
      'task--done': task.done,
      'task--deprecated': false,
      'task--options-open': optionsOpen
      }"
  >
    <div class="task__wrapper">
      <div class="task__default">
        <span class="task__default-icon"
          @click="toggleDone"
        >
          <flag
            v-if="task.important"
            :color="task.category.color" />
          <task-circle v-else
            :color="task.category.color" />
        </span>
        <p class="task__default-text timemaster-text"
        >{{ task.name }}</p>
        <div class="task__default-options">
          <div class="task__default-options-wrapper">
            <button class="task__default-options-edit"
              @click="editTask"
            >
              Edit
            </button>
            <button class="task__default-options-delete"
              @click="deleteTask"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import taskCircle from '../icons/taskCircle.vue';
import flag from '../icons/flag.vue';
import trash from '../icons/trash.vue';

export default {
  name: "Task",
  components: {taskCircle, flag, trash},
  props: {
    task: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    optionsOpen: false
  }),
  methods: {
    swipeHandler() {
      let touchStartX, touchEndX;

      this.$el.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      })

      this.$el.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;

        if (touchStartX - touchEndX  > 100) {
          this.optionsOpen = true;
        } else {
          this.optionsOpen = false;
        }
      })
    },
    async toggleDone() {
      try {
        await this.$axios.$patch(`/profile/my-tasks/${this.task.id}`, {
        done: !this.task.done
        })
        this.$nuxt.$emit("refreshHome");
      } catch (error) {
        console.error(error.response.data.message)
      }
    },
    editTask() {
      this.$nuxt.$emit("openTaskModalFromHome", this.task.id);
    },
    async deleteTask() {
      try {
        await this.$axios.$delete(`/profile/my-tasks/${this.task.id}`)
        this.$nuxt.$emit("refreshHome");
      } catch (error) {
        console.error(error.response.data.message)
      }
    }
  },
  mounted() {
    this.swipeHandler();
  }
}
</script>

<style scoped lang="scss">
  .task {
    width: 100%;
    padding: 0 25rem 4rem;
    overflow-x: hidden;
    &__wrapper {
      display: flex;
      gap: 40rem;
      transition: transform 360ms ease-in-out;
    }
    &__default {
      position: relative;
      overflow: hidden;
      min-width: 100%;
      background-color: $white;
      padding: 15rem;
      display: grid;
      grid-template-columns: 20rem auto;
      column-gap: 12rem;
      align-items: center;
      border-radius: 20rem;
      box-shadow: 0rem 2rem 2rem rgba( $black, 0.25);
      &-icon {
        display: grid;
        place-content: center;
      }
      &-text {
        transition: all 360ms ease-in-out;
      }
      &-options {
        width: 0;
        position: absolute;
        overflow: hidden;
        right: 0;
        height: 100%;
        background-color: #ffffff;
        box-shadow: inset 2rem 0rem 2rem $main-color;
        border-radius: 22rem 0 0 22rem;
        transition: all 320ms ease-in-out;
        &-wrapper {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10rem;
          height: calc(100% + 4rem);
          top: -2rem;
          right: 0;
          min-width: 188rem;
          button {
            font-family: 'Poppins', sans-serif;
            font-size: 12rem;
            line-height: 18rem;
            font-weight: 400;
            letter-spacing: -0.3rem;
            border-radius: 30rem;
            min-width: 63rem;
            height: 32rem;
            display: grid;
            place-content: center;
          }
        }
        &-edit {
          border: 2rem solid $main-color;
          color: $light-gray;
        }
        &-delete {
          background: #DE2424;
          border: 2rem solid #DE2424;
          color: $white;
        }
      }
    }

    &--done {
      .task__default-text {
        text-decoration-line: line-through;
        opacity: 0.6;
        color: $dark-gray;
      }
    }

    &--options-open {
      .task__default-options {
        width: 50%;
      }
    }

    &--deprecated {
      .task__default-text {
        color: #DE2424;
      }
    }
  }
</style>
