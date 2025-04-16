<template>
  <Card>
    <div ref="container" class="flex select-none justify-between items-start">
      <div>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-1">{{ title }}</p>
        <h3 class="text-2xl font-bold">
          {{ formattedValue }}
        </h3>
        <div class="flex items-center mt-2">
          <div :class="`flex items-center ${getTrendClass}`">
            <Icon :icon="getTrendIcon" class="mr-1" />
            <span>{{ percentage }}%</span>
          </div>
          <span class="text-gray-500 dark:text-gray-400 text-xs ml-2">{{ $t('pt.home.lastMonth') }}</span>
        </div>
      </div>
      <div :class="`p-3 rounded-full ${getIconBgClass}`">
        <Icon :icon="icon" class="text-2xl" :class="getIconColorClass" />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Card from '@/components/common/Card.vue'

interface Props {
  title: string
  value: number
  icon: string
  trend: 'up' | 'down'
  percentage: number
  unit?: string
  isCurrency?: boolean
  suffix?: string
}

const props = defineProps<Props>()
const initialValue = ref(0)
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
        animateValue(props.value, 2000, (val) => (initialValue.value = val))
        observer.disconnect()
      }
    },
    { threshold: 0.5 },
  )

  observer.observe(container.value)
})

const formattedValue = computed(() => {
  if (props.isCurrency) {
    return (
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(initialValue.value) + (props.suffix || '')
    )
  }

  return `${initialValue.value}${props.suffix || ''}${props.unit || ''}`
})

const getTrendClass = computed(() => {
  return props.trend === 'up'
    ? 'text-green-500 dark:text-green-400'
    : 'text-red-500 dark:text-red-400'
})

const getTrendIcon = computed(() => {
  return props.trend === 'up' ? 'mdi:trending-up' : 'mdi:trending-down'
})

const getIconBgClass = computed(() => {
  switch (true) {
    case props.icon.includes('account'):
      return 'bg-blue-100 dark:bg-blue-900/30'
    case props.icon.includes('calendar'):
      return 'bg-purple-100 dark:bg-purple-900/30'
    case props.icon.includes('currency'):
      return 'bg-green-100 dark:bg-green-900/30'
    default:
      return 'bg-yellow-100 dark:bg-yellow-900/30'
  }
})

const getIconColorClass = computed(() => {
  switch (true) {
    case props.icon.includes('account'):
      return 'text-blue-600 dark:text-blue-400'
    case props.icon.includes('calendar'):
      return 'text-purple-600 dark:text-purple-400'
    case props.icon.includes('currency'):
      return 'text-green-600 dark:text-green-400'
    default:
      return 'text-yellow-600 dark:text-yellow-400'
  }
})
</script>
