<script setup lang="ts">
defineProps(['story'])
</script>

<template>
  <!-- Story Header with Avatar -->
  <div class="p-6 pb-0 flex items-center gap-4">
    <div
      class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary/10 flex items-center justify-center"
    >
      <span class="text-lg font-medium text-primary dark:text-primary">{{ story.initials }}</span>
    </div>
    <div>
      <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ story.name }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{$t(`home.progressStories.stories.${story.duration}`)}} • {{ $t(`home.progressStories.stories.${story.weightLost}`)  }}
      </p>
    </div>
  </div>

  <!-- Before/After Comparison -->
  <div class="relative p-6 pt-4">
    <div class="flex gap-4 mb-4 relative">
      <div class="w-1/2 relative">
        <img
          :src="story.beforeImg"
          :alt="$t('home.progressStories.before')"
          class="w-full h-64 object-cover rounded-lg border-2 border-red-400 dark:border-red-500"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-red-400/60 text-white text-center py-1 text-sm font-bold"
        >
          {{ $t('home.progressStories.before') }}
        </div>
      </div>
      <div class="w-1/2 relative">
        <img
          :src="story.afterImg"
          :alt="$t('home.progressStories.after')"
          class="w-full h-64 object-cover rounded-lg border-2 border-green-400 dark:border-green-500"
        />
        <div
          class="absolute bottom-0 left-0 right-0 bg-green-400/60 text-white text-center py-1 text-sm font-bold"
        >
          {{ $t('home.progressStories.after') }}
        </div>
      </div>
    </div>

    <!-- Progress Metrics -->
    <div class="grid grid-cols-3 gap-2 mb-4 text-center">
      <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('home.progressStories.weightLost') }}</p>
        <p class="font-bold text-primary dark:text-primary">{{ $t(`home.progressStories.stories.${story.weightLost}`) }}</p>
      </div>
      <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('home.progressStories.timeFrame') }}</p>
        <p class="font-bold text-primary dark:text-primary">{{ $t(`home.progressStories.stories.${story.duration}`) }}</p>
      </div>
      <div class="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ $t('home.progressStories.workouts') }}</p>
        <p class="font-bold text-primary dark:text-primary">
          {{ $t(`home.progressStories.stories.${story.workoutsCompleted}`) }}
        </p>
      </div>
    </div>

    <!-- Testimonial Quote -->
    <div class="relative">
      <p class="text-gray-600 dark:text-gray-300 pl-6 pr-4">"{{ $t(`home.progressStories.stories.${story.quote}`) }}"</p>
      <div class="flex justify-end mt-2">
        <div class="flex space-x-1">
          <span v-for="i in 5" :key="i" class="text-yellow-400">★</span>
        </div>
      </div>
    </div>
  </div>
</template>
