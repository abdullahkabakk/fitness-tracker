import type { ProgressStory } from '@/types/ProgressStory.ts'

export const progressStories: ProgressStory[] = [
  {
    name: 'Emily Rodriguez',
    initials: 'ER',
    beforeImg: new URL('@/assets/img/emily-before.png', import.meta.url).href,
    afterImg: new URL('@/assets/img/emily-after.png', import.meta.url).href,
    weightLost: 'emily.weightLost',
    duration: 'emily.duration',
    workoutsCompleted: 'emily.sessions',
    quote: 'emily.quote',
    rating: 5
  },
  {
    name: 'Jake Thompson',
    initials: 'JT',
    beforeImg: new URL('@/assets/img/jake-before.png', import.meta.url).href,
    afterImg: new URL('@/assets/img/jake-after.png', import.meta.url).href,
    weightLost: 'jake.weightLost',
    duration: 'jake.duration',
    workoutsCompleted: 'jake.sessions',
    quote: 'jake.quote',
    rating: 5
  },
];
