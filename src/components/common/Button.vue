<template>
  <button
    :class="[
      'rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md',
      fullWidth ? 'w-full' : '',
      className
    ]"
    :disabled="disabled"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary', 'outline', 'text'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['click']);

const click = (event: Event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-4 py-1.5 text-sm';
    case 'lg': return 'px-8 py-3 text-lg';
    default: return 'px-6 py-2 text-base';
  }
});

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary dark:bg-primary text-white hover:bg-primary/80 dark:hover:bg-primary/80 focus:ring-primary';
    case 'secondary':
      return 'bg-secondary dark:bg-secondary text-white hover:bg-secondary/80 dark:hover:bg-secondary/80 focus:ring-secondary';
    case 'outline-secondary':
      return 'border border-secondary dark:border-secondary text-secondary dark:text-secondary hover:bg-secondary-light/10 dark:hover:bg-secondary/10 focus:ring-secondary';
    case 'outline':
      return 'border border-primary dark:border-primary text-primary dark:text-primary hover:bg-primary-light/10 dark:hover:bg-primary/10 focus:ring-primary';
    case 'text':
      return 'text-primary dark:text-primary hover:bg-primary-hover dark:hover:bg-gray-800 focus:ring-purple-400';
    default:
      return 'bg-primary dark:bg-primary text-white hover:bg-primary/80 dark:hover:bg-primary focus:ring-primary';
  }
});
</script>
