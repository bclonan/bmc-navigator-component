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

// Main template using flat configuration structure
const Template = () => ({
  components: { StateTransitionVisualizer, DynamicFormRenderer, MSlider },
  setup() {
    // Use the flat configuration from formConfigs.js
    const formSchema = personalLoanFormConfig;
    const stateConfig = loanApplicationStates;
    
    // Initialize form renderer with flat config
    const {
      formData,
      errors,
      isFormValid,
      validateField,
      validateForm,
      submitForm,
      resetForm,
      exportForm,
      importForm
    } = useDynamicFormRenderer({
      schema: formSchema,
      autoSave: true,
      storageKey: 'personal-loan-application'
    });
    
    // Initialize storage engine
    const storage = useStorageEngine({
      storageType: 'localStorage',
      key: 'loan-app-storage',
      autoSave: true,
      encryption: false
    });
    
    // Current step tracking
    const currentStep = ref(1);
    const totalSteps = computed(() => formSchema.sections.length);
    
    // Real-time calculations using flat data structure
    const calculations = computed(() => {
      const loanAmount = formData.loanAmount || 15000;
      const loanTerm = formData.loanTerm || 36;
      const monthlyIncome = formData.monthlyIncome || 5000;
      const monthlyExpenses = formData.monthlyExpenses || 3000;
      const creditScore = formData.creditScore || 720;
      const debtToIncome = formData.debtToIncome || 25;
      
      // Monthly payment calculation
      const annualRate = 0.085; // 8.5% APR
      const monthlyRate = annualRate / 12;
      let monthlyPayment = 0;
      
      if (monthlyRate === 0) {
        monthlyPayment = loanAmount / loanTerm;
      } else {
        const numerator = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm);
        const denominator = Math.pow(1 + monthlyRate, loanTerm) - 1;
        monthlyPayment = numerator / denominator;
      }
      
      const totalInterest = (monthlyPayment * loanTerm) - loanAmount;
      const totalAmount = loanAmount + totalInterest;
      const availableIncome = monthlyIncome - monthlyExpenses;
      const paymentToIncomeRatio = (monthlyPayment / monthlyIncome) * 100;
      
      // Approval likelihood calculation
      let approvalScore = 0;
      
      // Credit score impact (40%)
      if (creditScore >= 750) approvalScore += 40;
      else if (creditScore >= 650) approvalScore += 30;
      else if (creditScore >= 500) approvalScore += 20;
      else approvalScore += 10;
      
      // Income stability (30%)
      if (monthlyIncome >= 8000) approvalScore += 30;
      else if (monthlyIncome >= 5000) approvalScore += 25;
      else if (monthlyIncome >= 3000) approvalScore += 15;
      else approvalScore += 5;
      
      // Debt-to-income ratio (30%)
      if (debtToIncome <= 20) approvalScore += 30;
      else if (debtToIncome <= 35) approvalScore += 20;
      else if (debtToIncome <= 45) approvalScore += 10;
      else approvalScore += 0;
      
      const approvalLikelihood = Math.min(approvalScore, 100);
      
      return {
        monthlyPayment,
        totalInterest,
        totalAmount,
        availableIncome,
        paymentToIncomeRatio,
        approvalLikelihood,
        creditRating: creditScore >= 750 ? 'Excellent' : 
                     creditScore >= 650 ? 'Good' : 
                     creditScore >= 500 ? 'Fair' : 'Poor'
      };
    });
    
    // Step navigation
    const nextStep = () => {
      if (currentStep.value < totalSteps.value) {
        currentStep.value++;
      }
    };
    
    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };
    
    const goToStep = (step) => {
      if (step >= 1 && step <= totalSteps.value) {
        currentStep.value = step;
      }
    };
    
    // Current section based on step
    const currentSection = computed(() => {
      return formSchema.sections.find(section => section.step === currentStep.value);
    });
    
    // Step validation
    const isCurrentStepValid = computed(() => {
      if (!currentSection.value) return false;
      
      return currentSection.value.fields.every(field => {
        if (!field.required) return true;
        const value = formData[field.id];
        return value !== undefined && value !== null && value !== '';
      });
    });
    
    // Form submission handler
    const handleSubmit = async () => {
      const isValid = await validateForm();
      if (!isValid) return;
      
      try {
        const result = await submitForm(async (data) => {
          // Simulate API submission
          await new Promise(resolve => setTimeout(resolve, 2000));
          return {
            id: `LOAN-${Date.now()}`,
            status: 'submitted',
            approvalLikelihood: calculations.value.approvalLikelihood,
            estimatedDecision: '2-3 business days',
            referenceNumber: `REF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
          };
        });
        
        console.log('Application submitted:', result);
      } catch (error) {
        console.error('Submission failed:', error);
      }
    };
    
    // Watch for step changes to update visualization
    const visualizerStates = computed(() => {
      return stateConfig.states.map(state => ({
        ...state,
        active: state.step === currentStep.value,
        completed: state.step < currentStep.value,
        valid: state.step <= currentStep.value ? isCurrentStepValid.value : false
      }));
    });
    
    return {
      formSchema,
      formData,
      errors,
      isFormValid,
      currentStep,
      totalSteps,
      calculations,
      nextStep,
      prevStep,
      goToStep,
      currentSection,
      isCurrentStepValid,
      handleSubmit,
      visualizerStates,
      validateField,
      storage
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{{ formSchema.title }}</h1>
              <p class="mt-1 text-gray-600">{{ formSchema.description }}</p>
            </div>
            <div class="mt-4 lg:mt-0">
              <div class="flex items-center space-x-4">
                <div class="text-sm text-gray-500">
                  Step {{ currentStep }} of {{ totalSteps }}
                </div>
                <div class="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    :style="{ width: (currentStep / totalSteps * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- State Visualizer -->
          <div class="lg:col-span-3">
            <div class="sticky top-8">
              <StateTransitionVisualizer
                :states="visualizerStates"
                :current-state="currentStep"
                layout="vertical"
                :show-connections="true"
                :animated="true"
                class="mb-6"
              />
              
              <!-- Qualification Preview -->
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Live Qualification</h3>
                
                <div class="space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Approval Likelihood</span>
                    <div class="flex items-center">
                      <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          class="h-2 rounded-full transition-all duration-500"
                          :class="{
                            'bg-green-500': calculations.approvalLikelihood >= 70,
                            'bg-yellow-500': calculations.approvalLikelihood >= 40 && calculations.approvalLikelihood < 70,
                            'bg-red-500': calculations.approvalLikelihood < 40
                          }"
                          :style="{ width: calculations.approvalLikelihood + '%' }"
                        ></div>
                      </div>
                      <span class="text-sm font-medium">{{ Math.round(calculations.approvalLikelihood) }}%</span>
                    </div>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Monthly Payment</span>
                    <span class="text-sm font-medium">\${{ calculations.monthlyPayment.toFixed(2) }}</span>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Payment-to-Income</span>
                    <span class="text-sm font-medium">{{ calculations.paymentToIncomeRatio.toFixed(1) }}%</span>
                  </div>
                  
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Credit Rating</span>
                    <span class="text-sm font-medium">{{ calculations.creditRating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Form -->
          <div class="lg:col-span-6">
            <div class="bg-white rounded-lg shadow-sm">
              <div class="p-6 border-b">
                <h2 class="text-xl font-semibold text-gray-900">{{ currentSection?.title }}</h2>
                <p class="mt-1 text-gray-600">{{ currentSection?.description }}</p>
              </div>
              
              <div class="p-6">
                <div v-if="currentSection" class="space-y-6">
                  <div
                    v-for="field in currentSection.fields"
                    :key="field.id"
                    :class="currentSection.layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''"
                  >
                    <!-- Slider Fields -->
                    <MSlider
                      v-if="field.type === 'slider'"
                      v-model="formData[field.id]"
                      :label="field.label"
                      :min="field.min"
                      :max="field.max"
                      :step="field.step"
                      :unit="field.unit"
                      :show-tooltip="field.showTooltip"
                      :show-markers="field.showMarkers"
                      :markers="field.markers"
                      :format-value="field.formatValue"
                      :help-text="field.helpText"
                      :error="errors[field.id]"
                      :required="field.required"
                      :variant="field.variant"
                      size="large"
                      @change="validateField(field.id)"
                    />
                    
                    <!-- Text Fields -->
                    <div v-else-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'" class="space-y-2">
                      <label :for="field.id" class="block text-sm font-medium text-gray-700">
                        {{ field.label }}
                        <span v-if="field.required" class="text-red-500">*</span>
                      </label>
                      <input
                        :id="field.id"
                        v-model="formData[field.id]"
                        :type="field.type"
                        :placeholder="field.placeholder"
                        :required="field.required"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        @blur="validateField(field.id)"
                      />
                      <div v-if="errors[field.id]" class="text-sm text-red-600">
                        {{ errors[field.id] }}
                      </div>
                    </div>
                    
                    <!-- Date Fields -->
                    <div v-else-if="field.type === 'date'" class="space-y-2">
                      <label :for="field.id" class="block text-sm font-medium text-gray-700">
                        {{ field.label }}
                        <span v-if="field.required" class="text-red-500">*</span>
                      </label>
                      <input
                        :id="field.id"
                        v-model="formData[field.id]"
                        type="date"
                        :required="field.required"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        @change="validateField(field.id)"
                      />
                      <div v-if="errors[field.id]" class="text-sm text-red-600">
                        {{ errors[field.id] }}
                      </div>
                    </div>
                    
                    <!-- Select Fields -->
                    <div v-else-if="field.type === 'select'" class="space-y-2">
                      <label :for="field.id" class="block text-sm font-medium text-gray-700">
                        {{ field.label }}
                        <span v-if="field.required" class="text-red-500">*</span>
                      </label>
                      <select
                        :id="field.id"
                        v-model="formData[field.id]"
                        :required="field.required"
                        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        @change="validateField(field.id)"
                      >
                        <option value="">Select an option</option>
                        <option
                          v-for="option in field.options"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                      <div v-if="field.helpText" class="text-sm text-gray-500">
                        {{ field.helpText }}
                      </div>
                      <div v-if="errors[field.id]" class="text-sm text-red-600">
                        {{ errors[field.id] }}
                      </div>
                    </div>
                    
                    <!-- Checkbox Fields -->
                    <div v-else-if="field.type === 'checkbox'" class="flex items-start space-x-3">
                      <input
                        :id="field.id"
                        v-model="formData[field.id]"
                        type="checkbox"
                        :required="field.required"
                        class="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        @change="validateField(field.id)"
                      />
                      <div class="flex-1">
                        <label :for="field.id" class="text-sm font-medium text-gray-700">
                          {{ field.label }}
                          <span v-if="field.required" class="text-red-500">*</span>
                        </label>
                        <div v-if="field.helpText" class="text-sm text-gray-500">
                          {{ field.helpText }}
                        </div>
                        <div v-if="errors[field.id]" class="text-sm text-red-600">
                          {{ errors[field.id] }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Navigation -->
              <div class="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                <button
                  v-if="currentStep > 1"
                  @click="prevStep"
                  class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Previous
                </button>
                <div v-else></div>
                
                <div class="flex space-x-3">
                  <button
                    v-if="currentStep < totalSteps"
                    @click="nextStep"
                    :disabled="!isCurrentStepValid"
                    class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Step
                  </button>
                  <button
                    v-if="currentStep === totalSteps"
                    @click="handleSubmit"
                    :disabled="!isFormValid"
                    class="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Loan Summary -->
          <div class="lg:col-span-3">
            <div class="sticky top-8">
              <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
                
                <div class="space-y-3">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Loan Amount</span>
                    <span class="font-medium">\${{ (formData.loanAmount || 15000).toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Term</span>
                    <span class="font-medium">{{ formData.loanTerm || 36 }} months</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Est. APR</span>
                    <span class="font-medium">8.5%</span>
                  </div>
                  <hr class="my-3">
                  <div class="flex justify-between text-lg">
                    <span class="font-medium">Monthly Payment</span>
                    <span class="font-bold text-blue-600">\${{ calculations.monthlyPayment.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total Interest</span>
                    <span class="font-medium text-red-600">\${{ calculations.totalInterest.toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Total Amount</span>
                    <span class="font-medium">\${{ calculations.totalAmount.toFixed(2) }}</span>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-sm font-medium text-blue-900">Rates may vary based on creditworthiness</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const PersonalLoanApplication = Template.bind({});
PersonalLoanApplication.storyName = 'Complete Application Flow';

// Mobile-optimized version
const MobileTemplate = () => ({
  components: { StateTransitionVisualizer, MSlider },
  setup() {
    const formData = reactive({
      loanAmount: 15000,
      monthlyIncome: 5000,
      monthlyExpenses: 3000,
      creditScore: 720
    });
    
    const calculations = computed(() => {
      const monthlyPayment = formData.loanAmount * 0.03; // Simplified calculation
      const availableIncome = formData.monthlyIncome - formData.monthlyExpenses;
      const paymentRatio = (monthlyPayment / formData.monthlyIncome) * 100;
      
      return {
        monthlyPayment,
        availableIncome,
        paymentRatio
      };
    });
    
    return {
      formData,
      calculations
    };
  },
  template: `
    <div class="max-w-md mx-auto p-4 space-y-6 bg-white min-h-screen">
      <div class="text-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Quick Loan Check</h1>
        <p class="text-gray-600">Get instant pre-qualification</p>
      </div>
      
      <MSlider
        v-model="formData.loanAmount"
        label="Loan Amount"
        :min="1000"
        :max="50000"
        :step="500"
        unit="$"
        :show-tooltip="true"
        :show-markers="true"
        :markers="[
          { value: 1000, label: '$1K' },
          { value: 10000, label: '$10K' },
          { value: 25000, label: '$25K' },
          { value: 50000, label: '$50K' }
        ]"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="primary"
        size="large"
      />
      
      <MSlider
        v-model="formData.monthlyIncome"
        label="Monthly Income"
        :min="1000"
        :max="15000"
        :step="250"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="success"
        size="large"
      />
      
      <MSlider
        v-model="formData.monthlyExpenses"
        label="Monthly Expenses"
        :min="500"
        :max="10000"
        :step="100"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="danger"
        size="large"
      />
      
      <MSlider
        v-model="formData.creditScore"
        label="Credit Score"
        :min="300"
        :max="850"
        :step="10"
        :show-tooltip="true"
        :markers="[
          { value: 300, label: 'Poor' },
          { value: 650, label: 'Good' },
          { value: 750, label: 'Excellent' }
        ]"
        :format-value="(value) => {
          if (value >= 750) return \`\${value} (Excellent)\`;
          if (value >= 650) return \`\${value} (Good)\`;
          return \`\${value} (Fair)\`;
        }"
        variant="warning"
        size="large"
      />
      
      <div class="bg-blue-50 rounded-lg p-4">
        <h3 class="font-medium text-blue-900 mb-3">Instant Assessment</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Est. Monthly Payment:</span>
            <span class="font-bold">\${{ calculations.monthlyPayment.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Available Income:</span>
            <span>\${{ calculations.availableIncome.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Payment Ratio:</span>
            <span>{{ calculations.paymentRatio.toFixed(1) }}%</span>
          </div>
        </div>
      </div>
      
      <button class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        Start Full Application
      </button>
    </div>
  `
});

export const MobileQuickCheck = MobileTemplate.bind({});
MobileQuickCheck.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};