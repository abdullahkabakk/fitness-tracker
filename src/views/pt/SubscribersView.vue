<template>
  <div class="">
    <!-- Header with analytics summary -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">Client Dashboard</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">Manage your clients and track their fitness journeys</p>
      </div>
      <div class="mt-4 md:mt-0 flex gap-3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search clients..."
            class="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-header-dark focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Icon
            icon="mdi:magnify"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
        </div>
        <div class="flex gap-2">
          <button class="bg-primary hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center gap-2">
            <Icon icon="mdi:filter-variant" />
            <span>Filter</span>
          </button>
          <button class="bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800 py-2 px-4 rounded-lg flex items-center gap-2">
            <Icon icon="mdi:export" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Analytics Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <DashboardCard
        v-for="(stat, index) in subscriberAnalytics"
        :key="index"
        :title="stat.title"
        :value="stat.value"
        :trend="stat.trend"
        :icon="stat.icon"
        :percentage="stat.percentage"
        :is-currency="stat.isCurrency"
      />
    </div>

    <!-- Client Engagement Overview -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Attendance Chart -->
      <div class="bg-white dark:bg-header-dark rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">Weekly Attendance</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Client check-ins over the past 7 days</p>
        <div class="h-60">
          <ClientAttendanceChart :data="weeklyAttendanceData" />
        </div>
      </div>

      <!-- Goal Progress -->
      <div class="bg-white dark:bg-header-dark rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">Client Goal Progress</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Distribution of client progress levels</p>
        <div class="h-60">
          <GoalProgressChart :data="goalProgressData" />
        </div>
      </div>

      <!-- Retention Health -->
      <div class="bg-white dark:bg-header-dark rounded-xl shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">Client Retention</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">Current retention metrics</p>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-gray-50 dark:bg-background-dark p-4 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">Avg. Retention</p>
            <p class="text-2xl font-bold text-primary dark:text-primary-400">8.5 mo</p>
          </div>
          <div class="bg-gray-50 dark:bg-background-dark p-4 rounded-lg">
            <p class="text-sm text-gray-600 dark:text-gray-400">Renewal Rate</p>
            <p class="text-2xl font-bold text-green-600 dark:text-green-400">86%</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600 dark:text-gray-400">At-risk clients</span>
              <span class="font-medium">4 clients</span>
            </div>
            <div class="w-full bg-red-100 dark:bg-red-900/20 rounded-full h-2">
              <div class="h-2 rounded-full bg-red-500 dark:bg-red-600" style="width: 12%"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span class="text-gray-600 dark:text-gray-400">Ready for upsell</span>
              <span class="font-medium">7 clients</span>
            </div>
            <div class="w-full bg-green-100 dark:bg-green-900/20 rounded-full h-2">
              <div class="h-2 rounded-full bg-green-500 dark:bg-green-600" style="width: 24%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Client Management Tabs and List -->
    <div class="bg-white dark:bg-header-dark rounded-xl shadow-md overflow-hidden">
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 dark:border-gray-700">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="py-4 px-6 font-medium focus:outline-none relative"
          :class="activeTab === tab.id ? 'text-primary dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-400'"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
          <span
            v-if="tab.count"
            class="ml-2 text-xs px-2 py-0.5 rounded-full"
            :class="activeTab === tab.id ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'"
          >{{ tab.count }}</span>
          <div
            v-if="activeTab === tab.id"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary-400"
          ></div>
        </button>
      </div>

      <!-- Client List with Enhanced Information -->
      <div class="px-6 py-4">
        <div v-for="(client) in filteredSubscribers" :key="client.id" class="mb-6 last:mb-0 bg-gray-50 dark:bg-background-dark p-4 rounded-lg">
          <div class="flex flex-col lg:flex-row gap-6">
            <!-- Client Profile Section -->
            <div class="lg:w-1/4 flex flex-col">
              <div class="flex items-center gap-4">
                <div class="relative">
                  <img
                    :src="client.avatar"
                    :alt="client.name"
                    class="w-16 h-16 rounded-full object-cover border-2"
                    :class="client.active ? 'border-green-500' : 'border-gray-300'"
                  />
                  <div v-if="client.active" class="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-750"></div>
                </div>
                <div>
                  <div class="font-semibold text-lg">{{ client.name }}</div>
                  <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Icon icon="mdi:email" class="text-xs" />
                    {{ client.email }}
                  </div>
                  <div class="mt-1">
                    <span
                      class="px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(client.status)"
                    >
                      {{ client.status }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Plan:</span>
                  <span class="font-medium">{{ client.plan }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Price:</span>
                  <span class="font-medium">${{ client.price }}/month</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Started:</span>
                  <span class="font-medium">{{ formatDate(client.startDate) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Renews:</span>
                  <span class="font-medium">{{ formatDate(client.endDate) }}</span>
                </div>
              </div>
            </div>

            <!-- Client Metrics & Progress -->
            <div class="lg:w-2/4 flex flex-col">
              <h3 class="font-medium text-gray-900 dark:text-white mb-3">Progress & Metrics</h3>

              <!-- Progress bars for metrics -->
              <div class="space-y-4">
                <div v-for="metric in client.metrics" :key="metric.name">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-600 dark:text-gray-400">{{ metric.name }}</span>
                    <div>
                      <span class="font-medium">{{ metric.current }}{{ metric.unit }}</span>
                      <span class="text-gray-500 dark:text-gray-400"> / Goal: {{ metric.goal }}{{ metric.unit }}</span>
                    </div>
                  </div>
                  <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="h-2 rounded-full"
                      :class="getMetricProgressClass(metric)"
                      :style="{ width: `${calculateMetricProgress(metric)}%` }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Weekly Activity -->
              <div class="mt-4">
                <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-2">Weekly Activity</h4>
                <div class="flex justify-between">
                  <div v-for="day in client.weeklyActivity" :key="day.day" class="flex flex-col items-center">
                    <div class="text-xs text-gray-500 dark:text-gray-400">{{ day.day.charAt(0) }}</div>
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center mt-1"
                      :class="day.completed ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'"
                    >
                      {{ day.value }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Current Program Summary -->
              <div class="mt-4">
                <h4 class="font-medium text-sm text-gray-700 dark:text-gray-300 mb-1">Current Program</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ client.currentPlan.name }}</p>
                <div class="flex gap-2 mt-2">
                  <div v-for="(day, index) in client.currentPlan.schedule" :key="index" class="px-2 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs">
                    {{ day.day }} ({{ day.focus }})
                  </div>
                </div>
              </div>
            </div>

            <!-- Nutrition & Actions -->
            <div class="lg:w-1/4 flex flex-col">
              <h3 class="font-medium text-gray-900 dark:text-white mb-3">Nutrition & Actions</h3>

              <!-- Nutrition Summary -->
              <div class="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg mb-4">
                <h4 class="text-sm font-medium text-green-800 dark:text-green-300 mb-1">Nutrition Plan</h4>
                <div class="grid grid-cols-4 gap-1 text-xs mb-2">
                  <div class="text-center">
                    <div class="font-medium text-green-800 dark:text-green-300">{{ client.nutritionPlan.calories }}</div>
                    <div class="text-green-600 dark:text-green-400">Cals</div>
                  </div>
                  <div class="text-center">
                    <div class="font-medium text-green-800 dark:text-green-300">{{ client.nutritionPlan.protein }}g</div>
                    <div class="text-green-600 dark:text-green-400">Protein</div>
                  </div>
                  <div class="text-center">
                    <div class="font-medium text-green-800 dark:text-green-300">{{ client.nutritionPlan.carbs }}g</div>
                    <div class="text-green-600 dark:text-green-400">Carbs</div>
                  </div>
                  <div class="text-center">
                    <div class="font-medium text-green-800 dark:text-green-300">{{ client.nutritionPlan.fat }}g</div>
                    <div class="text-green-600 dark:text-green-400">Fat</div>
                  </div>
                </div>
                <p class="text-xs text-green-700 dark:text-green-400 italic">{{ client.nutritionPlan.notes }}</p>
              </div>

              <!-- Recent Note -->
              <div v-if="client.notes && client.notes.length" class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Latest Note</h4>
                <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                  <div class="flex justify-between items-center mb-1">
                    <span class="font-medium">{{ client.notes[0].title }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatDate(client.notes[0].date) }}</span>
                  </div>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">{{ client.notes[0].content }}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col gap-2 mt-auto">
                <button class="bg-primary hover:bg-primary-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                  <Icon icon="mdi:pencil" class="text-sm" />
                  <span>Update Progress</span>
                </button>
                <div class="flex gap-2">
                  <button class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:chat" class="text-sm" />
                  </button>
                  <button class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:calendar" class="text-sm" />
                  </button>
                  <button class="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg flex items-center justify-center">
                    <Icon icon="mdi:file-document" class="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center py-4 px-6 border-t border-gray-200 dark:border-gray-700">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ filteredSubscribers.length }} of {{ subscribers.length }} clients
        </div>
        <div class="flex items-center gap-2">
          <button
            class="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :disabled="currentPage === 1"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            <Icon icon="mdi:chevron-left" />
          </button>
          <div
            v-for="page in totalPages"
            :key="page"
            class="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer"
            :class="currentPage === page ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'"
            @click="currentPage = page"
          >
            {{ page }}
          </div>
          <button
            class="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            :disabled="currentPage === totalPages"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import DashboardCard from '@/components/dashboard/DashboardCard.vue'
