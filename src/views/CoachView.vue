<template>
    <CoachHero />
    <CoachFeatures />
    <HowItWorks />
    <EarningCalculator />
    <HappyCoaches />
    <FAQ />
  <CallToAction
    titleKey="coaches.cta.title"
    descriptionKey="coaches.cta.description"
    primaryButtonTextKey="coaches.cta.signup"
    secondaryButtonTextKey="coaches.cta.learnMore"
    primaryButtonLink="/signup"
    secondaryButtonLink="/features"
    size="lg"
  >
    <template #media>
      <img src="@/assets/img/happy.jpg" alt="Coach dashboard preview" class="rounded-lg shadow-2xl" />
    </template>
  </CallToAction>
</template>

<script setup lang="ts">
import CoachHero from '@/components/coaches/CoachHero.vue';
import CoachFeatures from '@/components/coaches/CoachFeatures.vue';
import HowItWorks from '@/components/coaches/HowItWorks.vue';
import EarningCalculator from '@/components/coaches/EarningCalculator.vue';
import HappyCoaches from '@/components/coaches/HappyCoaches.vue';
import CallToAction from '@/components/coaches/CallToAction.vue';
import FAQ from '@/components/home/FAQ.vue'
</script>
