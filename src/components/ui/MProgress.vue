<template>
  <div class="m-progress" :class="containerClasses">
    <!-- Label -->
    <div v-if="hasLabel" class="m-progress-label" :class="labelClasses">
      <span>{{ label }}</span>
      <span v-if="showPercentage" class="text-sm">{{ Math.round(percentage) }}%</span>
    </div>

    <!-- Linear Progress -->
    <div v-if="type === 'linear'" class="m-progress-linear" :class="linearClasses">
      <div class="m-progress-track" :class="trackClasses">
        <div 
          v-if="!indeterminate"
          class="m-progress-bar" 
          :class="barClasses"
          :style="{ width: `${percentage}%` }"
        ></div>
        <div v-else class="m-progress-bar-indeterminate" :class="barClasses"></div>
      </div>
    </div>

    <!-- Circular Progress -->
    <div v-else class="m-progress-circular" :class="circularClasses">
      <svg 
        class="m-progress-svg"
        :class="svgClasses"
        :width="circularSize" 
        :height="circularSize"
        viewBox="0 0 100 100"
      >
        <!-- Background circle -->
        <circle
          class="m-progress-circle-bg"
          :class="circleBgClasses"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke-width="strokeWidth"
        />
        
        <!-- Progress circle -->
        <circle
          v-if="!indeterminate"
          class="m-progress-circle"
          :class="circleClasses"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 50 50)"
        />
        
        <!-- Indeterminate circle -->
        <circle
          v-else
          class="m-progress-circle-indeterminate"
          :class="circleClasses"
          cx="50"
          cy="50"
          :r="circleRadius"
          fill="none"
          :stroke-width="strokeWidth"
          :stroke-dasharray="circumference * 0.25"
          transform="rotate(-90 50 50)"
        />
      </svg>
      
      <!-- Center content for circular -->
      <div v-if="hasCircularContent" class="m-progress-circular-content" :class="circularContentClasses">
        <slot name="circular-content">
          <span v-if="showPercentage" class="text-sm font-medium">{{ Math.round(percentage) }}%</span>
        </slot>
      </div>
    </div>

    <!-- Helper text -->
    <div v-if="helperText" class="m-progress-helper" :class="helperClasses">
      {{ helperText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MProgress',
  
  props: {
    type: {
      type: String,
      default: 'linear',
      validator: value => ['linear', 'circular'].includes(value)
    },
    value: {
      type: Number,
      default: 0,
      validator: value => value >= 0 && value <= 100
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error', 'info'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    showPercentage: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    strokeWidth: {
      type: Number,
      default: 4
    }
  },

  computed: {
    percentage() {
      return Math.max(0, Math.min(100, this.value));
    },

    hasLabel() {
      return this.label || this.showPercentage;
    },

    hasCircularContent() {
      return this.$slots['circular-content'] || this.showPercentage;
    },

    circularSize() {
      const sizes = {
        xs: 24,
        sm: 32,
        md: 48,
        lg: 64,
        xl: 80
      };
      return sizes[this.size] || sizes.md;
    },

    circleRadius() {
      return (100 - this.strokeWidth) / 2;
    },

    circumference() {
      return 2 * Math.PI * this.circleRadius;
    },

    strokeDashoffset() {
      return this.circumference - (this.percentage / 100) * this.circumference;
    },

    containerClasses() {
      return [
        'w-full'
      ];
    },

    labelClasses() {
      return [
        'flex justify-between items-center mb-2 text-sm font-medium text-gray-700'
      ];
    },

    linearClasses() {
      return [
        'w-full'
      ];
    },

    trackClasses() {
      const sizes = {
        xs: 'h-1',
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
        xl: 'h-4'
      };
      
      return [
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizes[this.size]
      ];
    },

    barClasses() {
      const colors = {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600',
        info: 'bg-cyan-600'
      };
      
      const baseClasses = [
        'h-full transition-all duration-300 ease-out',
        colors[this.color]
      ];
      
      if (this.striped) {
        baseClasses.push('bg-stripes');
      }
      
      if (this.animated) {
        baseClasses.push('animate-pulse');
      }
      
      return baseClasses;
    },

    circularClasses() {
      return [
        'relative inline-flex items-center justify-center'
      ];
    },

    svgClasses() {
      return [
        'transform -rotate-90'
      ];
    },

    circleBgClasses() {
      return [
        'stroke-gray-200'
      ];
    },

    circleClasses() {
      const colors = {
        primary: 'stroke-blue-600',
        secondary: 'stroke-gray-600',
        success: 'stroke-green-600',
        warning: 'stroke-yellow-600',
        error: 'stroke-red-600',
        info: 'stroke-cyan-600'
      };
      
      return [
        'transition-all duration-300 ease-out',
        colors[this.color],
        'stroke-linecap-round'
      ];
    },

    circularContentClasses() {
      return [
        'absolute inset-0 flex items-center justify-center text-gray-700'
      ];
    },

    helperClasses() {
      return [
        'mt-1 text-xs text-gray-500'
      ];
    }
  }
};
</script>

<style scoped>
.m-progress-bar-indeterminate {
  animation: indeterminate 2s linear infinite;
}

.m-progress-circle-indeterminate {
  animation: rotate 2s linear infinite;
}

.bg-stripes {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
    width: 50%;
  }
  50% {
    width: 30%;
  }
  100% {
    transform: translateX(100%);
    width: 50%;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(270deg);
  }
}
</style>