import { StudentRouteNames, StudentRoutes } from '@/helpers/routes/student.ts'

export const studentRoutes = [
  {
    path: StudentRoutes.home,
    name: StudentRouteNames.home,
    component: () => import('@/views/student/HomeView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.activityLog,
    name: StudentRouteNames.activityLog,
    component: () => import('@/views/student/ActivityLog.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.program,
    name: StudentRouteNames.program,
    component: () => import('@/views/student/ProgramView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.progress,
    name: StudentRouteNames.progress,
    component: () => import('@/views/student/ProgressView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.trainers,
    name: StudentRouteNames.trainers,
    component: () => import('@/views/student/TrainersView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.chat,
    name: StudentRouteNames.chat,
    component: () => import('@/views/student/ChatView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  },
  {
    path: StudentRoutes.profile,
    name: StudentRouteNames.profile,
    component: () => import('@/views/student/ProfileView.vue'),
    meta: {
      layout: 'StudentLayout',
    },
  }
]
