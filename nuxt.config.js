export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static'
  },
  generate: {
    dir: 'dist'
  },
  app: {
    baseURL: '/flying/',
    head: {
      title: 'Nuxt.js starter for CSB',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Official Nuxt.js starter for CodeSandBox'
        }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
  },

  components: true,
  css: ['@/assets/styles/main.scss'],
  plugins: [],
  compatibilityDate: '2025-04-12'
})
