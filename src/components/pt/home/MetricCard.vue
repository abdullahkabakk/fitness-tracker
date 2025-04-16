<template>
  <Card>
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div :class="['p-2 rounded-lg', color, 'bg-opacity-20']">
          <Icon :icon="icon" class="text-xl" />
        </div>
        <span class="font-medium">{{ title }}</span>
      </div>
      <div v-if="trend" :class="['flex items-center text-sm font-medium', trend.startsWith('+') ? 'text-green-500' : 'text-red-500']">
        {{ trend }}
        <Icon :icon="trend.startsWith('+') ? 'mdi:trending-up' : 'mdi:trending-down'" class="ml-1" />
      </div>
    </div>
    <div class="mt-3 flex items-end justify-between">
      <span :class="['text-2xl font-bold', color]">{{ value }}</span>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        vs last month
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '@/components/common/Card.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'text-purple-600'
  },
  trend: {
    type: String,
    default: ''
  }
})
</script>
