import { createRouter, createWebHistory } from 'vue-router'
import { loadLayoutMiddleware } from '@/middleware/layoutMiddleware.ts'
import { landingRoutes } from '@/router/landing.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...landingRoutes,
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
})

router.beforeEach(async (to, from, next) => {
  await loadLayoutMiddleware(to);

  next();
})

export default router
