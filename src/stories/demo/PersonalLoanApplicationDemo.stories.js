import { ref, reactive, computed, watch } from 'vue';
import StateTransitionVisualizer from '../../components/visualization/StateTransitionVisualizer.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import MSlider from '../../components/ui/MSlider.vue';
import { useDynamicFormRenderer } from '../../composables/useDynamicFormRenderer.js';
import { useStorageEngine } from '../../composables/useStorageEngine.js';
import { useAdvancedValidation } from '../../composables/useAdvancedValidation.js';
import { personalLoanFormConfig, loanApplicationStates } from '../../config/formConfigs.js';

export default {
  title: 'Demo/Personal Loan Application',
  component: DynamicFormRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete personal loan application with mobile-responsive design, slider controls, and comprehensive validation patterns.'
      }
    }
  }
};

// Reusable validation patterns for any JS setting
const createValidationRules = () => ({
  required: (value) => !!value || 'This field is required',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Invalid email format',
  phone: (value) => /^\(\d{3}\)\s\d{3}-\d{4}$/.test(value) || 'Format: (555) 123-4567',
  ssn: (value) => /^\d{3}-\d{2}-\d{4}$/.test(value) || 'Format: 123-45-6789',
  minAge: (age) => (value) => {
    if (!value) return true;
    const birthDate = new Date(value);
    const today = new Date();
    const userAge = today.getFullYear() - birthDate.getFullYear();
    return userAge >= age || `Must be at least ${age} years old`;
  },
  minValue: (min) => (value) => value >= min || `Minimum value is ${min}`,
  maxValue: (max) => (value) => value <= max || `Maximum value is ${max}`,
  bankAccount: (value) => /^\d{8,17}$/.test(value) || 'Invalid account number',
  routingNumber: (value) => /^\d{9}$/.test(value) || 'Invalid routing number'
});

