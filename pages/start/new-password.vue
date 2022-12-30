<template>
  <StartPage class="new-password">
    <template #title>
      Change password
    </template>

    <template #subtitle>
      Please enter a new password
    </template>

    <template #inner>
      <div class="new-password__form">
        <div class="new-password__form-top">
          <div class="new-password__form-inputs">
            <StartInput
              type="password"
              placeholder="New password"
            />
            <StartInput
              type="password"
              placeholder="Repeat password"
            />
          </div>
        </div>
        <div class="new-password__form-bottom">
          <MainButton
            type="1"
          >
            Ok
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
