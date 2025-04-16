<template>
  <div class="p-6 space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800 dark:text-white">{{ $t('contentHub.contentManagementHub') }}</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">{{ $t('contentHub.manageYourContent') }}</p>
      </div>
      <div class="flex gap-4">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            :placeholder="$t('contentHub.searchPlans')"
            class="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-header-dark w-full md:w-64"
          />
          <Icon icon="mdi:magnify" class="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <button
          @click="showNewPlanModal = true"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-header-dark transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:plus" /> {{ $t('contentHub.createNew') }}
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="flex flex-wrap gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'pb-2 px-4 border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-primary-600 text-primary-600 dark:text-primary-400'
              : 'border-transparent hover:border-gray-300 text-gray-600 dark:text-gray-400'
          ]"
        >
          <div class="flex items-center gap-2">
            <Icon :icon="planTypeIcons[tab.id]" />
            {{ tab.label }}
            <span class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full">
              {{ getCountForTab(tab.id) }}
            </span>
          </div>
        </button>
      </nav>
    </div>

    <!-- Empty State -->
    <div v-if="filteredPlans.length === 0" class="flex flex-col items-center justify-center py-16">
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
        <Icon :icon="planTypeIcons[activeTab]" class="text-4xl text-gray-400" />
      </div>
      <h3 class="text-xl font-medium text-gray-800 dark:text-white mb-2">{{ $t('contentHub.noPlansFound') }}</h3>
      <p class="text-gray-500 dark:text-gray-400 text-center max-w-md">
        {{ $t('contentHub.noPlansFoundDescription') }}
      </p>
      <button
        @click="showNewPlanModal = true"
        class="mt-6 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-header-dark transition-colors flex items-center gap-2"
      >
        <Icon icon="mdi:plus" /> {{ $t('contentHub.createNewPlan') }}
      </button>
    </div>

    <!-- Content Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="plan in filteredPlans"
        :key="plan.id"
        class="bg-white dark:bg-header-dark p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
      >
        <!-- Plan Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{{ plan.title }}</h3>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Icon :icon="planTypeIcons[plan.type]" />
              <span>{{ plan.duration }} {{ $t('contentHub.weeks') }}</span>
              <span>•</span>
              <span>{{ formatDate(plan.createdAt) }}</span>
            </div>
          </div>
          <div class="relative">
            <button
              @click="togglePlanMenu(plan.id)"
              class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon icon="mdi:dots-vertical" />
            </button>
            <div
              v-if="activePlanMenu === plan.id"
              class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-100 dark:border-gray-700"
            >
              <div class="py-1">
                <button
                  @click="editPlan(plan)"
                  class="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon icon="mdi:pencil" class="mr-2" /> {{ $t('contentHub.edit') }}
                </button>
                <button
                  @click="openAssignmentModal(plan)"
                  class="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon icon="mdi:account-plus" class="mr-2" /> {{ $t('contentHub.assign') }}
                </button>
                <button
                  @click="archivePlan(plan)"
                  class="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Icon icon="mdi:archive" class="mr-2" />
                  {{ plan.status === 'active' ? $t('contentHub.archive') : $t('contentHub.activate') }}
                </button>
                <div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                <button
                  @click="deletePlan(plan)"
                  class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Icon icon="mdi:delete" class="mr-2" /> {{ $t('contentHub.delete') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Plan Content Preview -->
        <div class="mb-4 space-y-3">
          <div v-if="plan.type === 'workout'">
            <div class="flex items-center gap-2 mb-2">
              <Icon icon="mdi:dumbbell" class="text-primary-600" />
              <span class="font-medium text-gray-800 dark:text-white">{{ $t('contentHub.workoutIncludes') }}:</span>
            </div>
            <div class="space-y-2">
              <div v-for="(exercise, idx) in plan.exercises?.slice(0, 3)" :key="idx"
                   class="flex items-center gap-2 text-sm p-2 rounded-md bg-gray-50 dark:bg-gray-700/50">
                <span class="w-6 h-6 flex items-center justify-center bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-xs">{{ idx + 1 }}</span>
                <span class="text-gray-800 dark:text-gray-200">{{ exercise.name }}</span>
                <span class="ml-auto text-gray-500 dark:text-gray-400 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                  {{ exercise.sets }}x{{ exercise.reps }}
                </span>
              </div>
              <button v-if="plan.exercises && plan.exercises.length > 3"
                      class="text-primary-600 dark:text-primary-400 text-sm hover:underline mt-2">
                + {{ plan.exercises.length - 3 }} {{ $t('contentHub.moreExercises') }}
              </button>
            </div>
          </div>

          <div v-if="plan.type === 'nutrition'">
            <div class="flex items-center gap-2 mb-2">
              <Icon icon="mdi:food-apple" class="text-green-600" />
              <span class="font-medium text-gray-800 dark:text-white">{{ $t('contentHub.nutritionDetails') }}:</span>
            </div>
            <div class="grid grid-cols-4 gap-2 mb-3">
              <div class="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                <div class="text-lg font-bold text-gray-800 dark:text-white">{{ plan.macros?.calories }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ $t('contentHub.calories') }}</div>
              </div>
              <div class="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">
                <div class="text-lg font-bold text-gray-800 dark:text-white">{{ plan.macros?.protein }}g</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ $t('contentHub.protein') }}</div>
              </div>
              <div class="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
                <div class="text-lg font-bold text-gray-800 dark:text-white">{{ plan.macros?.carbs }}g</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ $t('contentHub.carbs') }}</div>
              </div>
              <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                <div class="text-lg font-bold text-gray-800 dark:text-white">{{ plan.macros?.fats }}g</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">{{ $t('contentHub.fats') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
              <Icon icon="mdi:food-variant" class="text-green-600" />
              <span class="text-sm text-gray-800 dark:text-gray-200">
                {{ $t('contentHub.includesMeals', { count: plan.meals?.length || 0 }) }}
              </span>
            </div>
          </div>

          <div v-if="plan.type === 'content'">
            <div class="flex items-center gap-2 mb-2">
              <Icon icon="mdi:file-document-multiple" class="text-blue-600" />
              <span class="font-medium text-gray-800 dark:text-white">{{ $t('contentHub.contentIncludes') }}:</span>
            </div>
            <div class="space-y-2">
              <div v-for="file in plan.files" :key="file.id"
                   class="flex items-center gap-2 p-2 rounded-md"
                   :class="fileTypeClasses[file.type]">
                <Icon :icon="fileIcons[file.type]" class="text-lg" />
                <span class="text-sm truncate flex-1">{{ file.name }}</span>
                <span class="text-xs px-2 py-0.5 rounded-full bg-white/30 dark:bg-black/20">{{ file.size }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Assigned Clients & Status -->
        <div class="border-t border-gray-100 dark:border-gray-700 pt-4 flex items-center justify-between">
          <div class="flex -space-x-2">
            <div v-for="(client, idx) in plan.assignedClients.slice(0, 3)" :key="idx"
                 class="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 overflow-hidden">
              <img :src="client.avatar" :alt="client.name" class="w-full h-full object-cover" />
            </div>
            <div v-if="plan.assignedClients.length > 3"
                 class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-300 border-2 border-white dark:border-gray-800">
              +{{ plan.assignedClients.length - 3 }}
            </div>
            <div v-if="plan.assignedClients.length === 0"
                 class="text-sm text-gray-500 dark:text-gray-400 italic">
              {{ $t('contentHub.notAssigned') }}
            </div>
          </div>
          <span class="text-xs px-2 py-1 rounded-full" :class="planStatusClasses[plan.status]">
            {{ $t(plan.status) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Assignment Modal -->
    <Teleport to="body">
      <div v-if="selectedPlan"
           class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
           @click.self="selectedPlan = null">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
             @click.stop
             ref="modalEl">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">
              {{ $t('contentHub.assignPlan', { title: selectedPlan.title }) }}
            </h3>
            <button @click="selectedPlan = null" class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="mdi:close" class="text-gray-500" />
            </button>
          </div>

          <div class="mb-4">
            <input
              type="text"
              v-model="clientSearchQuery"
              :placeholder="$t('contentHub.searchClients')"
              class="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
            />
          </div>

          <div class="space-y-3 max-h-64 overflow-y-auto">
            <div
              v-for="client in filteredClients"
              :key="client.id"
              class="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div class="flex items-center gap-3">
                <img :src="client.avatar" :alt="client.name" class="w-10 h-10 rounded-full object-cover">
                <span class="text-gray-800 dark:text-gray-200">{{ client.name }}</span>
              </div>
              <button
                @click="toggleAssignmen$t(client)"
                class="p-2 rounded-lg transition-colors"
                :class="isAssigned(client) ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'"
              >
                <Icon :icon="isAssigned(client) ? 'mdi:account-remove' : 'mdi:account-plus'" />
              </button>
            </div>

            <div v-if="filteredClients.length === 0" class="text-center py-4 text-gray-500 dark:text-gray-400">
              {{ $t('contentHub.noClientsFound') }}
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="selectedPlan = null"
              class="flex-1 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {{ $t('contentHub.cancel') }}
            </button>
            <button
              @click="saveAssignments"
              class="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-header-dark"
            >
              {{ $t('contentHub.saveAssignments') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- New Plan Modal -->
    <Teleport to="body">
      <div v-if="showNewPlanModal"
           class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
           @click.self="showNewPlanModal = false">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md" @click.stop>
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-gray-800 dark:text-white">{{ $t('contentHub.createNewPlan') }}</h3>
            <button @click="showNewPlanModal = false" class="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <Icon icon="mdi:close" class="text-gray-500" />
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{{ $t('contentHub.planType') }}</label>
              <select
                v-model="newPlan.type"
                class="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
              >
                <option value="workout">{{ $t('contentHub.workoutPlan') }}</option>
                <option value="nutrition">{{ $t('contentHub.nutritionPlan') }}</option>
                <option value="content">{{ $t('contentHub.contentPlan') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{{ $t('contentHub.title') }}</label>
              <input
                v-model="newPlan.title"
                type="text"
                class="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{{ $t('contentHub.duration') }}</label>
              <div class="flex items-center">
                <input
                  v-model.number="newPlan.duration"
                  type="number"
                  min="1"
                  class="w-full p-2 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg"
                />
                <span class="ml-2 text-gray-700 dark:text-gray-300">{{ $t('contentHub.weeks') }}</span>
              </div>
            </div>

            <div class="pt-4">
              <button
                @click="createPlan"
                :disabled="!newPlan.title || !newPlan.duration"
                class="w-full py-2 rounded-lg font-medium text-white transition-colors"
                :class="!newPlan.title || !newPlan.duration ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-600 hover:bg-header-dark'"
              >
                {{ $t('contentHub.createPlan') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'


const fileIcons = {
  pdf: 'mdi:file-pdf',
  video: 'mdi:video',
  spreadsheet: 'mdi:file-excel'
}


type Client = {
  id: number
  name: string
  avatar: string
}

const {t, locale} = useI18n()

const tabs = ref([
  { id: 'workout', label:t('contentHub.workoutPlan') },
  { id: 'nutrition', label: t('contentHub.nutritionPlan') },
  { id: 'content', label: t('contentHub.contentPlan') }
])

const activeTab = ref('workout')
const searchQuery = ref('')
const clientSearchQuery = ref('')
const activePlanMenu = ref<number | null>(null)

const allClients = ref<Client[]>([
  { id: 1, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'Mike Peters', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 3, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 5, name: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=5' }
])

type Exercise = {
  id: number
  name: string
  sets: number
  reps: number
  demoVideo?: string
}

type Meal = {
  id: number
  name: string
  calories: number
}

type ContentFile = {
  id: number
  name: string
  type: 'pdf' | 'video' | 'spreadsheet'
  size: string
}

type Plan = {
  id: number
  title: string
  type: 'workout' | 'nutrition' | 'content'
  duration: number
  status: 'active' | 'archived'
  createdAt: Date
  assignedClients: Client[]
  exercises?: Exercise[]
  macros?: {
    calories: number
    protein: number
    carbs: number
    fats: number
  }
  meals?: Meal[]
  files?: ContentFile[]
}

// Sample Data
const workoutPlans = ref<Plan[]>([
  {
    id: 1,
    title: 'Beginner Full Body Routine',
    type: 'workout',
    duration: 4,
    status: 'active',
    createdAt: new Date(2024, 0, 15),
    assignedClients: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 2, name: 'Mike Peters', avatar: 'https://i.pravatar.cc/150?img=2' }
    ],
    exercises: [
      { id: 1, name: 'Barbell Squat', sets: 4, reps: 8 },
      { id: 2, name: 'Bench Press', sets: 4, reps: 8 },
      { id: 3, name: 'Deadlift', sets: 3, reps: 5 },
      { id: 4, name: 'Pull-Ups', sets: 3, reps: 10 }
    ]
  },
  {
    id: 4,
    title: 'Advanced HIIT Program',
    type: 'workout',
    duration: 6,
    status: 'active',
    createdAt: new Date(2024, 2, 5),
    assignedClients: [
      { id: 3, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    exercises: [
      { id: 9, name: 'Burpees', sets: 5, reps: 15 },
      { id: 10, name: 'Box Jumps', sets: 5, reps: 12 },
      { id: 11, name: 'Mountain Climbers', sets: 4, reps: 30 },
      { id: 12, name: 'Battle Ropes', sets: 4, reps: 40 }
    ]
  }
])

const nutritionPlans = ref<Plan[]>([
  {
    id: 2,
    title: 'High Protein Diet Plan',
    type: 'nutrition',
    duration: 8,
    status: 'active',
    createdAt: new Date(2024, 1, 1),
    macros: {
      calories: 2200,
      protein: 180,
      carbs: 150,
      fats: 70
    },
    assignedClients: [
      { id: 1, name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' }
    ],
    meals: [
      { id: 1, name: 'Grilled Chicken Salad', calories: 500 },
      { id: 2, name: 'Protein Shake', calories: 300 },
      { id: 3, name: 'Quinoa Bowl', calories: 600 }
    ]
  },
  {
    id: 3,
    title: 'Keto Diet Plan',
    type: 'nutrition',
    duration: 12,
    status: 'active',
    createdAt: new Date(2024, 1, 10),
    macros: {
      calories: 1800,
      protein: 150,
      carbs: 50,
      fats: 120
    },
    assignedClients: [
      { id: 2, name: 'Mike Peters', avatar: 'https://i.pravatar.cc/150?img=2' }
    ],
    meals: [
      { id: 4, name: 'Avocado Salad', calories: 400 },
      { id: 5, name: 'Grilled Salmon', calories: 700 },
      { id: 6, name: 'Cheese Omelette', calories: 500 }
    ]
  }
])
const contentPlans = ref<Plan[]>([
  {
    id: 5,
    title: 'Nutrition Guide for Athletes',
    type: 'content',
    duration: 0,
    status: 'active',
    createdAt: new Date(2024, 2, 1),
    assignedClients: [
      { id: 3, name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    files: [
      { id: 1, name: 'Nutrition_Guide.pdf', type: 'pdf', size: '2MB' },
      { id: 2, name: 'Meal_Plan_Spreadsheet.xlsx', type: 'spreadsheet', size: '1MB' }
    ]
  },
  {
    id: 6,
    title: 'Workout Video Library',
    type: 'content',
    duration: 0,
    status: 'active',
    createdAt: new Date(2024, 2, 10),
    assignedClients: [
      { id: 4, name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    files: [
      { id: 3, name: 'HIIT_Workout.mp4', type: 'video', size: '500MB' },
      { id: 4, name: 'Yoga_Session.mp4', type: 'video', size: '300MB' }
    ]
  }
])
const plans = computed(() => {
  return [...workoutPlans.value, ...nutritionPlans.value, ...contentPlans.value]
})
const filteredPlans = computed(() => {
  return plans.value.filter(plan => {
    const matchesType = plan.type === activeTab.value
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesType && matchesSearch
  })
})
const filteredClients = computed(() => {
  return allClients.value.filter(client => {
    return client.name.toLowerCase().includes(clientSearchQuery.value.toLowerCase())
  })
})
const planTypeIcons = {
  workout: 'mdi:dumbbell',
  nutrition: 'mdi:food-apple',
  content: 'mdi:file-document-multiple'
}
const fileTypeIcons = {
  pdf: 'mdi:file-pdf',
  video: 'mdi:video',
  spreadsheet: 'mdi:file-excel'
}
const fileTypeClasses = {
  pdf: 'bg-red-50 dark:bg-red-900/20',
  video: 'bg-blue-50 dark:bg-blue-900/20',
  spreadsheet: 'bg-green-50 dark:bg-green-900/20'
}
const planStatusClasses = {
  active: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
  archived: 'bg-gray-100 dark:bg-gray-900/20 text-gray-600 dark:text-gray-400'
}
const newPlan = ref({
  title: '',
  type: 'workout',
  duration: 4
})
const showNewPlanModal = ref(false)
const selectedPlan = ref<Plan | null>(null)
const showAssignmentModal = ref(false)
const selectedClients = ref<Client[]>([])
const isAssigned = (client: Client) => {
  return selectedClients.value.some(c => c.id === client.id)
}
const toggleAssignment = (client: Client) => {
  if (isAssigned(client)) {
    selectedClients.value = selectedClients.value.filter(c => c.id !== client.id)
  } else {
    selectedClients.value.push(client)
  }
}
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat(locale.value, { dateStyle: 'medium' }).format(new Date(date))
}
const getCountForTab = (tabId: string) => {
  return plans.value.filter(plan => plan.type === tabId).length
}
const createPlan = () => {
  const newPlanData = {
    ...newPlan.value,
    id: Date.now(),
    status: 'active',
    createdAt: new Date(),
    assignedClients: []
  }
  if (newPlan.value.type === 'workout') {
    newPlanData.exercises = []
  } else if (newPlan.value.type === 'nutrition') {
    newPlanData.macros = { calories: 0, protein: 0, carbs: 0, fats: 0 }
    newPlanData.meals = []
  } else if (newPlan.value.type === 'content') {
    newPlanData.files = []
  }
  if (newPlan.value.type === 'workout') {
    workoutPlans.value.push(newPlanData)
  } else if (newPlan.value.type === 'nutrition') {
    nutritionPlans.value.push(newPlanData)
  } else if (newPlan.value.type === 'content') {
    contentPlans.value.push(newPlanData)
  }
  showNewPlanModal.value = false
}
const editPlan = (plan: Plan) => {
  // Logic to edit the plan
  console.log('Edit plan:', plan)
}
const archivePlan = (plan: Plan) => {
  plan.status = plan.status === 'active' ? 'archived' : 'active'
}
const deletePlan = (plan: Plan) => {
  const index = plans.value.findIndex(p => p.id === plan.id)
  if (index !== -1) {
    plans.value.splice(index, 1)
  }
}
const openAssignmentModal = (plan: Plan) => {
  selectedPlan.value = plan
  selectedClients.value = plan.assignedClients
}
const saveAssignments = () => {
  if (selectedPlan.value) {
    selectedPlan.value.assignedClients = selectedClients.value
    selectedPlan.value = null
  }
}
const togglePlanMenu = (planId: number) => {
  activePlanMenu.value = activePlanMenu.value === planId ? null : planId
}
const closePlanMenu = () => {
  activePlanMenu.value = null
}
onMounted(() => {
  document.addEventListener('click', closePlanMenu)
})
onUnmounted(() => {
  document.removeEventListener('click', closePlanMenu)
})
</script>
