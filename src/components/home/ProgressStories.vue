<script setup lang="ts">
import SocialProof from '@/components/home/progress-stories/SocialProof.vue'
import TransformationsGrid from '@/components/home/progress-stories/TransformationsGrid.vue'
</script>

<template>
  <section class="pb-20 bg-gradient-to-t from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {{$t('home.progressStories.realPeople') }},
          <span class="text-primary dark:text-primary">{{
            $t('home.progressStories.realResults')
          }}</span>
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ $t('home.progressStories.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <TransformationsGrid/>
      </div>

      <!-- Social Proof Footer -->
      <SocialProof/>
    </div>
  </section>
</template>
