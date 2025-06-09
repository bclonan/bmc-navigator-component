<template>
  <div 
    v-if="!closed"
    :class="alertClasses"
    role="alert"
  >
    <div v-if="icon || $slots.icon" class="flex-shrink-0">
      <slot name="icon">
        <component :is="iconComponent" class="w-5 h-5" />
      </slot>
    </div>
    <div class="flex-1 min-w-0">
      <div v-if="title" class="font-medium mb-1">{{ title }}</div>
      <div class="text-sm">
        <slot>{{ children }}</slot>
      </div>
      <div v-if="action || $slots.action" class="mt-2">
        <slot name="action">{{ action }}</slot>
      </div>
    </div>
    <div v-if="closable" class="flex-shrink-0 ml-3">
      <button
        @click="handleClose"
        class="inline-flex rounded-md p-1.5 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
        :class="closeButtonClasses"
      >
        <span class="sr-only">Dismiss</span>
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';

export default {
  name: 'MAlert',
  props: {
    action: {
      type: String,
      default: ''
    },
    children: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'info',
      validator: (value) => ['error', 'info', 'success', 'warning'].includes(value)
    },
    icon: {
      type: [String, Boolean],
      default: true
    },
    severity: {
      type: String,
      default: 'info',
      validator: (value) => ['error', 'info', 'success', 'warning'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'standard',
      validator: (value) => ['filled', 'outlined', 'standard'].includes(value)
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const closed = ref(false);

    const alertSeverity = computed(() => props.severity || props.color);

    const colorMap = {
      standard: {
        error: 'bg-red-50 text-red-800 border-red-200',
        warning: 'bg-orange-50 text-orange-800 border-orange-200',
        info: 'bg-blue-50 text-blue-800 border-blue-200',
        success: 'bg-green-50 text-green-800 border-green-200'
      },
      filled: {
        error: 'bg-red-600 text-white',
        warning: 'bg-orange-600 text-white',
        info: 'bg-blue-600 text-white',
        success: 'bg-green-600 text-white'
      },
      outlined: {
        error: 'border-2 border-red-200 text-red-800',
        warning: 'border-2 border-orange-200 text-orange-800',
        info: 'border-2 border-blue-200 text-blue-800',
        success: 'border-2 border-green-200 text-green-800'
      }
    };

    const iconMap = {
      error: 'ExclamationTriangleIcon',
      warning: 'ExclamationTriangleIcon',
      info: 'InformationCircleIcon',
      success: 'CheckCircleIcon'
    };

    const alertClasses = computed(() => [
      'flex p-4 rounded-lg',
      props.variant === 'standard' ? 'border' : '',
      colorMap[props.variant][alertSeverity.value]
    ]);

    const closeButtonClasses = computed(() => [
      props.variant === 'filled' ? 'focus:ring-white' : `focus:ring-${alertSeverity.value}-500`
    ]);

    const iconComponent = computed(() => {
      if (props.icon === false) return null;
      if (typeof props.icon === 'string') return props.icon;
      
      // Default icons based on severity
      const iconName = iconMap[alertSeverity.value];
      
      // Return SVG component based on severity
      switch (alertSeverity.value) {
        case 'error':
        case 'warning':
          return {
            template: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>`
          };
        case 'info':
          return {
            template: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
            </svg>`
          };
        case 'success':
          return {
            template: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>`
          };
        default:
          return null;
      }
    });

    const handleClose = () => {
      closed.value = true;
      emit('close');
    };

    return {
      closed,
      alertClasses,
      closeButtonClasses,
      iconComponent,
      handleClose
    };
  }
};
</script>