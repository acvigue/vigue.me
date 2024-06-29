const ogImageFonts = [
  {
    name: 'larken',
    weight: 500,
    path: '/fonts/Larken.otf'
  },
  {
    name: 'larken',
    weight: 700,
    path: '/fonts/LarkenBold.otf'
  },
  {
    name: 'amandine',
    weight: 500,
    path: '/fonts/Amandine.otf'
  },
  {
    name: 'condor',
    weight: 500,
    path: '/fonts/Condor.ttf'
  },
  {
    name: 'condor',
    weight: 700,
    path: '/fonts/CondorBold.ttf'
  },
]

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-svgo',
    '@nuxt/fonts',
    '@formkit/nuxt',
    '@nuxtjs/sitemap',
    "@nuxt/eslint",
    "nuxt-og-image"
  ],
  css: ['assets/main.scss'],
  runtimeConfig: {
    ghostUrl: '',
    matomoUrl: '',
    public: {
      matomoSiteId: '',
    },
    ghostContentKey: '',
    ghostAdminKey: '',
    formkitKey: '',
    bypassToken: '',
    muxTokenId: '',
    muxTokenSecret: '',
    muxSigningKeyId: '',
    muxSigningKey: ''
  },
  image: {
    domains: ['cdn.vigue.me'],
  },
  formkit: {
    autoImport: true,
  },
  routeRules: {
    '/posts/**': { isr: 3600 },
    '/tag/**': { isr: 3600 },
    '/api': { isr: false },
    "/posts": {
      redirect: {
        to: "/posts/page/1",
        statusCode: 302,
      },
      isr: 3600
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
    sources: ['/api/__sitemap__/pages', '/api/__sitemap__/posts'],
    cacheMaxAgeSeconds: 1800,
    exclude: ['/api/**'],
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
  },
  ogImage: {
    fonts: ogImageFonts,
    compatibility: {
      prerender: {
        satori: 'node'
      },
    }
  }
})