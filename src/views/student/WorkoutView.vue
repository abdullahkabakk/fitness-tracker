<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Header Section with User Profile -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-gradient-to-tr from-blue-400 to-cyan-500 rounded-xl shadow-lg">
          <Icon icon="mdi:rocket-launch" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Activity Overview</h1>
          <p class="text-gray-500">{{ currentDate }} · {{ daysUntilNextSession }} days until next session</p>
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <div class="flex items-center space-x-2">
          <img :src="trainerAvatar" alt="Trainer Avatar" class="w-10 h-10 rounded-full border-2 border-blue-500" />
          <div class="text-sm">
            <p class="font-medium text-gray-800">{{ trainerName }}</p>
            <p class="text-gray-500">Personal Trainer</p>
          </div>
        </div>
        <button class="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
          <Icon icon="mdi:plus" class="mr-2" />
          New Log
        </button>
      </div>
    </div>

    <!-- Program Progress Banner -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white mb-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold mb-2">{{ currentProgram.name }}</h2>
          <p class="opacity-90 mb-4">Week {{ currentProgram.currentWeek }} of {{ currentProgram.totalWeeks }}</p>

          <div class="flex items-center space-x-3 mb-4">
            <div class="w-full max-w-md bg-white/20 rounded-full h-3">
              <div class="h-full rounded-full bg-white" :style="{ width: programProgress + '%' }"></div>
            </div>
            <span class="font-medium">{{ programProgress }}%</span>
          </div>

          <div class="flex flex-wrap gap-2">
            <div class="bg-white/20 px-4 py-2 rounded-lg flex items-center">
              <Icon icon="mdi:calendar-check" class="mr-2" />
              <span>{{ currentProgram.completedSessions }}/{{ currentProgram.totalSessions }} Sessions</span>
            </div>
            <div class="bg-white/20 px-4 py-2 rounded-lg flex items-center">
              <Icon icon="mdi:target" class="mr-2" />
              <span>{{ currentProgram.achievedGoals }}/{{ currentProgram.totalGoals }} Goals</span>
            </div>
          </div>
        </div>

        <div class="mt-6 md:mt-0">
          <button class="bg-white text-blue-700 px-6 py-3 rounded-xl font-medium hover:bg-blue-50 transition flex items-center">
            <Icon icon="mdi:eye" class="mr-2" />
            View Program Details
          </button>
        </div>
      </div>
    </div>

    <!-- Activity Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div
        v-for="(metric, index) in activityMetrics"
        :key="index"
        class="p-6 rounded-xl shadow-lg transition-all duration-300 hover:translate-y-[-5px]"
        :class="metric.bgClass"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white opacity-90">{{ metric.label }}</p>
            <p class="text-2xl font-bold text-white mt-2">{{ metric.value }}</p>
            <p v-if="metric.change" class="text-sm mt-1" :class="metric.changePositive ? 'text-green-200' : 'text-red-200'">
              <Icon :icon="metric.changePositive ? 'mdi:arrow-up' : 'mdi:arrow-down'" class="inline" />
              {{ metric.change }} from last week
            </p>
          </div>
          <Icon :icon="metric.icon" class="w-12 h-12 text-white opacity-80" />
        </div>
        <apexchart
          v-if="metric.chart"
          type="radialBar"
          height="100"
          width="100"
          :options="metric.chartOptions"
          :series="metric.series"
        ></apexchart>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Activity Stream -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Timeline Filters -->
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-md">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-700">Activity Log</h3>
            <div class="flex items-center space-x-2">
              <button class="p-2 rounded-lg hover:bg-white/80 transition text-gray-600">
                <Icon icon="mdi:filter-variant" />
              </button>
              <button class="p-2 rounded-lg hover:bg-white/80 transition text-gray-600">
                <Icon icon="mdi:sort-variant" />
              </button>
              <div class="relative">
                <input
                  type="text"
                  placeholder="Search activities..."
                  class="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                />
                <Icon icon="mdi:magnify" class="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
          </div>

          <div class="flex gap-2 bg-white p-1 rounded-full">
            <button
              v-for="filter in timelineFilters"
              :key="filter"
              @click="selectedFilter = filter"
              class="px-6 py-2 rounded-full transition-all"
              :class="selectedFilter === filter
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'"
            >
              {{ filter }}
            </button>
          </div>
        </div>

        <!-- Date Divider -->
        <div class="flex items-center">
          <div class="h-px flex-1 bg-gray-200"></div>
          <p class="px-4 text-gray-500 font-medium">Today</p>
          <div class="h-px flex-1 bg-gray-200"></div>
        </div>

        <!-- Activity Cards -->
        <div class="space-y-4">
          <div
            v-for="activity in filteredActivities"
            :key="activity.id"
            class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow relative group"
          >
            <!-- Activity Status Indicator -->
            <div class="absolute top-6 right-6 flex items-center space-x-2">
              <span
                class="w-3 h-3 rounded-full"
                :class="activity.completed ? 'bg-green-500' : 'bg-amber-500'"
              ></span>
              <span class="text-sm text-gray-500">{{ activity.completed ? 'Completed' : 'In Progress' }}</span>
            </div>

            <div class="flex items-start">
              <div class="w-3 h-3 rounded-full bg-blue-500 mr-4 mt-2"></div>
              <div class="flex-1">
                <div class="flex items-center mb-4">
                  <Icon :icon="activity.icon" class="text-blue-500 mr-2" />
                  <h3 class="text-xl font-semibold text-gray-800">{{ activity.title }}</h3>
                  <span class="ml-4 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-600">{{ activity.category }}</span>
                </div>

                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <Icon icon="mdi:clock-outline" class="text-gray-400" />
                    <span class="text-sm text-gray-500">{{ activity.time }}</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <Icon icon="mdi:map-marker" class="text-gray-400" />
                    <span class="text-sm text-gray-500">{{ activity.location }}</span>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex-1 bg-gray-100 rounded-full h-2">
                    <div
                      class="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-500"
                      :style="{ width: activity.progress + '%' }"
                    ></div>
                  </div>
                  <span class="text-blue-500 font-medium">{{ activity.progress }}%</span>
                </div>

                <!-- Activity Meta -->
                <div class="grid grid-cols-3 gap-4 mb-4">
                  <div
                    v-for="(meta, index) in activity.meta"
                    :key="index"
                    class="p-3 bg-gray-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600 mb-1">{{ meta.label }}</p>
                    <p class="text-lg font-bold text-gray-800">{{ meta.value }}</p>
                  </div>
                </div>

                <!-- Badges -->
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(badge, index) in activity.badges"
                    :key="index"
                    class="px-3 py-1 text-sm rounded-full"
                    :class="getBadgeClass(badge)"
                  >
                    {{ badge }}
                  </span>
                </div>

                <!-- Action Buttons (appear on hover) -->
                <div class="mt-4 pt-4 border-t border-gray-100 hidden group-hover:flex items-center justify-between">
                  <div class="flex space-x-2">
                    <button class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center">
                      <Icon icon="mdi:pencil" class="mr-1" />
                      Edit
                    </button>
                    <button class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center">
                      <Icon icon="mdi:share-variant" class="mr-1" />
                      Share
                    </button>
                  </div>
                  <button class="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg flex items-center">
                    <Icon icon="mdi:clipboard-text" class="mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <button class="w-full py-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition">
          Load More Activities
        </button>
      </div>

      <!-- Side Panel -->
      <div class="space-y-6">
        <!-- Next Scheduled Session -->
        <div class="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-md text-white">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold">Next Session</h3>
            <span class="bg-white/20 px-3 py-1 rounded-full text-sm">{{ nextSession.timeRemaining }}</span>
          </div>
          <div class="bg-white/10 p-4 rounded-xl mb-4">
            <div class="flex items-center mb-3">
              <Icon icon="mdi:dumbbell" class="mr-3 text-white" />
              <h4 class="font-medium">{{ nextSession.title }}</h4>
            </div>
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div class="flex items-center">
                <Icon icon="mdi:calendar" class="mr-2 opacity-80" />
                <span>{{ nextSession.date }}</span>
              </div>
              <div class="flex items-center">
                <Icon icon="mdi:clock-outline" class="mr-2 opacity-80" />
                <span>{{ nextSession.time }}</span>
              </div>
              <div class="flex items-center">
                <Icon icon="mdi:map-marker" class="mr-2 opacity-80" />
                <span>{{ nextSession.location }}</span>
              </div>
              <div class="flex items-center">
                <Icon icon="mdi:account" class="mr-2 opacity-80" />
                <span>{{ nextSession.trainer }}</span>
              </div>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="flex-1 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition flex items-center justify-center">
              <Icon icon="mdi:calendar-edit" class="mr-2" />
              Reschedule
            </button>
            <button class="flex-1 py-2 bg-white text-purple-700 rounded-lg transition flex items-center justify-center">
              <Icon icon="mdi:check" class="mr-2" />
              Confirm
            </button>
          </div>
        </div>

        <!-- Performance Radar -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Performance Metrics</h3>
            <div class="relative">
              <select class="appearance-none bg-gray-50 text-gray-700 py-1 pl-3 pr-8 rounded-lg text-sm">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
              <Icon icon="mdi:chevron-down" class="absolute right-2 top-1.5 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <apexchart
            type="radar"
            height="300"
            :options="liveStatsOptions"
            :series="liveStatsSeries"
          ></apexchart>
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="text-sm text-gray-500 mb-2">Area of Improvement</div>
            <div class="flex items-center">
              <div class="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-4">
                <Icon icon="mdi:run-fast" class="w-6 h-6" />
              </div>
              <div>
                <p class="font-medium text-gray-800">Recovery</p>
                <p class="text-sm text-gray-500">Focus on improving sleep and post-workout routines</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Streak Card -->
        <div class="bg-gradient-to-tr from-purple-400 to-pink-500 p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-white">Activity Streak</h3>
            <Icon icon="mdi:fire" class="w-8 h-8 text-white" />
          </div>
          <div class="text-center py-4">
            <div class="text-4xl font-bold text-white mb-2">27</div>
            <p class="text-white/80">Consecutive Days</p>
          </div>
          <div class="grid grid-cols-7 gap-1 mt-4">
            <div
              v-for="day in 7"
              :key="day"
              class="h-2 rounded-full"
              :class="day < 7 ? 'bg-white' : 'bg-white/40'"
            ></div>
          </div>
          <p class="text-center text-sm text-white/80 mt-2">Keep it up! 3 days to your next reward</p>
        </div>

        <!-- Nutrition Summary -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Nutrition Summary</h3>
            <button class="text-blue-500 text-sm flex items-center">
              <span>Update</span>
              <Icon icon="mdi:chevron-right" class="ml-1" />
            </button>
          </div>
          <div class="flex justify-between mb-6">
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">1,840</div>
              <p class="text-sm text-gray-500">Calories</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">135g</div>
              <p class="text-sm text-gray-500">Protein</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">82g</div>
              <p class="text-sm text-gray-500">Carbs</p>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-gray-800">52g</div>
              <p class="text-sm text-gray-500">Fat</p>
            </div>
          </div>
          <div class="space-y-3">
            <div v-for="nutrient in nutritionProgress" :key="nutrient.name">
              <div class="flex justify-between text-sm mb-1">
                <span class="text-gray-600">{{ nutrient.name }}</span>
                <span class="text-gray-800 font-medium">{{ nutrient.current }}/{{ nutrient.target }} {{ nutrient.unit }}</span>
              </div>
              <div class="w-full bg-gray-100 rounded-full h-2">
                <div
                  class="h-full rounded-full"
                  :class="nutrient.color"
                  :style="{ width: (nutrient.current / nutrient.target * 100) + '%' }"
                ></div>
              </div>
            </div>
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

