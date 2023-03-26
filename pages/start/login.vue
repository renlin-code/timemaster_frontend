<template>
  <section>
    <StartPage class="login"
      animated
    >
      <template #title>
        Welcome back
      </template>

      <template #inner>
        <FormPreloader
          v-if="pending"
        />
        <div class="login__form">
          <div class="login__form-top">
            <h2 class="login__form-subtitle timemaster-subtitle">
              Please enter your email and password
            </h2>
            <div class="login__form-inputs">
              <StartInput
                required
                type="email"
                placeholder="Email"
                v-model="dataForPost.email"
                :trigger="validateTrigger"
                @validate="validateResponse"
                :injectedErrorMessage="emailErrorMessage"
              />
              <StartInput
                required
                type="password"
                placeholder="Password"
                v-model="dataForPost.password"
                :trigger="validateTrigger"
                @validate="validateResponse"
                :injectedErrorMessage="passwordErrorMessage"
              />
            </div>
            <NuxtLink to="/start/recovery" class="login__form-recovery timemaster-caption">
                  Forgot password?
            </NuxtLink>
          </div>
          <div class="login__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Log in
            </MainButton>
            <div class="login__form-separator">
              <div class="login__form-separator-line"></div>
                <span class="timemaster-subtitle">
                  or
                </span>
              <div class="login__form-separator-line"></div>
            </div>
            <NuxtLink to="/start/signup">
              <MainButton
                type="2"
              >
                Sign up
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
import FormPreloader from '~/components/preloaders/FormPreloader.vue';


export default {
  components: { StartPage, StartInput, MainButton, FormPreloader },
  data: () => ({
    validateTrigger: false,
    pending: false,
    validateStack: [],
    emailErrorMessage: "",
    passwordErrorMessage: "",

    dataForPost: {
      email: "",
      password: ""
    }
  }),
  methods: {
    validate(){
      this.emailErrorMessage = "";
      this.passwordErrorMessage = "";
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
        const res = await this.$axios.$post("/auth/signin", this.dataForPost);
        this.pending = false;

        const authToken = res.token;
        localStorage.setItem("authToken", authToken);

        this.$router.push("/");
      } catch (error) {
        this.pending = false;
        if(error.response.data.statusCode == 404) {
          this.emailErrorMessage = "This user is not signed up";
        } else if (error.response.data.statusCode == 401) {
          this.passwordErrorMessage = "Wrong password"
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .login {
    &__form {
      display: flex;
      flex-direction: column;
      height: 456rem;
      justify-content: space-between;
      &-subtitle {
        margin-bottom: 40rem;
        color: $dark_gray;
      }
      &-inputs {
        display: flex;
        flex-direction: column;
        gap: 20rem;
      }
      &-recovery {
        display: inline-block;
        float: right;
        color: $main-color;
        margin-top: 10rem;
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
