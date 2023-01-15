<template>
  <button class="delete-category">
    <div class="delete-category__inner timemaster-subtitle">
      <trash
        color="#DE2424"
      />
      Delete category
    </div>
  </button>
</template>

<script>
import Trash from '../icons/trash.vue';

export default {
    name: "DeleteCategory",
    components: { Trash }
}
</script>

<style scoped lang="scss">
.delete-category {
  display: block;
  width: 300rem;
  height: 70rem;
  border-radius: 30rem;
  margin: 0 auto;
  background: #ffffff;
  box-shadow: 0rem 2rem 2rem rgba(0, 0, 0, 0.25);
  &__inner {
    display: flex;
    justify-content: center;
    gap: 10rem;
    align-items: center;
    color: #DE2424;
  }
}
</style>
