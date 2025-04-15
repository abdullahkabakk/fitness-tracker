<template>
  <section class="py-20 px-4 lg:px-8  from-white to-primary-50 dark:from-gray-900 dark:to-gray-800"
  :class="isTopOrDown"
  >
    <div class="max-w-4xl mx-auto" id="faq">
      <SectionTitleSubtitle
        :title="$t('home.faq.title')"
        :subtitle="$t('home.faq.subtitle')"
      />

      <div class="space-y-4 mt-8">
        <div
          v-for="(item, index) in visibleFaqItems"
          :key="index"
          class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden transition-all duration-300"
        >
          <button
            @click="toggleFaq(index)"
            class="flex cursor-pointer justify-between items-center w-full px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
      <span class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ $t(`${faqPrefix}.${item.question}`) }}
      </span>
            <Icon
              :icon="'mdi:chevron-down'"
              class="w-6 h-6 transform dark:text-white transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === index }"
            />
          </button>

          <transition name="fade">
            <div
              v-show="openIndex === index"
              class="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300"
            >
              <p>{{ $t(`${faqPrefix}.${item.answer}`) }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- Call to action -->
      <div class="mt-16 text-center">
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ $t('home.faq.stillHaveQuestions') }}
        </p>
        <Button variant="outline">{{ $t('home.faq.contactUs') }}</Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '@/components/common/Button.vue'
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const { te } = useI18n()

const openIndex = ref(0)
const router = useRouter()
const faqPrefix = ref('home.faq.questions')

onMounted(() => {
  const routeName = router.currentRoute.value.name
  faqPrefix.value = routeName === 'home' ? 'home.faq.questions' : 'coaches.faq.questions'
})

const toggleFaq = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}


const visibleFaqItems = computed(() => {
  return faqItems.filter(
    (item) => te(`${faqPrefix.value}.${item.question}`) && te(`${faqPrefix.value}.${item.answer}`)
  )
})

const isTopOrDown = computed(() => {
  const routeName = router.currentRoute.value.name
  return routeName === 'home' ? 'bg-gradient-to-b' : 'bg-gradient-to-t'
})

const faqItems = [
  { question: 'pricing.question', answer: 'pricing.answer' },
  { question: 'start.question', answer: 'start.answer' },
  { question: 'payout.question', answer: 'payout.answer' },
  { question: 'requirements.question', answer: 'requirements.answer' },
  { question: 'clients.question', answer: 'clients.answer' },
  { question: 'security.question', answer: 'security.answer' },
  { question: 'cancellation.question', answer: 'cancellation.answer' },
  { question: 'coaches.question', answer: 'coaches.answer' },
  { question: 'tracking.question', answer: 'tracking.answer' },
  { question: 'coaching.question', answer: 'coaching.answer' },
  { question: 'support.question', answer: 'support.answer' },
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
