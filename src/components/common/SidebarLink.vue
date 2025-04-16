<!-- SidebarLink.vue -->
<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 transition rounded-lg"
    active-class="bg-primary-100 dark:bg-primary-900 font-semibold"
  >
    <Icon :icon="icon" class="text-xl" />
    <span>{{ text }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  text: string
  to: string
}>()
import { Icon } from '@iconify/vue'
</script>
