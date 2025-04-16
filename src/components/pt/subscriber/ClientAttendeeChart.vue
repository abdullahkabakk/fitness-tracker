<template>
  <div class="h-full w-full">
    <apexchart
      type="bar"
      height="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDark } from '@vueuse/core'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  }
});

const isDark = useDark();

// Compute days and counts arrays from the data prop
const days = computed(() => props.data.map(item => item.day));
const counts = computed(() => props.data.map(item => item.count));

// Create the series data for the chart
const series = ref([
  {
    name: 'Attendance',
    data: counts.value
  }
]);

// Watch for changes in the data prop and update the series accordingly
watch(() => props.data, (newData) => {
  series.value = [
    {
      name: 'Attendance',
      data: newData.map(item => item.count)
    }
  ];
}, { deep: true });

// Theme-aware colors
const colors = computed(() => {
  return {
    text: isDark.value ? '#94a3b8' : '#64748b', // slate-400/500
    grid: isDark.value ? '#334155' : '#e2e8f0', // slate-700/200
    primary: isDark.value ? '#7FA8D7' : '#4C81BD',
  };
});

// Chart options configuration
const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    height: 250,
    toolbar: {
      show: false
    },
    fontFamily: 'Inter, Helvetica, sans-serif',
    background: 'transparent',
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      columnWidth: '60%',
      distributed: false,
      dataLabels: {
        position: 'top'
      }
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function(val) {
      return val;
    },
    offsetY: -20,
    style: {
      fontSize: '12px',
      fontWeight: '500',
      colors: [colors.value.text]
    }
  },
  colors: [colors.value.primary],
  grid: {
    borderColor: colors.value.grid,
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    },
  },
  xaxis: {
    categories: days.value,
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: colors.value.text,
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    min: 0,
    max: (Math.max(...counts.value) * 1.2) || 10, // Set max about 20% higher than max value
    tickAmount: 4,
    labels: {
      style: {
        colors: [colors.value.text],
        fontSize: '12px'
      },
      formatter: function(val) {
        return val.toFixed(0);
      }
    }
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val + ' clients';
      }
    }
  },
  states: {
    hover: {
      filter: {
        type: 'darken',
        value: 0.1
      }
    }
  },
  legend: {
    show: false
  }
}));
</script>
