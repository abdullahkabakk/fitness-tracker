<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Program Header -->
    <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-3xl text-white shadow-xl">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 class="text-4xl font-bold mb-2">Strength Foundation Program</h1>
          <div class="flex flex-wrap items-center gap-4">
            <div class="flex items-center">
              <Icon icon="mdi:calendar" class="w-6 h-6 mr-2" />
              <span>6 Weeks</span>
            </div>
            <div class="flex items-center">
              <Icon icon="mdi:weight-lifter" class="w-6 h-6 mr-2" />
              <span>Intermediate Level</span>
            </div>
            <div class="flex items-center">
              <Icon icon="mdi:fire" class="w-6 h-6 mr-2" />
              <span>Created by Coach {{programDetails.trainerName}}</span>
            </div>
          </div>
        </div>
        <div class="text-right flex flex-row md:flex-col items-center md:items-end gap-4 md:gap-0">
          <div class="text-2xl font-bold mb-2">Progress</div>
          <div class="relative">
            <apexchart
              type="radialBar"
              height="100"
              width="100"
              :options="overallProgressOptions"
              :series="[programProgress]"
            ></apexchart>
            <div v-if="programProgress === 100" class="absolute top-0 right-0 -mr-2 -mt-2 bg-yellow-400 text-blue-900 rounded-full p-1">
              <Icon icon="mdi:star" class="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats & Actions -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
        <div class="bg-blue-100 rounded-full p-3">
          <Icon icon="mdi:timer-outline" class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <div class="text-gray-500 text-sm">Workout Streak</div>
          <div class="text-xl font-bold">{{userStats.streak}} Days</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
        <div class="bg-green-100 rounded-full p-3">
          <Icon icon="mdi:weight" class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <div class="text-gray-500 text-sm">Total Weight Lifted</div>
          <div class="text-xl font-bold">{{userStats.totalWeight}} kg</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
        <div class="bg-purple-100 rounded-full p-3">
          <Icon icon="mdi:clock-outline" class="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <div class="text-gray-500 text-sm">Time Spent</div>
          <div class="text-xl font-bold">{{userStats.totalTime}} hrs</div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-md flex items-center space-x-4">
        <div class="bg-orange-100 rounded-full p-3">
          <Icon icon="mdi:target" class="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <div class="text-gray-500 text-sm">PRs Achieved</div>
          <div class="text-xl font-bold">{{userStats.prs}}</div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Workout Calendar -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Week Navigation -->
        <div class="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md">
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors" @click="prevWeek" :disabled="currentWeek <= 1">
            <Icon icon="mdi:chevron-left" class="w-6 h-6" :class="{'text-gray-300': currentWeek <= 1}" />
          </button>
          <div class="text-xl font-bold">Week {{ currentWeek }} of 6</div>
          <button class="p-2 hover:bg-gray-100 rounded-full transition-colors" @click="nextWeek" :disabled="currentWeek >= 6">
            <Icon icon="mdi:chevron-right" class="w-6 h-6" :class="{'text-gray-300': currentWeek >= 6}" />
          </button>
        </div>

        <!-- Workout Schedule -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            v-for="day in weeklySchedule"
            :key="day.id"
            class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            :class="{ 'ring-2 ring-blue-500': day.isToday }"
          >
            <div class="flex items-center justify-between mb-4">
              <div>
                <div class="text-sm text-gray-500">{{ day.date }}</div>
                <h3 class="text-xl font-semibold">{{ day.title }}</h3>
              </div>
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="getStatusClass(day)"
              >
                <Icon :icon="getStatusIcon(day)" class="w-6 h-6" />
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center text-gray-600">
                <Icon icon="mdi:clock-outline" class="w-4 h-4 mr-2" />
                <span>{{ day.duration }}</span>
              </div>
              <div class="flex items-center text-gray-600">
                <Icon icon="mdi:weight-lifter" class="w-4 h-4 mr-2" />
                <span>{{ day.focus }}</span>
              </div>
            </div>
            <div class="mt-4 flex gap-2">
              <button
                class="flex-1 py-2 rounded-lg transition-colors"
                :class="getButtonClass(day)"
                @click="startWorkout(day)"
              >
                {{ getButtonText(day) }}
              </button>
              <button v-if="day.completed"
                      class="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
                      @click="viewWorkoutDetails(day)"
              >
                <Icon icon="mdi:information-outline" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <!-- Program Timeline -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Program Timeline</h3>
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <span class="w-3 h-3 bg-blue-500 rounded-full inline-block mr-2"></span>
                <span class="text-sm text-gray-600">Completion</span>
              </div>
              <div class="flex items-center">
                <span class="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
                <span class="text-sm text-gray-600">Target</span>
              </div>
            </div>
          </div>
          <apexchart
            type="line"
            height="200"
            :options="timelineOptions"
            :series="timelineSeries"
          ></apexchart>
        </div>
        <!-- Nutrition & Recovery Section -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold">Nutrition & Recovery</h3>
            <div class="flex space-x-2">
              <button class="px-4 py-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">Nutrition</button>
              <button class="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">Recovery</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-blue-50 p-4 rounded-xl">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="mdi:food-apple" class="w-6 h-6 text-blue-600" />
                </div>
                <h4 class="font-semibold">Daily Protein Target</h4>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold">{{nutritionData.protein}} / {{nutritionData.proteinTarget}}g</div>
                <div class="text-sm text-green-600">{{Math.round((nutritionData.protein/nutritionData.proteinTarget)*100)}}%</div>
              </div>
              <div class="mt-2 bg-white rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" :style="`width: ${(nutritionData.protein/nutritionData.proteinTarget)*100}%`"></div>
              </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-xl">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="mdi:water" class="w-6 h-6 text-blue-600" />
                </div>
                <h4 class="font-semibold">Hydration Status</h4>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold">{{nutritionData.water}} / {{nutritionData.waterTarget}}L</div>
                <div class="text-sm text-blue-600">{{Math.round((nutritionData.water/nutritionData.waterTarget)*100)}}%</div>
              </div>
              <div class="mt-2 bg-white rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${(nutritionData.water/nutritionData.waterTarget)*100}%`"></div>
              </div>
            </div>
            <div class="bg-blue-50 p-4 rounded-xl">
              <div class="flex items-center mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <Icon icon="mdi:sleep" class="w-6 h-6 text-blue-600" />
                </div>
                <h4 class="font-semibold">Sleep Quality</h4>
              </div>
              <div class="flex items-center justify-between">
                <div class="text-2xl font-bold">{{nutritionData.sleep}} / 8 hrs</div>
                <div class="text-sm text-blue-600">{{Math.round((nutritionData.sleep/8)*100)}}%</div>
              </div>
              <div class="mt-2 bg-white rounded-full h-2">
                <div class="bg-blue-500 h-2 rounded-full" :style="`width: ${(nutritionData.sleep/8)*100}%`"></div>
              </div>
            </div>
          </div>
          <div class="mt-4 text-center">
            <button class="text-blue-500 hover:text-blue-600 font-medium">View Full Nutrition Plan</button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Program Details -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-4">Program Details</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Days per week</span>
              <span class="font-semibold">{{programDetails.daysPerWeek}} Days</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Total workouts</span>
              <span class="font-semibold">{{programDetails.totalWorkouts}}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Program focus</span>
              <span class="font-semibold">{{programDetails.focus}}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-600">Equipment needed</span>
              <span class="font-semibold">{{programDetails.equipment}}</span>
            </div>
          </div>
          <div class="mt-6">
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Icon icon="mdi:message-outline" class="w-5 h-5" />
              <span>Message Trainer</span>
            </button>
          </div>
        </div>

        <!-- Today's Exercises -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold">Today's Exercises</h3>
            <button class="text-blue-500 text-sm hover:underline flex items-center">
              View all <Icon icon="mdi:chevron-right" class="w-4 h-4 ml-1" />
            </button>
          </div>
          <div class="space-y-4">
            <div
              v-for="exercise in todaysExercises"
              :key="exercise.id"
              class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div class="flex items-start">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Icon :icon="exercise.icon" class="w-6 h-6 text-blue-600" />
                </div>
                <div class="flex-1">
                  <div class="font-semibold">{{ exercise.name }}</div>
                  <div class="text-sm text-gray-600">
                    {{ exercise.sets }} sets × {{ exercise.reps }} reps
                    <span class="mx-2">•</span>
                    {{ exercise.equipment }}
                  </div>
                  <div v-if="exercise.pr" class="mt-1 text-xs bg-green-100 text-green-700 py-1 px-2 rounded inline-flex items-center">
                    <Icon icon="mdi:trophy" class="w-3 h-3 mr-1" />
                    Personal Record
                  </div>
                </div>
                <button class="p-2 text-gray-500 hover:text-blue-500">
                  <Icon icon="mdi:information-outline" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements Section -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-4">Achievements</h3>
          <div class="space-y-4">
            <div class="grid grid-cols-3 gap-3">
              <div class="bg-gray-100 p-3 rounded-xl text-center" :class="{'bg-gradient-to-br from-purple-500 to-pink-500 text-white': userStats.streak >= 7}">
                <div class="text-2xl mb-2">🔥</div>
                <div class="text-xs font-medium">7-Day Streak</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-xl text-center" :class="{'bg-gradient-to-br from-blue-500 to-cyan-500 text-white': programProgress >= 50}">
                <div class="text-2xl mb-2">🏅</div>
                <div class="text-xs font-medium">Halfway There</div>
              </div>
              <div class="bg-gray-100 p-3 rounded-xl text-center" :class="{'bg-gradient-to-br from-yellow-400 to-orange-500 text-white': userStats.prs >= 5}">
                <div class="text-2xl mb-2">💪</div>
                <div class="text-xs font-medium">5 PRs Set</div>
              </div>
            </div>
            <div class="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl text-white text-center opacity-80 hover:opacity-100 transition-opacity">
              <div class="text-4xl mb-4">🏆</div>
              <h4 class="text-xl font-bold mb-2">Program Completion Badge</h4>
              <p class="text-sm opacity-90">Complete all workouts to unlock this achievement</p>
              <div class="mt-2 bg-white bg-opacity-20 rounded-full h-2">
                <div class="bg-white h-2 rounded-full" :style="`width: ${programProgress}%`"></div>
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

