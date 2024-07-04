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
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // creating a chunk to @open-ish deps. Reducing the vendor chunk size
            if (id.includes('gsap')) {
              return 'gsap';
            }
            // creating a chunk to @open-ish deps. Reducing the vendor chunk size
            if (id.includes('vue-router')) {
              return 'vue-router';
            }
            // creating a chunk to react routes deps. Reducing the vendor chunk size
            if (
              id.includes('mouse-follower')
            ) {
              return 'mouse-follower';
            }
          },
        },
      },
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