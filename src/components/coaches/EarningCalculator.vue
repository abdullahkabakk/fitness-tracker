<template>
  <section class="py-20 bg-gradient-to-t from-white to-secondary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ $t('coaches.calculator.title') }}
        </h2>
        <p class="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {{ $t('coaches.calculator.subtitle') }}
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div class="grid md:grid-cols-2">
          <div class="p-8 md:p-12">
            <h3 class="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{{ $t('coaches.calculator.estimate') }}</h3>

            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('coaches.calculator.numberOfClients') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="clientCount"
                    type="range"
                    min="1"
                    max="50"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  >
                  <span class="ml-4 font-medium text-gray-900 dark:text-white">{{ clientCount }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('coaches.calculator.subscriptionPrice') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="subscriptionPrice"
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    class="w-full h-2 bg-gray-200 text rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  >
                  <span class="ml-4 font-medium text-gray-900 dark:text-white">${{ subscriptionPrice }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {{ $t('coaches.calculator.retentionRate') }}
                </label>
                <div class="flex items-center">
                  <input
                    v-model="retentionRate"
                    type="range"
                    min="50"
                    max="100"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  >
                  <span class="ml-4 font-medium text-gray-900 dark:text-white">{{ retentionRate }}%</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-secondary-400 to-secondary-700 dark:from-secondary-600 dark:to-secondary-800 p-8 md:p-12 text-white">
            <h3 class="text-2xl font-bold mb-8">{{ $t('coaches.calculator.potentialEarnings') }}</h3>

            <div class="space-y-6">
              <div class="bg-white/10 rounded-lg p-6">
                <h4 class="text-lg font-medium mb-2">{{ $t('coaches.calculator.monthly') }}</h4>
                <p class="text-4xl font-bold">${{ monthlyEarnings.toFixed(2) }}</p>
              </div>

              <div class="bg-white/10 rounded-lg p-6">
                <h4 class="text-lg font-medium mb-2">{{ $t('coaches.calculator.annual') }}</h4>
                <p class="text-4xl font-bold">${{ annualEarnings.toFixed(2) }}</p>
              </div>

              <div class="bg-white/10 rounded-lg p-6">
                <h4 class="text-lg font-medium mb-2">{{ $t('coaches.calculator.fiveYear') }}</h4>
                <p class="text-4xl font-bold">${{ fiveYearEarnings.toFixed(2) }}</p>
              </div>
            </div>

            <p class="mt-8 text-sm text-white/80">
              {{ $t('coaches.calculator.disclaimer') }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <p class="max-w-3xl mx-auto mb-6 text-gray-600 dark:text-gray-300">
          {{ $t('coaches.calculator.platformFee') }}
        </p>
        <RouterLink :to="PtRoutes.home">
        <Button variant="secondary" size="lg">
          {{ $t('coaches.calculator.startButton') }}
        </Button>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Button from '../common/Button.vue';
import { PtRoutes } from '@/helpers/routes/pt.ts'

const clientCount = ref(20);
const subscriptionPrice = ref(50);
const retentionRate = ref(85);

const monthlyEarnings = computed(() => {
  // Platform fee of 10%
  return clientCount.value * subscriptionPrice.value * 0.9;
});

const annualEarnings = computed(() => {
  // Account for retention rate over a year
  const effectiveClients = clientCount.value * (retentionRate.value / 100);
  return effectiveClients * subscriptionPrice.value * 12 * 0.9;
});

const fiveYearEarnings = computed(() => {
  // Simplified calculation assuming linear growth of 10% per year
  let total = 0;
  let currentClients = clientCount.value;

  for (let year = 0; year < 5; year++) {
    // Apply retention each year
    currentClients = currentClients * (retentionRate.value / 100);

    // Add 10% new clients each year (except first year)
    if (year > 0) {
      currentClients = currentClients * 1.1;
    }

    // Calculate year earnings
    const yearEarnings = currentClients * subscriptionPrice.value * 12 * 0.9;
    total += yearEarnings;
  }

  return total;
});
</script>
