<script setup lang="ts">
import { Icon } from '@iconify/vue';
import Button from '../common/Button.vue';

// Props for customization
interface Props {
  titleKey?: string; // i18n key for the title
  descriptionKey?: string; // i18n key for the description
  primaryButtonTextKey?: string; // i18n key for the primary button
  secondaryButtonTextKey?: string; // i18n key for the secondary button (optional)
  primaryButtonLink?: string;
  secondaryButtonLink?: string;
  showBackground?: boolean;
}

// Define default props
withDefaults(defineProps<Props>(), {
  titleKey: 'common.cta.defaultTitle',
  descriptionKey: 'common.cta.defaultDescription',
  primaryButtonTextKey: 'common.cta.getStarted',
  secondaryButtonTextKey: '',
  primaryButtonLink: '#',
  secondaryButtonLink: '#',
  showBackground: true
});

</script>

<template>
  <section class="bg-gray-100 dark:bg-gray-800/70 py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        <!-- Text content -->
        <div class="flex-1 text-center md:text-left">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-white mb-4">
            {{ $t(titleKey) }}
          </h2>
          <p class="text-lg md:text-xl dark:text-white/90 mb-6 max-w-2xl">
            {{ $t(descriptionKey) }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 justify-center md:justify-start">
            <Button
              v-if="primaryButtonTextKey"
              :to="primaryButtonLink"
              variant="primary"
              size="lg"
              class="font-medium flex shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {{ $t(primaryButtonTextKey) }}
              <Icon icon="material-symbols:arrow-forward" class="ml-2 my-auto w-5 h-5" />
            </Button>

            <Button
              v-if="secondaryButtonTextKey"
              :to="secondaryButtonLink"
              variant="outline"
              size="lg"
            >
              {{ $t(secondaryButtonTextKey) }}
            </Button>
          </div>
        </div>

        <!-- Optional slot for additional content -->
        <div v-if="$slots.media" class="flex-1">
          <slot name="media"></slot>
        </div>
      </div>
    </div>
  </section>
</template>
