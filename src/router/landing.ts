import { LandingRouteNames, LandingRoutes } from '@/helpers/routes/landing.ts'

export const landingRoutes = [
  {
    path: LandingRoutes.home,
    name: LandingRouteNames.home,
    component: () => import('@/views/landing/HomeView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: LandingRoutes.coaches,
    name: LandingRouteNames.coaches,
    component: () => import('@/views/landing/CoachView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  },
  {
    path: LandingRoutes.blog,
    name: LandingRouteNames.blog,
    component: () => import('@/views/landing/BlogView.vue'),
    meta: {
      layout: 'DefaultLayout',
    },
  }
]
