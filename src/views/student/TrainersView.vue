<template>
  <div class="container mx-auto p-4 space-y-8">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-gradient-to-tr from-purple-400 to-pink-500 rounded-xl shadow-lg">
          <Icon icon="mdi:account-group" class="w-8 h-8 text-white" />
        </div>
        <h1 class="text-3xl font-bold text-gray-800">Meet Our Trainers</h1>
      </div>
      <div class="flex items-center gap-2">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search trainers..."
            class="pl-10 pr-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <Icon icon="mdi:magnify" class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <button @click="showFilters = !showFilters" class="md:hidden p-2 bg-white rounded-full shadow text-gray-600 hover:bg-gray-50">
          <Icon icon="mdi:filter-variant" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div
      class="bg-white p-4 rounded-2xl shadow-md transition-all duration-300"
      :class="{'max-h-0 overflow-hidden p-0 opacity-0 mb-0': !showFilters && window.innerWidth < 768}"
    >
      <div class="mb-4 md:hidden">
        <h3 class="font-semibold text-lg text-gray-800 mb-2">Filter Trainers</h3>
        <div class="border-b border-gray-200"></div>
      </div>

      <!-- Specialty Filter -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="specialty in specialties"
          :key="specialty"
          @click="selectedSpecialty = specialty"
          class="px-4 py-2 rounded-full transition-all text-sm"
          :class="selectedSpecialty === specialty
            ? 'bg-blue-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        >
          {{ specialty }}
        </button>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Trainers List -->
      <div class="lg:col-span-2 space-y-6">
        <div v-if="filteredTrainers.length === 0" class="bg-white p-8 rounded-2xl shadow-md text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No trainers found</h3>
          <p class="text-gray-600">Try adjusting your filters or search query</p>
          <button @click="resetFilters" class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
            Reset Filters
          </button>
        </div>

        <div
          v-for="(trainer, idx) in filteredTrainers"
          :key="trainer.id"
          class="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <!-- Trainer Image -->
            <div class="w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-400 to-cyan-500 relative">
              <img :src="`https://randomuser.me/api/portraits/${idx%2 == 0 ? 'men' : 'women'}/${5+idx}.jpg`" :alt="trainer.name">
              <div v-if="trainer.availability === 'accepting'" class="absolute bottom-0 left-0 right-0 bg-green-500/70 text-white text-xs font-medium text-center py-1">
                Available
              </div>
              <div v-else-if="trainer.availability === 'limited'" class="absolute bottom-0 left-0 right-0 bg-yellow-400/90 text-white text-xs font-medium text-center py-1">
                Limited
              </div>
              <div v-else class="absolute bottom-0 left-0 right-0 bg-red-500/80 text-white text-xs font-medium text-center py-1">
                Waitlist
              </div>
            </div>

            <!-- Trainer Details -->
            <div class="flex-1 space-y-4 text-center sm:text-left">
              <div class="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between">
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">{{ trainer.name }}</h2>
                  <p class="text-blue-500">{{ trainer.specialty }}</p>
                </div>
                <div class="flex items-center gap-2 text-yellow-400 mt-2 sm:mt-0">
                  <div class="flex">
                    <Icon v-for="i in Math.floor(trainer.rating)" :key="i" icon="mdi:star" class="w-5 h-5" />
                    <Icon v-if="trainer.rating % 1 >= 0.5" icon="mdi:star-half" class="w-5 h-5" />
                  </div>
                  <span class="font-medium">{{ trainer.rating }}</span>
                  <span class="text-sm text-gray-500">({{ trainer.reviewCount }})</span>
                </div>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-2 sm:gap-4">
                <div class="p-3 bg-gray-50 rounded-xl">
                  <p class="text-sm text-gray-600">Experience</p>
                  <p class="text-lg font-bold text-gray-800">{{ trainer.experience }}+ years</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl">
                  <p class="text-sm text-gray-600">Clients</p>
                  <p class="text-lg font-bold text-gray-800">{{ trainer.clients }}+</p>
                </div>
                <div class="p-3 bg-gray-50 rounded-xl">
                  <p class="text-sm text-gray-600">Success Rate</p>
                  <p class="text-lg font-bold text-gray-800">{{ trainer.successRate }}%</p>
                </div>
              </div>

              <!-- Certifications Badge -->
              <div v-if="trainer.certifications && trainer.certifications.length > 0" class="flex flex-wrap items-center gap-2">
                <div class="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <Icon icon="mdi:certificate" class="w-4 h-4 mr-1" />
                  Certified
                </div>
                <div v-for="(cert, index) in trainer.certifications.slice(0, 2)" :key="index" class="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs">
                  {{ cert }}
                </div>
                <div v-if="trainer.certifications.length > 2" class="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs">
                  +{{ trainer.certifications.length - 2 }} more
                </div>
              </div>

              <!-- Specialties -->
              <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span
                  v-for="(tag, index) in trainer.tags"
                  :key="index"
                  class="px-3 py-1 text-sm rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-600"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3">
                <button class="flex-1 px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                  <Icon icon="mdi:message-outline" class="w-5 h-5" />
                  <span>Connect with {{ trainer.name.split(' ')[0] }}</span>
                </button>
                <button class="sm:w-auto px-6 py-2 border border-blue-500 text-blue-500 rounded-xl hover:bg-blue-50 transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>

          <!-- Programs Offered by this trainer - Collapsible Section -->
          <div class="mt-6">
            <button
              @click="trainer.showPrograms = !trainer.showPrograms"
              class="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <span class="font-medium text-gray-700">Programs by {{ trainer.name.split(' ')[0] }}</span>
              <Icon
                :icon="trainer.showPrograms ? 'mdi:chevron-up' : 'mdi:chevron-down'"
                class="w-5 h-5 text-gray-600"
              />
            </button>

            <div v-if="trainer.showPrograms" class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="program in trainer.programs" :key="program.id" class="bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
                <div class="flex items-center gap-3">
                  <div class="p-2 bg-blue-100 rounded-lg">
                    <Icon :icon="program.icon" class="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 class="font-medium text-gray-800">{{ program.name }}</h4>
                    <div class="flex items-center text-gray-500 text-sm">
                      <Icon icon="mdi:clock-outline" class="w-4 h-4 mr-1" />
                      {{ program.duration }}
                    </div>
                  </div>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <div class="flex items-center text-sm">
                    <Icon icon="mdi:account-multiple" class="w-4 h-4 mr-1 text-gray-500" />
                    <span>{{ program.enrolled }} enrolled</span>
                  </div>
                  <div class="text-blue-500 font-medium">{{ program.price }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center space-x-2 mt-8">
          <button class="p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
            <Icon icon="mdi:chevron-left" class="w-5 h-5" />
          </button>
          <button class="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-lg">1</button>
          <button class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100">2</button>
          <button class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100">3</button>
          <span class="mx-2">...</span>
          <button class="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100">12</button>
          <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-100">
            <Icon icon="mdi:chevron-right" class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Top Trainers -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-4">Featured Trainers</h3>
          <div class="space-y-4">
            <div
              v-for="(trainer, idx) in topTrainers"
              :key="trainer.id"
              class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors"
            >
              <div class="w-16 h-16 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-400 to-pink-500 relative">
                <img :src="`https://randomuser.me/api/portraits/${idx%2 == 0 ? 'men' : 'women'}/${32+idx}.jpg`" :alt="trainer.name">

                <div v-if="trainer.availability === 'accepting'" class="absolute bottom-0 left-0 right-0 bg-green-500/70 text-white text-xs font-medium text-center py-1">
                  Available
                </div>
              </div>
              <div>
                <h4 class="font-semibold text-gray-800">{{ trainer.name }}</h4>
                <p class="text-sm text-blue-500">{{ trainer.specialty }}</p>
                <div class="flex items-center gap-1 text-yellow-400">
                  <Icon icon="mdi:star" class="w-4 h-4" />
                  <span class="text-sm">{{ trainer.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Stories -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-semibold">Success Stories</h3>
            <button class="text-blue-500 hover:underline text-sm">View All</button>
          </div>
          <div class="space-y-4">
            <div class="bg-gray-50 p-4 rounded-xl">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/30.jpg" alt="Alex M.">
                </div>
                <div>
                  <h4 class="font-semibold">Alex M.</h4>
                  <p class="text-sm text-gray-500">Client of Sarah Wilson</p>
                </div>
              </div>
              <p class="text-gray-600 text-sm italic">"I've lost 30 pounds and gained so much confidence thanks to Sarah's program. Life changing!"</p>
              <div class="mt-2 flex items-center gap-1 text-yellow-400">
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-xl">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/30.jpg" alt="Alex M.">
                </div>
                <div>
                  <h4 class="font-semibold">Jamie T.</h4>
                  <p class="text-sm text-gray-500">Client of Michael Johnson</p>
                </div>
              </div>
              <p class="text-gray-600 text-sm italic">"After years of struggling, Michael helped me finally reach my strength goals. Highly recommend!"</p>
              <div class="mt-2 flex items-center gap-1 text-yellow-400">
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star" class="w-4 h-4" />
                <Icon icon="mdi:star-half" class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <!-- Trainer Metrics -->
        <div class="bg-white p-6 rounded-2xl shadow-md">
          <h3 class="text-xl font-semibold mb-4 text-gray-800">Community Stats</h3>
          <div class="space-y-4 text-gray-800">
            <div class="flex items-center justify-between">
              <p>Total Trainers</p>
              <p class="text-2xl font-bold">142</p>
            </div>
            <div class="flex items-center text-gray-800 justify-between">
              <p>Average Rating</p>
              <div class="flex items-center gap-2">
                <p class="text-2xl font-bold">4.8</p>
                <div class="flex">
                  <Icon icon="mdi:star" class="w-4 h-4 text-yellow-300" />
                  <Icon icon="mdi:star" class="w-4 h-4 text-yellow-300" />
                  <Icon icon="mdi:star" class="w-4 h-4 text-yellow-300" />
                  <Icon icon="mdi:star" class="w-4 h-4 text-yellow-300" />
                  <Icon icon="mdi:star-half" class="w-4 h-4 text-yellow-300" />
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <p>Active Clients</p>
              <p class="text-2xl font-bold">2,450+</p>
            </div>
          </div>
        </div>

        <!-- Become a Trainer CTA -->
        <div class="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-2xl shadow-md text-white">
          <div class="text-center space-y-4">
            <Icon icon="mdi:trophy" class="w-12 h-12 mx-auto" />
            <h3 class="text-xl font-bold">Become a Trainer</h3>
            <p class="text-white text-opacity-90">Join our community of fitness professionals and help others achieve their goals.</p>
            <RouterLink :to="PtRoutes.home">
            <button class="w-full bg-white text-purple-600 font-medium py-3 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
              Apply Now
            </button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { PtRoutes } from '@/helpers/routes/pt.ts'

const window = ref({ innerWidth: 0 })
onMounted(() => {
  window.value.innerWidth = globalThis.window?.innerWidth || 1024
  if (globalThis.window) {
    globalThis.window.addEventListener('resize', () => {
      window.value.innerWidth = globalThis.window.innerWidth
    })
  }
})

const showFilters = ref(true)
const searchQuery = ref('')
const specialties = ref(['All', 'Strength', 'Cardio', 'Yoga', 'Nutrition', 'Recovery'])
const selectedSpecialty = ref('All')

const filters = ref({
  minRating: 4.0,
  experience: 'any',
  availability: 'any'
})

const resetFilters = () => {
  selectedSpecialty.value = 'All'
  filters.value = {
    minRating: 4.0,
    experience: 'any',
    availability: 'any'
  }
  searchQuery.value = ''
}

const trainers = ref([
  {
    id: 1,
    name: 'Michael Johnson',
    specialty: 'Strength Training',
    rating: 4.9,
    reviewCount: 124,
    experience: 8,
    clients: 240,
    successRate: 95,
    tags: ['Weight Loss', 'Muscle Gain', 'Powerlifting'],
    image: '/trainer1.jpg',
    availability: 'accepting',
    certifications: ['NASM CPT', 'ISSA Nutritionist', 'CrossFit L2'],
    showPrograms: false,
    programs: [
      { id: 1, name: 'Strength Foundations', duration: '6 weeks', enrolled: 48, price: '$89', icon: 'mdi:weight-lifter' },
      { id: 2, name: 'Mass Builder', duration: '8 weeks', enrolled: 36, price: '$129', icon: 'mdi:arm-flex' },
      { id: 3, name: 'Custom 1-on-1', duration: '12 weeks', enrolled: 14, price: '$299', icon: 'mdi:account-star' }
    ]
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    specialty: 'Yoga & Mobility',
    rating: 4.8,
    reviewCount: 98,
    experience: 6,
    clients: 180,
    successRate: 92,
    tags: ['Flexibility', 'Mindfulness', 'Posture'],
    image: '/trainer2.jpg',
    availability: 'limited',
    certifications: ['RYT-500', 'Mobility Specialist'],
    showPrograms: false,
    programs: [
      { id: 1, name: 'Mobility Mastery', duration: '4 weeks', enrolled: 65, price: '$69', icon: 'mdi:yoga' },
      { id: 2, name: 'Stress Relief Yoga', duration: '6 weeks', enrolled: 42, price: '$79', icon: 'mdi:meditation' }
    ]
  },
  {
    id: 5,
    name: 'David Martinez',
    specialty: 'HIIT & Cardio',
    rating: 4.7,
    reviewCount: 76,
    experience: 5,
    clients: 150,
    successRate: 88,
    tags: ['Fat Loss', 'Endurance', 'Athletic Performance'],
    image: '/trainer5.jpg',
    availability: 'waitlist',
    certifications: ['ACE CPT', 'HIIT Specialist'],
    showPrograms: false,
    programs: [
      { id: 1, name: 'Fat Burn Accelerator', duration: '6 weeks', enrolled: 89, price: '$79', icon: 'mdi:fire' },
      { id: 2, name: 'Endurance Builder', duration: '8 weeks', enrolled: 54, price: '$99', icon: 'mdi:run' }
    ]
  }
])

const topTrainers = ref([
  {
    id: 3,
    name: 'Chris Roberts',
    specialty: 'HIIT & Cardio',
    rating: 4.9,
    image: '/trainer3.jpg',
    availability: 'accepting'
  },
  {
    id: 4,
    name: 'Emma Davis',
    specialty: 'Nutrition',
    rating: 4.7,
    image: '/trainer4.jpg',
    availability: 'limited'
  },
  {
    id: 6,
    name: 'Lisa Wong',
    specialty: 'Strength Training',
    rating: 4.8,
    image: '/trainer6.jpg',
    availability: 'accepting'
  }
])

const filteredTrainers = computed(() => {
  let filtered = trainers.value

  // Filter by specialty
  if (selectedSpecialty.value !== 'All') {
    filtered = filtered.filter(t =>
      t.specialty.toLowerCase().includes(selectedSpecialty.value.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(selectedSpecialty.value.toLowerCase()))
    )
  }

  // Filter by minimum rating
  filtered = filtered.filter(t => t.rating >= filters.value.minRating)

  // Filter by experience
  if (filters.value.experience !== 'any') {
    switch (filters.value.experience) {
      case 'beginner':
        filtered = filtered.filter(t => t.experience >= 1 && t.experience <= 3)
        break
      case 'intermediate':
        filtered = filtered.filter(t => t.experience >= 4 && t.experience <= 7)
        break
      case 'expert':
        filtered = filtered.filter(t => t.experience >= 8)
        break
    }
  }

  // Filter by availability
  if (filters.value.availability !== 'any') {
    filtered = filtered.filter(t => t.availability === filters.value.availability)
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.specialty.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})
</script>
