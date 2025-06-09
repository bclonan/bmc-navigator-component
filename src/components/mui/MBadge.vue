<template>
  <div class="relative inline-flex">
    <slot />
    <span 
      v-if="showBadge"
      :class="badgeClasses"
      :style="badgeStyles"
    >
      <slot name="badge">
        {{ displayContent }}
      </slot>
    </span>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MBadge',
  props: {
    badgeContent: {
      type: [String, Number],
      default: null
    },
    color: {
      type: String,
      default: 'error',
      validator: (value) => ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(value)
    },
    max: {
      type: Number,
      default: 99
    },
    showZero: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'standard',
      validator: (value) => ['standard', 'dot'].includes(value)
    },
    overlap: {
      type: String,
      default: 'rectangular',
      validator: (value) => ['circular', 'rectangular'].includes(value)
    },
    anchorOrigin: {
      type: Object,
      default: () => ({ vertical: 'top', horizontal: 'right' }),
      validator: (value) => {
        return ['top', 'bottom'].includes(value.vertical) && 
               ['left', 'right'].includes(value.horizontal);
      }
    },
    invisible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const colorMap = {
      default: 'bg-gray-500',
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
      error: 'bg-red-600',
      info: 'bg-cyan-600',
      success: 'bg-green-600',
      warning: 'bg-orange-600'
    };

    const showBadge = computed(() => {
      if (props.invisible) return false;
      if (props.variant === 'dot') return true;
      if (props.badgeContent === null || props.badgeContent === undefined) return false;
      if (props.badgeContent === 0 && !props.showZero) return false;
      return true;
    });

    const displayContent = computed(() => {
      if (props.variant === 'dot') return '';
      if (typeof props.badgeContent === 'number' && props.badgeContent > props.max) {
        return `${props.max}+`;
      }
      return props.badgeContent;
    });

    const badgeClasses = computed(() => [
      'absolute z-10 flex items-center justify-center text-white text-xs font-medium leading-none',
      colorMap[props.color],
      props.variant === 'dot' 
        ? 'w-2 h-2 rounded-full' 
        : 'min-w-5 h-5 px-1 rounded-full',
      // Position classes based on anchor origin
      props.anchorOrigin.vertical === 'top' ? '-top-1' : '-bottom-1',
      props.anchorOrigin.horizontal === 'right' ? '-right-1' : '-left-1',
      // Overlap adjustments
      props.overlap === 'circular' 
        ? (props.anchorOrigin.vertical === 'top' ? '-top-0.5' : '-bottom-0.5')
        : ''
    ]);

    const badgeStyles = computed(() => {
      const styles = {};
      
      // Fine-tune positioning based on anchor origin
      if (props.anchorOrigin.vertical === 'top' && props.anchorOrigin.horizontal === 'right') {
        styles.transform = 'translate(50%, -50%)';
      } else if (props.anchorOrigin.vertical === 'top' && props.anchorOrigin.horizontal === 'left') {
        styles.transform = 'translate(-50%, -50%)';
      } else if (props.anchorOrigin.vertical === 'bottom' && props.anchorOrigin.horizontal === 'right') {
        styles.transform = 'translate(50%, 50%)';
      } else if (props.anchorOrigin.vertical === 'bottom' && props.anchorOrigin.horizontal === 'left') {
        styles.transform = 'translate(-50%, 50%)';
      }

      return styles;
    });

    return {
      showBadge,
      displayContent,
      badgeClasses,
      badgeStyles
    };
  }
};
</script>