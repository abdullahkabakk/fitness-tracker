<template>
  <div :class="['flex gap-3 p-3 rounded-lg', unread ? 'bg-primary-50 dark:bg-background-dark' : 'hover:bg-gray-50 dark:hover:bg-gray-700']">
    <div :class="['p-2 rounded-full', notificationTypeClasses[type].bg, notificationTypeClasses[type].text]">
      <Icon :icon="notificationTypeClasses[type].icon" class="text-lg" />
    </div>
    <div class="flex-1 min-w-0">
      <h4 class="font-medium truncate dark:text-white">{{ title }}</h4>
      <p class="text-sm text-gray-500 truncate">
        <slot />
      </p>
    </div>
    <div class="flex flex-col items-end">
      <span class="text-xs text-gray-400">{{ time }}</span>
      <span v-if="unread && !compact" class="mt-1 w-2 h-2 bg-primary-500 rounded-full"></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

defineProps({
  type: {
    type: String,
    default: 'message',
    validator: (value: string) => ['message', 'payment', 'system'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  unread: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  }
})

const notificationTypeClasses = computed(() => ({
  message: {
    bg: 'bg-blue-100 dark:bg-blue-900',
    text: 'text-blue-600 dark:text-blue-300',
    icon: 'mdi:message-text-outline'
  },
  payment: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-600 dark:text-green-300',
    icon: 'mdi:currency-usd'
  },
  system: {
    bg: 'bg-primary-100 dark:bg-primary-900',
    text: 'text-primary-600 dark:text-primary-300',
    icon: 'mdi:cog-outline'
  }
}))
</script>
