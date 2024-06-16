export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/sitemap',
    "nuxt-og-image",
    "@hypernym/nuxt-gsap"
  ],
  css: ['assets/main.scss'],
  runtimeConfig: {
    ghostContentKey: '',
    ghostAdminKey: '',
    ghostWebhookKey: '',
    ghostUrl: '',
    formkitKey: '',
  },
  image: {
    domains: ['blogcdn.vigue.me'],
  },
  formkit: {
    autoImport: true,
  },
  routeRules: {
    '/**': { swr: true },
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
    },
  },
  experimental: {
    componentIslands: true,
  },
  sitemap: {
    sources: ['/api/sitemap'],
    cacheMaxAgeSeconds: 3600,
  },
})