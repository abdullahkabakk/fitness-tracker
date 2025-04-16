
<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Profile Header -->
    <div class="bg-gradient-to-tr from-blue-500 to-indigo-600 p-8 rounded-2xl shadow-lg">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between text-white gap-4">
        <div class="flex items-center gap-6">
          <div class="relative">
            <div class="w-24 h-24 rounded-full border-4 border-white bg-gray-100">
              <!-- Profile image here -->
            </div>
            <button class="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md">
              <Icon icon="mdi:camera" class="w-6 h-6 text-blue-600" />
            </button>
          </div>
          <div>
            <h1 class="text-3xl font-bold">John Fitness</h1>
            <p class="text-gray-200">Premium Member Since 2022</p>
            <div class="flex items-center mt-2">
              <Icon icon="mdi:map-marker" class="w-5 h-5 mr-1" />
              <span class="text-sm">New York, NY</span>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <button class="flex items-center px-5 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <Icon icon="mdi:pencil" class="mr-2 w-5 h-5" />
            Edit Profile
          </button>
          <button class="flex items-center px-5 py-2 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-colors">
            <Icon icon="mdi:share-variant" class="mr-2 w-5 h-5" />
            Share Profile
          </button>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        v-for="stat in profileStats"
        :key="stat.label"
        class="p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
        :class="stat.bgClass"
        @click="showDetailedStats(stat.type)"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white opacity-90">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-2">{{ stat.value }}</p>
          </div>
          <Icon :icon="stat.icon" class="w-12 h-12 text-white opacity-80" />
        </div>
      </div>
    </div>

    <!-- Fitness Progress Overview -->
    <div class="bg-white p-6 rounded-2xl shadow-md">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Fitness Progress</h2>
        <div class="flex items-center">
          <button
            v-for="period in timePeriods"
            :key="period"
            @click="selectedPeriod = period"
            class="px-3 py-1 rounded-lg text-sm"
            :class="selectedPeriod === period ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'"
          >
            {{ period }}
          </button>
        </div>
      </div>

      <div class="h-64">
        <!-- Progress Chart -->