// Current Date and Trainer Info
const currentDate = ref('April 16, 2025')
const daysUntilNextSession = ref(2)
const trainerName = ref('Sarah Johnson')
const trainerAvatar = ref('/api/placeholder/50/50')

// Current Program Stats
const currentProgram = ref({
  name: 'Summer Shred Challenge',
  currentWeek: 4,
  totalWeeks: 8,
  completedSessions: 12,
  totalSessions: 24,
  achievedGoals: 3,
  totalGoals: 5
})

const programProgress = computed(() => {
  return Math.round((currentProgram.value.currentWeek / currentProgram.value.totalWeeks) * 100)
})

// Next Session
const nextSession = ref({
  title: 'Power Lifting Session',
  date: 'April 18, 2025',
  time: '07:30 AM',
  location: 'FitCore Gym',
  trainer: 'Sarah Johnson',
  timeRemaining: '2 days'
})

// ACTIVITY METRICS
const activityMetrics = ref([
  {
    label: 'Active Minutes',
    value: '458m',
    icon: 'mdi:clock-outline',
    bgClass: 'bg-gradient-to-tr from-blue-400 to-cyan-500',
    series: [78],
    change: '+12%',
    changePositive: true,
    chartOptions: {
      chart: { type: 'radialBar' },
      plotOptions: {
        radialBar: {
          hollow: { size: '60%' },
          dataLabels: {
            value: {
              offsetY: 5,
              fontSize: '24px',
              color: '#FFFFFF',
              formatter: (val: number) => `${val}%`
            }
          }
        }
      },
      colors: ['#FFFFFF'],
      stroke: { lineCap: 'round' }
    }
  },
  {
    label: 'Calories Burned',
    value: '12.4k',
    icon: 'mdi:fire',
    bgClass: 'bg-gradient-to-tr from-orange-400 to-red-500',
    change: '+5%',
    changePositive: true
  },
  {
    label: 'New PRs',
    value: '9',
    icon: 'mdi:trophy',
    bgClass: 'bg-gradient-to-tr from-purple-400 to-pink-500',
    change: '+3',
    changePositive: true
  },
  {
    label: 'Focus Score',
    value: '86%',
    icon: 'mdi:brain',
    bgClass: 'bg-gradient-to-tr from-green-400 to-emerald-500',
    change: '-2%',
    changePositive: false
  }
])

