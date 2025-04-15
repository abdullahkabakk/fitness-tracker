const localesMap: Record<string, string> = {
  en: 'English',
  tr: 'Türkçe',
}

export function getLanguageName(lang: string): string {
  return localesMap[lang] || lang
}
