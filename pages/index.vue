<template>
  <section>
    <InnerPage class="home-page"
    :staticContentHeight="200"
    v-if="profileData"
  >
      <template #title>
        {{ `Hello, ${profileData.name}!` }}
      </template>

      <template #static-content
      >
        <h2>Categories</h2>
        <CategoriesCarousell
          :categories="profileData.categories"
        />
      </template>

      <template #scroll-content>
        <h2>Today’s tasks</h2>
      </template>

      <template #button>
      <AddTaskButton
        animated
        @click.native="$nuxt.$emit('openModalFromHome')"
      />
      </template>
    </InnerPage>
  </section>
</template>

<script>
import InnerPage from '~/components/layout/InnerPage.vue';
import CategoryCard from '~/components/uiKit/CategoryCard.vue';
import CategoriesCarousell from '~/components/complexItems/CategoriesCarousell.vue';
import AddTaskButton from '~/components/buttons/AddTaskButton.vue';
import { startCategoriesMixin } from "~/mixins/startCategoriesMixin";
import InnerInputModal from '~/components/modals/InnerInputModal.vue';

export default {
    name: "IndexPage",
    layout: "inner",
    components: { InnerPage, CategoryCard, CategoriesCarousell, AddTaskButton, InnerInputModal },
    mixins: [startCategoriesMixin()],
    data: () => ({
      profileData: null
    }),
    methods: {
      async fetchProfileData() {
        try {
          const data = await this.$axios.$get("/profile/");
          // console.log(this.profileData);

          if(data.categories.length === 0) {
            await this.createStartCategories();
            this.profileData = await this.$axios.$get("/profile/");
          } else {
            this.profileData = data;
          }

        } catch (error) {
          console.error(error)
          if (error.response.data.statusCode == 401) {
            this.$router.push("/start/login");
          } else {
            this.$router.push("/start");
          }
        }
      }
    },

    created() {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.$router.push("/start/login");
      } else {
        this.fetchProfileData();
      }
    }
  }
</script>
