<template>
  <component 
    :is="component"
    :class="listClasses"
    :style="listStyles"
  >
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MList',
  props: {
    component: {
      type: String,
      default: 'ul'
    },
    dense: {
      type: Boolean,
      default: false
    },
    disablePadding: {
      type: Boolean,
      default: false
    },
    subheader: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const listClasses = computed(() => [
      'list-none',
      props.dense ? 'py-1' : 'py-2',
      props.disablePadding ? '' : 'px-0'
    ]);

    const listStyles = computed(() => ({}));

    return {
      listClasses,
      listStyles
    };
  }
};
</script>