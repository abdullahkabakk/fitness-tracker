<template>
  <div class="h-full w-full">
    <apexchart
      type="donut"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useDark } from '@vueuse/core'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
});

const isDark  = useDark();

// Extract values for the series
const series = computed(() => props.data.map(item => item.value));

// Extract labels and colors
const labels = computed(() => props.data.map(item => item.name));
const customColors = computed(() => props.data.map(item => item.color));

// Calculate total clients
const totalClients = computed(() => {
  return props.data.reduce((sum, item) => sum + item.value, 0);
});

// Watch for changes in the data prop and update accordingly
watch(() => props.data, () => {
  // Update will happen automatically through computed properties
}, { deep: true });

// Theme-aware colors
const colors = computed(() => {
  return {
    text: isDark.value ? '#e2e8f0' : '#334155', // slate-200/700
    subtext: isDark.value ? '#94a3b8' : '#64748b', // slate-400/500
  };
});

// Chart options configuration
const chartOptions = computed(() => ({
  chart: {
    type: 'donut',
    fontFamily: 'Inter, Helvetica, sans-serif',
    background: 'transparent',
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
    },
  },
  colors: customColors.value,
  labels: labels.value,
  dataLabels: {
    enabled: false
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 600,
            color: colors.value.text,
            offsetY: -10
          },
          value: {
            show: true,
            fontSize: '24px',
            fontWeight: 700,
            color: colors.value.text,
            offsetY: 5,
            formatter: function (val) {
              return val;
            }
          },
          total: {
            show: true,
            label: 'Total Clients',
            fontSize: '16px',
            fontWeight: 600,
            color: colors.value.text,
            formatter: function () {
              return totalClients.value;
            }
          }
        }
      }
    }
  },
  stroke: {
    width: 2,
    colors: isDark.value ? ['#1e293b'] : ['#ffffff'] // slate-800 or white
  },
  legend: {
    show: true,
    position: 'bottom',
    horizontalAlign: 'center',
    fontSize: '12px',
    fontWeight: 500,
    labels: {
      colors: colors.value.text
    },
    markers: {
      width: 10,
      height: 10,
      offsetX: -2,
      radius: 2
    },
    itemMargin: {
      horizontal: 8,
      vertical: 4
    },
    formatter: function(seriesName, opts) {
      return [seriesName, ' (', opts.w.globals.series[opts.seriesIndex], ')'].join('');
    }
  },
  tooltip: {
    enabled: true,
    y: {
      title: {
        formatter: (seriesName) => seriesName
      },
      formatter: (value) => {
        return `${value} clients (${((value / totalClients.value) * 100).toFixed(1)}%)`;
      }
    }
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          height: 280
        },
        legend: {
          position: 'bottom',
          fontSize: '10px'
        }
      }
    }
  ]
}));
</script>