// Mock Data
const currentWeek = ref(2)
const programProgress = ref(35)

// Program Details
const programDetails = ref({
  trainerName: 'Alex Johnson',
  daysPerWeek: 4,
  totalWorkouts: 24,
  focus: 'Strength & Hypertrophy',
  equipment: 'Full Gym'
})

// User Stats
const userStats = ref({
  streak: 5,
  totalWeight: 12450,
  totalTime: 18.5,
  prs: 3
})

// Nutrition Data
const nutritionData = ref({
  protein: 120,
  proteinTarget: 150,
  water: 2.1,
  waterTarget: 3,
  sleep: 6.5
})

const weeklySchedule = ref([
  {
    id: 1,
    date: 'Mon, Aug 21',
    title: 'Upper Body Strength',
    duration: '60 mins',
    focus: 'Chest & Back',
    completed: true
  },
  {
    id: 2,
    date: 'Tue, Aug 22',
    title: 'Lower Body Power',
    duration: '45 mins',
    focus: 'Legs & Core',
    completed: false,
    isToday: true
  },
  {
    id: 3,
    date: 'Thu, Aug 24',
    title: 'Active Recovery',
    duration: '30 mins',
    focus: 'Mobility',
    completed: false
  },
])

const todaysExercises = ref([
  { id: 1, name: 'Barbell Squat', icon: 'mdi:weight-lifter', sets: 4, reps: '8-10', equipment: 'Barbell' },
  { id: 2, name: 'Deadlift', icon: 'mdi:weight-lifter', sets: 4, reps: '6-8', equipment: 'Barbell', pr: true },
  { id: 3, name: 'Leg Press', icon: 'mdi:weight-lifter', sets: 3, reps: '10-12', equipment: 'Machine' },
  { id: 4, name: 'Plank', icon: 'mdi:yoga', sets: 3, reps: '60s', equipment: 'Bodyweight' },
])

