<template>
  <div class="flex items-start gap-3">
    <div class="p-2 bg-purple-100 dark:bg-gray-700 rounded-lg text-purple-600 dark:text-purple-400">
      <Icon :icon="icon" class="text-xl" />
    </div>
    <div>
      <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ label }}</h4>
      <p class="font-medium dark:text-white">
        <slot />
      </p>
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
  }
})
</script>
