import en from '@/locales/en.json'

import { createI18n } from 'vue-i18n'

const i18nConfig = {
  legacy: false,
  globalInjection: true,
  locale: 'en',
  defaultLocale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
  }
}

export const i18n = createI18n(i18nConfig)
