export default defineNuxtConfig({
  ssr: false,
  nitro: {
    preset: 'static',
  },
  generate: {
    dir: 'dist'
  },
  app: {
    baseURL: '/flying',
    head: {
      title: 'Flying',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Анімація польоту БПЛА на Nuxt 3' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
  },
  components: true,
  css: ['@/assets/styles/main.scss'],
  plugins: [],
  compatibilityDate: '2025-04-12'
})
