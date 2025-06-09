<template>
  <component 
    :is="component"
    :class="listItemClasses"
    @click="handleClick"
  >
    <div v-if="avatar || $slots.avatar" class="flex-shrink-0 mr-3">
      <slot name="avatar">{{ avatar }}</slot>
    </div>
    
    <div v-if="icon || $slots.icon" class="flex-shrink-0 mr-3">
      <slot name="icon">
        <i v-if="icon" :class="icon" />
      </slot>
    </div>

    <div class="flex-1 min-w-0">
      <slot />
    </div>

    <div v-if="secondary || $slots.secondary" class="flex-shrink-0 ml-3">
      <slot name="secondary">{{ secondary }}</slot>
    </div>
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MListItem',
  props: {
    avatar: {
      type: String,
      default: ''
    },
    button: {
      type: Boolean,
      default: false
    },
    component: {
      type: String,
      default: 'li'
    },
    dense: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    divider: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    secondary: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const listItemClasses = computed(() => [
      'flex items-center text-left w-full',
      props.dense ? 'py-1 px-2' : 'py-2 px-3',
      props.button ? 'hover:bg-gray-100 focus:bg-gray-100 cursor-pointer transition-colors' : '',
      props.disabled ? 'opacity-50 cursor-not-allowed' : '',
      props.selected ? 'bg-blue-50 text-blue-700' : '',
      props.divider ? 'border-b border-gray-200' : ''
    ]);

    const handleClick = (event) => {
      if (!props.disabled && props.button) {
        emit('click', event);
      }
    };

    return {
      listItemClasses,
      handleClick
    };
  }
};
</script>