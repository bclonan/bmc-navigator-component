<template>
  <div class="loan-flow-stepper">
    <!-- Progress Header -->
    <div class="stepper-header bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Loan Application</h1>
            <p class="text-gray-600">Application ID: {{ applicationId }}</p>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-600">Progress</div>
            <div class="text-2xl font-bold text-blue-600">{{ progressPercentage }}%</div>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div 
            class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        
        <!-- Step Navigation -->
        <div class="flex items-center justify-between relative">
          <div 
            v-for="(step, index) in steps" 
            :key="step.id"
            class="flex items-center"
            :class="{ 'flex-1': index < steps.length - 1 }"
          >
            <!-- Step Circle -->
            <div 
              class="relative flex items-center justify-center w-10 h-10 rounded-full border-2 cursor-pointer transition-all"
              :class="getStepClasses(index)"
              @click="navigateToStep(index)"
            >
              <i 
                v-if="completedSteps.has(index)"
                class="fas fa-check text-white text-sm"
              ></i>
              <i 
                v-else-if="stepErrors.has(index)"
                class="fas fa-exclamation text-white text-sm"
              ></i>
              <i 
                v-else
                :class="step.icon"
                class="text-sm"
              ></i>
            </div>
            
            <!-- Step Info -->
            <div class="ml-3 min-w-0 flex-1">
              <div 
                class="text-sm font-medium truncate"
                :class="getStepTextClasses(index)"
              >
                {{ step.title }}
              </div>
              <div class="text-xs text-gray-500 truncate">
                {{ step.description }}
              </div>
            </div>
            
            <!-- Connecting Line -->
            <div 
              v-if="index < steps.length - 1"
              class="flex-1 h-0.5 mx-4"
              :class="completedSteps.has(index) ? 'bg-blue-600' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Step Content -->
    <div class="stepper-content bg-gray-50 min-h-screen">
      <div class="max-w-4xl mx-auto px-4 py-8">
        <slot :current-step="currentStepInfo" :step-index="currentStep"></slot>
      </div>
    </div>
    
    <!-- Navigation Footer -->
    <div class="stepper-footer bg-white border-t shadow-lg sticky bottom-0">
      <div class="max-w-4xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <button
              v-if="!isFirstStep"
              @click="previousStep"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              Previous
            </button>
            
            <!-- Auto-save indicator -->
            <div v-if="lastSaved" class="flex items-center text-sm text-gray-500">
              <i class="fas fa-check-circle mr-1 text-green-500"></i>
              Saved {{ formatTimeAgo(lastSaved) }}
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button
              @click="saveDraft"
              :disabled="isSaving"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <i class="fas fa-save mr-2"></i>
              {{ isSaving ? 'Saving...' : 'Save Draft' }}
            </button>
            
            <button
              v-if="!isLastStep"
              @click="nextStep"
              :disabled="isValidating"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {{ isValidating ? 'Validating...' : 'Continue' }}
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
            
            <button
              v-else
              @click="submitApplication"
              :disabled="isSubmitting || !canSubmit"
              class="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-paper-plane mr-2"></i>
              {{ isSubmitting ? 'Submitting...' : 'Submit Application' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoanFlowStepper',
  
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
    stepErrors: {
      type: Set,
      default: () => new Set()
    },
    progressPercentage: {
      type: Number,
      default: 0
    },
    applicationId: {
      type: String,
      default: ''
    },
    isValidating: {
      type: Boolean,
      default: false
    },
    isSubmitting: {
      type: Boolean,
      default: false
    },
    isSaving: {
      type: Boolean,
      default: false
    },
    lastSaved: {
      type: Date,
      default: null
    },
    canSubmit: {
      type: Boolean,
      default: false
    }
  },
  
  emits: [
    'navigate-to-step',
    'next-step',
    'previous-step',
    'save-draft',
    'submit-application'
  ],
  
  computed: {
    currentStepInfo() {
      return this.steps[this.currentStep];
    },
    
    isFirstStep() {
      return this.currentStep === 0;
    },
    
    isLastStep() {
      return this.currentStep === this.steps.length - 1;
    }
  },
  
  methods: {
    getStepClasses(index) {
      const isActive = index === this.currentStep;
      const isCompleted = this.completedSteps.has(index);
      const hasError = this.stepErrors.has(index);
      const canNavigate = this.canNavigateToStep(index);
      
      return {
        'bg-blue-600 border-blue-600 text-white': isActive && !hasError,
        'bg-green-600 border-green-600 text-white': isCompleted && !hasError,
        'bg-red-600 border-red-600 text-white': hasError,
        'bg-gray-100 border-gray-300 text-gray-400': !isActive && !isCompleted && !hasError && !canNavigate,
        'bg-white border-gray-300 text-gray-600': !isActive && !isCompleted && !hasError && canNavigate,
        'hover:bg-gray-50': canNavigate && !isActive && !isCompleted && !hasError,
        'cursor-pointer': canNavigate,
        'cursor-not-allowed': !canNavigate
      };
    },
    
    getStepTextClasses(index) {
      const isActive = index === this.currentStep;
      const isCompleted = this.completedSteps.has(index);
      const hasError = this.stepErrors.has(index);
      
      return {
        'text-blue-600 font-semibold': isActive && !hasError,
        'text-green-600 font-semibold': isCompleted && !hasError,
        'text-red-600 font-semibold': hasError,
        'text-gray-900': !isActive && !isCompleted && !hasError,
        'text-gray-400': !this.canNavigateToStep(index)
      };
    },
    
    canNavigateToStep(stepIndex) {
      if (stepIndex === 0) return true;
      return this.completedSteps.has(stepIndex - 1) || this.completedSteps.has(stepIndex);
    },
    
    navigateToStep(stepIndex) {
      if (this.canNavigateToStep(stepIndex)) {
        this.$emit('navigate-to-step', stepIndex);
      }
    },
    
    nextStep() {
      this.$emit('next-step');
    },
    
    previousStep() {
      this.$emit('previous-step');
    },
    
    saveDraft() {
      this.$emit('save-draft');
    },
    
    submitApplication() {
      this.$emit('submit-application');
    },
    
    formatTimeAgo(date) {
      if (!date) return '';
      
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      
      if (diffInSeconds < 60) return 'just now';
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
  }
};
</script>

<style scoped>
.stepper-header {
  position: sticky;
  top: 0;
  z-index: 10;
}

.stepper-footer {
  z-index: 10;
}

.stepper-content {
  padding-bottom: 100px; /* Account for sticky footer */
}

@media (max-width: 768px) {
  .stepper-header .flex {
    flex-direction: column;
    align-items: stretch;
  }
  
  .stepper-header .flex > div {
    margin-bottom: 1rem;
  }
  
  .stepper-header .flex > div:last-child {
    margin-bottom: 0;
  }
}
</style>