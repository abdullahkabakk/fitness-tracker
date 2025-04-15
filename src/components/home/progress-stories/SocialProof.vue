<script setup lang="ts">
import { onMounted, ref } from 'vue'

const transformations = ref(0)
const satisfaction = ref(0)
const rating = ref(0)
const socialProofRef = ref<HTMLElement | null>(null)

const animateValue = (target: number, duration: number, callback: (value: number) => void) => {
  const start = 0
  const startTime = performance.now()

  const update = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    callback(start + (target - start) * progress)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      callback(target) // Ensure exact final value
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  if (!socialProofRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateValue(10000, 2000, (val) => (transformations.value = val))
        animateValue(98, 1500, (val) => (satisfaction.value = val))
        animateValue(4.9, 1000, (val) => (rating.value = val))
        observer.disconnect()
      }
    },
    { threshold: 0.5 },
  )

  observer.observe(socialProofRef.value)
})
</script>

<template>
  <div ref="socialProofRef" class="mt-16 text-center">
    <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
      {{$t('home.progressStories.trustedByMany') }}
    </p>
    <div class="flex flex-wrap justify-center gap-8 items-center">
      <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
        {{ Math.floor(transformations) }}+
      </div>
      <div class="text-gray-500 dark:text-gray-400">{{$t('home.progressStories.transformation') }}</div>

      <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
        {{ Math.floor(satisfaction) }}%
      </div>
      <div class="text-gray-500 dark:text-gray-400">{{$t('home.progressStories.satisfactionRate') }}</div>

      <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
        {{ rating.toFixed(1) }}/5
      </div>
      <div class="text-gray-500 dark:text-gray-400">{{$t('home.progressStories.averageRating') }}</div>
    </div>
  </div>
</template>
