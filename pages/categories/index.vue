<template>
  <section>
    <InnerPage
      blur
      :preloader="preloader"
    >
      <template #title>
        My categories
      </template>
      <template #scroll-content>
        <ul class="categories-list main-content-wrapper">
          <CategoryCard
            v-for="category in categories"
            :category="category"
            extended
            @click.native="$router.push(`/categories/${category.id}`)"
          />
          <AddCategory
            @click.native="$nuxt.$emit('openCategoryModal')"
          />
        </ul>
      </template>

    </InnerPage>
  </section>
</template>

<script>
import InnerPage from '~/components/layout/InnerPage.vue';
import CategoryCard from '~/components/uiKit/CategoryCard.vue';
import AddCategory from "~/components/buttons/AddCategory.vue";

export default {
  name: "IndexPage",
  layout: "inner",
  components: { InnerPage, CategoryCard, AddCategory },
  data: () => ({
    preloader: true,
    categories: []
  }),
  methods: {
    async fetchCategories() {
      try {
        this.categories = await this.$axios.$get("/profile/my-categories");
      } catch (error) {
        console.error(error)
        if (error.response.data.statusCode == 401) {
          this.$router.push("/start/login");
        } else {
          this.$router.push("/start");
        }
      }
      this.preloader = false;
    }
  },
  watch: {
    categories(value) {
      this.$nuxt.$emit("lastCategory", value.length === 1)
    }
  },
  async created() {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      this.$router.push("/start/login");
    } else {
      await this.fetchCategories();
    }

    this.$nuxt.$on("refreshView", () => {
      if(!this.fetching) {
        this.fetchCategories();
      }
    })
  },
  beforeDestroy() {
    this.$nuxt.$off("refreshView")
  }
}
</script>

<style scoped lang="scss">
  .categories-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 18rem;
    row-gap: 25rem;
  }
</style>
