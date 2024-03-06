// formkit.config.ts
import { en } from "@formkit/i18n";
import { defaultConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";
import { genesisIcons } from "@formkit/icons";
import proPlugin from "./formkit.pro";

export default defaultConfig({
  locales: { en },
  locale: "en",
  plugins: [proPlugin],
  config: {
    rootClasses,
    ...genesisIcons,
  },
});
