<script setup lang="ts">
import { onMounted, ref } from 'vue'

const activeCoaches = ref(0)
const indicatorRef = ref<HTMLElement | null>(null)

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
  if (!indicatorRef.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateValue(10000, 2000, (val) => (activeCoaches.value = val))
        observer.disconnect()
      }
    },
    { threshold: 0.5 },
  )

  observer.observe(indicatorRef.value)
})
</script>

<template>
  <!-- Trust indicators -->
  <div ref="indicatorRef" class="mt-12 flex flex-col items-start">
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
      {{ $t('home.hero.trustedBy') }}
    </p>
    <div class="flex items-center space-x-4 mb-2">
      <!-- Avatars -->
      <img
        v-for="(avatar, index) in [1, 2, 3, 4, 5, 6, 7]"
        :key="index"
        :src="`https://randomuser.me/api/portraits/${index % 2 == 0 ? 'men' : 'women'}/${32 + avatar}.jpg`"
        :alt="`Coach ${avatar}`"
        :class="{ '-ml-8': index > 0 }"
        class="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800"
      />
      <span class="ml- text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ Math.floor(activeCoaches) }}+ {{ $t('home.hero.activeCoaches') }}
      </span>
    </div>
  </div>
</template>
