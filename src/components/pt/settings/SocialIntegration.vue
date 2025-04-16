<template>
  <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div class="flex items-center gap-4">
      <div
        :class="[
          'p-2 rounded-lg',
          connected ? 'bg-primary-100 dark:bg-primary-light/30 text-primary' : 'bg-gray-200 dark:bg-gray-600'
        ]"
      >
        <Icon :icon="platformIcon" class="w-6 h-6" />
      </div>
      <div>
        <h4 class="font-medium text-gray-900 dark:text-white">
          {{ platform }}
        </h4>
        <p v-if="handle" class="text-sm text-gray-500 dark:text-gray-400">
          @{{ handle }}
        </p>
      </div>
    </div>
    <button
      :class="[
        'px-4 py-2 rounded-lg text-sm',
        connected
          ? 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
          : 'bg-primary text-white hover:bg-primary-dark'
      ]"
    >
      {{ connected ? $t('pt.settings.connected') : $t('pt.settings.connect') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import {computed} from 'vue';

const props = defineProps<{
  platform: string
  handle?: string
  connected?: boolean
}>()

const platformIcon = computed(() => {
  return {
    'Instagram': 'mdi:instagram',
    'YouTube': 'mdi:youtube',
    'LinkedIn': 'mdi:linkedin',
  }[props.platform] || 'mdi:social-distance'
})
</script>
