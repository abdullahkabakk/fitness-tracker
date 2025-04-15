<script setup lang="ts">
import { brands } from '@/helpers/testimonials/brands.ts'
</script>

<template>
  <div class="mt-24">
    <p class="text-center text-gray-500 dark:text-gray-400 uppercase text-sm tracking-wider mb-8">
      {{ $t('home.testimonials.brands_title') }}
    </p>
    <div class="flex flex-wrap justify-center items-center gap-8 md:gap-12">
      <div v-for="(brand, index) in brands" :key="index" class="h-16 w-36 relative">
        <img
          :src="brand.logo"
          :alt="brand.name"
          class="h-full w-full object-contain opacity-70 hover:opacity-100 transition-opacity dark:invert"
        />
      </div>
    </div>
  </div>
</template>
