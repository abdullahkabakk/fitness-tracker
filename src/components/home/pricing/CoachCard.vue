<script setup lang="ts">
import { Icon } from '@iconify/vue'
defineProps(['coach', 'isYearly'])
</script>

<template>
  <!-- Coach Image & Banner -->
  <div class="relative">
    <img
      v-if="coach.banner"
      :src="coach.banner"
      :alt="coach.name"
      class="w-full h-32 object-cover"
    />
    <div
      class="h-32 bg-gradient-to-r from-primary to-indigo-600 dark:from-blue-700 dark:to-indigo-800"
      v-else
    ></div>
    <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
      <div
        class="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden bg-gray-200 dark:bg-gray-700"
      >
        <img
          v-if="coach.avatar"
          :src="coach.avatar"
          :alt="coach.name"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-500 dark:text-gray-400"
        >
          {{ coach.name.charAt(0) }}
        </div>
      </div>
    </div>
  </div>

  <!-- Coach Info -->
  <div class="pt-12 px-6 pb-6 text-center">
    <div
      v-if="coach.featured"
      class="bg-primary-light/10 dark:bg-primary-light/10 text-primary dark:text-primary text-xs font-medium px-3 py-1 rounded-full inline-block mb-2"
    >
      {{ $t('common.topCoach') }}
    </div>
    <h3 class="text-xl font-bold mb-1 text-gray-900 dark:text-white">{{ coach.name }}</h3>

    <!-- Specialties -->
    <div class="flex flex-wrap gap-1 justify-center mb-3">
              <span
                v-for="specialty in coach.specialties.slice(0, 3)"
                :key="specialty"
                class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {{ $t(`home.coaches.specialities.${specialty}`) }}
              </span>
      <span
        v-if="coach.specialties.length > 3"
        class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
      >
                +{{ coach.specialties.length - 3 }}
              </span>
    </div>

    <!-- Rating -->
    <div class="flex items-center justify-center mb-4">
      <div class="flex">
        <Icon
          v-for="n in 5"
          :key="n"
          :icon="
                    n <= coach.rating
                      ? 'material-symbols-light:star'
                      : 'material-symbols-light:star-outline'
                  "
          class="w-5 h-5"
          :class="
                    n <= coach.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                  "
        />
      </div>
      <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({{ coach.reviewCount }})
              </span>
    </div>

    <!-- Subscription Plan -->
    <div class="border-t border-gray-200 dark:border-gray-700 pt-4 mb-5">
      <div class="text-2xl font-bold text-gray-900 dark:text-white">
        ${{ isYearly ? Math.floor(coach.monthlyPrice * 0.8 * 12) : coach.monthlyPrice }}
        <span class="text-sm text-gray-500 dark:text-gray-400"
        >/{{ isYearly ? $t('common.year').toLowerCase() : $t('common.mo') }}</span
        >
      </div>
      <p v-if="isYearly" class="text-green-500 text-xs">
        {{ $t('common.saveYearly', { amount: Math.floor(coach.monthlyPrice * 0.2 * 12) }) }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
        {{ coach.planDescription }}
      </p>
    </div>
  </div>
</template>
