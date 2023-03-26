<template>
  <div class="inner-page-layout">
    <div
      class="inner-page-layout__bg"
      :class="{ 'inner-page-layout__bg--blur': blur }"
    ></div>

    <div class="inner-page-layout__content">
      <h1 class="inner-page-layout__title timemaster-title main-content-wrapper">
        <slot name="title" />
      </h1>

      <div
        class="inner-page-layout__static-block"
        :class="{ 'inner-page-layout__static-block--empty': !staticContentHeight }"
        :style="`height: ${staticContentHeight}rem;`"
      >
        <slot name="static-content" />
        <div class="tabs__head main-content-wrapper">
          <ul class="tabs__head-inner">
            <li
              class="tabs__head-tab timemaster-subtitle"
              v-for="name in tabsNames"
              :class="{ selected: selected === tabsNames.indexOf(name) }"
              @click="selectTab(tabsNames.indexOf(name))"
            >
              {{ name }}
            </li>
          </ul>
        </div>
      </div>

      <div
        class="inner-page-layout__scroll-block"
        :style="`height: calc(100vh - 214rem - ${staticContentHeight}rem);`"
      >
        <div class="tabs__body">
          <div class="tabs__body-slider">
            <div class="tabs__body-slide" v-for="numb in tabsNames.length">
              <slot :name="`tab${numb}`" />
            </div>
          </div>
        </div>
      </div>

      <div class="inner-page-layout__button">
        <slot name="button" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InnerPage",
  props: {
    staticContentHeight: {
      type: Number,
      default: 0,
    },
    tabsNames: {
      type: Array,
    },
    tabsLengths: {
      type: Array,
    },
  },
  data: () => ({
    selected: 0,
    flkty: null,
  }),
  methods: {
    selectTab(index) {
      this.selected = index;
      this.flkty.select(index, false, false);
    },
    flickityInit() {
      this.flkty = new Flickity(".tabs__body-slider", {
        draggable: false,
        prevNextButtons: false,
        pageDots: false,
        adaptiveHeight: true,
      });
    },
  },
  computed: {
    blur() {
      return this.tabsLengths[this.selected] !== 0;
    },
  },
  created() {
    this.$nuxt.$on("refreshView", () => {
      console.log("REFRESH");
      this.flkty.resize();
    });
  },
  mounted() {
    this.flickityInit();
    this.selectTab(0);
  },
  beforeDestroy() {
    this.$nuxt.$off("refreshView");
  },
};
</script>

<style scoped lang="scss">
.inner-page-layout {
  position: relative;
  &__bg {
    left: calc(50% - 160rem);
    top: 390rem;
    width: 320rem;
    height: 320rem;
    position: absolute;
    background-image: url("~/static/img/background-figure.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: all 320ms ease-in-out;
    &--blur {
      filter: blur(25rem);
    }
  }
  &__content {
    position: absolute;
    width: 100%;
  }
  &__title {
    margin-bottom: 34rem;
  }
  &__static-block {
    &::v-deep > h2 {
      margin-bottom: 13rem;
      color: $dark-gray;
      padding: 0 25rem;
    }
    &--empty {
      display: none;
    }
  }
  &__scroll-block {
    overflow-y: scroll;
    margin-top: 20rem;
    padding-bottom: 27rem;
  }
  &__button {
    position: absolute;
    bottom: 27rem;
    right: 25rem;
  }
}

.tabs {
  &__head {
    margin-top: 40rem;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &-inner {
      width: max-content;
      display: flex;
      gap: 22rem;
    }
    &-tab {
      color: $dark-gray;
      border-bottom: 2rem solid transparent;
      transition: border-color 320ms ease-in-out;
      &.selected {
        border-color: $main-color;
      }
    }
  }
  &__body {
    margin-top: 20rem;
    &-slide {
      width: 100%;
      opacity: 0;
      transition: opacity 0.5s;
      &.is-selected {
        opacity: 1 !important;
      }
    }
  }
}
</style>
