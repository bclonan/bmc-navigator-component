<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="transform opacity-0 translate-y-2"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 translate-y-2"
    >
      <div
        v-if="open"
        :class="snackbarClasses"
        :style="snackbarStyles"
      >
        <div class="flex items-center space-x-3">
          <div class="flex-1">
            <slot>{{ message }}</slot>
          </div>
          <div v-if="action || $slots.action" class="flex-shrink-0">
            <slot name="action">
              <button
                v-if="typeof action === 'string'"
                @click="handleAction"
                class="text-sm font-medium hover:opacity-80"
              >
                {{ action }}
              </button>
            </slot>
          </div>
          <button
            v-if="closable"
            @click="handleClose"
            class="flex-shrink-0 p-1 hover:opacity-80"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'MSnackbar',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    action: {
      type: [String, Object],
      default: null
    },
    autoHideDuration: {
      type: Number,
      default: 6000
    },
    anchorOrigin: {
      type: Object,
      default: () => ({ vertical: 'bottom', horizontal: 'left' }),
      validator: (value) => {
        return ['top', 'bottom'].includes(value.vertical) && 
               ['left', 'center', 'right'].includes(value.horizontal);
      }
    },
    closable: {
      type: Boolean,
      default: true
    },
    severity: {
      type: String,
      default: 'info',
      validator: (value) => ['error', 'warning', 'info', 'success'].includes(value)
    }
  },
  emits: ['close', 'action'],
  setup(props, { emit }) {
    let autoHideTimer = null;

    const severityMap = {
      error: 'bg-red-600 text-white',
      warning: 'bg-orange-600 text-white',
      info: 'bg-gray-800 text-white',
      success: 'bg-green-600 text-white'
    };

    const positionMap = {
      'top-left': 'top-4 left-4',
      'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
      'top-right': 'top-4 right-4',
      'bottom-left': 'bottom-4 left-4',
      'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
      'bottom-right': 'bottom-4 right-4'
    };

    const snackbarClasses = computed(() => [
      'fixed z-50 max-w-md mx-4 p-4 rounded-lg shadow-lg',
      severityMap[props.severity],
      positionMap[`${props.anchorOrigin.vertical}-${props.anchorOrigin.horizontal}`]
    ]);

    const snackbarStyles = computed(() => {
      const styles = {};
      if (props.anchorOrigin.horizontal === 'center') {
        styles.left = '50%';
        styles.transform = 'translateX(-50%)';
      }
      return styles;
    });

    const handleClose = () => {
      clearAutoHideTimer();
      emit('close');
    };

    const handleAction = () => {
      emit('action');
    };

    const clearAutoHideTimer = () => {
      if (autoHideTimer) {
        clearTimeout(autoHideTimer);
        autoHideTimer = null;
      }
    };

    const setAutoHideTimer = () => {
      if (props.autoHideDuration && props.autoHideDuration > 0) {
        autoHideTimer = setTimeout(() => {
          handleClose();
        }, props.autoHideDuration);
      }
    };

    onMounted(() => {
      if (props.open) {
        setAutoHideTimer();
      }
    });

    onUnmounted(() => {
      clearAutoHideTimer();
    });

    // Watch for open prop changes to restart timer
    computed(() => {
      if (props.open) {
        clearAutoHideTimer();
        setAutoHideTimer();
      } else {
        clearAutoHideTimer();
      }
    });

    return {
      snackbarClasses,
      snackbarStyles,
      handleClose,
      handleAction
    };
  }
};
</script>