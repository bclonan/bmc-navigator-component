import { ref, reactive, computed, watch, nextTick } from 'vue';
import { useDynamicFormRenderer } from '../../composables/useDynamicFormRenderer.js';
import { useAdvancedValidation } from '../../composables/useAdvancedValidation.js';
import { useStorageEngine } from '../../composables/useStorageEngine.js';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import StateTransitionVisualizer from '../../components/visualization/StateTransitionVisualizer.vue';

export default {
  title: 'Demo/Complete Loan Application Flow',
  component: DynamicFormRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete loan application demonstrating multi-step forms, cross-step validation, state persistence, and advanced financial validation patterns.'
      }
    }
  }
};

// Multi-step loan application with comprehensive cross-validation
const createLoanApplicationFlow = () => {
  const steps = [
    {
      id: "personal_info",
      title: "Personal Information",
      description: "Basic personal and contact details",
      schema: {
        title: "Personal Information",
        description: "Provide your basic personal details",
        fields: [
          {
            id: "firstName",
            type: "text",
            label: "First Name",
            placeholder: "Enter your first name",
            validation: [
              { type: "required", message: "First name is required" },
              { type: "minLength", value: 2, message: "First name must be at least 2 characters" }
            ],
            layout: { width: "half" }
          },
          {
            id: "lastName",
            type: "text",
            label: "Last Name",
            placeholder: "Enter your last name",
            validation: [
              { type: "required", message: "Last name is required" },
              { type: "minLength", value: 2, message: "Last name must be at least 2 characters" }
            ],
            layout: { width: "half" }
          },
          {
            id: "email",
            type: "email",
            label: "Email Address",
            placeholder: "your.email@example.com",
            validation: [
              { type: "required", message: "Email is required" },
              { type: "email", message: "Please enter a valid email address" }
            ],
            layout: { width: "full" }
          },
          {
            id: "phone",
            type: "tel",
            label: "Phone Number",
            placeholder: "(555) 123-4567",
            validation: [
              { type: "required", message: "Phone number is required" },
              { type: "phone", message: "Please enter a valid phone number" }
            ],
            layout: { width: "half" }
          },
          {
            id: "ssn",
            type: "text",
            label: "Social Security Number",
            placeholder: "123-45-6789",
            validation: [
              { type: "required", message: "SSN is required" },
              { type: "ssn", message: "Please enter a valid SSN" }
            ],
            layout: { width: "half" }
          },
          {
            id: "dateOfBirth",
            type: "date",
            label: "Date of Birth",
            validation: [
              { type: "required", message: "Date of birth is required" },
              { type: "minimumAge", value: 18, message: "You must be at least 18 years old" }
            ],
            layout: { width: "half" }
          }
        ]
      }
    },
    {
      id: "financial_info",
      title: "Financial Information",
      description: "Income, employment, and banking details",
      schema: {
        title: "Financial Information",
        description: "Provide your employment and income details",
        fields: [
          {
            id: "employmentStatus",
            type: "select",
            label: "Employment Status",
            options: [
              { value: "employed", label: "Employed Full-time" },
              { value: "partTime", label: "Employed Part-time" },
              { value: "selfEmployed", label: "Self-employed" },
              { value: "unemployed", label: "Unemployed" },
              { value: "retired", label: "Retired" }
            ],
            validation: [
              { type: "required", message: "Employment status is required" }
            ],
            layout: { width: "half" }
          },
          {
            id: "monthlyIncome",
            type: "number",
            label: "Monthly Income ($)",
            placeholder: "5000",
            validation: [
              { type: "required", message: "Monthly income is required" },
              { type: "min", value: 1000, message: "Minimum income requirement is $1,000" }
            ],
            layout: { width: "half" }
          },
          {
            id: "employer",
            type: "text",
            label: "Employer Name",
            placeholder: "Company Name",
            conditionalLogic: {
              showIf: "employmentStatus === 'employed' || employmentStatus === 'partTime'"
            },
            validation: [
              { 
                type: "conditional", 
                condition: "employmentStatus === 'employed' || employmentStatus === 'partTime'",
                rules: [{ type: "required", message: "Employer name is required for employed applicants" }]
              }
            ],
            layout: { width: "full" }
          },
          {
            id: "yearsAtJob",
            type: "number",
            label: "Years at Current Job",
            placeholder: "2.5",
            conditionalLogic: {
              showIf: "employmentStatus === 'employed' || employmentStatus === 'partTime'"
            },
            validation: [
              { 
                type: "conditional", 
                condition: "employmentStatus === 'employed' || employmentStatus === 'partTime'",
                rules: [{ type: "required", message: "Years at job is required" }]
              }
            ],
            layout: { width: "half" }
          },
          {
            id: "bankAccountNumber",
            type: "text",
            label: "Bank Account Number",
            placeholder: "123456789012",
            validation: [
              { type: "required", message: "Bank account number is required" },
              { type: "bankAccount", message: "Please enter a valid bank account number" }
            ],
            layout: { width: "half" }
          },
          {
            id: "routingNumber",
            type: "text",
            label: "Bank Routing Number",
            placeholder: "021000021",
            validation: [
              { type: "required", message: "Routing number is required" },
              { type: "routingNumber", message: "Please enter a valid 9-digit routing number" }
            ],
            layout: { width: "half" }
          }
        ]
      }
    },
    {
      id: "loan_details",
      title: "Loan Requirements",
      description: "Loan amount, purpose, and terms",
      schema: {
        title: "Loan Requirements",
        description: "Specify your loan requirements",
        fields: [
          {
            id: "loanAmount",
            type: "number",
            label: "Requested Loan Amount ($)",
            placeholder: "15000",
            validation: [
              { type: "required", message: "Loan amount is required" },
              { type: "min", value: 1000, message: "Minimum loan amount is $1,000" },
              { type: "max", value: 50000, message: "Maximum loan amount is $50,000" }
            ],
            layout: { width: "half" }
          },
          {
            id: "loanPurpose",
            type: "select",
            label: "Loan Purpose",
            options: [
              { value: "debtConsolidation", label: "Debt Consolidation" },
              { value: "homeImprovement", label: "Home Improvement" },
              { value: "medical", label: "Medical Expenses" },
              { value: "vacation", label: "Vacation" },
              { value: "wedding", label: "Wedding" },
              { value: "other", label: "Other" }
            ],
            validation: [
              { type: "required", message: "Loan purpose is required" }
            ],
            layout: { width: "half" }
          },
          {
            id: "currentMonthlyDebt",
            type: "number",
            label: "Current Monthly Debt Payments ($)",
            placeholder: "800",
            validation: [
              { type: "required", message: "Current debt payments required for qualification" }
            ],
            layout: { width: "half" }
          },
          {
            id: "requestedTerm",
            type: "select",
            label: "Preferred Loan Term",
            options: [
              { value: "24", label: "24 months" },
              { value: "36", label: "36 months" },
              { value: "48", label: "48 months" },
              { value: "60", label: "60 months" }
            ],
            validation: [
              { type: "required", message: "Loan term is required" }
            ],
            layout: { width: "half" }
          }
        ]
      }
    },
    {
      id: "verification",
      title: "Application Review",
      description: "Review and submit your application",
      schema: {
        title: "Application Review",
        description: "Review your information and provide final consents",
        fields: [
          {
            id: "creditCheckConsent",
            type: "checkbox",
            label: "I consent to a credit check being performed",
            validation: [
              { type: "required", message: "Credit check consent is required" }
            ]
          },
          {
            id: "termsAccepted",
            type: "checkbox",
            label: "I agree to the terms and conditions",
            validation: [
              { type: "required", message: "You must accept the terms and conditions" }
            ]
          },
          {
            id: "electronicSignature",
            type: "text",
            label: "Electronic Signature (Type your full name)",
            placeholder: "John Doe",
            validation: [
              { type: "required", message: "Electronic signature is required" }
            ]
          }
        ]
      }
    }
  ];

  return { steps };
};

