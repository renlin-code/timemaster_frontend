<template>
  <svg width="20rem" height="20rem" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="9" :stroke=color stroke-width="2"/>
  </svg>
</template>

<script>
export default {
  name: "taskCircle",
  props: {
    color: {
      type: String,
      default: "#777777"
    }
  }
}
</script>
