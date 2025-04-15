<template>
  <div class="flex flex-col max-w-[100%] w-full min-h-screen bg-background-light dark:bg-background-dark">
    <component :is="layoutComponent" v-bind="props">
      <RouterView />
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// Dynamically select the layout component from the route's meta
const route = useRoute();
const layoutComponent = computed(() => route.meta.layoutComponent);
const props = computed(() => route.meta.props);
</script>
