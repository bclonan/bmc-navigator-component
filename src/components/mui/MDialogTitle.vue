<template>
  <div :class="titleClasses">
    <slot>{{ children }}</slot>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MDialogTitle',
  props: {
    children: {
      type: String,
      default: ''
    },
    disableTypography: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const titleClasses = computed(() => [
      'px-6 py-4 border-b border-gray-200',
      props.disableTypography ? '' : 'text-lg font-semibold text-gray-900'
    ]);

    return {
      titleClasses
    };
  }
};
</script>