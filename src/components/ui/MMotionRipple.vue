<template>
  <div
    class="m-motion-ripple"
    :class="motionClasses"
    @click="handleClick"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <slot />
    
    <!-- Ripple effects -->
    <div
      v-for="ripple in ripples"
      :key="ripple.id"
      class="ripple-effect"
      :style="ripple.style"
      @animationend="removeRipple(ripple.id)"
    />
  </div>
</template>

<script>
export default {
  name: 'MMotionRipple',
  
  props: {
    /**
     * Enable ripple effect
     */
    disabled: {
      type: Boolean,
      default: false
    },
    
    /**
     * Ripple color
     */
    color: {
      type: String,
      default: 'rgba(0, 0, 0, 0.2)'
    },
    
    /**
     * Ripple size multiplier
     */
    size: {
      type: Number,
      default: 1,
      validator: (value) => value > 0
    },
    
    /**
     * Animation duration (ms)
     */
    duration: {
      type: Number,
      default: 600
    },
    
    /**
     * Center the ripple
     */
    center: {
      type: Boolean,
      default: false
    },
    
    /**
     * Enable on hover
     */
    hover: {
      type: Boolean,
      default: false
    },
    
    /**
     * Unbounded ripple effect
     */
    unbounded: {
      type: Boolean,
      default: false
    }
  },
  
  emits: ['click', 'ripple-start', 'ripple-end'],
  
  data() {
    return {
      ripples: [],
      rippleCounter: 0
    };
  },
  
  computed: {
    motionClasses() {
      return [
        'motion-ripple-base',
        {
          'motion-ripple-disabled': this.disabled,
          'motion-ripple-unbounded': this.unbounded
        }
      ];
    }
  },
  
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.createRipple(event);
        this.$emit('click', event);
      }
    },
    
    handleMouseDown(event) {
      if (!this.disabled && !this.hover) {
        this.createRipple(event);
      }
    },
    
    handleMouseUp() {
      // Can be used for additional effects
    },
    
    handleMouseLeave() {
      // Clear any pending hover effects
    },
    
    handleTouchStart(event) {
      if (!this.disabled) {
        this.createRipple(event);
      }
    },
    
    handleTouchEnd() {
      // Can be used for additional effects
    },
    
    createRipple(event) {
      const rect = this.$el.getBoundingClientRect();
      const { clientX, clientY } = event.touches ? event.touches[0] : event;
      
      let x, y;
      
      if (this.center) {
        x = rect.width / 2;
        y = rect.height / 2;
      } else {
        x = clientX - rect.left;
        y = clientY - rect.top;
      }
      
      const radius = this.unbounded 
        ? Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2))
        : Math.sqrt(Math.pow(Math.max(x, rect.width - x), 2) + Math.pow(Math.max(y, rect.height - y), 2));
      
      const ripple = {
        id: ++this.rippleCounter,
        style: {
          left: `${x}px`,
          top: `${y}px`,
          width: `${radius * 2 * this.size}px`,
          height: `${radius * 2 * this.size}px`,
          backgroundColor: this.color,
          animationDuration: `${this.duration}ms`
        }
      };
      
      this.ripples.push(ripple);
      this.$emit('ripple-start', ripple);
    },
    
    removeRipple(id) {
      const index = this.ripples.findIndex(ripple => ripple.id === id);
      if (index > -1) {
        const ripple = this.ripples[index];
        this.ripples.splice(index, 1);
        this.$emit('ripple-end', ripple);
      }
    }
  }
};
</script>

<style scoped>
.motion-ripple-base {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.motion-ripple-disabled {
  cursor: default;
}

.motion-ripple-unbounded {
  overflow: visible;
}

.ripple-effect {
  position: absolute;
  border-radius: var(--border-radius-1);
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0);
  animation: ripple-animation var(--duration, 600ms) ease-out;
}

@keyframes ripple-animation {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}

/* Focus ripple for accessibility */
.motion-ripple-base:focus:not(.motion-ripple-disabled) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}
</style>
