<template>
  <Card class="space-y-8 p-4 sm:p-6">
    <!-- Calendar Section -->
    <div class="bg-white dark:bg-header-dark p-4 sm:p-6">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl sm:text-2xl font-bold text-primary-text dark:text-white">
          {{ currentMonth }}
        </h2>
        <div class="flex gap-2 sm:gap-4">
          <button @click="prevMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Icon icon="mdi:chevron-left" class="text-lg sm:text-xl" />
          </button>
          <button @click="nextMonth" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Icon icon="mdi:chevron-right" class="text-lg sm:text-xl" />
          </button>
        </div>
      </div>

      <!-- Wrap content in an overflow container -->
      <div class="overflow-x-auto">
        <div class="flex flex-col lg:flex-row gap-4">
          <!-- Calendar Grid -->
          <div class="flex-1 min-w-0">
            <div class="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
              <div v-for="day in days" :key="day" class="bg-white dark:bg-background-dark p-2 text-center font-medium text-sm sm:text-base">
                {{ day }}
              </div>

              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="bg-white dark:bg-background-dark min-h-24 sm:min-h-32 p-2 relative hover:bg-gray-50 dark:hover:bg-gray-700"
                :class="{ 'bg-primary-100 dark:bg-primary-100/20': isToday(day.date) }"
              >
                <div class="flex justify-between items-center mb-1">
                  <span :class="[
                    'text-xs sm:text-sm',
                    { 'text-gray-400': !day.isCurrentMonth },
                    { 'font-bold text-primary dark:text-primary-400': isToday(day.date) }
                  ]">
                    {{ day.date.getDate() }}
                  </span>
                </div>

                <!-- Upcoming Events -->
                <div class="space-y-1">
                  <div
                    v-for="event in getEventsForDate(day.date)"
                    :key="event.id"
                    class="text-xs p-1 rounded truncate cursor-pointer hover:opacity-90"
                    :class="eventTypeClasses[event.type]"
                    @click="selectEvent(event)"
                  >
                    {{ event.title }} {{ dayjs(event.date).format('HH:mm') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Session List -->
          <div class="flex-1 min-w-[300px] bg-white dark:bg-background-dark rounded-xl p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row xl:flex-col items-start justify-between mb-6 gap-2">
              <h3 class="text-lg sm:text-xl font-semibold text-primary-text dark:text-white">Recent Sessions</h3>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="filter in filters"
                  :key="filter"
                  @click="selectedFilter = filter"
                  :class="[
                    'px-3 py-1.5 text-sm rounded-lg transition-colors',
                    selectedFilter === filter
                      ? 'bg-primary text-white dark:bg-primary-dark'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  ]"
                >
                  {{ filter }}
                </button>
              </div>
            </div>

            <div class="space-y-3 sm:space-y-4">
              <div
                v-for="session in filteredSessions"
                :key="session.id"
                class="p-3 sm:p-4 rounded-lg border border-gray-100 dark:border-gray-700 bg-background-light dark:bg-header-dark"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0"
                      :class="sessionTypeClasses[session.type]"
                    >
                      <Icon :icon="sessionIcons[session.type]" class="text-lg sm:text-xl text-white" />
                    </div>
                    <div class="min-w-0">
                      <h4 class="font-medium text-sm sm:text-base text-primary-text dark:text-white truncate">
                        {{ session.title }}
                      </h4>
                      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        {{ formatDate(session.date) }} • {{ session.duration }} mins
                      </p>
                    </div>
                  </div>
                  <div class="text-right min-w-[70px]">
                    <p class="font-bold text-sm sm:text-base text-green-500 dark:text-green-400">
                      ${{ session.earnings }}
                    </p>
                    <p v-if="session.status === 'completed'" class="flex items-center gap-1 text-xs sm:text-sm">
                      <Icon
                        v-for="n in 5"
                        :key="n"
                        :icon="n <= session.rating ? 'mdi:star' : 'mdi:star-outline'"
                        class="text-yellow-400"
                      />
                    </p>
                    <p v-else class="text-red-500 dark:text-red-400 text-xs sm:text-sm">Cancelled</p>
                  </div>
                </div>

                <!-- Session Details -->
                <div v-if="session.client" class="mt-3 sm:mt-4 ml-8 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex items-center gap-3">
                    -
                    <img :src="session.client.avatar" alt="user" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
                    <div class="min-w-0">
                      <p class="font-medium text-sm sm:text-base text-primary-text dark:text-white truncate">
                        {{ session.client.name }}
                      </p>
                      <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                        {{ session.client.email }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> <!-- End flex container -->
      </div> <!-- End overflow container -->
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  addMonths,
  subMonths
} from 'date-fns'
import Card from '@/components/common/Card.vue'

// Calendar Logic
const currentDate = ref(new Date())
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const calendarDays = computed(() => {
  const start = startOfMonth(currentDate.value)
  const end = endOfMonth(currentDate.value)
  return eachDayOfInterval({ start, end }).map(date => ({
    date,
    isCurrentMonth: isSameMonth(date, currentDate.value)
  }))
})

// Session Data
const filters = ref(['All', 'Completed', 'Cancelled'])
const selectedFilter = ref('All')

const sessions = ref([
  {
    id: 1,
    title: 'Personal Training',
    type: '1:1',
    date: dayjs('2025-04-17 12:00').toDate(),
    duration: 60,
    earnings: 120,
    status: 'completed',
    rating: 4,
    client: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://i.pravatar.cc/40?img=1'
    }
  },
  {
    id: 2,
    title: 'Group Fitness',
    type: 'group',
    date: dayjs('2025-04-13 10:00').toDate(),
    duration: 90,
    earnings: 200,
    status: 'completed',
    rating: 5
  },
  {
    id: 3,
    title: 'Video Consultation',
    type: 'video',
    date: dayjs('2025-04-11 13:50').toDate(),
    duration: 45,
    earnings: 90,
    status: 'cancelled'
  },
  {
    id: 4,
    title: 'Yoga Class',
    type: 'group',
    date: dayjs('2025-04-25 09:00').toDate(),
    duration: 60,
    earnings: 150,
    status: 'completed',
    rating: 3
  },
  {
    id: 5,
    title: 'Nutrition Consultation',
    type: '1:1',
    date: dayjs('2025-04-30 13:00').toDate(),
    duration: 30,
    earnings: 60,
    status: 'completed',
    rating: 4
  }
])

