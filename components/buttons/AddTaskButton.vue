<template>
  <div class="add-task"
    :class="{'add-task--animated' : animated}"
  >
    <button class="add-task__button">
      <div class="add-task__button-cross">
        <div class="add-task__button-cross-line"></div>
        <div class="add-task__button-cross-line"></div>
      </div>
    </button>

    <div v-if="animated" class="add-task__cta-wrapper">
      <div class="add-task__cta-inner">
        <span class="timemaster-subtitle">Add new task</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTaskButton",
  props: {
    animated: {
      type: Boolean,
      default: false
    }
  }
}

</script>
<style scoped lang="scss">
  .add-task {
    position: relative;
    cursor: pointer;
    width: 80rem;
    height: 80rem;
    border-radius: 35rem;
    z-index: 0;
    &__button {
      position: absolute;
      right: 0;
      width: 78rem;
      height: 78rem;
      border-radius: 50%;
      background-color: $main-color;
      display: grid;
      place-content: center;
      z-index: 1;
      transform-origin: center;
      box-shadow: 0px 2rem 2rem rgba(0, 0, 0, 0.25);
      &-cross {
        width: 28rem;
        height: 28rem;
        position: relative;
        &-line {
          background-color: #ffffff;
          position: absolute;
          border-radius: 3rem;
          &:first-child {
            top: 12.5rem;
            left: 0;
            width: 28rem;
            height: 3rem;
          }
          &:last-child {
            top: 0;
            left: 12.5rem;
            width: 3rem;
            height: 28rem;
          }
        }

      }
    }
    &__cta {
      &-wrapper {
        position: absolute;
        overflow: hidden;
        top: -5rem;
        right: 34rem;
        width: 234rem;
        height: 88rem;
        padding: 10rem 0 10rem 10rem;
        z-index: -1;
      }
      &-inner {
        width: 255rem;
        height: 68rem;
        padding: 19rem 0 19rem 35rem;
        background-color: #ffffff;
        border-radius: 30rem;
        transform: translateX(120%);
        box-shadow: 0px 2rem 2rem rgba(0, 0, 0, 0.25);
        span {
          color: $dark-gray;
        }
      }
    }

    &--animated {
      width: 269rem;
      .add-task {
        &__button {
          animation-name: button;
          animation-duration: 4s;
          animation-iteration-count: infinite;
        }
        &__cta-inner {
          animation-name: cta;
          animation-duration: 4s;
          animation-iteration-count: infinite;
        }
      }
    }

    @keyframes button {
      4% {
        transform: rotate(-30deg);
      }
      12% {
        transform: rotate(30deg);
      }
      16% {
        transform: rotate(0deg);
      }
    }
    @keyframes cta {
      10%, 50% {
        transform: translateX(0);
      }
      60% {
        transform: translateX(120%);
      }
    }

  }
</style>
