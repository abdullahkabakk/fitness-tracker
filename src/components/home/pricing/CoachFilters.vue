<script setup lang="ts">
const specialities = ['weightTraining', 'nutrition', 'cardio', 'yoga', 'crossFit', 'calisthenics']
defineProps({
  activeSpecialty: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:activeSpecialty'])
</script>

<template>
  <div class="mb-12">
    <div class="flex flex-wrap gap-3 justify-center">
      <button
        @click="() => emit('update:activeSpecialty', 'all')"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="
              activeSpecialty === 'all'
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            "
      >
        {{ $t('common.all') }}
      </button>
      <button
        v-for="specialty in specialities"
        :key="specialty"
        @click="() => emit('update:activeSpecialty', specialty)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="
              activeSpecialty === specialty
                ? 'bg-primary text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            "
      >
        {{ $t(`home.coaches.specialities.${specialty}`) }}
      </button>
    </div>
  </div>
</template>

