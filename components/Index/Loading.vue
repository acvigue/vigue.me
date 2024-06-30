<template>
    <Teleport to="body">
        <div ref="loader"
            class="fixed top-0 left-0 w-screen h-screen bg-licorice z-[100] flex justify-center items-center flex-col">
            <div class="font-serif2 font-bold text-4xl uppercase text-champagne">
                <span ref="firstName" class="opacity-0">Aiden</span>
                <span>&nbsp;</span>
                <span ref="lastName" class="opacity-0">Vigue</span>
            </div>
            <div class="font-serif2 font-bold text-2xl uppercase text-khaki">
                <span ref="year" class="opacity-0">2024</span>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import gsap from 'gsap';

const loader = ref<HTMLDivElement>();
const firstName = ref<HTMLSpanElement>();
const lastName = ref<HTMLSpanElement>();
const year = ref<HTMLSpanElement>();

let ctx: gsap.Context;

onMounted(() => {
    if (ctx) ctx.revert();

    ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            firstName.value!,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                ease: "power1.inOut",
                duration: 0.5,
            }
        );

        tl.fromTo(
            lastName.value!,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                ease: "power1.inOut",
                duration: 0.5,
            },
            "<+0.4"
        );

        tl.fromTo(
            year.value!,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                ease: "power1.inOut",
                duration: 0.5,
            },
            "<+0.4"
        );

        tl.fromTo(
            loader.value!,
            {
                y: "0%",
            },
            {
                y: "-100%",
                duration: 1,
                ease: "power3.inOut",
            },
            "<+0.5"
        );
    });
});
</script>