import ClientAttendanceChart from '@/components/pt/subscriber/ClientAttendeeChart.vue'
import GoalProgressChart from '@/components/pt/subscriber/GoalProgressChart.vue'
import { useI18n } from 'vue-i18n'

const searchQuery = ref('')
const activeTab = ref('all')
const currentPage = ref(1)
const itemsPerPage = 5

// Tabs for the main subscriber list
const tabs = [
  { id: 'all', name: 'All Clients', count: 42 },
  { id: 'active', name: 'Active', count: 36 },
  { id: 'needsAttention', name: 'Needs Attention', count: 8 },
  { id: 'recentProgress', name: 'Recent Progress', count: 15 },
  { id: 'expiring', name: 'Expiring Soon', count: 5 }
]

// Stats for top cards
const subscriberStats = ref({
  total: 42,
  active: 36,
  expiring: 5,
  achieved: 18
})

// Chart data
const weeklyAttendanceData = [
  { day: 'Mon', count: 28 },
  { day: 'Tue', count: 22 },
  { day: 'Wed', count: 31 },
  { day: 'Thu', count: 26 },
  { day: 'Fri', count: 33 },
  { day: 'Sat', count: 18 },
  { day: 'Sun', count: 12 }
]

const goalProgressData = [
  { name: '0-25%', value: 7, color: '#EF4444' },
  { name: '26-50%', value: 12, color: '#F59E0B' },
  { name: '51-75%', value: 15, color: '#3B82F6' },
  { name: '76-100%', value: 8, color: '#10B981' }
]