// ACTIVITY DATA
const activities = ref([
  {
    id: 1,
    title: 'Alpha Lift Session',
    time: '08:30 AM',
    location: 'FitCore Gym',
    progress: 100,
    completed: true,
    category: 'Strength',
    icon: 'mdi:dumbbell',
    badges: ['New PR', '200kg Deadlift', 'Elite Tier'],
    meta: [
      { label: 'Power Output', value: '980W' },
      { label: 'Max HR', value: '182bpm' },
      { label: 'Effort', value: '9.8/10' }
    ]
  },
  {
    id: 2,
    title: 'Metabolic Inferno',
    time: '12:45 PM',
    location: 'Home Gym',
    progress: 85,
    completed: false,
    category: 'HIIT',
    icon: 'mdi:fire',
    badges: ['500kcal', 'HIIT', 'Cardio Challenge'],
    meta: [
      { label: 'Afterburn', value: '6h' },
      { label: 'Splats', value: '42' },
      { label: 'Zones', value: '4/5' }
    ]
  },
  {
    id: 3,
    title: 'Mobility & Recovery',
    time: '05:30 PM',
    location: 'Home Gym',
    progress: 0,
    completed: false,
    category: 'Recovery',
    icon: 'mdi:yoga',
    badges: ['Flexibility', 'Cooldown'],
    meta: [
      { label: 'Duration', value: '30min' },
      { label: 'Focus', value: 'Lower Body' },
      { label: 'Intensity', value: '3/10' }
    ]
  }
])

