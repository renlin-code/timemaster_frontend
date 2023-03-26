<template>
  <div class="carousell">
    <div class="carousell__viewport">
      <ul class="carousell__wrapper main-content-wrapper">
        <li v-for="category in categories">
          <CategoryCard
            class="carousell__category"
            extended
            :category="category"
            @click.native="$router.push(`categories/${category.id}`)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CategoryCard from "../uiKit/CategoryCard.vue";

export default {
  name: "CategoriesCarousell",
  components: { CategoryCard },
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
.carousell {
  &__viewport {
    width: 100%;
    overflow-x: scroll;
    overscroll-behavior-x: contain;
    scroll-snap-type: x proximity;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__wrapper {
    display: flex;
    gap: 14rem;
    padding-bottom: 7rem;
    li:last-child .carousell__category {
      margin-right: 25rem;
    }
  }
  &__category {
    min-width: 205rem;
  }
}
</style>
