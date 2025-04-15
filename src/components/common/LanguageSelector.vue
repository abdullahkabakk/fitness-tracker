<script setup lang="ts">
import { getLanguageName } from '@/helpers/localesMap.ts'
import { Icon } from '@iconify/vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const showLanguageMenu = ref(false);
const languageMenuRef = ref(null);
const { availableLocales, locale } = useI18n()
const currentLocale = computed(() => locale.value);
const emit = defineEmits(['close'])

// Language handlers
const toggleLanguageMenu = (event: Event) => {
  event.stopPropagation();
  showLanguageMenu.value = !showLanguageMenu.value;
  emit('close');
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
  showLanguageMenu.value = false;
};

</script>

<template>
  <div class="relative" ref="languageMenuRef">
    <button @click.stop="toggleLanguageMenu"
            class="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-700 focus:outline-none">
      <Icon icon="material-symbols-light:language" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Language Menu -->
    <div v-if="showLanguageMenu"
         class="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
      <div class="py-1" role="menu" aria-orientation="vertical">
        <button v-for="lang in availableLocales"
                :key="lang"
                @click="changeLanguage(lang)"
                class="block px-4 py-2 text-sm hover:cursor-pointer text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                :class="{ 'font-semibold': currentLocale === lang }">
          {{ getLanguageName(lang) }}
        </button>
      </div>
    </div>
  </div>
</template>
