<template>
  <section class="py-20 bg-gradient-to-b from-white to-primary-50 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 py-6 lg:px-8 lg:py-10">
      <SectionTitleSubtitle
        :title="$t('home.blog.title')"
        :subtitle="$t('home.blog.subtitle')"
      />

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(post, index) in blogPosts"
          :key="index"
          class="flex flex-col justify-between h-full bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all"
        >
          <img
            :src="post.banner"
            alt="Blog Post Image"
            class="w-full h-48 object-cover rounded-t-xl"
          />
          <div class="p-6">
            <div class="flex items-center gap-3 mb-4">
              <Icon :icon="post.icon" class="text-3xl text-primary dark:text-primary" />
              <h3 class="text-xl font-semibold text-gray-800 dark:text-white">
                {{ $t(`home.blog.articles.${post.title}`) }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{ $t(`home.blog.articles.${post.description}`) }}
            </p>
          </div>
          <div class="px-6 pb-6">
            <button
              class="inline-block cursor-pointer mt-4 text-primary dark:text-primary text-sm font-medium hover:underline transition"
            >
              {{$t('home.blog.readMore')}} →
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionTitleSubtitle from '@/components/common/SectionTitleSubtitle.vue'
import { Icon } from '@iconify/vue'
import { blogPosts } from '@/helpers/blogPosts.ts'
</script>
