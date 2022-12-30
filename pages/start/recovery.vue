<template>
  <StartPage class="recovery">
    <template #title>
      Change password
    </template>

    <template #subtitle>
      Please enter your email and we will send you a recovery email
    </template>

    <template #inner>
      <div class="recovery__form">
        <div class="recovery__form-top">
          <StartInput
            type="email"
            placeholder="Email"
          />
        </div>
        <div class="recovery__form-bottom">
          <MainButton
            type="1"
          >
            Send me email
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
