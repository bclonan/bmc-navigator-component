<template>
  <div 
    :class="chipClasses"
    @click="handleClick"
  >
    <component 
      v-if="avatar" 
      :is="avatar"
      class="chip-avatar"
    />
    <span v-if="icon" :class="iconClasses">
      <i :class="icon" />
    </span>
    <span class="chip-label">
      <slot>{{ label }}</slot>
    </span>
    <button 
      v-if="deletable"
      @click.stop="handleDelete"
      :class="deleteClasses"
      :aria-label="deleteIcon ? '' : 'Delete'"
    >
      <i v-if="deleteIcon" :class="deleteIcon" />
      <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MChip',
  props: {
    label: {
      type: String,
      default: ''
    },
    avatar: {
      type: [String, Object],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    deleteIcon: {
      type: String,
      default: null
    },
    deletable: {
      type: Boolean,
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'filled',
      validator: (value) => ['filled', 'outlined'].includes(value)
    },
    color: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    }
  },
  emits: ['click', 'delete'],
  setup(props, { emit }) {
    const colorMap = {
      filled: {
        default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-purple-600 text-white hover:bg-purple-700',
        error: 'bg-red-600 text-white hover:bg-red-700',
        info: 'bg-cyan-600 text-white hover:bg-cyan-700',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-orange-600 text-white hover:bg-orange-700'
      },
      outlined: {
        default: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
        primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        secondary: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
        error: 'border border-red-600 text-red-600 hover:bg-red-50',
        info: 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50',
        success: 'border border-green-600 text-green-600 hover:bg-green-50',
        warning: 'border border-orange-600 text-orange-600 hover:bg-orange-50'
      }
    };

    const sizeMap = {
      small: 'h-6 text-xs px-2',
      medium: 'h-8 text-sm px-3',
      large: 'h-10 text-base px-4'
    };

    const chipClasses = computed(() => [
      'inline-flex items-center justify-center font-medium rounded-full transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
      sizeMap[props.size],
      colorMap[props.variant][props.color],
      props.disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : (props.clickable ? 'cursor-pointer' : ''),
      props.deletable ? 'pr-1' : ''
    ]);

    const iconClasses = computed(() => [
      'flex items-center justify-center mr-1',
      props.size === 'small' ? 'w-4 h-4' : props.size === 'large' ? 'w-5 h-5' : 'w-4 h-4'
    ]);

    const deleteClasses = computed(() => [
      'ml-1 p-0.5 rounded-full transition-colors',
      'hover:bg-black hover:bg-opacity-10 focus:outline-none focus:bg-black focus:bg-opacity-20',
      props.size === 'small' ? 'w-4 h-4' : 'w-5 h-5'
    ]);

    const handleClick = (event) => {
      if (!props.disabled && props.clickable) {
        emit('click', event);
      }
    };

    const handleDelete = (event) => {
      if (!props.disabled) {
        emit('delete', event);
      }
    };

    return {
      chipClasses,
      iconClasses,
      deleteClasses,
      handleClick,
      handleDelete
    };
  }
};
</script>

<style scoped>
.chip-avatar {
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
  margin-left: -0.25rem;
}

.chip-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>