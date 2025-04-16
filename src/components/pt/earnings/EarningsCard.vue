<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import { earningsStats } from '@/helpers/pt/earningStats.ts'
import Card from '@/components/common/Card.vue'
import { useDark } from '@vueuse/core'

const { t } = useI18n()
const isDark = useDark()

watch(() => isDark.value, (newVal) => {
  revenueChartOptions.value.colors = [
    newVal ? '#7FA8D7' : '#4C81BD',
    newVal ? '#C1D4F5' : '#A3BFFA'
  ]
})

const chartColors = computed(() => ({
  primary: isDark.value ? '#7FA8D7' : '#4C81BD',
  secondary: isDark.value ? '#C1D4F5' : '#A3BFFA',
  text: isDark.value ? '#E5E7EB' : '#374151',
  grid: isDark.value ? 'rgba(55, 65, 81, 0.1)' : 'rgba(209, 213, 219, 0.2)'
}))

// Enhanced Earnings Data
const payments = ref([
  {
    id: 1,
    client: { name: 'Sarah Johnson' },
    service: t('earnings.payments.services.personalTraining'),
    amount: 120,
    dueDate: 'Jun 15, 2024',
    status: 'paid',
    paidDate: 'Jun 12, 2024'
  },
  {
    id: 2,
    client: { name: 'Mike Peters' },
    service: t('earnings.payments.services.nutritionPlan'),
    amount: 85,
    dueDate: 'Jun 20, 2024',
    status: 'pending'
  },
  {
    id: 3,
    client: { name: 'Emma Wilson' },
    service: t('earnings.payments.services.groupClass'),
    amount: 55,
    dueDate: 'Jun 10, 2024',
    status: 'overdue'
  }
])

const payouts = ref([
  {
    id: 1,
    date: 'June 30, 2024',
    amount: 3250,
    method: t('earnings.payouts.methods.bankTransfer'),
    methodIcon: 'mdi:bank',
    status: 'pending'
  },
  {
    id: 2,
    date: 'May 31, 2024',
    amount: 2875,
    method: t('earnings.payouts.methods.paypal'),
    methodIcon: 'mdi:paypal',
    status: 'completed'
  },
  {
    id: 3,
    date: 'April 30, 2024',
    amount: 2650,
    method: t('earnings.payouts.methods.bankTransfer'),
    methodIcon: 'mdi:bank',
    status: 'completed'
  }
])

const paymentStatusClasses = {
  paid: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
  pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
  overdue: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
}