// Enhanced sample clients data
const subscribers = [
  {
    id: 1,
    name: 'Emma Johnson',
    email: 'emma.j@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    plan: 'Premium Plan',
    price: 99.99,
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    status: 'active',
    progress: 75,
    active: true,
    metrics: [
      { name: 'Weight', current: 150, start: 160, goal: 140, unit: 'lbs' },
      { name: 'Body Fat', current: 22, start: 25, goal: 20, unit: '%' },
      { name: 'Resting HR', current: 68, start: 72, goal: 65, unit: 'bpm' }
    ],
    weeklyActivity: [
      { day: 'Monday', value: 5, completed: true },
      { day: 'Tuesday', value: 3, completed: false },
      { day: 'Wednesday', value: 4, completed: true },
      { day: 'Thursday', value: 2, completed: false },
      { day: 'Friday', value: 6, completed: true },
      { day: 'Saturday', value: 7, completed: true },
      { day: 'Sunday', value: 1, completed: false }
    ],
    currentPlan: {
      name: 'Full Body Strength',
      description: 'A comprehensive full-body strength training program.',
      schedule: [
        {
          day: 'Monday',
          focus: 'Upper Body',
          exercises: [
            { name: 'Bench Press', sets: 4, reps: 8 },
            { name: 'Pull-Ups', sets: 3, reps: 6 }
          ]
        },
        {
          day: 'Wednesday',
          focus: 'Lower Body',
          exercises: [
            { name: 'Squats', sets: 4, reps: 10 },
            { name: 'Deadlifts', sets: 3, reps: 8 }
          ]
        },
        {
          day: 'Friday',
          focus: 'Full Body',
          exercises: [
            { name: 'Clean & Press', sets: 3, reps: 6 },
            { name: 'Kettlebell Swings', sets: 3, reps: 15 }
          ]
        }
      ]
    },
    nutritionPlan: {
      calories: 2200,
      protein: 150,
      carbs: 220,
      fat: 70,
      notes: 'Focus on high protein intake and complex carbs.'
    },
    notes: [
      { title: 'First Session', content: 'Emma is very motivated and eager to learn proper form.', date: '2024-01-16' },
      { title: 'Dietary Preferences', content: 'Vegetarian, prefers plant-based protein sources.', date: '2024-01-20' }
    ],
    paymentHistory: [
      { date: '2024-01-15', description: 'Monthly Subscription', amount: 99.99, status: 'Paid' },
      { date: '2024-02-15', description: 'Monthly Subscription', amount: 99.99, status: 'Paid' }
    ],
    paymentLast4: '4242',
    nextBilling: '2024-03-15'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    email: 'marcus.c@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    plan: 'Standard Plan',
    price: 79.99,
    startDate: '2023-11-10',
    endDate: '2024-05-10',
    status: 'active',
    progress: 60,
    active: true,
    metrics: [
      { name: 'Weight', current: 185, start: 192, goal: 175, unit: 'lbs' },
      { name: 'Muscle Mass', current: 78, start: 75, goal: 82, unit: 'kg' },
      { name: 'Blood Pressure', current: 128, start: 135, goal: 120, unit: 'mmHg' }
    ],
    weeklyActivity: [
      { day: 'Monday', value: 4, completed: true },
      { day: 'Tuesday', value: 0, completed: false },
      { day: 'Wednesday', value: 5, completed: true },
      { day: 'Thursday', value: 0, completed: false },
      { day: 'Friday', value: 4, completed: true },
      { day: 'Saturday', value: 0, completed: false },
      { day: 'Sunday', value: 3, completed: true }
    ],
    currentPlan: {
      name: 'Strength & Conditioning',
      description: 'Focus on building lean muscle and improving cardiovascular health.',
      schedule: [
        {
          day: 'Monday',
          focus: 'Chest & Back',
          exercises: [
            { name: 'Bench Press', sets: 4, reps: 8 },
            { name: 'Barbell Rows', sets: 3, reps: 10 }
          ]
        },
        {
          day: 'Wednesday',
          focus: 'Legs & Core',
          exercises: [
            { name: 'Squats', sets: 4, reps: 8 },
            { name: 'Planks', sets: 3, reps: '45 sec' }
          ]
        },
        {
          day: 'Friday',
          focus: 'Shoulders & Arms',
          exercises: [
            { name: 'Overhead Press', sets: 4, reps: 8 },
            { name: 'Bicep Curls', sets: 3, reps: 12 }
          ]
        }
      ]
    },
    nutritionPlan: {
      calories: 2800,
      protein: 180,
      carbs: 320,
      fat: 90,
      notes: 'High protein, moderate carbs for muscle building phase.'
    },
    notes: [
      { title: 'Program Adjustment', content: 'Added more compound lifts to focus on overall strength gains.', date: '2024-02-05' },
      { title: 'Knee Concern', content: 'Slight discomfort in right knee, modified squat depth temporarily.', date: '2024-03-12' }
    ],
    paymentHistory: [
      { date: '2023-11-10', description: '6-Month Plan', amount: 479.94, status: 'Paid' }
    ],
    paymentLast4: '5678',
    nextBilling: '2024-05-10'
  }
]

