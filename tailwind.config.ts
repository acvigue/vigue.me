import type { Config } from "tailwindcss";

export default {
  content: [
    "pages/**.vue",
    "components/**.vue",
    "layouts/**.vue",
    "plugins/**.ts",
    "./formkit.theme.ts",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
