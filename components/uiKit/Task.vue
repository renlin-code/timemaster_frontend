<template>
  <li
    @click="closeAllOptions()"
    class="task"
    :class="{
      'task--done': task.done,
      'task--deprecated': deprecated,
      'task--options-left-open': optionsLeftOpen,
      'task--options-right-open': optionsRightOpen,
    }"
  >
    <div class="task__wrapper">
      <Transition name="fade">
        <DotsPreloader class="task__preloader" v-if="pending" :color="finalColor" />
      </Transition>
      <div class="task__default">
        <span class="task__default-icon">
          <flag v-if="task.important" :color="finalColor" />
          <task-circle v-else :color="finalColor" />
        </span>
        <p
          class="task__default-text timemaster-text"
          :class="{
            'task__default-text--swiped': optionsLeftOpen || optionsRightOpen,
            'task__default-text--opacity': pending,
          }"
        >
          {{ task.name }}
        </p>
        <div class="task__default-options task__default-options--left">
          <div class="task__default-options-wrapper">
            <button class="task__default-options-done" @click="toggleDone">
              {{ doneButtonText }}
              <svg
                v-if="!task.done"
                width="9rem"
                height="7rem"
                viewBox="0 0 9 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.0102983 3.5625L0.658026 2.89773L2.90803 5.11364L7.56143 0.477272L8.22621 1.14205L2.90803 6.44318L0.0102983 3.5625Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <div class="task__default-options task__default-options--right">
          <div class="task__default-options-wrapper">
            <button class="task__default-options-edit" @click="editTask">Edit</button>
            <button class="task__default-options-delete" @click="deleteTask">
              Delete
            </button>
          </div>
        </div>
        <span class="task__default-date">
          {{ fullDate }}
        </span>
      </div>
    </div>
  </li>
</template>

<script>
import taskCircle from "../icons/taskCircle.vue";
import flag from "../icons/flag.vue";
import trash from "../icons/trash.vue";
import DotsPreloader from "../preloaders/DotsPreloader.vue";

export default {
  name: "Task",
  components: { taskCircle, flag, trash, DotsPreloader },
  props: {
    color: "",
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    pending: false,
    optionsLeftOpen: false,
    optionsRightOpen: false,
  }),
  computed: {
    fullDate() {
      const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

      const newDate = new Date(this.task.date);
      const day = days[newDate.getDay()];
      const date = newDate.getDate();
      const month = months[newDate.getMonth()];
      const year = newDate.getFullYear();
      return `${day}, ${month}. ${date}, ${year}`;
    },
    deprecated() {
      const todaysDate = new Date().setHours(0, 0, 0, 0);
      const taskDate = new Date(this.task.date).setHours(0, 0, 0, 0);
      return taskDate < todaysDate;
    },
    doneButtonText() {
      return this.task.done ? "Pending" : "Done";
    },
    finalColor() {
      return this.color ? this.color : this.task.category.color;
    },
  },
  methods: {
    swipeHandler() {
      let touchStartX, touchEndX;

      this.$el.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      this.$el.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;

        switch (true) {
          case touchStartX - touchEndX > 100 && !this.optionsLeftOpen:
            this.optionsRightOpen = true;
            break;
          case touchStartX - touchEndX > 100 && this.optionsLeftOpen:
            this.optionsRightOpen = false;
            this.optionsLeftOpen = false;
            break;
          case touchEndX - touchStartX > 100 && !this.optionsRightOpen:
            this.optionsLeftOpen = true;
            break;
          case touchEndX - touchStartX > 100 && this.optionsRightOpen:
            this.optionsRightOpen = false;
            this.optionsLeftOpen = false;
            break;
        }
      });
    },
    async toggleDone() {
      try {
        this.pending = true;
        await this.$axios.$patch(`/profile/my-tasks/${this.task.id}`, {
          done: !this.task.done,
        });
        this.$nuxt.$emit("refreshView");
      } catch (error) {
        console.error(error.response.data.message);
      }
      // this.pending = false;
    },
    editTask() {
      this.$nuxt.$emit("openTasksModal", {
        from: "home",
        edit: true,
        data: {
          ...this.task,
        },
      });
    },
    async deleteTask() {
      try {
        this.pending = true;
        await this.$axios.$delete(`/profile/my-tasks/${this.task.id}`);
        this.$nuxt.$emit("refreshView");
      } catch (error) {
        console.error(error.response.data.message);
      }
      // this.pending = false;
    },
    closeAllOptions() {
      this.optionsLeftOpen = false;
      this.optionsRightOpen = false;
    },
  },

  mounted() {
    this.swipeHandler();
  },
};
</script>

<style scoped lang="scss">
.task {
  width: 100%;
  padding: 0 25rem 4rem;
  overflow-x: hidden;
  &__wrapper {
    position: relative;
    display: flex;
    gap: 40rem;
    transition: transform 360ms ease-in-out;
  }
  &__preloader {
    position: absolute;
    z-index: 1;
    top: calc(50% - 6rem);
    left: calc(50% - 22.25rem);
  }
  &__default {
    position: relative;
    overflow: hidden;
    min-width: 100%;
    background-color: $white;
    padding: 20rem 15rem;
    display: grid;
    grid-template-columns: 20rem auto;
    column-gap: 12rem;
    align-items: center;
    border-radius: 20rem;
    box-shadow: 0rem 2rem 2rem rgba($black, 0.25);
    &-date {
      position: absolute;
      font-family: "Poppins", sans-serif;
      font-size: 12rem;
      line-height: 16rem;
      font-weight: 400;
      letter-spacing: -0.3rem;
      right: 15rem;
      bottom: 2rem;
      color: $light_gray;
    }
    &-icon {
      display: grid;
      place-content: center;
    }
    &-text {
      transition: all 360ms ease-in-out;
      &--swiped {
        color: $dark-gray;
      }
      &--opacity {
        opacity: 0;
      }
    }
    &-options {
      width: 0;
      position: absolute;
      overflow: hidden;
      height: 100%;
      z-index: 1;
      background-color: #ffffff;
      transition: all 320ms ease-in-out;
      &--left {
        box-shadow: inset -2rem 0rem 2rem $main-color;
        border-radius: 0 22rem 22rem 0;
        left: 0;
        .task__default-options-wrapper {
          left: 0;
          min-width: 130rem;
        }
      }
      &--right {
        box-shadow: inset 2rem 0rem 2rem $main-color;
        border-radius: 22rem 0 0 22rem;
        right: 0;
        .task__default-options-wrapper {
          right: 0;
          min-width: 188rem;
        }
      }
      &-wrapper {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10rem;
        height: calc(100% + 4rem);
        top: -2rem;
        button {
          font-family: "Poppins", sans-serif;
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
      &-done {
        background: $main-color;
        border: 2rem solid $main-color;
        color: $white;
        display: flex !important;
        align-items: center;
        gap: 6rem;
      }
      &-edit {
        color: $light-gray;
        border: 2rem solid $main-color;
      }
      &-delete {
        background: #de2424;
        border: 2rem solid #de2424;
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

  &--options-left-open {
    .task__default-options--left {
      width: 130rem;
    }
  }
  &--options-right-open {
    .task__default-options--right {
      width: 50%;
    }
  }

  &--deprecated {
    .task__default-date {
      color: #de2424;
    }
  }
}
</style>
