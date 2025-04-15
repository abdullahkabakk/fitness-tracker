<template>
  <section
    class="py-20 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {{ $t('coaches.testimonials.title') }}
        </h2>
        <p class="max-w-3xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          {{ $t('coaches.testimonials.subtitle') }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(coach, index) in coaches"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md"
        >
          <div class="flex items-center mb-4">
            <!-- Random person image -->
            <img
              :src="`https://randomuser.me/api/portraits/${index%2 == 0 ? 'men': 'women'}/${index+10}.jpg`"
              :alt="coach.name"
              class="w-16 h-16 rounded-full object-cover mr-4"
            />
            <!--            <img :src="`/api/placeholder/80/80`" :alt="coach.name" class="w-16 h-16 rounded-full object-cover mr-4">-->
            <div>
              <h3 class="font-bold text-lg text-gray-900 dark:text-white">{{ coach.name }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ coach.specialty }}</p>
            </div>
          </div>
          <div class="flex mb-4">
            <Icon
              v-for="n in 5"
              :key="n"
              icon="material-symbols-light:star-rate"
              :class="n <= coach.rating ? 'text-yellow-500' : 'text-gray-300'"
              class="w-5 h-5"
            />
          </div>
          <p class="text-gray-600 dark:text-gray-300 italic">"{{ coach.testimonial }}"</p>
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium text-blue-600 dark:text-blue-400">{{
                coach.monthlyEarnings
              }}</span>
              monthly earnings
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium text-blue-600 dark:text-blue-400">{{
                coach.activeClients
              }}</span>
              active clients
            </p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <Button variant="primary" size="lg">
          {{ $t('coaches.testimonials.joinButton') }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from '@/components/common/Button.vue'

const coaches = [
  {
    name: 'Alex Johnson',
    specialty: 'Strength & Conditioning Coach',
    rating: 5,
    testimonial:
      'This platform has completely transformed my coaching business. I used to struggle with client management and payments, but now everything is streamlined and I can focus on what I do best - coaching.',
    monthlyEarnings: '$4,200',
    activeClients: '32',
  },
  {
    name: 'Sarah Williams',
    specialty: 'Nutrition Coach',
    rating: 5,
    testimonial:
      "The subscription model has given me a reliable income stream. My clients love the platform interface and the easy communication tools. It's a win-win for everyone.",
    monthlyEarnings: '$3,800',
    activeClients: '26',
  },
  {
    name: 'Marcus Chen',
    specialty: 'CrossFit Coach',
    rating: 4,
    testimonial:
      'Being able to create custom subscription packages has been a game-changer for my business. My clients get exactly what they need, and I can properly value my expertise.',
    monthlyEarnings: '$5,100',
    activeClients: '28',
  },
  {
    name: 'Emma Rodriguez',
    specialty: 'Yoga Instructor',
    rating: 5,
    testimonial:
      "As someone who isn't tech-savvy, I was worried about managing an online coaching business. This platform makes it incredibly simple and intuitive.",
    monthlyEarnings: '$3,500',
    activeClients: '40',
  },
  {
    name: 'Daniel Wilson',
    specialty: 'Endurance Coach',
    rating: 5,
    testimonial:
      'The analytics and tracking features help me provide better coaching to my clients. I can see their progress and make adjustments to their training plans in real-time.',
    monthlyEarnings: '$4,800',
    activeClients: '22',
  },
  {
    name: 'Sophia Thompson',
    specialty: 'Wellness Coach',
    rating: 4,
    testimonial:
      "I started using this platform during the pandemic and it's completely changed how I run my business. I'm now earning more than I was with in-person coaching only.",
    monthlyEarnings: '$3,600',
    activeClients: '30',
  },
]
</script>
