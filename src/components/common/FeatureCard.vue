<template>
  <div class="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-purple-100 dark:hover:border-gray-700">
    <div class="w-12 h-12 bg-primary-light/10 dark:bg-primary-light/10 rounded-lg flex items-center justify-center mb-4">
      <Icon :icon="icon" class="w-6 h-6 text-primary dark:text-primary" />
    </div>
    <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{{ title }}</h3>
    <p class="text-gray-600 dark:text-gray-300">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
</script>
