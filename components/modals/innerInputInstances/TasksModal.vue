<template>
  <InnerInputModal
    class="inner-modal"
    blur
    :preloader="pending"
    :placeholder="placeholder"
    v-model="name"
    :maxlength="30"
    @close="close"
    :trigger="trigger"
  >
    <template #scroll-content>
      <div class="inner-modal__wrapper">
        <div class="inner-modal__group">
          <CategoriesAccordion
            class="inner-modal__categories"
            v-if="from === ('home' || 'calendar')"
            @selectCategory="selectCategory"
            :trigger="trigger"
          />
        </div>
        <div class="inner-modal__group">
          <CalendarAccordion
            class="inner-modal__calendar"
            v-if="from === ('home' || 'category')"
            @selectDate="selectDate"
            :trigger="trigger"
          />
        </div>
        <div class="inner-modal__group">
          <ImportantButton class="inner-modal__important" @select="setImportant" />
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
    dataForEditing: {
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
      console.log(this.name);
      console.log(this.categoryId);
      console.log(this.date);

      if (this.name && this.categoryId && this.date) {
        this.pending = true;
        try {
          await this.$axios.$post("/profile/my-tasks", {
            name: this.name,
            categoryId: this.categoryId,
            date: this.date,
            important: this.important,
          });
        } catch (error) {
          console.error(error.response.data.message);
        }
        this.close();
        this.pending = false;
      }
    },
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
