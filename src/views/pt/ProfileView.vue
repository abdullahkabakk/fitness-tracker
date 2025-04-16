<template>
  <div class="space-y-8">
    <!-- Profile Header Section with Banner -->
    <div class="relative bg-gradient-to-r from-primary-200 to-primary-400 dark:from-primary-500 dark:to-primary-700 rounded-2xl shadow-xl overflow-hidden">
      <div class="relative h-64 md:h-80">
        <img
          v-if="mockProfile.profileBanner"
          :src="mockProfile.profileBanner"
          class="w-full h-full object-cover"
          :alt="$t('pt.profile.bannerAlt')"
        />
        <div v-else class="w-full h-full bg-primary-200 dark:bg-gray-700"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div class="absolute bottom-0 left-0 p-4 md:p-6 flex flex-col md:flex-row items-center md:items-end gap-4 md:gap-6 w-full">
        <div class="relative z-10">
          <img
            :src="mockProfile.profilePhoto"
            class="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-header-dark shadow-lg"
            :alt="$t('pt.profile.photoAlt')"
          />
          <div class="absolute bottom-0 right-0 bg-success w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white"></div>
        </div>
        <div class="text-center md:text-left pb-2 md:pb-4 flex-1">
          <h2 class="text-xl md:text-2xl font-bold text-white flex items-center justify-center md:justify-start">
            {{ mockProfile.trainerName }}
            <Icon icon="mdi:shield-check" class="text-primary-300 ml-2" />
          </h2>
          <p class="text-primary-100">{{ mockProfile.trainerTitle }}</p>
        </div>
        <div class="hidden md:block">
          <button class="px-4 py-2 bg-white text-primary-600 hover:text-primary-700 rounded-lg shadow-md transition-colors">
            {{ $t('pt.profile.editProfile') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-10">
      <!-- Left Column -->
      <div class="space-y-6 xl:col-span-2">
        <!-- Profile Card -->
        <Card>
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h3 class="text-xl font-semibold text-header-dark dark:text-white">
              {{ $t('pt.profile.profileInformation') }}
            </h3>
            <button class="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
              <Icon icon="mdi:pencil-outline" class="text-lg" />
              <span>{{ $t('pt.profile.editProfile') }}</span>
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-4">
              <InfoItem icon="mdi:account-outline" :label="$t('pt.profile.specialization')">
                {{ mockProfile.specializationValue }}
              </InfoItem>
              <InfoItem icon="mdi:certificate" :label="$t('pt.profile.experience')">
                {{ mockProfile.experienceValue }}
              </InfoItem>
              <InfoItem icon="mdi:heart-pulse" :label="$t('pt.profile.clientsAgeRange')">
                {{ mockProfile.clientsAgeRangeValue }}
              </InfoItem>
            </div>
            <div class="space-y-4">
              <InfoItem icon="mdi:calendar-clock" :label="$t('pt.profile.availability')">
                {{ mockProfile.availabilityValue }}
              </InfoItem>
              <InfoItem icon="mdi:account-group" :label="$t('pt.profile.clientCapacity')">
                {{ mockProfile.clientCapacityValue }}
              </InfoItem>
              <InfoItem icon="mdi:star-shooting" :label="$t('pt.profile.successRate')">
                {{ mockProfile.successRateValue }}
              </InfoItem>
            </div>
          </div>
        </Card>

        <!-- Progress Analytics -->
        <Card>
          <h3 class="text-xl font-semibold mb-6 text-header-dark dark:text-white">
            {{ $t('pt.profile.clientProgressAnalytics') }}
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
            <MetricCard
              :title="$t('pt.profile.averageProgress')"
              value="78%"
              trend="+4.2%"
              icon="mdi:chart-line"
              color="text-success"
            />
            <MetricCard
              :title="$t('pt.profile.engagementRate')"
              value="89%"
              trend="-1.5%"
              icon="mdi:account-clock"
              color="text-primary-600"
            />
          </div>
          <ClientProgressChart />
        </Card>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Quick Stats -->
        <Card >
          <h3 class="text-xl font-semibold mb-6 text-header-dark dark:text-white">
            {{ $t('pt.profile.quickStats') }}
          </h3>
          <div class="space-y-4">
            <StatItem
              icon="mdi:currency-usd"
              :label="$t('pt.profile.monthlyEarnings')"
              :value="mockProfile.monthlyEarningsValue"
              percentage="+12%"
            />
            <StatItem
              icon="mdi:video-wireless"
              :label="$t('pt.profile.sessionsCompleted')"
              :value="mockProfile.sessionsCompletedValue"
              percentage="+23%"
            />
            <StatItem
              icon="mdi:message-text"
              :label="$t('pt.profile.clientMessages')"
              :value="mockProfile.clientMessagesValue"
              status="warning"
            />
          </div>
        </Card>

        <!-- Notifications -->
        <Card>
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-header-dark dark:text-white">
              {{ $t('pt.profile.recentNotifications') }}
            </h3>
            <button class="text-primary hover:text-primary-700">
              {{ $t('pt.profile.viewAll') }}
            </button>
          </div>
          <div class="space-y-4">
            <NotificationItem
              type="message"
              :title="$t('pt.profile.newMessage')"
              :time="mockProfile.timeAgo('2h')"
              unread
            />
            <NotificationItem
              type="payment"
              :title="$t('pt.profile.paymentReceived', { amount: '$250' })"
              :time="mockProfile.timeAgo('5h')"
            />
            <NotificationItem
              type="system"
              :title="$t('pt.profile.systemMaintenance')"
              :time="mockProfile.timeAgo('1d')"
            />
          </div>
        </Card>

        <!-- Social Verification -->
        <Card >
          <h3 class="text-xl font-semibold mb-6 text-header-dark dark:text-white">
            {{ $t('pt.profile.socialVerification') }}
          </h3>
          <div class="flex flex-col gap-4">
            <SocialVerification
              platform="Instagram"
              :handle="mockProfile.social.instagram.handle"
              :verified="mockProfile.social.instagram.verified"
              :followers="mockProfile.social.instagram.followers"
            />
            <SocialVerification
              platform="LinkedIn"
              :handle="mockProfile.social.linkedin.handle"
              :verified="mockProfile.social.linkedin.verified"
              :followers="mockProfile.social.linkedin.followers"
            />
            <SocialVerification
              platform="YouTube"
              :handle="mockProfile.social.youtube.handle"
              :followers="mockProfile.social.youtube.followers"
            />
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import ClientProgressChart from '@/components/pt/subscriber/ClientProgressChart.vue'
import InfoItem from '@/components/pt/home/InfoItem.vue'
import MetricCard from '@/components/pt/home/MetricCard.vue'
import StatItem from '@/components/pt/home/StatItem.vue'
import NotificationItem from '@/components/pt/home/NotificationItem.vue'
import SocialVerification from '@/components/pt/profile/SocialVerification.vue'
import Card from '@/components/common/Card.vue'

// Mock profile data for the profile page, now only containing dynamic parts
const mockProfile = {
  profileBanner: "https://example.com/path-to-banner.jpg",
  profilePhoto: "https://i.pravatar.cc/150",
  trainerName: "Alex Morgan",
  trainerTitle: "Certified Personal Trainer",
  specializationValue: "Functional Training and Bodybuilding",
  experienceValue: "5 Years",
  clientsAgeRangeValue: "18 - 55 years",
  availabilityValue: "Mon - Fri, 07:00 - 19:00",
  clientCapacityValue: "15 active clients",
  successRateValue: "92%",
  monthlyEarningsValue: "$4,820",
  sessionsCompletedValue: "68",
  clientMessagesValue: "24",
  timeAgo: (time: string) => `${time} ago`,
  social: {
    instagram: { handle: '@alex_fitpro', verified: true, followers: "12.8k" },
    linkedin: { handle: 'Alex-Morgan-Fitness', verified: true, followers: "8.2k" },
    youtube: { handle: 'Alex Fitness', verified: false, followers: "23.4k" }
  }
}
</script>
