<template>
  <div class="flex justify-center items-center w-full py-10">
    <div class="flex flex-col h-full lg:max-w-7xl w-[95vw] gap-4">
      <div class="flex flex-col items-center text-licorice mb-4 gap-4">
        <div class="flex w-full items-start">
          <DuotoneHeading title="My" subtitle="Résumé" />
        </div>

        <button
          class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
          data-cursor-stick @click="download">
          <span class="font-serif2 text-lg">Download</span>
          <ArrowDownTrayIcon class="h-5" />
        </button>
      </div>

      <div class="flex w-full flex-col gap-5 px-4 antialiased md:px-0">
        <ClientOnly>
          <VuePdfEmbed annotation-layer text-layer :source="url" />
        </ClientOnly>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import VuePdfEmbed from 'vue-pdf-embed'
import { ArrowDownTrayIcon } from '@heroicons/vue/24/solid'

// essential styles
import 'vue-pdf-embed/dist/style/index.css'

// optional styles
import 'vue-pdf-embed/dist/style/annotationLayer.css'
import 'vue-pdf-embed/dist/style/textLayer.css'

const url = "https://cdn.vigue.me/Resume.pdf";
const saveAsName = "Aiden-Vigue_Resume.pdf";
const appConfig = useAppConfig();

const download = () => {
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network Problem");
      }
      return res.blob();
    })
    .then((file) => {
      const tUrl = URL.createObjectURL(file);
      const tmp1 = document.createElement("a");
      tmp1.href = tUrl;
      tmp1.download = saveAsName;
      document.body.appendChild(tmp1);
      tmp1.click();
      URL.revokeObjectURL(tUrl);
      tmp1.remove();
    })
}

useSeoMeta({
  title: `Résumé - ${appConfig.name}`,
  description: appConfig.resumeMetaDescription,
  ogDescription: appConfig.resumeMetaDescription,
  ogTitle: `Résumé - ${appConfig.name}`,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/resume`,
  keywords: appConfig.keywords,
})

defineOgImageComponent('Page', {
  title: `Résumé`,
  image: appConfig.headshotImage,
  description: appConfig.resumeMetaDescription,
})
</script>