<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Mobile Menu Button -->
    <div
      class="lg:hidden fixed flex top-0 w-full right-0 z-10 p-2 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
    >
      <h2 class="text-xl  font-bold text-primary dark:text-white">FitJourney</h2>

      <button
      @click="isSidebarOpen = !isSidebarOpen"
      class="ml-auto w-full mr-4"
      aria-label="Toggle navigation"
    >
      <Icon
        :icon="isSidebarOpen ? 'mdi:close' : 'mdi:menu'"
        class="w-6 h-6 text-gray-600 dark:text-gray-300 mr-2 ml-auto"
      />
    </button>
    </div>
    <!-- Sidebar -->
    <aside
      class="fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="p-6">
        <h2 class="text-xl font-bold text-primary dark:text-white">FitJourney</h2>
      </div>
      <nav class="px-4 space-y-1">
        <template v-for="group in studentNavigationGroups" :key="group.id">
          <div class="px-2 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {{ $t(`student.nav.${group.id}`) }}
          </div>
          <router-link
            @click="isSidebarOpen = false"
            v-for="link in group.links"
            :key="link.id"
            :to="link.to"
            class="flex items-center px-3 py-2.5 rounded-lg mb-1 transition-colors"
            :class="[
              $route.path === link.to
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <Icon :icon="link.icon" class="w-5 h-5 mr-3" />
            <span>{{ $t(`student.nav.${link.id}`) }}</span>
          </router-link>
        </template>
      </nav>
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

    <!-- Backdrop for mobile -->
    <div
      v-if="isSidebarOpen"
      @click="isSidebarOpen = false"
      class="lg:hidden fixed inset-0 z-10 bg-black/50 backdrop-blur-sm"
    ></div>

    <!-- Main Content -->
    <main class="flex-1 pt-16 lg:pt-0 lg:ml-64 transition-all duration-200">
      <div class="h-full p-4 lg:p-6">
        <div class="max-w-7xl mx-auto h-full">
          <div class="lg:hidden mb-6 h-6"></div>
          <div class="h-full flex flex-col">
            <slot />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { studentNavigationGroups } from '@/helpers/studentNavGroups.ts'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { LandingRoutes } from '@/helpers/routes/landing.ts'

const isSidebarOpen = ref(false)

// Close sidebar on desktop
const checkScreenSize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true
  } else {
    isSidebarOpen.value = false
  }
}

// Handle responsive behavior
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>
