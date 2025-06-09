<template>
  <div 
    v-if="children || $slots.default"
    :class="helperTextClasses"
  >
    <slot>{{ children }}</slot>
  </div>
</template>

<script>
import { computed, inject } from 'vue';

export default {
  name: 'MFormHelperText',
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
    filled: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: 'dense',
      validator: (value) => ['dense', 'none'].includes(value)
    },
    required: {
      type: Boolean,
      default: false
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
    const helperMargin = computed(() => props.margin || formControl?.margin || 'dense');

    const marginMap = {
      dense: 'mt-1',
      none: ''
    };

    const helperTextClasses = computed(() => [
      'text-sm leading-tight',
      marginMap[helperMargin.value],
      isDisabled.value ? 'text-gray-400' :
        isError.value ? 'text-red-600' : 'text-gray-600'
    ]);

    return {
      helperTextClasses
    };
  }
};
</script>