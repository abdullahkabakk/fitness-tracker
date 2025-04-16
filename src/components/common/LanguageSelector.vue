<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const showLanguageMenu = ref(false);
const languageMenuRef = ref(null);
const { locale } = useI18n()
const emit = defineEmits(['close'])

const languages = ref([
  { code: 'en', name: 'English', icon: 'emojione:flag-for-united-states' },
  { code: 'es', name: 'Español', icon: 'emojione:flag-for-spain' },
  { code: 'fr', name: 'Français', icon: 'emojione:flag-for-france' },
  { code: 'de', name: 'Deutsch', icon: 'emojione:flag-for-germany' },
  { code: 'it', name: 'Italiano', icon: 'emojione:flag-for-italy' },
  { code: 'pt', name: 'Português', icon: 'emojione:flag-for-portugal' },
  { code: 'tr', name: 'Türkçe', icon: 'emojione:flag-for-turkey' },
])

// Language handlers
const toggleLanguageMenu = (event: Event) => {
  event.stopPropagation();
  showLanguageMenu.value = !showLanguageMenu.value;
  if (showLanguageMenu.value) {
    emit('close');
  }
};

const changeLanguage = () => {
  // locale.value = lang;
  // localStorage.setItem('locale', lang);
  showLanguageMenu.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (languageMenuRef.value && !languageMenuRef.value.contains(event.target)) {
    showLanguageMenu.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const getLanguageIcon = (lang: string) => {
  const language = languages.value.find(l => l.code === lang);
  return language ? language.icon : 'emojione:flag-for-united-states';
};
</script>

<template>
  <div class="relative" ref="languageMenuRef">
    <button @click.stop="toggleLanguageMenu"
            class="p-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer dark:hover:bg-gray-700 focus:outline-none">
      <Icon :icon="getLanguageIcon(locale)"
            class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" />
    </button>

    <!-- Language Menu -->
    <div v-if="showLanguageMenu"
         class="absolute right-0 sm:right-auto sm:left-auto mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl py-2 transform -translate-x-1/2 sm:translate-x-0 left-1/2 sm:right-0">
      <button
        v-for="lang in languages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="locale === lang.code ? 'bg-gray-100 dark:bg-gray-700' : ''"
        class="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
      >
        <Icon :icon="lang.icon" />
        {{ lang.name }}
      </button>
    </div>
  </div>
</template>
