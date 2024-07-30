<template>
  <WidthContainer class="pb-12">
    <div class="flex flex-col h-full justify-center gap-12 w-full">
      <DuotoneHeading title="Just a little bit" subtitle="about me" />
      <div class="w-full md:grid-cols-2 grid-cols-1 grid gap-8 justify-center">
        <div class="col-span-1 flex w-full justify-center">
          <div class="relative max-w-md">
            <div
              class="absolute aspect-square max-w-md w-full -rotate-1 transform rounded-md bg-licorice bg-opacity-50 -z-10" />
            <NuxtPicture format="avif,webp,jpg" :src="appConfig.headshotImage" placeholder data-cursor="-pointer"
              class="about-headshot" />
          </div>
        </div>
        <div class="col-span-1 flex flex-col gap-4 about-prose">
          <p>I'm a student at <span class='text-persian'>Purdue University</span> currently studying computer science!
            My dream job is embedded engineering and this
            site is just a way for me to show what I'm currently working on. It also doubles as my portfolio, so if you
            like what you see, consider subscribing to the newsletter!</p>
          <p>Right now, I'm working at Levitree as a <span class='text-persian'>Software & Hardware Development
              Intern</span>, where I'm making an
            embedded Linux host PCB to control industrial elements from anywhere in the world over an LTE
            connection.</p>
          <p>With various explorations in tech, I've worked on <span class='text-persian'>frontend development</span>
            with Nuxt (which powers this site)
            and Vue, while also configuring production-ready workloads on AWS or Oracle Cloud. My repertoire of
            languages
            includes proficiency in C/C++, TypeScript, and Swift.</p>
        </div>
      </div>
      <div class="w-full flex flex-col gap-4 about-prose">
        <p>I'm also the <span class='text-persian'>Project Lead</span> for the iOS and tvOS teams in the Jellyfin
          project, where I develop and
          maintain
          the SwiftFin client, a next-generation native video player for the Jellyfin Media Server, an <span
            class='text-persian'>open-source</span>
          alternative to Plex and Emby.</p>
        <p>I also post my projects on Instructables.com, a platform renowned for its DIY-oriented members. My work
          garnered the attention of their parent company, <span class='text-persian'>Autodesk</span>, who invited me to
          become a founding member of a
          <span class='text-persian'>student-led ambassador program</span> this year. Our goal was to widen the user
          base of Autodesk's empowering
          software across the globe, maximizing its benefits in fields like engineering, architecture, and beyond.
        </p>
      </div>
    </div>
  </WidthContainer>
</template>

<script setup lang="ts">
import DuotoneHeading from '~/components/DuotoneHeading.vue';

const appConfig = useAppConfig();

useSeoMeta({
  title: `About - ${appConfig.name}`,
  description: appConfig.aboutMetaDescription,
  ogDescription: appConfig.aboutMetaDescription,
  ogTitle: `About - ${appConfig.name}`,
  ogType: 'website',
  ogUrl: `${appConfig.baseUrl}/about`,
  keywords: appConfig.keywords,
})

defineOgImageComponent('Page', {
  title: `About`,
  image: appConfig.headshotImage,
  description: appConfig.aboutMetaDescription,
})
</script>

<style lang="scss">
.about-headshot>img {
  max-height: 40vh;
  object-fit: cover;
  @apply rounded-md;
}

.about-prose {
  @apply text-licorice font-serif text-xl;
}
</style>
