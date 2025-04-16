<template>
  <div class="space-y-8">
    <!-- Enhanced Header with Description -->
    <div class="mb-8">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div>
          <h1 class="text-xl md:text-2xl font-bold text-primary-text dark:text-white">
            {{ $t('plans.title') }}
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl">
            {{ $t('plans.description') }}
          </p>
        </div>
        <button class="bg-primary hover:bg-primary-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all flex items-center gap-2">
          <Icon icon="mdi:plus" class="text-lg" />
          {{ $t('plans.createButton') }}
        </button>
      </div>

      <!-- Plan Selection Toggle -->
      <div class="flex items-center justify-center mt-6 mb-2">
        <span :class="{'text-primary font-medium': billingCycle === 'monthly', 'text-gray-500': billingCycle !== 'monthly'}">
          {{ $t('plans.monthly') }}
        </span>
        <ToggleSwitch v-model:model-value="isYearly" class="mx-2"/>

        <span :class="{'text-primary font-medium': billingCycle === 'yearly', 'text-gray-500': billingCycle !== 'yearly'}">
          {{ $t('plans.yearly') }} <span class="text-xs  ml-2 text-green-500 ml-1">{{ $t('plans.savePercent') }}</span>
        </span>
      </div>
    </div>

    <!-- Pricing Plans Grid with Comparison -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
      <Card
        v-for="plan in plans"
        :key="plan.name"
        class="relative "
        :class="{'border-primary border-2': plan.popular}"
      >
        <div v-if="plan.popular" class="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-tr-lg rounded-bl-lg text-xs md:text-sm font-medium">
          {{ $t('plans.mostPopular') }}
        </div>

        <div class="text-center mb-6">
          <div class="inline-block bg-primary-50 dark:bg-gray-700 rounded-full p-3 mb-3">
            <Icon :icon="plan.icon" class="text-2xl text-primary" />
          </div>
          <h3 class="text-xl md:text-2xl font-bold mb-2 text-primary-text dark:text-white">{{ plan.name }}</h3>
          <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">{{ plan.description }}</p>
          <div class="flex items-center justify-center gap-1">
            <span class="text-3xl md:text-4xl font-bold text-primary-text dark:text-white">
              ${{ billingCycle === 'yearly' ? Math.floor(plan.price * 10) : plan.price }}
            </span>
            <span class="text-gray-500 dark:text-gray-400 text-sm">
              {{ $t(`plans.per${billingCycle === 'yearly' ? 'Year' : 'Month'}`) }}
            </span>
          </div>
          <div v-if="billingCycle === 'yearly'" class="text-green-500 text-sm mt-1">
            {{ $t('plans.saveText') }}
          </div>
        </div>

        <div class="space-y-3 md:space-y-4 mb-6 md:mb-8">
          <div v-for="feature in plan.features" :key="feature.name" class="flex items-start gap-2 md:gap-3">
            <Icon
              :icon="feature.included ? 'mdi:check-circle' : 'mdi:close-circle'"
              :class="feature.included ? 'text-green-500' : 'text-gray-400'"
              class="text-lg md:text-xl mt-0.5"
            />
            <div>
              <span class="text-sm md:text-base text-gray-700 dark:text-gray-300">
                {{ feature.name }}
              </span>
              <p v-if="feature.description" class="text-xs text-gray-500 mt-0.5">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-auto flex w-full justify-around space-y-4 h-fit">
