import { PtRoutes } from '@/helpers/routes/pt.ts'

export const navigationGroups = [
  {
    id: 'dashboard',
    links: [
      { id: 'overview', icon: 'mdi:home-outline', to: PtRoutes.home },
      { id: 'students', icon: 'mdi:account-group-outline', to: PtRoutes.subscribers },
      { id: 'plans', icon: 'mdi:clipboard-list-outline', to: PtRoutes.plans }
    ]
  },
  {
    id: 'communication',
    links: [
      { id: 'chat', icon: 'mdi:chat-outline', to: PtRoutes.chat },
      { id: 'calendar', icon: 'mdi:calendar-outline', to: PtRoutes.calendar },
    ]
  },
  {
    id: 'earnings',
    links: [
      { id: 'earnings', icon: 'mdi:currency-usd', to: PtRoutes.earnings },
      { id: 'contentHub', icon: 'mdi:book-open-outline', to: PtRoutes.contentHub },
    ]
  },
  {
    id: 'account',
    links: [
      { id: 'profile', icon: 'mdi:account-outline', to: PtRoutes.profile },
      { id: 'settings', icon: 'mdi:cog-outline', to: PtRoutes.settings }
    ]
  }
]
