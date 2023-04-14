<template>
  <InnerInputModal
    class="inner-modal"
    blur
    :preloader="pending"
    :placeholder="placeholder"
    errorText="Name the task"
    v-model="name"
    :maxlength="40"
    @close="close"
    :trigger="trigger"
  >
    <template #scroll-content>
      <div class="inner-modal__wrapper">
        <div class="inner-modal__group">
          <CategoriesAccordion
            class="inner-modal__categories"
            v-if="from !== 'category' || edit"
            @selectCategory="selectCategory"
            :trigger="trigger"
            :inyectedCategoryId="inyectedData ? inyectedData.categoryId : null"
          />
        </div>
        <div class="inner-modal__group">
          <CalendarAccordion
            class="inner-modal__calendar"
            v-if="from !== 'calendar' || edit"
            @selectDate="selectDate"
            :trigger="trigger"
            :inyectedDate="inyectedData ? inyectedData.date : null"
          />
        </div>
        <div class="inner-modal__group">
          <ImportantButton
            class="inner-modal__important"
            @select="setImportant"
            :inyectedImportant="inyectedData ? inyectedData.important : null"
          />
        </div>
      </div>
    </template>

    <template #button>
      <OkButton @click.native="submitTask" />
    </template>
  </InnerInputModal>
</template>

<script>
import ImportantButton from "~/components/buttons/ImportantButton.vue";
import OkButton from "~/components/buttons/OkButton.vue";
import CalendarAccordion from "~/components/uiKit/CalendarAccordion.vue";
import CategoriesAccordion from "~/components/uiKit/CategoriesAccordion.vue";
import InnerInputModal from "../InnerInputModal.vue";

export default {
  components: {
    InnerInputModal,
    CategoriesAccordion,
    CalendarAccordion,
    ImportantButton,
    OkButton,
  },
  props: {
    from: {
      type: String,
    },
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

    name: null,
    categoryId: null,
    date: null,
    important: false,
  }),
  computed: {
    placeholder() {
      return !this.edit ? "Add new task" : "Task name";
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
      if (this.inyectedData.categoryId) {
        this.categoryId = this.inyectedData.categoryId;
      }
      if (this.inyectedData.date) {
        this.date = this.inyectedData.date;
      }
      if (this.inyectedData.important) {
        this.important = this.inyectedData.important;
      }
    },

    selectCategory(id) {
      this.categoryId = id;
    },
    selectDate(date) {
      this.date = date;
    },
    setImportant(value) {
      this.important = value;
    },
    async submitTask() {
      this.trigger = !this.trigger;

      //console.log("NAME", this.name);
      //console.log("CATID", this.categoryId);
      //console.log("DATE", this.date);
      //console.log("IMPORT", this.important);

      if (this.name && this.categoryId && this.date) {
        this.pending = true;
        if (!this.edit) {
          try {
            await this.$axios.$post("/profile/my-tasks/", {
              name: this.name,
              categoryId: this.categoryId,
              date: this.date,
              important: this.important,
            });
          } catch (error) {
            console.error(error.response.data.message);
          }
        } else {
          try {
            await this.$axios.$patch(`/profile/my-tasks/${this.inyectedData.id}`, {
              name: this.name,
              categoryId: this.categoryId,
              date: this.date,
              important: this.important,
            });
          } catch (error) {
            console.error(error.response.data.message);
          }
        }
        this.close();
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
