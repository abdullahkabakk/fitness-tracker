<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  target: number
  duration?: number
  suffix?: string
  label: string
  isCurrency?: boolean
}>()

const value = ref(0)
const container = ref<HTMLElement | null>(null)

const animateValue = (target: number, duration: number, callback: (val: number) => void) => {
  const startTime = performance.now()

  const update = (timestamp: number) => {
    const progress = Math.min((timestamp - startTime) / duration, 1)
    callback(Math.floor(progress * target))

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      callback(target)
    }
  }

  requestAnimationFrame(update)
}

onMounted(() => {
  if (!container.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateValue(props.target, props.duration || 2000, (val) => (value.value = val))
        observer.disconnect()
      }
    },
    { threshold: 0.5 }
  )

  observer.observe(container.value)
})
</script>

<template>
  <div ref="container" class="text-center">
    <div class="text-3xl font-bold text-gray-900 dark:text-white">
      {{ isCurrency ? `$${value}${suffix}` : `${value}${suffix}` }}
    </div>
    <div class="text-sm text-gray-500 dark:text-gray-400">{{ label }}</div>
  </div>
</template>
