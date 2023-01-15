<template>
  <section>
    <StartPage class="change-name">
      <template #title>
        Change name
      </template>

      <template #inner>
        <Transition name="fade">
          <StartModal
            v-if=showModal
            @close="showModal = false; $router.push('/')"
          >
            <template #main-text>
              Name changed to "{{ resultName }}"
            </template>
            <template #primary-button>
              Ok
            </template>
          </StartModal>
        </Transition>
        <FormPreloader
          v-if="pending"
        />


        <div class="change-name__form">
          <div class="change-name__form-top">
            <StartInput
              required
              type="name"
              placeholder="New name"
              v-model="dataForPost.name"
              :trigger="validateTrigger"
              @validate="validateResponse"
              :injectedErrorMessage="errorMessage"
            />
          </div>
          <div class="change-name__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Change
            </MainButton>
          </div>
        </div>
      </template>
    </StartPage>
  </section>
</template>

<script>
import MainButton from '~/components/buttons/MainButton.vue';
import StartInput from '~/components/inputs/StartInput.vue';
import StartPage from '~/components/layout/StartPage.vue';
import StartModal from '~/components/modals/StartModal.vue';
import FormPreloader from '~/components/preloaders/FormPreloader.vue';

export default {
  components: { StartPage, StartInput, MainButton, StartModal, FormPreloader },
  data: () => ({
    showModal: false,
    resultName: "",
    validateTrigger: false,
    pending: false,
    validateStack: [],
    errorMessage: "",

    dataForPost: {
      name: ""
    }
  }),
  methods: {
    validate(){
      this.errorMessage = "";
      this.validateStack = [];
      this.validateTrigger = !this.validateTrigger
    },
    validateResponse(error){
      this.validateStack.push(error)

      const count = this.$el.querySelectorAll('*[required]').length
      if(this.validateStack.length === count && this.validateStack.indexOf(true) === -1 && !this.pending){
        this.submit()
      }
    },

    async submit() {
      try {
        this.pending = true;
        const res = await this.$axios.$patch("/profile", this.dataForPost);
        this.resultName = res.name;
        this.showModal = true;
      } catch (error) {
        console.error(error.response.data.message)
      }
      this.pending = false;
    }
  },
  created() {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      this.$router.push("/start/login");
    }
  },
}
</script>

<style scoped lang="scss">
  .change-name {
    position: relative;
    &__form {
      &-bottom {
        width: calc(100% - 50rem);
        position: fixed;
        left: 25rem;
        bottom: 67rem;
      }
    }
  }
</style>
