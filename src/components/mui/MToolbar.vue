<template>
  <div :class="toolbarClasses">
    <slot />
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MToolbar',
  props: {
    disableGutters: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'regular',
      validator: (value) => ['regular', 'dense'].includes(value)
    }
  },
  setup(props) {
    const variantMap = {
      regular: 'min-h-16',
      dense: 'min-h-12'
    };

    const toolbarClasses = computed(() => [
      'flex items-center w-full',
      variantMap[props.variant],
      props.disableGutters ? '' : 'px-4 sm:px-6 lg:px-8'
    ]);

    return {
      toolbarClasses
    };
  }
};
</script>