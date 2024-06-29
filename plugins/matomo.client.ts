// @ts-expect-error There is no type definition for this package
import VueMatomo from 'vue-matomo'

export default defineNuxtPlugin((nuxtApp) => {
  //ignore if not prod
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  nuxtApp.vueApp.use(VueMatomo, {
    trackerUrl: '/api/gather',
    trackerScriptUrl: '/api/gather',
    siteId: 1,
    preInitActions: [
      ['setRequestMethod', 'POST'],
      ['disableAlwaysUseSendBeacon'],
    ],
    debug: true,
    router: nuxtApp.$router,
  })
})
