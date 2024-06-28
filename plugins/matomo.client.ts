// @ts-expect-error There is no type definition for this package
import VueMatomo from 'vue-matomo'

export default defineNuxtPlugin((nuxtApp) => {
  const appConfig = useAppConfig()
  
  //ignore if in dev
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  nuxtApp.vueApp.use(VueMatomo, {
    host: appConfig.matomoURL,
    trackerFileName: 'main',
    siteId: 1,
    preInitActions: [
      ['setRequestMethod', 'POST'],
      ['disableAlwaysUseSendBeacon'],
    ],
    debug: false,
    // Enables automatically registering pageviews on the router
    router: nuxtApp.$router,
  })
})
