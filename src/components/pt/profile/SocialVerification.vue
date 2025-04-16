<template>
  <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-background-dark rounded-xl">
    <div class="flex items-center gap-3">
      <div :class="['p-2 rounded-lg', platformClasses[platform].bg]">
        <Icon :icon="platformClasses[platform].icon" class="text-xl text-white" />
      </div>
      <div>
        <h4 class="font-medium dark:text-white">{{ platform }}</h4>
        <p class="text-sm text-gray-500">{{ handle }}</p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <span v-if="followers" class="text-xs bg-white dark:bg-gray-600 px-2 py-1 rounded-full">
        {{ followers }} followers
      </span>
      <span v-if="verified" class="p-1 bg-blue-100 text-blue-600 rounded-full">
        <Icon icon="mdi:check-decagram" class="text-lg" />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  platform: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  followers: {
    type: String,
    default: ''
  }
})

const platformClasses = {
  Instagram: {
    bg: 'bg-gradient-to-tr from-pink-600 to-amber-500',
    icon: 'mdi:instagram'
  },
  LinkedIn: {
    bg: 'bg-blue-600',
    icon: 'mdi:linkedin'
  },
  YouTube: {
    bg: 'bg-red-600',
    icon: 'mdi:youtube'
  },
  Twitter: {
    bg: 'bg-blue-400',
    icon: 'mdi:twitter'
  }
}
</script>
