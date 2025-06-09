import { ref, reactive, computed, watch, onMounted } from 'vue';
import { useDynamicFormRenderer } from '../../composables/useDynamicFormRenderer.js';
import { useAdvancedValidation } from '../../composables/useAdvancedValidation.js';
import { useStorageEngine } from '../../composables/useStorageEngine.js';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';

export default {
  title: 'Demo/Advanced State Management',
  component: DynamicFormRenderer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced demonstration of state management across multiple forms with real-time validation, data persistence, and cross-form dependencies.'
      }
    }
  }
};

// Complex multi-form system with interdependencies
const createFinancialDashboardSystem = () => {
  return {
    personalProfile: {
      id: 'personal_profile',
      title: 'Personal Profile',
      schema: {
        title: 'Personal Profile Management',
        description: 'Manage your personal information and preferences',
        fields: [
          {
            id: 'firstName',
            type: 'text',
            label: 'First Name',
            validation: [{ type: 'required' }, { type: 'minLength', value: 2 }],
            layout: { width: 'half' }
          },
          {
            id: 'lastName',
            type: 'text',
            label: 'Last Name',
            validation: [{ type: 'required' }, { type: 'minLength', value: 2 }],
            layout: { width: 'half' }
          },
          {
            id: 'email',
            type: 'email',
            label: 'Email Address',
            validation: [{ type: 'required' }, { type: 'email' }],
            layout: { width: 'full' }
          },
          {
            id: 'phone',
            type: 'tel',
            label: 'Phone Number',
            validation: [{ type: 'required' }, { type: 'phone' }],
            layout: { width: 'half' }
          },
          {
            id: 'preferredContactMethod',
            type: 'select',
            label: 'Preferred Contact Method',
            options: [
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' },
              { value: 'text', label: 'Text Message' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          }
        ]
      }
    },
    incomeVerification: {
      id: 'income_verification',
      title: 'Income Verification',
      schema: {
        title: 'Income & Employment Details',
        description: 'Verify your income and employment information',
        fields: [
          {
            id: 'employmentType',
            type: 'select',
            label: 'Employment Type',
            options: [
              { value: 'fullTime', label: 'Full-time Employee' },
              { value: 'partTime', label: 'Part-time Employee' },
              { value: 'contractor', label: 'Independent Contractor' },
              { value: 'selfEmployed', label: 'Self-employed' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          },
          {
            id: 'monthlyIncome',
            type: 'number',
            label: 'Monthly Income ($)',
            validation: [{ type: 'required' }, { type: 'min', value: 1000 }],
            layout: { width: 'half' }
          },
          {
            id: 'employer',
            type: 'text',
            label: 'Employer/Company Name',
            conditionalLogic: { showIf: "employmentType !== 'selfEmployed'" },
            validation: [
              { 
                type: 'conditional',
                condition: "employmentType !== 'selfEmployed'",
                rules: [{ type: 'required' }]
              }
            ],
            layout: { width: 'full' }
          },
          {
            id: 'businessName',
            type: 'text',
            label: 'Business Name',
            conditionalLogic: { showIf: "employmentType === 'selfEmployed'" },
            validation: [
              { 
                type: 'conditional',
                condition: "employmentType === 'selfEmployed'",
                rules: [{ type: 'required' }]
              }
            ],
            layout: { width: 'full' }
          },
          {
            id: 'yearsInPosition',
            type: 'number',
            label: 'Years in Current Position',
            validation: [{ type: 'required' }, { type: 'min', value: 0 }],
            layout: { width: 'half' }
          },
          {
            id: 'additionalIncome',
            type: 'number',
            label: 'Additional Monthly Income ($)',
            placeholder: '0',
            layout: { width: 'half' }
          }
        ]
      }
    },
    creditProfile: {
      id: 'credit_profile',
      title: 'Credit Profile',
      schema: {
        title: 'Credit & Financial Profile',
        description: 'Review your credit profile and financial obligations',
        fields: [
          {
            id: 'estimatedCreditScore',
            type: 'select',
            label: 'Estimated Credit Score Range',
            options: [
              { value: 'excellent', label: 'Excellent (750+)' },
              { value: 'good', label: 'Good (700-749)' },
              { value: 'fair', label: 'Fair (650-699)' },
              { value: 'poor', label: 'Poor (600-649)' },
              { value: 'bad', label: 'Bad (Below 600)' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          },
          {
            id: 'currentDebtPayments',
            type: 'number',
            label: 'Current Monthly Debt Payments ($)',
            validation: [{ type: 'required' }, { type: 'min', value: 0 }],
            layout: { width: 'half' }
          },
          {
            id: 'housingPayment',
            type: 'number',
            label: 'Monthly Housing Payment ($)',
            validation: [{ type: 'required' }, { type: 'min', value: 0 }],
            layout: { width: 'half' }
          },
          {
            id: 'housingType',
            type: 'select',
            label: 'Housing Status',
            options: [
              { value: 'own', label: 'Own with Mortgage' },
              { value: 'ownFree', label: 'Own Free & Clear' },
              { value: 'rent', label: 'Rent' },
              { value: 'other', label: 'Other' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          },
          {
            id: 'bankruptcyHistory',
            type: 'select',
            label: 'Bankruptcy History',
            options: [
              { value: 'none', label: 'No Bankruptcy' },
              { value: 'chapter7', label: 'Chapter 7 (1-7 years ago)' },
              { value: 'chapter13', label: 'Chapter 13 (1-7 years ago)' },
              { value: 'oldBankruptcy', label: 'Bankruptcy (7+ years ago)' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'full' }
          }
        ]
      }
    },
    loanRequest: {
      id: 'loan_request',
      title: 'Loan Request',
      schema: {
        title: 'Loan Application Request',
        description: 'Specify your loan requirements and preferences',
        fields: [
          {
            id: 'requestedAmount',
            type: 'number',
            label: 'Requested Loan Amount ($)',
            validation: [
              { type: 'required' },
              { type: 'min', value: 1000 },
              { type: 'max', value: 50000 }
            ],
            layout: { width: 'half' }
          },
          {
            id: 'loanPurpose',
            type: 'select',
            label: 'Primary Loan Purpose',
            options: [
              { value: 'debtConsolidation', label: 'Debt Consolidation' },
              { value: 'homeImprovement', label: 'Home Improvement' },
              { value: 'medical', label: 'Medical Expenses' },
              { value: 'major_purchase', label: 'Major Purchase' },
              { value: 'business', label: 'Business Investment' },
              { value: 'other', label: 'Other' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          },
          {
            id: 'preferredTerm',
            type: 'select',
            label: 'Preferred Loan Term',
            options: [
              { value: '24', label: '24 months' },
              { value: '36', label: '36 months' },
              { value: '48', label: '48 months' },
              { value: '60', label: '60 months' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          },
          {
            id: 'urgency',
            type: 'select',
            label: 'How soon do you need the funds?',
            options: [
              { value: 'immediate', label: 'Immediately' },
              { value: 'week', label: 'Within a week' },
              { value: 'month', label: 'Within a month' },
              { value: 'flexible', label: 'Flexible timing' }
            ],
            validation: [{ type: 'required' }],
            layout: { width: 'half' }
          }
        ]
      }
    }
  };
};

// Advanced cross-form validation rules
const createCrossFormValidators = () => [
  {
    id: 'income_debt_ratio',
    name: 'Debt-to-Income Validation',
    forms: ['income_verification', 'credit_profile', 'loan_request'],
    validate: (data) => {
      const totalIncome = (data.monthlyIncome || 0) + (data.additionalIncome || 0);
      const totalDebt = (data.currentDebtPayments || 0) + (data.housingPayment || 0);
      const requestedPayment = data.requestedAmount && data.preferredTerm ? 
        data.requestedAmount / parseInt(data.preferredTerm) : 0;
      
      if (!totalIncome || !data.requestedAmount) return { valid: true };
      
      const currentDTI = totalDebt / totalIncome;
      const newDTI = (totalDebt + requestedPayment) / totalIncome;
      
      return {
        valid: newDTI <= 0.43,
        message: `Total DTI would be ${Math.round(newDTI * 100)}% (max 43%)`,
        severity: newDTI > 0.5 ? 'error' : newDTI > 0.43 ? 'warning' : 'info',
        metrics: {
          currentDTI: Math.round(currentDTI * 100),
          newDTI: Math.round(newDTI * 100),
          monthlyPayment: Math.round(requestedPayment)
        }
      };
    }
  },
  {
    id: 'employment_stability',
    name: 'Employment Stability Check',
    forms: ['income_verification', 'loan_request'],
    validate: (data) => {
      if (!data.requestedAmount || !data.yearsInPosition) return { valid: true };
      
      const minYears = data.requestedAmount > 25000 ? 2 : 
                      data.requestedAmount > 15000 ? 1.5 : 1;
      
      return {
        valid: data.yearsInPosition >= minYears,
        message: `${minYears} years employment required for $${data.requestedAmount?.toLocaleString()} loan`,
        severity: 'warning'
      };
    }
  },
  {
    id: 'credit_amount_alignment',
    name: 'Credit Score vs Loan Amount',
    forms: ['credit_profile', 'loan_request'],
    validate: (data) => {
      if (!data.estimatedCreditScore || !data.requestedAmount) return { valid: true };
      
      const maxAmounts = {
        excellent: 50000,
        good: 35000,
        fair: 20000,
        poor: 10000,
        bad: 5000
      };
      
      const maxAmount = maxAmounts[data.estimatedCreditScore];
      
      return {
        valid: data.requestedAmount <= maxAmount,
        message: `${data.estimatedCreditScore} credit typically qualifies for max $${maxAmount.toLocaleString()}`,
        severity: data.requestedAmount > maxAmount * 1.2 ? 'error' : 'warning'
      };
    }
  },
  {
    id: 'contact_verification',
    name: 'Contact Information Completeness',
    forms: ['personal_profile'],
    validate: (data) => {
      const hasEmail = data.email && data.email.includes('@');
      const hasPhone = data.phone && data.phone.length >= 10;
      
      return {
        valid: hasEmail && hasPhone,
        message: 'Valid email and phone required for loan processing',
        severity: 'error'
      };
    }
  }
];

// Main template for state management demonstration
const Template = (args) => ({
  components: { DynamicFormRenderer },
  setup() {
    const forms = createFinancialDashboardSystem();
    const validators = createCrossFormValidators();
    const activeFormId = ref('personal_profile');
    const validationResults = ref([]);
    const formStatuses = ref({});
    
    // Storage engines for each form with different configurations
    const storageEngines = reactive({});
    const formRenderers = reactive({});
    
    // Initialize storage engines and form renderers
    Object.keys(forms).forEach(formId => {
      storageEngines[formId] = useStorageEngine({
        storageType: 'localStorage',
        keyPrefix: `financial_dashboard_${formId}_`,
        autoSave: true,
        autoSaveInterval: 2000,
        encryption: true,
        versioning: true
      });
      
      formRenderers[formId] = useDynamicFormRenderer({
        storage: storageEngines[formId],
        autoSave: true,
        realTimeValidation: true
      });
      
      // Load schema
      formRenderers[formId].loadSchema(forms[formId].schema);
    });
    
    // Cross-form validation function
    const validateAllForms = () => {
      const allData = {};
      
      // Collect data from all forms
      Object.keys(storageEngines).forEach(formId => {
        const formData = storageEngines[formId].exportData();
        Object.assign(allData, formData);
      });
      
      // Run cross-form validations
      validationResults.value = validators.map(validator => {
        const result = validator.validate(allData);
        return {
          ...validator,
          ...result,
          data: allData
        };
      });
      
      // Update form statuses
      Object.keys(forms).forEach(formId => {
        const formErrors = validationResults.value.filter(result => 
          !result.valid && result.forms.includes(formId)
        );
        
        formStatuses.value[formId] = {
          hasErrors: formErrors.length > 0,
          errorCount: formErrors.length,
          isComplete: Object.keys(storageEngines[formId].exportData()).length > 0
        };
      });
    };
    
    // Watch for changes in any form
    Object.keys(storageEngines).forEach(formId => {
      watch(
        () => storageEngines[formId].exportData(),
        validateAllForms,
        { deep: true }
      );
    });
    
    // Navigation functions
    const setActiveForm = (formId) => {
      activeFormId.value = formId;
    };
    
    // Global data aggregation
    const aggregatedData = computed(() => {
      const combined = {};
      Object.keys(storageEngines).forEach(formId => {
        Object.assign(combined, storageEngines[formId].exportData());
      });
      return combined;
    });
    
    // Risk assessment computed
    const riskAssessment = computed(() => {
      const data = aggregatedData.value;
      let risk = 'Unknown';
      let factors = [];
      
      if (data.estimatedCreditScore && data.monthlyIncome && data.requestedAmount) {
        const creditScores = { excellent: 4, good: 3, fair: 2, poor: 1, bad: 0 };
        const creditPoints = creditScores[data.estimatedCreditScore] || 0;
        
        const incomePoints = data.monthlyIncome > 5000 ? 2 : data.monthlyIncome > 3000 ? 1 : 0;
        const amountPoints = data.requestedAmount < 10000 ? 2 : data.requestedAmount < 25000 ? 1 : 0;
        
        const totalPoints = creditPoints + incomePoints + amountPoints;
        
        if (totalPoints >= 7) {
          risk = 'Low Risk';
          factors.push('Excellent credit profile', 'Strong income', 'Conservative loan amount');
        } else if (totalPoints >= 4) {
          risk = 'Medium Risk';
          factors.push('Good financial profile', 'Manageable loan request');
        } else {
          risk = 'High Risk';
          factors.push('Credit concerns', 'Income stability questions');
        }
      }
      
      return { risk, factors };
    });
    
    // Initialize validation
    onMounted(() => {
      setTimeout(validateAllForms, 100);
    });
    
    return {
      forms,
      activeFormId,
      validationResults,
      formStatuses,
      storageEngines,
      formRenderers,
      aggregatedData,
      riskAssessment,
      setActiveForm,
      validateAllForms
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50 py-6">
      <div class="max-w-7xl mx-auto px-4">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Financial Dashboard</h1>
              <p class="text-gray-600 mt-1">Advanced state management across multiple forms with real-time validation</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold" :class="{
                'text-green-600': riskAssessment.risk === 'Low Risk',
                'text-yellow-600': riskAssessment.risk === 'Medium Risk',
                'text-red-600': riskAssessment.risk === 'High Risk',
                'text-gray-500': riskAssessment.risk === 'Unknown'
              }">
                {{ riskAssessment.risk }}
              </div>
              <div class="text-sm text-gray-500">Risk Assessment</div>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <!-- Sidebar Navigation -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h3 class="font-semibold text-gray-900 mb-4">Forms</h3>
              <nav class="space-y-2">
                <button
                  v-for="(form, formId) in forms"
                  :key="formId"
                  @click="setActiveForm(formId)"
                  :class="[
                    'w-full text-left px-3 py-2 rounded-md text-sm transition-colors relative',
                    activeFormId === formId 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  {{ form.title }}
                  <span v-if="formStatuses[formId]?.hasErrors" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  <span v-else-if="formStatuses[formId]?.isComplete" class="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </button>
              </nav>
            </div>
            
            <!-- Cross-Form Validation Status -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="font-semibold text-gray-900 mb-4">Validation Status</h3>
              <div class="space-y-3">
                <div v-for="result in validationResults" :key="result.id" class="text-sm">
                  <div class="flex items-center justify-between">
                    <span class="font-medium">{{ result.name }}</span>
                    <span :class="{
                      'text-green-600': result.valid,
                      'text-red-600': result.severity === 'error',
                      'text-yellow-600': result.severity === 'warning'
                    }">
                      {{ result.valid ? '✓' : result.severity === 'error' ? '✗' : '⚠' }}
                    </span>
                  </div>
                  <div v-if="!result.valid" class="text-xs text-gray-600 mt-1">
                    {{ result.message }}
                  </div>
                  <div v-if="result.metrics" class="text-xs bg-gray-50 rounded p-2 mt-1">
                    <div v-for="(value, key) in result.metrics" :key="key" class="flex justify-between">
                      <span>{{ key }}:</span>
                      <span class="font-medium">{{ value }}{{ key.includes('DTI') ? '%' : key.includes('Payment') ? '' : '' }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main Form Area -->
          <div class="lg:col-span-3">
            <!-- Active Form -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div class="mb-4">
                <h2 class="text-xl font-semibold text-gray-900">{{ forms[activeFormId].title }}</h2>
                <p class="text-gray-600">{{ forms[activeFormId].schema.description }}</p>
              </div>
              
              <DynamicFormRenderer
                :schema="forms[activeFormId].schema"
                :storage-config="{ 
                  storageType: 'localStorage',
                  keyPrefix: 'financial_dashboard_' + activeFormId + '_',
                  autoSave: true,
                  encryption: true,
                  versioning: true
                }"
                class="space-y-6"
              />
            </div>
            
            <!-- Cross-Form Validation Results -->
            <div v-if="validationResults.some(r => !r.valid)" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <h3 class="text-red-800 font-semibold mb-3">Cross-Form Validation Issues</h3>
              <div class="space-y-3">
                <div v-for="result in validationResults.filter(r => !r.valid)" :key="result.id" 
                     class="bg-white border border-red-200 rounded p-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-red-800">{{ result.name }}</span>
                    <span :class="{
                      'bg-red-100 text-red-800': result.severity === 'error',
                      'bg-yellow-100 text-yellow-800': result.severity === 'warning'
                    }" class="px-2 py-1 rounded text-xs">
                      {{ result.severity }}
                    </span>
                  </div>
                  <div class="text-red-700 text-sm">{{ result.message }}</div>
                  <div class="text-red-600 text-xs mt-1">
                    Affects: {{ result.forms.map(f => forms[f].title).join(', ') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Sidebar - Data Inspector -->
          <div class="lg:col-span-1 space-y-6">
            <!-- Risk Assessment Details -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="font-semibold text-gray-900 mb-3">Risk Factors</h3>
              <div class="space-y-2">
                <div v-for="factor in riskAssessment.factors" :key="factor" class="text-sm text-gray-700">
                  • {{ factor }}
                </div>
                <div v-if="riskAssessment.factors.length === 0" class="text-sm text-gray-500 italic">
                  Complete forms to see assessment
                </div>
              </div>
            </div>
            
            <!-- Storage Engine Status -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="font-semibold text-gray-900 mb-3">Storage Status</h3>
              <div class="space-y-3">
                <div v-for="(form, formId) in forms" :key="formId" class="text-sm">
                  <div class="font-medium">{{ form.title }}</div>
                  <div class="text-xs text-gray-600">
                    {{ Object.keys(storageEngines[formId].exportData()).length }} fields stored
                  </div>
                  <div class="text-xs text-gray-500">
                    Auto-save: {{ storageEngines[formId].data.metadata?.lastSaved ? 'Active' : 'Pending' }}
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Aggregated Data Preview -->
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="font-semibold text-gray-900 mb-3">Live Data</h3>
              <div class="bg-gray-50 rounded p-3 max-h-64 overflow-y-auto">
                <pre class="text-xs text-gray-700 whitespace-pre-wrap">{{ JSON.stringify(aggregatedData, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const AdvancedStateManagement = Template.bind({});
AdvancedStateManagement.args = {};

export const WithComplexValidation = Template.bind({});
WithComplexValidation.decorators = [
  (story) => {
    const component = story();
    // Prefill data that will trigger various validation scenarios
    setTimeout(() => {
      const { storageEngines } = component;
      if (storageEngines) {
        // Personal Profile
        storageEngines.personal_profile.setProperty('firstName', 'Michael');
        storageEngines.personal_profile.setProperty('lastName', 'Chen');
        storageEngines.personal_profile.setProperty('email', 'michael.chen@email.com');
        storageEngines.personal_profile.setProperty('phone', '(555) 234-5678');
        
        // Income that will create DTI issues
        storageEngines.income_verification.setProperty('employmentType', 'fullTime');
        storageEngines.income_verification.setProperty('monthlyIncome', 4000);
        storageEngines.income_verification.setProperty('employer', 'TechCorp Solutions');
        storageEngines.income_verification.setProperty('yearsInPosition', 1);
        
        // Credit profile with high debt
        storageEngines.credit_profile.setProperty('estimatedCreditScore', 'fair');
        storageEngines.credit_profile.setProperty('currentDebtPayments', 1800);
        storageEngines.credit_profile.setProperty('housingPayment', 1200);
        
        // Loan request that will trigger validation issues
        storageEngines.loan_request.setProperty('requestedAmount', 30000);
        storageEngines.loan_request.setProperty('preferredTerm', '36');
        storageEngines.loan_request.setProperty('loanPurpose', 'debtConsolidation');
      }
    }, 500);
    return component;
  }
];