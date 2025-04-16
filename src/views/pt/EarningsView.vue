<template>
  <div class="space-y-8">
    <!-- Enhanced Header with Summary & Actions -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 class="text-3xl font-bold text-primary-text dark:text-white">{{ $t('earnings.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">{{ $t('earnings.subtitle', { date: currentDate }) }}</p>
      </div>
      <div class="flex gap-3 flex-shrink-0">
        <button class="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition flex items-center gap-2">
          <Icon icon="mdi:download" />
          {{ $t('earnings.exportButton') }}
        </button>
        <button class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition flex items-center gap-2">
          <Icon icon="mdi:cash-multiple" />
          {{ $t('earnings.payoutButton') }}
        </button>
      </div>
    </div>

    <!-- Enhanced Tabs with Icons -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="flex space-x-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex items-center gap-2 pb-4 px-4 border-b-2 cursor-pointer font-medium text-sm transition-colors',
            activeTab === tab.id
              ? 'border-primary text-primary dark:text-white'
              : 'border-transparent hover:border-gray-300 text-gray-500 dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-300'
          ]"
        >
          <Icon :icon="tab.icon" class="text-lg" />
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Earnings Dashboard -->
    <EarningsCard v-if="activeTab == 'earnings'"/>

    <!-- Subscription Analytics -->
    <SubscriptionsCard v-if="activeTab == 'subscriptions'"/>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import EarningsCard from '@/components/pt/earnings/EarningsCard.vue'
import SubscriptionsCard from '@/components/pt/earnings/SubscriptionsCard.vue'

const { t, locale } = useI18n()

// Current Date
const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString(locale.value, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Enhanced Tabs with Icons
const tabs = [
  { id: 'earnings', label: t('earnings.tabs.dashboard'), icon: 'mdi:chart-box' },
  { id: 'subscriptions', label: t('earnings.tabs.subscriptions'), icon: 'mdi:account-cash' }
]
const activeTab = ref('earnings')

</script>
