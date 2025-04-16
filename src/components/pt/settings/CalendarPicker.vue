<template>
  <div class="space-y-4">
    <div class="grid grid-cols-7 gap-2">
      <button
        v-for="(day, idx) in days"
        :key="idx"
        @click="toggleDay(day)"
        :class="[
          'p-2 rounded-lg text-sm',
          day.isSelected
            ? 'bg-primary text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        ]"
      >
        {{ format(day.date, 'EEE') }}
      </button>
    </div>

    <div class="flex items-center gap-2">
      <input
        type="time"
        v-model="startTime"
        disabled
        class="rounded-lg dark:text-white border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
      />
      <span class="text-gray-500">-</span>
      <input
        type="time"
        disabled
        v-model="endTime"
        class="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, startOfWeek, addDays } from 'date-fns'

const startTime = ref('09:00')
const endTime = ref('17:00')

const days = computed(() => {
  const start = startOfWeek(new Date())
  return Array.from({ length: 7 }).map((_, i) => ({
    date: addDays(start, i),
    isSelected: true
  }))
})

const toggleDay = (day: { date: Date; isSelected: boolean }) => {
  day.isSelected = !day.isSelected
}
</script>
