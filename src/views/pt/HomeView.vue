<template>
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 class="text-2xl font-bold">
          {{ $t('pt.home.welcomeBack', { name: 'Coach Alex' }) }}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">{{ currentDate }}</p>
      </div>
      <div class="flex gap-2 flex-shrink-0">
        <button
          class="bg-white dark:bg-header-dark cursor-pointer border border-gray-300 dark:border-gray-700 py-2 px-4 rounded-lg flex items-center gap-2 whitespace-nowrap"
        >
          <Icon icon="mdi:calendar-plus" />
          <span>{{ $t('pt.home.scheduleSessions') }}</span>
        </button>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
      <DashboardCard
        v-for="(stat, index) in stats"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :percentage="stat.percentage"
        :is-currency="stat.isCurrency"
      />
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      <ClientActivity />
      <FinancialStatus />
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Sessions Table -->
      <SessionsTable />

      <!-- Notifications Panel -->
      <NotificationsPanel />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import NotificationsPanel from '@/components/pt/home/NotificationsPanel.vue'
import SessionsTable from '@/components/pt/home/SessionsTable.vue'
import ClientActivity from '@/components/pt/home/ClientActivity.vue'
import FinancialStatus from '@/components/pt/home/FinancialStatus.vue'
import { useI18n } from 'vue-i18n'
import { stats } from '@/helpers/pt/stats.ts'

const { locale } = useI18n()

const currentDate = computed(() => {
  const now = new Date()
  return now.toLocaleDateString(locale.value, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
})
</script>
