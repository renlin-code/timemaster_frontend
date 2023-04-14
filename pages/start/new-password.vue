<template>
  <section>
    <StartPage class="new-password">
      <template #title>
        Change password
      </template>

      <template #subtitle>
        Please enter a new password
      </template>

      <template #inner>
        <BasicPreloader
          v-if="pending"
        />

        <div class="new-password__form">
          <div class="new-password__form-top">
            <div class="new-password__form-inputs">
              <StartInput
                required
                type="password"
                placeholder="New password"
                v-model="password1"
                :trigger="validateTrigger"
                @validate="validateResponse"
              />
              <StartInput
                required
                type="password"
                placeholder="Repeat password"
                v-model="password2"
                :trigger="validateTrigger"
                @validate="validateResponse"
                :injectedErrorMessage="errorMessage"
              />
            </div>
          </div>
          <div class="new-password__form-bottom">
            <MainButton
              type="1"
              @click.native="validate"
            >
              Ok
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
import BasicPreloader from '~/components/preloaders/BasicPreloader.vue';

export default {
    components: { StartPage, StartInput, MainButton, BasicPreloader },
    data: () => ({
    validateTrigger: false,
    pending: false,
    validateStack: [],
    errorMessage: "",

    password1: "",
    password2: "",

    dataForPost: {
      token: "",
      newPassword: ""
    }
  }),
  methods: {
    validate(){
      this.errorMessage = "";

      this.validateStack = [];
      this.validateTrigger = !this.validateTrigger;
    },
    validateResponse(error){
      this.validateStack.push(error)

      const count = this.$el.querySelectorAll('*[required]').length
      if(this.validateStack.length === count && this.validateStack.indexOf(true) === -1 && !this.pending){
        if (this.password1 !== this.password2) {
          this.errorMessage = "Passwords do not match"
        } else {
          this.dataForPost.newPassword = this.password1;
          this.submit()
        }
      }
    },

    async submit() {
      try {
        this.pending = true;
        const res = await this.$axios.$post("/auth/change-password", this.dataForPost);
        this.pending = false;

        const authToken = res.token;
        localStorage.setItem("authToken", authToken);

        this.$router.push("/");
      } catch (error) {
        this.pending = false;
      }
    }
  },
  mounted() {
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
  .new-password {
    position: relative;
    &__form {
      &-inputs {
        display: flex;
        flex-direction: column;
        gap: 20rem;
      }
      &-bottom {
        width: calc(100% - 50rem);
        position: fixed;
        left: 25rem;
        bottom: 67rem;
      }
    }
  }
</style>
