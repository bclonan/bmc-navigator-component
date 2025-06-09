<template>
  <div class="m-slider" :class="sliderClass">
    <div class="slider-container">
      <!-- Label -->
      <div v-if="label" class="slider-label">
        <label :for="fieldId" class="label-text">{{ label }}</label>
        <span v-if="required" class="required-indicator">*</span>
      </div>
      
      <!-- Value Display -->
      <div class="value-display">
        <span class="current-value">{{ displayValue }}</span>
        <span v-if="unit" class="value-unit">{{ unit }}</span>
      </div>
      
      <!-- Slider Track -->
      <div class="slider-track" ref="trackRef">
        <div class="track-background"></div>
        <div 
          class="track-fill" 
          :style="{ width: fillPercentage + '%' }"
        ></div>
        
        <!-- Range markers -->
        <div v-if="showMarkers" class="track-markers">
          <div
            v-for="marker in markers"
            :key="marker.value"
            class="marker"
            :style="{ left: getMarkerPosition(marker.value) + '%' }"
          >
            <div class="marker-dot"></div>
            <div class="marker-label">{{ marker.label }}</div>
          </div>
        </div>
        
        <!-- Slider Handle -->
        <div
          class="slider-handle"
          :style="{ left: fillPercentage + '%' }"
          @mousedown="handleMouseDown"
          @touchstart="handleTouchStart"
          :tabindex="disabled ? -1 : 0"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-valuenow="modelValue"
          :aria-label="label"
          role="slider"
          @keydown="handleKeyDown"
        >
          <div class="handle-inner">
            <div v-if="showTooltip" class="handle-tooltip">
              {{ displayValue }}
            </div>
          </div>
        </div>
      </div>
      
      <!-- Range Display -->
      <div class="range-display">
        <span class="range-min">{{ formatValue(min) }}</span>
        <span class="range-max">{{ formatValue(max) }}</span>
      </div>
      
      <!-- Help Text -->
      <div v-if="helpText" class="help-text">{{ helpText }}</div>
      
      <!-- Error Message -->
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue';

