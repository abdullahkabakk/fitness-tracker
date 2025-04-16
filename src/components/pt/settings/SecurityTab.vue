<script setup lang="ts">
import ToggleSwitch from '@/components/pt/settings/ToggleSwitch.vue'
import SessionActivityList from '@/components/pt/settings/SessionActivityList.vue'
import { ref } from 'vue'
const twoFactorEnabled = ref(false)
const activeSessions = ref([
  {
    id: 1,
    device: 'Windows 10',
    browser: 'Chrome',
    lastActive: '2023-10-01 12:00 PM',
  },
  {
    id: 2,
    device: 'iPhone 12',
    browser: 'Safari',
    lastActive: '2023-10-02 03:00 PM',
  },
])
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.password') }}
      </h3>
      <div class="space-y-4 max-w-md">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('pt.settings.currentPassword') }}
          </label>
          <input
            type="password"
            class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('pt.settings.newPassword') }}
          </label>
          <input
            type="password"
            class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('pt.settings.confirmPassword') }}
          </label>
          <input
            type="password"
            class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>

    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.twoFactorAuth') }}
      </h3>
      <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div class="space-y-1">
          <p class="font-medium text-gray-900 dark:text-white">
            {{ $t('pt.settings.2faStatus') }}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('pt.settings.2faDescription') }}
          </p>
        </div>
        <ToggleSwitch v-model="twoFactorEnabled" />
      </div>
    </div>

    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.activeSessions') }}
      </h3>
      <SessionActivityList :sessions="activeSessions" />
    </div>
  </div>
</template>
