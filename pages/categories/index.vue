<template>
  <section>
    <InnerPage
      blur
      :staticContentHeight="200"
      :preloader="false"
    >

    </InnerPage>
  </section>
</template>

<script>
import InnerPage from '~/components/layout/InnerPage.vue';

export default {
  name: "IndexPage",
  layout: "inner",
  components: { InnerPage }
}
</script>
