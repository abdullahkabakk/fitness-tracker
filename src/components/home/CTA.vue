<script setup lang="ts">
import Button from '@/components/common/Button.vue'
import { StudentRoutes } from '@/helpers/routes/student.ts'
</script>

<template>
  <section
    class="py-16 bg-gradient-to-t from-white lg:pb-20 to-primary-50 dark:from-gray-900 dark:to-gray-800 px-4 py-6 lg:px-8 lg:py-10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl font-bold dark:text-white mb-6">
        {{ $t('home.cta.title') }}
      </h2>
      <p class="text-xl mb-8 max-w-3xl mx-auto dark:text-white">
        {{ $t('home.cta.subtitle') }}
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <RouterLink :to="StudentRoutes.home"><Button variant="primary" size="lg">{{ $t('home.cta.startButton') }}</Button></RouterLink>
        <Button variant="outline" size="lg">{{ $t("home.cta.learnMore")}}</Button>
      </div>
    </div>
  </section>
</template>
