<template>
  <nav
    class="w-full z-10 transition-all duration-300 fixed top-0 left-0 right-0 border-b border-gray-200 dark:border-gray-700"
    :class="{
    'bg-white dark:bg-gray-900 shadow-md ': scrolled || menuOpen,
    'bg-transparent top-0': !scrolled && !menuOpen
  }"
  >
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 flex items-center justify-center text-primary dark:text-white">
            <Icon icon="fluent:dumbbell-28-regular" class="w-full h-full" />
          </div>
          <span class="text-xl sm:text-2xl font-bold text-primary dark:text-white">FitJourney</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-8">
          <router-link v-for="item in landingNavbarRoutes"
                       :key="item.name"
                       :to="item.path"
                       class="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
            {{ $t(item.name) }}
          </router-link>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-2 sm:space-x-4">
          <!-- Language Selector -->
          <LanguageSelector @close="closeMenu" />


          <!-- Dark/Light Mode Toggle -->
          <button @click="toggleDark()"
                  class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Icon v-if="isDark" icon="material-symbols:light-mode" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
            <Icon v-else icon="material-symbols:dark-mode" class="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>

          <!-- Login Button -->
          <div class="relative hidden sm:block" ref="loginRef">
            <button @click="toggleLoginDropdown"
                    class="px-4 py-2 text-sm border dark:text-white border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors">
              <span>{{ $t('nav.login') }}</span>
              <Icon icon="material-symbols:keyboard-arrow-down" class="w-5 h-5 inline-block ml-1 transition-transform"
                    :class="{'rotate-180': showLoginDropdown}" />
            </button>

            <!-- Login Dropdown Menu -->
            <div v-if="showLoginDropdown"
                 class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-300 dark:border-gray-700 z-20 animate-fadeIn">
              <div class="py-1">
                <router-link to="/coach-login"
                             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                             @click="closeDropdowns">
                  {{ $t('nav.coachLogin') }}
                </router-link>
                <router-link to="/student-login"
                             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                             @click="closeDropdowns">
                  {{ $t('nav.studentLogin') }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- Register Button -->
          <div class="relative hidden sm:block" ref="registerRef">
            <button @click="toggleRegisterDropdown"
                    class="px-4 py-2 text-sm bg-primary hover:bg-primary-dark text-white rounded-md focus:outline-none transition-colors">
              <span>{{ $t('nav.register') }}</span>
              <Icon icon="material-symbols:keyboard-arrow-down" class="w-5 h-5 inline-block ml-1 transition-transform"
                    :class="{'rotate-180': showRegisterDropdown}" />
            </button>

            <!-- Register Dropdown Menu -->
            <div v-if="showRegisterDropdown"
                 class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-300 dark:border-gray-700 z-20 animate-fadeIn">
              <div class="py-1">
                <router-link to="/coach-register"
                             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                             @click="closeDropdowns">
                  {{ $t('nav.coachRegister') }}
                </router-link>
                <router-link to="/student-register"
                             class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                             @click="closeDropdowns">
                  {{ $t('nav.studentRegister') }}
                </router-link>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu" class="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
            <Icon v-if="menuOpen" icon="material-symbols:close" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
            <Icon v-else icon="material-symbols:menu" class="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="lg:hidden mt-4 animate-fadeIn">
        <div class="flex flex-col space-y-2 pb-3">
          <router-link v-for="item in landingNavbarRoutes"
                       :key="item.name"
                       :to="item.path"
                       class="px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                       @click="closeMenu">
            {{ $t(item.name) }}
          </router-link>
        </div>

        <!-- Mobile Login/Register Options -->
        <div class="pt-3 mt-2 border-t border-gray-200 dark:border-gray-700">
          <!-- Mobile Login Section -->
          <div class="py-2">
            <button @click="toggleMobileLoginDropdown"
                    class="flex justify-between items-center w-full px-2 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <span class="font-medium">{{ $t('nav.login') }}</span>
              <Icon icon="material-symbols:keyboard-arrow-down"
                    class="w-5 h-5 transition-transform"
                    :class="{'rotate-180': showMobileLoginDropdown}" />
            </button>

            <!-- Mobile Login Dropdown -->
            <div v-if="showMobileLoginDropdown" class="mt-1 pl-4 animate-fadeIn">
              <router-link to="/coach-login"
                           class="block px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                           @click="closeMenu">
                {{ $t('nav.coachLogin') }}
              </router-link>
              <router-link to="/student-login"
                           class="block px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                           @click="closeMenu">
                {{ $t('nav.studentLogin') }}
              </router-link>
            </div>
          </div>

          <!-- Mobile Register Section -->
          <div class="py-2">
            <button @click="toggleMobileRegisterDropdown"
                    class="flex justify-between items-center w-full px-2 py-2 text-left text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
              <span class="font-medium">{{ $t('nav.register') }}</span>
              <Icon icon="material-symbols:keyboard-arrow-down"
                    class="w-5 h-5 transition-transform"
                    :class="{'rotate-180': showMobileRegisterDropdown}" />
            </button>

            <!-- Mobile Register Dropdown -->
            <div v-if="showMobileRegisterDropdown" class="mt-1 pl-4 animate-fadeIn">
              <router-link to="/coach-register"
                           class="block px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                           @click="closeMenu">
                {{ $t('nav.coachRegister') }}
              </router-link>
              <router-link to="/student-register"
                           class="block px-2 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                           @click="closeMenu">
                {{ $t('nav.studentRegister') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import { useDark, useToggle, onClickOutside } from '@vueuse/core';
import { landingNavbarRoutes } from '@/helpers/landingNavbarRoutes.ts'
import LanguageSelector from '@/components/common/LanguageSelector.vue'

const { locale } = useI18n()
// Close all dropdowns
const closeDropdowns = () => {
  showLoginDropdown.value = false;
  showRegisterDropdown.value = false;
  showMobileLoginDropdown.value = false;
  showMobileRegisterDropdown.value = false;
};
// Dark mode toggle
const isDark = useDark();
const toggleDark = useToggle(isDark);

// Navigation state
const scrolled = ref(false);
const menuOpen = ref(false);

// Language menu state
const showLanguageMenu = ref(false);
const languageMenuRef = ref(null);

// Auth dropdowns state
const showLoginDropdown = ref(false);
const showRegisterDropdown = ref(false);
const loginDropdownRef = ref(null);
const registerDropdownRef = ref(null);

// Mobile auth dropdowns state
const showMobileLoginDropdown = ref(false);
const showMobileRegisterDropdown = ref(false);

// Navigation handlers
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  // Close other dropdowns when opening menu
  showLoginDropdown.value = false;
  showRegisterDropdown.value = false;
  showMobileLoginDropdown.value = false;
  showMobileRegisterDropdown.value = false;
};

const closeMenu = () => {
  menuOpen.value = false;
  showMobileLoginDropdown.value = false;
  showMobileRegisterDropdown.value = false;
};

// Auth dropdown handlers
const toggleLoginDropdown = (event: Event) => {
  event.stopPropagation();
  showLoginDropdown.value = !showLoginDropdown.value;
  // Close other dropdowns
  showRegisterDropdown.value = false;
  showLanguageMenu.value = false;
};

const toggleRegisterDropdown = (event: Event) => {
  event.stopPropagation();
  showRegisterDropdown.value = !showRegisterDropdown.value;
  // Close other dropdowns
  showLoginDropdown.value = false;
  showLanguageMenu.value = false;
};

// Mobile auth dropdown handlers
const toggleMobileLoginDropdown = () => {
  showMobileLoginDropdown.value = !showMobileLoginDropdown.value;
  // Close other mobile dropdown
  showMobileRegisterDropdown.value = false;
};

const toggleMobileRegisterDropdown = () => {
  showMobileRegisterDropdown.value = !showMobileRegisterDropdown.value;
  // Close other mobile dropdown
  showMobileLoginDropdown.value = false;
};

// Event listeners
const handleScroll = () => {
  // If user scrolls down more than 10px, set scrolled to true
  // if user scrolls back to top, set scrolled to false
  // This is used to change the navbar background color
  // and shadow effect
  // when the user scrolls down

  // and remove it when the user scrolls back to top
  // This is used to change the navbar background color
  // and shadow effect

  scrolled.value = window.scrollY > 10;
  // If the menu is open, keep the scrolled state
  if (menuOpen.value) {
    scrolled.value = true;
  }
  // If the user scrolls back to top and the menu is open, set scrolled to false
  if (window.scrollY === 0 && menuOpen.value) {
    scrolled.value = false;
  }
};

const handleClickOutside = () => {
  // Close all dropdowns when clicking outside
  showLanguageMenu.value = false;
  showLoginDropdown.value = false;
  showRegisterDropdown.value = false;
};

// Click outside handlers
onClickOutside(languageMenuRef, () => {
  showLanguageMenu.value = false;
});

onClickOutside(loginDropdownRef, () => {
  showLoginDropdown.value = false;
});

onClickOutside(registerDropdownRef, () => {
  showRegisterDropdown.value = false;
});

// Close dropdowns on escape key
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    showLanguageMenu.value = false;
    showLoginDropdown.value = false;
    showRegisterDropdown.value = false;
    showMobileLoginDropdown.value = false;
    showMobileRegisterDropdown.value = false;
    if (menuOpen.value) closeMenu();
  }
};

// Load saved language preference
onMounted(() => {
  // Set language from localStorage if available
  const savedLocale = localStorage.getItem('locale');
  if (savedLocale) {
    locale.value = savedLocale;
  }

  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscKey);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscKey);
});
</script>
