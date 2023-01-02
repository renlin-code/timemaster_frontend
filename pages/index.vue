<template>
  <div>
    <button>INDEX</button>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'inner',
  data: () => ({
    authToken: ""
  }),
  created() {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      this.authToken = authToken;
    } else {
      this.$router.push("/start/login");
    }
  },
}
</script>
