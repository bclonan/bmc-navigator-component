<template>
  <component 
    :is="wrap ? 'div' : 'div'" 
    :class="wrap ? ['m-slider-wrapper', wrapperClass] : null"
  >
    <div class="m-slider" :class="[containerClasses, extend ? extendedClass : null]">
    <!-- Label -->
    <label v-if="label" :for="fieldId" class="m-slider-label" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <!-- Slider Container -->
    <div class="m-slider-container" :class="sliderContainerClasses">
      <!-- Value Display (Prepend) -->
      <div v-if="showTicks && tickPosition === 'both' || tickPosition === 'prepend'" class="m-slider-value-display">
        <span class="text-sm font-medium" :class="valueClasses">{{ formatValue(min) }}</span>
      </div>

      <!-- Slider Track -->
      <div class="m-slider-wrapper" :class="wrapperClasses">
        <!-- Track Background -->
        <div class="m-slider-track" :class="trackClasses"></div>
        
        <!-- Active Track -->
        <div 
          class="m-slider-track-active" 
          :class="activeTrackClasses"
          :style="activeTrackStyle"
        ></div>

        <!-- Thumb -->
        <div 
          class="m-slider-thumb" 
          :class="thumbClasses"
          :style="thumbStyle"
          @mousedown="startDrag"
          @touchstart="startDrag"
          @keydown="handleKeydown"
          tabindex="0"
          role="slider"
          :aria-valuemin="min"
          :aria-valuemax="max"
          :aria-valuenow="modelValue"
          :aria-disabled="disabled"
        >
          <!-- Thumb Ripple Effect -->
          <div v-if="!disabled" class="m-slider-ripple" :class="rippleClasses"></div>
        </div>

        <!-- Step Marks -->
        <div v-if="showTicks" class="m-slider-ticks">
          <div 
            v-for="tick in tickMarks" 
            :key="tick.value"
            class="m-slider-tick" 
            :class="getTickClasses(tick)"
            :style="getTickStyle(tick)"
          >
            <div v-if="showTickLabels" class="m-slider-tick-label" :class="tickLabelClasses">
              {{ formatValue(tick.value) }}
            </div>
          </div>
        </div>

        <!-- Hidden input for form submission -->
        <input
          :id="fieldId"
          type="range"
          :name="name"
          :min="min"
          :max="max"
          :step="step"
          :value="modelValue"
          :disabled="disabled"
          :required="required"
          class="sr-only"
          tabindex="-1"
        />
      </div>

      <!-- Value Display (Append) -->
      <div v-if="showTicks && tickPosition === 'both' || tickPosition === 'append'" class="m-slider-value-display">
        <span class="text-sm font-medium" :class="valueClasses">{{ formatValue(max) }}</span>
      </div>
    </div>

    <!-- Current Value Display -->
    <div v-if="showValue" class="m-slider-current-value" :class="currentValueClasses">
      <span class="text-sm font-medium">{{ formatValue(modelValue) }}</span>
    </div>

    <!-- Helper text / Error message -->
    <div v-if="hasHelperText" class="m-slider-helper" :class="helperClasses">
      <span v-if="errorMessage" class="m-slider-error">{{ errorMessage }}</span>
      <span v-else-if="helperText" class="m-slider-helper-text">{{ helperText }}</span>
    </div>
    </div>
  </component>
</template>

