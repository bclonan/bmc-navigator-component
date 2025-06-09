<template>
  <label 
    v-if="!hiddenLabel"
    :for="htmlFor"
    :class="labelClasses"
  >
    <slot>{{ children }}</slot>
    <span v-if="required" class="text-red-500 ml-1">*</span>
  </label>
</template>

<script>
import { computed, inject } from 'vue';

export default {
  name: 'MInputLabel',
  props: {
    children: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    htmlFor: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    shrink: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
      type: String,
      default: 'outlined',
      validator: (value) => ['filled', 'outlined', 'standard'].includes(value)
    }
  },
  setup(props) {
    const formControl = inject('formControl', null);

    const isDisabled = computed(() => props.disabled || formControl?.disabled || false);
    const isError = computed(() => props.error || formControl?.error || false);
    const isFocused = computed(() => props.focused || formControl?.focused || false);
    const isRequired = computed(() => props.required || formControl?.required || false);
    const labelSize = computed(() => props.size || formControl?.size || 'medium');
    const labelVariant = computed(() => props.variant || formControl?.variant || 'outlined');
    const hiddenLabel = computed(() => formControl?.hiddenLabel || false);

    const sizeMap = {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg'
    };

    const labelClasses = computed(() => [
      'block font-medium transition-colors duration-200',
      sizeMap[labelSize.value],
      isDisabled.value ? 'text-gray-400' : 
        isError.value ? 'text-red-600' :
        isFocused.value ? 'text-blue-600' : 'text-gray-700',
      labelVariant.value === 'standard' ? 'mb-1' : 'mb-2'
    ]);

    return {
      labelClasses,
      hiddenLabel,
      required: isRequired
    };
  }
};
</script>