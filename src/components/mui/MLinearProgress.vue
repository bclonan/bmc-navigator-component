<template>
  <div 
    :class="progressClasses"
    role="progressbar"
    :aria-valuenow="variant === 'determinate' || variant === 'buffer' ? value : undefined"
    :aria-valuemin="variant === 'determinate' || variant === 'buffer' ? 0 : undefined"
    :aria-valuemax="variant === 'determinate' || variant === 'buffer' ? 100 : undefined"
  >
    <div 
      v-if="variant === 'buffer'"
      class="absolute inset-0 bg-current opacity-30"
      :style="{ transform: `translateX(-${100 - valueBuffer}%)` }"
    />
    <div 
      :class="barClasses"
      :style="barStyles"
    />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MLinearProgress',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning'].includes(value)
    },
    value: {
      type: Number,
      default: 0
    },
    valueBuffer: {
      type: Number,
      default: 0
    },
    variant: {
      type: String,
      default: 'indeterminate',
      validator: (value) => ['determinate', 'indeterminate', 'buffer', 'query'].includes(value)
    }
  },
  setup(props) {
    const colorMap = {
      inherit: 'bg-inherit',
      primary: 'bg-blue-600',
      secondary: 'bg-purple-600',
      error: 'bg-red-600',
      info: 'bg-cyan-600',
      success: 'bg-green-600',
      warning: 'bg-orange-600'
    };

    const progressClasses = computed(() => [
      'relative h-1 w-full bg-gray-200 overflow-hidden',
      colorMap[props.color].replace('bg-', 'text-')
    ]);

    const barClasses = computed(() => [
      'h-full transition-transform duration-300 ease-out',
      colorMap[props.color],
      props.variant === 'indeterminate' ? 'animate-pulse' : '',
      props.variant === 'query' ? 'animate-bounce' : ''
    ]);

    const barStyles = computed(() => {
      if (props.variant === 'determinate') {
        return {
          transform: `translateX(-${100 - props.value}%)`
        };
      }
      if (props.variant === 'buffer') {
        return {
          transform: `translateX(-${100 - props.value}%)`
        };
      }
      if (props.variant === 'indeterminate') {
        return {
          width: '100%',
          animation: 'mui-linear-progress 2s linear infinite'
        };
      }
      return {};
    });

    return {
      progressClasses,
      barClasses,
      barStyles
    };
  }
};
</script>

<style scoped>
@keyframes mui-linear-progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>