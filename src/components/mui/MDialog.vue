<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Dialog -->
        <Transition
          enter-active-class="transition-all ease-out duration-300"
          enter-from-class="transform opacity-0 scale-95"
          enter-to-class="transform opacity-100 scale-100"
          leave-active-class="transition-all ease-in duration-200"
          leave-from-class="transform opacity-100 scale-100"
          leave-to-class="transform opacity-0 scale-95"
        >
          <div
            v-if="open"
            :class="dialogClasses"
            :style="dialogStyles"
            @click.stop
          >
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MDialog',
  props: {
    fullScreen: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    maxWidth: {
      type: String,
      default: 'sm',
      validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', false].includes(value)
    },
    open: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: String,
      default: 'paper',
      validator: (value) => ['body', 'paper'].includes(value)
    },
    disableBackdropClick: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const maxWidthMap = {
      xs: 'max-w-xs',
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl'
    };

    const dialogClasses = computed(() => [
      'bg-white rounded-lg shadow-xl overflow-hidden',
      props.fullScreen ? 'w-full h-full max-w-none max-h-none' : 'max-h-screen',
      props.fullWidth ? 'w-full' : '',
      props.maxWidth && !props.fullScreen ? maxWidthMap[props.maxWidth] : '',
      props.scroll === 'body' ? 'overflow-y-auto' : ''
    ]);

    const dialogStyles = computed(() => {
      if (props.fullScreen) {
        return {
          margin: 0,
          borderRadius: 0
        };
      }
      return {};
    });

    const handleBackdropClick = () => {
      if (!props.disableBackdropClick) {
        emit('close');
      }
    };

    return {
      dialogClasses,
      dialogStyles,
      handleBackdropClick
    };
  }
};
</script>