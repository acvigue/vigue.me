import glsl from "vite-plugin-glsl";
import { splitVendorChunkPlugin } from "vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-svgo",
    "@nuxt/fonts",
    "@formkit/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/sitemap",
  ],
  css: ["assets/main.scss"],
  vite: {
    plugins: [glsl(), splitVendorChunkPlugin()],
  },
  runtimeConfig: {
    ghostContentKey: "",
    ghostAdminKey: "",
    ghostWebhookKey: "",
    ghostUrl: "",
    formkitKey: "",
  },
  image: {
    domains: ["blogcdn.vigue.me"],
  },
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: false,
  },
  routeRules: {
    "/**": { swr: 120 },
  },
  experimental: {
    componentIslands: true,
  },
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "About",
        path: "/about",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "Projects",
        path: "/projects",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "Experience",
        path: "/experience",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "Contact",
        path: "/contact",
        file: "~/pages/index.vue",
      });
    },
  },
  sitemap: {
    sources: ["/api/sitemap"],
    cacheMaxAgeSeconds: 3600,
  },
});
