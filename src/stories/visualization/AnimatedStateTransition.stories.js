import { ref, reactive, computed, watch } from 'vue';
import StateTransitionVisualizer from '../../components/visualization/StateTransitionVisualizer.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import { useDynamicFormRenderer } from '../../composables/useDynamicFormRenderer.js';
import { useStorageEngine } from '../../composables/useStorageEngine.js';

export default {
  title: 'Visualization/Animated State Transition',
  component: StateTransitionVisualizer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Animated state transition visualizer showing form progression with smooth transitions, progress indicators, and real-time validation feedback.'
      }
    }
  }
};

// Create loan application steps for visualization
const createLoanSteps = () => [
  {
    id: 'personal',
    title: 'Personal Info',
    description: 'Basic details',
    schema: {
      title: 'Personal Information',
      fields: [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          validation: [{ type: 'required' }]
        },
        {
          id: 'lastName',
          type: 'text',
          label: 'Last Name',
          validation: [{ type: 'required' }]
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          validation: [{ type: 'required' }, { type: 'email' }]
        }
      ]
    }
  },
  {
    id: 'financial',
    title: 'Financial Info',
    description: 'Income & employment',
    schema: {
      title: 'Financial Information',
      fields: [
        {
          id: 'monthlyIncome',
          type: 'number',
          label: 'Monthly Income ($)',
          validation: [{ type: 'required' }, { type: 'min', value: 1000 }]
        },
        {
          id: 'employmentStatus',
          type: 'select',
          label: 'Employment Status',
          options: [
            { value: 'employed', label: 'Employed' },
            { value: 'selfEmployed', label: 'Self-employed' }
          ],
          validation: [{ type: 'required' }]
        }
      ]
    }
  },
  {
    id: 'loan',
    title: 'Loan Details',
    description: 'Amount & terms',
    schema: {
      title: 'Loan Requirements',
      fields: [
        {
          id: 'loanAmount',
          type: 'number',
          label: 'Loan Amount ($)',
          validation: [{ type: 'required' }, { type: 'min', value: 1000 }]
        },
        {
          id: 'loanTerm',
          type: 'select',
          label: 'Loan Term',
          options: [
            { value: '24', label: '24 months' },
            { value: '36', label: '36 months' },
            { value: '48', label: '48 months' }
          ],
          validation: [{ type: 'required' }]
        }
      ]
    }
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Final verification',
    schema: {
      title: 'Application Review',
      fields: [
        {
          id: 'termsAccepted',
          type: 'checkbox',
          label: 'I accept the terms and conditions',
          validation: [{ type: 'required' }]
        }
      ]
    }
  }
];

