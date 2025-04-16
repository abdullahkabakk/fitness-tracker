<template>
  <div class="w-full h-full flex flex-col bg-white dark:bg-header-dark rounded-lg shadow-sm hover:shadow-lg overflow-hidden">
    <!-- Chat header -->
    <div class="flex items-center hfull justify-between border-b border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-header-dark">
      <div class="flex items-center space-x-3">
        <img
          :src="selectedChat?.avatar || 'https://i.pravatar.cc/40'"
          alt="Student avatar"
          class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700"
        />
        <div>
          <h3 class="font-medium text-gray-900 dark:text-gray-100">
            {{ selectedChat?.name || $t('pt.chat.selectConversation') }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            <span v-if="selectedChat?.isOnline" class="flex items-center">
              <span class="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
              {{ $t('pt.chat.online') }}
            </span>
            <span v-else>
              {{ $t('pt.chat.lastActive') }} {{ formatLastSeen(selectedChat?.lastSeen) }}
            </span>
          </p>
        </div>
      </div>
      <div class="flex space-x-2">
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon icon="mdi:phone-outline" class="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon icon="mdi:video-outline" class="text-xl text-gray-600 dark:text-gray-300" />
        </button>
        <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon icon="mdi:dots-vertical" class="text-xl text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>

    <!-- Chat container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Chat list sidebar -->
      <div
        class="absolute md:relative z-20 w-fit md:w-80 h-full bg-white dark:bg-header-dark border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out"
        :class="{
          'translate-x-0': showSidebar,
          '-translate-x-full md:translate-x-0': !showSidebar
        }"
      >
        <div class="p-4 bg-white dark:bg-header-dark">
          <div class="relative">
            <input
              type="text"
              :placeholder="$t('pt.chat.search')"
              class="w-full px-4 py-2 pl-10 rounded-lg bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-900 dark:text-gray-100"
            />
            <Icon
              icon="mdi:magnify"
              class="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
            />
          </div>
        </div>

        <div class="divide-y divide-gray-200 dark:divide-gray-700">
          <div
            v-for="chat in chats"
            :key="chat.id"
            @click="selectChat(chat)"
            :class="[
              'flex items-center p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-header-dark transition-colors',
              selectedChat?.id === chat.id ? 'bg-gray-100 dark:bg-header-dark' : ''
            ]"
          >
            <div class="relative flex-shrink-0">
              <img :src="chat.avatar" alt="Avatar" class="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700" />
              <span
                v-if="chat.isOnline"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"
              ></span>
            </div>
            <div class="ml-4 flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate">{{ chat.name }}</h4>
                <span class="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {{ formatChatTime(chat.time) }}
                </span>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {{ chat.lastMessage }}
                </p>
                <span
                  v-if="chat.unread"
                  class="bg-primary-light/80 text-white text-xs rounded-full px-2 py-1 min-w-[24px] flex items-center justify-center"
                >
                  {{ chat.unread }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Messages area -->
      <div class="flex-1 flex flex-col bg-gray-50 dark:bg-header-dark">
        <!-- Mobile header -->
        <div class="md:hidden flex items-center p-4 bg-white dark:bg-header-dark border-b border-gray-200 dark:border-gray-700">
          <button
            @click="showSidebar = true"
            class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Icon icon="mdi:arrow-left" class="text-xl text-gray-600 dark:text-gray-300" />
          </button>
          <div class="ml-2 flex items-center space-x-3">
            <img
              :src="selectedChat?.avatar || 'https://i.pravatar.cc/40'"
              alt="Student avatar"
              class="w-10 h-10 rounded-full"
            />
            <div>
              <h3 class="font-medium text-gray-900 dark:text-gray-100">{{ selectedChat?.name || $t('pt.chat.selectConversation') }}</h3>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ selectedChat?.isOnline ? $t('pt.chat.online') : $t('pt.chat.lastActive') + ' ' +  formatLastSeen(selectedChat?.lastSeen) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Messages container -->
        <div v-if="selectedChat" class="flex-1 p-4 overflow-y-auto space-y-4">
          <div v-for="(message, index) in messages" :key="index">
            <div
              :class="[
                'flex',
                message.sender === 'coach' ? 'justify-end' : 'justify-start'
              ]"
            >
              <div
                :class="[
                  'max-w-[80%] md:max-w-[60%] px-4 py-2 rounded-xl relative',
                  message.sender === 'coach'
                    ? 'bg-primary-600 dark:bg-background-dark bg-white text-white rounded-br-none'
                    : 'bg-white dark:bg-primary-500 border border-gray-200 dark:border-gray-700 rounded-bl-none'
                ]"
              >
                <p class="text-gray-900 dark:text-gray-100">{{ message.content }}</p>
                <div class="flex items-center justify-end space-x-1 mt-2">
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ formatMessageTime(message.time) }}
                  </span>
                  <Icon
                    v-if="message.sender === 'coach'"
                    :icon="getMessageStatusIcon(message.status)"
                    class="w-3 h-3 text-white dark:text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="flex-1 flex flex-col items-center justify-center p-8">
          <Icon icon="mdi:chat-outline" class="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
          <p class="text-gray-500 dark:text-gray-400 text-center">
            {{ $t('pt.chat.selectConversationPrompt') }}
          </p>
        </div>

        <!-- Message input -->
        <div v-if="selectedChat" class="p-4 bg-white dark:bg-header-dark border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-2">
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Icon icon="mdi:attachment" class="text-xl text-gray-600 dark:text-gray-300" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Icon icon="mdi:emoticon-outline" class="text-xl text-gray-600 dark:text-gray-300" />
            </button>
            <div class="flex-1 relative">
              <input
                type="text"
                v-model="newMessage"
                :placeholder="$t('pt.chat.messagePlaceholder')"
                class="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-gray-900 dark:text-gray-100"
                @keyup.enter="sendMessage"
              />
            </div>
            <button
              @click="sendMessage"
              class="p-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            >
              <Icon icon="mdi:send" class="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

