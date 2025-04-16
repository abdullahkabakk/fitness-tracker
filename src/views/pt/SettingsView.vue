<template>
  <div class="space-y-8">
    <!-- Settings Header -->
    <Card>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('pt.settings.title') }}</h1>
          <p class="text-gray-600 dark:text-gray-400">{{ $t('pt.settings.subtitle') }}</p>
        </div>
        <button class="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2">
          <Icon icon="mdi:content-save" class="text-lg" />
          {{ $t('pt.settings.saveChanges') }}
        </button>
      </div>
    </Card>

    <!-- Settings Navigation Tabs -->
    <Card>
      <nav class="flex overflow-x-hidden border-b border-gray-200 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-4 text-sm font-medium border-b-2',
            activeTab === tab.id
              ? 'border-primary text-primary dark:text-primary-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          ]"
        >
          {{ $t(tab.label) }}
        </button>
      </nav>

      <!-- Tab Contents -->
      <div class="p-6">
        <!-- Account Settings -->
        <AccountTab v-if="activeTab === 'account'" />

        <!-- Security Settings -->
        <SecurityTab v-if="activeTab === 'security'" />
        <!-- Notifications Settings -->
        <NotificationsTab v-if="activeTab === 'notifications'" />

        <!-- Integrations Settings -->
        <IntegrationsTab v-if="activeTab === 'integrations'" />
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AccountTab from '@/components/pt/settings/AccountTab.vue'
import SecurityTab from '@/components/pt/settings/SecurityTab.vue'
import NotificationsTab from '@/components/pt/settings/NotificationsTab.vue'
import IntegrationsTab from '@/components/pt/settings/IntegrationsTab.vue'
import Card from '@/components/common/Card.vue'

const activeTab = ref('account')

const tabs = [
  { id: 'account', label: 'pt.settings.account' },
  { id: 'security', label: 'pt.settings.security' },
  { id: 'notifications', label: 'pt.settings.notifications' },
  { id: 'integrations', label: 'pt.settings.integrations' }
]
</script>
