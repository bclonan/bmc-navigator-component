<template>
  <Transition
    :name="transitionName"
    :mode="mode"
    :appear="appear"
    :duration="transitionDuration"
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @before-leave="onBeforeLeave"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <slot v-bind="{ isEntering, isLeaving, phase }" />
  </Transition>
</template>

<script>
export default {
  name: 'MMotionTransition',
  
  props: {
    /**
     * Transition preset name
     */
    name: {
      type: String,
      default: 'fade',
      validator: (value) => [
        'fade',
        'slide-up',
        'slide-down', 
        'slide-left',
        'slide-right',
        'scale',
        'zoom',
        'flip',
        'bounce',
        'elastic',
        'shake',
        'pulse',
        'custom'
      ].includes(value)
    },
    
    /**
     * Transition mode
     */
    mode: {
      type: String,
      default: null,
      validator: (value) => !value || ['in-out', 'out-in'].includes(value)
    },
    
    /**
     * Show transition on initial render
     */
    appear: {
      type: Boolean,
      default: false
    },
    
    /**
     * Transition duration in milliseconds
     */
    duration: {
      type: [Number, Object],
      default: 300
    },
    
    /**
     * Animation easing function
     */
    easing: {
      type: String,
      default: 'ease-out',
      validator: (value) => [
        'linear',
        'ease',
        'ease-in',
        'ease-out',
        'ease-in-out',
        'cubic-bezier'
      ].some(preset => value.includes(preset))
    },
    
    /**
     * Custom transition classes
     */
    customClasses: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * Delay before transition starts
     */
    delay: {
      type: Number,
      default: 0
    },
    
    /**
     * Stagger animation delay for multiple elements
     */
    stagger: {
      type: Number,
      default: 0
    },
    
    /**
     * Enable GPU acceleration
     */
    gpu: {
      type: Boolean,
      default: true
    }
  },
  
  emits: [
    'before-enter',
    'enter', 
    'after-enter',
    'before-leave',
    'leave',
    'after-leave'
  ],
  
  data() {
    return {
      isEntering: false,
      isLeaving: false,
      phase: 'idle',
      staggerIndex: 0
    };
  },
  
  computed: {
    transitionName() {
      if (this.name === 'custom') {
        return this.customClasses.name || 'motion-custom';
      }
      return `motion-${this.name}`;
    },
    
    transitionDuration() {
      if (typeof this.duration === 'object') {
        return this.duration;
      }
      
      return {
        enter: this.duration + this.delay,
        leave: this.duration
      };
    }
  },
  
  methods: {
    onBeforeEnter(el) {
      this.isEntering = true;
      this.isLeaving = false;
      this.phase = 'before-enter';
      
      if (this.gpu) {
        el.style.willChange = 'transform, opacity';
      }
      
      if (this.delay > 0) {
        el.style.transitionDelay = `${this.delay}ms`;
      }
      
      if (this.stagger > 0) {
        el.style.transitionDelay = `${this.staggerIndex * this.stagger}ms`;
        this.staggerIndex++;
      }
      
      this.$emit('before-enter', el);
    },
    
    onEnter(el, done) {
      this.phase = 'entering';
      
      // Force reflow
      el.offsetHeight;
      
      el.style.transitionDuration = `${this.duration}ms`;
      el.style.transitionTimingFunction = this.easing;
      
      if (done) {
        el.addEventListener('transitionend', done);
      }
      
      this.$emit('enter', el, done);
    },
    
    onAfterEnter(el) {
      this.isEntering = false;
      this.phase = 'entered';
      
      if (this.gpu) {
        el.style.willChange = '';
      }
      
      el.style.transitionDelay = '';
      
      this.$emit('after-enter', el);
    },
    
    onBeforeLeave(el) {
      this.isLeaving = true;
      this.isEntering = false;
      this.phase = 'before-leave';
      
      if (this.gpu) {
        el.style.willChange = 'transform, opacity';
      }
      
      this.$emit('before-leave', el);
    },
    
    onLeave(el, done) {
      this.phase = 'leaving';
      
      el.style.transitionDuration = `${this.duration}ms`;
      el.style.transitionTimingFunction = this.easing;
      
      if (done) {
        el.addEventListener('transitionend', done);
      }
      
      this.$emit('leave', el, done);
    },
    
    onAfterLeave(el) {
      this.isLeaving = false;
      this.phase = 'left';
      
      if (this.gpu) {
        el.style.willChange = '';
      }
      
      this.staggerIndex = 0;
      
      this.$emit('after-leave', el);
    }
  }
};
</script>

