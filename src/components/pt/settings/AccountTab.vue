<script setup lang="ts">
import CalendarPicker from '@/components/pt/settings/CalendarPicker.vue'
</script>

<template>
  <!-- Account Settings -->
  <div class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Personal Information -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('pt.settings.personalInfo') }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('pt.settings.fullName') }}
            </label>
            <input
              type="text"
              disabled
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              :placeholder="$t('pt.settings.namePlaceholder')"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('pt.settings.email') }}
            </label>
            <input
              type="email"
              disabled
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              placeholder="alex@fitnesspro.com"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('pt.settings.phone') }}
            </label>
            <input
              type="tel"
              disabled
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              :placeholder="$t('pt.settings.phonePlaceholder')"
            />
          </div>
        </div>
      </div>

      <!-- Professional Information -->
      <div class="space-y-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ $t('pt.settings.professionalInfo') }}
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ $t('pt.settings.certifications') }}
            </label>
            <textarea
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              rows="4"
              disabled
              :placeholder="$t('pt.settings.certificationsPlaceholder')"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Availability Settings -->
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.availability') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('pt.settings.workingHours') }}
          </label>
          <div class="flex gap-2">
            <input
              disabled
              type="time"
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
            <span class="self-center">-</span>
            <input
              disabled
              type="time"
              class="w-full p-4 rounded-lg border-gray-300 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {{ $t('pt.settings.weeklyCalendar') }}
        </label>
        <CalendarPicker />
      </div>
    </div>
  </div>
</template>
