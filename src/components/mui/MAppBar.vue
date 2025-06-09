<template>
  <header 
    :class="appBarClasses"
    :style="appBarStyles"
  >
    <div :class="containerClasses">
      <slot />
    </div>
  </header>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MAppBar',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['inherit', 'primary', 'secondary', 'default', 'transparent'].includes(value)
    },
    position: {
      type: String,
      default: 'fixed',
      validator: (value) => ['fixed', 'absolute', 'sticky', 'static', 'relative'].includes(value)
    },
    elevation: {
      type: Number,
      default: 4,
      validator: (value) => value >= 0 && value <= 24
    },
    enableColorOnDark: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const colorMap = {
      inherit: 'bg-inherit text-inherit',
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-purple-600 text-white',
      default: 'bg-gray-100 text-gray-900',
      transparent: 'bg-transparent text-inherit'
    };

    const positionMap = {
      fixed: 'fixed top-0 left-0 right-0 z-50',
      absolute: 'absolute top-0 left-0 right-0 z-40',
      sticky: 'sticky top-0 z-40',
      static: 'static',
      relative: 'relative'
    };

    const elevationMap = {
      0: 'shadow-none',
      1: 'shadow-sm',
      2: 'shadow',
      3: 'shadow-md',
      4: 'shadow-lg',
      6: 'shadow-xl',
      8: 'shadow-2xl',
      12: 'shadow-2xl',
      16: 'shadow-2xl',
      24: 'shadow-2xl'
    };

    const appBarClasses = computed(() => [
      'w-full transition-shadow duration-200',
      positionMap[props.position],
      colorMap[props.color],
      elevationMap[Math.min(props.elevation, 24)]
    ]);

    const containerClasses = computed(() => [
      'flex items-center min-h-16 px-4 sm:px-6 lg:px-8'
    ]);

    const appBarStyles = computed(() => {
      const styles = {};
      if (props.position === 'fixed' || props.position === 'sticky') {
        styles.backdropFilter = 'blur(8px)';
      }
      return styles;
    });

    return {
      appBarClasses,
      containerClasses,
      appBarStyles
    };
  }
};
</script>