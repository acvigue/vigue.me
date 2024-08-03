<script setup lang="ts">
const open = ref(false);
const progress = ref(Array.from({ length: 12 }, () => 0));

const computedStyleVars = computed(() => {
    return {
        '--opacity': 1,
        ...Array.from({ length: 12 }, (_, i) => {
            return {
                [`--progress-${i + 1}`]: progress.value[i],
            };
        }).reduce((acc, val) => ({ ...acc, ...val }), {}),
    };
});

watch(open, (newVal) => {
    //If open, we start from full progress, gradually decreasing to 0, but offset for each element
    if (newVal) {
        const x = setInterval(() => {
            //set all to 1
            for (let i = 0; i < 12; i++) {
                progress.value[i] = 1;
            }

            progress.value = progress.value.map((_, i) => {
                return Math.max(progress.value[i] - 0.1, 0);
            });
            if (progress.value.every((v) => v === 0)) {
                clearInterval(x);
            }
        }, 1000 / 120);
    }
});

onNuxtReady(() => {
    //Initial animation
    const x = setInterval(() => {
        progress.value = progress.value.map((_, i) => {
            return Math.min(progress.value[i] + 0.1, 1);
        });
        if (progress.value.every((v) => v === 1)) {
            clearInterval(x);
            open.value = true;
        }
    }, 1000 / 120);

    setInterval(() => {
        open.value = !open.value;
    }, 1000);
});
</script>

<template>
    <Teleport to="body">
        <div class="page-transition bg-licorice" :style="computedStyleVars" />
    </Teleport>
</template>

<style lang="scss">
.page-transition {
    --opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    opacity: var(--opacity);
    transition: background 1s ease-out;
    pointer-events: none;

    --panel-12: calc(var(--progress-12) * 100%);
    --panel-11: calc(var(--progress-11) * 100%);
    --panel-10: calc(var(--progress-10) * 100%);
    --panel-9: calc(var(--progress-9) * 100%);
    --panel-8: calc(var(--progress-8) * 100%);
    --panel-7: calc(var(--progress-7) * 100%);
    --panel-6: calc(var(--progress-6) * 100%);
    --panel-5: calc(var(--progress-5) * 100%);
    --panel-4: calc(var(--progress-4) * 100%);
    --panel-3: calc(var(--progress-3) * 100%);
    --panel-2: calc(var(--progress-2) * 100%);
    --panel-1: calc(var(--progress-1) * 100%);
    clip-path: polygon(0 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 0) var(--panel-1), calc(calc(100vw - var(--scrollbar-width)) / 24 * 2) var(--panel-1), calc(calc(100vw - var(--scrollbar-width)) / 24 * 2) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 2) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 2) var(--panel-2), calc(calc(100vw - var(--scrollbar-width)) / 24 * 4) var(--panel-2), calc(calc(100vw - var(--scrollbar-width)) / 24 * 4) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 4) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 4) var(--panel-3), calc(calc(100vw - var(--scrollbar-width)) / 24 * 6) var(--panel-3), calc(calc(100vw - var(--scrollbar-width)) / 24 * 6) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 6) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 6) var(--panel-4), calc(calc(100vw - var(--scrollbar-width)) / 24 * 8) var(--panel-4), calc(calc(100vw - var(--scrollbar-width)) / 24 * 8) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 8) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 8) var(--panel-5), calc(calc(100vw - var(--scrollbar-width)) / 24 * 10) var(--panel-5), calc(calc(100vw - var(--scrollbar-width)) / 24 * 10) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 10) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 10) var(--panel-6), calc(calc(100vw - var(--scrollbar-width)) / 24 * 12) var(--panel-6), calc(calc(100vw - var(--scrollbar-width)) / 24 * 12) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 12) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 12) var(--panel-7), calc(calc(100vw - var(--scrollbar-width)) / 24 * 14) var(--panel-7), calc(calc(100vw - var(--scrollbar-width)) / 24 * 14) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 14) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 14) var(--panel-8), calc(calc(100vw - var(--scrollbar-width)) / 24 * 16) var(--panel-8), calc(calc(100vw - var(--scrollbar-width)) / 24 * 16) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 16) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 16) var(--panel-9), calc(calc(100vw - var(--scrollbar-width)) / 24 * 18) var(--panel-9), calc(calc(100vw - var(--scrollbar-width)) / 24 * 18) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 18) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 18) var(--panel-10), calc(calc(100vw - var(--scrollbar-width)) / 24 * 20) var(--panel-10), calc(calc(100vw - var(--scrollbar-width)) / 24 * 20) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 20) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 20) var(--panel-11), calc(calc(100vw - var(--scrollbar-width)) / 24 * 22) var(--panel-11), calc(calc(100vw - var(--scrollbar-width)) / 24 * 22) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 22) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 22) var(--panel-12), calc(calc(100vw - var(--scrollbar-width)) / 24 * 24) var(--panel-12), calc(calc(100vw - var(--scrollbar-width)) / 24 * 24) 0, calc(calc(100vw - var(--scrollbar-width)) / 24 * 24) 0);
}

html {
    --scrollbar-width: 15px;
}
</style>