<template>
  <div class="stat-card bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ title }}</p>
        <div class="flex items-baseline gap-2">
          <span class="text-2xl font-semibold text-gray-800 dark:text-white">{{ formattedValue }}</span>
          <span v-if="unit" class="text-sm text-gray-500 dark:text-gray-400">{{ unit }}</span>
        </div>
      </div>
      <div class="p-2 rounded-full" :class="iconBgColor">
        <Icon :icon="icon" class="w-6 h-6" :class="iconColor" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [Number, String],
  icon: String,
  color: {
    type: String,
    default: 'text-gray-600'
  },
  unit: String
})

const formattedValue = computed(() => {

  return props.value
})

const iconBgColor = computed(() => ({
  'bg-blue-100 dark:bg-blue-900': props.color.includes('blue'),
  'bg-red-100 dark:bg-red-900': props.color.includes('red'),
  'bg-green-100 dark:bg-green-900': props.color.includes('green'),
  'bg-gray-100 dark:bg-gray-700': !props.color
}))

const iconColor = computed(() => props.color)
</script>
