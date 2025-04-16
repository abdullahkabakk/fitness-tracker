<template>
  <div class="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
    <div class="flex items-center gap-3">
      <div :class="['p-2 rounded-lg', status === 'warning' ? 'bg-orange-100 text-orange-600' : 'bg-primary-100 text-primary-500 dark:bg-primary-100']">
        <Icon :icon="icon" class="text-xl" />
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ label }}</h4>
        <p class="font-bold dark:text-white">{{ value }}</p>
      </div>
    </div>
    <div v-if="percentage" :class="['text-xs font-medium px-2 py-1 rounded-full', percentage.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ percentage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  percentage: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  }
})
</script>
