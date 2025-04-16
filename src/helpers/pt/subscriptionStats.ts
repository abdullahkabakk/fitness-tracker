import { i18n } from '@/i18n'

export const subscriptionsStats = [
  {
    title: i18n.global.t('subscriptions.metrics.mrr'),
    value: 3450, // "$3,450"
    icon: 'mdi:chart-line',
    trend: 'up' as const,
    percentage: 8.2, // "+8.2%"
    isCurrency: true,
  },
  {
    title: i18n.global.t('subscriptions.metrics.arr'),
    value: 41400, // "$41,400"
    icon: 'mdi:calendar-blank',
    trend: 'up' as const,
    percentage: 12.7, // "+12.7%"
    isCurrency: true,
  },
  {
    title: i18n.global.t('subscriptions.metrics.ltv'),
    value: 1850, // "$1,850"
    icon: 'mdi:account-heart',
    trend: 'up' as const,
    percentage: 5.5, // "+5.5%"
    isCurrency: true,
  },
]
