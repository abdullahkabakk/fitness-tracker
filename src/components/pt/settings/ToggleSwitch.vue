<template>
  <button
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
      modelValue ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
    ]"
    @click="$emit('update:modelValue', !modelValue)"
  >
    <span
      :class="[
        'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
        modelValue ? 'translate-x-6' : 'translate-x-1'
      ]"
    />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>
