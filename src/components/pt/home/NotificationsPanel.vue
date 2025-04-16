<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '@/components/common/Card.vue'

// Notifications data
const notifications = [
  {
    title: 'New Message',
    message: 'Emma Johnson has sent you a message about her workout plan.',
    time: '10 min ago',
    icon: 'mdi:message-text-outline',
    className: 'border-blue-500/80 bg-gradient-to-r from-blue-50/90 to-white dark:from-blue-900/20 dark:to-gray-800'
  },
  {
    title: 'Reminder',
    message: 'Create a new workout plan for Mike Wilson by tomorrow.',
    time: '1 hour ago',
    icon: 'mdi:alert-circle-outline',
    className: 'border-amber-500/80 bg-gradient-to-r from-amber-50/90 to-white dark:from-amber-900/20 dark:to-gray-800'
  },
  {
    title: 'Payment Received',
    message: 'You received a payment of $150 from Sarah Miller.',
    time: '3 hours ago',
    icon: 'mdi:currency-usd',
    className: 'border-emerald-500/80 bg-gradient-to-r from-emerald-50/90 to-white dark:from-emerald-900/20 dark:to-gray-800'
  }
]

// Progress updates data
const progressUpdates = [
  {
    name: 'Emma Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    message: 'Completed all workout sessions this week!',
    time: 'Today',
    progress: 100
  },
  {
    name: 'Mike Wilson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    message: 'Lost 2lbs this week. Keep it up!',
    time: 'Yesterday',
    progress: 85
  }
]
</script>

<template>
  <Card>
    <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <h2 class="font-bold text-lg flex items-center gap-2">
        <Icon icon="mdi:bell-outline" class="text-primary-600 dark:text-primary-400" />
        Notifications
      </h2>
      <button class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <Icon icon="mdi:dots-horizontal" class="w-5 h-5" />
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="(notification, index) in notifications"
        :key="index"
        class="group p-4 rounded-lg border-l-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        :class="[notification.className, 'relative overflow-hidden']"
      >
        <div class="absolute right-2 top-2 opacity-20 group-hover:opacity-40 transition-opacity">
          <Icon :icon="notification.icon" class="w-12 h-12" />
        </div>
        <div class="flex items-start gap-3 relative">
          <div class="mt-1 p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm">
            <Icon :icon="notification.icon" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <div class="flex justify-between items-start">
              <span class="font-semibold text-gray-800 dark:text-gray-200">{{ notification.title }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">{{ notification.time }}</span>
            </div>
            <p class="text-sm mt-1.5 text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ notification.message }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
      <h3 class="font-medium mb-4 flex items-center gap-2 text-gray-700 dark:text-gray-300">
        <Icon icon="mdi:chart-line" class="text-purple-500" />
        Client Progress Updates
      </h3>
      <div class="space-y-4">
        <div
          v-for="(update, index) in progressUpdates"
          :key="index"
          class="flex items-center gap-4 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-700/30 transition-colors"
        >
          <div class="relative">
            <img :src="update.avatar" alt="Client" class="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm">
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-700 flex items-center justify-center">
              <Icon icon="mdi:check" class="text-white text-xs" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-center gap-2">
              <span class="font-medium text-gray-800 dark:text-gray-200 truncate">{{ update.name }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 shrink-0">{{ update.time }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300 truncate-2-lines leading-tight mt-1">
              {{ update.message }}
            </p>
            <div class="mt-2 flex items-center gap-2">
              <div class="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full flex-1">
                <div
                  class="h-full bg-green-500 rounded-full transition-all duration-500 ease-out"
                  :style="{ width: `${update.progress}%` }"
                ></div>
              </div>
              <span class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ update.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style>
/* Custom truncation for 2 lines */
.truncate-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth progress bar animation */
.bg-green-500 {
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
