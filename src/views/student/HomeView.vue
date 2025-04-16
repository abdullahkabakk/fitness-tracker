<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Welcome back, {{ user.firstName }}!</h1>
        <p class="text-gray-600">{{ todayDate }} | {{ motivationalQuote }}</p>
      </div>
      <div class="flex items-center space-x-4">
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <Icon icon="mdi:plus" class="w-5 h-5 mr-2" />
          Log Workout
        </button>
        <button class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <Icon icon="mdi:bell" class="w-6 h-6 text-gray-700" />
          <span v-if="notifications.length" class="absolute -mt-8 ml-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {{ notifications.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- Quick Stats with improved visualization -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div
        v-for="stat in quickStats"
        :key="stat.label"
        class="p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        :class="stat.bgClass"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-white opacity-90">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-white mt-2">{{ stat.value }}</p>
            <p v-if="stat.change" class="text-xs flex items-center mt-1" :class="stat.changeClass">
              <Icon :icon="stat.changeIcon" class="w-4 h-4 mr-1" />
              {{ stat.change }} from last week
            </p>
          </div>
          <Icon :icon="stat.icon" class="w-12 h-12 text-white opacity-80" />
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Progress Chart with improved time filters -->
        <div class="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-md">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Performance Tracker</h2>
            <div class="flex items-center space-x-2">
              <div class="flex bg-white rounded-lg p-1">
                <button
                  v-for="period in ['Week', 'Month', 'Year']"
                  :key="period"
                  @click="updateChartPeriod(period.toLowerCase())"
                  :class="[
                    'px-3 py-1 text-sm rounded-md transition',
                    activePeriod === period.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  ]"
                >
                  {{ period }}
                </button>
              </div>
              <RouterLink
                :to="StudentRoutes.progress"
                class="flex items-center text-blue-500 hover:text-blue-600 group ml-2"
              >
                View Details
                <Icon
                  icon="mdi:chevron-right"
                  class="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1"
                />
              </RouterLink>
            </div>
          </div>
          <apexchart
            type="line"
            height="350"
            :options="chartOptions"
            :series="chartData"
          ></apexchart>
        </div>



        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-800">Recent Activities</h3>
            <div class="flex items-center">
              <div class="relative mr-2">
                <button class="flex items-center text-blue-500 hover:text-blue-600 border border-blue-500 rounded-lg px-3 py-1">
                  <Icon icon="mdi:filter-variant" class="w-5 h-5 mr-1" />
                  Filter
                </button>
              </div>
              <button class="flex items-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg px-3 py-1">
                <Icon icon="mdi:plus" class="w-5 h-5 mr-1" />
                Add Activity
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <!-- Activity Item -->
            <div
              v-for="activity in recentActivities"
              :key="activity.id"
              class="p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 cursor-pointer flex items-start"
            >
              <div class="w-12 h-12 rounded-full flex items-center justify-center mr-4" :class="activity.bgClass">
                <Icon :icon="activity.icon" class="w-6 h-6 text-white" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-gray-800">{{ activity.title }}</h4>
                  <span class="text-sm text-gray-500">{{ activity.time }}</span>
                </div>
                <p class="text-gray-600 mt-1">{{ activity.details }}</p>
                <div class="flex items-center gap-4 mt-2">
                  <div class="flex items-center text-gray-500">
                    <Icon icon="mdi:fire" class="w-4 h-4 mr-1 text-orange-500" />
                    {{ activity.calories }} cal
                  </div>
                  <div class="flex items-center text-gray-500">
                    <Icon icon="mdi:clock-outline" class="w-4 h-4 mr-1 text-blue-500" />
                    {{ activity.duration }}
                  </div>
                  <div v-if="activity.trainer" class="flex items-center text-gray-500">
                    <Icon icon="mdi:account" class="w-4 h-4 mr-1 text-green-500" />
                    {{ activity.trainer }}
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="p-2 text-gray-500 hover:text-blue-500 rounded-full hover:bg-blue-50">
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
                <button class="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50">
                  <Icon icon="mdi:delete" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          </div>

          <!-- Personal Trainers Section -->
          <div class="bg-white p-6 rounded-2xl shadow-md">
          <div>
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">My Trainers</h3>
              <span class="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full font-bold">
        $250<span class="text-blue-400">/mo</span>
      </span>
            </div>

            <div class="space-y-4">
              <div v-for="(trainer, idx) in personalTrainers" :key="trainer.id"
                   class="bg-gray-50 rounded-xl overflow-hidden transition-all hover:bg-gray-100">
                <div class="flex items-center p-4">
                  <div class="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-white">
                    <img v-if="trainer.avatar" :src="trainer.avatar" class="w-full h-full object-cover" alt="Trainer avatar" />
                    <img v-else :src="`https://randomuser.me/api/portraits/${idx%2 == 0 ? 'men' : 'women'}/${12+idx}.jpg`" :alt="trainer.name">
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between">
                      <div>
                        <p class="font-semibold text-gray-800">{{ trainer.name }}</p>
                        <p class="text-sm text-gray-500">{{ trainer.specialty }}</p>
                      </div>
                      <div class="flex items-center">
                        <Icon icon="mdi:star" class="w-4 h-4 text-yellow-400" />
                        <span class="text-sm text-gray-600 ml-1 mr-2">{{ trainer.rating }}</span>
                        <span class="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-700">
                  {{ trainer.experience }}
                </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Plan Information -->
                <div class="px-4 py-3 bg-gray-100 flex justify-between items-center">
                  <div>
                    <div class="flex items-center">
              <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full font-bold">
                {{ trainer.plan.name }}
              </span>
                      <span class="ml-2 text-sm text-gray-600">{{ trainer.plan.sessions }} sessions/month</span>
                    </div>
                    <div class="flex items-center text-xs mt-1 text-gray-500">
                      <Icon icon="mdi:calendar" class="w-4 h-4 mr-1" />
                      <span>Next: {{ trainer.nextSession || 'No upcoming sessions' }}</span>
                      <Icon icon="mdi:clock-outline" class="w-4 h-4 ml-3 mr-1" />
                      <span>Renews: {{ trainer.plan.renewalDate }}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-xl font-bold text-gray-800">${{ trainer.plan.price }}<span class="text-sm text-gray-600">/mo</span></p>
                    <button class="text-xs text-blue-500 hover:text-blue-600 underline hover:no-underline">Change Plan</button>
                  </div>
                </div>

                <!-- Plan Features -->
                <div class="px-4 py-3 bg-gray-100 border-t border-gray-200">
                  <div class="flex flex-wrap gap-2">
                    <div v-for="(feature, index) in trainer.plan.features" :key="index"
                         class="flex items-center text-xs bg-white px-2 py-1 rounded-full text-gray-700">
                      <Icon icon="mdi:check-circle" class="w-3 h-3 mr-1 text-green-500" />
                      <span>{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-3 mt-5">
            <button class="flex items-center justify-center py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">
              <Icon icon="mdi:account-search" class="w-4 h-4 mr-2" />
              Browse Trainers
            </button>
            <button class="flex items-center justify-center py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700">
              <Icon icon="mdi:receipt" class="w-4 h-4 mr-2" />
              Billing History
            </button>
          </div>

          <div class="mt-4 text-center">
            <button class="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
              Manage Subscriptions
            </button>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-8">
        <!-- Today's Workout Section -->
        <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold text-gray-800">Today's Plan</h3>
            <span v-if="workout.completed" class="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">Completed</span>
            <span v-else class="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">Scheduled</span>
          </div>
          <div v-if="workout.name" class="mt-2">
            <div class="flex items-center">
              <Icon :icon="workout.icon" class="w-8 h-8 mr-3 text-purple-500" />
              <div>
                <h4 class="font-semibold text-lg">{{ workout.name }}</h4>
                <p class="text-gray-600 text-sm">{{ workout.time }} · {{ workout.duration }}</p>
              </div>
            </div>
            <div class="mt-4 space-y-2">
              <div v-for="(exercise, index) in workout.exercises" :key="index" class="flex items-center justify-between p-2 bg-white rounded-lg">
                <div class="flex items-center">
                  <span class="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xs mr-2">{{ index + 1 }}</span>
                  <span>{{ exercise.name }}</span>
                </div>
                <span class="text-gray-600 text-sm">{{ exercise.sets }}×{{ exercise.reps }}</span>
              </div>
            </div>
            <button class="w-full mt-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center">
              <Icon icon="mdi:play" class="w-5 h-5 mr-2" />
              Start Workout
            </button>
          </div>
          <div v-else class="text-center py-8">
            <Icon icon="mdi:calendar-plus" class="w-16 h-16 mx-auto text-gray-400" />
            <p class="mt-2 text-gray-600">No workout scheduled for today</p>
            <button class="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg">
              Create Workout
            </button>
          </div>
        </div>

        <!-- Weekly Goals with improved visualization -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Weekly Goals</h3>
            <button class="text-blue-500 hover:text-blue-600">
              <Icon icon="mdi:pencil" class="w-5 h-5" />
            </button>
          </div>
          <div class="space-y-2">
            <div v-for="goal in weeklyGoals" :key="goal.label" class="flex ">
              <div class="relative w-20 h-20 mr-4 mt-3">
                <apexchart
                  type="radialBar"
                  height="100%"
                  width="100%"
                  :options="getGoalChartOptions(goal.progress)"
                  :series="[goal.progress]"
                ></apexchart>
                <Icon :icon="goal.icon" class="absolute inset1 top-2 right-1/3 m-auto w-6 h-6" :class="goal.iconColor" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <p class="font-medium text-gray-600">{{ goal.label }}</p>
                  <div class="flex items-center">
                    <Icon
                      :icon="goal.progress >= 100 ? 'mdi:check-circle' : 'mdi:trending-up'"
                      class="w-5 h-5 mr-1"
                      :class="goal.progress >= 100 ? 'text-green-500' : 'text-blue-500'"
                    />
                    <span class="text-sm" :class="goal.progress >= 100 ? 'text-green-500' : 'text-blue-500'">
                      {{ goal.progress }}%
                    </span>
                  </div>
                </div>
                <p class="text-2xl font-bold text-gray-800">
                  {{ goal.current }}<span class="text-gray-400">/{{ goal.target }}</span>
                  <span class="text-sm text-gray-500">{{ goal.unit }}</span>
                </p>
              </div>
            </div>
          </div>
          <!-- Goal Streak -->
          <div class="mt6 pt-6 border-t border-gray-100">
            <div class="flex items-center justify-between mb-3">
              <p class="font-medium text-gray-600">Weekly Streak</p>
              <span class="text-sm text-blue-500">4 weeks</span>
            </div>
            <div class="flex justify-between items-center">
              <div v-for="(_, index) in 7" :key="index" class="flex flex-col items-center">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center mb-1"
                  :class="index < 5 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'"
                >
                  {{ ['M', 'T', 'W', 'T', 'F', 'S', 'S'][index] }}
                </div>
                <Icon
                  :icon="index < 5 ? 'mdi:check' : 'mdi:minus'"
                  class="w-4 h-4"
                  :class="index < 5 ? 'text-green-500' : 'text-gray-300'"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Coach Messages with improved interaction -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Coach Messages</h3>
            <div class="flex items-center">
              <button class="flex items-center text-blue-500 hover:text-blue-600">
                <Icon icon="mdi:message-plus" class="w-6 h-6" />
              </button>
            </div>
          </div>
          <div class="space-y-4">
            <div
              v-for="(message, idx) in messages"
              :key="message.id"
              class="p-4 bg-gray-50 rounded-xl transition-all hover:bg-gray-100 cursor-pointer relative"
              :class="{'border-l-4 border-blue-500': !message.read}"
            >
              <div class="flex items-start mb-3">
                <div class="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img v-if="message.avatar" :src="message.avatar" class="w-full h-full object-cover" alt="Coach avatar" />
                  <img v-else :src="`https://randomuser.me/api/portraits/${idx%2 == 0 ? 'men' : 'women'}/${12+idx}.jpg`" :alt="message.trainer">
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between">
                    <h4 class="font-semibold text-gray-800">{{ message.trainer }}</h4>
                    <span class="text-sm text-gray-500">{{ message.time }}</span>
                  </div>
                  <p class="text-gray-600 line-clamp-2">{{ message.content }}</p>
                </div>
                <div v-if="!message.read" class="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              <div class="flex items-center gap-2 mt-2">
                <button
                  v-for="(action, index) in ['Reply', 'Thank']"
                  :key="index"
                  class="text-sm px-3 py-1 rounded-full bg-white hover:bg-gray-200 transition-colors border border-gray-200 flex items-center"
                >
                  <Icon :icon="index === 0 ? 'mdi:reply' : 'mdi:thumb-up'" class="w-4 h-4 mr-1" />
                  {{ action }}
                </button>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center">
            <button class="text-blue-500 hover:text-blue-600 font-medium">
              View All Messages
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { format } from 'date-fns'
import { StudentRoutes } from '@/helpers/routes/student.ts'

// User info
const user = ref({
  firstName: 'Alex',
  lastName: 'Johnson',
  avatar: null
})

// Today's date and motivational quote
const todayDate = computed(() => {
  return format(new Date(), 'EEEE, MMMM d, yyyy')
})

const motivationalQuote = ref('Push yourself because no one else is going to do it for you!')

// Notifications
const notifications = ref([
  { id: 1, message: 'Coach Mike sent you a new message', time: '1h ago' },
  { id: 2, message: 'Your nutrition plan was updated', time: '3h ago' }
])

// Enhanced Quick Stats
const quickStats = ref([
  {
    label: 'Daily Activity',
    value: '1h 25m',
    icon: 'mdi:clock-outline',
    bgClass: 'bg-gradient-to-tr from-blue-400 to-cyan-500',
    change: '+15min',
    changeIcon: 'mdi:arrow-up',
    changeClass: 'text-blue-200'
  },
  {
    label: 'Calories Burned',
    value: '2,450',
    icon: 'mdi:fire',
    bgClass: 'bg-gradient-to-tr from-orange-400 to-red-500',
    change: '+320',
    changeIcon: 'mdi:arrow-up',
    changeClass: 'text-orange-200'
  },
  {
    label: 'Training Streak',
    value: '7 Days',
    icon: 'mdi:calendar-heart',
    bgClass: 'bg-gradient-to-tr from-purple-400 to-pink-500',
    change: '+2',
    changeIcon: 'mdi:arrow-up',
    changeClass: 'text-purple-200'
  },
  {
    label: 'Heart Rate',
    value: '122 BPM',
    icon: 'mdi:heart-pulse',
    bgClass: 'bg-gradient-to-tr from-green-400 to-emerald-500',
    change: '-5',
    changeIcon: 'mdi:arrow-down',
    changeClass: 'text-green-200'
  }
])

// Enhanced Weekly Goals
const weeklyGoals = ref([
  {
    label: 'Workouts',
    icon: 'mdi:dumbbell',
    iconColor: 'text-purple-500',
    current: 4,
    target: 5,
    progress: 80,
    unit: 'sessions'
  },
  {
    label: 'Cardio',
    icon: 'mdi:run',
    iconColor: 'text-blue-500',
    current: 3.5,
    target: 5,
    progress: 70,
    unit: 'hours'
  },
  {
    label: 'Water',
    icon: 'mdi:cup-water',
    iconColor: 'text-cyan-500',
    current: 12,
    target: 15,
    progress: 80,
    unit: 'glasses'
  },
  {
    label: 'Protein',
    icon: 'mdi:food-steak',
    iconColor: 'text-red-500',
    current: 85,
    target: 100,
    progress: 85,
    unit: 'grams'
  }
])

// Enhanced Recent Activities
const recentActivities = ref([
  {
    id: 1,
    title: 'Full Body Workout',
    icon: 'mdi:dumbbell',
    bgClass: 'bg-purple-500',
    time: '2h ago',
    details: 'Completed 5 sets of deadlifts with increased weight',
    calories: '450',
    duration: '45m'
  },
  {
    id: 2,
    title: 'Morning Run',
    icon: 'mdi:run',
    bgClass: 'bg-blue-500',
    time: '4h ago',
    details: '5km in 28 minutes - new personal best!',
    calories: '320',
    duration: '28m'
  },
  {
    id: 3,
    title: 'Yoga Session',
    icon: 'mdi:yoga',
    bgClass: 'bg-green-500',
    time: 'Yesterday',
    details: 'Flexibility and recovery session',
    calories: '180',
    duration: '30m'
  }
])
const personalTrainers = ref([
  {
    id: 1,
    name: 'Coach Mike',
    specialty: 'Strength & Conditioning',
    rating: 4.9,
    experience: '8+ years',
    avatar: null,
    nextSession: 'Today, 6:00 PM',
    plan: {
      name: 'Elite',
      tier: 'premium',
      price: 100,
      sessions: 12,
      renewalDate: 'May 16, 2025',
      features: ['Custom Workout Plans', '24/7 Chat Support', 'Video Analysis', 'Nutrition Guide']
    }
  },
  {
    id: 2,
    name: 'Dr. Sarah',
    specialty: 'Nutrition & Recovery',
    rating: 4.8,
    experience: '10+ years',
    avatar: null,
    nextSession: 'Tomorrow, 10:00 AM',
    plan: {
      name: 'Standard',
      tier: 'standard',
      price: 75,
      sessions: 8,
      renewalDate: 'May 23, 2025',
      features: ['Meal Plans', 'Recovery Protocols', 'Supplement Advice']
    }
  },
  {
    id: 3,
    name: 'John Smith',
    specialty: 'HIIT & Cardio',
    rating: 4.7,
    experience: '5+ years',
    avatar: null,
    nextSession: null,
    plan: {
      name: 'Basic',
      tier: 'basic',
      price: 50,
      sessions: 4,
      renewalDate: 'June 1, 2025',
      features: ['Weekly Workouts', 'Email Support', 'Progress Tracking']
    }
  }
])

// Chart Data
const activePeriod = ref('week')

const updateChartPeriod = (period) => {
  activePeriod.value = period
  // Here you would update chartData based on the selected period
  if (period === 'week') {
    chartData.value = [{
      name: 'Progress',
      data: [65, 72, 68, 75]
    }]
    chartOptions.value.xaxis.categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
  } else if (period === 'month') {
    chartData.value = [{
      name: 'Progress',
      data: [62, 68, 74, 70, 75, 78]
    }]
    chartOptions.value.xaxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  } else {
    chartData.value = [{
      name: 'Progress',
      data: [60, 65, 70, 72, 75, 78, 80, 82, 85, 88, 90, 92]
    }]
    chartOptions.value.xaxis.categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  }
}

const chartOptions = ref({
  chart: {
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'Inter, sans-serif',
    dropShadow: {
      enabled: true,
      top: 3,
      left: 2,
      blur: 4,
      opacity: 0.1
    }
  },
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    labels: { style: { colors: '#6B7280' } },
    min: 0
  },
  colors: ['#3B82F6'],
  stroke: { curve: 'smooth', width: 3 },
  grid: { borderColor: '#F3F4F6', strokeDashArray: 4 },
  markers: {
    size: 6,
    colors: ['#3B82F6'],
    strokeColors: '#fff',
    strokeWidth: 2,
    hover: {
      size: 8
    }
  },
  tooltip: {
    theme: 'light',
    marker: { show: true },
    x: {
      show: true
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.3,
      opacityFrom: 0.5,
      opacityTo: 0.1,
      stops: [0, 100]
    }
  }
})

