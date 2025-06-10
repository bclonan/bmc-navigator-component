<template>
  <div
    class="m-motion-feedback"
    :class="feedbackClasses"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="handleClick"
  >
    <MMotionTransition
      :name="transitionType"
      :duration="duration"
      :appear="appear"
    >
      <slot v-bind="{ state, isActive, isHovered, isFocused }" />
    </MMotionTransition>
    
    <!-- Feedback indicators -->
    <div v-if="showIndicators" class="feedback-indicators">
      <!-- Success indicator -->
      <MMotionTransition name="scale" :duration="200">
        <div
          v-if="state === 'success'"
          class="feedback-indicator success"
          :style="indicatorStyle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      </MMotionTransition>
      
      <!-- Error indicator -->
      <MMotionTransition name="shake" :duration="500">
        <div
          v-if="state === 'error'"
          class="feedback-indicator error"
          :style="indicatorStyle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
      </MMotionTransition>
      
      <!-- Loading indicator -->
      <MMotionTransition name="scale" :duration="200">
        <div
          v-if="state === 'loading'"
          class="feedback-indicator loading"
          :style="indicatorStyle"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" stroke-dasharray="40" stroke-dashoffset="40">
              <animateTransform
                attributeName="transform"
                type="rotate"
                dur="1s"
                values="0 12 12;360 12 12"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </MMotionTransition>
    </div>
    
    <!-- Progress indicator -->
    <div
      v-if="showProgress && progress !== null"
      class="feedback-progress"
      :class="progressClasses"
    >
      <div
        class="progress-bar"
        :style="{ width: `${progress}%` }"
      />
    </div>
  </div>
</template>

<script>
import MMotionTransition from './MMotionTransition.vue';

export default {
  name: 'MMotionFeedback',
  components: {
    MMotionTransition
  },
  
  props: {
    /**
     * Current state
     */
    state: {
      type: String,
      default: 'idle',
      validator: (value) => [
        'idle',
        'active', 
        'loading',
        'success',
        'error',
        'warning',
        'disabled'
      ].includes(value)
    },
    
    /**
     * Enable hover effects
     */
    hover: {
      type: Boolean,
      default: true
    },
    
    /**
     * Enable focus effects
     */
    focus: {
      type: Boolean,
      default: true
    },
    
    /**
     * Enable click effects
     */
    clickable: {
      type: Boolean,
      default: true
    },
    
    /**
     * Feedback intensity
     */
    intensity: {
      type: String,
      default: 'medium',
      validator: (value) => ['subtle', 'medium', 'strong'].includes(value)
    },
    
    /**
     * Animation duration
     */
    duration: {
      type: Number,
      default: 200
    },
    
    /**
     * Transition type
     */
    transitionType: {
      type: String,
      default: 'scale',
      validator: (value) => [
        'fade',
        'scale',
        'slide-up',
        'bounce',
        'elastic'
      ].includes(value)
    },
    
    /**
     * Show state indicators
     */
    showIndicators: {
      type: Boolean,
      default: false
    },
    
    /**
     * Show progress bar
     */
    showProgress: {
      type: Boolean,
      default: false
    },
    
    /**
     * Progress percentage (0-100)
     */
    progress: {
      type: Number,
      default: null,
      validator: (value) => value === null || (value >= 0 && value <= 100)
    },
    
    /**
     * Indicator position
     */
    indicatorPosition: {
      type: String,
      default: 'top-right',
      validator: (value) => [
        'top-left',
        'top-right', 
        'bottom-left',
        'bottom-right',
        'center'
      ].includes(value)
    },
    
    /**
     * Auto-hide indicators after delay
     */
    autoHide: {
      type: Boolean,
      default: true
    },
    
    /**
     * Auto-hide delay in ms
     */
    autoHideDelay: {
      type: Number,
      default: 2000
    },
    
    /**
     * Appear on mount
     */
    appear: {
      type: Boolean,
      default: false
    }
  },
  
  emits: [
    'hover',
    'focus',
    'blur',
    'click',
    'state-change'
  ],
  
  data() {
    return {
      isHovered: false,
      isFocused: false,
      isActive: false,
      autoHideTimer: null
    };
  },
  
  computed: {
    feedbackClasses() {
      return [
        'motion-feedback-base',
        `feedback-state-${this.state}`,
        `feedback-intensity-${this.intensity}`,
        {
          'feedback-hover': this.hover && this.isHovered,
          'feedback-focus': this.focus && this.isFocused,
          'feedback-active': this.isActive,
          'feedback-clickable': this.clickable,
          'feedback-disabled': this.state === 'disabled'
        }
      ];
    },
    
    progressClasses() {
      return [
        'progress-base',
        `progress-${this.state}`
      ];
    },
    
    indicatorStyle() {
      const positions = {
        'top-left': { top: '8px', left: '8px' },
        'top-right': { top: '8px', right: '8px' },
        'bottom-left': { bottom: '8px', left: '8px' },
        'bottom-right': { bottom: '8px', right: '8px' },
        'center': { 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)' 
        }
      };
      
      return positions[this.indicatorPosition] || positions['top-right'];
    }
  },
  
  watch: {
    state: {
      handler(newState, oldState) {
        if (newState !== oldState) {
          this.$emit('state-change', { newState, oldState });
          
          if (this.autoHide && ['success', 'error'].includes(newState)) {
            this.scheduleAutoHide();
          }
        }
      },
      immediate: true
    }
  },
  
  beforeUnmount() {
    this.clearAutoHideTimer();
  },
  
  methods: {
    handleMouseEnter(event) {
      if (this.hover && this.state !== 'disabled') {
        this.isHovered = true;
        this.$emit('hover', { type: 'enter', event });
      }
    },
    
    handleMouseLeave(event) {
      if (this.hover) {
        this.isHovered = false;
        this.$emit('hover', { type: 'leave', event });
      }
    },
    
    handleFocus(event) {
      if (this.focus && this.state !== 'disabled') {
        this.isFocused = true;
        this.$emit('focus', event);
      }
    },
    
    handleBlur(event) {
      if (this.focus) {
        this.isFocused = false;
        this.$emit('blur', event);
      }
    },
    
    handleClick(event) {
      if (this.clickable && this.state !== 'disabled') {
        this.isActive = true;
        
        // Reset active state after animation
        setTimeout(() => {
          this.isActive = false;
        }, this.duration);
        
        this.$emit('click', event);
      }
    },
    
    scheduleAutoHide() {
      this.clearAutoHideTimer();
      
      this.autoHideTimer = setTimeout(() => {
        this.$emit('state-change', { 
          newState: 'idle', 
          oldState: this.state,
          autoHide: true 
        });
      }, this.autoHideDelay);
    },
    
    clearAutoHideTimer() {
      if (this.autoHideTimer) {
        clearTimeout(this.autoHideTimer);
        this.autoHideTimer = null;
      }
    }
  }
};
</script>

