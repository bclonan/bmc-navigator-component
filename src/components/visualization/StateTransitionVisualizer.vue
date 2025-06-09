<template>
  <div class="state-transition-visualizer" :class="visualizerClass">
    <!-- Main Progress Flow -->
    <div class="progress-flow">
      <div class="step-indicators">
        <div
          v-for="(step, index) in steps"
          :key="step.id"
          class="step-indicator"
          :class="getStepClass(index)"
          @click="$emit('step-click', index)"
        >
          <!-- Step Circle -->
          <div class="step-circle">
            <div class="step-content">
              <transition name="step-icon" mode="out-in">
                <component
                  :is="getStepIcon(index)"
                  :key="getStepState(index)"
                  class="step-icon"
                />
              </transition>
              <div class="step-number">{{ index + 1 }}</div>
            </div>
            
            <!-- Animated Progress Ring -->
            <svg class="progress-ring" viewBox="0 0 100 100">
              <circle
                class="progress-ring-bg"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke-width="8"
              />
              <circle
                class="progress-ring-fill"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke-width="8"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="getStepProgress(index)"
                :style="{ 
                  transitionDelay: `${index * 100}ms`,
                  stroke: getStepColor(index)
                }"
              />
            </svg>
          </div>
          
          <!-- Step Label -->
          <div class="step-label">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-subtitle">{{ step.description }}</div>
            <div class="step-status" :style="{ color: getStepColor(index) }">
              {{ getStepStatusText(index) }}
            </div>
          </div>
          
          <!-- Connection Line -->
          <div
            v-if="index < steps.length - 1"
            class="connection-line"
            :class="{ 'active': isConnectionActive(index) }"
          >
            <div class="line-progress" :style="{ width: getConnectionProgress(index) }"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Validation Status Panel -->
    <transition name="slide-up">
      <div v-if="showValidationPanel" class="validation-panel">
        <div class="validation-header">
          <h3>Real-time Validation Status</h3>
          <button @click="toggleValidationPanel" class="panel-toggle">
            {{ showValidationDetails ? 'Hide Details' : 'Show Details' }}
          </button>
        </div>
        
        <transition name="expand">
          <div v-if="showValidationDetails" class="validation-details">
            <div
              v-for="validation in validationResults"
              :key="validation.id"
              class="validation-item"
              :class="validation.status"
            >
              <div class="validation-icon">
                <transition name="bounce" mode="out-in">
                  <component
                    :is="getValidationIcon(validation.status)"
                    :key="validation.status"
                  />
                </transition>
              </div>
              <div class="validation-content">
                <div class="validation-name">{{ validation.name }}</div>
                <div class="validation-message">{{ validation.message }}</div>
                <div class="validation-progress">
                  <div 
                    class="progress-bar"
                    :style="{ 
                      width: `${validation.confidence}%`,
                      backgroundColor: getValidationColor(validation.status)
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
    
    <!-- Floating Action Buttons -->
    <div class="floating-actions">
      <button
        v-for="action in availableActions"
        :key="action.id"
        @click="$emit('action-click', action)"
        class="floating-action"
        :class="action.variant"
        :disabled="action.disabled"
      >
        <component :is="action.icon" class="action-icon" />
        <span class="action-label">{{ action.label }}</span>
      </button>
    </div>
    
    <!-- Progress Metrics -->
    <div class="progress-metrics">
      <div class="metric">
        <div class="metric-value">{{ overallProgress }}%</div>
        <div class="metric-label">Complete</div>
      </div>
      <div class="metric">
        <div class="metric-value">{{ validationScore }}%</div>
        <div class="metric-label">Valid</div>
      </div>
      <div class="metric">
        <div class="metric-value">{{ estimatedTime }}</div>
        <div class="metric-label">Remaining</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from 'vue';

// Icon components as inline SVGs for animations
const CheckIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20,6 9,17 4,12"></polyline>
    </svg>
  `
};

const ErrorIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="15" y1="9" x2="9" y2="15"></line>
      <line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
  `
};

const WarningIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  `
};

const InProgressIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
  `
};

const PendingIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  `
};

const SaveIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17,21 17,13 7,13 7,21"></polyline>
      <polyline points="7,3 7,8 15,8"></polyline>
    </svg>
  `
};

const ExportIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7,10 12,15 17,10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  `
};

export default {
  name: 'StateTransitionVisualizer',
  components: {
    CheckIcon,
    ErrorIcon,
    WarningIcon,
    InProgressIcon,
    PendingIcon,
    SaveIcon,
    ExportIcon
  },
  props: {
    steps: {
      type: Array,
      required: true
    },
    currentStep: {
      type: Number,
      default: 0
    },
    completedSteps: {
      type: Set,
      default: () => new Set()
    },
    validationResults: {
      type: Array,
      default: () => []
    },
    stepProgress: {
      type: Object,
      default: () => ({})
    },
    theme: {
      type: String,
      default: 'light',
      validator: value => ['light', 'dark', 'auto'].includes(value)
    },
    compact: {
      type: Boolean,
      default: false
    },
    animationSpeed: {
      type: String,
      default: 'normal',
      validator: value => ['slow', 'normal', 'fast'].includes(value)
    }
  },
  emits: ['step-click', 'action-click', 'validation-toggle'],
  setup(props, { emit }) {
    const showValidationPanel = ref(true);
    const showValidationDetails = ref(false);
    const circumference = 2 * Math.PI * 45; // radius of 45
    
    // Computed properties
    const visualizerClass = computed(() => ({
      [`theme-${props.theme}`]: true,
      [`speed-${props.animationSpeed}`]: true,
      'compact': props.compact
    }));
    
    const overallProgress = computed(() => {
      const totalSteps = props.steps.length;
      const completedCount = props.completedSteps.size;
      const currentProgress = props.stepProgress[props.currentStep] || 0;
      return Math.round(((completedCount + currentProgress / 100) / totalSteps) * 100);
    });
    
    const validationScore = computed(() => {
      if (props.validationResults.length === 0) return 100;
      const passedCount = props.validationResults.filter(v => v.status === 'valid').length;
      return Math.round((passedCount / props.validationResults.length) * 100);
    });
    
    const estimatedTime = computed(() => {
      const remainingSteps = props.steps.length - props.completedSteps.size;
      const avgTimePerStep = 3; // minutes
      const totalMinutes = remainingSteps * avgTimePerStep;
      return totalMinutes > 60 ? `${Math.round(totalMinutes / 60)}h` : `${totalMinutes}m`;
    });
    
    const availableActions = computed(() => {
      const actions = [];
      
      if (props.completedSteps.size > 0) {
        actions.push({
          id: 'save',
          label: 'Save Progress',
          icon: 'SaveIcon',
          variant: 'primary',
          disabled: false
        });
      }
      
      if (props.completedSteps.size === props.steps.length) {
        actions.push({
          id: 'export',
          label: 'Export Data',
          icon: 'ExportIcon',
          variant: 'success',
          disabled: false
        });
      }
      
      return actions;
    });
    
    // Methods
    const getStepClass = (index) => ({
      'step-completed': props.completedSteps.has(index),
      'step-current': index === props.currentStep,
      'step-pending': index > props.currentStep && !props.completedSteps.has(index),
      'step-error': hasStepError(index)
    });
    
    const getStepState = (index) => {
      if (hasStepError(index)) return 'error';
      if (props.completedSteps.has(index)) return 'completed';
      if (index === props.currentStep) return 'current';
      return 'pending';
    };
    
    const getStepIcon = (index) => {
      const state = getStepState(index);
      const iconMap = {
        completed: 'CheckIcon',
        current: 'InProgressIcon',
        error: 'ErrorIcon',
        pending: 'PendingIcon'
      };
      return iconMap[state];
    };
    
    const getStepColor = (index) => {
      const state = getStepState(index);
      const colorMap = {
        completed: '#10b981',
        current: '#3b82f6',
        error: '#ef4444',
        pending: '#6b7280'
      };
      return colorMap[state];
    };
    
    const getStepProgress = (index) => {
      if (props.completedSteps.has(index)) {
        return 0; // Full circle
      }
      if (index === props.currentStep) {
        const progress = props.stepProgress[index] || 0;
        return circumference - (circumference * progress / 100);
      }
      return circumference; // Empty circle
    };
    
    const getStepStatusText = (index) => {
      const state = getStepState(index);
      const statusMap = {
        completed: 'Completed',
        current: `${props.stepProgress[index] || 0}% complete`,
        error: 'Needs attention',
        pending: 'Not started'
      };
      return statusMap[state];
    };
    
    const hasStepError = (index) => {
      return props.validationResults.some(v => 
        v.affectedSteps?.includes(index) && v.status === 'error'
      );
    };
    
    const isConnectionActive = (index) => {
      return props.completedSteps.has(index) || index < props.currentStep;
    };
    
    const getConnectionProgress = (index) => {
      if (props.completedSteps.has(index)) return '100%';
      if (index === props.currentStep) {
        const progress = props.stepProgress[index] || 0;
        return `${progress}%`;
      }
      return '0%';
    };
    
    const getValidationIcon = (status) => {
      const iconMap = {
        valid: 'CheckIcon',
        error: 'ErrorIcon',
        warning: 'WarningIcon',
        pending: 'PendingIcon'
      };
      return iconMap[status] || 'PendingIcon';
    };
    
    const getValidationColor = (status) => {
      const colorMap = {
        valid: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        pending: '#6b7280'
      };
      return colorMap[status] || '#6b7280';
    };
    
    const toggleValidationPanel = () => {
      showValidationDetails.value = !showValidationDetails.value;
      emit('validation-toggle', showValidationDetails.value);
    };
    
    // Watch for changes and animate
    watch(() => props.currentStep, (newStep, oldStep) => {
      // Trigger step transition animation
      setTimeout(() => {
        const newStepElement = document.querySelector(`.step-indicator:nth-child(${newStep + 1})`);
        if (newStepElement) {
          newStepElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    });
    
    return {
      showValidationPanel,
      showValidationDetails,
      circumference,
      visualizerClass,
      overallProgress,
      validationScore,
      estimatedTime,
      availableActions,
      getStepClass,
      getStepState,
      getStepIcon,
      getStepColor,
      getStepProgress,
      getStepStatusText,
      isConnectionActive,
      getConnectionProgress,
      getValidationIcon,
      getValidationColor,
      toggleValidationPanel
    };
  }
};
</script>

<style scoped>
.state-transition-visualizer {
  @apply relative bg-white rounded-lg shadow-lg p-6;
  --transition-speed: 0.3s;
}

.state-transition-visualizer.speed-slow {
  --transition-speed: 0.6s;
}

.state-transition-visualizer.speed-fast {
  --transition-speed: 0.15s;
}

.state-transition-visualizer.compact {
  @apply p-4;
}

.state-transition-visualizer.compact .step-indicator {
  @apply scale-75;
}

/* Dark theme */
.state-transition-visualizer.theme-dark {
  @apply bg-gray-800 text-white;
}

.progress-flow {
  @apply mb-6;
}

.step-indicators {
  @apply flex items-start justify-between relative;
  min-height: 120px;
}

.step-indicator {
  @apply flex flex-col items-center relative cursor-pointer;
  transition: transform var(--transition-speed) ease;
  flex: 1;
  max-width: 200px;
}

.step-indicator:hover {
  @apply transform scale-105;
}

.step-circle {
  @apply relative w-16 h-16 mb-3;
}

.step-content {
  @apply absolute inset-0 flex flex-col items-center justify-center z-10;
}

.step-icon {
  @apply w-6 h-6 mb-1;
  transition: all var(--transition-speed) ease;
}

.step-number {
  @apply text-xs font-bold;
}

.progress-ring {
  @apply absolute inset-0 w-full h-full -rotate-90;
}

.progress-ring-bg {
  @apply stroke-gray-200;
}

.progress-ring-fill {
  transition: stroke-dashoffset var(--transition-speed) ease;
}

.step-label {
  @apply text-center;
}

.step-title {
  @apply font-semibold text-sm text-gray-900;
}

.step-subtitle {
  @apply text-xs text-gray-600 mt-1;
}

.step-status {
  @apply text-xs font-medium mt-1;
  transition: color var(--transition-speed) ease;
}

.connection-line {
  @apply absolute top-8 left-full w-full h-0.5 bg-gray-200;
  z-index: -1;
  transition: all var(--transition-speed) ease;
}

.connection-line.active {
  @apply bg-blue-500;
}

.line-progress {
  @apply h-full bg-blue-600;
  transition: width var(--transition-speed) ease;
}

/* Step states */
.step-completed .step-circle {
  @apply bg-green-50 border-2 border-green-500;
}

.step-completed .step-icon {
  @apply text-green-600;
}

.step-completed .step-number {
  @apply text-green-600;
}

.step-current .step-circle {
  @apply bg-blue-50 border-2 border-blue-500;
  animation: pulse 2s infinite;
}

.step-current .step-icon {
  @apply text-blue-600;
}

.step-current .step-number {
  @apply text-blue-600;
}

.step-error .step-circle {
  @apply bg-red-50 border-2 border-red-500;
  animation: shake 0.5s ease-in-out;
}

.step-error .step-icon {
  @apply text-red-600;
}

.step-error .step-number {
  @apply text-red-600;
}

.step-pending .step-circle {
  @apply bg-gray-50 border-2 border-gray-300;
}

.step-pending .step-icon {
  @apply text-gray-400;
}

.step-pending .step-number {
  @apply text-gray-400;
}

/* Validation Panel */
.validation-panel {
  @apply bg-gray-50 rounded-lg p-4 mb-6;
}

.validation-header {
  @apply flex justify-between items-center mb-4;
}

.validation-header h3 {
  @apply text-lg font-semibold text-gray-900;
}

.panel-toggle {
  @apply text-sm text-blue-600 hover:text-blue-800;
}

.validation-details {
  @apply space-y-3;
}

.validation-item {
  @apply flex items-center p-3 bg-white rounded-lg border;
  transition: all var(--transition-speed) ease;
}

.validation-item:hover {
  @apply transform translate-x-1;
}

.validation-item.valid {
  @apply border-green-200 bg-green-50;
}

.validation-item.error {
  @apply border-red-200 bg-red-50;
}

.validation-item.warning {
  @apply border-yellow-200 bg-yellow-50;
}

.validation-icon {
  @apply w-8 h-8 mr-3;
}

.validation-content {
  @apply flex-1;
}

.validation-name {
  @apply font-medium text-gray-900;
}

.validation-message {
  @apply text-sm text-gray-600 mt-1;
}

.validation-progress {
  @apply w-full bg-gray-200 rounded-full h-2 mt-2;
}

.progress-bar {
  @apply h-2 rounded-full;
  transition: width var(--transition-speed) ease;
}

/* Floating Actions */
.floating-actions {
  @apply absolute top-4 right-4 flex flex-col space-y-2;
}

.floating-action {
  @apply flex items-center px-3 py-2 rounded-lg shadow-lg border;
  transition: all var(--transition-speed) ease;
}

.floating-action:hover:not(:disabled) {
  @apply transform scale-105 shadow-xl;
}

.floating-action.primary {
  @apply bg-blue-600 text-white border-blue-600;
}

.floating-action.success {
  @apply bg-green-600 text-white border-green-600;
}

.floating-action:disabled {
  @apply opacity-50 cursor-not-allowed;
}

.action-icon {
  @apply w-4 h-4 mr-2;
}

.action-label {
  @apply text-sm font-medium;
}

/* Progress Metrics */
.progress-metrics {
  @apply flex justify-center space-x-8 pt-4 border-t border-gray-200;
}

.metric {
  @apply text-center;
}

.metric-value {
  @apply text-2xl font-bold text-gray-900;
}

.metric-label {
  @apply text-sm text-gray-600;
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* Transition animations */
.step-icon-enter-active,
.step-icon-leave-active {
  transition: all var(--transition-speed) ease;
}

.step-icon-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(180deg);
}

.step-icon-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(-180deg);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all var(--transition-speed) ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all var(--transition-speed) ease;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.bounce-enter-active {
  animation: bounce-in var(--transition-speed) ease-out;
}

.bounce-leave-active {
  animation: bounce-out var(--transition-speed) ease-in;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .step-indicators {
    @apply flex-col space-y-4;
  }
  
  .connection-line {
    @apply top-full left-8 w-0.5 h-full;
  }
  
  .floating-actions {
    @apply relative top-0 right-0 flex-row space-y-0 space-x-2 justify-center mt-4;
  }
  
  .progress-metrics {
    @apply space-x-4;
  }
  
  .metric-value {
    @apply text-lg;
  }
}
</style>