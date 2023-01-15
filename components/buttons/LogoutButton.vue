<template>
  <button class="logout-button timemaster-subtitle">
    Log out
    <logout />
  </button>
</template>

<script>
import Logout from '../icons/logout.vue';

export default {
    components: { Logout }
}
</script>

<style scoped lang="scss">
.logout-button {
  display: flex;
  gap: 10rem;
  align-items: center;
  color: $dark-gray;
  margin-top: 50rem;
}
</style>