// Computed properties
const filteredSubscribers = computed(() => {
  return subscribers.filter(subscriber => {
    let matches = subscriber.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      subscriber.email.toLowerCase().includes(searchQuery.value.toLowerCase())

    if (activeTab.value === 'active') {
      matches = matches && subscriber.status === 'active'
    } else if (activeTab.value === 'needsAttention') {
      // Calculate clients that need attention (e.g., haven't been active recently)
      matches = matches && subscriber.weeklyActivity.filter(day => day.completed).length < 3
    } else if (activeTab.value === 'recentProgress') {
      // Calculate clients that made recent progress
      const metrics = subscriber.metrics
      const hasProgress = metrics.some(metric => {
        const currentToStart = metric.current - metric.start
        const goalToStart = metric.goal - metric.start
        // If they've made at least 15% progress toward goal in any metric
        return Math.abs(currentToStart / goalToStart) >= 0.15
      })
      matches = matches && hasProgress
    } else if (activeTab.value === 'expiring') {
      // Calculate if subscription expires in less than 30 days
      const endDate = new Date(subscriber.endDate)
      const today = new Date()
      const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
      matches = matches && daysRemaining <= 30
    }
    return matches
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredSubscribers.value.length / itemsPerPage)
})

const {t} = useI18n()

// Create a computed array that maps your statistics into the expected format.
const subscriberAnalytics = computed(() => [
  {
    title: t('dashboard.metrics.totalClients'),
    value: subscriberStats.value.total, // numeric value
    icon: 'mdi:account-group',
    trend: 'up' as const,
    percentage: 12, // corresponds to change "+12%"
    isCurrency: false,
  },
  {
    title: t('dashboard.metrics.activePlans'),
    value: subscriberStats.value.active,
    icon: 'mdi:check-circle',
    trend: 'up' as const,
    percentage: 8, // corresponds to change "+8%"
    isCurrency: false,
  },
  {
    title: t('dashboard.metrics.expiringSoon'),
    value: subscriberStats.value.expiring,
    icon: 'mdi:calendar-alert',
    trend: 'down' as const,
    percentage: 5, // corresponds to change "-5%"
    isCurrency: false,
  },
  {
    title: t('dashboard.metrics.goalAchievers'),
    value: subscriberStats.value.achieved,
    icon: 'mdi:trophy',
    trend: 'up' as const,
    percentage: 15, // corresponds to change "+15%"
    isCurrency: false,
  },
])

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}
const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'inactive':
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }
}
const getMetricProgressClass = (metric) => {
  const progress = calculateMetricProgress(metric)
  if (progress >= 100) {
    return 'bg-green-500'
  } else if (progress >= 75) {
    return 'bg-yellow-500'
  } else {
    return 'bg-red-500'
  }
}
const calculateMetricProgress = (metric) => {
  const progress = ((metric.current - metric.start) / (metric.goal - metric.start)) * 100
  return Math.min(Math.max(progress, 0), 100)
}
</script>
