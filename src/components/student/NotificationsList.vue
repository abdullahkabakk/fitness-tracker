<template>
  <div class="space-y-2">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="group relative flex items-start gap-4 py-2 rounded-xl transition-all"
      :class="[
        notification.read
          ? 'bg-white/50 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
      ]"
    >

      <!-- Icon Container -->
      <div class="shrink-0 mt-1 p-2.5 rounded-xl shadow-sm"
           :class="notificationBgClass(notification.type)">
        <Icon
          :icon="notification.icon"
          class="w-6 h-6"
          :class="notificationIconClass(notification.type)"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex justify-between gap-2">
          <h4 class="text-sm font-semibold" :class="notification.read
            ? 'text-gray-600 dark:text-gray-300'
            : 'text-gray-900 dark:text-white'">
            {{ notification.title }}
          </h4>
          <span class="text-xs text-gray-400 dark:text-gray-500">
            {{ formatTime(notification.timestamp) }}
          </span>
        </div>
        <p class="mt-1 text-sm" :class="notification.read
          ? 'text-gray-500 dark:text-gray-400'
          : 'text-gray-700 dark:text-gray-300'">
          {{ notification.message }}
        </p>

        <!-- Urgency Indicator -->
        <div v-if="notification.urgency !== 'low'" class="mt-2 flex items-center gap-1.5">
          <Icon
            :icon="urgencyIcons[notification.urgency]"
            class="w-4 h-4"
            :class="urgencyTextColors[notification.urgency]"
          />
          <span class="text-xs font-medium" :class="urgencyTextColors[notification.urgency]">
            {{ urgencyLabels[notification.urgency] }}
          </span>
        </div>
      </div>

      <!-- Close Button -->
      <button class="hidden group-hover:block shrink-0 p-1 -m-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full">
        <Icon icon="mdi:close" class="w-5 h-5 text-gray-400 dark:text-gray-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { formatDistanceToNow } from 'date-fns'

defineProps({
  notifications: {
    type: Array,
    required: true
  }
})

// Type Styling
const notificationBgClass = (type: string) => ({
  'bg-blue-100/80 dark:bg-blue-900/30': type === 'info',
  'bg-red-100/80 dark:bg-red-900/30': type === 'alert',
  'bg-green-100/80 dark:bg-green-900/30': type === 'success'
})

const notificationIconClass = (type: string) => ({
  'text-blue-600 dark:text-blue-300': type === 'info',
  'text-red-600 dark:text-red-400': type === 'alert',
  'text-green-600 dark:text-green-400': type === 'success'
})

// Urgency Styling
const urgencyIcons = {
  high: 'mdi:alert-octagon',
  medium: 'mdi:alert',
  low: ''
}

const urgencyLabels = {
  high: 'Urgent',
  medium: 'Important',
  low: ''
}

const urgencyTextColors = {
  high: 'text-red-600 dark:text-red-400',
  medium: 'text-amber-600 dark:text-amber-400',
  low: ''
}

// const notificationUrgencyBorder = {
//   high: 'border-l-4 border-red-500',
//   medium: 'border-l-4 border-amber-400',
//   low: 'border-l-4 border-transparent'
// }

// Time formatting
const formatTime = (timestamp: string) => {
  return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
}
</script>
