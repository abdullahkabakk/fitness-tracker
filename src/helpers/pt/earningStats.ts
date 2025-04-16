import { i18n } from '@/i18n'

export const earningsStats = [
  {
    title: i18n.global.t('earnings.metrics.totalRevenue'),
    value: 4820, // numeric value, original "$4,820"
    icon: 'mdi:currency-usd',
    trend: 'up' as const,
    percentage: 12.5, // corresponds to change "+12.5%"
    isCurrency: true,
  },
  {
    title: i18n.global.t('earnings.metrics.pendingBalance'),
    value: 1250, // numeric value, original "$1,250"
    icon: 'mdi:clock-outline',
    trend: 'neutral' as const,
    percentage: 5.2, // corresponds to change "+5.2%"
    isCurrency: true,
  },
  {
    title: i18n.global.t('earnings.metrics.avgSessionValue'),
    value: 85, // numeric value, original "$85"
    icon: 'mdi:account-cash',
    trend: 'down' as const,
    percentage: -2.1, // corresponds to change "-2.1%"
    isCurrency: true,
  },
  {
    title: i18n.global.t('earnings.metrics.activeClients'),
    value: 24, // numeric value, original "24"
    icon: 'mdi:account-group',
    trend: 'up' as const,
    percentage: 3, // corresponds to change "+3"
    isCurrency: false,
  },
]
