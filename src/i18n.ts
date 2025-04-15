import en from '@/locales/en.json'
import tr from '@/locales/tr.json'

import { createI18n } from 'vue-i18n'

const i18nConfig = {
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('locale') || 'en',
  defaultLocale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    tr: tr
  }
}

export const i18n = createI18n(i18nConfig)
