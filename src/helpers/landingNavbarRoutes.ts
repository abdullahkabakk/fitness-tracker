import { LandingRoutes } from '@/helpers/routes/landing.ts'

export const landingNavbarRoutes = [
  {
    path: LandingRoutes.home,
    name: "nav.users",
  },
  {
    path: LandingRoutes.coaches,
    name: "nav.coaches",
  },
  {
    path: LandingRoutes.blog,
    name: "nav.blog",
  },
]
