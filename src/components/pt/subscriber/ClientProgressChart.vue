<template>
  <div>
    <apexchart
      type="radialBar"
      height="300"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div class="grid grid-cols-3 gap-4 mt-4">
      <div v-for="(stat, index) in stats" :key="index" class="text-center">
        <p class="text-sm text-gray-500">{{ stat.label }}</p>
        <p class="font-bold text-lg" :class="stat.color">{{ stat.value }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const series = [78, 65, 89]
const stats = ref([
  { label: 'Weight Loss', value: '78%', color: 'text-purple-600' },
  { label: 'Muscle Gain', value: '65%', color: 'text-blue-500' },
  { label: 'Endurance', value: '89%', color: 'text-green-500' }
])

const chartOptions = ref({
  chart: {
    type: 'radialBar',
    foreColor: '#6B7280',
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    radialBar: {
      dataLabels: {
        name: {
          fontSize: '14px',
        },
        value: {
          fontSize: '20px',
          fontWeight: 'bold',
          formatter: function (val: number) {
            return val + '%'
          }
        },
        total: {
          show: true,
          label: 'Overall Progress',
          formatter: function () {
            return '73%'
          }
        }
      },
      hollow: {
        size: '45%'
      },
      track: {
        background: '#E5E7EB',
        strokeWidth: '100%',
        margin: 15
      }
    }
  },
  colors: ['#8B5CF6', '#3B82F6', '#10B981'],
  labels: ['Weight Loss', 'Muscle Gain', 'Endurance'],
  stroke: {
    lineCap: 'round'
  }
})
</script>
