import { LandingRouteNames, LandingRoutes } from '@/helpers/routes/landing.ts'

export const landingRoutes = [
  {
    path: LandingRoutes.home,
    name: LandingRouteNames.home,
    component: () => import('@/views/HomeView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: LandingRoutes.coaches,
    name: LandingRouteNames.coaches,
    component: () => import('@/views/CoachView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  }
]
