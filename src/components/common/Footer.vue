<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-8 h-8 flex items-center justify-center text-white">
              <Icon icon="fluent:dumbbell-28-regular" class="w-full h-full" />
            </div>
            <span class="text-2xl font-bold">FitJourney</span>
          </div>
          <p class="text-gray-400 mb-4">{{ $t('footer.description') }}</p>
          <div class="flex space-x-4">
            <a
              v-for="(icon, index) in socialLinks"
              :key="index"
              :href="icon.href"
              class="text-gray-400 hover:text-white transition-colors"
            >
              <Icon :icon="icon.icon" class="w-6 h-6" />
            </a>
          </div>
        </div>

        <!-- Link Sections -->
        <div
          v-for="(section, index) in linkSections"
          :key="index"
          class="col-span-1"
        >
          <h3 class="text-lg font-semibold mb-4">{{ $t(section.title) }}</h3>
          <ul class="space-y-2">
            <li v-for="(item, i) in section.items" :key="i">
              <component
                :is="item.type === 'router' ? 'router-link' : 'a'"
                :to="item.type === 'router' ? item.href : undefined"
                :href="item.type === 'link' ? item.href : undefined"
                class="text-gray-400 hover:text-white transition-colors"
              >
                {{ $t(item.label) }}
              </component>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-gray-800 text-center">
        <p class="text-gray-400">{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const socialLinks = [
  { icon: 'mdi:facebook', href: '#' },
  { icon: 'mdi:twitter', href: '#' },
  { icon: 'mdi:instagram', href: '#' },
  { icon: 'mdi:linkedin', href: '#' },
]

const linkSections = [
  {
    title: 'footer.company.name',
    items: [
      { label: 'footer.company.aboutUs', href: '#', type: 'link' },
      { label: 'footer.company.careers', href: '#', type: 'link' },
      { label: 'footer.company.blog', href: '#', type: 'link' },
      { label: 'footer.company.press', href: '#', type: 'link' },
    ],
  },
  {
    title: 'footer.resources.name',
    items: [
      { label: 'footer.resources.helpCenter', href: '#', type: 'link' },
      { label: 'footer.resources.fitnessGuides', href: '#', type: 'link' },
      { label: 'footer.resources.coachResources', href: '#', type: 'link' },
      { label: 'footer.resources.apiDocs', href: '#', type: 'link' },
    ],
  },
  {
    title: 'footer.legal.name',
    items: [
      { label: 'footer.links.privacy', href: '#', type: 'router' },
      { label: 'footer.links.terms', href: '#', type: 'router' },
      { label: 'footer.links.contact', href: '#', type: 'router' },
      { label: 'footer.links.gdpr', href: '#', type: 'link' },
    ],
  },
]
</script>
