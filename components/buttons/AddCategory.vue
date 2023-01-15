
import PlusCategory from '../icons/plusCategory.vue';


import PlusCategory from '../icons/plusCategory.vue';

<template>
  <button class="add-category">
    <PlusCategory />
  </button>
</template>

<script>
import PlusCategory from '../icons/plusCategory.vue';

export default {
    components: { PlusCategory }
}
</script>

<style scoped lang="scss">
  .add-category {
    width: 100%;
    height: 159rem;
    background-color: #FFFFFF;
    border-radius: 20rem;
    box-shadow: 0rem 2rem 2rem rgba($black, 0.25);
    display: grid;
    place-content: center;
  }
</style>
