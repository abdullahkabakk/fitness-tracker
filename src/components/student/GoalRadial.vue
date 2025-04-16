<template>
  <div class="relative">
    <apexchart
      type="radialBar"
      height="200"
      :options="chartOptions"
      :series="[percentage]"
    />
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-2xl font-bold" :class="textColor">{{ current }}{{ unit }}</span>
      <span class="text-sm text-gray-500 dark:text-gray-400">of {{ goal }}{{ unit }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDark } from '@vueuse/core'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  current: {
    type: Number,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#3B82F6' // Default to blue-500
  }
})

const isDark = useDark()

const percentage = computed(() =>
  Math.round((props.current / props.goal) * 100)
)

const textColor = computed(() =>
  isDark.value ? 'text-gray-100' : 'text-gray-800'
)

const chartOptions = computed(() => ({
  chart: {
    type: 'radialBar',
    sparkline: {
      enabled: false
    }
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '60%',
        margin: 0,
        background: isDark.value ? '#1F2937' : '#F3F4F6'
      },
      track: {
        background: isDark.value ? '#374151' : '#E5E7EB',
        margin: 8
      },
      dataLabels: {
        name: {
          show: false
        },
        value: {
          show: false
        },
        total: {
          show: false
        }
      }
    }
  },
  stroke: {
    lineCap: 'round'
  },
  colors: [props.color],
  labels: [props.title]
}))
</script>