<!--          <button class="w-full py-2.5 rounded-lg font-medium transition-all"-->
<!--                  :class="plan.popular ? 'bg-primary text-white hover:bg-primary-700' : 'bg-primary-50 text-primary hover:bg-primary-100 dark:bg-gray-700 dark:text-primary-400 dark:hover:bg-gray-600'">-->
<!--            {{ $t('plans.selectButton') }}-->
<!--          </button>-->

          <div class="flex items-center justify-between w-full mt-auto text-xs">
            <span class="text-gray-500 dark:text-gray-400">
              {{ $t('plans.subscribers', { count: plan.subscribers }) }}
            </span>
            <button class="text-primary dark:text-primary-400 flex items-center gap-1.5">
              <Icon icon="mdi:information-outline" class="text-base" />
              {{ $t('plans.learnMore') }}
            </button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Plan Features Comparison -->
    <Card class="mt-10">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg md:text-xl font-semibold text-primary-text dark:text-white">
          {{ $t('plans.comparison.title') }}
        </h3>
        <button class="text-primary dark:text-primary-400 text-sm flex items-center gap-1.5">
          <Icon icon="mdi:download" />
          {{ $t('plans.comparison.download') }}
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
          <tr>
            <th class="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ $t('plans.comparison.feature') }}
            </th>
            <th v-for="plan in plans" :key="`header-${plan.name}`"
                class="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ plan.name }}
            </th>
          </tr>
          </thead>
          <tbody class="bg-white dark:bg-transparent divide-y divide-gray-200 dark:divide-gray-700">
          <tr v-for="(category) in featureCategories" :key="category.name">
            <td class="py-4 px-4 bg-gray-50 dark:bg-gray-800 font-medium" colspan="4">
              {{ category.name }}
            </td>
          </tr>
          <tr v-for="feature in allFeatures" :key="feature.id">
            <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-300">
              {{ feature.name }}
              <Icon v-if="feature.tooltip" icon="mdi:information-outline" class="text-gray-400 ml-1 inline cursor-help" />
            </td>
            <td v-for="plan in plans" :key="`${plan.name}-${feature.id}`" class="py-3 px-4 text-center text-sm">
              <Icon
                v-if="typeof feature.availability[plan.id] === 'boolean'"
                :icon="feature.availability[plan.id] ? 'mdi:check-bold' : 'mdi:minus'"
                :class="feature.availability[plan.id] ? 'text-green-500' : 'text-gray-400'"
                class="mx-auto text-xl"
              />
              <span v-else class="text-gray-600 dark:text-gray-300">{{ feature.availability[plan.id] }}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Subscription Statistics -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6">
      <DashboardCard
        v-for="(stat, index) in planStats"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :trend="stat.trend"
        :percentage="stat.percentage"
        :is-currency="stat.isCurrency"
      />
    </div>

    <!-- Subscription Growth Chart -->
    <Card>
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h3 class="text-lg md:text-xl font-semibold text-primary-text dark:text-white">
          {{ $t('charts.growth') }}
        </h3>
        <div class="flex items-center gap-2">
          <button
            v-for="period in ['30d', '90d', '1y', 'all']"
            :key="period"
            @click="setChartPeriod(period)"
            class="px-3 py-1 text-sm rounded-md transition-colors"
            :class="chartPeriod === period ? 'bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'"
          >
            {{ $t(`charts.periods.${period}`) }}
          </button>
        </div>
      </div>
      <apexchart
        type="line"
        height="300"
        :options="chartOptions"
        :series="chartData"
      ></apexchart>
    </Card>

    <!-- FAQ Section -->
    <Card>
      <div class="flex w-full">
      <h3 class="text-lg md:text-xl font-semibold mb-6 text-primary-text dark:text-white">
        {{ $t('plans.faq.title') }}
      </h3>
        <button
          @click="toggleFaq(null)"
          class="bg-primary-50 dark:bg-gray-700 text-primary dark:text-primary-400 rounded-lg cursor-pointer px-4 ml-auto text-sm flex items-center gap-1.5 mb-4"
        >
          Edit
          <Icon icon="mdi:edit" />
        </button>
      </div>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
          <button
            @click="toggleFaq(index)"
            class="flex justify-between items-center w-full text-left py-2 focus:outline-none"
          >
            <h4 class="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200">{{ faq.question }}</h4>
            <Icon
              :icon="openFaq === index ? 'mdi:chevron-up' : 'mdi:chevron-down'"
              class="text-gray-500 text-xl"
            />
          </button>
          <div v-show="openFaq === index" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/components/common/Card.vue'
import ToggleSwitch from '@/components/pt/settings/ToggleSwitch.vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import { planStats } from '@/helpers/pt/planStats.ts'

const { t } = useI18n()

// Billing cycle toggle
const isYearly = ref(false)
const billingCycle = computed(() => isYearly.value ? 'yearly' : 'monthly')


// Plans data with enhanced information
const plans = ref([
  {
    id: 'starter',
    name: t('plans.starter.name'),
    description: t('plans.starter.description'),
    price: 29,
    icon: 'mdi:run',
    features: [
      { name: t('plans.features.basicWorkouts'), included: true, description: t('plans.features.basicWorkoutsDesc') },
      { name: t('plans.features.weeklyCheckins'), included: true, description: null },
      { name: t('plans.features.emailSupport'), included: true, description: null },
      { name: t('plans.features.progressTracking'), included: true, description: null },
      { name: t('plans.features.customPlans'), included: false, description: null },
      { name: t('plans.features.mealPlans'), included: false, description: null },
      { name: t('plans.features.videoCalls'), included: false, description: null }
    ],
    subscribers: 24,
    popular: false
  },
  {
    id: 'pro',
    name: t('plans.pro.name'),
    description: t('plans.pro.description'),
    price: 79,
    icon: 'mdi:weight-lifter',
    features: [
      { name: t('plans.features.basicWorkouts'), included: true, description: t('plans.features.basicWorkoutsDesc') },
      { name: t('plans.features.weeklyCheckins'), included: true, description: null },
      { name: t('plans.features.emailSupport'), included: true, description: null },
      { name: t('plans.features.progressTracking'), included: true, description: null },
      { name: t('plans.features.customPlans'), included: true, description: t('plans.features.customPlansDesc') },
      { name: t('plans.features.mealPlans'), included: true, description: null },
      { name: t('plans.features.videoCalls'), included: true, description: t('plans.features.videoCallsDesc') }
    ],
    subscribers: 35,
    popular: true
  },
  {
    id: 'premium',
    name: t('plans.premium.name'),
    description: t('plans.premium.description'),
    price: 149,
    icon: 'mdi:crown',
    features: [
      { name: t('plans.features.basicWorkouts'), included: true, description: t('plans.features.basicWorkoutsDesc') },
      { name: t('plans.features.weeklyCheckins'), included: true, description: null },
      { name: t('plans.features.emailSupport'), included: true, description: null },
      { name: t('plans.features.progressTracking'), included: true, description: null },
      { name: t('plans.features.customPlans'), included: true, description: t('plans.features.customPlansDesc') },
      { name: t('plans.features.mealPlans'), included: true, description: null },
      { name: t('plans.features.videoCalls'), included: true, description: t('plans.features.videoCallsDesc') },
      { name: t('plans.features.prioritySupport'), included: true, description: t('plans.features.prioritySupportDesc') },
      { name: t('plans.features.supplementGuide'), included: true, description: null },
      { name: t('plans.features.biometricAnalysis'), included: true, description: null }
    ],
    subscribers: 9,
    popular: false
  }
])

