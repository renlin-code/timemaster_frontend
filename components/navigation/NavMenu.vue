<template>
  <nav class="menu">
    <ul class="menu__list">
      <li class="">
        <nuxt-link to="/">
          <home color="#F8FDFF" />
          Home
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/categories">
          <categories color="#F8FDFF" />
          Categories
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/calendar">
          <calendar color="#F8FDFF" />
          Calendar
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/settings">
          <gear color="#F8FDFF" />
          Settings
        </nuxt-link>
      </li>
    </ul>
    <MenuFigure class="menu__figure" width="192rem" height="218rem" />
    <span class="menu__autor"
      >Developed by:
      <a href="https://renlin-code.online" target="_blank" rel="noopener noreferrer"
        >Rene Linares</a
      ></span
    >
  </nav>
</template>

<script>
import home from "../icons/home.vue";
import categories from "../icons/categories.vue";
import calendar from "../icons/calendar.vue";
import gear from "../icons/gear.vue";
import MenuFigure from "../figures/MenuFigure.vue";

export default {
  name: "NavMenu",
  components: { home, categories, calendar, gear, MenuFigure },
};
</script>

<style scoped lang="scss">
.menu {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  &__list {
    padding-left: 23rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
    li a {
      display: grid;
      grid-template-columns: 23rem auto;
      column-gap: 12rem;
      font-size: 24rem;
      line-height: 36rem;
      font-weight: 500;
      font-family: "Poppins", sans-serif;
      margin-bottom: 5rem;
      text-transform: uppercase;
      align-items: center;
      color: $white;
      text-decoration: underline;
    }
  }
  &__figure {
    position: absolute;
    bottom: 50rem;
    left: 23rem;
  }
  &__autor {
    position: absolute;
    bottom: 20rem;
    left: 23rem;
    font-size: 12rem;
    color: $black;
    a {
      color: $white;
      text-decoration: underline;
      font-weight: 600;
    }
  }
}
</style>