<style scoped>
.motion-feedback-base {
  position: relative;
  transition: var(--transition-16);
  cursor: inherit;
}

/* State variants */
.feedback-state-idle {
  display: block;
}

.feedback-state-active {
  transform: scale(0.98);
}

.feedback-state-loading {
  opacity: 0.8;
}

.feedback-state-success {
  display: block;
}

.feedback-state-error {
  display: block;
}

.feedback-state-warning {
  display: block;
}

.feedback-state-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Interaction states */
.feedback-hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feedback-focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.feedback-clickable {
  cursor: pointer;
}

.feedback-active {
  transform: scale(0.95);
}

/* Intensity variants */
.feedback-intensity-subtle .feedback-hover {
  transform: translateY(-0.5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feedback-intensity-medium .feedback-hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.feedback-intensity-strong .feedback-hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* Indicators */
.feedback-indicators {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.feedback-indicator {
  position: absolute;
  width: var(--vspace-24);
  height: var(--vspace-24);
  border-radius: var(--border-radius-1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  z-index: 10;
}

.feedback-indicator svg {
  width: var(--vspace-16);
  height: var(--vspace-16);
}

.feedback-indicator.success {
  background: var(--success-color);
}

.feedback-indicator.error {
  background: var(--error-color);
}

.feedback-indicator.loading {
  background: var(--primary-color);
}

/* Progress indicator */
.feedback-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--vspace-4);
  background: var(--color-grey-area);
  border-radius: var(--border-radius-1);
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  transition: var(--transition-12);
}

.progress-base .progress-bar {
  background: var(--primary-color);
}

.progress-loading .progress-bar {
  background: var(--primary-color);
}

.progress-success .progress-bar {
  background: var(--success-color);
}

.progress-error .progress-bar {
  background: var(--error-color);
}

.progress-warning .progress-bar {
  background: var(--warning-color);
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .feedback-focus {
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.3);
  }
  
  .feedback-progress {
    background: var(--color-vulcan);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .motion-feedback-base,
  .feedback-indicator,
  .progress-bar {
    transition: none;
    animation: none;
  }
  
  .feedback-hover {
    transform: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .feedback-indicator {
    width: var(--vspace-20);
    height: var(--vspace-20);
  }
  
  .feedback-indicator svg {
    width: var(--vspace-12);
    height: var(--vspace-12);
  }
  
  .feedback-intensity-strong .feedback-hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}
</style>
