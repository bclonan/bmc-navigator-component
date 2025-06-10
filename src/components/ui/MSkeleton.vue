<template>
  <div
    class="m-skeleton"
    :class="skeletonClasses"
    :style="skeletonStyles"
    :aria-label="ariaLabel"
    role="status"
    aria-live="polite"
  >
    <!-- Shimmer animation overlay -->
    <div v-if="animated" class="skeleton-shimmer"></div>
    
    <!-- Content slot for custom skeleton shapes -->
    <slot v-if="$slots.default"></slot>
  </div>
</template>

<script>
export default {
  name: 'MSkeleton',
  props: {
    /**
     * Variant of skeleton
     */
    variant: {
      type: String,
      default: 'rectangular',
      validator: (value) => [
        'circular',
        'rectangular', 
        'rounded',
        'text',
        'card',
        'avatar',
        'button',
        'table-row',
        'list-item'
      ].includes(value)
    },
    
    /**
     * Width of skeleton
     */
    width: {
      type: [String, Number],
      default: '100%'
    },
    
    /**
     * Height of skeleton
     */
    height: {
      type: [String, Number],
      default: null
    },
    
    /**
     * Enable shimmer animation
     */
    animated: {
      type: Boolean,
      default: true
    },
    
    /**
     * Animation speed
     */
    animationSpeed: {
      type: String,
      default: 'normal',
      validator: (value) => ['slow', 'normal', 'fast'].includes(value)
    },
    
    /**
     * Number of lines for text variant
     */
    lines: {
      type: Number,
      default: 1
    },
    
    /**
     * Last line width for text variant
     */
    lastLineWidth: {
      type: [String, Number],
      default: '75%'
    },
    
    /**
     * Custom border radius
     */
    borderRadius: {
      type: [String, Number],
      default: null
    },
    
    /**
     * Theme color
     */
    color: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'light', 'dark'].includes(value)
    },
    
    /**
     * Accessibility label
     */
    ariaLabel: {
      type: String,
      default: 'Loading content...'
    }
  },
  
  computed: {
    skeletonClasses() {
      const classes = ['skeleton-base'];
      
      // Variant classes
      classes.push(`skeleton-${this.variant}`);
      
      // Color theme
      classes.push(`skeleton-${this.color}`);
      
      // Animation speed
      if (this.animated) {
        classes.push(`skeleton-${this.animationSpeed}`);
      }
      
      return classes;
    },
    
    skeletonStyles() {
      const styles = {};
      
      // Dimensions
      if (this.width) {
        styles.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      }
      
      if (this.height) {
        styles.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      }
      
      // Custom border radius
      if (this.borderRadius) {
        styles.borderRadius = typeof this.borderRadius === 'number' 
          ? `${this.borderRadius}px` 
          : this.borderRadius;
      }
      
      return styles;
    },
    
    defaultHeight() {
      const heights = {
        text: '1em',
        button: '40px',
        avatar: '40px',
        'table-row': '48px',
        'list-item': '56px',
        card: '200px',
        rectangular: '100px',
        rounded: '100px',
        circular: '40px'
      };
      
      return heights[this.variant] || '20px';
    }
  },
  
  mounted() {
    // Set default height if not provided
    if (!this.height && this.$el) {
      this.$el.style.height = this.defaultHeight;
    }
  }
};
</script>

<style scoped>
.skeleton-base {
  position: relative;
  overflow: hidden;
  background: linear-gradient(90deg, 
    var(--skeleton-bg-start, #f0f0f0) 25%, 
    var(--skeleton-bg-mid, #e0e0e0) 50%, 
    var(--skeleton-bg-start, #f0f0f0) 75%
  );
  background-size: 200% 100%;
}

/* Theme variations */
.skeleton-default {
  --skeleton-bg-start: #f0f0f0;
  --skeleton-bg-mid: #e0e0e0;
  --skeleton-shimmer: rgba(255, 255, 255, 0.6);
}

.skeleton-light {
  --skeleton-bg-start: #f8f9fa;
  --skeleton-bg-mid: #e9ecef;
  --skeleton-shimmer: rgba(255, 255, 255, 0.8);
}

.skeleton-dark {
  --skeleton-bg-start: #374151;
  --skeleton-bg-mid: #4b5563;
  --skeleton-shimmer: rgba(255, 255, 255, 0.1);
}

/* Variant styles */
.skeleton-circular {
  border-radius: var(--border-radius-1);
  aspect-ratio: 1;
}

.skeleton-rectangular {
  border-radius: 0;
}

.skeleton-rounded {
  border-radius: var(--border-radius-3);
}

.skeleton-text {
  border-radius: var(--border-radius-2);
  height: 1em !important;
}

.skeleton-button {
  border-radius: var(--border-radius-2);
  height: 40px;
}

.skeleton-avatar {
  border-radius: var(--border-radius-1);
  width: 40px;
  height: 40px;
}

.skeleton-card {
  border-radius: var(--border-radius-3);
  min-height: 200px;
}

.skeleton-table-row {
  border-radius: var(--border-radius-2);
  height: 48px;
}

.skeleton-list-item {
  border-radius: var(--border-radius-3);
  height: 56px;
}

/* Animation speeds */
.skeleton-slow .skeleton-shimmer {
  animation-duration: 2.5s;
}

.skeleton-normal .skeleton-shimmer {
  animation-duration: 1.5s;
}

.skeleton-fast .skeleton-shimmer {
  animation-duration: 1s;
}

/* Shimmer animation */
.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--skeleton-shimmer, rgba(255, 255, 255, 0.6)) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Pulse animation for non-shimmer skeletons */
.skeleton-base:not(.skeleton-slow):not(.skeleton-normal):not(.skeleton-fast) {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Dark theme adjustments */
@media (prefers-color-scheme: dark) {
  .skeleton-default {
    --skeleton-bg-start: #374151;
    --skeleton-bg-mid: #4b5563;
    --skeleton-shimmer: rgba(255, 255, 255, 0.1);
  }
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .skeleton-card {
    min-height: 150px;
  }
  
  .skeleton-list-item {
    height: 48px;
  }
}
</style>
