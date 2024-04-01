<template>
  <div ref="scroller">
    <div class="h-full w-fit flex" ref="panelsContainer">
      <Panel><SectionJumbotron /></Panel>
      <Panel><SectionAbout /></Panel>
      <Panel><SectionAbout /></Panel>
      <Panel><SectionAbout /></Panel>
      <Panel><SectionAbout /></Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const route = useRoute();
const panelsContainer = shallowRef<HTMLDivElement>();
const scroller = ref<HTMLDivElement>();

let ctx: gsap.Context;

watch(
  route,
  (newRoute) => {
    console.log(newRoute.name);
  },
  { immediate: true }
);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scroller.value,
        end: "+=5000",
        scrub: 1,
        pin: true,
      },
    });
    tl.to(
      panelsContainer.value!,
      {
        xPercent: -100,
        x: () => innerWidth,
        ease: "none",
      },
      "start"
    );
  });
});

onBeforeUnmount(() => {
  ctx.revert();
});
</script>
