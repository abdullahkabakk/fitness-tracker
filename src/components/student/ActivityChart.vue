<template>
  <div class="activity-chart">
    <apexchart
      type="area"
      height="300"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const series = computed(() => [{
  name: 'Active Minutes',
  data: props.data.datasets[0].data
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false },
    foreColor: '#6B7280'
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  xaxis: {
    categories: props.data.labels,
    labels: { style: { colors: '#6B7280' } }
  },
  yaxis: { labels: { style: { colors: '#6B7280' } } },
  grid: { borderColor: '#F3F4F6' },
  theme: { mode: 'light' },
  colors: ['#3B82F6']
}))
</script>
