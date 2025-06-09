import { ref } from 'vue';
import MLayout from '../../components/ui/MLayout.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import LoanFlowStepper from '../../components/loan/LoanFlowStepper.vue';
import PersonalInformationStep from '../../components/loan/steps/PersonalInformationStep.vue';
import { useLoanFlow } from '../../composables/useLoanFlow.js';

export default {
  title: 'Loan Application/Complete Flow',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete loan application flow with multi-step forms, validation, state management, and real-time updates. Demonstrates comprehensive form handling patterns for financial services.'
      }
    }
  }
};

export const FullLoanApplication = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MSelect, MCheckbox, MSlider, MProgress,
      LoanFlowStepper, PersonalInformationStep
    },
    setup() {
      const loanFlow = useLoanFlow();
      
      const loadSavedProgress = () => {
        const loaded = loanFlow.loadProgress();
        if (loaded) {
          console.log('Loaded saved progress');
        }
      };
      
      return {
        ...loanFlow,
        loadSavedProgress
      };
    },
    mounted() {
      this.loadSavedProgress();
    },
    computed: {
      canSubmit() {
        return this.isValid && this.completedSteps.has(this.steps.length - 2);
      },
      
      formattedApplicationId() {
        return this.formData.metadata.applicationId || 'Loading...';
      },
      
      lastSavedFormatted() {
        return this.formData.metadata.lastSaved ? new Date(this.formData.metadata.lastSaved) : null;
      }
    },
    methods: {
      async handleNextStep() {
        await this.nextStep();
      },
      
      async handlePreviousStep() {
        this.previousStep();
      },
      
      async handleNavigateToStep(stepIndex) {
        this.goToStep(stepIndex);
      },
      
      async handleSaveDraft() {
        try {
          await this.saveProgress();
          this.showSuccessMessage('Draft saved successfully');
        } catch (error) {
          this.showErrorMessage('Failed to save draft');
        }
      },
      
      async handleSubmitApplication() {
        const result = await this.submitApplication();
        
        if (result.success) {
          this.showSuccessMessage('Application submitted successfully!');
        } else {
          this.showErrorMessage('Please correct all errors before submitting');
        }
      },
      
      showSuccessMessage(message) {
        alert(message);
      },
      
      showErrorMessage(message) {
        alert(message);
      },
      
      formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(amount);
      }
    },
    template: `
      <MLayout app-title="Mariner Finance" :drawer="false">
        <LoanFlowStepper
          :steps="steps"
          :current-step="currentStep"
          :completed-steps="completedSteps"
          :step-errors="stepErrors"
          :progress-percentage="progressPercentage"
          :application-id="formattedApplicationId"
          :is-validating="isValidating"
          :is-submitting="isSubmitting"
          :is-saving="false"
          :last-saved="lastSavedFormatted"
          :can-submit="canSubmit"
          @navigate-to-step="handleNavigateToStep"
          @next-step="handleNextStep"
          @previous-step="handlePreviousStep"
          @save-draft="handleSaveDraft"
          @submit-application="handleSubmitApplication"
        >
          <!-- Personal Information Step -->
          <PersonalInformationStep
            v-if="currentStepInfo.id === 'personal'"
            :form-data="formData"
            :update-field="setFieldValue"
            :touch-field="touchField"
            :get-field-error="getFieldError"
          />
          
          <!-- Employment Details Step -->
          <div v-else-if="currentStepInfo.id === 'employment'" class="space-y-6">
            <MCard title="Employment Information" subtitle="Current employment and income details">
              <div class="space-y-6">
                <MSelect 
                  :model-value="formData.employment.status"
                  @update:model-value="setFieldValue('employment.status', $event)"
                  @blur="touchField('employment.status')"
                  label="Employment Status" 
                  :options="[
                    { value: 'full_time', text: 'Full-time Employee' },
                    { value: 'part_time', text: 'Part-time Employee' },
                    { value: 'self_employed', text: 'Self-employed' },
                    { value: 'contractor', text: 'Independent Contractor' },
                    { value: 'retired', text: 'Retired' },
                    { value: 'unemployed', text: 'Unemployed' }
                  ]"
                  placeholder="Select employment status"
                  prepend-icon="fas fa-briefcase"
                  :required="true"
                  :error-message="getFieldError('employment.status')"
                  :wrap="true"
                  wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                />
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.employment.employer"
                    @update:model-value="setFieldValue('employment.employer', $event)"
                    @blur="touchField('employment.employer')"
                    label="Current Employer" 
                    placeholder="Company name"
                    prepend-icon="fas fa-building"
                    :required="true"
                    :error-message="getFieldError('employment.employer')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                  
                  <MTextField 
                    :model-value="formData.employment.jobTitle"
                    @update:model-value="setFieldValue('employment.jobTitle', $event)"
                    @blur="touchField('employment.jobTitle')"
                    label="Job Title" 
                    placeholder="Your position"
                    prepend-icon="fas fa-id-card"
                    :required="true"
                    :error-message="getFieldError('employment.jobTitle')"
                    :wrap="true"
                    wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Months with Current Employer: {{ formData.employment.monthsEmployed }}</label>
                    <MSlider 
                      :model-value="formData.employment.monthsEmployed"
                      @update:model-value="setFieldValue('employment.monthsEmployed', $event)"
                      @blur="touchField('employment.monthsEmployed')"
                      :min="0"
                      :max="480"
                      :step="1"
                      color="success"
                      :show-value="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Employment stability factor"
                      :error-message="getFieldError('employment.monthsEmployed')"
                      :wrap="true"
                      wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Gross Monthly Income: {{ formatCurrency(formData.employment.grossMonthlyIncome) }}</label>
                    <MSlider 
                      :model-value="formData.employment.grossMonthlyIncome"
                      @update:model-value="setFieldValue('employment.grossMonthlyIncome', $event)"
                      @blur="touchField('employment.grossMonthlyIncome')"
                      :min="1000"
                      :max="20000"
                      :step="100"
                      color="primary"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Before taxes and deductions"
                      :error-message="getFieldError('employment.grossMonthlyIncome')"
                      :wrap="true"
                      :extend="true"
                      wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                      extended-class="border-2 border-blue-400 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Financial Profile Step -->
          <div v-else-if="currentStepInfo.id === 'financial'" class="space-y-6">
            <MCard title="Financial Information" subtitle="Your financial profile and obligations">
              <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MTextField 
                    :model-value="formData.financial.bankName"
                    @update:model-value="setFieldValue('financial.bankName', $event)"
                    @blur="touchField('financial.bankName')"
                    label="Bank Name" 
                    placeholder="Your primary bank"
                    prepend-icon="fas fa-university"
                    :required="true"
                    :error-message="getFieldError('financial.bankName')"
                    :wrap="true"
                    wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
                  />
                  
                  <MSelect 
                    :model-value="formData.financial.accountType"
                    @update:model-value="setFieldValue('financial.accountType', $event)"
                    @blur="touchField('financial.accountType')"
                    label="Account Type" 
                    :options="[
                      { value: 'checking', text: 'Checking' },
                      { value: 'savings', text: 'Savings' },
                      { value: 'both', text: 'Both Checking & Savings' }
                    ]"
                    placeholder="Select account type"
                    prepend-icon="fas fa-credit-card"
                    :required="true"
                    :error-message="getFieldError('financial.accountType')"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Rent/Mortgage: {{ formatCurrency(formData.financial.monthlyRent) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyRent"
                      @update:model-value="setFieldValue('financial.monthlyRent', $event)"
                      @blur="touchField('financial.monthlyRent')"
                      :min="0"
                      :max="5000"
                      :step="50"
                      color="warning"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Housing payment"
                      :error-message="getFieldError('financial.monthlyRent')"
                      :wrap="true"
                      wrapper-class="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Monthly Debt Payments: {{ formatCurrency(formData.financial.monthlyDebtPayments) }}</label>
                    <MSlider 
                      :model-value="formData.financial.monthlyDebtPayments"
                      @update:model-value="setFieldValue('financial.monthlyDebtPayments', $event)"
                      @blur="touchField('financial.monthlyDebtPayments')"
                      :min="0"
                      :max="3000"
                      :step="25"
                      color="error"
                      :show-value="true"
                      :format-value="formatCurrency"
                      helper-text="Credit cards, loans, etc."
                      :error-message="getFieldError('financial.monthlyDebtPayments')"
                      :wrap="true"
                      wrapper-class="p-3 bg-red-50 border border-red-200 rounded-lg"
                    />
                  </div>
                </div>
                
                <!-- Debt-to-Income Ratio Display -->
                <div class="p-4 bg-gray-50 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium">Debt-to-Income Ratio:</span>
                    <span class="text-lg font-bold" :class="{
                      'text-green-600': calculateDebtToIncome <= 30,
                      'text-yellow-600': calculateDebtToIncome > 30 && calculateDebtToIncome <= 40,
                      'text-red-600': calculateDebtToIncome > 40
                    }">
                      {{ calculateDebtToIncome }}%
                    </span>
                  </div>
                  <MProgress 
                    :value="Math.min(calculateDebtToIncome, 50)" 
                    :max="50"
                    :color="calculateDebtToIncome <= 30 ? 'success' : calculateDebtToIncome <= 40 ? 'warning' : 'error'"
                    :show-percentage="false"
                  />
                  <p class="text-xs text-gray-600 mt-1">
                    {{ calculateDebtToIncome <= 30 ? 'Excellent' : calculateDebtToIncome <= 40 ? 'Good' : 'High' }} - 
                    Lower ratios improve loan approval chances
                  </p>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Loan Configuration Step -->
          <div v-else-if="currentStepInfo.id === 'loan'" class="space-y-6">
            <MCard title="Loan Details" subtitle="Configure your loan amount and terms">
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Loan Amount: {{ formatCurrency(formData.loan.amount) }}</label>
                  <MSlider 
                    :model-value="formData.loan.amount"
                    @update:model-value="setFieldValue('loan.amount', $event)"
                    @blur="touchField('loan.amount')"
                    :min="1000"
                    :max="50000"
                    :step="500"
                    color="primary"
                    :show-value="true"
                    :format-value="formatCurrency"
                    helper-text="How much do you need to borrow?"
                    :error-message="getFieldError('loan.amount')"
                    :wrap="true"
                    :extend="true"
                    wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                    extended-class="border-2 border-blue-400 shadow-xl"
                  />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MSelect 
                    :model-value="formData.loan.purpose"
                    @update:model-value="setFieldValue('loan.purpose', $event)"
                    @blur="touchField('loan.purpose')"
                    label="Loan Purpose" 
                    :options="[
                      { value: 'debt_consolidation', text: 'Debt Consolidation' },
                      { value: 'home_improvement', text: 'Home Improvement' },
                      { value: 'auto_repair', text: 'Auto Repair' },
                      { value: 'medical', text: 'Medical Expenses' },
                      { value: 'education', text: 'Education' },
                      { value: 'vacation', text: 'Vacation' },
                      { value: 'other', text: 'Other' }
                    ]"
                    placeholder="What will you use this loan for?"
                    prepend-icon="fas fa-target"
                    :required="true"
                    :error-message="getFieldError('loan.purpose')"
                    :searchable="true"
                    :wrap="true"
                    wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
                  />
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Term: {{ formData.loan.term }} months</label>
                    <MSlider 
                      :model-value="formData.loan.term"
                      @update:model-value="setFieldValue('loan.term', $event)"
                      @blur="touchField('loan.term')"
                      :min="12"
                      :max="84"
                      :step="6"
                      color="secondary"
                      :show-value="true"
                      :show-ticks="true"
                      :format-value="(value) => value + ' months'"
                      helper-text="Repayment period"
                      :error-message="getFieldError('loan.term')"
                    />
                  </div>
                </div>
                
                <!-- Loan Summary -->
                <div class="p-4 bg-blue-50 rounded-lg">
                  <h4 class="font-semibold mb-3">Loan Summary</h4>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-blue-600">{{ formatCurrency(formData.loan.amount) }}</div>
                      <div class="text-xs text-gray-600">Loan Amount</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-green-600">{{ formatCurrency(estimatedMonthlyPayment) }}</div>
                      <div class="text-xs text-gray-600">Est. Monthly Payment</div>
                    </div>
                    <div class="p-3 bg-white rounded">
                      <div class="text-xl font-bold text-purple-600">{{ (getEstimatedInterestRate() * 100).toFixed(1) }}%</div>
                      <div class="text-xs text-gray-600">Est. Interest Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Documents Step -->
          <div v-else-if="currentStepInfo.id === 'documents'" class="space-y-6">
            <MCard title="Document Upload" subtitle="Required verification documents">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-id-card text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">ID Verification</h4>
                  <p class="text-sm text-gray-600">Driver's license or state ID</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
                
                <div class="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                  <i class="fas fa-file-invoice-dollar text-3xl text-gray-400 mb-2"></i>
                  <h4 class="font-semibold">Income Verification</h4>
                  <p class="text-sm text-gray-600">Recent pay stubs</p>
                  <MButton variant="outlined" text="Upload Document" prepend-icon="fas fa-upload" class="mt-2" size="sm" />
                </div>
              </div>
            </MCard>
          </div>
          
          <!-- Review Step -->
          <div v-else-if="currentStepInfo.id === 'review'" class="space-y-6">
            <MCard title="Application Review" subtitle="Please review your information before submitting">
              <div class="space-y-6">
                <div class="border-l-4 border-blue-400 pl-4">
                  <h4 class="font-semibold text-lg">Personal Information</h4>
                  <div class="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span class="font-medium">Name:</span> 
                      {{ formData.personal.firstName }} {{ formData.personal.lastName }}
                    </div>
                    <div>
                      <span class="font-medium">Email:</span> 
                      {{ formData.personal.email }}
                    </div>
                  </div>
                </div>
              </div>
            </MCard>
            
            <!-- Legal Agreements -->
            <MCard title="Required Agreements" subtitle="Please review and accept all required agreements">
              <div class="space-y-4">
                <MCheckbox 
                  :model-value="formData.agreements.terms"
                  @update:model-value="setFieldValue('agreements.terms', $event)"
                  @blur="touchField('agreements.terms')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.terms')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I agree to the Terms and Conditions
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.privacy"
                  @update:model-value="setFieldValue('agreements.privacy', $event)"
                  @blur="touchField('agreements.privacy')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.privacy')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I accept the Privacy Policy
                </MCheckbox>
                
                <MCheckbox 
                  :model-value="formData.agreements.creditCheck"
                  @update:model-value="setFieldValue('agreements.creditCheck', $event)"
                  @blur="touchField('agreements.creditCheck')"
                  :required="true"
                  color="error"
                  :error-message="getFieldError('agreements.creditCheck')"
                  :wrap="true"
                  wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
                >
                  I authorize credit check and information verification
                </MCheckbox>
              </div>
            </MCard>
          </div>
        </LoanFlowStepper>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete loan application demonstrating multi-step forms, comprehensive validation, state management, auto-save functionality, and real-time form interaction patterns for financial services.'
      }
    }
  }
};