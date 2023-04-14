<template>
  <div class="container">
    <div class="circle circle1" :style="`background: ${this.color}`"></div>
    <div class="circle circle2" :style="`background: ${this.color}`"></div>
    <div class="circle circle3" :style="`background: ${this.color}`"></div>
  </div>
</template>

<script>
export default {
  name: "DotsPreloader",
  props: {
    color: {
      type: String,
      default: "#F5805E",
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  width: 45rem;
  height: 12rem;
  margin: 0 auto;
  position: relative;
}
.circle2 {
  left: 17.5rem;
}

.circle1,
.circle3 {
  top: 0;
}
.circle {
  position: absolute;
  border-radius: 50%;
  width: 17rem;
  height: 17rem;
  animation: animation 1.2s infinite ease-in-out;
}

.circle2 {
  animation-delay: -0.16s;
}

.circle1 {
  left: 0;
  animation-delay: -0.32s;
}

.circle3 {
  left: 35rem;
}

@keyframes animation {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
</style>
