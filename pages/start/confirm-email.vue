<template>
  <StartPage class="confirm-email">
    <template #title>
      Confirm email
    </template>

    <template #subtitle>
      Please enter your password to confirm your email
    </template>

    <template #inner>
      <div class="confirm-email__form">
        <div class="confirm-email__form-top">
          <StartInput
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="confirm-email__form-bottom">
          <MainButton
            type="1"
          >
            Confirm
          </MainButton>
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