// Feature categories for comparison table
const featureCategories = ref([
  { name: t('plans.comparison.categories.basic'), id: 'basic' },
  { name: t('plans.comparison.categories.coaching'), id: 'coaching' },
  { name: t('plans.comparison.categories.nutrition'), id: 'nutrition' },
  { name: t('plans.comparison.categories.support'), id: 'support' }
])

// All features for comprehensive comparison table
const allFeatures = ref([
  {
    id: 'workouts',
    name: t('plans.features.workoutsPerMonth'),
    category: 'basic',
    availability: { starter: '5', pro: '15', premium: 'Unlimited' },
    tooltip: t('plans.tooltips.workoutsPerMonth')
  },
  {
    id: 'tracking',
    name: t('plans.features.progressTracking'),
    category: 'basic',
    availability: { starter: true, pro: true, premium: true },
    tooltip: null
  },
  {
    id: 'checkins',
    name: t('plans.features.coachCheckins'),
    category: 'coaching',
    availability: { starter: 'Weekly', pro: '2x Week', premium: 'Daily' },
    tooltip: null
  },
  {
    id: 'custom',
    name: t('plans.features.customPlans'),
    category: 'coaching',
    availability: { starter: false, pro: true, premium: true },
    tooltip: null
  },
  {
    id: 'calls',
    name: t('plans.features.videoCalls'),
    category: 'coaching',
    availability: { starter: '0', pro: '2/month', premium: 'Unlimited' },
    tooltip: null
  },
  {
    id: 'meal',
    name: t('plans.features.mealPlans'),
    category: 'nutrition',
    availability: { starter: false, pro: true, premium: true },
    tooltip: null
  },
  {
    id: 'supplements',
    name: t('plans.features.supplementGuide'),
    category: 'nutrition',
    availability: { starter: false, pro: false, premium: true },
    tooltip: t('plans.tooltips.supplementGuide')
  },
  {
    id: 'email',
    name: t('plans.features.emailSupport'),
    category: 'support',
    availability: { starter: true, pro: true, premium: true },
    tooltip: null
  },
  {
    id: 'priority',
    name: t('plans.features.prioritySupport'),
    category: 'support',
    availability: { starter: false, pro: true, premium: true },
    tooltip: null
  },
  {
    id: '24support',
    name: t('plans.features.24/7Support'),
    category: 'support',
    availability: { starter: false, pro: false, premium: true },
    tooltip: null
  }
])

// FAQ Section
const openFaq = ref(null)
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const faqs = ref([
  {
    question: t('plans.faq.q1'),
    answer: t('plans.faq.a1')
  },
  {
    question: t('plans.faq.q2'),
    answer: t('plans.faq.a2')
  },
  {
    question: t('plans.faq.q3'),
    answer: t('plans.faq.a3')
  },
  {
    question: t('plans.faq.q4'),
    answer: t('plans.faq.a4')
  },
  {
    question: t('plans.faq.q5'),
    answer: t('plans.faq.a5')
  }
])

// Chart configuration
const chartPeriod = ref('30d')
const setChartPeriod = (period) => {
  chartPeriod.value = period
  // In a real app, this would update the chart data based on the selected period
}

const chartData = ref([
  {
    name: t('charts.series.subscriptions'),
    data: [28, 40, 36, 52, 49, 60, 55, 68, 60, 75, 80, 90]
  },
  {
    name: t('charts.series.revenue'),
    data: [1400, 2100, 1900, 3100, 2800, 3600, 3300, 4200, 3800, 4900, 5200, 6000]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: 350,
    foreColor: '#6B7280',
    toolbar: { show: false },
    background: 'transparent'
  },
  colors: ['#4C81BD', '#48BB78'],
  stroke: {
    curve: 'smooth',
    width: 3
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: [
    {
      title: {
        text: t('charts.yaxis.subscriptions')
      },
      labels: {
        formatter: (val: number) => `${val}`,
        style: { colors: '#6B7280' }
      }
    },
    {
      opposite: true,
      title: {
        text: t('charts.yaxis.revenue')
      },
      labels: {
        formatter: (val: number) => `$${val}`,
        style: { colors: '#6B7280' }
      }
    }
  ],
  grid: {
    borderColor: '#F3F4F6',
    strokeDashArray: 4
  },
  markers: { size: 5 },
  tooltip: { theme: 'dark' },
  theme: {
    mode: 'dark'
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
}))
</script>
