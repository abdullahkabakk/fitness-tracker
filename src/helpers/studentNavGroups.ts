import { StudentRoutes } from '@/helpers/routes/student.ts'

export const studentNavigationGroups = [
  {
    id: 'fitnessTracking',
    links: [
      {
        id: 'dashboard',
        icon: 'mdi:heart-pulse',
        to: StudentRoutes.home
      },
      {
        id: 'activityLog',
        icon: 'mdi:run-fast',
        to: StudentRoutes.activityLog
      }
    ]
  },
  {
    id: 'trainers',
    links: [
      {
        id: 'trainers',
        icon: 'mdi:account-supervisor',
        to: StudentRoutes.trainers
      },
      {
        id: 'chat',
        icon: 'mdi:chat',
        to: StudentRoutes.chat
      }
    ]
  },
  {
    id: 'progress',
    links: [
      {
        id: 'progress',
        icon: 'mdi:chart-areaspline',
        to: StudentRoutes.progress
      },
      {
        id: 'program',
        icon: 'mdi:clipboard-text',
        to: StudentRoutes.program
      },
    ]
  },
  {
    id: 'profile',
    links: [
      {
        id: 'profile',
        icon: 'mdi:account',
        to: StudentRoutes.profile
      },
    ]
  }
]