<style scoped>
/* Fade transition */
.motion-fade-enter-active,
.motion-fade-leave-active {
  transition: opacity var(--duration, 300ms) var(--easing, ease-out);
}

.motion-fade-enter-from,
.motion-fade-leave-to {
  opacity: 0;
}

/* Slide transitions */
.motion-slide-up-enter-active,
.motion-slide-up-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.motion-slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.motion-slide-down-enter-active,
.motion-slide-down-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.motion-slide-down-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.motion-slide-left-enter-active,
.motion-slide-left-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-slide-left-enter-from {
  transform: translateX(20px);
  opacity: 0;
}

.motion-slide-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.motion-slide-right-enter-active,
.motion-slide-right-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-slide-right-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.motion-slide-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/* Scale transition */
.motion-scale-enter-active,
.motion-scale-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-scale-enter-from,
.motion-scale-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

/* Zoom transition */
.motion-zoom-enter-active,
.motion-zoom-leave-active {
  transition: all var(--duration, 300ms) var(--easing, ease-out);
}

.motion-zoom-enter-from {
  transform: scale(0);
  opacity: 0;
}

.motion-zoom-leave-to {
  transform: scale(1.1);
  opacity: 0;
}

/* Flip transition */
.motion-flip-enter-active,
.motion-flip-leave-active {
  transition: all var(--duration, 600ms) var(--easing, ease-out);
  transform-style: preserve-3d;
}

.motion-flip-enter-from {
  transform: rotateY(180deg);
  opacity: 0;
}

.motion-flip-leave-to {
  transform: rotateY(-180deg);
  opacity: 0;
}

/* Bounce transition */
.motion-bounce-enter-active {
  animation: bounce-in var(--duration, 600ms) var(--easing, ease-out);
}

.motion-bounce-leave-active {
  animation: bounce-out var(--duration, 300ms) var(--easing, ease-in);
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  80% {
    transform: scale(0.95);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.3);
    opacity: 0;
  }
}

/* Elastic transition */
.motion-elastic-enter-active {
  animation: elastic-in var(--duration, 800ms) var(--easing, ease-out);
}

.motion-elastic-leave-active {
  animation: elastic-out var(--duration, 400ms) var(--easing, ease-in);
}

@keyframes elastic-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  55% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  70% {
    transform: scale(0.9);
    opacity: 0.9;
  }
  80% {
    transform: scale(1.05);
    opacity: 0.95;
  }
  90% {
    transform: scale(0.98);
    opacity: 0.98;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes elastic-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}

/* Shake transition (for errors) */
.motion-shake-enter-active {
  animation: shake var(--duration, 500ms) var(--easing, ease-out);
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-5px);
  }
  20%, 40%, 60%, 80% {
    transform: translateX(5px);
  }
}

/* Pulse transition */
.motion-pulse-enter-active {
  animation: pulse var(--duration, 1000ms) var(--easing, ease-out);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* GPU acceleration helper */
.motion-fade-enter-active,
.motion-fade-leave-active,
.motion-slide-up-enter-active,
.motion-slide-up-leave-active,
.motion-slide-down-enter-active,
.motion-slide-down-leave-active,
.motion-slide-left-enter-active,
.motion-slide-left-leave-active,
.motion-slide-right-enter-active,
.motion-slide-right-leave-active,
.motion-scale-enter-active,
.motion-scale-leave-active,
.motion-zoom-enter-active,
.motion-zoom-leave-active,
.motion-flip-enter-active,
.motion-flip-leave-active {
  will-change: transform, opacity;
}
</style>
