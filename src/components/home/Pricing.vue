<template>
  <section id="coaches-marketplace" class="py-20 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <SectionTitleSubtitle
        :title="$t('home.coaches.title')"
        :subtitle="$t('home.coaches.subtitle')"
      />

      <!-- Toggle between monthly/yearly -->
      <MonthlyYearlySwitch v-model:isYearly="isYearly"/>

      <!-- Filters -->
      <CoachFilters v-model:activeSpecialty="activeSpecialty"/>

      <!-- Coaches Grid -->
      <CoachesGrid :activeSpecialty="activeSpecialty" :is-yearly="isYearly"/>

      <!-- View More Coaches Button -->
      <div class="mt-12 text-center mx-auto">
        <Button variant="primary" class="flex mx-auto">
          {{ $t('coaches.viewAll') }}
          <Icon icon="material-symbols-light:arrow-forward" class="ml-2 my-auto w-5 h-5" />
        </Button>
      </div>

      <!-- Testimonial -->
      <Testimonial/>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '@/components/common/Button.vue'
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue'
import CoachesGrid from '@/components/home/pricing/CoachesGrid.vue'
import Testimonial from '@/components/home/pricing/Testimonial.vue'
import CoachFilters from '@/components/home/pricing/CoachFilters.vue'
import MonthlyYearlySwitch from '@/components/home/pricing/MonthlyYearlySwitch.vue'

const isYearly = ref(false)
const activeSpecialty = ref('all')
</script>