// Cross-step validation rules
const crossStepValidators = [
  {
    id: "income_loan_ratio",
    name: "Income vs Loan Amount",
    description: "Loan amount cannot exceed 40% of annual income",
    validate: (data) => {
      if (!data.loanAmount || !data.monthlyIncome) return { valid: true };
      const annualIncome = data.monthlyIncome * 12;
      const maxLoanAmount = annualIncome * 0.4;
      return {
        valid: data.loanAmount <= maxLoanAmount,
        message: `Loan amount ($${data.loanAmount.toLocaleString()}) exceeds 40% of annual income ($${maxLoanAmount.toLocaleString()})`
      };
    }
  },
  {
    id: "debt_to_income",
    name: "Debt-to-Income Ratio",
    description: "Total DTI including new loan cannot exceed 43%",
    validate: (data) => {
      if (!data.currentMonthlyDebt || !data.monthlyIncome || !data.loanAmount || !data.requestedTerm) {
        return { valid: true };
      }
      const newMonthlyPayment = data.loanAmount / parseInt(data.requestedTerm);
      const totalMonthlyDebt = data.currentMonthlyDebt + newMonthlyPayment;
      const dtiRatio = totalMonthlyDebt / data.monthlyIncome;
      return {
        valid: dtiRatio <= 0.43,
        message: `Total debt-to-income ratio (${Math.round(dtiRatio * 100)}%) exceeds maximum of 43%`
      };
    }
  },
  {
    id: "employment_stability",
    name: "Employment Stability",
    description: "Employment requirements for loan approval",
    validate: (data) => {
      if (!data.employmentStatus || !data.loanAmount) return { valid: true };
      
      if (data.loanAmount > 10000) {
        if (data.employmentStatus === 'employed' && (!data.yearsAtJob || data.yearsAtJob < 2)) {
          return {
            valid: false,
            message: "For loans over $10,000, employed applicants need at least 2 years at current job"
          };
        }
        if (data.employmentStatus === 'selfEmployed' && (!data.yearsAtJob || data.yearsAtJob < 3)) {
          return {
            valid: false,
            message: "For loans over $10,000, self-employed applicants need at least 3 years in business"
          };
        }
      }
      return { valid: true };
    }
  },
  {
    id: "signature_match",
    name: "Signature Verification",
    description: "Electronic signature must match applicant name",
    validate: (data) => {
      if (!data.electronicSignature || !data.firstName || !data.lastName) return { valid: true };
      const expectedSignature = `${data.firstName} ${data.lastName}`;
      return {
        valid: data.electronicSignature.trim() === expectedSignature,
        message: `Electronic signature must exactly match: ${expectedSignature}`
      };
    }
  }
];

