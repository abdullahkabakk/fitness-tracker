import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // Check if user prefers dark mode
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initialize dark mode based on localStorage or system preference
  const isDarkMode = ref(localStorage.getItem('darkMode') === 'true' || userPrefersDark);

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    localStorage.setItem('darkMode', isDarkMode.value.toString());
  }

  return { isDarkMode, toggleDarkMode };
});
