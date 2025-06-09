<template>
  <div 
    :class="avatarClasses"
    :style="avatarStyles"
    @click="handleClick"
  >
    <img 
      v-if="src && !imageError" 
      :src="src" 
      :alt="alt"
      @error="onImageError"
      class="w-full h-full object-cover"
    />
    <div v-else-if="children || $slots.default" class="flex items-center justify-center w-full h-full">
      <slot>{{ children }}</slot>
    </div>
    <div v-else class="flex items-center justify-center w-full h-full">
      {{ fallbackText }}
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { SIZE_CLASSES, COLOR_CLASSES, validateColor, validateSize } from './utils/constants.js';

export default {
  name: 'MAvatar',
  props: {
    alt: {
      type: String,
      default: ''
    },
    children: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: 'circular',
      validator: (value) => ['circular', 'rounded', 'square'].includes(value)
    },
    size: {
      type: [String, Number],
      default: 'medium',
      validator: (value) => {
        if (typeof value === 'number') return true;
        return ['small', 'medium', 'large'].includes(value);
      }
    },
    color: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(value)
    },
    clickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const imageError = ref(false);

    const sizeMap = {
      small: 'w-8 h-8 text-sm',
      medium: 'w-10 h-10 text-base',
      large: 'w-14 h-14 text-lg'
    };

    const colorMap = {
      default: 'bg-gray-200 text-gray-700',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-purple-600 text-white',
      success: 'bg-green-600 text-white',
      error: 'bg-red-600 text-white',
      info: 'bg-cyan-600 text-white',
      warning: 'bg-orange-600 text-white'
    };

    const variantMap = {
      circular: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none'
    };

    const avatarClasses = computed(() => [
      'inline-flex items-center justify-center font-medium select-none overflow-hidden',
      typeof props.size === 'string' ? sizeMap[props.size] : '',
      variantMap[props.variant],
      colorMap[props.color],
      props.clickable ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
    ]);

    const avatarStyles = computed(() => {
      if (typeof props.size === 'number') {
        return {
          width: `${props.size}px`,
          height: `${props.size}px`,
          fontSize: `${Math.max(props.size * 0.4, 12)}px`
        };
      }
      return {};
    });

    const fallbackText = computed(() => {
      if (props.children) return props.children;
      if (props.alt) return props.alt.charAt(0).toUpperCase();
      return '?';
    });

    const onImageError = () => {
      imageError.value = true;
    };

    const handleClick = (event) => {
      if (props.clickable) {
        emit('click', event);
      }
    };

    return {
      imageError,
      avatarClasses,
      avatarStyles,
      fallbackText,
      onImageError,
      handleClick
    };
  }
};
</script>