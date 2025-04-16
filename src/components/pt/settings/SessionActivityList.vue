<template>
  <div class="space-y-4">
    <div
      v-for="(session, index) in sessions"
      :key="index"
      class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
    >
      <div class="space-y-1">
        <div class="flex items-center gap-2">
          <Icon
            :icon="getDeviceIcon(session.device)"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
          />
          <span class="font-medium text-gray-900 dark:text-white">
            {{ session.device }}
          </span>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ session.location }} · {{ session.lastActive }}
        </p>
      </div>
      <button class="text-red-600 hover:text-red-700 text-sm">
        {{ $t('pt.settings.logOut') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  sessions: Array<{
    device: string
    location: string
    lastActive: string
  }>
}>()

const getDeviceIcon = (device: string) => {
  if (device.includes('iPhone')) return 'mdi:cellphone'
  if (device.includes('Mac')) return 'mdi:laptop'
  return 'mdi:devices'
}
</script>
