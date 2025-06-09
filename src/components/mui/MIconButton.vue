<template>
  <button
    :class="iconButtonClasses"
    :disabled="disabled"
    @click="handleClick"
    v-bind="$attrs"
  >
    <slot>
      <i v-if="icon" :class="icon" />
    </slot>
  </button>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MIconButton',
  inheritAttrs: false,
  props: {
    color: {
      type: String,
      default: 'default',
      validator: (value) => ['inherit', 'default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    edge: {
      type: String,
      default: false,
      validator: (value) => [false, 'start', 'end'].includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const colorMap = {
      inherit: 'text-inherit hover:bg-gray-100',
      default: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      primary: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
      secondary: 'text-purple-600 hover:bg-purple-50 hover:text-purple-700',
      error: 'text-red-600 hover:bg-red-50 hover:text-red-700',
      info: 'text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700',
      success: 'text-green-600 hover:bg-green-50 hover:text-green-700',
      warning: 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
    };

    const sizeMap = {
      small: 'p-1 text-sm',
      medium: 'p-2 text-base',
      large: 'p-3 text-lg'
    };

    const iconButtonClasses = computed(() => [
      'inline-flex items-center justify-center rounded-full transition-colors duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      sizeMap[props.size],
      colorMap[props.color],
      props.disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer',
      props.edge === 'start' ? '-ml-2' : '',
      props.edge === 'end' ? '-mr-2' : ''
    ]);

    const handleClick = (event) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };

    return {
      iconButtonClasses,
      handleClick
    };
  }
};
</script>