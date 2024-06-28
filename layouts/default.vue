<template>
  <div>
    <MouseFollower />
    <div id="smooth-wrapper" class="bg-champagne">
      <div id="smooth-content">
        <NavHeader />
        <slot />
        <NavFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

const route = useRoute();

let ctx: gsap.Context | undefined;

onMounted(() => {
  watch(() => route.path, () => {
    console.debug('route changed to:', route.path);

    if (ctx) {
      ctx.revert();
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollSmoother);

    ctx = gsap.context(() => {
      ScrollSmoother.create({
        smooth: 0.5,
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
      });
    });
  }, { immediate: true });
});
</script>
