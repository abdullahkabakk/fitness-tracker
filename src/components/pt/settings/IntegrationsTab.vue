<script setup lang="ts">

import IntegrationItem from '@/components/pt/settings/IntegrationItem.vue'
import SocialIntegration from '@/components/pt/settings/SocialIntegration.vue'
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.connectedAccounts') }}
      </h3>
      <div class="space-y-4">
        <IntegrationItem
          platform="Google"
          description="Calendar and email integration"
          connected
        />
        <IntegrationItem
          platform="Zoom"
          description="Video session integration"
          connected
        />
        <IntegrationItem
          platform="Stripe"
          description="Payment processing"
        />
      </div>
    </div>

    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        {{ $t('pt.settings.socialMedia') }}
      </h3>
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <SocialIntegration
          platform="Instagram"
          :connected="true"
          handle="@fitness_pro"
        />
        <SocialIntegration
          platform="YouTube"
          :connected="false"
        />
        <SocialIntegration
          platform="LinkedIn"
          :connected="true"
          handle="alex-fitness-pro"
        />
      </div>
    </div>
  </div>
</template>
