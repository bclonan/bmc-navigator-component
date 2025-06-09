<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="m-button"
    :class="[
      variantClasses,
      sizeClasses,
      colorClasses,
      shapeClasses,
      { 'cursor-not-allowed opacity-60': disabled },
      { 'pointer-events-none': loading },
      customClass
    ]"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    :style="customStyles"
  >
    <!-- Loading spinner -->
    <div v-if="loading" class="m-button-spinner" :class="spinnerClasses">
      <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- Icon (prepend) -->
    <span v-if="prependIcon && !loading" class="m-button-icon" :class="iconClasses">
      <slot name="prepend-icon">
        <i :class="prependIcon"></i>
      </slot>
    </span>

    <!-- Button text -->
    <span v-if="hasText" class="m-button-text" :class="{ 'sr-only': iconOnly }">
      <slot>{{ text }}</slot>
    </span>

    <!-- Icon (append) -->
    <span v-if="appendIcon && !loading" class="m-button-icon" :class="iconClasses">
      <slot name="append-icon">
        <i :class="appendIcon"></i>
      </slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'MButton',
  
  props: {
    variant: {
      type: String,
      default: 'filled',
      validator: value => ['filled', 'outlined', 'text', 'elevated', 'tonal'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    },
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'].includes(value)
    },
    shape: {
      type: String,
      default: 'rounded',
      validator: value => ['rounded', 'square', 'pill'].includes(value)
    },
    type: {
      type: String,
      default: 'button',
      validator: value => ['button', 'submit', 'reset'].includes(value)
    },
    text: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: null
    },
    appendIcon: {
      type: String,
      default: null
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    customStyles: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    hasText() {
      return this.$slots.default || this.text;
    },

    variantClasses() {
      const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
      
      const variants = {
        filled: `${baseClasses} shadow-sm hover:shadow-md`,
        outlined: `${baseClasses} border-2 bg-transparent hover:bg-opacity-10`,
        text: `${baseClasses} bg-transparent hover:bg-opacity-10`,
        elevated: `${baseClasses} shadow-md hover:shadow-lg`,
        tonal: `${baseClasses} bg-opacity-10 hover:bg-opacity-20`
      };
      
      return variants[this.variant] || variants.filled;
    },

    sizeClasses() {
      const sizes = {
        xs: this.iconOnly ? 'h-6 w-6 p-1' : 'h-6 px-2 py-1 text-xs',
        sm: this.iconOnly ? 'h-8 w-8 p-1.5' : 'h-8 px-3 py-1.5 text-sm',
        md: this.iconOnly ? 'h-10 w-10 p-2' : 'h-10 px-4 py-2 text-sm',
        lg: this.iconOnly ? 'h-12 w-12 p-2.5' : 'h-12 px-6 py-3 text-base',
        xl: this.iconOnly ? 'h-14 w-14 p-3' : 'h-14 px-8 py-4 text-lg'
      };
      
      let sizeClass = sizes[this.size] || sizes.md;
      
      if (this.fullWidth && !this.iconOnly) {
        sizeClass += ' w-full';
      }
      
      return sizeClass;
    },

    colorClasses() {
      const colorVariants = {
        filled: {
          primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
          secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
          success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
          warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
          error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
          info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
          neutral: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500'
        },
        outlined: {
          primary: 'border-blue-600 text-blue-600 hover:bg-blue-600 focus:ring-blue-500',
          secondary: 'border-gray-600 text-gray-600 hover:bg-gray-600 focus:ring-gray-500',
          success: 'border-green-600 text-green-600 hover:bg-green-600 focus:ring-green-500',
          warning: 'border-yellow-600 text-yellow-600 hover:bg-yellow-600 focus:ring-yellow-500',
          error: 'border-red-600 text-red-600 hover:bg-red-600 focus:ring-red-500',
          info: 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 focus:ring-cyan-500',
          neutral: 'border-gray-400 text-gray-700 hover:bg-gray-400 focus:ring-gray-500'
        },
        text: {
          primary: 'text-blue-600 hover:bg-blue-600 focus:ring-blue-500',
          secondary: 'text-gray-600 hover:bg-gray-600 focus:ring-gray-500',
          success: 'text-green-600 hover:bg-green-600 focus:ring-green-500',
          warning: 'text-yellow-600 hover:bg-yellow-600 focus:ring-yellow-500',
          error: 'text-red-600 hover:bg-red-600 focus:ring-red-500',
          info: 'text-cyan-600 hover:bg-cyan-600 focus:ring-cyan-500',
          neutral: 'text-gray-700 hover:bg-gray-400 focus:ring-gray-500'
        },
        elevated: {
          primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
          secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
          success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
          warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500',
          error: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
          info: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
          neutral: 'bg-white text-gray-900 hover:bg-gray-50 focus:ring-gray-500'
        },
        tonal: {
          primary: 'bg-blue-600 text-blue-600 hover:bg-blue-600 focus:ring-blue-500',
          secondary: 'bg-gray-600 text-gray-600 hover:bg-gray-600 focus:ring-gray-500',
          success: 'bg-green-600 text-green-600 hover:bg-green-600 focus:ring-green-500',
          warning: 'bg-yellow-600 text-yellow-600 hover:bg-yellow-600 focus:ring-yellow-500',
          error: 'bg-red-600 text-red-600 hover:bg-red-600 focus:ring-red-500',
          info: 'bg-cyan-600 text-cyan-600 hover:bg-cyan-600 focus:ring-cyan-500',
          neutral: 'bg-gray-600 text-gray-600 hover:bg-gray-600 focus:ring-gray-500'
        }
      };
      
      return colorVariants[this.variant]?.[this.color] || colorVariants.filled.primary;
    },

    shapeClasses() {
      const shapes = {
        rounded: 'rounded-md',
        square: 'rounded-none',
        pill: 'rounded-full'
      };
      return shapes[this.shape] || shapes.rounded;
    },

    iconClasses() {
      const spacing = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
      };
      
      return [
        spacing[this.size] || spacing.md,
        this.hasText && this.prependIcon ? 'mr-2' : '',
        this.hasText && this.appendIcon ? 'ml-2' : ''
      ];
    },

    spinnerClasses() {
      return [
        this.hasText ? 'mr-2' : ''
      ];
    }
  },

  methods: {
    handleClick(event) {
      if (this.disabled || this.loading) return;
      this.$emit('click', event);
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    handleBlur(event) {
      this.$emit('blur', event);
    }
  }
};
</script>

<style scoped>
.m-button {
  position: relative;
  overflow: hidden;
}

.m-button:focus {
  @apply ring-2 ring-offset-2;
}

.m-button-spinner {
  @apply flex items-center;
}

.m-button-icon {
  @apply flex items-center justify-center;
}

.m-button-text {
  @apply flex items-center;
}

/* Ripple effect */
.m-button::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition: width 0.3s, height 0.3s;
}

.m-button:active::after {
  width: 300px;
  height: 300px;
}
</style>