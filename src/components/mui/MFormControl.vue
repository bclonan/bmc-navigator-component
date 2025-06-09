<template>
  <div :class="formControlClasses">
    <slot />
  </div>
</template>

<script>
import { computed, provide, reactive } from 'vue';

export default {
  name: 'MFormControl',
  props: {
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
    fullWidth: {
      type: Boolean,
      default: false
    },
    hiddenLabel: {
      type: Boolean,
      default: false
    },
    margin: {
      type: String,
      default: 'none',
      validator: (value) => ['none', 'dense', 'normal'].includes(value)
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
    }
  },
  setup(props) {
    const formControlState = reactive({
      disabled: props.disabled,
      error: props.error,
      focused: props.focused,
      fullWidth: props.fullWidth,
      hiddenLabel: props.hiddenLabel,
      margin: props.margin,
      required: props.required,
      size: props.size,
      variant: props.variant
    });

    // Provide form control context to child components
    provide('formControl', formControlState);

    const marginMap = {
      none: '',
      dense: 'mb-2',
      normal: 'mb-4'
    };

    const formControlClasses = computed(() => [
      'form-control',
      marginMap[props.margin],
      props.fullWidth ? 'w-full' : '',
      props.disabled ? 'opacity-60 pointer-events-none' : ''
    ]);

    return {
      formControlClasses
    };
  }
};
</script>