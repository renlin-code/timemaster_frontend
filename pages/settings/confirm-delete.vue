<template>
  <section>
    <StartPage class="confirm-delete">
      <template #title>
        Confirm email
      </template>

      <template #subtitle>
        Please enter your password to confirm your action
      </template>

      <template #inner>
        <Transition name="fade">
          <StartModal
            v-if=showModal
            @close="showModal = false; $router.push('/start')"
          >
            <template #main-text>
              Your profile has been successfully deleted
            </template>
            <template #primary-button>
              Ok
            </template>
          </StartModal>
        </Transition>

        <FormPreloader
          v-if="pending"
        />
        <div class="confirm-delete__form">
          <div class="confirm-delete__form-top">
            <StartInput
              required
              type="password"
              placeholder="Password"
              v-model="dataForPost.password"
              :trigger="validateTrigger"
              @validate="validateResponse"
              :injectedErrorMessage="errorMessage"
            />
          </div>
          <div class="confirm-delete__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Confirm
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
    components: { StartPage, StartInput, MainButton, FormPreloader, StartModal },
    data: () => ({
      showModal: false,
      validateTrigger: false,
      pending: false,
      validateStack: [],

      dataForPost: {
        password: ""
      },

      errorMessage: ""
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
          const res = await this.$axios.$post("/profile", this.dataForPost);
          this.showModal = true;
        } catch (error) {
            console.error(error.response.data.message)
          if(error.response.data.statusCode == 401) {
            this.errorMessage = "Wrong password"
          }
        }
        this.pending = false;
      }
    },
    created() {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        this.$router.push("/start/login");
      }
    }
}
</script>

<style scoped lang="scss">
  .confirm-delete {
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
