<template>
    <dv-dropdown>
        <dv-button variant="ghost">
            <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                <fa :icon="{prefix:'fas', iconName : 'palette'}" class="mr-2" />   
                <div class="flex-grow text-xs font-bold">
                    {{ modelValue }}
                </div>
                <div class="flex flex-shrink-0 flex-wrap gap-1">
                    <div class="bg-primary w-2 rounded"></div>
                    <div class="bg-secondary w-2 rounded"></div>
                    <div class="bg-accent w-2 rounded"></div>
                    <div class="bg-neutral w-2 rounded"></div>
                </div>
            </div>
        </dv-button>
        <template #content>
            <div class="bg-base-200 outline-base-300 shadow-2xl rounded-xl max-h-96 overflow-y-auto p-2 space-y-3 z-10 p-4">
                <div v-for="theme in themeList" :data-theme="theme" :key="theme" :class="
                    {
                        'grid grid-cols-5 grid-rows-3 bg-base-100 text-base-content w-full cursor-pointer font-sans rounded-md':
                            true,
                        outline: modelValue === theme,
                    }" @click="$emit('update:modelValue', theme)">
                    <div class="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                        <div class="flex-grow text-sm font-bold">
                            {{ theme }}
                        </div>
                        <div class="flex flex-shrink-0 flex-wrap gap-1">
                            <div class="bg-primary w-2 rounded"></div>
                            <div class="bg-secondary w-2 rounded"></div>
                            <div class="bg-accent w-2 rounded"></div>
                            <div class="bg-neutral w-2 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </dv-dropdown>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';
defineProps(["modelValue"]);
const themeList = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
];
</script>