// Template for basic visualizer
const BasicVisualizerTemplate = (args) => ({
  components: { StateTransitionVisualizer },
  setup() {
    const steps = createLoanSteps();
    const currentStep = ref(0);
    const completedSteps = ref(new Set());
    const stepProgress = ref({});
    const validationResults = ref([
      {
        id: 'income_check',
        name: 'Income Validation',
        message: 'Minimum income requirement met',
        status: 'valid',
        confidence: 95
      },
      {
        id: 'debt_ratio',
        name: 'Debt-to-Income Ratio',
        message: 'DTI within acceptable limits',
        status: 'valid',
        confidence: 88
      }
    ]);

    // Simulate progress updates
    const simulateProgress = () => {
      const interval = setInterval(() => {
        const current = currentStep.value;
        const progress = stepProgress.value[current] || 0;
        
        if (progress < 100) {
          stepProgress.value[current] = Math.min(100, progress + Math.random() * 15);
        } else {
          completedSteps.value.add(current);
          if (current < steps.length - 1) {
            currentStep.value = current + 1;
            stepProgress.value[current + 1] = 0;
          } else {
            clearInterval(interval);
          }
        }
      }, 1000);

      return interval;
    };

    const handleStepClick = (stepIndex) => {
      if (completedSteps.value.has(stepIndex) || stepIndex <= currentStep.value) {
        currentStep.value = stepIndex;
      }
    };

    const handleActionClick = (action) => {
      console.log('Action clicked:', action);
    };

    // Start simulation
    let interval;
    setTimeout(() => {
      interval = simulateProgress();
    }, 1000);

    return {
      steps,
      currentStep,
      completedSteps,
      stepProgress,
      validationResults,
      handleStepClick,
      handleActionClick,
      ...args
    };
  },
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <StateTransitionVisualizer
        :steps="steps"
        :current-step="currentStep"
        :completed-steps="completedSteps"
        :step-progress="stepProgress"
        :validation-results="validationResults"
        :theme="theme"
        :compact="compact"
        :animation-speed="animationSpeed"
        @step-click="handleStepClick"
        @action-click="handleActionClick"
      />
    </div>
  `
});

// Template for integrated form flow
const IntegratedFlowTemplate = (args) => ({
  components: { StateTransitionVisualizer, DynamicFormRenderer },
  setup() {
    const steps = createLoanSteps();
    const currentStep = ref(0);
    const completedSteps = ref(new Set());
    const stepProgress = ref({});
    const validationResults = ref([]);
    
    // Storage and form renderer
    const storage = useStorageEngine({
      storageType: 'localStorage',
      autoSave: true,
      keyPrefix: 'animated_loan_demo_'
    });
    
    const formRenderer = useDynamicFormRenderer({
      storage,
      autoSave: true,
      realTimeValidation: true
    });

    // Load current step schema
    const loadCurrentStep = () => {
      formRenderer.loadSchema(steps[currentStep.value].schema);
    };

    // Cross-step validation
    const validateCrossSteps = () => {
      const data = storage.exportData();
      validationResults.value = [];

      // Income validation
      if (data.monthlyIncome) {
        validationResults.value.push({
          id: 'income_check',
          name: 'Income Validation',
          message: data.monthlyIncome >= 1000 ? 'Income requirement met' : 'Income below minimum',
          status: data.monthlyIncome >= 1000 ? 'valid' : 'error',
          confidence: data.monthlyIncome >= 1000 ? 95 : 30,
          affectedSteps: [1]
        });
      }

      // Loan amount vs income validation
      if (data.monthlyIncome && data.loanAmount) {
        const maxLoan = data.monthlyIncome * 12 * 0.4; // 40% of annual income
        const isValid = data.loanAmount <= maxLoan;
        validationResults.value.push({
          id: 'loan_income_ratio',
          name: 'Loan-to-Income Ratio',
          message: isValid ? 'Loan amount within limits' : `Exceeds 40% of annual income ($${maxLoan.toLocaleString()})`,
          status: isValid ? 'valid' : 'error',
          confidence: isValid ? 90 : 25,
          affectedSteps: [1, 2]
        });
      }

      // Employment stability
      if (data.employmentStatus && data.loanAmount) {
        const isSelfEmployed = data.employmentStatus === 'selfEmployed';
        const isLargeAmount = data.loanAmount > 20000;
        const needsReview = isSelfEmployed && isLargeAmount;
        
        validationResults.value.push({
          id: 'employment_stability',
          name: 'Employment Stability',
          message: needsReview ? 'Self-employed applicants need additional documentation for large loans' : 'Employment status acceptable',
          status: needsReview ? 'warning' : 'valid',
          confidence: needsReview ? 70 : 95,
          affectedSteps: [1, 2]
        });
      }
    };

    // Navigation functions
    const goToStep = async (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        currentStep.value = stepIndex;
        loadCurrentStep();
        validateCrossSteps();
      }
    };

    const nextStep = async () => {
      const isValid = await formRenderer.validateForm();
      if (isValid) {
        completedSteps.value.add(currentStep.value);
        stepProgress.value[currentStep.value] = 100;
        
        if (currentStep.value < steps.length - 1) {
          await goToStep(currentStep.value + 1);
          stepProgress.value[currentStep.value] = 0;
        }
      }
    };

    const handleStepClick = (stepIndex) => {
      if (completedSteps.value.has(stepIndex) || stepIndex <= currentStep.value) {
        goToStep(stepIndex);
      }
    };

    const handleActionClick = (action) => {
      if (action.id === 'save') {
        console.log('Saving application data:', storage.exportData());
      } else if (action.id === 'export') {
        const data = storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'loan-application.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    // Watch storage changes to update progress
    watch(() => storage.exportData(), (data) => {
      const currentFields = steps[currentStep.value].schema.fields;
      const completedFields = currentFields.filter(field => data[field.id]).length;
      const progress = (completedFields / currentFields.length) * 100;
      stepProgress.value[currentStep.value] = Math.round(progress);
      
      validateCrossSteps();
    }, { deep: true });

    // Initialize
    loadCurrentStep();

    return {
      steps,
      currentStep,
      completedSteps,
      stepProgress,
      validationResults,
      formRenderer,
      storage,
      handleStepClick,
      handleActionClick,
      nextStep,
      ...formRenderer,
      ...args
    };
  },
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-6xl mx-auto space-y-6">
        <!-- State Visualizer -->
        <StateTransitionVisualizer
          :steps="steps"
          :current-step="currentStep"
          :completed-steps="completedSteps"
          :step-progress="stepProgress"
          :validation-results="validationResults"
          :theme="theme"
          :compact="compact"
          :animation-speed="animationSpeed"
          @step-click="handleStepClick"
          @action-click="handleActionClick"
        />
        
        <!-- Current Form -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="mb-4">
            <h2 class="text-xl font-semibold text-gray-900">{{ steps[currentStep].title }}</h2>
            <p class="text-gray-600">{{ steps[currentStep].description }}</p>
          </div>
          
          <DynamicFormRenderer
            :schema="schema"
            :storage-config="{ 
              storageType: 'localStorage',
              autoSave: true,
              keyPrefix: 'animated_loan_demo_'
            }"
            :on-submit="nextStep"
            class="space-y-4"
          />
        </div>
        
        <!-- Live Data Inspector -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Live Application Data</h3>
          <div class="bg-gray-50 rounded p-4">
            <pre class="text-sm text-gray-700">{{ JSON.stringify(storage.exportData(), null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  `
});

