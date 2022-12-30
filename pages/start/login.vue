<template>
  <StartPage class="login"
    animated
  >
    <template #title>
      Welcome back
    </template>

    <template #inner>
      <div class="login__form">
        <div class="login__form-top">
          <h2 class="login__form-subtitle timemaster-subtitle">
            Please enter your email and password
          </h2>
          <div class="login__form-inputs">
            <StartInput
              type="email"
              placeholder="Email"
              errorMessage="This email is already registered"
              @input="setModel"
            />
            <StartInput
              type="password"
              placeholder="Password"
              @input="setModel"
            />
          </div>
          <NuxtLink to="/start/recovery" class="login__form-recovery timemaster-caption">
                Forgot password?
          </NuxtLink>
        </div>
        <div class="login__form-bottom">
          <MainButton
            type="1"
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
</template>

<script>
import MainButton from '~/components/buttons/MainButton.vue';
import StartInput from '~/components/inputs/StartInput.vue';
import StartPage from '~/components/layout/StartPage.vue';

export default {
  components: { StartPage, StartInput, MainButton },
  data: () => ({
    model: null
  }),
  methods: {
    setModel(value) {
      // console.log(value)
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
