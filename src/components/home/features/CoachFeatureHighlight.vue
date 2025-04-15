<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="mt-24 grid md:grid-cols-2 gap-12 items-center">
    <div class="order-2 md:order-1 relative">
      <div
        class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30 blur-xl"
      ></div>
      <img src="@/assets/img/pt.png" alt="PT Selection" class="rounded-xl shadow-lg relative z-2" />
    </div>
    <div class="order-1 md:order-2">
      <div
        class="inline-block px-4 py-2 rounded-full bg-primary-light/10 dark:bg-primary/10 text-primary dark:text-primary-light font-medium text-sm mb-4"
      >
        {{ $t('home.features.highlight.forCoaches')}}
      </div>
      <h3 class="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        {{ $t('home.features.highlight.createCustomPackages')}}
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        {{ $t('home.features.highlight.designOffer')}}
      </p>
      <ul class="space-y-4">
        <li class="flex items-start"
            v-for="(value, idx) in ['buildSustainableBusiness', 'manageClients', 'receivePayments']"
            :key="idx">
          <Icon
            icon="material-symbols-light:check-circle"
            class="w-6 h-6 text-green-500 mr-2 mt-0.5"
          />
          <span class="text-gray-700 dark:text-gray-300"
          >
                {{ $t(`home.features.highlight.${value}`)}}
              </span
              >
        </li>
      </ul>
    </div>
  </div>
</template>
