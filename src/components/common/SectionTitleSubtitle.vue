<script setup lang="ts">
defineProps(['title', 'subtitle'])
</script>

<template>
  <div class="text-center mb-16">
    <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
      {{ title }}
    </h2>
    <p class="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
      {{ subtitle }}
    </p>
  </div>
</template>
