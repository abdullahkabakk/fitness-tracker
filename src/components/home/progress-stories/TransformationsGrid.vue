<script setup lang="ts">
import { progressStories } from '@/helpers/progressStories.ts'
import TransformationCard from '@/components/home/progress-stories/TransformationCard.vue'
import { Icon } from '@iconify/vue'
</script>

<template>
  <div
    v-for="(story, index) in progressStories"
    :key="index"
    class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
  >
    <TransformationCard :story="story"/>

    <!-- Call to Action -->
    <div
      class="bg-primary-50 dark:bg-primary-light/10 p-4 text-center border-t border-gray-200 dark:border-gray-700"
    >
      <button class="text-sm font-medium text-primary dark:text-primary hover:underline">
        {{$t('home.progressStories.seeFullStory', {
          name: story.name.split(' ')[0]
        })}}
        <Icon
          icon="material-symbols:arrow-right-alt"
          class="inline-block ml-1 text-primary dark:text-primary"
          />
      </button>
    </div>
  </div>
</template>
