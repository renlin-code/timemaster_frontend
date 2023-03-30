<template>
  <div class="categories-accordion" :class="{ 'categories-accordion--open': open }">
    <div class="categories-accordion__head" @click="open = !open">
      <categories class="categories-accordion__head-icon" color="#F5805E" />
      <span class="timemaster-subtitle">Categories</span>
    </div>
    <div class="categories-accordion__body">
      <ul class="categories-accordion__body-categories">
        <li
          class="categories-accordion__body-category"
          :class="{ selected: selected === categories.indexOf(category) }"
          v-for="category in categories"
          @click="select(category)"
        >
          <category-circle
            :color="category.color"
            class="categories-accordion__body-icon"
          />
          <span class="timemaster-text">{{ category.name }}</span>
        </li>
      </ul>

      <div
        class="categories-accordion__sub-accordion"
        :class="{ 'categories-accordion__sub-accordion--open': subAccordionOpen }"
      >
        <div
          class="categories-accordion__sub-accordion-head timemaster-text"
          @click="subAccordionOpen = !subAccordionOpen"
        >
          <svg
            width="19rem"
            height="19rem"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.86275 2.13751C9.86275 1.7233 9.52696 1.38751 9.11275 1.38751C8.69854 1.38751 8.36275 1.7233 8.36275 2.13751V9.25002H1.25C0.835787 9.25002 0.5 9.58581 0.5 10C0.5 10.4142 0.835787 10.75 1.25 10.75H8.36275V17.8625C8.36275 18.2767 8.69854 18.6125 9.11275 18.6125C9.52696 18.6125 9.86275 18.2767 9.86275 17.8625V10.75H16.9749C17.3892 10.75 17.7249 10.4142 17.7249 10C17.7249 9.58581 17.3892 9.25002 16.9749 9.25002H9.86275V2.13751Z"
              fill="#777777"
            />
            <path
              d="M8.36275 9.25002V9.75002H8.86275V9.25002H8.36275ZM8.36275 10.75H8.86275V10.25H8.36275V10.75ZM9.86275 10.75V10.25H9.36275V10.75H9.86275ZM9.86275 9.25002H9.36275V9.75002H9.86275V9.25002ZM9.11275 1.88751C9.25082 1.88751 9.36275 1.99944 9.36275 2.13751H10.3628C10.3628 1.44716 9.80311 0.887512 9.11275 0.887512V1.88751ZM8.86275 2.13751C8.86275 1.99944 8.97468 1.88751 9.11275 1.88751V0.887512C8.42239 0.887512 7.86275 1.44716 7.86275 2.13751H8.86275ZM8.86275 9.25002V2.13751H7.86275V9.25002H8.86275ZM1.25 9.75002H8.36275V8.75002H1.25V9.75002ZM1 10C1 9.86195 1.11193 9.75002 1.25 9.75002V8.75002C0.559645 8.75002 0 9.30967 0 10H1ZM1.25 10.25C1.11193 10.25 1 10.1381 1 10H0C0 10.6904 0.559644 11.25 1.25 11.25V10.25ZM8.36275 10.25H1.25V11.25H8.36275V10.25ZM8.86275 17.8625V10.75H7.86275V17.8625H8.86275ZM9.11275 18.1125C8.97468 18.1125 8.86275 18.0005 8.86275 17.8625H7.86275C7.86275 18.5528 8.42239 19.1125 9.11275 19.1125V18.1125ZM9.36275 17.8625C9.36275 18.0005 9.25082 18.1125 9.11275 18.1125V19.1125C9.80311 19.1125 10.3628 18.5528 10.3628 17.8625H9.36275ZM9.36275 10.75V17.8625H10.3628V10.75H9.36275ZM16.9749 10.25H9.86275V11.25H16.9749V10.25ZM17.2249 10C17.2249 10.1381 17.113 10.25 16.9749 10.25V11.25C17.6653 11.25 18.2249 10.6904 18.2249 10H17.2249ZM16.9749 9.75002C17.113 9.75002 17.2249 9.86195 17.2249 10H18.2249C18.2249 9.30967 17.6653 8.75002 16.9749 8.75002V9.75002ZM9.86275 9.75002H16.9749V8.75002H9.86275V9.75002ZM9.36275 2.13751V9.25002H10.3628V2.13751H9.36275Z"
              fill="#777777"
            />
          </svg>
          Add new category
        </div>
        <div class="categories-accordion__sub-accordion-body">
          <div class="categories-accordion__sub-accordion-name">
            <label class="timemaster-caption">Name the category:</label>
            <input type="text" v-model="newCategoryData.name" maxlength="10" />
            <span
              class="categories-accordion__sub-accordion-error"
              v-if="showError.name"
              :class="{
                'categories-accordion__sub-accordion-error--shake': animateErrorName,
              }"
            >
              You need to name the category
            </span>
          </div>
          <div class="categories-accordion__sub-accordion-color">
            <label class="timemaster-caption">Pick a color:</label>
            <ColorPicker
              class="categories-accordion__sub-accordion-color-picker"
              @selectColor="selectColor"
            />
            <span
              class="categories-accordion__sub-accordion-error"
              v-if="showError.color"
              :class="{
                'categories-accordion__sub-accordion-error--shake': animateErrorColor,
              }"
            >
              You need to pick a color
            </span>
          </div>

          <MainButton v-if="!pending" @click.native="submitNewCategory">Ok</MainButton>
          <SimplePreloader
            class="categories-accordion__sub-accordion-preloader"
            v-if="pending"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from "../buttons/MainButton.vue";
