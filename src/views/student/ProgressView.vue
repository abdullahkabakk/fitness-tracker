<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Header Section -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Progress Dashboard</h1>
        <p class="text-gray-500">Track your transformation journey</p>
      </div>
      <div class="flex items-center space-x-3">
        <div class="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl flex items-center">
          <Icon icon="mdi:calendar" class="mr-2" />
          <span>April 16, 2025</span>
        </div>
        <button class="flex text-xs md:text-base items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
          <Icon icon="mdi:download" class="mr-2" />
          Export
        </button>
        <button class="flex items-center text-xs md:text-base px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
          <Icon icon="mdi:share-variant" class="mr-2" />
          Share Progress
        </button>
      </div>
    </div>

    <!-- Program Progress Banner -->
    <div class="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white mb-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex-1">
          <div class="flex items-center mb-2">
            <Icon icon="mdi:trophy" class="w-6 h-6 mr-2" />
            <h2 class="text-2xl font-bold">Summer Shred Challenge</h2>
          </div>
          <div class="grid grid-cols-2 gap-6 mb-4 mt-4">
            <div>
              <p class="text-white/80 text-sm mb-1">Start Date</p>
              <p class="font-medium">March 15, 2025</p>
            </div>
            <div>
              <p class="text-white/80 text-sm mb-1">End Date</p>
              <p class="font-medium">May 15, 2025</p>
            </div>
            <div>
              <p class="text-white/80 text-sm mb-1">Current Phase</p>
              <p class="font-medium">Phase 2: Lean Building</p>
            </div>
            <div>
              <p class="text-white/80 text-sm mb-1">Overall Progress</p>
              <p class="font-medium">52% Complete</p>
            </div>
          </div>
        </div>
        <div class="md:border-l md:border-white/20 md:pl-6 flex items-center space-x-4 mt-4 md:mt-0">
          <div class="text-center">
            <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white/20 rounded-full mb-2">
              <span class="text-xl font-bold">4</span>
            </div>
            <p class="text-white/90 text-sm">Weeks<br/>Completed</p>
          </div>
          <div class="text-center">
            <div class="flex items-center justify-center w-16 h-16 mx-auto bg-white/20 rounded-full mb-2">
              <span class="text-xl font-bold">4</span>
            </div>
            <p class="text-white/90 text-sm">Weeks<br/>Remaining</p>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="mt-4">
        <div class="flex items-center space-x-2 mb-2">
          <p class="text-sm font-medium">Program Progress</p>
          <span class="bg-white/20 px-2 py-0.5 rounded-full text-xs">52%</span>
        </div>
        <div class="h-2 bg-white/20 rounded-full overflow-hidden">
          <div class="h-full bg-white rounded-full" style="width: 52%"></div>
        </div>
      </div>
    </div>

    <!-- Progress Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="p-6 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
        :class="stat.bgClass"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white opacity-90">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-2">{{ stat.value }}</p>
            <p v-if="stat.change" class="text-sm mt-1" :class="stat.changePositive ? 'text-green-200' : 'text-red-200'">
              <Icon :icon="stat.changePositive ? 'mdi:arrow-up' : 'mdi:arrow-down'" class="inline" />
              {{ stat.change }} from last week
            </p>
          </div>
          <Icon :icon="stat.icon" class="w-12 h-12 text-white opacity-80" />
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Progress Charts -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Metric Selector -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h2 class="text-2xl font-bold text-gray-800">Progress Analytics</h2>
              <p class="text-gray-500 text-sm">Track your body composition changes over time</p>
            </div>
            <div class="flex flex-col md:flex-row items-center space-x-3">
              <div class="relative">
                <select class="appearance-none bg-gray-50 text-gray-700 py-2 pl-3 pr-8 rounded-lg text-sm">
                  <option>Last 8 Weeks</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>All Time</option>
                </select>
                <Icon icon="mdi:chevron-down" class="absolute right-2 top-2.5 text-gray-500 pointer-events-none" />
              </div>
              <div class="flex gap-2 bg-gray-100 p-1 rounded-full">
                <button
                  v-for="metric in metrics"
                  :key="metric"
                  @click="selectedMetric = metric"
                  class="px-4 py-1.5 rounded-full transition-all text-sm"
                  :class="selectedMetric === metric
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-200'"
                >
                  {{ metricLabel(metric) }}
                </button>
              </div>
            </div>
          </div>

          <!-- Main Chart -->
          <div class="relative">
            <!-- Hover Card -->
            <div v-if="focusPoint.visible" class="absolute bg-white rounded-lg shadow-lg p-4 z-10 w-48" :style="focusPoint.style">
              <div class="font-medium text-gray-800 mb-1">{{ metricLabel(selectedMetric) }}</div>
              <div class="text-2xl font-bold mb-2">
                {{ getFocusedValue() }}
              </div>
              <div class="text-sm text-gray-500">{{ focusPoint.date }}</div>
              <div v-if="focusPoint.change" class="mt-2 pt-2 border-t border-gray-100 flex items-center">
                <Icon
                  :icon="focusPoint.changePositive ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                  class="mr-1"
                  :class="focusPoint.changePositive ? 'text-green-500' : 'text-red-500'"
                />
                <span :class="focusPoint.changePositive ? 'text-green-500' : 'text-red-500'">
                  {{ focusPoint.change }} from previous
                </span>
              </div>
            </div>

            <apexchart
              type="line"
              height="350"
              :options="chartOptions"
              :series="series"
              @mouseMove="showTooltip"
              @mouseLeave="hideTooltip"
            ></apexchart>

            <!-- Chart Legend -->
            <div class="flex justify-center mt-4 space-x-6">
              <div
                v-for="(target, index) in targets"
                :key="index"
                class="flex items-center space-x-2"
                :class="{'opacity-50': selectedMetric !== target.metric}"
              >
                <div class="w-2 h-2 rounded-full" :style="{backgroundColor: target.color}"></div>
                <span class="text-sm text-gray-600">{{ target.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Key Metrics -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-800">Key Body Measurements</h3>
            <button class="flex items-center text-blue-500 hover:text-blue-600 text-sm">
              <Icon icon="mdi:pencil" class="w-4 h-4 mr-1" />
              Update Measurements
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="measurement in measurements"
              :key="measurement.label"
              class="bg-gray-50 p-4 rounded-xl"
            >
              <div class="flex items-center justify-between mb-2">
                <h4 class="font-medium text-gray-700">{{ measurement.label }}</h4>
                <Icon :icon="measurement.icon" class="text-blue-500" />
              </div>
              <div class="flex items-end mb-2">
                <span class="text-2xl font-bold text-gray-800">{{ measurement.current }}</span>
                <span class="text-sm text-gray-500 ml-1 mb-0.5">{{ measurement.unit }}</span>
              </div>
              <div class="flex items-center" :class="measurement.trend === 'down' ? 'text-green-500' : measurement.trend === 'up' ? (measurement.positive ? 'text-green-500' : 'text-red-500') : 'text-gray-500'">
                <Icon :icon="getTrendIcon(measurement.trend, measurement.positive)" class="w-4 h-4 mr-1" />
                <span class="text-sm">{{ measurement.change }} {{ measurement.trend !== 'stable' ? 'since last entry' : '' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Photos -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-semibold text-gray-800">Progress Photos</h3>
              <p class="text-gray-500 text-sm">Visual proof of your transformation</p>
            </div>
            <button class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              <Icon icon="mdi:camera" class="w-5 h-5 mr-2" />
              Add New Photo
            </button>
          </div>

          <div class="mb-4">
            <div class="flex items-center space-x-4 mb-2 overflow-x-auto py-2">
              <button
                v-for="date in photoDates"
                :key="date"
                @click="selectedPhotoDate = date"
                class="px-4 py-2 rounded-lg whitespace-nowrap transition"
                :class="selectedPhotoDate === date ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ date }}
              </button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(photo, index) in progressPhotos"
              :key="index"
              class="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group cursor-pointer"
            >
              <img :src="photo.url || '/api/placeholder/200/200'" alt="Progress photo" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <p class="text-sm font-medium">{{ photo.angle }}</p>
                <p class="text-xs">{{ photo.date }}</p>
              </div>
            </div>
          </div>

          <div class="flex justify-center mt-6">
            <button class="px-6 py-2 text-blue-500 hover:text-blue-600 font-medium">
              View All Photos
            </button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-8">
        <!-- Weekly Goals -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Weekly Goals</h3>
            <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">3/5 Completed</span>
          </div>

          <div class="space-y-5">
            <div v-for="goal in weeklyGoals" :key="goal.label" class="flex items-center">
              <div class="relative w-20 h-20 mr-4">
                <apexchart
                  type="radialBar"
                  height="80"
                  width="80"
                  :options="getGoalChartOptions(goal)"
                  :series="[goal.progress]"
                />
              </div>
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <Icon :icon="goal.icon" class="text-blue-500" />
                  <p class="font-medium text-gray-600">{{ goal.label }}</p>
                </div>
                <p class="text-2xl font-bold text-gray-800">{{ goal.current }}/{{ goal.target }}</p>
                <p class="text-sm text-gray-500">{{ goal.subtitle }}</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-gray-100">
            <button class="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition flex items-center justify-center">
              <Icon icon="mdi:plus" class="mr-2" />
              Add New Goal
            </button>
          </div>
        </div>

        <!-- Comparison Metrics -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-4">Starting vs Current</h3>

          <div class="bg-blue-50 p-4 rounded-xl mb-6">
            <div class="flex justify-between items-center mb-3">
              <span class="font-medium text-blue-800">Program Start</span>
              <span class="text-sm text-blue-700">Mar 15, 2025</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="font-medium text-blue-800">Current</span>
              <span class="text-sm text-blue-700">Apr 16, 2025</span>
            </div>
          </div>

          <div class="space-y-6">
            <div v-for="metric in comparisonMetrics" :key="metric.label">
              <div class="flex justify-between mb-2">
                <span class="text-gray-600 font-medium">{{ metric.label }}</span>
                <span class="text-gray-900 font-bold">{{ metric.change }}</span>
              </div>
              <div class="flex">
                <div class="flex-1 mr-4">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-500">Start</span>
                    <span class="font-medium">{{ metric.start }}</span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full w-full">
                    <div class="h-full rounded-full bg-blue-200" :style="{ width: getStartWidth(metric) }"></div>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-gray-500">Current</span>
                    <span class="font-medium">{{ metric.current }}</span>
                  </div>
                  <div class="h-2 bg-gray-100 rounded-full w-full">
                    <div class="h-full rounded-full bg-blue-500" :style="{ width: getCurrentWidth(metric) }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Trainer Messages -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Coach Messages</h3>
            <button class="text-blue-500 hover:text-blue-600 transition flex items-center">
              <Icon icon="mdi:message-text-outline" class="w-5 h-5 mr-1" />
              <span class="text-sm">Message Coach</span>
            </button>
          </div>

          <div class="space-y-4">
            <div
              v-for="(message, idx) in messages"
              :key="message.id"
              class="p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 cursor-pointer"
            >
              <div class="flex items-start">
                <img
                  :src="`https://randomuser.me/api/portraits/${idx%2 == 0 ? 'men' : 'women'}/${32+idx}.jpg`"
                  alt="Trainer avatar"
                  class="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-1">
                    <h4 class="font-semibold text-gray-800">{{ message.trainer }}</h4>
                    <span class="text-sm text-gray-500">{{ message.timestamp }}</span>
                  </div>
                  <p class="text-gray-600 line-clamp-3">{{ message.content }}</p>

                  <div class="flex items-center gap-2 mt-3">
                    <button
                      v-for="reaction in message.reactions"
                      :key="reaction.emoji"
                      class="text-sm px-2 py-1 rounded-full bg-white hover:bg-gray-200 transition-colors"
                    >
                      {{ reaction.emoji }} {{ reaction.count }}
                    </button>
                    <button class="ml-auto text-blue-500 text-sm hover:text-blue-600">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 text-center">
            <a href="#" class="text-blue-500 text-sm hover:text-blue-600">View All Messages</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { ApexOptions } from 'apexcharts'

// Mock Data with enhanced stats
const quickStats = ref([
  {
    label: 'Active Calories',
    value: '2,450',
    icon: 'mdi:fire',
    bgClass: 'bg-gradient-to-tr from-orange-400 to-red-500',
    change: '+150',
    changePositive: true
  },
  {
    label: 'Training Time',
    value: '1h 45m',
    icon: 'mdi:clock-outline',
    bgClass: 'bg-gradient-to-tr from-blue-400 to-cyan-500',
    change: '+15m',
    changePositive: true
  },
  {
    label: 'Current Streak',
    value: '7 Days',
    icon: 'mdi:calendar-heart',
    bgClass: 'bg-gradient-to-tr from-purple-400 to-pink-500',
    change: '+2',
    changePositive: true
  },
  {
    label: 'Heart Rate',
    value: '122 BPM',
    icon: 'mdi:heart-pulse',
    bgClass: 'bg-gradient-to-tr from-green-400 to-emerald-500',
    change: '-5',
    changePositive: true
  }
])

const weeklyGoals = ref([
  {
    label: 'Workouts',
    icon: 'mdi:dumbbell',
    current: 4,
    target: 5,
    progress: 80,
    subtitle: 'Next: Upper Body',
    color: '#3B82F6'
  },
  {
    label: 'Cardio Hours',
    icon: 'mdi:run',
    current: 3.5,
    target: 5,
    progress: 70,
    subtitle: 'HIIT preferred',
    color: '#10B981'
  },
  {
    label: 'Water Intake',
    icon: 'mdi:cup-water',
    current: 12,
    target: 15,
    progress: 80,
    subtitle: 'Daily goal: 2L',
    color: '#3B82F6'
  },
  {
    label: 'Sleep Hours',
    icon: 'mdi:sleep',
    current: 42,
    target: 56,
    progress: 75,
    subtitle: 'Weekly goal: 56h',
    color: '#8B5CF6'
  }
])

// Body Measurements
const measurements = ref([
  {
    label: 'Weight',
    icon: 'mdi:scale',
    current: '64.0',
    unit: 'kg',
    previous: '70.0',
    change: '-6.0 kg',
    trend: 'down',
    positive: true
  },
  {
    label: 'Body Fat',
    icon: 'mdi:percent',
    current: '17.0',
    unit: '%',
    previous: '20.0',
    change: '-3.0%',
    trend: 'down',
    positive: true
  },
  {
    label: 'Muscle Mass',
    icon: 'mdi:arm-flex',
    current: '36.0',
    unit: '%',
    previous: '30.0',
    change: '+6.0%',
    trend: 'up',
    positive: true
  },
  {
    label: 'Waist',
    icon: 'mdi:human',
    current: '75.2',
    unit: 'cm',
    previous: '80.0',
    change: '-4.8 cm',
    trend: 'down',
    positive: true
  },
  {
    label: 'Chest',
    icon: 'mdi:human',
    current: '102.3',
    unit: 'cm',
    previous: '98.0',
    change: '+4.3 cm',
    trend: 'up',
    positive: true
  },
  {
    label: 'Hydration',
    icon: 'mdi:water',
    current: '61.5',
    unit: '%',
    previous: '61.2',
    change: 'stable',
    trend: 'stable',
    positive: true
  }
])

const getTrendIcon = (trend: string, positive: boolean) => {
  if (trend === 'down') return positive ? 'mdi:arrow-down' : 'mdi:arrow-down'
  if (trend === 'up') return positive ? 'mdi:arrow-up' : 'mdi:arrow-up'
  return 'mdi:minus'
}

// Comparison metrics
const comparisonMetrics = ref([
  {
    label: 'Weight',
    start: '70.0 kg',
    current: '64.0 kg',
    change: '-6.0 kg',
    startValue: 70,
    currentValue: 64,
    min: 60,
    max: 75,
    positive: true
  },
  {
    label: 'Body Fat',
    start: '20.0%',
    current: '17.0%',
    change: '-3.0%',
    startValue: 20,
    currentValue: 17,
    min: 15,
    max: 25,
    positive: true
  },
  {
    label: 'Waist Size',
    start: '80.0 cm',
    current: '75.2 cm',
    change: '-4.8 cm',
    startValue: 80,
    currentValue: 75.2,
    min: 70,
    max: 85,
    positive: true
  }
])

const getStartWidth = (metric: any) => {
  const range = metric.max - metric.min
  const value = metric.startValue - metric.min
  return `${(value / range) * 100}%`
}

const getCurrentWidth = (metric: any) => {
  const range = metric.max - metric.min
  const value = metric.currentValue - metric.min
  return `${(value / range) * 100}%`
}

// Progress Photos
const selectedPhotoDate = ref('April 16, 2025')
const photoDates = ref(['March 15, 2025', 'March 31, 2025', 'April 16, 2025'])

const progressPhotos = ref([
  {
    angle: 'Front View',
    date: 'April 16, 2025',
    url: 'https://images.unsplash.com/photo-1686230399946-8cfdb71f4f07?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    angle: 'Side View',
    date: 'April 16, 2025',
    url: 'https://images.unsplash.com/photo-1673872685586-5d06b159f645?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    angle: 'Back View',
    date: 'April 16, 2025',
    url: 'https://images.unsplash.com/photo-1742560306866-7a973878b378?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]);

const messages = ref([
  {
    id: 1,
    trainer: 'Coach Mike',
    content: 'Great job on the weight loss progress! I\'ve noticed significant improvements in your body composition metrics. Let\'s focus on core strength next week to further enhance your results.',
    timestamp: '2h ago',
    reactions: [{ emoji: '👍', count: 2 }, { emoji: '💪', count: 5 }],
    read: false,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    trainer: 'Dr. Sarah',
    content: 'Your recovery metrics are improving, keep up the good work with the stretching routine! Your heart rate variability has increased by 15% which indicates better recovery between sessions.',
    timestamp: '1d ago',
    reactions: [{ emoji: '❤️', count: 3 }],
    read: true,
    avatar: '/api/placeholder/40/40'
  }
])

// Chart Configurations
const selectedMetric = ref('weight')
const metrics = ['weight', 'bodyFat', 'muscleMass']
const focusPoint = ref({
  visible: false,
  date: '',
  value: 0,
  change: '',
  changePositive: true,
  style: 'top: 0; left: 0;'
})

const metricLabel = (metric: string) => {
  const labels: { [key: string]: string } = {
    weight: 'Weight',
    bodyFat: 'Body Fat',
    muscleMass: 'Muscle Mass'
  }
  return labels[metric]
}

// Chart target lines
const targets = ref([
  { metric: 'weight', label: 'Target: 60kg', color: '#f59e0b' },
  { metric: 'bodyFat', label: 'Target: 15%', color: '#f59e0b' },
  { metric: 'muscleMass', label: 'Target: 40%', color: '#f59e0b' }
])

const chartOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'line',
    height: 350,
    zoom: { enabled: false },
    toolbar: { show: false },
    fontFamily: 'Inter, sans-serif',
    animations: { enabled: true },
  },
  colors: [selectedMetric.value === 'weight' ? '#3B82F6' : selectedMetric.value === 'bodyFat' ? '#EF4444' : '#10B981'],
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 3 },
  grid: { borderColor: '#F3F4F6', row: { colors: ['#F9FAFB', 'transparent'], opacity: 0.5 } },
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' } },
    min: 0,
    max: selectedMetric.value === 'weight' ? 80 : selectedMetric.value === 'bodyFat' ? 30 : 50
  },
  tooltip: {
    shared: true,
    intersect: false,
    theme: 'dark',
    x: { formatter: (val) => val },
    y: {
      formatter: (val) => `${val} ${selectedMetric.value === 'weight' ? 'kg' : selectedMetric.value === 'bodyFat' ? '%' : 'kg'}`
    }
  }
}))
const series = computed(() => {
  const metricsData = {
    weight: {
      name: 'Weight',
      data: [70, 68, 67, 66, 65, 64, 63, 62]
    },
    bodyFat: {
      name: 'Body Fat',
      data: [20, 19.5, 19, 18.5, 18, 17.5, 17, 16.5]
    },
    muscleMass: {
      name: 'Muscle Mass',
      data: [30, 31, 32, 33, 34, 35, 36, 37]
    }
  };

  // Get the metric key in a type-safe way
  const metricKey = selectedMetric.value as keyof typeof metricsData;

  // Return the corresponding data or empty array if not found
  return metricsData[metricKey] ? [metricsData[metricKey]] : [];
});

const showTooltip = (event: MouseEvent, chartContext: any, config: any) => {
  const { offsetX, offsetY } = event
  const { dataPointIndex } = config
  const date = chartContext.w.globals.labels[dataPointIndex]
  const value = series.value[0].data[dataPointIndex]
  const change = dataPointIndex > 0 ? value - series.value[0].data[dataPointIndex - 1] : null
  focusPoint.value = {
    visible: true,
    date,
    value,
    change,
    changePositive: change > 0,
    style: `top: ${offsetY}px; left: ${offsetX}px;`
  }
}
const hideTooltip = () => {
  focusPoint.value.visible = false
}
const getFocusedValue = () => {
  return focusPoint.value.changePositive ? `+${focusPoint.value.value}` : focusPoint.value.value
}
const getGoalChartOptions = (goal: any) => {
  return {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: { margin: 0, size: '70%', background: 'transparent', image: undefined },
        track: { background: '#e0e0e0', strokeWidth: '100%', margin: 0 },
        dataLabels: {
          name: { show: false },
          value: { show: false }
        }
      }
    },
    fill: { colors: [goal.color] },
    stroke: { lineCap: 'round' },
    labels: [goal.label]
  }
}
</script>
