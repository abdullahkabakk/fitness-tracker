<template>
  <router-link
    :to="to"
    class="flex items-center py-3 text-gray-700 dark:text-gray-200 hover:underline transition rounded-lg"
    :class="$route.fullPath === to ? 'bg-primary-light px-2 dark:bg-primary font-semibold' : ''"
  >
    <Icon v-if="icon" :icon="icon" class="text-xl" />
    <span>{{ $t(text) }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon?: string
  text: string
  to: string
}>()
import { Icon } from '@iconify/vue'
</script>
