<template>
  <div class="start-page">
    <TimemasterLogo class="start-page__logo"
      width="288rem"
      height="40rem"
    />
    <StartFigure class="start-page__figure"
      width="413rem"
      height="270rem"
    />
    <div class="start-page__bottom">
      <h1 class="start-page__bottom-title timemaster-title">
        Manage Your Time
      </h1>
      <h2 class="start-page__bottom-subtitle timemaster-subtitle">
        Please log in or create account
      </h2>
      <div class="start-page__bottom-buttons">
        <NuxtLink to="/start/login">
          <MainButton
            type="1"
          >
            Log in
          </MainButton>
        </NuxtLink>

        <NuxtLink to="/start/signup">
          <MainButton
            type="2"
          >
            Sign up
          </MainButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import MainButton from '~/components/buttons/MainButton.vue';
import StartFigure from '~/components/figures/StartFigure.vue';
import TimemasterLogo from '~/components/logos/TimemasterLogo.vue';

export default {
    name: "IndexPage",
    components: { TimemasterLogo, StartFigure, MainButton }
}
</script>

<style scoped lang="scss">
  .start-page {
    &__logo {
      width: min-content;
      margin: 0 auto;
      padding: 43rem 0 148rem;
    }
    &__bottom {
      height: max-content;
      background: $white;
      padding: 67rem 25rem 86rem;
      box-shadow: inset 0 4rem 4rem $main-color;
      border-radius: 30rem 30rem 0 0;
      &-title {
        color: $black;
        margin-bottom: 40rem;
        text-align: center;
      }
      &-subtitle {
        color: $light_gray;
        margin-bottom: 40rem;
        text-align: center;
      }
      &-buttons {
        display: flex;
        flex-direction: column;
        gap: 25rem;
      }
    }
  }
</style>
