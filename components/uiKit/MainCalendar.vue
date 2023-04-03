<template>
  <div class="calendar">
    <SimplePreloader class="calendar__preloader" v-if="pending" />
    <div class="calendar__calendar">
      <div class="calendar__data">
        <arrow-prev class="calendar__data-prev" color="#777777" @click.native="prev" />
        <span
          class="calendar__data-date timemaster-subtitle"
          :class="{ 'calendar__data-date--opacity': opacity }"
        >
          {{ `${computedCurrMonth}, ${currYear}` }}
        </span>
        <arrow-next class="calendar__data-next" color="#777777" @click.native="next" />
      </div>
      <ol
        class="calendar__grid"
        :class="{
          'calendar__grid--opacity': opacity,
        }"
      >
        <li class="calendar__week-day">SU</li>
        <li class="calendar__week-day">MO</li>
        <li class="calendar__week-day">TU</li>
        <li class="calendar__week-day">WE</li>
        <li class="calendar__week-day">TH</li>
        <li class="calendar__week-day">FR</li>
        <li class="calendar__week-day">SA</li>

        <li class="calendar__date out" v-for="i in firstDayOfMonth" @click="prev">
          {{ (firstDayOfMonth - lastDateOfLastMonth - i) * -1 }}
        </li>

        <li
          class="calendar__date"
          v-for="i in lastDateOfMonth"
          :class="{
            current:
              i === date.getDate() &&
              currMonth === new Date().getMonth() &&
              currYear === new Date().getFullYear(),
            selected: i === selectedDate,
            task: tasksStack[i - 1],
          }"
          @click="selectDate(i)"
        >
          {{ i }}
        </li>

        <li class="calendar__date out" v-for="i in 6 - lastDayOfMonth" @click="next">
          {{ i }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import arrowPrev from "../icons/arrowPrev.vue";
import arrowNext from "../icons/arrowNext.vue";
import SimplePreloader from "../preloaders/SimplePreloader.vue";

export default {
  name: "MainCalendar",
  components: { arrowPrev, arrowNext, SimplePreloader },
  data: () => ({
    pending: true,
    opacity: true,

    monthTasks: [],
    date: null,
    currMonth: null,
    currYear: null,

    selectedDate: null,
  }),
  computed: {
    firstDayOfMonth() {
      return new Date(this.currYear, this.currMonth, 1).getDay();
    },
    lastDateOfMonth() {
      return new Date(this.currYear, this.currMonth + 1, 0).getDate();
    },
    lastDayOfMonth() {
      return new Date(this.currYear, this.currMonth, this.lastDateOfMonth).getDay();
    },
    lastDateOfLastMonth() {
      return new Date(this.currYear, this.currMonth, 0).getDate();
    },

    computedCurrMonth() {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[this.currMonth];
    },
    tasksStack() {
      let stack = [];
      for (let i = 1; i <= this.lastDateOfMonth; i++) {
        const date = i < 10 ? `0${i}` : `${i}`;
        stack.push(this.monthTasks.some((task) => task.date.slice(-2) == date));
      }
      return stack;
    },
  },
  methods: {
    calendarInit() {
      this.date = new Date();
      this.currMonth = this.date.getMonth();
      this.currYear = this.date.getFullYear();
    },
    async fetchMonthTask(currMonth, currYear, lastDateOfMonth) {
      try {
        setTimeout(() => {
          this.pending = this.opacity;
        }, 600);

        const month = currMonth < 9 ? `0${currMonth + 1}` : `${currMonth + 1}`;
        this.monthTasks = await this.$axios.$get(
          `/profile/my-tasks/?from=${currYear}-${month}-01&to=${currYear}-${month}-${lastDateOfMonth}`
        );
        this.opacity = false;
        this.currMonth = currMonth;
        this.currYear = currYear;
      } catch (error) {
        console.error(error.response.data.message);
      }
      this.pending = false;
    },
    filterDateTasks(date) {
      const dateTasks = [];
      this.monthTasks.forEach((task) => {
        const taskDate = task.date.slice(-2);
        if (date == taskDate) {
          dateTasks.push(task);
        }
      });
      return dateTasks;
    },

    async prev() {
      this.opacity = true;
      let currMonth, currYear, lastDateOfMonth;

      if (this.currMonth === 0) {
        currYear = this.currYear - 1;
        currMonth = 11;
      } else {
        currYear = this.currYear;
        currMonth = this.currMonth - 1;
      }
      lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
      this.selectedDate = null;

      await this.fetchMonthTask(currMonth, currYear, lastDateOfMonth);
    },
    async next() {
      this.opacity = true;
      let currMonth, currYear, lastDateOfMonth;

      if (this.currMonth === 11) {
        currYear = this.currYear + 1;
        currMonth = 0;
      } else {
        currYear = this.currYear;
        currMonth = this.currMonth + 1;
      }
      lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate();
      this.selectedDate = null;

      await this.fetchMonthTask(currMonth, currYear, lastDateOfMonth);
    },
    selectDate(date) {
      this.selectedDate = date;
      const dateTasks = this.filterDateTasks(date);

      const formatedMonth =
        this.currMonth < 9 ? `0${this.currMonth + 1}` : `${this.currMonth + 1}`;
      const formatedDate =
        this.selectedDate < 10 ? `0${this.selectedDate}` : `${this.selectedDate}`;
      this.$emit("selectDate", {
        fullDate: `${this.currYear}-${formatedMonth}-${formatedDate}`,
        tasks: dateTasks,
      });
      setTimeout(() => {
        this.$nuxt.$emit("resize");
      }, 500);
    },
    async refresh() {
      const selectedDate = this.selectedDate;
      await this.fetchMonthTask(this.currMonth, this.currYear, this.lastDateOfMonth);
      this.selectedDate = selectedDate;
      this.selectDate(this.selectedDate);
    },
  },
  created() {
    this.calendarInit();
  },
  mounted() {
    console.log(this.date);
    this.selectDate(this.date.getDate());
    this.refresh();

    this.$nuxt.$on("refreshView", () => {
      console.log("REFRESH");
      this.refresh();
    });
  },
};
</script>

<style scoped lang="scss">
.calendar {
  // height: 292rem;
  position: relative;
  &__preloader {
    margin: 0 auto;
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &__calendar {
    border: 2rem solid rgba(217, 217, 217, 0.36);
    border-radius: 30rem;
    overflow: hidden;
    background: #ffffff;
    transition: all 320ms ease-in-out;
  }
  &__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rem 14rem 0;
    span {
      color: $main-color;
      letter-spacing: unset;
    }
    &-date {
      transition: all 320ms ease-in-out;
      &--opacity {
        opacity: 0;
      }
    }
    &-prev,
    &-next {
      display: grid;
      place-content: center;
    }
  }
  &__grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 16rem;
    column-gap: 24rem;
    padding: 12rem;
    place-items: center;
    transition: all 320ms ease-in-out;
    &--opacity {
      opacity: 0;
    }
    // &--prev {
    //   animation-name: prev;
    //   animation-duration: 800ms;
    //   animation-iteration-count: 1;
    //   @keyframes prev {
    //     49% {
    //       transform: translateX(100%);
    //     }
    //     51% {
    //       transform: translateX(-100%);
    //       opacity: 0;
    //     }
    //     100% {
    //       transform: translateX(0);
    //     }
    //   }
    // }
    // &--next {
    //   animation-name: next;
    //   animation-duration: 800ms;
    //   animation-iteration-count: 1;
    //   @keyframes next {
    //     49% {
    //       transform: translateX(-100%);
    //     }
    //     51% {
    //       transform: translateX(100%);
    //       opacity: 0;
    //     }
    //     100% {
    //       transform: translateX(0);
    //     }
    //   }
    // }
  }
  &__week-day {
    font-size: 10rem;
    font-family: "Poppins", sans-serif;
    color: $dark-gray;
    margin-bottom: 4rem;

    &:first-child {
      color: #de2424;
    }
  }
  &__date {
    width: 100%;
    height: 100%;
    font-size: 14rem;
    font-family: "Poppins", sans-serif;
    display: grid;
    place-content: center;
    border-radius: 5rem;
    border: 2rem solid transparent;
    transition: all 300ms ease-in-out;

    &.out {
      color: $dark-gray;
    }
    &.task {
      border-color: $main-color;
    }
    &.current {
      background: rgba(57, 216, 244, 0.5);
    }
    &.selected {
      background-color: rgba(245, 128, 94, 0.8);
      color: $white;
    }
  }
}
</style>