// Computed Values
const filteredSessions = computed(() => {
  if (selectedFilter.value === 'All') return sessions.value
  return sessions.value.filter(s => s.status === selectedFilter.value.toLowerCase())
})

// Styles and Icons
const sessionTypeClasses = {
  '1:1': 'bg-purple-500',
  'group': 'bg-blue-500',
  'video': 'bg-green-500'
}

const sessionIcons = {
  '1:1': 'mdi:account',
  'group': 'mdi:account-group',
  'video': 'mdi:video'
}

function selectEvent() {
  // Handle event selection (e.g., open a modal)
}

const getEventsForDate = (date) => {
  return sessions.value.filter(session => session.date.toDateString() == date.toDateString())
}
const eventTypeClasses = {
  '1:1': 'bg-purple-100 text-purple-800',
  'group': 'bg-blue-100 text-blue-800',
  'video': 'bg-green-100 text-green-800'
}
const currentMonth = computed(() => format(currentDate.value, 'MMMM yyyy'))

// Helper Functions
const formatDate = (date: Date) => format(date, 'MMM dd, yyyy')
// const formatTime = (date: Date) => format(date, 'HH:mm')
const isToday = (date: Date) => isSameDay(date, new Date())
const prevMonth = () => currentDate.value = subMonths(currentDate.value, 1)
const nextMonth = () => currentDate.value = addMonths(currentDate.value, 1)
</script>
