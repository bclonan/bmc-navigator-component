<template>
  <div class="m-select" :class="containerClasses">
    <!-- Label -->
    <label v-if="label" :for="fieldId" class="m-select-label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Select Container -->
    <div class="m-select-container" :class="selectContainerClasses" @click="toggleDropdown">
      <!-- Prepend Icon -->
      <div v-if="prependIcon" class="m-select-prepend" :class="iconClasses">
        <slot name="prepend-icon">
          <i :class="prependIcon"></i>
        </slot>
      </div>

      <!-- Selected Value Display -->
      <div class="m-select-value" :class="valueClasses">
        <span v-if="displayValue" class="truncate">{{ displayValue }}</span>
        <span v-else class="text-gray-400">{{ placeholder }}</span>
      </div>

      <!-- Dropdown Arrow -->
      <div class="m-select-arrow" :class="arrowClasses">
        <svg 
          class="w-4 h-4 transition-transform duration-200" 
          :class="{ 'rotate-180': isOpen }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div v-if="isOpen" class="m-select-dropdown" :class="dropdownClasses">
        <!-- Search Input -->
        <div v-if="searchable" class="p-2 border-b border-gray-200">
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            @click.stop
          />
        </div>

        <!-- No Results -->
        <div v-if="filteredOptions.length === 0" class="px-3 py-2 text-sm text-gray-500 text-center">
          {{ searchQuery ? 'No results found' : 'No options available' }}
        </div>

        <!-- Options List -->
        <div v-else class="max-h-60 overflow-y-auto">
          <div
            v-for="option in filteredOptions"
            :key="getOptionValue(option)"
            class="m-select-option"
            :class="getOptionClasses(option)"
            @click="selectOption(option)"
          >
            <slot name="option" :option="option">
              <span class="truncate">{{ getOptionLabel(option) }}</span>
            </slot>

            <!-- Check icon for selected option -->
            <svg 
              v-if="isSelected(option)"
              class="w-4 h-4 text-blue-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </transition>

    <!-- Helper text / Error message -->
    <div v-if="hasHelperText" class="m-select-helper" :class="helperClasses">
      <span v-if="errorMessage" class="m-select-error">{{ errorMessage }}</span>
      <span v-else-if="helperText" class="m-select-helper-text">{{ helperText }}</span>
    </div>

    <!-- Hidden native select for form submission -->
    <select 
      :id="fieldId"
      :name="name"
      :required="required"
      :disabled="disabled"
      class="sr-only"
      tabindex="-1"
      :value="modelValue"
    >
      <option v-for="option in options" :key="getOptionValue(option)" :value="getOptionValue(option)">
        {{ getOptionLabel(option) }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MSelect',
  
  props: {
    modelValue: {
      type: [String, Number, Object, Array],
      default: null
    },
    options: {
      type: Array,
      required: true,
      default: () => []
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
      default: 'Select an option...'
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
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    returnObject: {
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
      isOpen: false,
      searchQuery: '',
      fieldId: `m-select-${Math.random().toString(36).substr(2, 9)}`
    };
  },

  computed: {
    displayValue() {
      if (!this.modelValue) return '';
      
      if (this.multiple) {
        if (Array.isArray(this.modelValue) && this.modelValue.length > 0) {
          if (this.modelValue.length === 1) {
            return this.getOptionLabel(this.findOptionByValue(this.modelValue[0]));
          }
          return `${this.modelValue.length} items selected`;
        }
        return '';
      }
      
      const option = this.findOptionByValue(this.modelValue);
      return option ? this.getOptionLabel(option) : '';
    },

    filteredOptions() {
      if (!this.searchQuery || !this.searchable) {
        return this.options;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.options.filter(option => {
        const label = this.getOptionLabel(option).toLowerCase();
        return label.includes(query);
      });
    },

    hasError() {
      return !!this.errorMessage;
    },

    hasHelperText() {
      return this.errorMessage || this.helperText;
    },

    containerClasses() {
      return [
        'relative w-full',
        { 'opacity-60': this.disabled }
      ];
    },

    labelClasses() {
      const baseClasses = 'block text-sm font-medium mb-1 transition-colors duration-200';
      
      if (this.hasError) {
        return `${baseClasses} text-red-600`;
      }
      
      if (this.isOpen) {
        return `${baseClasses} text-blue-600`;
      }
      
      return `${baseClasses} text-gray-700`;
    },

    selectContainerClasses() {
      const baseClasses = 'relative flex items-center cursor-pointer transition-all duration-200';
      
      const variants = {
        outlined: 'border rounded-md bg-white',
        filled: 'border-0 border-b-2 bg-gray-50 rounded-t-md',
        standard: 'border-0 border-b-2 bg-transparent'
      };
      
      let classes = `${baseClasses} ${variants[this.variant]}`;
      
      // Border colors
      if (this.hasError) {
        classes += this.variant === 'outlined' ? ' border-red-500' : ' border-red-500';
      } else if (this.isOpen) {
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

    valueClasses() {
      const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-3 py-2.5 text-base',
        lg: 'px-4 py-3 text-lg'
      };
      
      return [
        'flex-1 text-left',
        sizes[this.size],
        this.disabled ? 'text-gray-400' : 'text-gray-900'
      ];
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

    arrowClasses() {
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

    dropdownClasses() {
      return [
        'absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg',
        'focus:outline-none'
      ];
    },

    helperClasses() {
      return [
        'mt-1 text-xs',
        this.hasError ? 'text-red-600' : 'text-gray-500'
      ];
    }
  },

  mounted() {
    document.addEventListener('click', this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },

  methods: {
    getOptionLabel(option) {
      if (!option) return '';
      if (typeof option === 'string' || typeof option === 'number') return String(option);
      return option[this.itemText] || option.label || option.name || String(option);
    },

    getOptionValue(option) {
      if (!option) return null;
      if (typeof option === 'string' || typeof option === 'number') return option;
      return option[this.itemValue] || option.value || option.id || option;
    },

    findOptionByValue(value) {
      return this.options.find(option => this.getOptionValue(option) === value);
    },

    isSelected(option) {
      const optionValue = this.getOptionValue(option);
      
      if (this.multiple) {
        return Array.isArray(this.modelValue) && this.modelValue.includes(optionValue);
      }
      
      return this.modelValue === optionValue;
    },

    getOptionClasses(option) {
      return [
        'flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors duration-150',
        this.isSelected(option) 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-900 hover:bg-gray-50'
      ];
    },

    toggleDropdown() {
      if (this.disabled) return;
      
      this.isOpen = !this.isOpen;
      
      if (this.isOpen && this.searchable) {
        this.$nextTick(() => {
          this.$refs.searchInput?.focus();
        });
      }
    },

    selectOption(option) {
      const value = this.returnObject ? option : this.getOptionValue(option);
      
      if (this.multiple) {
        const currentValues = Array.isArray(this.modelValue) ? [...this.modelValue] : [];
        const optionValue = this.getOptionValue(option);
        
        if (currentValues.includes(optionValue)) {
          const newValues = currentValues.filter(v => v !== optionValue);
          this.$emit('update:modelValue', newValues);
        } else {
          currentValues.push(value);
          this.$emit('update:modelValue', currentValues);
        }
      } else {
        this.$emit('update:modelValue', value);
        this.isOpen = false;
      }
      
      this.$emit('change', value);
      this.searchQuery = '';
    },

    handleOutsideClick(event) {
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
        this.searchQuery = '';
      }
    }
  }
};
</script>

<style scoped>
.m-select-dropdown {
  max-height: 300px;
}

.m-select-option:last-child {
  @apply border-b-0;
}
</style>