// Error states demonstration
const ErrorStatesTemplate = (args) => ({
  components: { StateTransitionVisualizer },
  setup() {
    const steps = createLoanSteps();
    const currentStep = ref(1);
    const completedSteps = ref(new Set([0]));
    const stepProgress = ref({ 0: 100, 1: 75 });
    const validationResults = ref([
      {
        id: 'income_insufficient',
        name: 'Income Validation',
        message: 'Monthly income below minimum requirement ($1,000)',
        status: 'error',
        confidence: 15,
        affectedSteps: [1]
      },
      {
        id: 'debt_ratio_high',
        name: 'Debt-to-Income Ratio',
        message: 'DTI ratio exceeds maximum of 43%',
        status: 'error',
        confidence: 25,
        affectedSteps: [1, 2]
      },
      {
        id: 'employment_concern',
        name: 'Employment Verification',
        message: 'Self-employed status requires additional documentation',
        status: 'warning',
        confidence: 60,
        affectedSteps: [1]
      }
    ]);

    const handleStepClick = (stepIndex) => {
      console.log('Step clicked:', stepIndex);
    };

    const handleActionClick = (action) => {
      console.log('Action clicked:', action);
    };

    return {
      steps,
      currentStep,
      completedSteps,
      stepProgress,
      validationResults,
      handleStepClick,
      handleActionClick,
      ...args
    };
  },
  template: `
    <div class="p-6 bg-gray-50 min-h-screen">
      <StateTransitionVisualizer
        :steps="steps"
        :current-step="currentStep"
        :completed-steps="completedSteps"
        :step-progress="stepProgress"
        :validation-results="validationResults"
        :theme="theme"
        :compact="compact"
        :animation-speed="animationSpeed"
        @step-click="handleStepClick"
        @action-click="handleActionClick"
      />
    </div>
  `
});

// Story exports
export const BasicVisualizer = BasicVisualizerTemplate.bind({});
BasicVisualizer.args = {
  theme: 'light',
  compact: false,
  animationSpeed: 'normal'
};

export const CompactMode = BasicVisualizerTemplate.bind({});
CompactMode.args = {
  theme: 'light',
  compact: true,
  animationSpeed: 'fast'
};

export const DarkTheme = BasicVisualizerTemplate.bind({});
DarkTheme.args = {
  theme: 'dark',
  compact: false,
  animationSpeed: 'normal'
};

export const SlowAnimations = BasicVisualizerTemplate.bind({});
SlowAnimations.args = {
  theme: 'light',
  compact: false,
  animationSpeed: 'slow'
};

export const IntegratedFormFlow = IntegratedFlowTemplate.bind({});
IntegratedFormFlow.args = {
  theme: 'light',
  compact: false,
  animationSpeed: 'normal'
};

export const ErrorStates = ErrorStatesTemplate.bind({});
ErrorStates.args = {
  theme: 'light',
  compact: false,
  animationSpeed: 'normal'
};

export const FastInteractive = IntegratedFlowTemplate.bind({});
FastInteractive.args = {
  theme: 'light',
  compact: true,
  animationSpeed: 'fast'
};