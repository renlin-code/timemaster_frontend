<template>
  <InnerInputModal
    class="inner-modal"
    blur
    :preloader="pending"
    :placeholder="placeholder"
    errorText="Name the category"
    v-model="name"
    :maxlength="10"
    @close="close"
    :trigger="trigger"
  >
    <template #scroll-content>
      <div class="inner-modal__wrapper">
        <div class="inner-modal__group">
          <ColorPicker
            class="inner-modal__color-picker"
            @selectColor="selectColor"
            :trigger="trigger"
            :inyectedColor="inyectedData ? inyectedData.color : null"
          />
        </div>
        <div class="inner-modal__group">
          <DeleteCategory
            class="inner-modal__delete"
            v-if="edit"
            @click.native="showDeleteModal = true"
          />
        </div>
      </div>

      <Transition name="fade">
        <StartModal
          :twoButtons="!isLast"
          v-if="showDeleteModal"
          @close="showDeleteModal = false"
          @action="deleteCategory"
        >
          <template #main-text>
            {{ deleteModalText }}
          </template>
          <template #primary-button>
            {{ deleteModalButtonText }}
          </template>
          <template #secondary-button> Yes </template>
        </StartModal>
      </Transition>
    </template>

    <template #button>
      <OkButton @click.native="submitCategory" />
    </template>
  </InnerInputModal>
</template>

<script>
import DeleteCategory from "~/components/buttons/DeleteCategory.vue";
import ImportantButton from "~/components/buttons/ImportantButton.vue";
import OkButton from "~/components/buttons/OkButton.vue";
import ColorPicker from "~/components/uiKit/ColorPicker.vue";
import InnerInputModal from "../InnerInputModal.vue";
import StartModal from "../StartModal.vue";

export default {
  components: {
    InnerInputModal,
    ImportantButton,
    OkButton,
    StartModal,
    ColorPicker,
    DeleteCategory,
  },
  props: {
    edit: {
      type: Boolean,
    },
    inyectedData: {
      type: Object,
    },
  },
  data: () => ({
    trigger: false,
    pending: false,
    showDeleteModal: false,
    isLast: false,

    name: null,
    color: null,
  }),
  computed: {
    placeholder() {
      return !this.edit ? "Add new category" : "Category name";
    },
    deleteModalText() {
      if (this.isLast) {
        return "You can't delete your last category. You need at least one category";
      } else {
        return "Are you sure you want to delete this category? If you delete this category, you’ll lose all the tasks of this category";
      }
    },
    deleteModalButtonText() {
      if (this.isLast) {
        return "Ok";
      } else {
        return "No";
      }
    },
  },
  methods: {
    close() {
      this.$nuxt.$emit("refreshView");
      this.$emit("close");
    },
    setInyectedData() {
      if (this.inyectedData.name) {
        this.name = this.inyectedData.name;
      }
      if (this.inyectedData.color) {
        this.color = this.inyectedData.color;
      }
    },

    selectColor(color) {
      this.color = color;
    },

    async submitCategory() {
      this.trigger = !this.trigger;

      console.log("NAME", this.name);
      console.log("COLOR", this.color);

      if (this.name && this.color) {
        this.pending = true;
        if (!this.edit) {
          try {
            await this.$axios.$post("/profile/my-categories/", {
              name: this.name,
              color: this.color,
            });
          } catch (error) {
            console.error(error.response.data.message);
          }
        } else {
          try {
            await this.$axios.$patch(`/profile/my-categories/${this.inyectedData.id}`, {
              name: this.name,
              color: this.color,
            });
          } catch (error) {
            console.error(error.response.data.message);
          }
        }
        this.close();
        this.pending = false;
      }
    },
    async deleteCategory() {
      if (!this.isLast) {
        try {
          this.pending = true;
          await this.$axios.$delete(`/profile/my-categories/${this.inyectedData.id}`);
          this.close();
        } catch (error) {
          console.error(error.response.data.message);
          if (error.response.data.statusCode === 403) {
            this.isLast = true;
          }
        }
        this.pending = false;
      }
    },
  },

  created() {
    this.setInyectedData();
  },
};
</script>

<style scoped lang="scss">
.inner-modal {
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 24rem;
    margin-bottom: 90rem;
  }
}
</style>