export default {
  name: 'MSlider',
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    helpText: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    showMarkers: {
      type: Boolean,
      default: false
    },
    markers: {
      type: Array,
      default: () => []
    },
    formatValue: {
      type: Function,
      default: (value) => value.toLocaleString()
    },
    id: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'input'],
  setup(props, { emit }) {
    const trackRef = ref(null);
    const isDragging = ref(false);
    const fieldId = computed(() => props.id || `slider-${Math.random().toString(36).substr(2, 9)}`);
    
    // Computed properties
    const sliderClass = computed(() => ({
      [`variant-${props.variant}`]: true,
      [`size-${props.size}`]: true,
      'disabled': props.disabled,
      'has-error': props.error,
      'dragging': isDragging.value
    }));
    
    const fillPercentage = computed(() => {
      return ((props.modelValue - props.min) / (props.max - props.min)) * 100;
    });
    
    const displayValue = computed(() => {
      return props.formatValue(props.modelValue);
    });
    
    // Helper functions
    const getMarkerPosition = (value) => {
      return ((value - props.min) / (props.max - props.min)) * 100;
    };
    
    const snapToStep = (value) => {
      const snapped = Math.round((value - props.min) / props.step) * props.step + props.min;
      return Math.min(Math.max(snapped, props.min), props.max);
    };
    
    const updateValue = (clientX) => {
      if (!trackRef.value || props.disabled) return;
      
      const rect = trackRef.value.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = props.min + percentage * (props.max - props.min);
      const newValue = snapToStep(rawValue);
      
      if (newValue !== props.modelValue) {
        emit('update:modelValue', newValue);
        emit('input', newValue);
        emit('change', newValue);
      }
    };
    
    // Event handlers
    const handleMouseDown = (event) => {
      if (props.disabled) return;
      event.preventDefault();
      isDragging.value = true;
      
      const handleMouseMove = (e) => updateValue(e.clientX);
      const handleMouseUp = () => {
        isDragging.value = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleTouchStart = (event) => {
      if (props.disabled) return;
      event.preventDefault();
      isDragging.value = true;
      
      const handleTouchMove = (e) => {
        if (e.touches.length > 0) {
          updateValue(e.touches[0].clientX);
        }
      };
      const handleTouchEnd = () => {
        isDragging.value = false;
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    const handleKeyDown = (event) => {
      if (props.disabled) return;
      
      let delta = 0;
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          delta = props.step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          delta = -props.step;
          break;
        case 'PageUp':
          delta = props.step * 10;
          break;
        case 'PageDown':
          delta = -props.step * 10;
          break;
        case 'Home':
          emit('update:modelValue', props.min);
          emit('change', props.min);
          return;
        case 'End':
          emit('update:modelValue', props.max);
          emit('change', props.max);
          return;
        default:
          return;
      }
      
      event.preventDefault();
      const newValue = Math.max(props.min, Math.min(props.max, props.modelValue + delta));
      emit('update:modelValue', newValue);
      emit('change', newValue);
    };
    
    return {
      trackRef,
      isDragging,
      fieldId,
      sliderClass,
      fillPercentage,
      displayValue,
      getMarkerPosition,
      handleMouseDown,
      handleTouchStart,
      handleKeyDown
    };
  }
};
</script>

<style scoped>
.m-slider {
  @apply w-full;
}

.slider-container {
  @apply space-y-2;
}

/* Label */
.slider-label {
  @apply flex items-center justify-between;
}

.label-text {
  @apply text-sm font-medium text-gray-700;
}

.required-indicator {
  @apply text-red-500 ml-1;
}

/* Value Display */
.value-display {
  @apply flex items-center justify-center;
}

.current-value {
  @apply text-lg font-semibold text-gray-900;
}

.value-unit {
  @apply text-sm text-gray-500 ml-1;
}

/* Slider Track */
.slider-track {
  @apply relative h-6 cursor-pointer touch-none;
}

.track-background {
  @apply absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2;
  transition: all 0.2s ease;
}

.track-fill {
  @apply absolute top-1/2 left-0 h-2 rounded-full transform -translate-y-1/2;
  transition: width 0.2s ease;
}

/* Track Markers */
.track-markers {
  @apply absolute top-full mt-2 left-0 right-0;
}

.marker {
  @apply absolute transform -translate-x-1/2;
}

.marker-dot {
  @apply w-2 h-2 bg-gray-400 rounded-full mx-auto;
}

.marker-label {
  @apply text-xs text-gray-500 mt-1 text-center whitespace-nowrap;
}

/* Slider Handle */
.slider-handle {
  @apply absolute top-1/2 w-6 h-6 transform -translate-x-1/2 -translate-y-1/2 cursor-grab focus:outline-none;
  transition: transform 0.2s ease;
}

.slider-handle:focus {
  @apply ring-2 ring-offset-2 rounded-full;
}

.slider-handle:active {
  @apply cursor-grabbing;
}

.handle-inner {
  @apply relative w-full h-full bg-white border-2 rounded-full shadow-md;
  transition: all 0.2s ease;
}

.slider-handle:hover .handle-inner {
  @apply transform scale-110;
}

.dragging .slider-handle .handle-inner {
  @apply transform scale-110;
}

.handle-tooltip {
  @apply absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded whitespace-nowrap;
}

.handle-tooltip::after {
  @apply absolute top-full left-1/2 transform -translate-x-1/2 border-2 border-transparent border-t-gray-900;
  content: '';
}

/* Range Display */
.range-display {
  @apply flex justify-between text-xs text-gray-500;
}

/* Help Text */
.help-text {
  @apply text-sm text-gray-500;
}

/* Error Message */
.error-message {
  @apply text-sm text-red-600;
}

/* Variants */
.variant-primary .track-fill {
  @apply bg-blue-600;
}

.variant-primary .handle-inner {
  @apply border-blue-600;
}

.variant-primary .slider-handle:focus {
  @apply ring-blue-500;
}

.variant-secondary .track-fill {
  @apply bg-gray-600;
}

.variant-secondary .handle-inner {
  @apply border-gray-600;
}

.variant-secondary .slider-handle:focus {
  @apply ring-gray-500;
}

.variant-success .track-fill {
  @apply bg-green-600;
}

.variant-success .handle-inner {
  @apply border-green-600;
}

.variant-success .slider-handle:focus {
  @apply ring-green-500;
}

.variant-warning .track-fill {
  @apply bg-yellow-600;
}

.variant-warning .handle-inner {
  @apply border-yellow-600;
}

.variant-warning .slider-handle:focus {
  @apply ring-yellow-500;
}

.variant-danger .track-fill {
  @apply bg-red-600;
}

.variant-danger .handle-inner {
  @apply border-red-600;
}

.variant-danger .slider-handle:focus {
  @apply ring-red-500;
}

/* Sizes */
.size-small .slider-track {
  @apply h-4;
}

.size-small .track-background,
.size-small .track-fill {
  @apply h-1;
}

.size-small .slider-handle {
  @apply w-4 h-4;
}

.size-large .slider-track {
  @apply h-8;
}

.size-large .track-background,
.size-large .track-fill {
  @apply h-3;
}

.size-large .slider-handle {
  @apply w-8 h-8;
}

/* Disabled State */
.disabled {
  @apply opacity-50 cursor-not-allowed;
}

.disabled .slider-track {
  @apply cursor-not-allowed;
}

.disabled .slider-handle {
  @apply cursor-not-allowed;
}

/* Error State */
.has-error .track-background {
  @apply bg-red-100;
}

.has-error .track-fill {
  @apply bg-red-600;
}

.has-error .handle-inner {
  @apply border-red-600;
}

/* Mobile Responsive */
@media (max-width: 640px) {
  .slider-track {
    @apply h-8;
  }
  
  .slider-handle {
    @apply w-8 h-8;
  }
  
  .track-background,
  .track-fill {
    @apply h-3;
  }
  
  .current-value {
    @apply text-xl;
  }
  
  .marker-label {
    @apply text-xs;
  }
}

/* Touch-friendly targets */
@media (pointer: coarse) {
  .slider-handle {
    @apply w-8 h-8;
  }
  
  .slider-track {
    @apply h-8;
  }
}
</style>