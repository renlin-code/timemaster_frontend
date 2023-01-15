<template>
  <section>
    <StartPage class="confirm-email">
      <template #title>
        Confirm email
      </template>

      <template #subtitle>
        Please enter your password to confirm your email
      </template>

      <template #inner>
        <FormPreloader
          v-if="pending"
        />
        <div class="confirm-email__form">
          <div class="confirm-email__form-top">
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
          <div class="confirm-email__form-bottom">
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
import FormPreloader from '~/components/preloaders/FormPreloader.vue';


export default {
    components: { StartPage, StartInput, MainButton, FormPreloader },
    data: () => ({
      validateTrigger: false,
      pending: false,
      validateStack: [],

      dataForPost: {
        token: "",
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
          const res = await this.$axios.$post("/auth/confirm-email", this.dataForPost);
          this.pending = false;

          const authToken = res.token;
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("savedDevice", true);

          this.$router.push("/");
        } catch (error) {
          this.pending = false;
          if(error.response.data.statusCode == 401) {
            this.errorMessage = "Wrong password"
          }
        }
      }
    },
    created() {
      const queryToken = this.$route.query.token;
      if (!queryToken) {
        this.$nuxt.error("404");
      } else {
        this.dataForPost.token = queryToken;
      }
    }
}
</script>

<style scoped lang="scss">
  .confirm-email {
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
