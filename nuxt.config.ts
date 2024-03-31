import glsl from "vite-plugin-glsl";
import { splitVendorChunkPlugin } from "vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image"],
  css: ["assets/main.scss"],
  vite: {
    plugins: [glsl(), splitVendorChunkPlugin()],
  },
  runtimeConfig: {
    ghostContentKey: "",
    ghostAdminKey: "",
    ghostWebhookKey: "",
    ghostUrl: "https://cms.vigue.me",
    public: {
      formkitKey: "",
    },
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
});
