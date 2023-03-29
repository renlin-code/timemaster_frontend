<template>
  <div>
    <Transition name="fade">
      <FormPreloader v-if="!render" />
    </Transition>
    <div class="calendar" v-if="render">
      <div class="calendar__data">
        <arrow-prev class="calendar__data-prev" color="#777777" @click.native="prev" />
        <span class="timemaster-subtitle">{{ `${computedCurrMonth}, ${currYear}` }}</span>
        <arrow-next class="calendar__data-next" color="#777777" @click.native="next" />
      </div>
      <ol
        class="calendar__grid"
        :class="{
          'calendar__grid--prev': animatePrev,
          'calendar__grid--next': animateNext,
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
            task: monthTasks[i - 1].length !== 0,
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
import FormPreloader from "../preloaders/FormPreloader.vue";

export default {
  name: "MainCalendar",
  components: { arrowPrev, arrowNext, FormPreloader },
  props: {
    trigger: false,
  },
  data: () => ({
    render: false,
    animatePrev: false,
    animateNext: false,

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
  },
  methods: {
    calendarInit() {
      this.date = new Date();
      this.currMonth = this.date.getMonth();
      this.currYear = this.date.getFullYear();
    },
    prev() {
      if (this.currMonth === 0) {
        this.currYear--;
        this.currMonth = 11;
      } else {
        this.currMonth--;
      }
      this.selectedDate = null;

      this.animatePrev = true;
      setTimeout(() => {
        this.animatePrev = false;
      }, 600);
      this.fetchMonthTask();
    },
    next() {
      if (this.currMonth === 11) {
        this.currYear++;
        this.currMonth = 0;
      } else {
        this.currMonth++;
      }
      this.selectedDate = null;

      this.animateNext = true;
      setTimeout(() => {
        this.animateNext = false;
      }, 600);
      this.fetchMonthTask();
    },
    async fetchMonthTask() {
      try {
        this.render = false;
        const month =
          this.currMonth < 9 ? `0${this.currMonth + 1}` : `${this.currMonth + 1}`;
        this.monthTasks = await this.$axios.$get(
          `/profile/month-tasks/${this.currYear}-${month}`
        );
        this.render = true;

        const selected = this.selectedDate;
        this.selectDate(selected);
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    selectDate(date) {
      this.selectedDate = date;

      const month =
        this.currMonth < 9 ? `0${this.currMonth + 1}` : `${this.currMonth + 1}`;
      this.$emit("selectDate", {
        fullDate: `${this.currYear}-${month}-${date}`,
        tasks: this.monthTasks[date - 1],
      });
    },
  },
  watch: {
    selectedDate() {
      this.open = false;
    },
    trigger() {
      this.fetchMonthTask();
    },
  },
  async created() {
    this.calendarInit();
    await this.fetchMonthTask();
    this.selectDate(this.date.getDate());
  },
};
</script>

<style scoped lang="scss">
.calendar {
  border: 2rem solid rgba(217, 217, 217, 0.36);
  border-radius: 30rem;
  overflow: hidden;
  transition: all 360ms ease-in-out;
  &__data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rem 14rem 9rem;
    span {
      color: $main-color;
      letter-spacing: unset;
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
    gap: 18rem;
    padding: 12rem;
    place-items: center;
    transition: all 320ms ease-in-out;
    &--prev {
      animation-name: prev;
      animation-duration: 600ms;
      animation-iteration-count: 1;
      @keyframes prev {
        100% {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    }
    &--next {
      animation-name: next;
      animation-duration: 600ms;
      animation-iteration-count: 1;
      @keyframes next {
        100% {
          transform: translateX(-100%);
          opacity: 0;
        }
      }
    }
  }
  &__week-day {
    font-size: 10rem;
    line-height: 12.5rem;
    font-family: "Poppins", sans-serif;
    color: $dark-gray;

    &:first-child {
      color: #de2424;
    }
  }
  &__date {
    width: 100%;
    height: 100%;
    font-size: 18rem;
    line-height: 27rem;
    font-family: "Poppins", sans-serif;
    display: grid;
    place-content: center;
    border-radius: 5rem;
    border: 2rem solid transparent;
    transition: all 360ms ease-in-out;

    &.out {
      color: $dark-gray;
    }
    &.task {
      border-color: $main-color;
    }
    &.current {
      background: rgba(197, 226, 244, 0.3);
    }
    &.selected {
      background-color: rgba(245, 128, 94, 0.8);
      color: $white;
    }
  }
}
</style>
