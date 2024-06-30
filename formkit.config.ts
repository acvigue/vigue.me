// formkit.config.ts
import { en } from '@formkit/i18n'
import { defineFormKitConfig } from '@formkit/vue'
import { form, text, textarea, select } from '@formkit/inputs'

import { rootClasses } from './formkit.theme'

export default defineFormKitConfig(() => {
  return {
    locales: { en },
    locale: 'en',
    inputs: {
      textarea,
      text,
      form,
      select
    },
    config: {
      rootClasses,
    },
  }
})
