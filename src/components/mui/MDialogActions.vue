<template>
  <div :class="actionsClasses">
    <slot>{{ children }}</slot>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MDialogActions',
  props: {
    children: {
      type: String,
      default: ''
    },
    disableSpacing: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const actionsClasses = computed(() => [
      'flex justify-end px-6 py-4 border-t border-gray-200',
      props.disableSpacing ? '' : 'space-x-2'
    ]);

    return {
      actionsClasses
    };
  }
};
</script>