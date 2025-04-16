import { PtRoutes, PtRoutesNames } from '@/helpers/routes/pt.ts'

export const ptRoutes = [
  {
    path: PtRoutes.home,
    name: PtRoutesNames.home,
    component: () => import('@/views/pt/HomeView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.chat,
    name: PtRoutesNames.chat,
    component: () => import('@/views/pt/ChatView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.profile,
    name: PtRoutesNames.profile,
    component: () => import('@/views/pt/ProfileView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.settings,
    name: PtRoutesNames.settings,
    component: () => import('@/views/pt/SettingsView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.calendar,
    name: PtRoutesNames.calendar,
    component: () => import('@/views/pt/CalendarView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.earnings,
    name: PtRoutesNames.earnings,
    component: () => import('@/views/pt/EarningsView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.plans,
    name: PtRoutesNames.plans,
    component: () => import('@/views/pt/PlansView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.contentHub,
    name: PtRoutesNames.contentHub,
    component: () => import('@/views/pt/ContentHubView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  },
  {
    path: PtRoutes.subscribers,
    name: PtRoutesNames.subscribers,
    component: () => import('@/views/pt/SubscribersView.vue'),
    meta: {
      layout: 'PtLayout',
    },
  }
]
