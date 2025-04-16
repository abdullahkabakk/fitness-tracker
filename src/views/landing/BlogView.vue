<script setup lang="ts">
import { ref, computed } from 'vue';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  readTime: number;
  likes: number;
}

// Mock data for blog posts
const blogPosts = ref<BlogPost[]>([
  {
    id: 1,
    title: "The Ultimate Guide to Progressive Overload for Muscle Growth",
    excerpt: "Learn how to properly implement progressive overload techniques to maximize your strength and muscle gains.",
    content: "Progressive overload is the gradual increase of stress placed upon the body during exercise training...",
    author: {
      name: "Alex Johnson",
      avatar: "/api/placeholder/80/80",
      role: "Head Fitness Coach"
    },
    category: "Strength Training",
    tags: ["muscle growth", "strength", "workout tips"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-03-15T08:00:00.000Z",
    readTime: 7,
    likes: 243
  },
  {
    id: 2,
    title: "Nutrition Strategies for Your Fitness Clients",
    excerpt: "Discover effective ways to help your clients stick to their nutrition plans for better results.",
    content: "Creating effective nutrition plans is only half the battle. The real challenge is helping clients stick to them...",
    author: {
      name: "Sophia Rodriguez",
      avatar: "/api/placeholder/80/80",
      role: "Nutrition Specialist"
    },
    category: "Nutrition",
    tags: ["meal planning", "client success", "habits"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-03-10T10:30:00.000Z",
    readTime: 5,
    likes: 187
  },
  {
    id: 3,
    title: "5 Ways to Keep Your Clients Motivated Through Plateaus",
    excerpt: "Learn practical strategies to help your clients push through challenging plateaus and stay motivated.",
    content: "Fitness plateaus are inevitable in every client's journey. Here's how to help them break through...",
    author: {
      name: "Marcus Wei",
      avatar: "/api/placeholder/80/80",
      role: "Motivation Coach"
    },
    category: "Client Management",
    tags: ["motivation", "plateaus", "coaching"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-03-05T09:15:00.000Z",
    readTime: 6,
    likes: 156
  },
  {
    id: 4,
    title: "Building Your Personal Training Business Through Social Media",
    excerpt: "A comprehensive guide to leveraging social platforms to grow your fitness business and client base.",
    content: "In today's digital age, having a strong social media presence is crucial for personal trainers...",
    author: {
      name: "Jasmine Taylor",
      avatar: "/api/placeholder/80/80",
      role: "Business Development"
    },
    category: "Business Growth",
    tags: ["social media", "marketing", "business"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-02-28T11:45:00.000Z",
    readTime: 8,
    likes: 219
  },
  {
    id: 5,
    title: "Effective Recovery Techniques for High-Performance Athletes",
    excerpt: "Explore advanced recovery methods to help your athletic clients perform at their best consistently.",
    content: "Recovery is just as important as training when it comes to athletic performance...",
    author: {
      name: "David Chen",
      avatar: "/api/placeholder/80/80",
      role: "Performance Specialist"
    },
    category: "Recovery",
    tags: ["recovery", "athletes", "performance"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-02-20T14:00:00.000Z",
    readTime: 6,
    likes: 201
  },
  {
    id: 6,
    title: "The Science of Heart Rate Training for Endurance",
    excerpt: "Learn how to implement heart rate zone training for optimal endurance results with your clients.",
    content: "Heart rate training is one of the most effective methods for improving cardiovascular fitness...",
    author: {
      name: "Emma Wilson",
      avatar: "/api/placeholder/80/80",
      role: "Endurance Coach"
    },
    category: "Cardio",
    tags: ["heart rate", "endurance", "cardio"],
    imageUrl: "/api/placeholder/800/500",
    publishedAt: "2025-02-15T16:30:00.000Z",
    readTime: 7,
    likes: 178
  }
]);

// Category filters
const categories = ref([
  "All",
  "Strength Training",
  "Nutrition",
  "Client Management",
  "Business Growth",
  "Recovery",
  "Cardio"
]);

const selectedCategory = ref("All");
const searchQuery = ref("");

const filteredPosts = computed(() => {
  return blogPosts.value.filter(post => {
    const matchesCategory = selectedCategory.value === "All" || post.category === selectedCategory.value;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.value.toLowerCase()));

    return matchesCategory && matchesSearch;
  });
});

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const featuredPost = computed(() => {
  return blogPosts.value.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current;
  });
});

const popularTags = computed(() => {
  const allTags = blogPosts.value.flatMap(post => post.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(entry => entry[0]);
});

</script>

<template>
    <!-- Header -->
    <header class="bg-gradient-to-r mt-22 from-primary to-blue-500 dark:from-primary-900 dark:to-blue-800 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Fitness Coach Insights</h1>
          <p class="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Expert tips and strategies to help personal trainers elevate their coaching and grow their business
          </p>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div>
        <!-- Featured Post -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-8 text-gray-800 dark:text-gray-100">Featured Article</h2>
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div class="md:flex">
              <div class="md:w-1/2">
                <img
                  src="https://picsum.photos/id/1013/800/200"
                  :alt="featuredPost.title"
                  class="h-64 md:h-full w-full object-cover"
                >
              </div>
              <div class="md:w-1/2 p-8">
                <div class="flex items-center mb-4">
                  <span class="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-100 text-xs font-semibold px-3 py-1 rounded-full">
                    {{ featuredPost.category }}
                  </span>
                  <span class="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(featuredPost.publishedAt) }}
                  </span>
                </div>
                <h3 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{{ featuredPost.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-6">{{ featuredPost.excerpt }}</p>
                <div class="flex items-center">
                  <img :src="`https://randomuser.me/api/portraits/men/20.jpg`"
                       :alt="featuredPost.author.name" class="w-10 h-10 rounded-full">
                  <div class="ml-3">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ featuredPost.author.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ featuredPost.author.role }}</p>
                  </div>
                </div>
                <div class="mt-6 flex items-center">
                  <span class="flex items-center text-sm text-gray-500 dark:text-gray-400 mr-4">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ featuredPost.readTime }} min read
                  </span>
                  <span class="flex items-center text-sm text-red-500">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    {{ featuredPost.likes }}
                  </span>
                </div>
                <button class="mt-6 px-6 py-2 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-lg hover:from-primary-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Filters Section -->
        <section class="mb-12">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                ]"
              >
                {{ category }}
              </button>
            </div>
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search articles..."
                class="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
              <div class="absolute right-3 top-2.5 text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Posts Grid -->
        <section class="mb-16">
          <div v-if="filteredPosts.length === 0" class="text-center py-12">
            <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 class="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">No articles found</h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              v-for="(post, idx) in filteredPosts"
              :key="post.id"
              class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <img
                :src="`https://picsum.photos/id/${idx + 1010}/800/200`"
                :alt="post.title"
                class="h-48 w-full object-cover"
              >
              <div class="p-6">
                <div class="flex items-center mb-3">
                  <span class="text-xs font-semibold px-2 py-0.5 rounded-full" :class="{
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100': post.category === 'Strength Training',
                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100': post.category === 'Nutrition',
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100': post.category === 'Client Management',
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100': post.category === 'Business Growth',
                    'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100': post.category === 'Recovery',
                    'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100': post.category === 'Cardio',
                  }">
                    {{ post.category }}
                  </span>
                  <span class="ml-3 text-xs text-gray-500 dark:text-gray-400">
                    {{ formatDate(post.publishedAt) }}
                  </span>
                </div>
                <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">{{ post.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">{{ post.excerpt }}</p>
                <div class="flex items-center">
                  <img
                       :src="`https://picsum.photos/id/${44 + idx}/200/200`"

                       :alt="post.author.name" class="w-8 h-8 rounded-full">
                  <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ post.author.name }}</span>
                </div>
                <div class="flex justify-between items-center mt-4 text-xs text-gray-500 dark:text-gray-400">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    {{ post.readTime }} min read
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                    </svg>
                    {{ post.likes }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Popular Tags Section -->
        <section class="mb-16">
          <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Popular Topics</h2>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="tag in popularTags"
              :key="tag"
              class="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              @click="searchQuery = tag"
            >
              #{{ tag }}
            </span>
          </div>
        </section>

        <!-- Newsletter Section -->
        <section class="bg-gradient-to-r from-primary to-blue-500 rounded-2xl p-8 text-white dark:bg-primary-900 dark:to-blue-800">
          <div class="md:flex items-center">
            <div class="md:w-2/3 mb-6 md:mb-0">
              <h2 class="text-2xl font-bold mb-2">Stay Updated</h2>
              <p class="opacity-90">Get the latest fitness training tips and business strategies delivered to your inbox.</p>
            </div>
            <div class="md:w-1/3">
              <div class="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  class="flex-grow px-4 py-3 bg-white rounded-l-lg text-gray-900 focus:outline-none"
                >
                <button class="px-4 py-3 bg-gray-900 text-white font-medium rounded-r-lg hover:bg-gray-800 transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
</template>
