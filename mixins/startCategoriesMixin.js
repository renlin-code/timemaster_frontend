export const startCategoriesMixin = () => ({

  methods: {
    async createStartCategories() {
      const createCategory = async ({ name, color }) => {
        try {
          await this.$axios.$post("/profile/my-categories", { name, color });
        } catch (error) {
          console.error(error.response.data.message)
        }
      }

      await Promise.all([
        createCategory({
          name: "School",
          color: "#D75EF5"
        }),
        createCategory({
          name: "Work",
          color: "#4E9DA1"
        }),
        createCategory({
          name: "Home",
          color: "#A93EBD"
        })
      ])
    }
  }
})
