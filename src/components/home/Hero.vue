<template>
  <div
    class="pt-32 pb-20 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 py-6 lg:px-8 lg:py-10">
      <div class="md:w-3/5 lg:w-1/3 mr-4 mb-12 md:mb-0">
        <h1
          class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-blue-400 bg-clip-text text-transparent"
        >
          {{ $t('home.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('home.hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            v-for="(button, index) in buttons"
            :key="index"
            :variant="button.variant"
            :size="button.size"
            @click="button.click"
          >
            {{ $t(`home.hero.${button.text}`) }}
          </Button>
        </div>

        <TrustedBy/>
      </div>
      <div class="md:w-3/5 lg:w-2/3 relative">
        <div
          class="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 dark:bg-purple-900 rounded-full opacity-50 blur-xl"
        ></div>
        <div
          class="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-50 blur-xl"
        ></div>
        <img
          src="@/assets/img/client-dashboard.png"
          alt="Fitness Dashboard"
          class="w-full rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl"
          loading="eager"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import TrustedBy from '@/components/home/hero/TrustedBy.vue'
import {useRouter} from 'vue-router'
import { StudentRoutes } from '@/helpers/routes/student.ts'

const router = useRouter()

const buttons = [
  {
    text: 'startTrial',
    variant: 'primary',
    size: 'lg',
    click: () => {
      router.push(StudentRoutes.home)
      // Handle start trial button click
    },
  },
  {
    text: 'getStarted',
    variant: 'outline',
    size: 'lg',
    click: () => {
      router.push(StudentRoutes.home)
      // Handle coach login button click
    },
  },
]
</script>
