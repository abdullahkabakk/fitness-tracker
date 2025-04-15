<template>
  <section id="features" class="py-20 bg-gradient-to-t from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <SectionTitleSubtitle
        :title="$t('home.features.title')"
        :subtitle="$t('home.features.subtitle')"
      />

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :icon="feature.icon"
          :title="$t(feature.titleKey)"
          :description="$t(feature.descriptionKey)"
        />
      </div>

      <!-- User Feature Highlight -->
      <UserFeatureHighlight/>

      <!-- Coach Feature Highlight -->
      <CoachFeatureHighlight/>
    </div>
  </section>
</template>

<script setup lang="ts">
import FeatureCard from '@/components/common/FeatureCard.vue'
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue'
import CoachFeatureHighlight from '@/components/home/features/CoachFeatureHighlight.vue'
import UserFeatureHighlight from '@/components/home/features/UserFeatureHighlight.vue'
import { features } from '@/helpers/features'
</script>
