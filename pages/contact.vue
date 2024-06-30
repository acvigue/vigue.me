<template>
  <WidthContainer>
    <div class="flex justify-center items-center w-full py-[4rem]">
      <div class="flex flex-col h-full justify-center gap-12 w-full">
        <DuotoneHeading title="Got an idea?" subtitle="Let's bring it to life!" />
        <div class="w-full flex justify-center">
          <div class="rounded-lg p-4 border border-khaki shadow-lg w-full max-w-4xl">
            <h4 class="mb-4 text-2xl font-serif text-persian font-bold">Contact Me</h4>
            <FormKit type="form" class="lg:w-2xl" :actions="false">
              <FormKit type="text" label="Your Name" validation="required" />
              <FormKit type="text" label="Email" validation="required|email" />
              <FormKit type="text" label="Employer" validation="required" />
              <FormKit type="textarea" label="Message" validation="required" />
              <button type="submit"
                class="flex text-licorice items-center gap-2 border-licorice border-2 rounded-full px-4 hover:bg-licorice hover:text-champagne duration-500"
                data-cursor-stick>
                <span class="font-serif2 text-lg">Send </span>
                <EnvelopeIcon class="h-5" />
              </button>
            </FormKit>
          </div>
        </div>
      </div>
    </div>
  </WidthContainer>
</template>

<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/outline';
import DuotoneHeading from '~/components/DuotoneHeading.vue';

const appConfig = useAppConfig();

useSeoMeta({
  title: `Contact - ${appConfig.name}`,
  description: appConfig.contactMetaDescription,
  ogDescription: appConfig.contactMetaDescription,
  ogTitle: `Contact - ${appConfig.name}`,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/contact`,
  keywords: appConfig.keywords,
})

defineOgImageComponent('Page', {
  title: `Contact`,
  image: appConfig.headshotImage,
  description: appConfig.contactMetaDescription,
})
</script>
