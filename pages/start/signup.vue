<template>
  <StartPage class="signup"
    animated
  >
    <template #title>
      Create account
    </template>

    <template #inner>
      <div class="signup__form">
        <div class="signup__form-top">
          <div class="signup__form-inputs">
            <StartInput
              type="name"
              placeholder="Name"
            />
            <StartInput
              type="email"
              placeholder="Email"
            />
            <StartInput
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="signup__form-bottom">
          <MainButton
            type="1"
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
</template>

<script>
import MainButton from '~/components/buttons/MainButton.vue';
import StartInput from '~/components/inputs/StartInput.vue';
import StartPage from '~/components/layout/StartPage.vue';

export default {
    components: { StartPage, StartInput, MainButton }
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