// Main template component
const Template = (args) => ({
  components: { DynamicFormRenderer, StateTransitionVisualizer },
  setup() {
    const { steps } = createLoanApplicationFlow();
    const currentStepIndex = ref(0);
    const completedSteps = ref(new Set());
    const crossStepErrors = ref([]);
    const applicationMetrics = ref({});
    const stepProgress = ref({});
    const validationResults = ref([]);
    
    // Storage engine with comprehensive configuration
    const storage = useStorageEngine({
      storageType: 'localStorage',
      autoSave: true,
      autoSaveInterval: 1500,
      encryption: true,
      versioning: true,
      maxVersions: 10,
      keyPrefix: 'yourtownfinance_loan_app_'
    });
    
    // Form renderer for current step
    const formRenderer = useDynamicFormRenderer({
      storage,
      autoSave: true,
      realTimeValidation: true
    });
    
    // Load current step
    const loadCurrentStep = async () => {
      const currentStep = steps[currentStepIndex.value];
      await formRenderer.loadSchema(currentStep.schema);
    };
    
    // Cross-step validation
    const validateCrossSteps = () => {
      const allData = storage.exportData();
      crossStepErrors.value = [];
      validationResults.value = [];
      
      crossStepValidators.forEach(validator => {
        const result = validator.validate(allData);
        const validationItem = {
          id: validator.id,
          name: validator.name,
          message: result.valid ? 'Validation passed' : result.message,
          status: result.valid ? 'valid' : 'error',
          confidence: result.valid ? 95 : 25,
          affectedSteps: [currentStepIndex.value]
        };
        
        validationResults.value.push(validationItem);
        
        if (!result.valid) {
          crossStepErrors.value.push({
            id: validator.id,
            name: validator.name,
            message: result.message,
            description: validator.description
          });
        }
      });
      
      // Calculate application metrics
      if (allData.monthlyIncome && allData.loanAmount && allData.requestedTerm && allData.currentMonthlyDebt) {
        const monthlyPayment = allData.loanAmount / parseInt(allData.requestedTerm);
        const currentDTI = (allData.currentMonthlyDebt / allData.monthlyIncome) * 100;
        const newDTI = ((allData.currentMonthlyDebt + monthlyPayment) / allData.monthlyIncome) * 100;
        const loanToIncome = (allData.loanAmount / (allData.monthlyIncome * 12)) * 100;
        
        applicationMetrics.value = {
          monthlyPayment: Math.round(monthlyPayment),
          currentDTI: Math.round(currentDTI),
          newDTI: Math.round(newDTI),
          loanToIncome: Math.round(loanToIncome),
          qualification: newDTI <= 43 && loanToIncome <= 40 ? 'Likely Approved' : 'Needs Review'
        };
      }
    };
    
    // Navigation functions
    const goToStep = async (stepIndex) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        currentStepIndex.value = stepIndex;
        await loadCurrentStep();
        validateCrossSteps();
      }
    };
    
    const nextStep = async () => {
      const isValid = await formRenderer.validateForm();
      if (isValid) {
        completedSteps.value.add(currentStepIndex.value);
        if (currentStepIndex.value < steps.length - 1) {
          await goToStep(currentStepIndex.value + 1);
        }
      }
    };
    
    const prevStep = async () => {
      if (currentStepIndex.value > 0) {
        await goToStep(currentStepIndex.value - 1);
      }
    };
    
    const submitApplication = async () => {
      const isValid = await formRenderer.validateForm();
      validateCrossSteps();
      
      if (isValid && crossStepErrors.value.length === 0) {
        const applicationData = storage.exportData();
        
        // Simulate submission with realistic processing
        const submissionResult = {
          success: true,
          applicationId: `ML-${Date.now()}`,
          submittedAt: new Date().toISOString(),
          applicationData,
          metrics: applicationMetrics.value,
          estimatedDecisionTime: '24-48 hours',
          nextSteps: [
            'Document verification',
            'Credit check processing', 
            'Final underwriting review',
            'Loan decision notification'
          ]
        };
        
        console.log('Loan Application Submitted:', submissionResult);
        
        // Store submission record
        storage.setProperty('_submission', submissionResult);
        
        return submissionResult;
      } else {
        return {
          success: false,
          errors: crossStepErrors.value,
          validationErrors: formRenderer.errors,
          message: 'Please resolve all validation errors before submitting.'
        };
      }
    };
    
    // Watch for data changes and update progress
    watch(() => storage.exportData(), (data) => {
      const currentFields = steps[currentStepIndex.value].schema.fields;
      const completedFields = currentFields.filter(field => data[field.id]).length;
      const progress = (completedFields / currentFields.length) * 100;
      stepProgress.value[currentStepIndex.value] = Math.round(progress);
      
      validateCrossSteps();
    }, { deep: true });
    
    // Initialize
    loadCurrentStep();
    
    // Computed properties
    const currentStep = computed(() => steps[currentStepIndex.value]);
    const progressPercentage = computed(() => {
      return Math.round(((completedSteps.value.size + 1) / steps.length) * 100);
    });
    const canProceed = computed(() => {
      return completedSteps.value.has(currentStepIndex.value);
    });
    const isLastStep = computed(() => {
      return currentStepIndex.value === steps.length - 1;
    });
    const allStepsCompleted = computed(() => {
      return completedSteps.value.size === steps.length;
    });
    const qualificationStatus = computed(() => {
      if (!applicationMetrics.value.newDTI) return 'Incomplete';
      if (crossStepErrors.value.length > 0) return 'Issues Found';
      return applicationMetrics.value.qualification;
    });
    
    // Handle visualizer events
    const handleVisualizerStepClick = (stepIndex) => {
      if (completedSteps.value.has(stepIndex) || stepIndex <= currentStepIndex.value) {
        goToStep(stepIndex);
      }
    };

    const handleVisualizerActionClick = (action) => {
      if (action.id === 'save') {
        console.log('Saving application progress:', storage.exportData());
      } else if (action.id === 'export') {
        const data = storage.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'yourtownfinance-loan-application.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    };

    return {
      steps,
      currentStep,
      currentStepIndex,
      completedSteps,
      crossStepErrors,
      applicationMetrics,
      stepProgress,
      validationResults,
      storage,
      formRenderer,
      goToStep,
      nextStep,
      prevStep,
      submitApplication,
      progressPercentage,
      canProceed,
      isLastStep,
      allStepsCompleted,
      qualificationStatus,
      crossStepValidators,
      handleVisualizerStepClick,
      handleVisualizerActionClick,
      ...formRenderer
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50 py-6">
      <div class="max-w-6xl mx-auto px-4">
        <!-- Animated State Transition Visualizer -->
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
          class="mb-6"
        />
        
        <!-- Header with Progress -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Your Town Finance Loan Application</h1>
              <p class="text-gray-600 mt-1">Complete multi-step application with real-time validation and animated progress tracking</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold" :class="qualificationStatus === 'Likely Approved' ? 'text-green-600' : qualificationStatus === 'Issues Found' ? 'text-red-600' : 'text-gray-500'">
                {{ qualificationStatus }}
              </div>
              <div class="text-sm text-gray-500">Pre-qualification Status</div>
            </div>
          </div>
          
          <!-- Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Application Progress</span>
              <span class="text-sm text-gray-500">{{ progressPercentage }}% Complete</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" :style="{ width: progressPercentage + '%' }"></div>
            </div>
          </div>
          
          <!-- Step Indicators -->
          <div class="flex justify-between">
            <button
              v-for="(step, index) in steps"
              :key="step.id"
              @click="goToStep(index)"
              :class="[
                'flex-1 mx-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200',
                currentStepIndex === index 
                  ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                  : completedSteps.has(index)
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              <div class="text-center">
                <div class="font-semibold">{{ index + 1 }}. {{ step.title }}</div>
                <div class="text-xs opacity-75">{{ step.description }}</div>
                <span v-if="completedSteps.has(index)" class="inline-block mt-1 text-green-600">✓</span>
              </div>
            </button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Main Form Area -->
          <div class="lg:col-span-3">
            <!-- Cross-Step Validation Issues -->
            <div v-if="crossStepErrors.length > 0" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div class="flex items-center mb-3">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span class="text-red-600 font-bold">!</span>
                </div>
                <h3 class="text-red-800 font-semibold">Application Issues Found</h3>
              </div>
              <div class="space-y-2">
                <div v-for="error in crossStepErrors" :key="error.id" class="bg-white border border-red-200 rounded p-3">
                  <div class="font-medium text-red-800">{{ error.name }}</div>
                  <div class="text-red-700 text-sm">{{ error.message }}</div>
                  <div class="text-red-600 text-xs mt-1">{{ error.description }}</div>
                </div>
              </div>
            </div>
            
            <!-- Application Metrics -->
            <div v-if="Object.keys(applicationMetrics).length > 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 class="text-blue-800 font-semibold mb-3 flex items-center">
                <span class="w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center mr-2">$</span>
                Loan Qualification Metrics
              </h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div class="bg-white rounded p-3 border border-blue-200">
                  <div class="text-blue-600 font-medium">Monthly Payment</div>
                  <div class="text-2xl font-bold text-gray-900">\${{ applicationMetrics.monthlyPayment?.toLocaleString() }}</div>
                </div>
                <div class="bg-white rounded p-3 border border-blue-200">
                  <div class="text-blue-600 font-medium">Current DTI</div>
                  <div class="text-2xl font-bold text-gray-900">{{ applicationMetrics.currentDTI }}%</div>
                </div>
                <div class="bg-white rounded p-3 border border-blue-200">
                  <div class="text-blue-600 font-medium">New DTI</div>
                  <div class="text-2xl font-bold" :class="applicationMetrics.newDTI > 43 ? 'text-red-600' : 'text-gray-900'">{{ applicationMetrics.newDTI }}%</div>
                </div>
                <div class="bg-white rounded p-3 border border-blue-200">
                  <div class="text-blue-600 font-medium">Loan-to-Income</div>
                  <div class="text-2xl font-bold" :class="applicationMetrics.loanToIncome > 40 ? 'text-red-600' : 'text-gray-900'">{{ applicationMetrics.loanToIncome }}%</div>
                </div>
              </div>
            </div>
            
            <!-- Form Content -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div class="mb-4">
                <h2 class="text-xl font-semibold text-gray-900">{{ currentStep.title }}</h2>
                <p class="text-gray-600">{{ currentStep.description }}</p>
              </div>
              
              <DynamicFormRenderer
                :schema="schema"
                :storage-config="{ 
                  storageType: 'localStorage',
                  autoSave: true,
                  encryption: true,
                  versioning: true,
                  keyPrefix: 'yourtownfinance_loan_app_'
                }"
                :on-submit="isLastStep ? submitApplication : nextStep"
                class="space-y-6"
              />
            </div>
            
            <!-- Navigation Controls -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex justify-between items-center">
                <button
                  v-if="currentStepIndex > 0"
                  @click="prevStep"
                  class="flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <span class="mr-2">←</span> Previous Step
                </button>
                <div v-else></div>
                
                <div class="flex space-x-4">
                  <button
                    v-if="!isLastStep"
                    @click="nextStep"
                    :disabled="!canProceed"
                    :class="[
                      'flex items-center px-6 py-3 rounded-md transition-colors',
                      canProceed 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    Next Step <span class="ml-2">→</span>
                  </button>
                  <button
                    v-else
                    @click="submitApplication"
                    :disabled="crossStepErrors.length > 0"
                    :class="[
                      'flex items-center px-6 py-3 rounded-md transition-colors',
                      crossStepErrors.length === 0
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    ]"
                  >
                    <span class="mr-2">📋</span> Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Sidebar with Data Inspector -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Storage Engine Status -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Storage Engine</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600">Type:</span>
                  <span class="font-medium">localStorage</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Encryption:</span>
                  <span class="font-medium text-green-600">Enabled</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Auto-save:</span>
                  <span class="font-medium text-green-600">1.5s</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">Versions:</span>
                  <span class="font-medium">{{ storage.data.metadata?.versions?.length || 0 }}</span>
                </div>
              </div>
            </div>
            
            <!-- Cross-Step Validators -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Validation Rules</h3>
              <div class="space-y-2">
                <div v-for="validator in crossStepValidators" :key="validator.id" class="text-sm">
                  <div class="font-medium text-gray-900">{{ validator.name }}</div>
                  <div class="text-gray-600 text-xs">{{ validator.description }}</div>
                  <div class="mt-1">
                    <span :class="crossStepErrors.find(e => e.id === validator.id) ? 'text-red-600' : 'text-green-600'" class="text-xs font-medium">
                      {{ crossStepErrors.find(e => e.id === validator.id) ? '✗ Failed' : '✓ Passed' }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Application Data Inspector -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-lg font-medium text-gray-900 mb-3">Live Data</h3>
              <div class="bg-gray-50 rounded-md p-3 max-h-64 overflow-y-auto">
                <pre class="text-xs text-gray-700 whitespace-pre-wrap">{{ JSON.stringify(storage.exportData(), null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const CompleteLoanApplicationFlow = Template.bind({});
CompleteLoanApplicationFlow.args = {};

export const WithPrefilledData = Template.bind({});
WithPrefilledData.decorators = [
  (story) => {
    const component = story();
    // Prefill realistic loan application data
    setTimeout(() => {
      if (component.storage) {
        component.storage.setProperty('firstName', 'Sarah');
        component.storage.setProperty('lastName', 'Johnson');
        component.storage.setProperty('email', 'sarah.johnson@email.com');
        component.storage.setProperty('phone', '(555) 987-6543');
        component.storage.setProperty('ssn', '123-45-6789');
        component.storage.setProperty('dateOfBirth', '1985-03-15');
        component.storage.setProperty('employmentStatus', 'employed');
        component.storage.setProperty('monthlyIncome', 6500);
        component.storage.setProperty('employer', 'Tech Solutions Inc.');
        component.storage.setProperty('yearsAtJob', 3.5);
        component.storage.setProperty('currentMonthlyDebt', 1200);
        component.storage.setProperty('loanAmount', 18000);
        component.storage.setProperty('loanPurpose', 'debtConsolidation');
        component.storage.setProperty('requestedTerm', '48');
      }
    }, 500);
    return component;
  }
];