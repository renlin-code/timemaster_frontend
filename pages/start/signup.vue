<template>
  <section>
    <StartPage class="signup"
      animated
    >
      <template #title>
        Create account
      </template>

      <template #inner>
        <Transition name="fade">
          <StartModal
            v-if=showModal
            @close="showModal = false"
          >
            <template #main-text>
              Please check out your email, we have sent you a confirmation email
            </template>
            <template #primary-button>
              Ok
            </template>
          </StartModal>
        </Transition>

        <FormPreloader
          v-if="pending"
        />

        <div class="signup__form">
          <div class="signup__form-top">
            <div class="signup__form-inputs">
              <StartInput
                required
                type="name"
                placeholder="Name"
                v-model="dataForPost.name"
                :trigger="validateTrigger"
                @validate="validateResponse"
              />
              <StartInput
                required
                type="email"
                placeholder="Email"
                v-model="dataForPost.email"
                :trigger="validateTrigger"
                @validate="validateResponse"
                :injectedErrorMessage="errorMessage"
              />
              <StartInput
                required
                type="password"
                placeholder="Password"
                v-model="dataForPost.password"
                :trigger="validateTrigger"
                @validate="validateResponse"
              />
            </div>
          </div>
          <div class="signup__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Sign up
            </MainButton>
            <div class="signup__form-separator">
              <div class="signup__form-separator-line"></div>
                <span class="timemaster-subtitle">
                  or
                </span>
              <div class="signup__form-separator-line"></div>
            </div>
            <NuxtLink to="/start/login">
              <MainButton
                type="2"
              >
                Log in
              </MainButton>
            </NuxtLink>
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
      validateTrigger: false,
      pending: false,
      validateStack: [],
      errorMessage: "",

      dataForPost: {
        name: "",
        email: "",
        password: ""
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
          const res = await this.$axios.$post("/auth/signup", this.dataForPost);
          this.pending = false;
          this.showModal = true;
        } catch (error) {
          this.pending = false;
          if(error.response.data.statusCode == 409) {
            this.errorMessage = "This user has already signed up";
          }
        }
      }
    }
}
</script>

<style scoped lang="scss">
  .signup {
    &__form {
      display: flex;
      flex-direction: column;
      height: 456rem;
      justify-content: space-between;
      &-inputs {
        display: flex;
        flex-direction: column;
        gap: 20rem;
      }
      &-bottom {
        justify-self: flex-end;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 25rem;
      }
      &-separator {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 10rem;
        span {
          color: $light_gray;
        }
        &-line {
          width: 100%;
          height: 1px;
          background: $light_gray;
        }
      }
    }
  }
</style>
