<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/common/Card.vue'
import { useDark } from '@vueuse/core'

const { t, locale } = useI18n()
const isMobile = computed(() => window.innerWidth < 768)
const month = new Date().toLocaleString(locale.value, { month: 'long' })
const isDark = useDark()

// Financial data series
const financialSeries = computed(() => [
  {
    name: t('pt.home.revenue'),
    data: [4500, 5200, 4800, 6100, 5800, 6900, 7300],
  },
  {
    name: t('pt.home.profit'),
    data: [3200, 4100, 3700, 4900, 4500, 5400, 6100],
  }
])

// Chart colors with dark mode support
const chartColors = computed(() => ({
  revenue: isDark.value ? '#7FA8D7' : '#4C81BD',
  profit: isDark.value ? '#6EE7B7' : '#10B981',
  grid: isDark.value ? 'rgba(55, 65, 81, 0.1)' : 'rgba(209, 213, 219, 0.2)',
  text: isDark.value ? '#E5E7EB' : '#374151'
}))

// Chart options
const financialOptions = computed(() => ({
  chart: {
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: !isMobile.value }
  },
  colors: [chartColors.value.revenue, chartColors.value.profit],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day =>
      t(`pt.days.${day.toLowerCase()}`)
    ),
    labels: { style: { colors: chartColors.value.text } }
  },
  yaxis: {
    labels: {
      style: { colors: chartColors.value.text },
      formatter: (val: number) => `${formatCurrency(val)}`,
    }
  },
  grid: { borderColor: chartColors.value.grid },
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    x: { show: false },
    y: {
      formatter: (val: number) => `${formatCurrency(val)}`,
    }
  },
  legend: {
    position: 'top',
    labels: { colors: chartColors.value.text }
  },
  responsive: [{
    breakpoint: 768,
    options: {
      chart: { height: 250 },
      yaxis: { labels: { show: false } }
    }
  }]
}))

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(locale.value, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

// Financial summary data
const financialSummary = computed(() => ({
  monthly: 23500,
  average: 145,
  ytd: 128400
}))

watch(() => isDark.value, () => {
  financialOptions.value.colors = [chartColors.value.revenue, chartColors.value.profit]
  financialOptions.value.grid.borderColor = chartColors.value.grid
  financialOptions.value.tooltip.theme = isDark.value ? 'dark' : 'light'
})
</script>

<template>
  <Card>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
      <div>
        <h2 class="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Icon icon="mdi:finance" class="text-primary-600 dark:text-primary-400" />
          {{ t('pt.home.financialStatus') }}
        </h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ t('pt.home.revenueVsProfit') }}
        </p>
      </div>
      <div class="flex gap-2 items-center">
        <div class="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
          {{ month }}
        </div>
        <button class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
          <Icon icon="mdi:dots-horizontal" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <apexchart
      type="area"
      :height="isMobile ? 250 : 320"
      :options="financialOptions"
      :series="financialSeries"
      class="[&_.apexcharts-grid]:dark:!opacity-20"
    />

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('pt.home.monthlyRevenue') }}
        </div>
        <div class="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
          {{ formatCurrency(financialSummary.monthly) }}
        </div>
      </div>
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('pt.home.avgSession') }}
        </div>
        <div class="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
          {{ formatCurrency(financialSummary.average) }}
        </div>
      </div>
      <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30 col-span-2 md:col-span-1">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          {{ t('pt.home.ytdRevenue') }}
        </div>
        <div class="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-1">
          {{ formatCurrency(financialSummary.ytd) }}
        </div>
      </div>
    </div>
  </Card>
</template>
