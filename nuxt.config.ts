import glsl from "vite-plugin-glsl";
import { splitVendorChunkPlugin } from "vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "nuxt-svgo", "@nuxt/fonts"],
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
  routeRules: {
    "/": { isr: true },
    //"/posts/**": { isr: true },
  },
  experimental: {
    componentIslands: true,
  },
  hooks: {
    "pages:extend"(pages) {
      pages.push({
        name: "about",
        path: "/about",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "projects",
        path: "/projects",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "experience",
        path: "/experience",
        file: "~/pages/index.vue",
      });
      pages.push({
        name: "contact",
        path: "/contact",
        file: "~/pages/index.vue",
      });
    },
  },
});
