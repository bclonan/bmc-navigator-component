<template>
  <div 
    :class="progressClasses"
    :style="progressStyles"
    role="progressbar"
    :aria-valuenow="variant === 'determinate' ? value : undefined"
    :aria-valuemin="variant === 'determinate' ? 0 : undefined"
    :aria-valuemax="variant === 'determinate' ? 100 : undefined"
  >
    <svg 
      class="circular-progress-svg"
      :width="size" 
      :height="size"
      viewBox="22 22 44 44"
    >
      <circle
        class="circular-progress-circle"
        :class="circleClasses"
        :style="circleStyles"
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        stroke="currentColor"
        :stroke-width="thickness"
      />
    </svg>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MCircularProgress',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(value)
    },
    disableShrink: {
      type: Boolean,
      default: false
    },
    size: {
      type: [Number, String],
      default: 40
    },
    thickness: {
      type: Number,
      default: 3.6
    },
    value: {
      type: Number,
      default: 0
    },
    variant: {
      type: String,
      default: 'indeterminate',
      validator: (value) => ['determinate', 'indeterminate'].includes(value)
    }
  },
  setup(props) {
    const colorMap = {
      inherit: 'text-inherit',
      primary: 'text-blue-600',
      secondary: 'text-purple-600',
      error: 'text-red-600',
      info: 'text-cyan-600',
      success: 'text-green-600',
      warning: 'text-orange-600'
    };

    const circumference = 2 * Math.PI * 20.2;

    const progressClasses = computed(() => [
      'inline-flex',
      colorMap[props.color]
    ]);

    const progressStyles = computed(() => ({
      width: typeof props.size === 'number' ? `${props.size}px` : props.size,
      height: typeof props.size === 'number' ? `${props.size}px` : props.size
    }));

    const circleClasses = computed(() => [
      props.variant === 'indeterminate' ? 'animate-spin' : ''
    ]);

    const circleStyles = computed(() => {
      if (props.variant === 'determinate') {
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (props.value / 100) * circumference;
        return {
          strokeDasharray,
          strokeDashoffset,
          transition: 'stroke-dashoffset 0.3s ease-in-out'
        };
      }
      return {
        strokeDasharray: '80px, 200px',
        strokeDashoffset: '0px',
        animation: props.disableShrink 
          ? 'mui-circular-rotate 1.4s linear infinite' 
          : 'mui-circular-rotate 1.4s linear infinite, mui-circular-dash 1.4s ease-in-out infinite'
      };
    });

    return {
      progressClasses,
      progressStyles,
      circleClasses,
      circleStyles
    };
  }
};
</script>

<style scoped>
.circular-progress-svg {
  display: block;
}

@keyframes mui-circular-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes mui-circular-dash {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
}
</style>