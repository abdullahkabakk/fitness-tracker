<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Card from '@/components/common/Card.vue'

// Today's sessions data
const todaySessions = [
  {
    name: 'Emma Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    time: '9:00 AM - 10:00 AM',
    type: 'strength',
    typeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    status: 'upcoming',
    statusClass: 'text-yellow-600 dark:text-yellow-400',
    statusDot: 'bg-yellow-500',
  },
  {
    name: 'Mike Wilson',
    avatar: 'https://i.pravatar.cc/150?img=8',
    time: '11:30 AM - 12:30 PM',
    type: 'strength',
    typeClass: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    status: 'inProgress',
    statusClass: 'text-green-600 dark:text-green-400',
    statusDot: 'bg-green-500',
  },
  {
    name: 'Sarah Miller',
    avatar: 'https://i.pravatar.cc/150?img=3',
    time: '2:00 PM - 3:00 PM',
    type: 'cardio',
    typeClass: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    status: 'upcoming',
    statusClass: 'text-yellow-600 dark:text-yellow-400',
    statusDot: 'bg-yellow-500'
  },
  {
    name: 'James Taylor',
    avatar: 'https://i.pravatar.cc/150?img=12',
    time: '4:30 PM - 5:30 PM',
    type: 'yoga',
    typeClass: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
    status: 'upcoming',
    statusClass: 'text-yellow-600 dark:text-yellow-400',
    statusDot: 'bg-yellow-500'
  },
  {
    name: 'Olivia Brown',
    avatar: 'https://i.pravatar.cc/150?img=5',
    time: '6:00 PM - 7:00 PM',
    type: 'pilates',
    typeClass: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    status: 'completed',
    statusClass: 'text-green-600 dark:text-green-400',
    statusDot: 'bg-green-500'
  },
  {
    name: 'Liam Smith',
    avatar: 'https://i.pravatar.cc/150?img=10',
    time: '8:00 PM - 9:00 PM',
    type: 'zumba',
    typeClass: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
    status: 'canceled',
    statusClass: 'text-red-600 dark:text-red-400',
    statusDot: 'bg-red-500'
  },
  {
    name: 'Sophia Davis',
    avatar: 'https://i.pravatar.cc/150?img=7',
    time: '10:00 PM - 11:00 PM',
    type: 'boxing',
    typeClass: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    status: 'upcoming',
    statusClass: 'text-yellow-600 dark:text-yellow-400',
    statusDot: 'bg-yellow-500'
  }
]

</script>

<template>
  <Card class="xl:col-span-2">
    <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
      <h2 class="font-bold text-lg flex items-center gap-2">
        <Icon icon="mdi:calendar-clock" class="text-primary-600 dark:text-primary-400" />
        {{ $t('pt.home.sessions.title') }}
      </h2>
      <button class="text-primary-600 dark:text-primary-400 flex items-center gap-1 group">
        <span class="group-hover:underline">{{ $t('pt.home.sessions.viewAll') }}</span>
        <Icon icon="mdi:arrow-right" class="transition-transform group-hover:translate-x-1" />
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[600px]">
        <thead class="hidden md:table-header-group">
        <tr class="text-left text-sm text-gray-500 dark:text-gray-400">
          <th class="pb-3 font-medium">{{ $t('pt.home.sessions.columns.client') }}</th>
          <th class="pb-3 font-medium">{{ $t('pt.home.sessions.columns.time') }}</th>
          <th class="pb-3 font-medium">{{ $t('pt.home.sessions.columns.type') }}</th>
          <th class="pb-3 font-medium">{{ $t('pt.home.sessions.columns.status') }}</th>
          <th class="pb-3 font-medium">{{ $t('pt.home.sessions.columns.action') }}</th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
        <tr
          v-for="(session, index) in todaySessions"
          :key="index"
          class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
        >
          <td class="py-3">
            <div class="flex items-center gap-3">
              <div class="relative">
                <img
                  :src="session.avatar"
                  alt="Client"
                  class="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
                >
                <div v-if="session.status === 'inProgress'" class="absolute -bottom-1 -right-1">
                  <div class="animate-ping w-3 h-3 rounded-full bg-green-500"></div>
                  <div class="absolute top-0 w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <span class="font-medium text-gray-800 dark:text-gray-200">{{ session.name }}</span>
            </div>
          </td>

          <td class="py-3">
            <div class="flex flex-col">
              <span class="text-gray-800 dark:text-gray-200">{{ session.time }}</span>
              <span
                v-if="session.status === 'upcoming'"
                class="text-xs text-gray-500 dark:text-gray-400"
              >
                  {{ $t('pt.home.sessions.timeRemaining', { time: '2h 30m' }) }}
                </span>
            </div>
          </td>

          <td class="py-3">
            <div class="flex items-center gap-2">
              <Icon :icon="session.icon" class="w-5 h-5" />
              <span :class="`px-2.5 py-1 rounded-full text-xs font-medium ${session.typeClass}`">
                  {{ $t(`pt.home.sessions.sessionTypes.${session.type}`) }}
                </span>
            </div>
          </td>

          <td class="py-3">
            <div class="flex items-center gap-2">
                <span class="relative flex h-3 w-3">
                  <span
                    v-if="session.status === 'inProgress'"
                    class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    :class="session.statusDot"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-3 w-3"
                    :class="session.statusDot"
                  ></span>
                </span>
              <span :class="`text-sm font-medium ${session.statusClass}`">
                  {{ $t(`pt.home.sessions.statuses.${session.status}`) }}
                </span>
            </div>
          </td>

          <td class="py-3">
            <div class="relative">
              <button class="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 p-1 rounded-lg">
                <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    </Card>
</template>
