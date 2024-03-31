import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@tresjs/nuxt", "@nuxt/image"],
  css: [
    "assets/main.scss",
    "@/node_modules/highlight.js/scss/monokai-sublime.scss",
    "vue-easy-lightbox/external-css/vue-easy-lightbox.css",
  ],
  vite: {
    plugins: [glsl()],
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
  routeRules: {},
  experimental: {
    componentIslands: true,
  },
});