// Methods
const prevWeek = () => {
  if (currentWeek.value > 1) {
    currentWeek.value--
    // Here you would load data for the previous week
  }
}

const nextWeek = () => {
  if (currentWeek.value < 6) {
    currentWeek.value++
    // Here you would load data for the next week
  }
}

const startWorkout = (day) => {
  if (!day.completed) {
    // Navigate to workout page or start workout logic
    console.log(`Starting workout: ${day.title}`)
  }
}

const viewWorkoutDetails = (day) => {
  // Show workout details/history
  console.log(`Viewing details for: ${day.title}`)
}

const getStatusClass = (day) => {
  if (day.completed) return 'bg-green-100 text-green-600'
  if (day.isToday) return 'bg-blue-100 text-blue-600'
  return 'bg-gray-100 text-gray-500'
}

const getStatusIcon = (day) => {
  if (day.completed) return 'mdi:check'
  if (day.isToday) return 'mdi:dumbbell'
  return 'mdi:calendar'
}

const getButtonClass = (day) => {
  if (day.completed) return 'bg-gray-100 text-gray-500'
  if (day.isToday) return 'bg-blue-500 hover:bg-blue-600 text-white'
  return 'bg-blue-100 text-blue-600 hover:bg-blue-200'
}

const getButtonText = (day) => {
  if (day.completed) return 'Completed'
  if (day.isToday) return 'Start Workout'
  return 'View Workout'
}

// Chart Configurations
const overallProgressOptions = ref<ApexOptions>({
  chart: { type: 'radialBar' },
  plotOptions: {
    radialBar: {
      hollow: { size: '60%' },
      dataLabels: {
        name: { show: false },
        value: {
          offsetY: 5,
          fontSize: '24px',
          fontWeight: '700',
          color: '#FFFFFF',
          formatter: (val: number) => `${val}%`
        }
      }
    }
  },
  colors: ['#FFFFFF'],
  stroke: { lineCap: 'round' },
})

const timelineOptions = computed<ApexOptions>(() => ({
  chart: {
    type: 'line',
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  colors: ['#3B82F6', '#22C55E'],
  stroke: { width: [4, 3], curve: 'smooth', dashArray: [0, 5] },
  markers: { size: 6, colors: ['#3B82F6', '#22C55E'], strokeWidth: 2, strokeColors: '#FFFFFF' },
  xaxis: {
    categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: {
    min: 0,
    max: 100,
    labels: {
      style: { colors: '#6B7280' },
      formatter: (val: number) => `${val}%`
    }
  },
  grid: { borderColor: '#F3F4F6' },
  tooltip: { theme: 'light' }
}))

const timelineSeries = ref([
  {
    name: 'Your Progress',
    data: [10, 35, null, null, null, null]
  },
  {
    name: 'Target Progress',
    data: [16, 33, 50, 67, 84, 100]
  }
])
</script>
