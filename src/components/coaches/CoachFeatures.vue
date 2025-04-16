<template>
  <section class="py-20 bg-gradient-to-t from-white to-secondary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitleSubtitle
        :title="$t('coaches.features.title')"
        :subtitle="$t('coaches.features.subtitle')"
        class="text-center mb-16"/>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="feature in features"
          :key="feature.titleKey"
          class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group"
        >
          <div class="mb-4 p-3 rounded-full bg-secondary/10 dark:bg-secondary/10 w-16 h-16 flex items-center justify-center group-hover:bg-secondary/20 dark:group-hover:bg-secondary/20 transition-colors duration-300">
            <Icon
              :icon="feature.icon"
              class="w-8 h-8 text-secondary dark:text-secondary"
            />
          </div>
          <h3 class="text-xl font-bold mb-3 text-secondary-text dark:text-white group-hover:text-secondary dark:group-hover:text-secondary transition-colors duration-300">
            {{ $t(feature.titleKey) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            {{ $t(feature.descriptionKey) }}
          </p>
        </div>
      </div>

      <!-- Platform overview with tabs -->
      <div class="mt-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <div class="mb-8 flex justify-center overflow-x-auto">
          <div class="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1.5">
            <button
              v-for="(tab, index) in tabs"
              :key="index"
              @click="activeTab = index"
              :class="[
                'px-6 cursor-pointer py-2.5 text-sm md:text-base font-medium rounded-md transition-all duration-300 whitespace-nowrap',
                activeTab === index
                  ? 'bg-white dark:bg-gray-800 text-secondary dark:text-secondary shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
              ]"
            >
              {{ $t(tab.titleKey) }}
            </button>
          </div>
        </div>

        <div class="mb-12">
            <div v-for="(tab, index) in filteredTab" :key="`content-${index}`">
              <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 class="text-2xl font-bold mb-4 text-secondary dark:text-white">{{ $t(tab.contentTitleKey) }}</h3>
                  <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">{{ $t(tab.contentDescriptionKey) }}</p>
                  <ul class="space-y-4">
                    <li v-for="(point, pointIndex) in tab.points" :key="pointIndex" class="flex">
                      <div class="mr-3 flex-shrink-0">
                        <div class="w-6 h-6 rounded-full bg-secondary dark:bg-secondary flex items-center justify-center">
                          <Icon icon="material-symbols:check" class="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <p class="text-gray-600 dark:text-gray-300">{{ $t(point) }}</p>
                    </li>
                  </ul>
                </div>
                <div class="relative">
                  <div class="absolute -top-4 -right-4 w-24 h-24 bg-secondary/50 dark:bg-secondary900 rounded-full opacity-50 blur-xl"></div>
                  <div class="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/50 dark:bg-secondary800 rounded-full opacity-50 blur-xl"></div>
                  <img
                    :src="getImageUrl(tab.img)"
                    :alt="$t(tab.titleKey)"
                    class="rounded-xl shadow-xl relative transform transition-transform duration-500 hover:scale-105"
                  >
                </div>
              </div>
            </div>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(detail, index) in platformDetails" :key="index" class="text-center p-6 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
            <div class="w-14 h-14 bg-secondary/10 dark:bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon :icon="detail.icon" class="w-7 h-7 text-secondary dark:text-secondary400" />
            </div>
            <h3 class="text-xl font-bold mb-2 text-secondary dark:text-white">{{ $t(detail.titleKey) }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ $t(detail.descriptionKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue';
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue';

const activeTab = ref(0);

const filteredTab = computed(() => {
  return tabs.filter((tab, index) => index === activeTab.value);
});

const getImageUrl = (img: string) => {
  return new URL(`/src/assets/img/pt-${img}`, import.meta.url).href;
};

const features = [
  {
    icon: 'material-symbols-light:dashboard-outline',
    titleKey: 'coaches.features.cards.dashboard.title',
    descriptionKey: 'coaches.features.cards.dashboard.description'
  },
  {
    icon: 'material-symbols-light:payments-outline',
    titleKey: 'coaches.features.cards.subscriptions.title',
    descriptionKey: 'coaches.features.cards.subscriptions.description'
  },
  {
    icon: 'material-symbols:analytics-outline-rounded',
    titleKey: 'coaches.features.cards.analytics.title',
    descriptionKey: 'coaches.features.cards.analytics.description'
  },
  {
    icon: 'material-symbols-light:chat-outline',
    titleKey: 'coaches.features.cards.messaging.title',
    descriptionKey: 'coaches.features.cards.messaging.description'
  },
  {
    icon: 'material-symbols:manage-accounts-outline-rounded',
    titleKey: 'coaches.features.cards.workouts.title',
    descriptionKey: 'coaches.features.cards.workouts.description'
  },
  {
    icon: 'material-symbols-light:calendar-month-outline',
    titleKey: 'coaches.features.cards.scheduling.title',
    descriptionKey: 'coaches.features.cards.scheduling.description'
  }
];

const tabs = [
  {
    titleKey: 'coaches.features.tabs.dashboard.title',
    contentTitleKey: 'coaches.features.tabs.dashboard.contentTitle',
    contentDescriptionKey: 'coaches.features.tabs.dashboard.contentDescription',
    img: 'dashboard.png',
    points: [
      'coaches.features.tabs.dashboard.points.overview',
      'coaches.features.tabs.dashboard.points.clients',
      'coaches.features.tabs.dashboard.points.revenue',
      'coaches.features.tabs.dashboard.points.customization'
    ]
  },
  {
    titleKey: 'coaches.features.tabs.payments.title',
    contentTitleKey: 'coaches.features.tabs.payments.contentTitle',
    contentDescriptionKey: 'coaches.features.tabs.payments.contentDescription',
    img: 'payments.png',
    points: [
      'coaches.features.tabs.payments.points.subscriptions',
      'coaches.features.tabs.payments.points.payouts',
      'coaches.features.tabs.payments.points.autoRenewal',
      'coaches.features.tabs.payments.points.invoicing'
    ]
  },
  {
    titleKey: 'coaches.features.tabs.clients.title',
    contentTitleKey: 'coaches.features.tabs.clients.contentTitle',
    contentDescriptionKey: 'coaches.features.tabs.clients.contentDescription',
    img: 'client-management.png',
    points: [
      'coaches.features.tabs.clients.points.profiles',
      'coaches.features.tabs.clients.points.progress',
      'coaches.features.tabs.clients.points.messaging',
      'coaches.features.tabs.clients.points.assignments'
    ]
  }
];

const platformDetails = [
  {
    icon: 'material-symbols-light:security',
    titleKey: 'coaches.features.details.security.title',
    descriptionKey: 'coaches.features.details.security.description'
  },
  {
    icon: 'material-symbols-light:payments',
    titleKey: 'coaches.features.details.payments.title',
    descriptionKey: 'coaches.features.details.payments.description'
  },
  {
    icon: 'material-symbols-light:chat',
    titleKey: 'coaches.features.details.messaging.title',
    descriptionKey: 'coaches.features.details.messaging.description'
  },
  {
    icon: 'material-symbols:analytics-outline-sharp',
    titleKey: 'coaches.features.details.analytics.title',
    descriptionKey: 'coaches.features.details.analytics.description'
  },
  {
    icon: 'material-symbols-light:settings',
    titleKey: 'coaches.features.details.customization.title',
    descriptionKey: 'coaches.features.details.customization.description'
  },
  {
    icon: 'material-symbols-light:support',
    titleKey: 'coaches.features.details.support.title',
    descriptionKey: 'coaches.features.details.support.description'
  }
];
</script>

