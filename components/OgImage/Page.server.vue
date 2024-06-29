<script setup lang="ts">
import SiteLogo from '~/assets/icons/logo.svg'

const props = defineProps({
    path: String,
    title: {
        type: String,
        default: 'Og Image Template',
    },
    description: {
        type: String,
        optional: true
    },
    image: {
        type: String,
        required: false,
    },
    readingMins: {
        type: Number,
        required: false,
    },
})

const appConfig = useAppConfig()

const flareStyle = {
    backgroundImage: 'radial-gradient(circle, rgba(187, 68, 48, 0.2) 0%,  rgba(241, 224, 197, 1) 50%, rgba(241, 224, 197,0) 70%)',
}

const flareTwoStyle = {
    backgroundImage: 'radial-gradient(circle, rgba(201, 183, 156, 1) 0%,  rgba(241, 224, 197, 0.3) 50%, rgba(241, 224, 197,0) 70%)',
}

const titleStyle = {
    fontWeight: 700,
    fontSize: '2.5rem',
}

const descriptionStyle = {
    fontWeight: 500,
    fontSize: '1.7rem',
}

const readingTimeStyle = {
    fontWeight: 500,
    fontSize: '1.7rem',
}
</script>

<template>
    <div>
        <div class="bg-champagne flex absolute w-full h-full" />
        <div :style="flareStyle" class="flex absolute -right-1/2 top-0 w-[200%] h-[200%]" />
        <div :style="flareTwoStyle" class="flex absolute -left-[5%] w-[150%] h-[150%]" />
        <div class="w-full h-full flex flex-row">
            <div class="w-1/2 rounded-r-md p-10">
                <div class="flex flex-col h-full justify-between text-persian font-serif">
                    <div class="flex flex-row justify-between items-center h-full">
                        <div class="flex flex-col h-full justify-between">
                            <div class="flex flex-col">
                                <h1 :style="titleStyle">
                                    {{ title || 'Null Title' }}
                                </h1>
                                <h2 :style="descriptionStyle">
                                    {{ description || '' }}
                                </h2>
                            </div>
                            <div class="flex flex-col">
                                <div class="flex gap-4 items-center">
                                    <SiteLogo
                                        class="w-12 h-12 !stroke-[0.2em] stroke-licorice !text-transparent !fill-transparent"
                                        style="stroke-linecap: round; stroke-linejoin: round" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2 items-end justify-center">
                <img v-if="image" :src="image" height="630" width="630" style="object-fit: cover;"
                    class="rounded-xl max-w-full">
                <div v-else class="w-full h-full bg-persian" />
            </div>
        </div>
    </div>

</template>
