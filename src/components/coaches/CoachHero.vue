<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import TrustedBy from '@/components/home/hero/TrustedBy.vue'
import StatsItem from '@/components/common/StatsItem.vue'

const buttons = [
  {
    text: 'coachRegister',
    variant: 'primary',
    size: 'lg',
    click: () => {},
  },
  {
    text: 'coachLogin',
    variant: 'outline',
    size: 'lg',
    click: () => {},
  },
]

const stats = [
  {
    target: 500,
    suffix: '+',
    label: 'coaches.hero.stats.activeCoaches',
  },
  {
    target: 10000,
    suffix: '+',
    label: 'coaches.hero.stats.users',
  },
  {
    target: 3.5,
    label: 'coaches.hero.stats.earnings',
    isCurrency: true,
    suffix: 'k',
  }
]
</script>

<template>
  <div class="pt-32 pb-20 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-4 py-6 lg:px-8 lg:py-10">
      <div class="md:w-1/2 mb-12 md:mb-0">
        <h1
          class="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-dark dark:from-primary-light dark:to-blue-400 bg-clip-text text-transparent"
        >
          {{ $t('coaches.hero.title') }}
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {{ $t('coaches.hero.subtitle') }}
        </p>
        <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            v-for="(button, index) in buttons"
            :key="index"
            :variant="button.variant"
            :size="button.size"
            @click="button.click"
          >
            {{ $t(`coaches.${button.text}`) }}
          </Button>
        </div>

        <TrustedBy />

        <!-- Animated Stats -->
        <div class="mt-16 grid grid-cols-3 gap-6">
          <StatsItem
            v-for="stat in stats"
            :key="stat.label"
            :target="stat.target"
            :suffix="stat.suffix"
            :label="$t(stat.label)"
            :isCurrency="stat.isCurrency"
          />
        </div>
      </div>

      <div class="md:w-1/2 relative">
        <div class="absolute -top-4 -left-4 w-24 h-24 bg-purple-200 dark:bg-purple-900 rounded-full opacity-50 blur-xl"></div>
        <div class="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-50 blur-xl"></div>
      </div>
    </div>
  </div>
</template>
