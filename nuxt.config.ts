import glsl from "vite-plugin-glsl";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@tresjs/nuxt"],
  css: ["assets/main.scss"],
  vite: {
    plugins: [glsl()],
  },
});
