<template>
  <div class="relative inline-block" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot />
    
    <Transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-1"
    >
      <div
        v-if="isVisible"
        :class="tooltipClasses"
        :style="tooltipStyles"
        role="tooltip"
        :aria-describedby="tooltipId"
      >
        <!-- Tooltip Arrow -->
        <div :class="arrowClasses"></div>
        
        <!-- Tooltip Content -->
        <div class="relative z-10">
          <!-- Title -->
          <div v-if="title" class="font-semibold text-sm mb-2 flex items-center">
            <i v-if="icon" :class="[icon, 'mr-2 text-blue-400']"></i>
            {{ title }}
          </div>
          
          <!-- Main Content -->
          <div class="text-sm leading-relaxed">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
          
          <!-- Financial Insight -->
          <div v-if="financialInsight" class="mt-3 pt-3 border-t border-blue-200">
            <div class="flex items-start space-x-2">
              <i class="fas fa-lightbulb text-yellow-400 text-xs mt-0.5 flex-shrink-0"></i>
              <div class="text-xs text-blue-100 leading-relaxed">
                <strong class="text-yellow-200">Financial Tip:</strong> {{ financialInsight }}
              </div>
            </div>
          </div>
          
          <!-- Action Button -->
          <div v-if="actionText && actionUrl" class="mt-3">
            <button
              @click="handleAction"
              class="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded transition-colors duration-200"
            >
              {{ actionText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { ref, computed, nextTick } from 'vue';

export default {
  name: 'MTooltip',
  emits: ['action'],
  props: {
    content: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    financialInsight: {
      type: String,
      default: ''
    },
    actionText: {
      type: String,
      default: ''
    },
    actionUrl: {
      type: String,
      default: ''
    },
    delay: {
      type: Number,
      default: 200
    },
    maxWidth: {
      type: String,
      default: '300px'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const isVisible = ref(false);
    const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
    let showTimeout = null;
    let hideTimeout = null;

    const tooltipClasses = computed(() => [
      'absolute z-50 px-4 py-3 rounded-lg shadow-lg border',
      'bg-gradient-to-br from-blue-800 to-blue-900 text-white border-blue-600',
      'text-left transform',
      getPlacementClasses()
    ]);

    const arrowClasses = computed(() => [
      'absolute w-3 h-3 transform rotate-45',
      'bg-blue-800 border-blue-600',
      getArrowPlacementClasses()
    ]);

    const tooltipStyles = computed(() => ({
      maxWidth: props.maxWidth,
      ...getPositionStyles()
    }));

    function getPlacementClasses() {
      const placementMap = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
      };
      return placementMap[props.placement] || placementMap.top;
    }

    function getArrowPlacementClasses() {
      const arrowMap = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t border-l',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b border-r',
        left: 'left-full top-1/2 -translate-y-1/2 border-l border-b',
        right: 'right-full top-1/2 -translate-y-1/2 border-r border-t'
      };
      return arrowMap[props.placement] || arrowMap.top;
    }

    function getPositionStyles() {
      // Additional positioning adjustments can be added here
      return {};
    }

    function showTooltip() {
      if (props.disabled) return;
      
      clearTimeout(hideTimeout);
      showTimeout = setTimeout(() => {
        isVisible.value = true;
      }, props.delay);
    }

    function hideTooltip() {
      clearTimeout(showTimeout);
      hideTimeout = setTimeout(() => {
        isVisible.value = false;
      }, 100);
    }

    function handleAction() {
      emit('action', props.actionUrl);
      if (props.actionUrl) {
        window.open(props.actionUrl, '_blank');
      }
    }

    return {
      isVisible,
      tooltipId,
      tooltipClasses,
      arrowClasses,
      tooltipStyles,
      showTooltip,
      hideTooltip,
      handleAction
    };
  }
};
</script>

<style scoped>
/* Additional custom styles for enhanced visual appeal */
.tooltip-content {
  backdrop-filter: blur(8px);
}
</style>