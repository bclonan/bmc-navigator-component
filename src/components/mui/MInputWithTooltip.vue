<template>
  <MFormControl :class="formControlClass">
    <div class="relative">
      <!-- Input Label with Help Icon -->
      <div v-if="label" class="flex items-center mb-2">
        <MInputLabel :class="labelClass">
          {{ label }}
          <span v-if="required" class="text-red-500 ml-1">*</span>
        </MInputLabel>
        
        <!-- Financial Literacy Tooltip -->
        <MTooltip
          v-if="showFinancialHelp && financialContent"
          :title="financialContent.title"
          :content="financialContent.content"
          :financial-insight="financialContent.financialInsight"
          :icon="financialContent.icon"
          :action-text="financialContent.actionText"
          :action-url="financialContent.actionUrl"
          placement="top"
          class="ml-2"
          @action="handleTooltipAction"
        >
          <button
            type="button"
            class="text-blue-500 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full"
            :aria-label="`Get help about ${label}`"
          >
            <i class="fas fa-question-circle text-sm"></i>
          </button>
        </MTooltip>
      </div>
      
      <!-- Input Field -->
      <MInput
        :id="inputId"
        v-model="inputValue"
        :placeholder="placeholder"
        :type="type"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        :error="error"
        :required="required"
        :full-width="fullWidth"
        :class="inputClass"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        v-bind="$attrs"
      />
      
      <!-- Helper Text -->
      <MFormHelperText 
        v-if="helperText || errorMessage"
        :error="!!errorMessage"
        :class="helperTextClass"
      >
        {{ errorMessage || helperText }}
      </MFormHelperText>
      
      <!-- Financial Insight Badge -->
      <div 
        v-if="showInsightBadge && financialContent && !error && !errorMessage"
        class="mt-2 flex items-start space-x-2 text-xs text-blue-600 bg-blue-50 p-2 rounded border-l-4 border-blue-400"
      >
        <i :class="[financialContent.icon, 'text-blue-500 mt-0.5 flex-shrink-0']"></i>
        <div>
          <strong>Financial Tip:</strong> {{ financialContent.financialInsight }}
        </div>
      </div>
    </div>
  </MFormControl>
</template>

<script>
import { ref, computed, watch } from 'vue';
import MInput from './MInput.vue';
import MFormControl from './MFormControl.vue';
import MInputLabel from './MInputLabel.vue';
import MFormHelperText from './MFormHelperText.vue';
import MTooltip from './MTooltip.vue';
import { getFinancialLiteracyContent } from '../../data/financialLiteracyContent.js';

export default {
  name: 'MInputWithTooltip',
  components: {
    MInput,
    MFormControl,
    MInputLabel,
    MFormHelperText,
    MTooltip
  },
  inheritAttrs: false,
  emits: ['update:modelValue', 'input', 'change', 'focus', 'blur', 'tooltip-action'],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    variant: {
      type: String,
      default: 'outlined',
      validator: value => ['filled', 'outlined', 'standard'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    helperText: {
      type: String,
      default: ''
    },
    // Financial literacy props
    fieldName: {
      type: String,
      default: ''
    },
    showFinancialHelp: {
      type: Boolean,
      default: true
    },
    showInsightBadge: {
      type: Boolean,
      default: false
    },
    customFinancialContent: {
      type: Object,
      default: null
    }
  },
  setup(props, { emit }) {
    const inputValue = ref(props.modelValue);
    const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

    // Watch for external changes to modelValue
    watch(() => props.modelValue, (newValue) => {
      inputValue.value = newValue;
    });

    // Watch for changes to inputValue and emit
    watch(inputValue, (newValue) => {
      emit('update:modelValue', newValue);
    });

    // Get financial literacy content
    const financialContent = computed(() => {
      if (props.customFinancialContent) {
        return props.customFinancialContent;
      }
      
      if (props.fieldName) {
        return getFinancialLiteracyContent(props.fieldName, props.type);
      }
      
      return null;
    });

    // Computed classes
    const formControlClass = computed(() => [
      'mf-form-control',
      { 'w-full': props.fullWidth }
    ]);

    const labelClass = computed(() => [
      'mf-form-label',
      { 'text-red-600': props.error || props.errorMessage }
    ]);

    const inputClass = computed(() => [
      {
        'mf-input-focused': !props.error && !props.errorMessage,
        'mf-input-error': props.error || props.errorMessage
      }
    ]);

    const helperTextClass = computed(() => [
      'mf-form-helper-text',
      { 'error': props.error || props.errorMessage }
    ]);

    // Event handlers
    function handleInput(event) {
      inputValue.value = event.target.value;
      emit('input', event);
    }

    function handleChange(event) {
      emit('change', event);
    }

    function handleFocus(event) {
      emit('focus', event);
    }

    function handleBlur(event) {
      emit('blur', event);
    }

    function handleTooltipAction(url) {
      emit('tooltip-action', {
        fieldName: props.fieldName,
        url: url,
        content: financialContent.value
      });
    }

    return {
      inputValue,
      inputId,
      financialContent,
      formControlClass,
      labelClass,
      inputClass,
      helperTextClass,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleTooltipAction
    };
  }
};
</script>

<style scoped>
/* Additional styling for enhanced visual appeal */
.financial-insight-badge {
  animation: slideInUp 0.3s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>