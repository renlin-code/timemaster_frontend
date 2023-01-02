<template>
  <svg width="21rem" height="20rem" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_241_85)">
    <path d="M0.959473 13.0303H17.9186C18.151 13.0303 18.3786 12.9755 18.5747 12.8725C18.7708 12.7695 18.9273 12.6224 19.0258 12.4486C19.1244 12.2748 19.161 12.0814 19.1312 11.891C19.1015 11.7007 19.0067 11.5212 18.858 11.3738L14.4142 6.96972L18.858 2.56568C19.0067 2.41821 19.1015 2.23879 19.1312 2.04843C19.161 1.85807 19.1244 1.66466 19.0258 1.49084C18.9273 1.31702 18.7708 1.16999 18.5747 1.06697C18.3786 0.963945 18.151 0.909191 17.9186 0.909119H0.959473V19.0909" :stroke=color stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <defs>
    <clipPath id="clip0_241_85">
    <rect width="20" height="20" fill="white" transform="translate(0.050415)"/>
    </clipPath>
    </defs>
  </svg>
</template>

<script>
export default {
  name: "flag",
  props: {
    color: {
      type: String,
      default: "#777777"
    }
  }
}
</script>

<style scoped lang="scss">
  svg path {
    transition: all 360ms ease-in-out;
  }
</style>
