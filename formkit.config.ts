// formkit.config.ts
import { en } from '@formkit/i18n'
import { defineFormKitConfig } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
import { rootClasses } from './formkit.theme'

export default defineFormKitConfig(() => {
  return {
    locales: { en },
    locale: 'en',
    config: {
      rootClasses,
      ...genesisIcons,
    },
  }
})
