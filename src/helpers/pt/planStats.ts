import { i18n } from '@/i18n.ts'

export const planStats = [
  {
    title: i18n.global.t('metrics.revenue'),
    value: 2540,
    icon: 'mdi:currency-usd',
    trend: 'up' as const,
    percentage: 13,
    unit: 'USD',
    isCurrency: true,
  },
  {
    title: i18n.global.t('metrics.subscriptions'),
    value: 68,
    icon: 'mdi:account-group',
    trend: 'up' as const,
    percentage: 6,
    unit: '',
    isCurrency: false,
  },
  {
    title: i18n.global.t('metrics.retention'),
    value: 89,
    icon: 'mdi:chart-line',
    trend: 'down' as const,
    unit: '%',
    percentage: -2,
    isCurrency: false,
  },
]