<script>
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
    helperText: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'warning', 'error'].includes(value)
    },
    size: {
      type: String,
      default: 'md',
      validator: value => ['sm', 'md', 'lg'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    showTicks: {
      type: Boolean,
      default: false
    },
    showTickLabels: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    tickPosition: {
      type: String,
      default: 'both',
      validator: value => ['prepend', 'append', 'both'].includes(value)
    },
    thumbLabel: {
      type: String,
      default: null
    },
    formatValue: {
      type: Function,
      default: (value) => String(value)
    },
    name: {
      type: String,
      default: null
    },
    // Wrap/Extend functionality
    wrap: {
      type: Boolean,
      default: false
    },
    extend: {
      type: Boolean,
      default: false
    },
    wrapperClass: {
      type: String,
      default: ''
    },
    extendedClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isDragging: false,
      fieldId: `m-slider-${Math.random().toString(36).substr(2, 9)}`,
      trackWidth: 0
    };
  },

  computed: {
    percentage() {
      return ((this.modelValue - this.min) / (this.max - this.min)) * 100;
    },

    tickMarks() {
      if (!this.showTicks) return [];
      
      const ticks = [];
      for (let value = this.min; value <= this.max; value += this.step) {
        ticks.push({
          value,
          percentage: ((value - this.min) / (this.max - this.min)) * 100
        });
      }
      return ticks;
    },

    hasError() {
      return !!this.errorMessage;
    },

    hasHelperText() {
      return this.errorMessage || this.helperText;
    },

    containerClasses() {
      return [
        'w-full',
        { 'opacity-60': this.disabled }
      ];
    },

    labelClasses() {
      const baseClasses = 'block text-sm font-medium mb-2 transition-colors duration-200';
      
      if (this.hasError) {
        return `${baseClasses} text-red-600`;
      }
      
      return `${baseClasses} text-gray-700`;
    },

    sliderContainerClasses() {
      return [
        'flex items-center space-x-4'
      ];
    },

    wrapperClasses() {
      return [
        'relative flex-1'
      ];
    },

    trackClasses() {
      const sizes = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
      };
      
      return [
        'w-full rounded-full',
        sizes[this.size],
        this.disabled ? 'bg-gray-200' : 'bg-gray-300'
      ];
    },

    activeTrackClasses() {
      const sizes = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3'
      };
      
      const colors = {
        primary: 'bg-blue-600',
        secondary: 'bg-gray-600',
        success: 'bg-green-600',
        warning: 'bg-yellow-600',
        error: 'bg-red-600'
      };
      
      return [
        'absolute top-0 left-0 rounded-full transition-all duration-200',
        sizes[this.size],
        this.hasError ? 'bg-red-600' : colors[this.color]
      ];
    },

    activeTrackStyle() {
      return {
        width: `${this.percentage}%`
      };
    },

    thumbClasses() {
      const sizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
      };
      
      const colors = {
        primary: 'bg-blue-600 border-blue-600',
        secondary: 'bg-gray-600 border-gray-600',
        success: 'bg-green-600 border-green-600',
        warning: 'bg-yellow-600 border-yellow-600',
        error: 'bg-red-600 border-red-600'
      };
      
      return [
        'absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2',
        'rounded-full border-2 cursor-pointer transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        sizes[this.size],
        this.hasError ? 'bg-red-600 border-red-600 focus:ring-red-500' : `${colors[this.color]} focus:ring-${this.color === 'primary' ? 'blue' : this.color}-500`,
        this.disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 active:scale-95'
      ];
    },

    thumbStyle() {
      return {
        left: `${this.percentage}%`
      };
    },

    rippleClasses() {
      return [
        'absolute inset-0 rounded-full opacity-0 transform scale-0',
        'transition-all duration-300 pointer-events-none',
        this.hasError ? 'bg-red-600' : `bg-${this.color === 'primary' ? 'blue' : this.color}-600`
      ];
    },

    valueClasses() {
      return [
        this.disabled ? 'text-gray-400' : 'text-gray-600'
      ];
    },

    currentValueClasses() {
      return [
        'mt-2 text-center',
        this.hasError ? 'text-red-600' : 'text-gray-700'
      ];
    },

    tickLabelClasses() {
      return [
        'absolute top-full mt-1 transform -translate-x-1/2 text-xs',
        this.disabled ? 'text-gray-400' : 'text-gray-500'
      ];
    },

    helperClasses() {
      return [
        'mt-1 text-xs',
        this.hasError ? 'text-red-600' : 'text-gray-500'
      ];
    }
  },

  methods: {
    getTickClasses(tick) {
      const sizes = {
        sm: 'w-0.5 h-2',
        md: 'w-0.5 h-3',
        lg: 'w-1 h-4'
      };
      
      const isActive = tick.value <= this.modelValue;
      
      return [
        'absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2',
        'rounded-full',
        sizes[this.size],
        isActive ? (this.hasError ? 'bg-red-600' : `bg-${this.color === 'primary' ? 'blue' : this.color}-600`) : 'bg-gray-300'
      ];
    },

    getTickStyle(tick) {
      return {
        left: `${tick.percentage}%`
      };
    },

    updateValue(clientX) {
      const rect = this.$el.querySelector('.m-slider-track').getBoundingClientRect();
      const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const rawValue = this.min + (percentage / 100) * (this.max - this.min);
      const steppedValue = Math.round(rawValue / this.step) * this.step;
      const clampedValue = Math.max(this.min, Math.min(this.max, steppedValue));
      
      if (clampedValue !== this.modelValue) {
        this.$emit('update:modelValue', clampedValue);
        this.$emit('change', clampedValue);
      }
    },

    startDrag(event) {
      if (this.disabled) return;
      
      event.preventDefault();
      this.isDragging = true;
      
      const clientX = event.type === 'mousedown' ? event.clientX : event.touches[0].clientX;
      this.updateValue(clientX);
      
      // Add event listeners
      const handleMove = (e) => {
        if (!this.isDragging) return;
        const x = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        this.updateValue(x);
      };
      
      const handleEnd = () => {
        this.isDragging = false;
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
        this.$emit('drag-end', this.modelValue);
      };
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
      
      this.$emit('drag-start', this.modelValue);
    },

    handleKeydown(event) {
      if (this.disabled) return;
      
      let newValue = this.modelValue;
      
      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          newValue = Math.min(this.max, this.modelValue + this.step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          newValue = Math.max(this.min, this.modelValue - this.step);
          break;
        case 'Home':
          newValue = this.min;
          break;
        case 'End':
          newValue = this.max;
          break;
        default:
          return;
      }
      
      event.preventDefault();
      this.$emit('update:modelValue', newValue);
      this.$emit('change', newValue);
    }
  }
};
</script>

<style scoped>
.m-slider-wrapper {
  height: 20px;
  display: flex;
  align-items: center;
}

.m-slider-ticks {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.m-slider-thumb:active .m-slider-ripple {
  @apply opacity-20 scale-150;
}
</style>