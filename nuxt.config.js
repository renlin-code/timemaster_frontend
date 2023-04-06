export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Time Master',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A fantastic application for managing your time' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {src: "/js/rem.js", ssr: false},
      {
        src: '/js/flickity.pkgd.min.js',
        ssr: false,
        body: true
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/static/scss/global.scss',
    '@/assets/css/flickity.min.css'
  ],

  styleResources: {
    scss: [
      '~/static/scss/_vars.scss',
    ],
  },

  loading: '~/components/preloaders/MainPreloader.vue',

  loadingIndicator: {
    name: 'three-bounce',
    color: '#F5805E',
    background: 'white'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://time-master-backend.onrender.com/api/v1/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: 'Time Master',
      author: 'Rene Linares'
    },
    manifest: {
      lang: 'en',
      name: 'Time Master',
      description: 'A fantastic application for managing your time'
    },
    icon: {
      fileName: 'icon.png',
      sizes: [64, 120, 144, 152, 192, 384, 512]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
