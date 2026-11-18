// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@pinia/nuxt', '@nuxt/a11y', '@nuxt/test-utils/module'],
  css: [
  '~/assets/css/main.css',
  ...(process.env.NODE_ENV === 'development' ? ['~/assets/css/a11y.css'] : [])
  ],
  runtimeConfig: {
    footballDataApiKey: process.env.NUXT_FOOTBALL_DATA_API_KEY || '91999d1b67784f0a86353fe9ee3c3371',
    openFootApiKey: process.env.NUXT_OPENFOOT_API_KEY_0 || 'of_demo_openfootapi_docs',
    public: {}
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ui: {
    colorMode: false
  }
})
