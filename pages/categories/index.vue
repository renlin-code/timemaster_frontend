<template>
  <section class="categories">
    <InnerPage blur>
      <template #title> My categories </template>
      <template #scroll-content>
        <ul class="categories-list main-content-wrapper">
          <CategoryCard
            v-for="category in categories"
            :category="category"
            extended
            @click.native="$router.push(`/categories/${category.id}`)"
          />
          <AddCategory
            @click.native="
              $nuxt.$emit('openCategoriesModal', {
                edit: false,
                data: {},
              })
            "
          />
        </ul>
      </template>
    </InnerPage>
  </section>
</template>

<script>
import InnerPage from "~/components/layout/InnerPage.vue";
import CategoryCard from "~/components/uiKit/CategoryCard.vue";
import AddCategory from "~/components/buttons/AddCategory.vue";

export default {
  name: "IndexPage",
  layout: "inner",
  components: { InnerPage, CategoryCard, AddCategory },
  async asyncData({ $axios, redirect }) {
    let categories;
    try {
      categories = await $axios.$get("/profile/my-categories");
    } catch (error) {
      console.error(error);
      redirect("/start");
    }
    return { categories };
  },
  watch: {
    categories(value) {
      this.$nuxt.$emit("lastCategory", value.length === 1);
    },
  },
  mounted() {
    this.$nuxt.$on("refreshView", () => {
      console.log("REFRESH");
      this.$nuxt.refresh();
    });
  },
};
</script>

<style scoped lang="scss">
.categories-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 18rem;
  row-gap: 25rem;
}
</style>
