<template>
  <section class="pb-20 bg-gradient-to-t from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <SectionTitleSubtitle
        :title="$t('home.testimonials.title')"
        :subtitle="$t('home.testimonials.subtitle')"
      />

      <TestimonialClients/>
      <BrandsSection/>
    </div>
  </section>
</template>

<script setup lang="ts">
import TestimonialClients from '@/components/home/testimonial/TestimonialClients.vue'
import BrandsSection from '@/components/home/testimonial/BrandsSection.vue'
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue'
</script>
