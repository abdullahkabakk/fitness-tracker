<script setup lang="ts">

import ToggleSwitch from '@/components/pt/settings/ToggleSwitch.vue'
import {ref} from 'vue'

const emailNotifications = ref(false)
const smsNotifications = ref(false)
const messageNotifications = ref(false)
const paymentNotifications = ref(false)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.notificationPreferences') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
          <div class="flex items-center justify-between">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ $t('pt.settings.emailNotifications') }}
            </p>
            <ToggleSwitch v-model="emailNotifications" />
          </div>
          <div class="flex items-center justify-between">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ $t('pt.settings.smsNotifications') }}
            </p>
            <ToggleSwitch v-model="smsNotifications" />
          </div>
        </div>

        <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-4">
          <div class="flex items-center justify-between">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ $t('pt.settings.newMessages') }}
            </p>
            <ToggleSwitch v-model="messageNotifications" />
          </div>
          <div class="flex items-center justify-between">
            <p class="font-medium text-gray-900 dark:text-white">
              {{ $t('pt.settings.paymentReminders') }}
            </p>
            <ToggleSwitch v-model="paymentNotifications" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
