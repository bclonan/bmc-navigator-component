<template>
  <div :class="contentClasses">
    <slot>{{ children }}</slot>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MDialogContent',
  props: {
    children: {
      type: String,
      default: ''
    },
    dividers: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const contentClasses = computed(() => [
      'px-6 py-4 overflow-y-auto',
      props.dividers ? 'border-t border-b border-gray-200' : ''
    ]);

    return {
      contentClasses
    };
  }
};
</script>