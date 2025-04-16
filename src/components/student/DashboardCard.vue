<template>
  <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div class="flex items-center gap-4">
      <div class="p-3 rounded-lg" :class="iconContainerClass">
        <Icon :icon="icon" class="w-6 h-6" :class="iconColorClass" />
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{{ title }}</h4>
        <p class="text-lg font-semibold dark:text-white">{{ value }}</p>
      </div>
    </div>
    <div v-if="trend" class="mt-4 flex items-center gap-1 text-sm">
      <Icon
        :icon="trend === 'up' ? 'mdi:arrow-top-right' : 'mdi:arrow-bottom-right'"
        class="w-4 h-4"
        :class="trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
      />
      <span :class="trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
        {{ percentage }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const props = defineProps({
  title: String,
  value: [String, Number],
  icon: String,
  trend: String as String | null,
  percentage: String,
  iconColor: {
    type: String,
    default: 'blue'
  }
})

const iconContainerClass = computed(() => ({
  'bg-blue-100 dark:bg-blue-900': props.iconColor === 'blue',
  'bg-green-100 dark:bg-green-900': props.iconColor === 'green',
  'bg-red-100 dark:bg-red-900': props.iconColor === 'red',
  'bg-purple-100 dark:bg-purple-900': props.iconColor === 'purple',
}))

const iconColorClass = computed(() => ({
  'text-blue-600 dark:text-blue-300': props.iconColor === 'blue',
  'text-green-600 dark:text-green-300': props.iconColor === 'green',
  'text-red-600 dark:text-red-300': props.iconColor === 'red',
  'text-purple-600 dark:text-purple-300': props.iconColor === 'purple',
}))
</script>
