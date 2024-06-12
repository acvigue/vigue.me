import { splitVendorChunkPlugin } from 'vite'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/sitemap',
    "nuxt-og-image"
  ],
  css: ['assets/main.scss'],
  vite: {
    plugins: [splitVendorChunkPlugin()],
  },
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
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  routeRules: {
    '/**': { swr: true },
  },
  fonts: {
    experimental: {
      processCSSVariables: true,
      addPreloadLinks: true,
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