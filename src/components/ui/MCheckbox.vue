<template>
  <div class="m-checkbox" :class="containerClasses">
    <label class="m-checkbox-wrapper" :class="wrapperClasses" @click="handleClick">
      <!-- Hidden native checkbox for form submission -->
      <input
        :id="fieldId"
        ref="checkbox"
        type="checkbox"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :required="required"
        class="sr-only"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <!-- Custom checkbox -->
      <div class="m-checkbox-input" :class="checkboxClasses">
        <!-- Check icon -->
        <transition
          enter-active-class="transition ease-in duration-100"
          enter-from-class="transform scale-0"
          enter-to-class="transform scale-100"
          leave-active-class="transition ease-out duration-75"
          leave-from-class="transform scale-100"
          leave-to-class="transform scale-0"
        >
          <svg
            v-if="isChecked"
            class="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </transition>

        <!-- Indeterminate icon -->
        <transition
          enter-active-class="transition ease-in duration-100"
          enter-from-class="transform scale-0"
          enter-to-class="transform scale-100"
          leave-active-class="transition ease-out duration-75"
          leave-from-class="transform scale-100"
          leave-to-class="transform scale-0"
        >
          <svg
            v-if="indeterminate && !isChecked"
            class="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z" clip-rule="evenodd" />
          </svg>
        </transition>
      </div>

      <!-- Label text -->
      <div v-if="hasLabel" class="m-checkbox-label" :class="labelClasses">
        <slot>{{ label }}</slot>
      </div>
    </label>

    <!-- Helper text / Error message -->
    <div v-if="hasHelperText" class="m-checkbox-helper" :class="helperClasses">
      <span v-if="errorMessage" class="m-checkbox-error">{{ errorMessage }}</span>
      <span v-else-if="helperText" class="m-checkbox-helper-text">{{ helperText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MCheckbox',
  
  props: {
    modelValue: {
      type: [Boolean, Array],
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    helperText: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isFocused: false,
      fieldId: `m-checkbox-${Math.random().toString(36).substr(2, 9)}`
    };
  },

  computed: {
    isChecked() {
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.includes(this.value);
      }
      return Boolean(this.modelValue);
    },

    hasLabel() {
      return this.$slots.default || this.label;
    },

    hasError() {
      return !!this.errorMessage;
    },

    hasHelperText() {
      return this.errorMessage || this.helperText;
    },

    containerClasses() {
      return [
        'w-full',
        { 'opacity-60': this.disabled }
      ];
    },

    wrapperClasses() {
      return [
        'inline-flex items-start cursor-pointer',
        { 'cursor-not-allowed': this.disabled }
      ];
    },

    checkboxClasses() {
      const baseClasses = 'flex items-center justify-center border-2 rounded transition-all duration-200 focus-within:ring-2 focus-within:ring-offset-2';
      
      const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
      };
      
      const colors = {
        primary: {
          checked: 'bg-blue-600 border-blue-600 focus-within:ring-blue-500',
          unchecked: 'bg-white border-gray-300 hover:border-blue-400 focus-within:ring-blue-500'
        },
        secondary: {
          checked: 'bg-gray-600 border-gray-600 focus-within:ring-gray-500',
          unchecked: 'bg-white border-gray-300 hover:border-gray-400 focus-within:ring-gray-500'
        },
        success: {
          checked: 'bg-green-600 border-green-600 focus-within:ring-green-500',
          unchecked: 'bg-white border-gray-300 hover:border-green-400 focus-within:ring-green-500'
        },
        warning: {
          checked: 'bg-yellow-600 border-yellow-600 focus-within:ring-yellow-500',
          unchecked: 'bg-white border-gray-300 hover:border-yellow-400 focus-within:ring-yellow-500'
        },
        error: {
          checked: 'bg-red-600 border-red-600 focus-within:ring-red-500',
          unchecked: 'bg-white border-gray-300 hover:border-red-400 focus-within:ring-red-500'
        }
      };
      
      let classes = `${baseClasses} ${sizes[this.size]}`;
      
      if (this.hasError) {
        classes += ' border-red-500 focus-within:ring-red-500';
        if (this.isChecked || this.indeterminate) {
          classes += ' bg-red-600';
        }
      } else if (this.isChecked || this.indeterminate) {
        classes += ` ${colors[this.color].checked}`;
      } else {
        classes += ` ${colors[this.color].unchecked}`;
      }
      
      if (this.disabled) {
        classes += ' cursor-not-allowed opacity-50';
      }
      
      return classes;
    },

    labelClasses() {
      const baseClasses = 'select-none transition-colors duration-200';
      
      const sizes = {
        sm: 'ml-2 text-sm',
        md: 'ml-2.5 text-base',
        lg: 'ml-3 text-lg'
      };
      
      let classes = `${baseClasses} ${sizes[this.size]}`;
      
      if (this.hasError) {
        classes += ' text-red-600';
      } else if (this.disabled) {
        classes += ' text-gray-400';
      } else {
        classes += ' text-gray-700';
      }
      
      return classes;
    },

    helperClasses() {
      return [
        'mt-1 text-xs',
        this.hasError ? 'text-red-600' : 'text-gray-500'
      ];
    }
  },

  methods: {
    handleClick(event) {
      if (this.disabled) return;
      
      // Prevent double-firing when clicking the label
      if (event.target !== this.$refs.checkbox) {
        this.$refs.checkbox.click();
      }
    },

    handleChange(event) {
      if (this.disabled) return;
      
      const checked = event.target.checked;
      
      if (Array.isArray(this.modelValue)) {
        const newValue = [...this.modelValue];
        
        if (checked) {
          if (!newValue.includes(this.value)) {
            newValue.push(this.value);
          }
        } else {
          const index = newValue.indexOf(this.value);
          if (index > -1) {
            newValue.splice(index, 1);
          }
        }
        
        this.$emit('update:modelValue', newValue);
      } else {
        this.$emit('update:modelValue', checked);
      }
      
      this.$emit('change', checked);
    },

    handleFocus(event) {
      this.isFocused = true;
      this.$emit('focus', event);
    },

    handleBlur(event) {
      this.isFocused = false;
      this.$emit('blur', event);
    }
  }
};
</script>

<style scoped>
.m-checkbox-input {
  flex-shrink: 0;
}

.m-checkbox-label {
  flex: 1;
  line-height: 1.4;
}

.m-checkbox-wrapper:focus-within .m-checkbox-input {
  @apply ring-2 ring-offset-2;
}
</style>