interface Chat {
  id: number
  name: string
  avatar: string
  isOnline: boolean
  lastSeen?: string
  lastMessage: string
  time: string
  unread?: number
}

interface Message {
  sender: 'coach' | 'student'
  content: string
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

const { locale } = useI18n()
const showSidebar = ref(false)
const selectedChat = ref<Chat | null>(null)
const messages = ref<Message[]>([])
const newMessage = ref('')

// Update dayjs locale when app locale changes
watch(locale, (newLocale) => {
  dayjs.locale(newLocale)
})

const getMessageStatusIcon = (status) => {
  const icons = {
    sent: 'mdi:check',
    delivered: 'mdi:check-all',
    read: 'mdi:check-all'
  }
  return icons[status] || 'mdi:clock-outline'
}
const formatLastSeen = (date?: string) => {
  if (!date) return ''

  const now = new Date()
  const past = new Date(date)
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })

  const ranges = [
    { seconds: 60, divisor: 1, unit: 'second' },
    { seconds: 3600, divisor: 60, unit: 'minute' },
    { seconds: 86400, divisor: 3600, unit: 'hour' },
    { seconds: 604800, divisor: 86400, unit: 'day' },
    { seconds: 2592000, divisor: 604800, unit: 'week' },
    { seconds: 31536000, divisor: 2592000, unit: 'month' },
    { seconds: Infinity, divisor: 31536000, unit: 'year' }
  ] as const

  for (const range of ranges) {
    if (diffInSeconds < range.seconds) {
      const value = -Math.floor(diffInSeconds / range.divisor)
      return rtf.format(value, range.unit as Intl.RelativeTimeFormatUnit)
    }
  }

  return ''
}

