import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@tresjs/nuxt"],
  css: ["assets/main.scss"],
  vite: {
    plugins: [glsl()],
  },
  runtimeConfig: {
    ghostContentKey: "",
    ghostAdminKey: "",
    ghostWebhookKey: "",
    ghostUrl: "https://cms.vigue.me",
    imgproxyHost: "",
    imgproxyKey: "",
    imgproxySalt: "",
    public: {
      formkitKey: "",
    },
  },
  routeRules: {},
  experimental: {
    componentIslands: true,
  },
});