const revenueChartOptions = {
  chart: {
    type: 'area',
    height: 350,
    zoom: { enabled: false },
    toolbar: { show: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: [2, 2]
  },
  colors: [chartColors.value.primary, chartColors.value.secondary],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    labels: {
      style: {
        colors: chartColors.value.text,
        fontSize: '12px',
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: chartColors.value.text,
        fontSize: '12px',
      }
    }
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  legend: {
    labels: { colors: chartColors.value.text },
  },
}
const revenueSeries = [
  {
    name: t('earnings.charts.totalRevenue'),
    data: [4000, 4500, 5000, 5500, 6000, 6500]
  },
  {
    name: t('earnings.charts.netProfit'),
    data: [3000, 3500, 4000, 4500, 5000, 5500]
  }
]

</script>

<template>
  <div>
    <!-- Date Range Selector -->
    <div class="flex justify-between items-center mb-6">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        {{ $t('earnings.dateRange') }}: <span class="font-medium text-gray-800 dark:text-gray-200">Mar 15 - Apr 15, 2025</span>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
          {{ $t('earnings.dateRanges.month') }}
        </button>
        <button class="px-3 py-1 text-sm bg-primary50 dark:bg-primary900/30 text-primary600 dark:text-primary400 rounded-lg">
          {{ $t('earnings.dateRanges.quarter') }}
        </button>
        <button class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600">
          {{ $t('earnings.dateRanges.year') }}
        </button>
        <button class="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-1">
          <Icon icon="mdi:calendar" class="text-base" />
          {{ $t('earnings.dateRanges.custom') }}
        </button>
      </div>
    </div>

    <!-- Enhanced Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <DashboardCard
        v-for="(stat, index) in earningsStats"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :trend="stat.trend"
        :icon="stat.icon"
        :percentage="stat.percentage"
        :is-currency="stat.isCurrency"
      />
    </div>

    <!-- Enhanced Revenue Chart -->
    <Card class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('earnings.charts.monthlyRevenue') }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('earnings.charts.monthlyRevenueDesc') }}</p>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1 text-sm">
            <span class="w-3 h-3 rounded-full bg-primary500"></span>
            <span>{{ $t('earnings.charts.totalRevenue') }}</span>
          </div>
          <div class="flex items-center gap-1 text-sm">
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <span>{{ $t('earnings.charts.netProfit') }}</span>
          </div>
          <select class="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm py-1.5 pl-3 pr-8">
            <option>{{ $t('earnings.charts.timeRanges.year') }}</option>
            <option>{{ $t('earnings.charts.timeRanges.ytd') }}</option>
            <option>{{ $t('earnings.charts.timeRanges.custom') }}</option>
          </select>
        </div>
      </div>
      <apexchart
        type="area"
        height="350"
        :options="revenueChartOptions"
        :series="revenueSeries"
      ></apexchart>
    </Card>

    <!-- Payment Status & Payout Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Enhanced Payment Status -->
      <Card  class="lg:col-span-2">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('earnings.payments.title') }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('earnings.payments.subtitle') }}</p>
          </div>
          <div>
            <select class="bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm py-1.5 px-3">
              <option>{{ $t('earnings.payments.filters.all') }}</option>
              <option>{{ $t('earnings.payments.filters.pending') }}</option>
              <option>{{ $t('earnings.payments.filters.paid') }}</option>
            </select>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 dark:bg-gray-700 text-xs uppercase tracking-wider">
            <tr>
              <th class="text-left p-3 rounded-tl-lg">{{ $t('earnings.payments.columns.client') }}</th>
              <th class="text-left p-3">{{ $t('earnings.payments.columns.amount') }}</th>
              <th class="text-left p-3">{{ $t('earnings.payments.columns.dueDate') }}</th>
              <th class="text-left p-3">{{ $t('earnings.payments.columns.status') }}</th>
              <th class="text-left p-3 rounded-tr-lg">{{ $t('earnings.payments.columns.action') }}</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
            <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td class="p-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary100 dark:bg-gray-600 flex items-center justify-center text-primary600 dark:text-primary400 font-medium text-xs">
                    {{ payment.client.name.charAt(0) }}{{ payment.client.name.split(' ')[1].charAt(0) }}
                  </div>
                  <div>
                    <div class="font-medium">{{ payment.client.name }}</div>
                    <div class="text-xs text-gray-500">{{ $t(payment.service) }}</div>
                  </div>
                </div>
              </td>
              <td class="p-3 font-medium">${{ payment.amount }}</td>
              <td class="p-3 text-gray-500">{{ payment.dueDate }}</td>
              <td class="p-3">
                    <span :class="['px-2.5 py-1 rounded-full text-xs font-medium', paymentStatusClasses[payment.status]]">
                      {{ $t(`earnings.payments.statuses.${payment.status}`) }}
                    </span>
              </td>
              <td class="p-3">
                <div class="flex items-center gap-2">
                  <button v-if="payment.status === 'pending'" class="text-primary600 hover:text-primary800 text-sm flex items-center gap-1">
                    <Icon icon="mdi:bell-outline" />
                    {{ $t('earnings.payments.actions.remind') }}
                  </button>
                  <button v-if="payment.status === 'pending'" class="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1 ml-2">
                    <Icon icon="mdi:dots-horizontal" />
                  </button>
                  <span v-else class="text-gray-400 text-sm">{{ $t('earnings.payments.actions.paidOn', { date: payment.paidDate }) }}</span>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-between items-center mt-4 text-sm">
          <span class="text-gray-500">{{ $t('earnings.payments.showing', { count: payments.length }) }}</span>
          <button class="text-primary600 hover:text-primary800 flex items-center gap-1">
            {{ $t('earnings.payments.viewAll') }} <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </Card>

      <!-- Enhanced Payout Schedule -->
      <Card>
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('earnings.payouts.title') }}</h3>
          <button class="text-primary600 hover:text-primary800 text-sm">
            {{ $t('earnings.payouts.editSchedule') }}
          </button>
        </div>

        <!-- Next Payout Banner -->
        <div class="bg-primary50 dark:bg-primary900/30 p-4 rounded-lg mb-6">
          <div class="flex items-start gap-3">
            <Icon icon="mdi:calendar-check" class="text-2xl text-primary600 dark:text-primary400 mt-1" />
            <div>
              <h4 class="font-medium text-primary800 dark:text-primary300">{{ $t('earnings.payouts.nextPayout') }}</h4>
              <div class="flex gap-4 mt-1">
                <div>
                  <div class="text-xs text-primary600/70 dark:text-primary400/70">{{ $t('earnings.payouts.date') }}</div>
                  <div class="font-medium text-primary800 dark:text-primary300">June 30, 2024</div>
                </div>
                <div>
                  <div class="text-xs text-primary600/70 dark:text-primary400/70">{{ $t('earnings.payouts.amount') }}</div>
                  <div class="font-medium text-primary800 dark:text-primary300">$3,250</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Payout History -->
        <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">{{ $t('earnings.payouts.history') }}</h4>
        <div class="space-y-4">
          <div v-for="payout in payouts" :key="payout.id" class="border-b border-gray-300 pb-4 last:border-0 dark:border-gray-700">
            <div class="flex justify-between items-center mb-2">
              <span class="font-medium text-gray-800 dark:text-gray-200">{{ payout.date }}</span>
              <span class="font-bold text-gray-900 dark:text-white">${{ payout.amount }}</span>
            </div>
            <div class="flex justify-between text-sm">
                <span class="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Icon :icon="payout.methodIcon" />
                  {{ payout.method }}
                </span>
              <span :class="{
                  'text-green-500 dark:text-green-400': payout.status === 'completed',
                  'text-yellow-500 dark:text-yellow-400': payout.status === 'pending',
                  'text-blue-500 dark:text-blue-400': payout.status === 'processing'
                }">
                  {{ $t(`earnings.payouts.statuses.${payout.status}`) }}
                </span>
            </div>
          </div>
        </div>

        <!-- Account Info -->
        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <h4 class="font-medium text-gray-700 dark:text-gray-300 mb-3">{{ $t('earnings.payouts.payoutMethod') }}</h4>
          <div class="flex items-center justify-between bg-gray-50 dark:bg-background-dark p-3 rounded-lg">
            <div class="flex items-center gap-3">
              <Icon icon="mdi:bank" class="text-2xl text-gray-500" />
              <div>
                <div class="font-medium text-gray-800 dark:text-gray-200">Chase Bank ****3456</div>
                <div class="text-xs text-gray-500">{{ $t('earnings.payouts.defaultMethod') }}</div>
              </div>
            </div>
            <button class="text-primary600 hover:text-primary800 text-sm">
              {{ $t('earnings.payouts.change') }}
            </button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