const formatMessageTime = (date: string) => {
  const dt = new Date(date)
  return dt.toLocaleTimeString(locale.value, {
    hour: 'numeric',
    minute: '2-digit',
  })
}

const formatChatTime = (date: string) => {
  const dt = new Date(date)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(today.getDate() - 1)

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()

  if (isSameDay(dt, today)) {
    return dt.toLocaleTimeString(locale.value, {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (isSameDay(dt, yesterday)) {
    return 'Yesterday'
  }

  return dt.toLocaleDateString(locale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Updated mock data with proper timestamps
const chats = reactive<Chat[]>([
  {
    id: 1,
    name: 'Emma Wilson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isOnline: true,
    lastMessage: 'How was today\'s workout?',
    time: dayjs().toISOString(),
    lastSeen: dayjs().subtract(1, 'hour').toISOString(),
    unread: 2
  },
  {
    id: 2,
    name: 'Tom Harris',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isOnline: false,
    lastSeen: dayjs().subtract(1, 'day').toISOString(),
    lastMessage: 'I need to reschedule my session',
    time: dayjs().subtract(1, 'day').toISOString(),
    unread: 1
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=5',
    isOnline: true,
    lastMessage: 'Thanks for the new meal plan!',
    time: dayjs().subtract(2, 'days').toISOString(),
    lastSeen: dayjs().subtract(2, 'days').toISOString()
  },
  {
    id: 4,
    name: 'Michael Green',
    avatar: 'https://i.pravatar.cc/150?img=8',
    isOnline: false,
    lastMessage: 'I\'ll send you my progress photos',
    time: dayjs().subtract(3, 'days').toISOString(),
    lastSeen: dayjs().subtract(3, 'days').toISOString()
  },
  {
    id: 5,
    name: 'Jessica Peters',
    avatar: 'https://i.pravatar.cc/150?img=9',
    isOnline: false,
    lastMessage: 'Can we discuss my fitness goals?',
    time: dayjs().subtract(4, 'days').toISOString(),
    lastSeen: dayjs().subtract(4, 'days').toISOString()
  }
])

const selectChat = (chat: Chat) => {
  selectedChat.value = chat
  showSidebar.value = false

  // Load conversation history with proper timestamps
  messages.value = chat.id === 1 ? [
    { sender: 'student', content: 'Hey coach! How are you?', time: dayjs().subtract(30, 'minutes').toISOString() },
    { sender: 'coach', content: 'Doing great! How was your workout today?', time: dayjs().subtract(25, 'minutes').toISOString() },
    { sender: 'student', content: 'It was challenging but I managed to complete all sets!', time: dayjs().subtract(15, 'minutes').toISOString() },
    { sender: 'student', content: 'How was today\'s workout?', time: dayjs().subtract(10, 'minutes').toISOString() }
  ] :
  [
    { sender: 'student', content: 'I need to reschedule my session', time: dayjs().subtract(1, 'day').toISOString(), status: 'read'},
    { sender: 'coach', content: 'Sure! Let me know your availability.', time: dayjs().subtract(1, 'day').toISOString(), status: "read"}
  ]

  // Clear unread count
  const chatIndex = chats.findIndex(c => c.id === chat.id)
  if (chatIndex !== -1) {
    chats[chatIndex].unread = undefined
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedChat.value) return

  const now = dayjs()
  messages.value.push({
    sender: 'coach',
    content: newMessage.value,
    time: now.toISOString(),
    status: 'sent'
  })

  newMessage.value = ''

  // Simulate delivery status
  setTimeout(() => {
    const lastMessage = messages.value[messages.value.length - 1]
    lastMessage.status = 'delivered'
  }, 1000)

  // Simulate reply after a delay
  if (selectedChat.value.id === 1) {
    setTimeout(() => {
      messages.value.push({
        sender: 'student',
        content: 'Thanks for checking in! Will send you my stats soon.',
        time: dayjs().add(3, 'seconds').toISOString()
      })
    }, 3000)
  }
}
</script>