const chartData = ref([{
  name: 'Progress',
  data: [65, 72, 68, 75]
}])

// Get chart options with dynamic colors based on progress
const getGoalChartOptions = (progress) => {
  const color = progress >= 100 ? '#10B981' : (progress >= 70 ? '#3B82F6' : '#F59E0B')

  return {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: { enabled: true }
    },
    plotOptions: {
      radialBar: {
        hollow: { margin: 0, size: '70%' },
        track: { background: '#E5E7EB' },
        dataLabels: {
          show: false
        }
      }
    },
    fill: { colors: [color] },
    stroke: { lineCap: 'round' },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    }
  }
}

// Enhanced coach messages
const messages = ref([
  {
    id: 1,
    trainer: 'Coach Mike',
    avatar: null,
    content: 'Great progress this week! I noticed your deadlift form has improved significantly. Let\'s discuss increasing your weight next session.',
    time: '1h ago',
    read: false,
    reactions: [
      { emoji: '👍', count: 1 },
      { emoji: '🔥', count: 2 }
    ]
  },
  {
    id: 2,
    trainer: 'Dr. Sarah',
    avatar: null,
    content: 'Your latest metrics show improvement in recovery time. Consider adding more protein to your post-workout meals for even better results.',
    time: '3h ago',
    read: true,
    reactions: [
      { emoji: '👍', count: 1 }
    ]
  },
  {
    id: 3,
    trainer: 'Trainer John',
    avatar: null,
    content: 'I\'ve created a new HIIT workout for you to try this weekend. Check it out in your workout plans!',
    time: 'Yesterday',
    read: true,
    reactions: []
  }
])

// Today's workout
const workout = ref({
  name: 'Upper Body Focus',
  icon: 'mdi:arm-flex',
  time: '5:30 PM',
  duration: '45 minutes',
  completed: false,
  exercises: [
    { name: 'Bench Press', sets: 4, reps: 12 },
    { name: 'Pull-ups', sets: 3, reps: 10 },
    { name: 'Shoulder Press', sets: 3, reps: 15 },
    { name: 'Tricep Extensions', sets: 3, reps: 12 }
  ]
})
</script>
