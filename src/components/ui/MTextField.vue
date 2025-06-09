<template>
  <div class="m-text-field" :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="fieldId" class="m-text-field-label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Input Container -->
    <div class="m-text-field-container" :class="inputContainerClasses">
      <!-- Prepend Icon -->
      <div v-if="prependIcon" class="m-text-field-prepend" :class="iconClasses">
        <slot name="prepend-icon">
          <i :class="prependIcon"></i>
        </slot>
      </div>

      <!-- Input Field -->
      <input
        v-if="!multiline"
        :id="fieldId"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :maxlength="maxlength"
        :pattern="pattern"
        :autocomplete="autocomplete"
        class="m-text-field-input"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="handleEnter"
      />

      <!-- Textarea -->
      <textarea
        v-else
        :id="fieldId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :maxlength="maxlength"
        :rows="rows"
        class="m-text-field-input m-text-field-textarea"
        :class="inputClasses"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>

      <!-- Append Icon -->
      <div v-if="appendIcon || clearable || showPasswordToggle" class="m-text-field-append" :class="iconClasses">
        <!-- Clear button -->
        <button
          v-if="clearable && modelValue && !disabled && !readonly"
          type="button"
          class="m-text-field-clear"
          :class="clearButtonClasses"
          @click="clearInput"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Password toggle -->
        <button
          v-if="showPasswordToggle"
          type="button"
          class="m-text-field-password-toggle"
          :class="clearButtonClasses"
          @click="togglePasswordVisibility"
        >
          <svg v-if="showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          </svg>
        </button>

        <!-- Append icon -->
        <slot name="append-icon">
          <i v-if="appendIcon" :class="appendIcon"></i>
        </slot>
      </div>
    </div>

    <!-- Helper text / Error message -->
    <div v-if="hasHelperText" class="m-text-field-helper" :class="helperClasses">
      <span v-if="errorMessage" class="m-text-field-error">{{ errorMessage }}</span>
      <span v-else-if="helperText" class="m-text-field-helper-text">{{ helperText }}</span>
      
      <!-- Character counter -->
      <span v-if="maxlength && showCounter" class="m-text-field-counter">
        {{ characterCount }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MTextField',
  
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'email', 'password', 'number', 'tel', 'url', 'search'].includes(value)
    },
    variant: {
      type: String,
      default: 'outlined',
      validator: value => ['outlined', 'filled', 'standard'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
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
    prependIcon: {
      type: String,
      default: null
    },
    appendIcon: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    multiline: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 3
    },
    maxlength: {
      type: Number,
      default: null
    },
    showCounter: {
      type: Boolean,
      default: false
    },
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: null
    },
    pattern: {
      type: String,
      default: null
    },
    autocomplete: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      isFocused: false,
      showPassword: false,
      fieldId: `m-text-field-${Math.random().toString(36).substr(2, 9)}`
    };
  },

  computed: {
    inputType() {
      if (this.type === 'password') {
        return this.showPassword ? 'text' : 'password';
      }
      return this.type;
    },

    showPasswordToggle() {
      return this.type === 'password';
    },

    hasError() {
      return !!this.errorMessage;
    },

    hasHelperText() {
      return this.errorMessage || this.helperText || (this.maxlength && this.showCounter);
    },

    characterCount() {
      return String(this.modelValue || '').length;
    },

    containerClasses() {
      return [
        'w-full',
        { 'opacity-60': this.disabled }
      ];
    },

    labelClasses() {
      const baseClasses = 'block text-sm font-medium mb-1 transition-colors duration-200';
      
      if (this.hasError) {
        return `${baseClasses} text-red-600`;
      }
      
      if (this.isFocused) {
        return `${baseClasses} text-blue-600`;
      }
      
      return `${baseClasses} text-gray-700`;
    },

    inputContainerClasses() {
      const baseClasses = 'relative flex items-center transition-all duration-200';
      
      const variants = {
        outlined: 'border rounded-md bg-white',
        filled: 'border-0 border-b-2 bg-gray-50 rounded-t-md',
        standard: 'border-0 border-b-2 bg-transparent'
      };
      
      let classes = `${baseClasses} ${variants[this.variant]}`;
      
      // Border colors
      if (this.hasError) {
        classes += this.variant === 'outlined' ? ' border-red-500' : ' border-red-500';
      } else if (this.isFocused) {
        classes += this.variant === 'outlined' ? ' border-blue-500 ring-1 ring-blue-500' : ' border-blue-500';
      } else {
        classes += this.variant === 'outlined' ? ' border-gray-300' : ' border-gray-300';
      }
      
      // Disabled state
      if (this.disabled) {
        classes += ' bg-gray-100 cursor-not-allowed';
      }
      
      return classes;
    },

    inputClasses() {
      const baseClasses = 'w-full bg-transparent focus:outline-none transition-colors duration-200';
      
      const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-3 py-2.5 text-base',
        lg: 'px-4 py-3 text-lg'
      };
      
      let classes = `${baseClasses} ${sizes[this.size]}`;
      
      // Text colors
      if (this.disabled) {
        classes += ' text-gray-400 cursor-not-allowed';
      } else if (this.hasError) {
        classes += ' text-gray-900';
      } else {
        classes += ' text-gray-900';
      }
      
      // Placeholder colors
      classes += ' placeholder-gray-400';
      
      return classes;
    },

    iconClasses() {
      const sizes = {
        sm: 'px-2',
        md: 'px-3',
        lg: 'px-4'
      };
      
      return [
        'flex items-center text-gray-400',
        sizes[this.size]
      ];
    },

    clearButtonClasses() {
      return [
        'text-gray-400 hover:text-gray-600 focus:text-gray-600 focus:outline-none transition-colors duration-200',
        { 'cursor-not-allowed': this.disabled }
      ];
    },

    helperClasses() {
      return [
        'flex justify-between items-center mt-1 text-xs',
        this.hasError ? 'text-red-600' : 'text-gray-500'
      ];
    }
  },

  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value);
      this.$emit('input', event.target.value);
    },

    handleFocus(event) {
      this.isFocused = true;
      this.$emit('focus', event);
    },

    handleBlur(event) {
      this.isFocused = false;
      this.$emit('blur', event);
    },

    handleEnter(event) {
      this.$emit('enter', event);
    },

    clearInput() {
      this.$emit('update:modelValue', '');
      this.$emit('clear');
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>

<style scoped>
.m-text-field-textarea {
  resize: vertical;
  min-height: 80px;
}

.m-text-field-clear,
.m-text-field-password-toggle {
  @apply p-1 rounded-sm hover:bg-gray-100 transition-colors duration-200;
}

.m-text-field-input:focus {
  @apply outline-none;
}

/* Remove spinner from number inputs */
.m-text-field-input[type="number"]::-webkit-outer-spin-button,
.m-text-field-input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.m-text-field-input[type="number"] {
  -moz-appearance: textfield;
}
</style>