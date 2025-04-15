<script setup lang="ts">
import { testimonials } from '@/helpers/testimonials/testimonials.ts'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div v-for="(testimonial, index) in testimonials" :key="index"
         class="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
      <!-- Stars -->
      <div class="flex mb-4">
        <Icon v-for="i in 5" :key="i" icon="material-symbols-light:star"
              class="w-5 h-5 text-yellow-400" />
      </div>

      <!-- Testimonial text -->
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        "{{ $t(testimonial.quote) }}"
      </p>

      <!-- User info -->
      <div class="flex items-center">
        <img :src="`https://avatar.iran.liara.run/public/${index*2}`"
             alt="User Avatar"
             class="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600" />
        <div class="ml-4">
          <p class="font-medium text-gray-900 dark:text-white">{{ $t(testimonial.name) }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t(testimonial.title) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
