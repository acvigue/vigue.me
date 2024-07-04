// @ts-expect-error There is no type definition for this package
import VueMatomo from 'vue-matomo'

export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();

  //ignore if not prod
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  nuxtApp.vueApp.use(VueMatomo, {
    trackerUrl: '/api/gather/track',
    trackerScriptUrl: '/api/gather/script',
    siteId: runtimeConfig.public.matomoSiteId,
    preInitActions: [
      ['setRequestMethod', 'POST'],
      ['disableAlwaysUseSendBeacon'],
    ],
    debug: false,
    router: nuxtApp.$router,
  })
})
