<template>
  <div class="flex flex-col bg-gray-50 rounded-lg h-[calc(100vh-40rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-4rem)]">
    <!-- Coaches List Header (Mobile) -->
    <div class="md:hidden p-4 bg-gradient-to-tr from-blue-400 to-cyan-500 text-white">
      <h1 class="text-xl font-bold">Fitness Chat</h1>
    </div>

    <!-- Main Container -->
    <div class="flex flex-1 h-full min-h[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      <!-- Coaches List -->
      <div
        class="w-full md:w-96 rounded-lg flex flex-col border-r border-gray-200 bg-white transition-all"
        :class="{ 'hidden md:flex': selectedCoach, 'flex': !selectedCoach }"
      >
        <div class="p-3 hidden md:block">
          <div class="relative">
            <input
              type="text"
              placeholder="Search coaches..."
              class="w-full p-2 pl-10 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
            <Icon icon="mdi:magnify" class="absolute left-3 top-3 text-gray-400 w-5 h-5"/>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto">
          <div
            v-for="coach in coaches"
            :key="coach.id"
            @click="selectCoach(coach)"
            class="flex items-center p-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100"
            :class="{ 'bg-blue-50': selectedCoach?.id === coach.id }"
          >
            <div class="relative flex-shrink-0">
              <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 flex items-center justify-center text-white">
                <span>{{ coach.name.charAt(0) }}</span>
              </div>
              <div v-if="coach.online" class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>

            <div class="ml-3 flex-1 min-w-0">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-800 truncate">{{ coach.name }}</h3>
                <span class="text-xs text-gray-500 whitespace-nowrap">{{ coach.lastMessage.time }}</span>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-gray-600 truncate">
                  {{ coach.lastMessage.content }}
                </p>
                <div v-if="coach.unread" class="bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs ml-2">
                  {{ coach.unread }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Container -->
      <div
        v-if="selectedCoach"
        class="flex-1 flex flex-col bg-white transition-all"
        :class="{ 'hidden md:flex': !selectedCoach, 'flex': selectedCoach }"
      >
        <!-- Chat Header -->
        <div class="flex items-center justify-between p-3 bg-white border-b border-gray-200">
          <div class="flex items-center">
            <button
              @click="selectedCoach = null"
              class="md:hidden mr-3 text-gray-600 hover:text-gray-800"
            >
              <Icon icon="mdi:arrow-left" class="w-6 h-6"/>
            </button>
            <div class="relative">
              <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 to-cyan-500 flex items-center justify-center text-white">
                <span>{{ selectedCoach?.name.charAt(0) }}</span>
              </div>
              <div v-if="selectedCoach?.online" class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div class="ml-3">
              <h2 class="font-semibold text-gray-800 truncate">{{ selectedCoach?.name }}</h2>
              <p class="text-xs text-gray-500">
                <span v-if="selectedCoach?.isTyping" class="text-blue-500">typing...</span>
                <span v-else>{{ selectedCoach?.online ? 'Online' : `Last seen ${selectedCoach?.lastActive}` }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-1.5 hover:bg-gray-100 rounded-full hidden md:inline-flex">
              <Icon icon="mdi:phone" class="w-6 h-6 text-gray-600"/>
            </button>
            <button class="p-1.5 hover:bg-gray-100 rounded-full hidden md:inline-flex">
              <Icon icon="mdi:video" class="w-6 h-6 text-gray-600"/>
            </button>
          </div>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-3 bg-gray-100">
          <div
            v-for="message in selectedCoach?.messages"
            :key="message.id"
            class="flex mb-3"
            :class="{ 'justify-end': message.sender === 'user' }"
          >
            <div
              class="max-w-[85%] rounded-2xl p-3 text-sm"
              :class="{
                'bg-gradient-to-tr from-blue-400 to-cyan-500 text-white': message.sender === 'user',
                'bg-white': message.sender === 'coach'
              }"
            >
              <p>{{ message.content }}</p>
              <div class="flex items-center justify-end gap-1.5 mt-1.5">
                <span class="text-xs opacity-75">{{ message.time }}</span>
                <span v-if="message.sender === 'user'" class="flex items-center gap-1 text-xs">
                  <Icon
                    v-if="message.status === 'read'"
                    icon="mdi:check-all"
                    class="w-3.5 h-3.5 text-blue-300"
                  />
                  <Icon
                    v-else
                    icon="mdi:check"
                    class="w-3.5 h-3.5 text-gray-400"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <div class="p-3 bg-white border-t border-gray-200">
          <div class="flex items-center gap-2">
            <button class="p-1.5 text-gray-600 hover:text-blue-500">
              <Icon icon="mdi:plus-circle" class="w-6 h-6"/>
            </button>
            <input
              v-model="newMessage"
              @keyup.enter="sendMessage"
              type="text"
              placeholder="Type a message"
              class="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
            <button
              @click="sendMessage"
              class="p-1.5 text-blue-500 hover:text-blue-600"
              :disabled="!newMessage"
            >
              <Icon icon="mdi:send" class="w-6 h-6"/>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="!selectedCoach"
        class="hidden md:flex rounded-r-lg flex-1 items-center justify-center bg-gray-200/80"
      >
        <div class="text-center text-gray-500">
          <Icon icon="mdi:chat-outline" class="w-16 h-16 mx-auto mb-4"/>
          <p class="text-xl">Select a coach to start chatting</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Coach {
  id: number
  name: string
  specialty: string
  online: boolean
  unread: number
  avatar?: string
  lastActive: string
  isTyping: boolean
  lastMessage: {
    content: string
    time: string
    sender: 'user' | 'coach'
    status: 'sent' | 'delivered' | 'read'
  }
  messages: Message[]
}

interface Message {
  id: number
  content: string
  sender: 'user' | 'coach'
  time: string
  status?: 'sent' | 'delivered' | 'read'
}

const coaches = ref<Coach[]>([
  {
    id: 1,
    name: 'Michael Johnson',
    specialty: 'Strength Training',
    online: true,
    unread: 2,
    lastActive: '2:45 PM',
    isTyping: false,
    lastMessage: {
      content: 'Let me review your latest workout data',
      time: '2:30 PM',
      sender: 'coach',
      status: 'read'
    },
    messages: [
      {
        id: 1,
        content: 'Great progress this week!',
        sender: 'coach',
        time: '2:30 PM'
      },
      {
        id: 2,
        content: 'Thanks! Should I increase weights?',
        sender: 'user',
        time: '2:32 PM',
        status: 'read'
      }
    ]
  },
  // Add more coaches...
])

const selectedCoach = ref<Coach | null>(null)
const newMessage = ref('')

const selectCoach = (coach: Coach) => {
  coach.unread = 0
  selectedCoach.value = coach
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedCoach.value) return

  const message: Message = {
    id: Date.now(),
    content: newMessage.value.trim(),
    sender: 'user',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    status: 'sent'
  }

  selectedCoach.value.messages.push(message)
  selectedCoach.value.lastMessage = {
    content: message.content,
    time: message.time,
    sender: 'user',
    status: 'sent'
  }

  newMessage.value = ''
}
</script>

<style>
/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

</style>
