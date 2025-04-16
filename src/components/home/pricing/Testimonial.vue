<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-md">
    <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div
        class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden"
      >
        <!-- Random person image -->
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Student testimonial"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="flex-1">
        <div class="flex mb-3">
          <Icon
            v-for="n in 5"
            :key="n"
            icon="material-symbols-light:star"
            class="w-5 h-5 text-yellow-400"
          />
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4 italic">
          "{{ $t('home.coaches.testimonial.review') }}"
        </p>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">Michael Thompson</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ $t('home.coaches.testimonial.progress') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
