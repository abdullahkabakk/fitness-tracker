<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDark } from '@vueuse/core'
import Card from '@/components/common/Card.vue'
import { Icon } from '@iconify/vue'

const { t } = useI18n()

const isMobile = computed(() => window.innerWidth < 640)
const isTablet = computed(() => window.innerWidth >= 640 && window.innerWidth < 1024)
const isDark = useDark()

const clientActivitySeries = computed(() => [
  {
    name: t('pt.home.activityChart.checkIns'),
    data: [30, 40, 35, 50, 49, 60, 70],
  },
  {
    name: t('pt.home.activityChart.workouts'),
    data: [20, 35, 30, 45, 39, 52, 60],
  },
])

const chartColors = computed(() => ({
  primary: isDark.value ? '#7FA8D7' : '#4C81BD',
  secondary: isDark.value ? '#C1D4F5' : '#A3BFFA',
  text: isDark.value ? '#E5E7EB' : '#374151',
  grid: isDark.value ? 'rgba(55, 65, 81, 0.1)' : 'rgba(209, 213, 219, 0.2)'
}))

const clientActivityOptions = computed(() => ({
  chart: {
    type: 'area',
    toolbar: {
      show: false,
      tools: { download: false }
    },
    zoom: { enabled: false },
    animations: {
      enabled: !isMobile.value,
      easing: 'easeout',
      speed: 800,
    },
    background: 'transparent',
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 2,
    lineCap: 'round',
  },
  colors: [chartColors.value.primary, chartColors.value.secondary],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.3,
      opacityFrom: isDark.value ? 0.5 : 0.7,
      opacityTo: isDark.value ? 0.2 : 0.3,
      stops: [0, 90, 100],
    },
  },
  grid: {
    borderColor: chartColors.value.grid,
    strokeDashArray: 4,
    xaxis: { lines: { show: false } },
    yaxis: { lines: { show: true } },
    padding: {
      top: 10,
      right: isMobile.value ? 5 : 20,
      bottom: 0,
      left: isMobile.value ? 5 : 20
    }
  },
  xaxis: {
    categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day =>
      isMobile.value ? t(`pt.daysShort.${day.toLowerCase()}`) : t(`pt.days.${day.toLowerCase()}`)
    ),
    labels: {
      style: {
        colors: chartColors.value.text,
        fontSize: isMobile.value ? '10px' : '12px',
      },
      hideOverlappingLabels: true,
      trim: true,
    },
    axisTicks: { show: false },
    axisBorder: { show: false },
    tooltip: { enabled: false }
  },
  yaxis: {
    labels: {
      style: {
        colors: chartColors.value.text,
        fontSize: isMobile.value ? '10px' : '12px',
      },
      formatter: (val: number) => `${val}${isMobile.value ? '' : t('pt.units.sessions')}`,
    },
    min: 0,
    max: 80,
    tickAmount: isMobile.value ? 3 : 4,
    forceNiceScale: true,
  },
  tooltip: {
    theme: isDark.value ? 'dark' : 'light',
    x: { show: false },
    style: {
      fontSize: isMobile.value ? '12px' : '14px',
      fontFamily: 'inherit',
    },
  },
  legend: {
    position: isMobile.value ? 'bottom' : 'top',
    horizontalAlign: 'left',
    offsetY: isMobile.value ? 0 : -10,
    fontSize: isMobile.value ? '12px' : '14px',
    markers: {
      radius: 4,
      width: isMobile.value ? 12 : 16,
      height: isMobile.value ? 12 : 16,
    },
    labels: { colors: chartColors.value.text },
    itemMargin: {
      horizontal: isMobile.value ? 8 : 16,
      vertical: isMobile.value ? 4 : 8
    },
  },
  responsive: [
    {
      breakpoint: 640,
      options: {
        chart: { height: 200 },
        yaxis: { tickAmount: 3 },
        grid: { padding: { left: 5, right: 5 } },
        legend: { fontSize: '12px', markers: { radius: 3 } }
      }
    },
    {
      breakpoint: 1024,
      options: {
        chart: { height: 280 },
        legend: { position: 'top' }
      }
    }
  ]
}))

watch(() => isDark.value, (newVal) => {
  clientActivityOptions.value.colors = [
    newVal ? '#7FA8D7' : '#4C81BD',
    newVal ? '#C1D4F5' : '#A3BFFA'
  ]
})
</script>

<template>
  <Card>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-3">
      <div class="space-y-0.5">
        <h2 class="font-bold text-lg flex items-center gap-2">
          <Icon icon="material-symbols:bar-chart-4-bars" class="text-primary-600 dark:text-primary-400" />
          {{ t('pt.home.clientActivity') }}
        </h2>
        <p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {{ t('pt.home.avgCheckins', { count: 45 }) }}
        </p>
      </div>
      <div class="flex gap-1 bg-gray-50 dark:bg-gray-700/50 p-0.5 sm:p-1 rounded-md">
        <button
          v-for="val in ['week', 'month', 'year']"
          :key="val"
          class="px-2.5 sm:px-3 cursor-pointer py-1 text-xs sm:text-sm rounded-md transition-colors whitespace-nowrap"
          :class="{
            'bg-white dark:bg-gray-600 shadow-sm text-primary-600 dark:text-primary-400': val === 'week',
            'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600/50': val !== 'week'
          }"
        >
          {{ t(`pt.time.${val}`) }}
        </button>
      </div>
    </div>

    <apexchart
      type="area"
      :height="isMobile ? 200 : isTablet ? 280 : 320"
      :options="clientActivityOptions"
      :series="clientActivitySeries"
      class="w-full [&_.apexcharts-canvas]:!w-full [&_.apexcharts-grid]:dark:!opacity-20"
    />
  </Card>
</template>
