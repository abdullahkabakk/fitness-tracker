<template>
  <div class="flex flex-col min-h-screen max-w-[100%] w-full bg-background-light dark:bg-gray-900">
    <Navbar />
    <main class="flex w-full flex-col  overflow-x-hidden ">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/common/Navbar.vue';
import Footer from '@/components/common/Footer.vue';
</script>
