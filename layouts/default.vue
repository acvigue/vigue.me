<template>
  <div class="min-w-screen min-h-screen z-0 bg-champagne">
    <div id="smooth-wrapper">
      <div id="smooth-content" class="bg-champagne pt-20 pb-8 min-h-[200vh]">
        <NavBar />
        <slot />
        <Footer />
      </div>
    </div>
  </div>

  <MouseFollower />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ScrollSmoother } from 'gsap-trial/ScrollSmoother';
import { gsap } from 'gsap-trial';

const route = useRoute();

let ctx: gsap.Context | undefined;

onNuxtReady(() => {
  gsap.registerPlugin(ScrollSmoother);

  watch(() => route.path, () => {
    console.log('route changed');

    if (ctx) {
      ctx.revert();
    }

    ctx = gsap.context(() => {
      ScrollSmoother.create({
        smooth: 2,
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
      });
    });
  }, { immediate: true });
});
</script>
