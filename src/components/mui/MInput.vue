<template>
  <div :class="inputWrapperClasses">
    <input
      :id="id"
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="isDisabled"
      :required="isRequired"
      :readonly="readonly"
      :class="inputClasses"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      v-bind="$attrs"
    />
    <div v-if="startAdornment || $slots.startAdornment" class="absolute left-3 top-1/2 transform -translate-y-1/2">
      <slot name="startAdornment">{{ startAdornment }}</slot>
    </div>
    <div v-if="endAdornment || $slots.endAdornment" class="absolute right-3 top-1/2 transform -translate-y-1/2">
      <slot name="endAdornment">{{ endAdornment }}</slot>
    </div>
  </div>
</template>

<script>
import { computed, inject, ref } from 'vue';

export default {
  name: 'MInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
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
    fullWidth: {
      type: Boolean,
      default: false
    },
    multiline: {
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
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    variant: {
      type: String,
      default: 'outlined',
      validator: (value) => ['filled', 'outlined', 'standard'].includes(value)
    },
    startAdornment: {
      type: String,
      default: ''
    },
    endAdornment: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'focus', 'blur', 'change'],
  setup(props, { emit }) {
    const inputRef = ref(null);
    const formControl = inject('formControl', null);

    const isDisabled = computed(() => props.disabled || formControl?.disabled || false);
    const isError = computed(() => props.error || formControl?.error || false);
    const isRequired = computed(() => props.required || formControl?.required || false);
    const inputSize = computed(() => props.size || formControl?.size || 'medium');
    const inputVariant = computed(() => props.variant || formControl?.variant || 'outlined');
    const isFullWidth = computed(() => props.fullWidth || formControl?.fullWidth || false);

    const sizeMap = {
      small: 'h-8 text-sm px-3',
      medium: 'h-10 text-base px-3',
      large: 'h-12 text-lg px-4'
    };

    const variantMap = {
      filled: 'bg-gray-100 border-0 border-b-2 border-gray-300 rounded-t-md focus:border-blue-600 focus:bg-gray-50',
      outlined: 'bg-white border border-gray-300 rounded-md focus:border-blue-600 focus:ring-1 focus:ring-blue-600',
      standard: 'bg-transparent border-0 border-b border-gray-400 rounded-none focus:border-blue-600'
    };

    const inputWrapperClasses = computed(() => [
      'relative',
      isFullWidth.value ? 'w-full' : ''
    ]);

    const inputClasses = computed(() => [
      'outline-none transition-colors duration-200 placeholder-gray-400',
      sizeMap[inputSize.value],
      variantMap[inputVariant.value],
      isDisabled.value ? 'cursor-not-allowed opacity-60' : '',
      isError.value ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : '',
      isFullWidth.value ? 'w-full' : '',
      (props.startAdornment || props.endAdornment) ? 'px-10' : ''
    ]);

    const handleInput = (event) => {
      emit('update:modelValue', event.target.value);
    };

    const handleFocus = (event) => {
      emit('focus', event);
    };

    const handleBlur = (event) => {
      emit('blur', event);
    };

    const handleChange = (event) => {
      emit('change', event);
    };

    return {
      inputRef,
      isDisabled,
      isRequired,
      inputWrapperClasses,
      inputClasses,
      handleInput,
      handleFocus,
      handleBlur,
      handleChange
    };
  }
};
</script>