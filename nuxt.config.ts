export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/sitemap',
    "@nuxt/eslint"
  ],
  css: ['assets/main.scss'],
  runtimeConfig: {
    ghostContentKey: '',
    ghostAdminKey: '',
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
    '/**': { isr: (process.env.NODE_ENV === 'production' ? 3600 : 1) },
    "/resume": {
      redirect: {
        to: "https://blogcdn.vigue.me/Resume.pdf",
        statusCode: 301,
      },
    },
    "/posts": {
      redirect: {
        to: "/posts/1",
        statusCode: 302,
      },
    },
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
  eslint: {
    // options here
  },
  nitro: {
    vercel: {
      config: {
        bypassToken: process.env.NUXT_BYPASS_TOKEN,
      }
    }
  }
})