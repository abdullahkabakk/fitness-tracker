<script setup lang="ts">
defineProps({
  isYearly: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:isYearly'])
</script>

<template>
  <div class="flex justify-center items-center mb-12">
        <span
          :class="{
            'text-gray-900 dark:text-white font-medium': !isYearly,
            'text-gray-500 dark:text-gray-400': isYearly,
          }"
        >
          {{ $t('common.monthly') }}
        </span>
    <label class="mx-4 relative inline-flex items-center cursor-pointer">
      <input type="checkbox" @change="$emit('update:isYearly', !isYearly)"
             class="sr-only peer" />
      <div
        class="w-14 h-7 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
      ></div>
    </label>
    <span
      :class="{
            'text-gray-900 dark:text-white font-medium': isYearly,
            'text-gray-500 dark:text-gray-400': !isYearly,
          }"
    >
          {{ $t('common.yearly') }}
          <span class="text-sm text-green-500"
          >({{ $t('common.savePercent', { percent: 20 }) }})</span
          >
        </span>
  </div>
</template>
