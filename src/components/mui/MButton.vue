<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    v-bind="$attrs"
    :style="yourtownfinanceFinanceStyles"
  >
    <span v-if="loading" class="inline-flex items-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {{ loadingText || text }}
    </span>
    <span v-else class="inline-flex items-center">
      <i v-if="icon" :class="[icon, { 'mr-2': text }]"></i>
      {{ text }}
    </span>
  </button>
</template>

<script>
import { computed } from 'vue';
import { SIZE_CLASSES, COLOR_CLASSES } from './utils/constants.js';

export default {
  name: 'MButton',
  inheritAttrs: false,
  emits: ['click'],
  props: {
    text: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'filled',
      validator: value => ['filled', 'outlined', 'text'].includes(value)
    },
    color: {
      type: String,
      default: 'primary',
      validator: value => ['default', 'primary', 'secondary', 'success', 'error', 'info', 'warning'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    loadingText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const buttonClasses = computed(() => {
      const baseClasses = [
        'm-button',
        'inline-flex',
        'items-center',
        'justify-center',
        'font-medium',
        'rounded',
        'transition-all',
        'duration-200',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2'
      ];

      // Size classes
      const sizeMap = {
        small: ['px-3', 'py-1.5', 'text-sm'],
        medium: ['px-4', 'py-2', 'text-base'],
        large: ['px-6', 'py-3', 'text-lg']
      };
      baseClasses.push(...sizeMap[props.size]);

      // Color and variant classes
      if (COLOR_CLASSES[props.variant] && COLOR_CLASSES[props.variant][props.color]) {
        const colorClass = COLOR_CLASSES[props.variant][props.color];
        if (typeof colorClass === 'string') {
          baseClasses.push(colorClass);
        }
      }

      // Disabled state
      if (props.disabled) {
        baseClasses.push('opacity-50', 'cursor-not-allowed');
      }

      // Full width
      if (props.fullWidth) {
        baseClasses.push('w-full');
      }

      return baseClasses;
    });

    const yourtownfinanceFinanceStyles = computed(() => {
      const styles = {};
      
      // Apply Your Town Finance brand colors based on variant and color
      if (props.variant === 'filled' || props.variant === 'primary') {
        if (props.color === 'primary') {
          styles.backgroundColor = 'var(--mf-primary)';
          styles.color = 'white';
        } else if (props.color === 'secondary') {
          styles.backgroundColor = 'var(--mf-secondary)';
          styles.color = 'white';
        } else if (props.color === 'success') {
          styles.backgroundColor = 'var(--mf-success)';
          styles.color = 'white';
        } else if (props.color === 'warning') {
          styles.backgroundColor = 'var(--mf-warning)';
          styles.color = 'var(--mf-text-primary)';
        }
      } else if (props.variant === 'outlined') {
        if (props.color === 'primary') {
          styles.borderColor = 'var(--mf-primary)';
          styles.color = 'var(--mf-primary)';
          styles.borderWidth = '2px';
        } else if (props.color === 'secondary') {
          styles.borderColor = 'var(--mf-secondary)';
          styles.color = 'var(--mf-secondary)';
          styles.borderWidth = '2px';
        }
      }

      return styles;
    });

    const handleClick = (event) => {
      if (!props.disabled && !props.loading) {
        emit('click', event);
      }
    };

    return {
      buttonClasses,
      yourtownfinanceFinanceStyles,
      handleClick
    };
  }
};
</script>

<style scoped>
.m-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: var(--mf-shadow-2, 0 4px 8px rgba(0, 0, 0, 0.12));
}

.m-button:active:not(:disabled) {
  transform: translateY(0);
}

.m-button:focus {
  box-shadow: var(--mf-shadow-focus, 0 0 0 3px rgba(56, 96, 190, 0.2));
}

/* Your Town Finance specific hover states */
.m-button[style*="--mf-primary"]:hover:not(:disabled) {
  background-color: var(--mf-primary-dark) !important;
}

.m-button[style*="--mf-secondary"]:hover:not(:disabled) {
  background-color: var(--mf-secondary-dark) !important;
}
</style>