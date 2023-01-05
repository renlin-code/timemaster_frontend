<template>
  <div class="categories-accordion"
    :class="{'categories-accordion--open' : open}"
  >
    <div class="categories-accordion__head"
      @click="open = !open"
    >
      <categories class="categories-accordion__head-icon"
        color="#F5805E"
      />
      <span class="timemaster-subtitle">Categories</span>
    </div>
    <ul class="categories-accordion__body">
      <li class="categories-accordion__body-item"
        :class="{'selected' : selected === categories.indexOf(category)}"
        v-for="category in categories"
        @click="select(category)"
      >
        <category-circle :color="category.color" class="categories-accordion__body-icon" />
        <span class="timemaster-text">{{ category.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import categories from '../icons/categories.vue';
import categoryCircle from '../icons/categoryCircle.vue';

export default {
  name: "CategoriesAccordion",
  components: {categories, categoryCircle},
  data: () => ({
    categories: [],
    selected: 0,
    open: false
  }),
  methods: {
    async fetchCategories() {
      try {
        this.categories = await this.$axios.$get("/profile/my-categories");
      } catch (error) {
        console.error(error)
      }
    },
    select(category) {
      this.$emit("selectCategory", category.id);
      this.selected = this.categories.indexOf(category);
    }
  },
  watch: {
    selected() {
      this.open = false;
    }
  },
  async created() {
    await this.fetchCategories();
    this.select(this.categories[0])
  },
}
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
      &-item {
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
          background: #EEF6FC;
        }
      }
    }
    &--open {
      .categories-accordion {
        &__body {
          padding-bottom: 10rem;
          &-item {
            height: 34rem;
            opacity: 1;
          }
        }
      }
    }
  }
</style>