<!--        <FitnessProgressChart :period="selectedPeriod" />-->
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Current Training Plans -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">My Training Plans</h2>
            <button class="text-blue-600 hover:text-blue-800 flex items-center">
              <span>Browse Plans</span>
              <Icon icon="mdi:chevron-right" class="w-5 h-5 ml-1" />
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="plan in trainingPlans" :key="plan.id" class="border border-gray-200 rounded-xl overflow-hidden">
              <div class="flex flex-col md:flex-row">
                <div class="md:w-1/4 bg-gray-100 p-4 flex items-center justify-center">
                  <Icon :icon="plan.icon" class="w-16 h-16 text-blue-600" />
                </div>
                <div class="md:w-3/4 p-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <h3 class="font-bold text-lg text-gray-800">{{ plan.name }}</h3>
                      <p class="text-sm text-gray-600">By {{ plan.trainer }}</p>
                    </div>
                    <span class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">{{ plan.status }}</span>
                  </div>

                  <div class="mt-4">
                    <div class="flex items-center justify-between text-sm mb-1">
                      <span class="text-gray-600">Progress</span>
                      <span class="font-medium">{{ plan.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div class="bg-blue-600 h-2 rounded-full" :style="`width: ${plan.progress}%`"></div>
                    </div>
                  </div>

                  <div class="mt-4 flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-600">
                      <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
                      <span>{{ plan.nextSession }}</span>
                    </div>
                    <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      View Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity History -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Activity History</h2>
            <button class="text-blue-600 hover:text-blue-800">View All</button>
          </div>
          <div class="space-y-4">
            <div
              v-for="activity in activities"
              :key="activity.id"
              class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center mr-4" :class="activity.iconBg">
                    <Icon :icon="activity.icon" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800">{{ activity.type }}</h3>
                    <p class="text-sm text-gray-600">{{ activity.date }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-blue-600 font-medium">{{ activity.duration }}</span>
                  <p class="text-sm text-gray-500">{{ activity.calories }} calories</p>
                </div>
              </div>

              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="(tag, idx) in activity.tags" :key="idx" class="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-700">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Nutrition Tracking -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Nutrition Today</h2>
            <button class="flex items-center text-blue-600 hover:text-blue-800">
              <Icon icon="mdi:food-apple" class="w-5 h-5 mr-1" />
              Log Meal
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div v-for="nutrient in nutrients" :key="nutrient.name" class="bg-gray-50 p-4 rounded-xl">
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full mb-2 flex items-center justify-center" :class="nutrient.bgColor">
                  <Icon :icon="nutrient.icon" class="w-6 h-6 text-white" />
                </div>
                <h3 class="font-medium text-gray-800">{{ nutrient.name }}</h3>
                <div class="mt-2 text-center">
                  <span class="text-xl font-bold">{{ nutrient.current }}</span>
                  <span class="text-gray-500 text-sm">/ {{ nutrient.goal }}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 class="font-bold text-gray-800 mb-4">Recent Meals</h3>
          <div class="space-y-3">
            <div v-for="meal in recentMeals" :key="meal.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <Icon :icon="meal.icon" class="w-8 h-8 text-gray-600 mr-3" />
                <div>
                  <h4 class="font-medium text-gray-800">{{ meal.name }}</h4>
                  <p class="text-sm text-gray-600">{{ meal.time }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium">{{ meal.calories }} cal</p>
                <p class="text-sm text-gray-500">P: {{ meal.protein }}g | C: {{ meal.carbs }}g | F: {{ meal.fat }}g</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-8">
        <!-- Personal Metrics -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Body Metrics</h2>
          <div class="space-y-4">
            <div v-for="metric in bodyMetrics" :key="metric.name" class="flex items-center justify-between">
              <div class="flex items-center">
                <Icon :icon="metric.icon" class="w-6 h-6 text-gray-600 mr-3" />
                <span class="text-gray-800">{{ metric.name }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-medium">{{ metric.value }}</span>
                <button class="ml-2 text-blue-600">
                  <Icon icon="mdi:pencil" class="w-4 h-4" />
                </button>
              </div>
            </div>
            <button class="w-full mt-2 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center justify-center">
              <Icon icon="mdi:plus" class="w-5 h-5 mr-1" />
              Update Measurements
            </button>
          </div>
        </div>

        <!-- Personal Bests -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Personal Bests</h2>
          <div class="space-y-4">
            <div v-for="pb in personalBests" :key="pb.name" class="bg-gray-50 p-4 rounded-xl">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-medium text-gray-800">{{ pb.name }}</h3>
                  <p class="text-sm text-gray-500">{{ pb.date }}</p>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold text-blue-600">{{ pb.value }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Upcoming Sessions -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Upcoming</h2>
            <button class="text-blue-600 hover:text-blue-800">
              <Icon icon="mdi:calendar-plus" class="w-6 h-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="session in upcomingSessions"
              :key="session.id"
              class="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
            >
              <div class="flex items-center">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center mr-4" :class="session.bgColor">
                  <Icon :icon="session.icon" class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-800">{{ session.name }}</h3>
                  <div class="flex items-center text-sm text-gray-600">
                    <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
                    <span>{{ session.date }}</span>
                    <Icon icon="mdi:clock-outline" class="w-4 h-4 ml-3 mr-1" />
                    <span>{{ session.time }}</span>
                  </div>
                </div>
              </div>
              <div class="mt-3 flex justify-between">
                <div class="flex items-center text-sm text-gray-600">
                  <Icon icon="mdi:account" class="w-4 h-4 mr-1" />
                  <span>{{ session.trainer }}</span>
                </div>
                <button class="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Section -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

          <!-- Tabs Navigation -->
          <div class="flex gap-4 border-b border-gray-200 mb-6">
            <button
              v-for="tab in settingsTabs"
              :key="tab"
              @click="selectedTab = tab"
              class="pb-4 px-2 transition-colors"
              :class="selectedTab === tab
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-600'"
            >
              {{ tab }}
            </button>
          </div>

          <!-- Account Settings -->
          <div v-if="selectedTab === 'Account'" class="space-y-6">
            <div
              v-for="action in quickActions"
              :key="action.label"
              class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Icon :icon="action.icon" class="w-6 h-6 text-gray-600 mr-3" />
              <span class="text-gray-700">{{ action.label }}</span>
            </div>
          </div>

          <!-- Privacy Settings -->
          <div v-if="selectedTab === 'Privacy'" class="space-y-6">
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Private Profile</p>
                <p class="text-sm text-gray-600">Make your profile visible only to you</p>
              </div>
              <button class="p-2 rounded-full hover:bg-gray-200">
                <Icon icon="mdi:toggle-switch-off" class="w-8 h-8 text-gray-400" />
              </button>
            </div>
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-800">Data Sharing</p>
                <p class="text-sm text-gray-600">Allow sharing workout data with partners</p>
              </div>
              <button class="p-2 rounded-full hover:bg-gray-200">
                <Icon icon="mdi:toggle-switch" class="w-8 h-8 text-blue-600" />
              </button>
            </div>
          </div>

          <!-- Notification Settings -->
          <div v-if="selectedTab === 'Notifications'" class="space-y-6">
            <div
              v-for="setting in notificationSettings"
              :key="setting.label"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-800">{{ setting.label }}</p>
                <p class="text-sm text-gray-600">{{ setting.description }}</p>
              </div>
              <button class="p-2 rounded-full hover:bg-gray-200">
                <Icon
                  :icon="setting.enabled ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off'"
                  class="w-8 h-8"
                  :class="setting.enabled ? 'text-blue-600' : 'text-gray-400'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Connected Devices -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Devices</h2>
            <button class="text-blue-600 hover:text-blue-700">
              <Icon icon="mdi:plus" class="w-6 h-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="device in devices"
              :key="device.id"
              class="flex items-center p-3 bg-gray-50 rounded-xl"
            >
              <Icon :icon="device.icon" class="w-8 h-8 text-blue-600 mr-4" />
              <div>
                <h3 class="font-medium text-gray-800">{{ device.name }}</h3>
                <p class="text-sm text-gray-600">Connected {{ device.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
// import FitnessProgressChart from './components/FitnessProgressChart.vue'

const settingsTabs = ref(['Account', 'Privacy', 'Notifications'])
const selectedTab = ref('Account')
const timePeriods = ref(['Week', 'Month', '3 Months', 'Year'])
const selectedPeriod = ref('Week')

const showDetailedStats = (type) => {
  console.log(`Showing detailed stats for: ${type}`)
  // Function to show modal or navigate to detailed stats page
}

const notificationSettings = ref([
  {
    label: 'Workout Reminders',
    description: 'Get notified about upcoming workouts',
    enabled: true
  },
  {
    label: 'Progress Updates',
    description: 'Receive weekly progress reports',
    enabled: true
  },
  {
    label: 'Trainer Messages',
    description: 'Get notified when trainers message you',
    enabled: true
  },
  {
    label: 'Promotional Offers',
    description: 'Get special offers and discounts',
    enabled: false
  }
])

const quickActions = ref([
  { label: 'Export Fitness Data', icon: 'mdi:database-export' },
  { label: 'Change Password', icon: 'mdi:lock-reset' },
  { label: 'Connected Apps', icon: 'mdi:application-cog' },
  { label: 'Delete Account', icon: 'mdi:alert-circle' }
])

const profileStats = ref([
  {
    label: 'Account Age',
    value: '1.5 Years',
    icon: 'mdi:calendar-star',
    bgClass: 'bg-gradient-to-tr from-purple-400 to-pink-500',
    type: 'account'
  },
  {
    label: 'Completed Programs',
    value: '12',
    icon: 'mdi:clipboard-check',
    bgClass: 'bg-gradient-to-tr from-blue-400 to-cyan-500',
    type: 'programs'
  },
  {
    label: 'Total Workouts',
    value: '248',
    icon: 'mdi:dumbbell',
    bgClass: 'bg-gradient-to-tr from-orange-400 to-red-500',
    type: 'workouts'
  },
  {
    label: 'Achievements',
    value: '23',
    icon: 'mdi:trophy',
    bgClass: 'bg-gradient-to-tr from-green-400 to-emerald-500',
    type: 'achievements'
  }
])

const trainingPlans = ref([
  {
    id: 1,
    name: '12-Week Strength Builder',
    trainer: 'Coach Mike',
    icon: 'mdi:weight-lifter',
    status: 'Active',
    progress: 65,
    nextSession: 'Tomorrow, 9:00 AM'
  },
  {
    id: 2,
    name: 'Cardio Conditioning',
    trainer: 'Coach Sarah',
    icon: 'mdi:run',
    status: 'Active',
    progress: 30,
    nextSession: 'Thursday, 7:30 AM'
  }
])

const activities = ref([
  {
    id: 1,
    type: 'Weight Training',
    date: 'Today, 9:30 AM',
    duration: '45m',
    calories: '320',
    icon: 'mdi:dumbbell',
    iconBg: 'bg-blue-600',
    tags: ['Upper Body', 'Strength']
  },
  {
    id: 2,
    type: 'Morning Run',
    date: 'Yesterday, 7:15 AM',
    duration: '5.2km',
    calories: '420',
    icon: 'mdi:run',
    iconBg: 'bg-green-600',
    tags: ['Cardio', 'Outdoor']
  },
  {
    id: 3,
    type: 'Yoga Session',
    date: 'Monday, 8:00 PM',
    duration: '30m',
    calories: '180',
    icon: 'mdi:yoga',
    iconBg: 'bg-purple-600',
    tags: ['Flexibility', 'Recovery']
  }
])

const bodyMetrics = ref([
  { name: 'Weight', value: '78 kg', icon: 'mdi:scale-bathroom' },
  { name: 'Height', value: '182 cm', icon: 'mdi:human-male-height' },
  { name: 'Body Fat', value: '15%', icon: 'mdi:percent' },
  { name: 'BMI', value: '23.5', icon: 'mdi:calculator' }
])

const personalBests = ref([
  { name: 'Bench Press', value: '100 kg', date: 'March 15, 2024' },
  { name: '5K Run', value: '22:45', date: 'April 2, 2024' },
  { name: 'Deadlift', value: '160 kg', date: 'February 28, 2024' }
])

const devices = ref([
  { id: 1, name: 'Apple Watch', icon: 'mdi:apple-watch', date: '2 days ago' },
  { id: 2, name: 'Fitbit Charge', icon: 'mdi:watch', date: '1 week ago' },
  { id: 3, name: 'Garmin HRM', icon: 'mdi:heart-pulse', date: '3 days ago' }
])

const upcomingSessions = ref([
  {
    id: 1,
    name: 'HIIT Training',
    date: 'Apr 17, 2024',
    time: '10:00 AM',
    trainer: 'Coach Mike',
    icon: 'mdi:lightning-bolt',
    bgColor: 'bg-orange-500'
  },
  {
    id: 2,
    name: 'Personal Training',
    date: 'Apr 19, 2024',
    time: '2:30 PM',
    trainer: 'Coach Sarah',
    icon: 'mdi:account-coach',
    bgColor: 'bg-blue-500'
  }
])

const nutrients = ref([
  {
    name: 'Calories',
    current: '1,840',
    goal: '2,500',
    icon: 'mdi:fire',
    bgColor: 'bg-red-500'
  },
  {
    name: 'Protein',
    current: '125g',
    goal: '180g',
    icon: 'mdi:food-steak',
    bgColor: 'bg-purple-500'
  },
  {
    name: 'Carbs',
    current: '210g',
    goal: '250g',
    icon: 'mdi:bread-slice',
    bgColor: 'bg-yellow-500'
  },
  {
    name: 'Fat',
    current: '48g',
    goal: '65g',
    icon: 'mdi:oil',
    bgColor: 'bg-green-500'
  }
])

const recentMeals = ref([
  {
    id: 1,
    name: 'Breakfast',
    time: 'Today, 7:30 AM',
    calories: 450,
    protein: 28,
    carbs: 45,
    fat: 18,
    icon: 'mdi:food-apple'
  },
  {
    id: 2,
    name: 'Protein Shake',
    time: 'Today, 11:00 AM',
    calories: 220,
    protein: 30,
    carbs: 15,
    fat: 5,
    icon: 'mdi:cup'
  },
  {
    id: 3,
    name: 'Lunch',
    time: 'Today, 1:15 PM',
    calories: 680,
    protein: 42,
    carbs: 65,
    fat: 20,
    icon: 'mdi:food'
  }
])
</script>
