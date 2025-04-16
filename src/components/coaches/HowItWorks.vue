<template>
  <section class="py-20  bg-gradient-to-b from-white to-secondary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-1 rounded-full bg-secondary-100 text-secondary-600 text-sm font-medium mb-4 dark:bg-secondary-900/50 dark:text-secondary-300">
          {{ $t('coaches.howItWorks.tagline') || 'For Personal Trainers' }}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-secondary-text dark:text-white">
          {{ $t('coaches.howItWorks.title') }}
        </h2>
        <p class="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {{ $t('coaches.howItWorks.subtitle') }}
        </p>
      </div>

      <div class="relative">
        <!-- Connection line with animated gradient -->
        <div class="hidden xl:block absolute top-1/2 left-12 right-12 h-1 bg-gradient-to-r from-secondary-300 via-secondary-500 to-secondary-300 transform -translate-y-1/2 rounded-full"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="relative bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 xl:border border-gray-100 dark:border-gray-700 group"
          >
            <!-- Step number badge -->
            <div class="flex justify-center -mt-12 mb-6">
              <div class="w-16 h-16 rounded-full bg-secondary dark:bg-secondary flex items-center justify-center text-white text-xl font-bold relative  shadow-md group-hover:scale-110 transition-transform duration-300">
                {{ index + 1 }}
              </div>
            </div>

            <!-- Step content -->
            <div class="text-center px-4">
              <div class="h-14 flex items-center justify-center">
                <div class="p-3 rounded-full bg-secondary-50 dark:bg-secondary-900/30 group-hover:bg-secondary-100 dark:group-hover:bg-secondary-800/50 transition-colors duration-300">
                  <Icon :icon="step.icon" class="w-8 h-8 text-secondary dark:text-secondary" />
                </div>
              </div>
              <h3 class="text-xl font-bold mt-4 mb-3 text-secondary-text dark:text-white group-hover:text-secondary-600 dark:group-hover:text-secondary-300 transition-colors duration-300">
                {{ $t(step.titleKey) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300">
                {{ $t(step.descriptionKey) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <RouterLink :to="PtRoutes.home">
        <Button
          variant="secondary"
          size="lg"
          class="px-8 flex mx-auto py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-secondary hover:bg-secondary-600 dark:bg-secondary-active dark:hover:bg-secondary-700"
        >
          {{ $t('coaches.howItWorks.getStartedButton') }}
          <Icon icon="material-symbols:arrow-forward" class="ml-2 my-auto w-5 h-5" />
        </Button>
        </RouterLink>
      </div>

      <div class="mt-8 text-center">
        <button class="flex hover:underline text-secondary-600 dark:text-secondary-400 hover:underline inline-flex items-center">
          {{ $t('coaches.howItWorks.learnMore') || 'Learn more about our trainer platform' }}
          <Icon icon="material-symbols-light:chevron-right" class="ml-1 w-4 h-4" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from '@/components/common/Button.vue';
import { PtRoutes } from '@/helpers/routes/pt.ts'

const steps = [
  {
    icon: 'material-symbols:person-add-outline',
    titleKey: 'coaches.howItWorks.steps.signup.title',
    descriptionKey: 'coaches.howItWorks.steps.signup.description'
  },
  {
    icon: 'material-symbols:package-2-outline-sharp',
    titleKey: 'coaches.howItWorks.steps.packages.title',
    descriptionKey: 'coaches.howItWorks.steps.packages.description'
  },
  {
    icon: 'material-symbols:groups-outline',
    titleKey: 'coaches.howItWorks.steps.clients.title',
    descriptionKey: 'coaches.howItWorks.steps.clients.description'
  },
  {
    icon: 'material-symbols:payments-outline',
    titleKey: 'coaches.howItWorks.steps.earnings.title',
    descriptionKey: 'coaches.howItWorks.steps.earnings.description'
  }
];
</script>
