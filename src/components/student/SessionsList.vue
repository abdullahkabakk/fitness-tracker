<template>
  <div class="space-y-4">
    <div
      v-for="(session, index) in sessions"
      :key="index"
      class="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
    >
      <div>
        <h4 class="font-medium dark:text-white">{{ session.title }}</h4>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ $d(new Date(session.date), 'short') }} • {{ session.time }}
        </p>
      </div>
      <span class="px-2 py-1 text-sm rounded-full" :class="typeBadgeClass(session.type)">
        {{ $t(`student.home.sessionTypes.${session.type}`) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  sessions: {
    type: Array,
    required: true
  }
})

const typeBadgeClass = (type: string) => ({
  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300': type === 'workout',
  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300': type === 'nutrition',
  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300': type === 'checkin'
})
</script>