// Simple, reusable loan application schema generator
const createLoanApplicationSteps = () => {
  const validators = createValidationRules();
  
  return [
    {
      id: 'personal_info',
      title: 'Personal Information',
      description: 'Basic personal details',
      icon: 'user',
      schema: {
        title: 'Tell us about yourself',
        description: 'We need some basic information to get started',
        fields: [
          {
            id: 'firstName',
            type: 'text',
            label: 'First Name',
            placeholder: 'John',
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Smith',
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            placeholder: 'john.smith@email.com',
            validation: [validators.required, validators.email],
            layout: { width: 'full' }
          },
          {
            id: 'phone',
            type: 'tel',
            label: 'Phone Number',
            placeholder: '(555) 123-4567',
            validation: [validators.required, validators.phone],
            layout: { width: 'half' }
          },
          {
            id: 'dateOfBirth',
            type: 'date',
            label: 'Date of Birth',
            validation: [validators.required, validators.minAge(18)],
            layout: { width: 'half' }
          },
          {
            id: 'ssn',
            type: 'text',
            label: 'Social Security Number',
            placeholder: '123-45-6789',
            validation: [validators.required, validators.ssn],
            layout: { width: 'half' }
          },
          {
            id: 'maritalStatus',
            type: 'select',
            label: 'Marital Status',
            options: [
              { value: 'single', label: 'Single' },
              { value: 'married', label: 'Married' },
              { value: 'divorced', label: 'Divorced' },
              { value: 'widowed', label: 'Widowed' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          }
        ]
      }
    },
    {
      id: 'employment_income',
      title: 'Employment & Income',
      description: 'Work and financial details',
      icon: 'briefcase',
      schema: {
        title: 'Employment Information',
        description: 'Help us understand your income and employment status',
        fields: [
          {
            id: 'employmentStatus',
            type: 'select',
            label: 'Employment Status',
            options: [
              { value: 'employed_full', label: 'Employed Full-time' },
              { value: 'employed_part', label: 'Employed Part-time' },
              { value: 'self_employed', label: 'Self-employed' },
              { value: 'retired', label: 'Retired' },
              { value: 'unemployed', label: 'Unemployed' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'employer',
            type: 'text',
            label: 'Employer Name',
            placeholder: 'Company Name',
            conditionalLogic: {
              showIf: "employmentStatus === 'employed_full' || employmentStatus === 'employed_part'"
            },
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'jobTitle',
            type: 'text',
            label: 'Job Title',
            placeholder: 'Software Engineer',
            conditionalLogic: {
              showIf: "employmentStatus === 'employed_full' || employmentStatus === 'employed_part'"
            },
            layout: { width: 'full' }
          },
          {
            id: 'monthlyIncome',
            type: 'slider',
            label: 'Monthly Income',
            min: 1000,
            max: 25000,
            step: 250,
            unit: '$',
            showTooltip: true,
            showMarkers: true,
            markers: [
              { value: 1000, label: '$1K' },
              { value: 5000, label: '$5K' },
              { value: 10000, label: '$10K' },
              { value: 15000, label: '$15K' },
              { value: 25000, label: '$25K' }
            ],
            validation: [validators.required, validators.minValue(1000)],
            layout: { width: 'full' }
          },
          {
            id: 'additionalIncome',
            type: 'number',
            label: 'Additional Monthly Income (Optional)',
            placeholder: '500',
            helpText: 'Include rental income, investments, side jobs, etc.',
            layout: { width: 'half' }
          },
          {
            id: 'yearsAtJob',
            type: 'number',
            label: 'Years at Current Job',
            placeholder: '2.5',
            validation: [validators.required, validators.minValue(0)],
            layout: { width: 'half' }
          }
        ]
      }
    },
    {
      id: 'financial_profile',
      title: 'Financial Profile',
      description: 'Credit and expenses',
      icon: 'chart',
      schema: {
        title: 'Financial Information',
        description: 'Tell us about your credit and monthly expenses',
        fields: [
          {
            id: 'creditScore',
            type: 'select',
            label: 'Estimated Credit Score',
            options: [
              { value: 'excellent', label: 'Excellent (750+)' },
              { value: 'very_good', label: 'Very Good (700-749)' },
              { value: 'good', label: 'Good (650-699)' },
              { value: 'fair', label: 'Fair (600-649)' },
              { value: 'poor', label: 'Poor (Below 600)' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'housingStatus',
            type: 'select',
            label: 'Housing Status',
            options: [
              { value: 'own_mortgage', label: 'Own with Mortgage' },
              { value: 'own_free', label: 'Own Free and Clear' },
              { value: 'rent', label: 'Rent' },
              { value: 'live_family', label: 'Live with Family' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'monthlyHousing',
            type: 'slider',
            label: 'Monthly Housing Payment',
            min: 0,
            max: 5000,
            step: 50,
            unit: '$',
            showTooltip: true,
            validation: [validators.required],
            layout: { width: 'full' }
          },
          {
            id: 'monthlyDebt',
            type: 'slider',
            label: 'Other Monthly Debt Payments',
            min: 0,
            max: 3000,
            step: 25,
            unit: '$',
            showTooltip: true,
            helpText: 'Credit cards, auto loans, student loans, etc.',
            validation: [validators.required],
            layout: { width: 'full' }
          },
          {
            id: 'bankAccount',
            type: 'text',
            label: 'Primary Bank Account Number',
            placeholder: '123456789012',
            validation: [validators.required, validators.bankAccount],
            layout: { width: 'half' }
          },
          {
            id: 'routingNumber',
            type: 'text',
            label: 'Bank Routing Number',
            placeholder: '021000021',
            validation: [validators.required, validators.routingNumber],
            layout: { width: 'half' }
          }
        ]
      }
    },
    {
      id: 'loan_details',
      title: 'Loan Details',
      description: 'Amount and purpose',
      icon: 'dollar',
      schema: {
        title: 'Loan Requirements',
        description: 'Specify your loan amount and how you plan to use it',
        fields: [
          {
            id: 'loanAmount',
            type: 'slider',
            label: 'Loan Amount Requested',
            min: 1000,
            max: 50000,
            step: 500,
            unit: '$',
            showTooltip: true,
            showMarkers: true,
            markers: [
              { value: 1000, label: '$1K' },
              { value: 10000, label: '$10K' },
              { value: 25000, label: '$25K' },
              { value: 50000, label: '$50K' }
            ],
            validation: [validators.required, validators.minValue(1000), validators.maxValue(50000)],
            layout: { width: 'full' }
          },
          {
            id: 'loanPurpose',
            type: 'select',
            label: 'Primary Loan Purpose',
            options: [
              { value: 'debt_consolidation', label: 'Debt Consolidation' },
              { value: 'home_improvement', label: 'Home Improvement' },
              { value: 'major_purchase', label: 'Major Purchase' },
              { value: 'medical', label: 'Medical Expenses' },
              { value: 'vacation', label: 'Vacation' },
              { value: 'wedding', label: 'Wedding' },
              { value: 'business', label: 'Business Investment' },
              { value: 'other', label: 'Other' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'loanTerm',
            type: 'select',
            label: 'Preferred Loan Term',
            options: [
              { value: '24', label: '24 months' },
              { value: '36', label: '36 months' },
              { value: '48', label: '48 months' },
              { value: '60', label: '60 months' }
            ],
            validation: [validators.required],
            layout: { width: 'half' }
          },
          {
            id: 'urgency',
            type: 'select',
            label: 'When do you need the funds?',
            options: [
              { value: 'asap', label: 'As soon as possible' },
              { value: 'week', label: 'Within a week' },
              { value: 'month', label: 'Within a month' },
              { value: 'flexible', label: 'Timeline is flexible' }
            ],
            validation: [validators.required],
            layout: { width: 'full' }
          }
        ]
      }
    },
    {
      id: 'review_submit',
      title: 'Review & Submit',
      description: 'Final confirmation',
      icon: 'check',
      schema: {
        title: 'Application Review',
        description: 'Review your information and submit your application',
        fields: [
          {
            id: 'creditCheck',
            type: 'checkbox',
            label: 'I authorize a credit check to be performed',
            validation: [validators.required],
            layout: { width: 'full' }
          },
          {
            id: 'termsAccepted',
            type: 'checkbox',
            label: 'I agree to the terms and conditions',
            validation: [validators.required],
            layout: { width: 'full' }
          },
          {
            id: 'accurateInfo',
            type: 'checkbox',
            label: 'I certify that all information provided is accurate',
            validation: [validators.required],
            layout: { width: 'full' }
          },
          {
            id: 'electronicSignature',
            type: 'text',
            label: 'Electronic Signature (Type your full name)',
            placeholder: 'John Smith',
            validation: [validators.required],
            layout: { width: 'full' }
          }
        ]
      }
    }
  ];
};

// Cross-step validation logic - reusable for any application
const createCrossStepValidation = () => [
  {
    id: 'income_loan_ratio',
    name: 'Income vs Loan Amount',
    validate: (data) => {
      if (!data.monthlyIncome || !data.loanAmount) return { valid: true };
      const annualIncome = data.monthlyIncome * 12;
      const maxLoan = annualIncome * 0.4; // 40% rule
      return {
        valid: data.loanAmount <= maxLoan,
        message: data.loanAmount > maxLoan 
          ? `Loan amount ($${data.loanAmount.toLocaleString()}) exceeds 40% of annual income ($${maxLoan.toLocaleString()})`
          : 'Loan amount within income guidelines',
        severity: data.loanAmount > maxLoan ? 'error' : 'success',
        confidence: data.loanAmount <= maxLoan ? 95 : 25,
        affectedSteps: [1, 3]
      };
    }
  },
  {
    id: 'debt_to_income',
    name: 'Debt-to-Income Ratio',
    validate: (data) => {
      if (!data.monthlyIncome || !data.loanAmount || !data.loanTerm) return { valid: true };
      const totalIncome = data.monthlyIncome + (data.additionalIncome || 0);
      const currentDebt = (data.monthlyHousing || 0) + (data.monthlyDebt || 0);
      const newPayment = data.loanAmount / parseInt(data.loanTerm);
      const totalDebt = currentDebt + newPayment;
      const dtiRatio = totalDebt / totalIncome;
      
      return {
        valid: dtiRatio <= 0.43,
        message: `Total DTI: ${Math.round(dtiRatio * 100)}% ${dtiRatio <= 0.43 ? '(Acceptable)' : '(Exceeds 43% limit)'}`,
        severity: dtiRatio <= 0.43 ? 'success' : 'error',
        confidence: dtiRatio <= 0.43 ? 90 : 20,
        affectedSteps: [1, 2, 3],
        metrics: {
          currentDTI: Math.round((currentDebt / totalIncome) * 100),
          newDTI: Math.round(dtiRatio * 100),
          monthlyPayment: Math.round(newPayment)
        }
      };
    }
  },
  {
    id: 'employment_stability',
    name: 'Employment Stability',
    validate: (data) => {
      if (!data.employmentStatus || !data.loanAmount || !data.yearsAtJob) return { valid: true };
      
      const isEmployed = ['employed_full', 'employed_part'].includes(data.employmentStatus);
      const isSelfEmployed = data.employmentStatus === 'self_employed';
      const isLargeAmount = data.loanAmount > 15000;
      
      let minYears = 1;
      if (isLargeAmount) {
        minYears = isEmployed ? 2 : isSelfEmployed ? 3 : 1;
      }
      
      return {
        valid: data.yearsAtJob >= minYears,
        message: data.yearsAtJob >= minYears 
          ? 'Employment stability meets requirements'
          : `Need ${minYears} years for ${data.employmentStatus.replace('_', ' ')} status with $${data.loanAmount.toLocaleString()} loan`,
        severity: data.yearsAtJob >= minYears ? 'success' : 'warning',
        confidence: data.yearsAtJob >= minYears ? 85 : 50,
        affectedSteps: [1, 3]
      };
    }
  },
  {
    id: 'signature_validation',
    name: 'Signature Verification',
    validate: (data) => {
      if (!data.electronicSignature || !data.firstName || !data.lastName) return { valid: true };
      const expectedSignature = `${data.firstName} ${data.lastName}`.toLowerCase();
      const actualSignature = data.electronicSignature.toLowerCase().trim();
      
      return {
        valid: actualSignature === expectedSignature,
        message: actualSignature === expectedSignature 
          ? 'Signature matches applicant name'
          : `Signature must match: ${data.firstName} ${data.lastName}`,
        severity: actualSignature === expectedSignature ? 'success' : 'error',
        confidence: actualSignature === expectedSignature ? 100 : 0,
        affectedSteps: [0, 4]
      };
    }
  }
];

// Main template with mobile-responsive design
const Template = (args) => ({
  components: { StateTransitionVisualizer, DynamicFormRenderer, MSlider },
  setup() {
    const steps = createLoanApplicationSteps();
    const validators = createCrossStepValidation();
    const currentStepIndex = ref(0);
    const completedSteps = ref(new Set());
    const stepProgress = ref({});
    const validationResults = ref([]);
    const isMobile = ref(window.innerWidth < 768);
    
    // Storage with mobile-friendly configuration
    const storage = useStorageEngine({
      storageType: 'localStorage',
      autoSave: true,
      autoSaveInterval: 2000,
      encryption: true,
      versioning: true,
      keyPrefix: 'personal_loan_app_'
    });
    
    // Form renderer
    const formRenderer = useDynamicFormRenderer({
      storage,
      autoSave: true,
      realTimeValidation: true
    });
    
    // Mobile detection
    const updateMobileStatus = () => {
      isMobile.value = window.innerWidth < 768;
    };
    
    window.addEventListener('resize', updateMobileStatus);
    
    // Load current step
    const loadCurrentStep = async () => {
      const currentStep = steps[currentStepIndex.value];
      await formRenderer.loadSchema(currentStep.schema);
    };
    
    // Validation with metrics
    const runValidation = () => {
      const data = storage.exportData();
      validationResults.value = [];
      
      validators.forEach(validator => {
        const result = validator.validate(data);
        validationResults.value.push({
          id: validator.id,
          name: validator.name,
          ...result
        });
      });
    };
    
    // Navigation
    const goToStep = async (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        currentStepIndex.value = stepIndex;
        await loadCurrentStep();
        runValidation();
      }
    };
    
    const nextStep = async () => {
      const isValid = await formRenderer.validateForm();
      if (isValid) {
        completedSteps.value.add(currentStepIndex.value);
        stepProgress.value[currentStepIndex.value] = 100;
        
        if (currentStepIndex.value < steps.length - 1) {
          await goToStep(currentStepIndex.value + 1);
          stepProgress.value[currentStepIndex.value] = 0;
        }
      }
    };
    
    const prevStep = async () => {
      if (currentStepIndex.value > 0) {
        await goToStep(currentStepIndex.value - 1);
      }
    };
    
    // Submission
    const submitApplication = async () => {
      const isValid = await formRenderer.validateForm();
      runValidation();
      
      const hasErrors = validationResults.value.some(v => v.severity === 'error');
      
      if (isValid && !hasErrors) {
        const applicationData = storage.exportData();
        
        // Calculate qualification metrics
        const monthlyPayment = applicationData.loanAmount / parseInt(applicationData.loanTerm);
        const totalIncome = applicationData.monthlyIncome + (applicationData.additionalIncome || 0);
        const totalDebt = (applicationData.monthlyHousing || 0) + (applicationData.monthlyDebt || 0) + monthlyPayment;
        const dtiRatio = totalDebt / totalIncome;
        
        const result = {
          success: true,
          applicationId: `PL-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          qualification: {
            status: dtiRatio <= 0.36 ? 'Pre-approved' : dtiRatio <= 0.43 ? 'Under Review' : 'Additional Documentation Required',
            monthlyPayment: Math.round(monthlyPayment),
            dtiRatio: Math.round(dtiRatio * 100),
            estimatedRate: dtiRatio <= 0.36 ? '6.99%' : '8.99%'
          },
          nextSteps: [
            'Document verification',
            'Final credit check',
            'Loan decision within 24 hours'
          ]
        };
        
        console.log('Personal Loan Application:', result);
        return result;
      }
      
      return { success: false, errors: validationResults.value.filter(v => v.severity === 'error') };
    };
    
    // Event handlers
    const handleVisualizerStepClick = (stepIndex) => {
      if (completedSteps.value.has(stepIndex) || stepIndex <= currentStepIndex.value) {
        goToStep(stepIndex);
      }
    };
    
    const handleVisualizerActionClick = (action) => {
      if (action.id === 'save') {
        console.log('Saving application:', storage.exportData());
      } else if (action.id === 'export') {
        const data = storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'personal-loan-application.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    };
    
    // Watch for form changes
    watch(() => storage.exportData(), (data) => {
      const currentFields = steps[currentStepIndex.value].schema.fields;
      const completedFields = currentFields.filter(field => data[field.id]).length;
      const progress = (completedFields / currentFields.length) * 100;
      stepProgress.value[currentStepIndex.value] = Math.round(progress);
      
      runValidation();
    }, { deep: true });
    
    // Initialize
    loadCurrentStep();
    
    // Computed properties
    const currentStep = computed(() => steps[currentStepIndex.value]);
    const canProceed = computed(() => completedSteps.value.has(currentStepIndex.value));
    const isLastStep = computed(() => currentStepIndex.value === steps.length - 1);
    const overallProgress = computed(() => {
      const totalSteps = steps.length;
      const completedCount = completedSteps.value.size;
      const currentProgress = stepProgress.value[currentStepIndex.value] || 0;
      return Math.round(((completedCount + currentProgress / 100) / totalSteps) * 100);
    });
    
    return {
      steps,
      currentStepIndex,
      currentStep,
      completedSteps,
      stepProgress,
      validationResults,
      isMobile,
      storage,
      formRenderer,
      canProceed,
      isLastStep,
      overallProgress,
      nextStep,
      prevStep,
      submitApplication,
      handleVisualizerStepClick,
      handleVisualizerActionClick,
      ...formRenderer,
      ...args
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Mobile Header -->
      <div class="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div class="flex items-center justify-between">
          <h1 class="text-lg font-semibold text-gray-900">Personal Loan</h1>
          <div class="text-sm text-gray-500">{{ overallProgress }}% Complete</div>
        </div>
        <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: overallProgress + '%' }"></div>
        </div>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 py-4 lg:py-8">
        <!-- Desktop Header with Visualizer -->
        <div class="hidden lg:block mb-8">
          <StateTransitionVisualizer
            :steps="steps"
            :current-step="currentStepIndex"
            :completed-steps="completedSteps"
            :step-progress="stepProgress"
            :validation-results="validationResults"
            theme="light"
            :compact="false"
            animation-speed="normal"
            @step-click="handleVisualizerStepClick"
            @action-click="handleVisualizerActionClick"
          />
        </div>
        
        <!-- Mobile Step Indicator -->
        <div class="lg:hidden mb-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-semibold text-gray-900">{{ currentStep.title }}</h2>
            <span class="text-sm text-gray-500">Step {{ currentStepIndex + 1 }} of {{ steps.length }}</span>
          </div>
          <div class="flex space-x-2">
            <div
              v-for="(step, index) in steps"
              :key="step.id"
              class="flex-1 h-2 rounded-full"
              :class="{
                'bg-blue-600': index <= currentStepIndex,
                'bg-gray-200': index > currentStepIndex
              }"
            ></div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Form Area -->
          <div class="lg:col-span-3">
            <!-- Validation Alerts -->
            <div v-if="validationResults.some(v => v.severity === 'error')" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex items-center mb-2">
                <svg class="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <h3 class="text-red-800 font-medium">Application Issues</h3>
              </div>
              <ul class="text-red-700 text-sm space-y-1">
                <li v-for="error in validationResults.filter(v => v.severity === 'error')" :key="error.id">
                  • {{ error.message }}
                </li>
              </ul>
            </div>
            
            <!-- Form Content -->
            <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6 mb-6">
              <div class="mb-6">
                <h2 class="text-2xl font-semibold text-gray-900 hidden lg:block">{{ currentStep.title }}</h2>
                <p class="text-gray-600 mt-1">{{ currentStep.schema.description }}</p>
              </div>
              
              <DynamicFormRenderer
                :schema="schema"
                :storage-config="{ 
                  storageType: 'localStorage',
                  autoSave: true,
                  encryption: true,
                  keyPrefix: 'personal_loan_app_'
                }"
                :on-submit="isLastStep ? submitApplication : nextStep"
                class="space-y-4 lg:space-y-6"
              />
            </div>
            
            <!-- Navigation -->
            <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6">
              <div class="flex justify-between items-center">
                <button
                  v-if="currentStepIndex > 0"
                  @click="prevStep"
                  class="flex items-center px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
                <div v-else></div>
                
                <button
                  @click="isLastStep ? submitApplication() : nextStep()"
                  :disabled="!canProceed && !isLastStep"
                  :class="[
                    'flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-colors',
                    canProceed || isLastStep
                      ? (isLastStep ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white')
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  ]"
                >
                  {{ isLastStep ? 'Submit Application' : 'Continue' }}
                  <svg v-if="!isLastStep" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Sidebar - Hidden on Mobile -->
          <div class="hidden lg:block lg:col-span-1 space-y-6">
            <!-- Qualification Preview -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Qualification Preview</h3>
              <div class="space-y-3">
                <div v-for="result in validationResults.filter(v => v.metrics)" :key="result.id" class="text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Monthly Payment:</span>
                    <span class="font-medium">\${{ result.metrics?.monthlyPayment?.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">DTI Ratio:</span>
                    <span :class="result.metrics?.newDTI <= 36 ? 'text-green-600' : result.metrics?.newDTI <= 43 ? 'text-yellow-600' : 'text-red-600'" class="font-medium">
                      {{ result.metrics?.newDTI }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Application Summary -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Application Summary</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Progress:</span>
                  <span class="font-medium">{{ overallProgress }}%</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Validation:</span>
                  <span :class="validationResults.some(v => v.severity === 'error') ? 'text-red-600' : 'text-green-600'" class="font-medium">
                    {{ validationResults.some(v => v.severity === 'error') ? 'Issues Found' : 'All Good' }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Auto-save:</span>
                  <span class="text-green-600 font-medium">Enabled</span>
                </div>
              </div>
            </div>
            
            <!-- Live Data -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Live Data</h3>
              <div class="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
                <pre class="text-xs text-gray-700">{{ JSON.stringify(storage.exportData(), null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const PersonalLoanApplication = Template.bind({});
PersonalLoanApplication.args = {};

export const MobileOptimized = Template.bind({});
MobileOptimized.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};