// formkit.config.ts
import { en } from "@formkit/i18n";
import { defineFormKitConfig } from "@formkit/vue";
import { rootClasses } from "./formkit.theme";
import { genesisIcons } from "@formkit/icons";

export default defineFormKitConfig(() => {
  return {
    locales: { en },
    locale: "en",
    config: {
      rootClasses,
      ...genesisIcons,
    },
  };
});
