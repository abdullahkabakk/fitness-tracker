<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import MetricCard from '@/components/pt/home/MetricCard.vue'
import { useI18n } from 'vue-i18n'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import { subscriptionsStats } from '@/helpers/pt/subscriptionStats.ts'

const { t, } = useI18n()
const calculatedLTV = computed(() => {
  return (ltvCalc.value.avgRevenue * ltvCalc.value.avgRetention).toFixed(2)
})

const ltvCalc = ref({
  avgRevenue: 50,
  avgRetention: 12
})

const churnChartOptions = {
  chart: {
    type: 'line',
    height: 350,
    zoom: { enabled: false },
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: [2]
  },
  colors: ['#FBBF24'],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  },
  tooltip: {
    shared: true,
    intersect: false
  }
}
const churnSeries = [
  {
    name: t('subscriptions.churn.rate'),
    data: [5, 4, 3, 2, 1, 0]
  }
]
const paymentMethodOptions = {
  chart: {
    type: 'donut',
    height: 350,
    toolbar: { show: false }
  },
  labels: [
    t('subscriptions.paymentMethods.card'),
    t('subscriptions.paymentMethods.paypal'),
    t('subscriptions.paymentMethods.bankTransfer')
  ],
  dataLabels: { enabled: false },
  colors: ['#4F46E5', '#10B981', '#FBBF24'],
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  }
}

const paymentMethodSeries = [
45, 35, 20
];

const atRiskClients = ref([
  {
    id: 1,
    name: 'John Doe',
    plan: t('subscriptions.plans.basic'),
    mrr: 50,
    risk: 'high',
    lastActive: '2 days ago',
    engagement: 20
  },
  {
    id: 2,
    name: 'Jane Smith',
    plan: t('subscriptions.plans.premium'),
    mrr: 100,
    risk: 'medium',
    lastActive: '1 week ago',
    engagement: 40
  }
])
</script>

<template>
  <div >
    <!-- Enhanced Subscription Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <DashboardCard
        v-for="(stat, index) in subscriptionsStats"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :percentage="stat.percentage"
        :is-currency="stat.isCurrency"
        large
      />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Enhanced Churn Rate Card -->
      <div class="bg-white dark:bg-header-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('subscriptions.churn.title') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('subscriptions.churn.subtitle') }}</p>
          </div>
          <span class="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm flex items-center gap-1">
              <Icon icon="mdi:alert-circle" /> {{ $t('subscriptions.churn.atRiskCount', { count: 2 }) }}
            </span>
        </div>
        <apexchart
          type="line"
          height="300"
          :options="churnChartOptions"
          :series="churnSeries"
        ></apexchart>
      </div>

      <!-- Enhanced Payment Methods Card -->
      <div class="bg-white dark:bg-header-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('subscriptions.paymentMethods.title') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('subscriptions.paymentMethods.subtitle') }}</p>
          </div>
        </div>
        <apexchart
          type="donut"
          height="300"
          :options="paymentMethodOptions"
          :series="paymentMethodSeries"
        ></apexchart>
      </div>

      <!-- Enhanced At-Risk Clients Card -->
      <div class="bg-white dark:bg-header-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('subscriptions.atRisk.title') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('subscriptions.atRisk.subtitle') }}</p>
          </div>
          <button class="text-primary cursor-pointer hover:text-primary-hover text-sm flex items-center gap-1.5">
            <Icon icon="mdi:file-document-outline" />
            {{ $t('subscriptions.atRisk.reportButton') }}
          </button>
        </div>
        <div class="space-y-4">
          <div v-for="client in atRiskClients" :key="client.id" class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-primary-300 dark:hover:border-primary-dark transition-colors">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/20 dark:bg-gray-600 flex items-center justify-center text-primary dark:text-primary-dark font-medium">
                  {{ client.name.charAt(0) }}{{ client.name.split(' ')[1].charAt(0) }}
                </div>
                <div>
                  <h4 class="font-medium text-gray-800 dark:text-gray-200">{{ client.name }}</h4>
                  <div class="flex items-center gap-2 text-sm text-gray-500">
                    <span>{{ client.plan }}</span>
                    <span class="text-xs">•</span>
                    <span>${{client.mrr}}/{{ $t('subscriptions.month') }}</span>
                  </div>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-red-500 dark:text-red-400 text-sm font-medium">{{ $t('subscriptions.atRisk.riskLabel', { risk: client.risk }) }}</span>
                <span class="text-xs text-gray-500">{{ client.lastActive }}</span>
              </div>
            </div>
            <div class="mt-1">
              <div class="text-xs font-medium text-gray-500 mb-1">{{ $t('subscriptions.atRisk.engagementLabel') }}</div>
              <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-red-500" :style="`width: ${client.engagement}%`"></div>
              </div>
            </div>
            <div class="flex gap-2 mt-4">
              <button class="flex-1 bg-primary hover:bg-primary-dark text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5">
                <Icon icon="mdi:email-outline" />
                {{ $t('subscriptions.atRisk.contactButton') }}
              </button>
              <button class="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5">
                <Icon icon="mdi:history" />
                {{ $t('subscriptions.atRisk.historyButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhanced LTV Calculator Card -->
      <div class="bg-white dark:bg-header-dark p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('subscriptions.ltv.title') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('subscriptions.ltv.subtitle') }}</p>
          </div>
          <button class="text-primary hover:text-primary-dark text-sm flex items-center gap-1.5">
            <Icon icon="mdi:information-outline" />
            {{ $t('subscriptions.ltv.infoButton') }}
          </button>
        </div>
        <div class="space-y-5">
          <div>
            <label class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ $t('subscriptions.ltv.avgRevenue') }}</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                v-model="ltvCalc.avgRevenue"
                type="number"
                class="w-full pl-8 p-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:focus:ring-primary dark:focus:border-primary"
              >
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-xs text-gray-500">{{ $t('subscriptions.ltv.min') }}: $20</span>
              <span class="text-xs text-gray-500">{{ $t('subscriptions.ltv.max') }}: $200</span>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">{{ $t('subscriptions.ltv.avgRetention') }}</label>
            <input
              v-model="ltvCalc.avgRetention"
              type="range"
              min="1"
              max="36"
              class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
            >
            <div class="flex justify-between mt-1">
              <span class="text-xs text-gray-500">1 {{ $t('subscriptions.month') }}</span>
              <span class="text-base font-medium text-gray-700 dark:text-gray-300">{{ ltvCalc.avgRetention }} {{ $t('subscriptions.months') }}</span>
              <span class="text-xs text-gray-500">36 {{ $t('subscriptions.months') }}</span>
            </div>
          </div>
          <div class="pt-5 border-t border-gray-200 dark:border-gray-700 mt-4">
            <div class="flex justify-between items-center">
              <span class="font-medium text-gray-700 dark:text-gray-300">{{ $t('subscriptions.ltv.estimatedLtv') }}:</span>
              <span class="text-2xl font-bold text-primary dark:text-primary-dark">
                  ${{ calculatedLTV }}
                </span>
            </div>
            <p class="text-sm text-gray-500 mt-2">{{ $t('subscriptions.ltv.description') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
