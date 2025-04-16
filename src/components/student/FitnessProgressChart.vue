<template>
  <div class="h-64 w-full">
    <apexchart
      type="line"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  period: 'week' | 'month' | 'year'
}>()

// Mock data - replace with your actual data source
const weightData = [72, 71, 70, 69, 68, 67, 68]
const bodyFatData = [22, 21.5, 21, 20.5, 20, 19.8, 19.5]
const muscleMassData = [38, 38.5, 39, 39.5, 40, 40.2, 40.5]

const generateCategories = (period: string) => {
  const now = new Date()
  switch (period) {
    case 'week':
      return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(now)
        d.setDate(d.getDate() - 6 + i)
        return d.toLocaleDateString('en-US', { weekday: 'short' })
      })
    case 'month':
      return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`)
    case 'year':
      return Array.from({ length: 12 }, (_, i) =>
        new Date(2024, i).toLocaleString('default', { month: 'short' })
      )
    default:
      return []
  }
}

const chartOptions = computed(() => ({
  chart: {
    type: 'line',
    height: '100%',
    background: 'transparent',
    toolbar: {
      show: true,
      tools: {
        download: true,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: true
      }
    },
    zoom: {
      enabled: false
    }
  },
  theme: {
    mode: 'dark' // Will be overridden by the custom colors below
  },
  colors: ['#6366f1', '#10b981', '#f59e0b'], // Tailwind colors: indigo-500, emerald-500, amber-500
  stroke: {
    width: 3,
    curve: 'smooth'
  },
  markers: {
    size: 5,
    strokeWidth: 0,
    hover: {
      size: 7
    }
  },
  xaxis: {
    categories: generateCategories(props.period),
    labels: {
      style: {
        colors: '#6b7280' // Tailwind gray-500
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6b7280' // Tailwind gray-500
      },
      formatter: (value: number) => `${value}%`
    }
  },
  grid: {
    borderColor: '#e5e7eb', // Tailwind gray-200
    strokeDashArray: 5
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    labels: {
      colors: '#1f2937' // Tailwind gray-800
    },
    markers: {
      radius: 12
    }
  },
  tooltip: {
    enabled: true,
    style: {
      fontSize: '14px'
    },
    x: {
      show: true,
      formatter: (value: string) => `${value}`
    }
  },
  responsive: [{
    breakpoint: 640,
    options: {
      chart: {
        toolbar: {
          show: false
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  // Dark mode configuration
  dark: {
    chart: {
      background: 'transparent'
    },
    xaxis: {
      labels: {
        style: {
          colors: '#9ca3af' // Tailwind gray-400
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#9ca3af' // Tailwind gray-400
        }
      }
    },
    grid: {
      borderColor: '#374151' // Tailwind gray-700
    },
    legend: {
      labels: {
        colors: '#f3f4f6' // Tailwind gray-100
      }
    }
  }
}))

const series = computed(() => [
  {
    name: 'Weight (kg)',
    data: weightData
  },
  {
    name: 'Body Fat %',
    data: bodyFatData
  },
  {
    name: 'Muscle Mass %',
    data: muscleMassData
  }
])
</script>
