<template>
  <section>
    <StartPage class="recovery">
      <template #title>
        Change password
      </template>

      <template #subtitle>
        Please enter your email and we will send you a recovery email
      </template>

      <template #inner>
        <Transition name="fade">
          <StartModal
            v-if=showModal
            @close="showModal = false"
          >
            <template #main-text>
              Please check out your email, we have sent you a password recovery email
            </template>
            <template #primary-button>
              Ok
            </template>
          </StartModal>
        </Transition>

        <FormPreloader
          v-if="pending"
        />


        <div class="recovery__form">
          <div class="recovery__form-top">
            <StartInput
              required
              type="email"
              placeholder="Email"
              v-model="dataForPost.email"
              :trigger="validateTrigger"
              @validate="validateResponse"
              :injectedErrorMessage="errorMessage"
            />
          </div>
          <div class="recovery__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Send me email
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
    validateTrigger: false,
    pending: false,
    showModal: false,
    validateStack: [],
    errorMessage: "",

    dataForPost: {
      email: ""
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
        const res = await this.$axios.$post("/auth/recovery", this.dataForPost);
        this.pending = false;
        this.showModal = true;

      } catch (error) {
        this.pending = false;
        if(error.response.data.statusCode == 404) {
          this.errorMessage = "Wrong email";
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .recovery {
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
