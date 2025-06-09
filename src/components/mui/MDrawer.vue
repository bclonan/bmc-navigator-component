<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && variant === 'temporary'"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
        @click="handleBackdropClick"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      :enter-active-class="enterActiveClass"
      :enter-from-class="enterFromClass"
      :enter-to-class="enterToClass"
      :leave-active-class="leaveActiveClass"
      :leave-from-class="leaveFromClass"
      :leave-to-class="leaveToClass"
    >
      <aside
        v-if="open || variant === 'permanent'"
        :class="drawerClasses"
        :style="drawerStyles"
      >
        <div :class="paperClasses">
          <slot />
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'MDrawer',
  props: {
    anchor: {
      type: String,
      default: 'left',
      validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
    },
    elevation: {
      type: Number,
      default: 16,
      validator: (value) => value >= 0 && value <= 24
    },
    hideBackdrop: {
      type: Boolean,
      default: false
    },
    open: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'temporary',
      validator: (value) => ['permanent', 'persistent', 'temporary'].includes(value)
    },
    width: {
      type: [Number, String],
      default: 240
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const elevationMap = {
      0: 'shadow-none',
      1: 'shadow-sm',
      2: 'shadow',
      3: 'shadow-md',
      4: 'shadow-lg',
      6: 'shadow-xl',
      8: 'shadow-2xl',
      12: 'shadow-2xl',
      16: 'shadow-2xl',
      24: 'shadow-2xl'
    };

    const anchorMap = {
      left: {
        position: 'left-0 top-0 bottom-0',
        enterFrom: '-translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: '-translate-x-full'
      },
      right: {
        position: 'right-0 top-0 bottom-0',
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leaveFrom: 'translate-x-0',
        leaveTo: 'translate-x-full'
      },
      top: {
        position: 'top-0 left-0 right-0',
        enterFrom: '-translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: '-translate-y-full'
      },
      bottom: {
        position: 'bottom-0 left-0 right-0',
        enterFrom: 'translate-y-full',
        enterTo: 'translate-y-0',
        leaveFrom: 'translate-y-0',
        leaveTo: 'translate-y-full'
      }
    };

    const drawerClasses = computed(() => [
      'fixed z-50',
      anchorMap[props.anchor].position,
      props.variant === 'permanent' ? 'relative z-auto' : ''
    ]);

    const paperClasses = computed(() => [
      'bg-white h-full overflow-y-auto',
      elevationMap[Math.min(props.elevation, 24)],
      props.anchor === 'left' || props.anchor === 'right' ? 'border-r border-gray-200' : 'border-b border-gray-200'
    ]);

    const drawerStyles = computed(() => {
      const styles = {};
      if (props.anchor === 'left' || props.anchor === 'right') {
        styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width;
      }
      return styles;
    });

    // Transition classes
    const enterActiveClass = computed(() => 'transition-transform ease-out duration-300');
    const enterFromClass = computed(() => `transform ${anchorMap[props.anchor].enterFrom}`);
    const enterToClass = computed(() => `transform ${anchorMap[props.anchor].enterTo}`);
    const leaveActiveClass = computed(() => 'transition-transform ease-in duration-300');
    const leaveFromClass = computed(() => `transform ${anchorMap[props.anchor].leaveFrom}`);
    const leaveToClass = computed(() => `transform ${anchorMap[props.anchor].leaveTo}`);

    const handleBackdropClick = () => {
      if (props.variant === 'temporary') {
        emit('close');
      }
    };

    return {
      drawerClasses,
      paperClasses,
      drawerStyles,
      enterActiveClass,
      enterFromClass,
      enterToClass,
      leaveActiveClass,
      leaveFromClass,
      leaveToClass,
      handleBackdropClick
    };
  }
};
</script>