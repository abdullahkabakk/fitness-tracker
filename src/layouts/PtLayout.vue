<!-- CoachDashboardLayout.vue -->
<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark flex text-gray-800 dark:text-white">
    <!-- Mobile Sidebar -->
    <div v-if="isSidebarOpen" class="fixed inset-0 bg-black/80 z-10 md:hidden" @click="isSidebarOpen = false" />

    <!-- Sidebar -->
    <aside
      class="lg:w-80 max-h-screen"
      :class="['w-64 bg-white dark:bg-header-dark shadow-md fixed md:sticky z-20 top-0 left-0 md:left-auto npm  overflow-y-auto transition-transform duration-300 flex flex-col',
isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0']">
      <div class="p-6 flex items-center justify-between">
        <RouterLink :to="PtRoutes.home" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          FitJourney
        </RouterLink>
        <button @click="isSidebarOpen = false" class="md:hidden text-gray-600 dark:text-gray-300">
          <Icon icon="mdi:close" class="text-2xl" />
        </button>
      </div>

      <div class="px-4 py-2 flex-grow">
        <!-- User Profile Summary -->
        <div class="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center space-x-3">
          <img src="https://i.pravatar.cc/40" alt="Profile" class="w-10 h-10 rounded-full border-2 border-primary-500">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate">Coach Alex</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 truncate">Premium Coach</p>
          </div>
        </div>

        <!-- Navigation Groups -->
        <div class="space-y-6">
          <div v-for="group in navigationGroups" :key="group.id">
            <h3 class="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 tracking-wider px-3 mb-2">
              {{ $t(`sidebar.groups.${group.id}`) }}
            </h3>
            <nav class="space-y-1">
              <SidebarLink
                v-for="link in group.links"
                :key="link.to"
                :icon="link.icon"
                :text="$t(`sidebar.links.${link.id}`)"
                :to="link.to"
              />
            </nav>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t border-gray-100 dark:border-gray-700 mt-auto">
        <div class="px-4 py-4">
          <RouterLink :to="LandingRoutes.home"
            class="flex items-center justify-center w-full py-2 px-4 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Icon icon="mdi:logout" class="mr-2" />
            <span>{{ $t('sidebar.logout') }}</span>
          </RouterLink>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col ">
      <!-- Navbar -->
      <header class="h-16 md:sticky z-20 top-0 left-0 bg-white dark:bg-header-dark shadow-sm flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
          <button @click="isSidebarOpen = !isSidebarOpen" class="md:hidden text-gray-600 dark:text-gray-300">
            <Icon icon="mdi:menu" class="text-2xl" />
          </button>
        </div>

        <div class="flex items-center gap-4">
          <LanguageSelector/>

          <!-- Dark Mode Toggle -->
          <button @click="toggleDark()" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Icon :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'" class="text-2xl text-gray-600 dark:text-gray-300" />
          </button>

          <!-- Notifications -->
          <div class="relative group">
            <button
              @click="isNotifOpen = !isNotifOpen"
              class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg relative"
            >
              <Icon icon="mdi:bell-outline" class="text-2xl text-gray-600 dark:text-gray-300" />
              <span
                v-if="unreadNotifications"
                class="absolute top-0 right-0 bg-red-500 text-xs text-white w-5 h-5 rounded-full flex items-center justify-center"
              >
      {{ unreadNotifications }}
    </span>
            </button>

            <!-- Desktop Dropdown -->
            <div
              v-if="isNotifOpen"
              class="hidden sm:block absolute right-0 mt-2 w-80 bg-white dark:bg-header-dark rounded-xl shadow-xl z-50"
            >
              <div class="p-4 border-b border-gray-100 dark:border-gray-700">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold">{{ $t('notifications.title') }}</h4>
                  <button class="text-primary-600 text-sm">{{ $t('notifications.markAll') }}</button>
                </div>
              </div>
              <div class="max-h-96 overflow-y-auto">
                <NotificationItem
                  v-for="(notif, index) in notifications"
                  :key="index"
                  :type="notif.type"
                  :title="notif.title"
                  :time="notif.time"
                />
              </div>
            </div>

            <!-- Mobile Drawer -->
            <div
              v-if="isNotifOpen"
              @click="isNotifOpen = false"
              class="sm:hidden fixed inset-0 bg-black/20 bg-opacity-50 z-50 flex justify-end"
            >
              <div class="w-full mt-auto h-1/2 bg-white dark:bg-header-dark p-4 overflow-y-auto">
                <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">
                  <h4 class="font-semibold text-lg">{{ $t('notifications.title') }}</h4>
                  <button @click="isNotifOpen = false" class="text-sm text-primary-600">{{ $t('notifications.markAll') }}</button>
                </div>
                <NotificationItem
                  v-for="(notif, index) in notifications"
                  :key="index"
                  :type="notif.type"
                  :title="notif.title"
                  :time="notif.time"
                />
              </div>
            </div>
          </div>


          <!-- Profile Dropdown -->
          <div class="relative group">
            <button @click="isProfileOpen = !isProfileOpen" class="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                alt="Avatar"
                class="w-10 h-10 rounded-full object-cover border-2 border-primary-500"
              />
            </button>
            <div v-if="isProfileOpen" class="absolute right-0 mt-2 w-48 bg-white dark:bg-header-dark rounded-xl shadow-xl py-2">
              <router-link
                :to="PtRoutes.profile"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <Icon icon="mdi:account" />
                {{ $t('sidebar.links.profile') }}
              </router-link>
              <router-link
                :to="PtRoutes.settings"
                class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
              >
                <Icon icon="mdi:cog" />
                {{ $t('sidebar.links.settings') }}
              </router-link>
              <router-link
                :to="LandingRoutes.home"
                class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
                <Icon icon="mdi:logout" />
                {{ $t('sidebar.logout') }}
              </router-link>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content slot -->
      <main class=" py-10  px-4 md:px-8 w-full h-full max-w-[1920px] mx-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import SidebarLink from '@/components/common/SidebarLink.vue'
import NotificationItem from '@/components/pt/home/NotificationItem.vue'
import LanguageSelector from '@/components/common/LanguageSelector.vue'
import { useDark, useToggle } from '@vueuse/core'
import { navigationGroups } from '@/helpers/ptNavGroups.ts'
import { PtRoutes } from '@/helpers/routes/pt.ts'
import { LandingRoutes } from '@/helpers/routes/landing.ts'
// Dark mode toggle
const isDark = useDark();
const toggleDark = useToggle(isDark);
const isSidebarOpen = ref(false)
const isProfileOpen = ref(false)
const isNotifOpen = ref(false)
const unreadNotifications = ref(3)

const notifications = ref([
  { type: 'message', title: 'New workout submission', time: '15m ago' },
  { type: 'system', title: 'System update available', time: '2h ago' },
  { type: 'payment', title: 'Payment received $250', time: '4h ago' }
])

</script>
