<script setup lang="ts">
import CoachCard from '@/components/home/pricing/CoachCard.vue'
import { computed } from 'vue'
import { coaches } from '@/helpers/coaches.ts'

const props = defineProps({
  activeSpecialty: {
    type: String,
    required: true,
  },
  isYearly: {
    type: Boolean,
    default: false,
  },
})

// Filter coaches based on selected specialty
const filteredCoaches = computed(() => {
  if (props.activeSpecialty === 'all') {
    return coaches
  }
  return coaches.filter((coach) => coach.specialties.includes(props.activeSpecialty))
})
</script>

<template>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    <div
      v-for="coach in filteredCoaches"
      :key="coach.id"
      class="rounded-xl bg-white dark:bg-gray-900 border-2 transition-all duration-300 hover:shadow-xl overflow-hidden"
      :class="
            coach.featured
              ? 'border-primary/50 dark:border-primary-active shadow-xl'
              : 'border-gray-200 dark:border-gray-700'
          "
    >
      <CoachCard :coach="coach" :isYearly="isYearly"/>
    </div>
  </div>
</template>