import categories from "../icons/categories.vue";
import categoryCircle from "../icons/categoryCircle.vue";
import SimplePreloader from "../preloaders/SimplePreloader.vue";
import ColorPicker from "./ColorPicker.vue";

export default {
  name: "CategoriesAccordion",
  components: { categories, categoryCircle, ColorPicker, MainButton, SimplePreloader },
  data: () => ({
    categories: [],
    selected: null,
    open: false,
    subAccordionOpen: false,

    newCategoryData: {
      name: null,
      color: null,
    },
    showError: {
      name: false,
      color: false,
    },
    animateErrorName: false,
    animateErrorColor: false,

    pending: false,
  }),
  methods: {
    async fetchCategories() {
      try {
        this.categories = await this.$axios.$get("/profile/my-categories");
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    select(category) {
      this.$emit("selectCategory", category.id);
      this.selected = this.categories.indexOf(category);
    },
    selectColor(color) {
      this.newCategoryData.color = color;
    },
    async submitNewCategory() {
      if (!this.newCategoryData.name) {
        this.showError.name = true;
        this.animateErrorName = true;
      } else {
        this.showError.name = false;
      }
      if (!this.newCategoryData.color) {
        this.showError.color = true;
        this.animateErrorColor = true;
      } else {
        this.showError.color = false;
      }

      if (this.newCategoryData.name && this.newCategoryData.color) {
        try {
          this.pending = true;
          await this.$axios.$post("/profile/my-categories", this.newCategoryData);
          await this.fetchCategories();
        } catch (error) {
          console.error(error.response.data.message);
        }
        this.pending = false;
        this.newCategoryData.name = null;
        this.newCategoryData.color = null;
      }
    },
  },
  watch: {
    selected() {
      this.open = false;
    },
    animateErrorName(value) {
      if (value) {
        setTimeout(() => {
          this.animateErrorName = false;
        }, 1300);
      }
    },
    animateErrorColor(value) {
      if (value) {
        setTimeout(() => {
          this.animateErrorColor = false;
        }, 1300);
      }
    },
    open(value) {
      if (!value) {
        this.subAccordionOpen = false;
      }
    },
  },
  async created() {
    await this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
.categories-accordion {
  width: 300rem;
  margin: 0 auto;
  overflow: hidden;
  background: #ffffff;
  border-radius: 30rem;
  box-shadow: 0rem 2rem 2rem rgba($black, 0.25);
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
    &-category {
      width: 100%;
      height: 0;
      opacity: 0;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 10rem;
      padding-left: 93rem;
      transition: all 360ms ease-in-out;
      span {
        color: $black;
        max-width: 130rem;
        max-height: 24rem;
        overflow: hidden;
      }
      &-icon {
        display: grid;
        place-content: center;
      }
      &.selected {
        background: #eef6fc;
      }
    }
  }
  &--open {
    .categories-accordion {
      &__body {
        padding-bottom: 20rem;
        &-category {
          height: 34rem;
          opacity: 1;
        }
      }
      &__sub-accordion {
        opacity: 1;
        max-height: 480rem;
        padding-top: 20rem;
      }
    }
  }

  &__sub-accordion {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    width: 172rem;
    margin: 0 auto;
    overflow: hidden;
    transition: all 360ms ease-in-out;
    &-head {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10rem;
      color: $black;
      svg {
        transition: all 360ms ease-in-out;
        path {
          transition: all 360ms ease-in-out;
        }
      }
      transition: all 360ms ease-in-out;
    }
    &-body {
      max-height: 0;
      transition: all 360ms ease-in-out;
    }
    &-name,
    &-color {
      margin-bottom: 20rem;
      label {
        color: $dark-gray;
        display: inline-block;
        margin-bottom: 3rem;
      }
    }
    &-name {
      input {
        width: 100%;
        border: none;
        border-bottom: 1rem solid $dark-gray;
        outline: none;
        background: transparent;
      }
    }
    &-color {
      &::v-deep .color-picker {
        width: 100%;
        row-gap: 8rem;
        .category-circle {
          width: 27rem;
          height: 27rem;
          &.selected {
            .category-circle__inner {
              width: 10rem;
              height: 10rem;
            }
          }
        }
      }
    }
    &-error {
      font-size: 10rem;
      color: #de2424;
      display: flex;
      justify-content: flex-end;
      margin-top: 2rem;
      &--shake {
        animation: shake 1200ms 1;
        @keyframes shake {
          10% {
            transform: translateX(10rem);
          }
          20% {
            transform: translateX(-10rem);
          }
          30% {
            transform: translateX(10rem);
          }
          40% {
            transform: translateX(-10rem);
          }
          50% {
            transform: translateX(0);
          }
        }
      }
    }
    &-preloader {
      margin: 0 auto;
      height: 52rem;
    }
    &::v-deep .main-button {
      height: 52rem;
      font-size: 16rem;
      padding: 7rem;
    }
    &--open {
      .categories-accordion__sub-accordion {
        &-head {
          color: $main-color;
          margin-bottom: 20rem;
          svg {
            transform: rotate(135deg);
            path {
              fill: $main-color;
            }
          }
        }
        &-body {
          max-height: 300rem;
        }
      }
    }
  }
}
</style>
