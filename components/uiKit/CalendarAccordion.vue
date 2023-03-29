<template>
  <div class="calendar-accordion" :class="{ 'calendar-accordion--open': open }">
    <div class="calendar-accordion__head" @click="open = !open">
      <calendar class="calendar-accordion__head-icon" color="#F5805E" />
      <span class="timemaster-subtitle">Choose date</span>
    </div>

    <div class="calendar-accordion__body">
      <div class="calendar-accordion__data">
        <arrow-prev class="calendar-accordion__data-prev" @click.native="prev" />
        <span class="timemaster-subtitle">{{ `${computedCurrMonth}, ${currYear}` }}</span>
        <arrow-next class="calendar-accordion__data-next" @click.native="next" />
      </div>
      <ol
        class="calendar-accordion__grid"
        :class="{
          'calendar-accordion__grid--prev': animatePrev,
          'calendar-accordion__grid--next': animateNext,
        }"
      >
        <li class="calendar-accordion__week-day">SU</li>
        <li class="calendar-accordion__week-day">MO</li>
        <li class="calendar-accordion__week-day">TU</li>
        <li class="calendar-accordion__week-day">WE</li>
        <li class="calendar-accordion__week-day">TH</li>
        <li class="calendar-accordion__week-day">FR</li>
        <li class="calendar-accordion__week-day">SA</li>

        <li
          class="calendar-accordion__date out"
          v-for="i in firstDayOfMonth"
          @click="prev"
        >
          {{ (firstDayOfMonth - lastDateOfLastMonth - i) * -1 }}
        </li>

        <li
          class="calendar-accordion__date"
          v-for="i in lastDateOfMonth"
          :class="{
            current:
              i === date.getDate() &&
              currMonth === new Date().getMonth() &&
              currYear === new Date().getFullYear(),
            selected: i === selectedDate,
          }"
          @click="selectDate(i)"
        >
          {{ i }}
        </li>

        <li
          class="calendar-accordion__date out"
          v-for="i in 6 - lastDayOfMonth"
          @click="next"
        >
          {{ i }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import calendar from "../icons/calendar.vue";
import arrowPrev from "../icons/arrowPrev.vue";
import arrowNext from "../icons/arrowNext.vue";

export default {
  name: "CalendarAccordion",
  components: { calendar, arrowPrev, arrowNext },
  data: () => ({
    open: false,

    animatePrev: false,
    animateNext: false,

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
      }, 1000);
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
      }, 800);
    },
    selectDate(date) {
      this.selectedDate = date;

      const formatedMonth =
        this.currMonth < 9 ? `0${this.currMonth + 1}` : this.currMonth + 1;
      const formatedDate =
        this.selectedDate < 10 ? `0${this.selectedDate}` : this.selectedDate;
      this.$emit("selectDate", `${this.currYear}-${formatedMonth}-${formatedDate}`);
    },
  },
  watch: {
    selectedDate() {
      // this.open = false;
    },
  },

  created() {
    this.calendarInit();
  },
};
</script>

<style scoped lang="scss">
.calendar-accordion {
  width: 300rem;
  margin: 0 auto;
  overflow: hidden;
  background: #ffffff;
  border-radius: 30rem;
  box-shadow: 0 2rem 2rem rgba($black, 0.25);
  &__head {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10rem;
    padding: 20rem 0;

    span {
      color: $dark-gray;
    }
    &-icon {
      display: grid;
      place-content: center;
    }
  }
  &__body {
    opacity: 0;
    max-height: 0;
    transition: all 360ms ease-in-out;
    border-top: 1px solid rgba($dark-gray, 0.5);
  }
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
      animation-duration: 800ms;
      animation-iteration-count: 1;
      @keyframes prev {
        49% {
          transform: translateX(100%);
          // opacity: 0;
        }
        51% {
          transform: translateX(-100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
        }
      }
    }
    &--next {
      animation-name: next;
      animation-duration: 800ms;
      animation-iteration-count: 1;
      @keyframes next {
        49% {
          transform: translateX(-100%);
          // opacity: 0;
        }
        51% {
          transform: translateX(100%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
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
    font-family: "Poppins", sans-serif;
    display: grid;
    place-content: center;
    border-radius: 5rem;
    border: 1px solid #ffffff;
    transition: all 360ms ease-in-out;

    &.out {
      color: $dark-gray;
    }
    &.current {
      background: rgba(197, 226, 244, 0.3);
    }
    &.selected {
      background-color: rgba(245, 128, 94, 0.8);
      color: $white;
    }
  }

  &--open {
    .calendar-accordion__body {
      opacity: 1;
      max-height: 400rem;
    }
  }
}
</style>