// Nutrition Progress
const nutritionProgress = ref([
  { name: 'Protein', current: 135, target: 150, unit: 'g', color: 'bg-blue-500' },
  { name: 'Carbs', current: 82, target: 100, unit: 'g', color: 'bg-green-500' },
  { name: 'Fat', current: 52, target: 60, unit: 'g', color: 'bg-yellow-500' },
  { name: 'Water', current: 2.1, target: 3, unit: 'L', color: 'bg-cyan-500' }
])

// LIVE STATS
const liveStatsOptions = ref<ApexOptions>({
  chart: {
    type: 'radar',
    toolbar: { show: false },
    dropShadow: { enabled: true, blur: 4, opacity: 0.2 }
  },
  colors: ['#22D3EE', '#A855F7'],
  xaxis: {
    categories: ['Power', 'Endurance', 'Mobility', 'Strength', 'Recovery', 'Focus'],
    labels: { style: { colors: '#64748B' } }
  },
  yaxis: { show: false, max: 100 },
  plotOptions: { radar: { size: 120, polygons: { strokeColors: '#E2E8F0' } } },
  dataLabels: { enabled: true, style: { colors: ['#060D15'] } },
  markers: { size: 4, colors: ['#22D3EE', '#A855F7'] },
  stroke: { width: 2 },
  fill: { opacity: 0.2 },
  legend: { position: 'bottom', fontSize: '14px' }
})

const liveStatsSeries = ref([
  {
    name: 'Current',
    data: [95, 78, 82, 90, 65, 88]
  },
  {
    name: 'Previous Month',
    data: [80, 65, 65, 80, 70, 75]
  }
])

// FILTERS
const timelineFilters = ref(['All', 'Workouts', 'Nutrition', 'Recovery'])
const selectedFilter = ref('All')

const filteredActivities = computed(() => {
  if (selectedFilter.value === 'All') return activities.value
  return activities.value.filter(a =>
    a.category.toLowerCase() === selectedFilter.value.toLowerCase() ||
    a.badges.some(b => b.toLowerCase() === selectedFilter.value.toLowerCase())
  )
})

// Badge styling helper
const getBadgeClass = (badge: string) => {
  if (badge.includes('PR') || badge.includes('Elite')) {
    return 'bg-purple-100 text-purple-600'
  } else if (badge.includes('HIIT') || badge.includes('Cardio')) {
    return 'bg-red-100 text-red-600'
  } else if (badge.includes('kg') || badge.includes('Strength')) {
    return 'bg-blue-100 text-blue-600'
  } else if (badge.includes('kcal') || badge.includes('Burn')) {
    return 'bg-orange-100 text-orange-600'
  } else if (badge.includes('Flexibility') || badge.includes('Cooldown')) {
    return 'bg-green-100 text-green-600'
  }
  return 'bg-gray-100 text-gray-600'
}
</script>
