import{M as m}from"./MButton-BLV5TnM3.js";import{M as d}from"./MInput-CcA3fQAp.js";import{M as c}from"./MTypography-DmD30oZU.js";import{M as u}from"./MAlert-DQn7thiI.js";import{M as p}from"./MLinearProgress-D4GmZOV8.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const x={title:"Testing & Quality/Interaction Tests/User Flow Testing",parameters:{layout:"fullscreen",docs:{description:{component:"Interactive user flow testing scenarios for loan applications with step-by-step validation and error handling."}}},argTypes:{flowType:{control:{type:"select"},options:["complete-application","validation-errors","loading-states","recovery-flow"],description:"Type of user flow to test",defaultValue:"complete-application"},simulateErrors:{control:{type:"boolean"},description:"Simulate validation errors for testing",defaultValue:!1},testLoadingStates:{control:{type:"boolean"},description:"Test loading and processing states",defaultValue:!0}}},n=s=>({components:{MButton:m,MInput:d,MTypography:c,MAlert:u,MLinearProgress:p},setup(){return{args:s}},template:`
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4">
        <div class="text-center mb-8">
          <MTypography variant="h1" class="text-3xl font-bold text-gray-900 mb-2">
            Interactive User Flow Testing
          </MTypography>
          <MTypography variant="body1" class="text-gray-600">
            Test complete loan application workflow with validation and state management
          </MTypography>
        </div>

        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {{ currentStep }} of {{ totalSteps }}</span>
            <span>{{ Math.round(progress) }}% Complete</span>
          </div>
          <MLinearProgress :value="progress" class="h-2" />
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <MTypography variant="h2" class="text-xl font-semibold mb-6">
            {{ stepTitles[currentStep - 1] }}
          </MTypography>

          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MInput 
                label="First Name"
                v-model="formData.firstName"
                :error="!!errors.firstName"
                :helperText="errors.firstName"
                required
                fullWidth
                @blur="validateField('firstName')"
              />
              <MInput 
                label="Last Name"
                v-model="formData.lastName"
                :error="!!errors.lastName"
                :helperText="errors.lastName"
                required
                fullWidth
                @blur="validateField('lastName')"
              />
            </div>
            
            <MInput 
              label="Email Address"
              type="email"
              v-model="formData.email"
              :error="!!errors.email"
              :helperText="errors.email || 'We will send loan updates to this email'"
              required
              fullWidth
              @blur="validateField('email')"
            />
            
            <MInput 
              label="Phone Number"
              type="tel"
              v-model="formData.phone"
              :error="!!errors.phone"
              :helperText="errors.phone || 'For loan status updates and verification'"
              required
              fullWidth
              @blur="validateField('phone')"
            />
            
            <div v-if="Object.keys(errors).length > 0" class="mt-4">
              <MAlert severity="error">
                Please correct the errors above to continue to the next step.
              </MAlert>
            </div>
          </div>

          <!-- Step 2: Financial Information -->
          <div v-if="currentStep === 2" class="space-y-4">
            <MInput 
              label="Annual Income"
              type="number"
              v-model="formData.annualIncome"
              :error="!!errors.annualIncome"
              :helperText="errors.annualIncome || 'Your total yearly income before taxes'"
              required
              fullWidth
              @blur="validateField('annualIncome')"
            />
            
            <MInput 
              label="Monthly Debt Payments"
              type="number"
              v-model="formData.monthlyDebt"
              :error="!!errors.monthlyDebt"
              :helperText="errors.monthlyDebt || 'Include credit cards, loans, and other monthly payments'"
              required
              fullWidth
              @blur="validateField('monthlyDebt')"
            />
            
            <MInput 
              label="Monthly Housing Payment"
              type="number"
              v-model="formData.housingPayment"
              :error="!!errors.housingPayment"
              :helperText="errors.housingPayment || 'Rent or mortgage payment'"
              required
              fullWidth
              @blur="validateField('housingPayment')"
            />
            
            <!-- Real-time debt-to-income calculation -->
            <div v-if="formData.annualIncome && formData.monthlyDebt" class="mt-4 p-4 bg-blue-50 rounded-lg">
              <MTypography variant="h6" class="text-blue-800 mb-2">
                Debt-to-Income Ratio
              </MTypography>
              <MTypography variant="h4" :class="debtToIncomeColor">
                {{ debtToIncomeRatio }}%
              </MTypography>
              <MTypography variant="body2" class="text-blue-700">
                {{ debtToIncomeMessage }}
              </MTypography>
            </div>
          </div>

          <!-- Step 3: Loan Details -->
          <div v-if="currentStep === 3" class="space-y-4">
            <MInput 
              label="Desired Loan Amount"
              type="number"
              v-model="formData.loanAmount"
              :error="!!errors.loanAmount"
              :helperText="errors.loanAmount || 'Enter amount between $1,000 - $100,000'"
              required
              fullWidth
              @blur="validateField('loanAmount')"
            />
            
            <div v-if="formData.loanAmount" class="bg-green-50 p-4 rounded-lg">
              <MTypography variant="h6" class="text-green-800 mb-2">
                Estimated Monthly Payment
              </MTypography>
              <MTypography variant="h4" class="text-green-900 font-bold">
                {{ estimatedPayment }}
              </MTypography>
              <MTypography variant="body2" class="text-green-700">
                Based on {{ estimatedAPR }}% APR for {{ estimatedTerm }} months
              </MTypography>
            </div>
            
            <!-- Pre-qualification check -->
            <div v-if="prequalificationStatus" class="mt-4">
              <MAlert :severity="prequalificationStatus.type">
                <strong>{{ prequalificationStatus.title }}:</strong> {{ prequalificationStatus.message }}
              </MAlert>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <MButton 
              v-if="currentStep > 1"
              text="Previous"
              variant="outlined"
              color="secondary"
              @click="previousStep"
              :disabled="isProcessing"
            />
            <div v-else></div>
            
            <MButton 
              v-if="currentStep < totalSteps"
              text="Next"
              variant="filled"
              color="primary"
              @click="nextStep"
              :disabled="!canProceed || isProcessing"
              :loading="isProcessing"
              class="mf-button-primary"
            />
            <MButton 
              v-else
              text="Submit Application"
              variant="filled"
              color="primary"
              @click="submitApplication"
              :disabled="!canProceed || isProcessing"
              :loading="isProcessing"
              :loadingText="loadingMessage"
              class="mf-button-primary"
            />
          </div>
          
          <!-- Progress Summary -->
          <div class="mt-6 pt-6 border-t">
            <MTypography variant="h6" class="mb-3">Application Progress</MTypography>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div :class="currentStep >= 1 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 1 ? '✓' : '○' }}</div>
                <div class="text-sm">Personal Info</div>
              </div>
              <div :class="currentStep >= 2 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 2 ? '✓' : '○' }}</div>
                <div class="text-sm">Financial Info</div>
              </div>
              <div :class="currentStep >= 3 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 3 ? '✓' : '○' }}</div>
                <div class="text-sm">Loan Details</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Controls -->
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <MTypography variant="h6" class="text-yellow-800 mb-3">
            Testing Controls
          </MTypography>
          <div class="flex flex-wrap gap-2">
            <MButton 
              text="Trigger Validation Errors"
              variant="outlined"
              color="error"
              size="small"
              @click="triggerValidationErrors"
            />
            <MButton 
              text="Clear All Data"
              variant="outlined"
              color="warning"
              size="small"
              @click="clearAllData"
            />
            <MButton 
              text="Fill Sample Data"
              variant="outlined"
              color="info"
              size="small"
              @click="fillSampleData"
            />
            <MButton 
              text="Test Loading States"
              variant="outlined"
              color="primary"
              size="small"
              @click="testLoadingStates"
            />
          </div>
        </div>
      </div>
    </div>
  `,data(){return{currentStep:1,totalSteps:3,isProcessing:!1,loadingMessage:"Processing...",stepTitles:["Personal Information","Financial Information","Loan Details"],formData:{firstName:"",lastName:"",email:"",phone:"",annualIncome:"",monthlyDebt:"",housingPayment:"",loanAmount:""},errors:{}}},computed:{progress(){return this.currentStep/this.totalSteps*100},canProceed(){return Object.keys(this.errors).length===0&&this.isStepComplete()},debtToIncomeRatio(){if(!this.formData.annualIncome||!this.formData.monthlyDebt)return 0;const e=this.formData.annualIncome/12;return Math.round(this.formData.monthlyDebt/e*100)},debtToIncomeColor(){const e=this.debtToIncomeRatio;return e<=36?"text-green-900 font-bold":e<=43?"text-yellow-900 font-bold":"text-red-900 font-bold"},debtToIncomeMessage(){const e=this.debtToIncomeRatio;return e<=36?"Excellent debt-to-income ratio":e<=43?"Good debt-to-income ratio":"High debt-to-income ratio may affect approval"},estimatedPayment(){if(!this.formData.loanAmount)return"$0";const e=parseFloat(this.formData.loanAmount),t=this.estimatedAPRDecimal/12,a=this.estimatedTerm,l=e*t*Math.pow(1+t,a)/(Math.pow(1+t,a)-1);return"$"+Math.round(l).toLocaleString()},estimatedAPR(){const t=this.debtToIncomeRatio;return t<=36?8.99:t<=43?8.99+2:8.99+5},estimatedAPRDecimal(){return this.estimatedAPR/100},estimatedTerm(){return 60},prequalificationStatus(){if(!this.formData.annualIncome||!this.formData.loanAmount)return null;const e=parseFloat(this.formData.annualIncome),t=parseFloat(this.formData.loanAmount),a=this.debtToIncomeRatio;return e<2e4?{type:"error",title:"Income Requirement",message:"Minimum annual income of $20,000 required for loan approval."}:a>50?{type:"warning",title:"Debt-to-Income Concern",message:"High debt-to-income ratio may require additional documentation."}:t>e*.5?{type:"warning",title:"Loan Amount Review",message:"Requested amount exceeds 50% of annual income. Consider a smaller amount."}:{type:"success",title:"Pre-qualification Positive",message:"You appear to meet our initial qualification criteria!"}}},methods:{validateField(e){this.errors={...this.errors},delete this.errors[e];const t=this.formData[e];switch(e){case"firstName":case"lastName":t?t.length<2&&(this.errors[e]="Must be at least 2 characters"):this.errors[e]="This field is required";break;case"email":t?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)||(this.errors[e]="Please enter a valid email address"):this.errors[e]="Email address is required";break;case"phone":t?/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(t)||(this.errors[e]="Please enter a valid phone number"):this.errors[e]="Phone number is required";break;case"annualIncome":t?parseFloat(t)<2e4&&(this.errors[e]="Minimum annual income is $20,000"):this.errors[e]="Annual income is required";break;case"monthlyDebt":case"housingPayment":t?parseFloat(t)<0&&(this.errors[e]="Amount cannot be negative"):this.errors[e]="This field is required";break;case"loanAmount":t?parseFloat(t)<1e3?this.errors[e]="Minimum loan amount is $1,000":parseFloat(t)>1e5&&(this.errors[e]="Maximum loan amount is $100,000"):this.errors[e]="Loan amount is required";break}this.$forceUpdate()},isStepComplete(){switch(this.currentStep){case 1:return this.formData.firstName&&this.formData.lastName&&this.formData.email&&this.formData.phone;case 2:return this.formData.annualIncome&&this.formData.monthlyDebt&&this.formData.housingPayment;case 3:return this.formData.loanAmount;default:return!1}},nextStep(){this.validateCurrentStep(),this.canProceed&&this.currentStep<this.totalSteps&&(this.isProcessing=!0,this.loadingMessage="Validating information...",setTimeout(()=>{this.currentStep++,this.isProcessing=!1},1e3))},previousStep(){this.currentStep>1&&this.currentStep--},validateCurrentStep(){switch(this.currentStep){case 1:this.validateField("firstName"),this.validateField("lastName"),this.validateField("email"),this.validateField("phone");break;case 2:this.validateField("annualIncome"),this.validateField("monthlyDebt"),this.validateField("housingPayment");break;case 3:this.validateField("loanAmount");break}},submitApplication(){this.validateCurrentStep(),this.canProceed&&(this.isProcessing=!0,this.loadingMessage="Submitting application...",setTimeout(()=>{this.loadingMessage="Processing documents..."},1e3),setTimeout(()=>{this.loadingMessage="Finalizing submission..."},2e3),setTimeout(()=>{this.isProcessing=!1,alert("Application submitted successfully! You will receive confirmation via email."),console.log("Application submitted:",this.formData)},3e3))},triggerValidationErrors(){this.errors={firstName:"Test validation error",email:"Invalid email format for testing",annualIncome:"Income too low for testing",loanAmount:"Amount exceeds limit for testing"}},clearAllData(){this.formData={firstName:"",lastName:"",email:"",phone:"",annualIncome:"",monthlyDebt:"",housingPayment:"",loanAmount:""},this.errors={},this.currentStep=1},fillSampleData(){this.formData={firstName:"John",lastName:"Doe",email:"john.doe@email.com",phone:"(555) 123-4567",annualIncome:"75000",monthlyDebt:"850",housingPayment:"1200",loanAmount:"15000"},this.errors={}},testLoadingStates(){this.isProcessing=!0,this.loadingMessage="Testing loading state...",setTimeout(()=>{this.isProcessing=!1},2e3)}}});n.args={flowType:"complete-application",simulateErrors:!1,testLoadingStates:!0};var r,i,o;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`args => ({
  components: {
    MButton,
    MInput,
    MTypography,
    MAlert,
    MLinearProgress
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4">
        <div class="text-center mb-8">
          <MTypography variant="h1" class="text-3xl font-bold text-gray-900 mb-2">
            Interactive User Flow Testing
          </MTypography>
          <MTypography variant="body1" class="text-gray-600">
            Test complete loan application workflow with validation and state management
          </MTypography>
        </div>

        <div class="mb-8">
          <div class="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {{ currentStep }} of {{ totalSteps }}</span>
            <span>{{ Math.round(progress) }}% Complete</span>
          </div>
          <MLinearProgress :value="progress" class="h-2" />
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <MTypography variant="h2" class="text-xl font-semibold mb-6">
            {{ stepTitles[currentStep - 1] }}
          </MTypography>

          <!-- Step 1: Personal Information -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MInput 
                label="First Name"
                v-model="formData.firstName"
                :error="!!errors.firstName"
                :helperText="errors.firstName"
                required
                fullWidth
                @blur="validateField('firstName')"
              />
              <MInput 
                label="Last Name"
                v-model="formData.lastName"
                :error="!!errors.lastName"
                :helperText="errors.lastName"
                required
                fullWidth
                @blur="validateField('lastName')"
              />
            </div>
            
            <MInput 
              label="Email Address"
              type="email"
              v-model="formData.email"
              :error="!!errors.email"
              :helperText="errors.email || 'We will send loan updates to this email'"
              required
              fullWidth
              @blur="validateField('email')"
            />
            
            <MInput 
              label="Phone Number"
              type="tel"
              v-model="formData.phone"
              :error="!!errors.phone"
              :helperText="errors.phone || 'For loan status updates and verification'"
              required
              fullWidth
              @blur="validateField('phone')"
            />
            
            <div v-if="Object.keys(errors).length > 0" class="mt-4">
              <MAlert severity="error">
                Please correct the errors above to continue to the next step.
              </MAlert>
            </div>
          </div>

          <!-- Step 2: Financial Information -->
          <div v-if="currentStep === 2" class="space-y-4">
            <MInput 
              label="Annual Income"
              type="number"
              v-model="formData.annualIncome"
              :error="!!errors.annualIncome"
              :helperText="errors.annualIncome || 'Your total yearly income before taxes'"
              required
              fullWidth
              @blur="validateField('annualIncome')"
            />
            
            <MInput 
              label="Monthly Debt Payments"
              type="number"
              v-model="formData.monthlyDebt"
              :error="!!errors.monthlyDebt"
              :helperText="errors.monthlyDebt || 'Include credit cards, loans, and other monthly payments'"
              required
              fullWidth
              @blur="validateField('monthlyDebt')"
            />
            
            <MInput 
              label="Monthly Housing Payment"
              type="number"
              v-model="formData.housingPayment"
              :error="!!errors.housingPayment"
              :helperText="errors.housingPayment || 'Rent or mortgage payment'"
              required
              fullWidth
              @blur="validateField('housingPayment')"
            />
            
            <!-- Real-time debt-to-income calculation -->
            <div v-if="formData.annualIncome && formData.monthlyDebt" class="mt-4 p-4 bg-blue-50 rounded-lg">
              <MTypography variant="h6" class="text-blue-800 mb-2">
                Debt-to-Income Ratio
              </MTypography>
              <MTypography variant="h4" :class="debtToIncomeColor">
                {{ debtToIncomeRatio }}%
              </MTypography>
              <MTypography variant="body2" class="text-blue-700">
                {{ debtToIncomeMessage }}
              </MTypography>
            </div>
          </div>

          <!-- Step 3: Loan Details -->
          <div v-if="currentStep === 3" class="space-y-4">
            <MInput 
              label="Desired Loan Amount"
              type="number"
              v-model="formData.loanAmount"
              :error="!!errors.loanAmount"
              :helperText="errors.loanAmount || 'Enter amount between $1,000 - $100,000'"
              required
              fullWidth
              @blur="validateField('loanAmount')"
            />
            
            <div v-if="formData.loanAmount" class="bg-green-50 p-4 rounded-lg">
              <MTypography variant="h6" class="text-green-800 mb-2">
                Estimated Monthly Payment
              </MTypography>
              <MTypography variant="h4" class="text-green-900 font-bold">
                {{ estimatedPayment }}
              </MTypography>
              <MTypography variant="body2" class="text-green-700">
                Based on {{ estimatedAPR }}% APR for {{ estimatedTerm }} months
              </MTypography>
            </div>
            
            <!-- Pre-qualification check -->
            <div v-if="prequalificationStatus" class="mt-4">
              <MAlert :severity="prequalificationStatus.type">
                <strong>{{ prequalificationStatus.title }}:</strong> {{ prequalificationStatus.message }}
              </MAlert>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex justify-between mt-8">
            <MButton 
              v-if="currentStep > 1"
              text="Previous"
              variant="outlined"
              color="secondary"
              @click="previousStep"
              :disabled="isProcessing"
            />
            <div v-else></div>
            
            <MButton 
              v-if="currentStep < totalSteps"
              text="Next"
              variant="filled"
              color="primary"
              @click="nextStep"
              :disabled="!canProceed || isProcessing"
              :loading="isProcessing"
              class="mf-button-primary"
            />
            <MButton 
              v-else
              text="Submit Application"
              variant="filled"
              color="primary"
              @click="submitApplication"
              :disabled="!canProceed || isProcessing"
              :loading="isProcessing"
              :loadingText="loadingMessage"
              class="mf-button-primary"
            />
          </div>
          
          <!-- Progress Summary -->
          <div class="mt-6 pt-6 border-t">
            <MTypography variant="h6" class="mb-3">Application Progress</MTypography>
            <div class="grid grid-cols-3 gap-4 text-center">
              <div :class="currentStep >= 1 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 1 ? '✓' : '○' }}</div>
                <div class="text-sm">Personal Info</div>
              </div>
              <div :class="currentStep >= 2 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 2 ? '✓' : '○' }}</div>
                <div class="text-sm">Financial Info</div>
              </div>
              <div :class="currentStep >= 3 ? 'text-green-600' : 'text-gray-400'">
                <div class="text-2xl mb-1">{{ currentStep >= 3 ? '✓' : '○' }}</div>
                <div class="text-sm">Loan Details</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Test Controls -->
        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <MTypography variant="h6" class="text-yellow-800 mb-3">
            Testing Controls
          </MTypography>
          <div class="flex flex-wrap gap-2">
            <MButton 
              text="Trigger Validation Errors"
              variant="outlined"
              color="error"
              size="small"
              @click="triggerValidationErrors"
            />
            <MButton 
              text="Clear All Data"
              variant="outlined"
              color="warning"
              size="small"
              @click="clearAllData"
            />
            <MButton 
              text="Fill Sample Data"
              variant="outlined"
              color="info"
              size="small"
              @click="fillSampleData"
            />
            <MButton 
              text="Test Loading States"
              variant="outlined"
              color="primary"
              size="small"
              @click="testLoadingStates"
            />
          </div>
        </div>
      </div>
    </div>
  \`,
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
      isProcessing: false,
      loadingMessage: 'Processing...',
      stepTitles: ['Personal Information', 'Financial Information', 'Loan Details'],
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        annualIncome: '',
        monthlyDebt: '',
        housingPayment: '',
        loanAmount: ''
      },
      errors: {}
    };
  },
  computed: {
    progress() {
      return this.currentStep / this.totalSteps * 100;
    },
    canProceed() {
      return Object.keys(this.errors).length === 0 && this.isStepComplete();
    },
    debtToIncomeRatio() {
      if (!this.formData.annualIncome || !this.formData.monthlyDebt) return 0;
      const monthlyIncome = this.formData.annualIncome / 12;
      return Math.round(this.formData.monthlyDebt / monthlyIncome * 100);
    },
    debtToIncomeColor() {
      const ratio = this.debtToIncomeRatio;
      if (ratio <= 36) return 'text-green-900 font-bold';
      if (ratio <= 43) return 'text-yellow-900 font-bold';
      return 'text-red-900 font-bold';
    },
    debtToIncomeMessage() {
      const ratio = this.debtToIncomeRatio;
      if (ratio <= 36) return 'Excellent debt-to-income ratio';
      if (ratio <= 43) return 'Good debt-to-income ratio';
      return 'High debt-to-income ratio may affect approval';
    },
    estimatedPayment() {
      if (!this.formData.loanAmount) return '$0';
      const amount = parseFloat(this.formData.loanAmount);
      const rate = this.estimatedAPRDecimal / 12;
      const periods = this.estimatedTerm;
      const payment = amount * rate * Math.pow(1 + rate, periods) / (Math.pow(1 + rate, periods) - 1);
      return '$' + Math.round(payment).toLocaleString();
    },
    estimatedAPR() {
      // Simple APR estimation based on income and debt ratio
      const baseRate = 8.99;
      const ratio = this.debtToIncomeRatio;
      if (ratio <= 36) return baseRate;
      if (ratio <= 43) return baseRate + 2;
      return baseRate + 5;
    },
    estimatedAPRDecimal() {
      return this.estimatedAPR / 100;
    },
    estimatedTerm() {
      return 60; // 5 years
    },
    prequalificationStatus() {
      if (!this.formData.annualIncome || !this.formData.loanAmount) return null;
      const income = parseFloat(this.formData.annualIncome);
      const loanAmount = parseFloat(this.formData.loanAmount);
      const ratio = this.debtToIncomeRatio;
      if (income < 20000) {
        return {
          type: 'error',
          title: 'Income Requirement',
          message: 'Minimum annual income of $20,000 required for loan approval.'
        };
      }
      if (ratio > 50) {
        return {
          type: 'warning',
          title: 'Debt-to-Income Concern',
          message: 'High debt-to-income ratio may require additional documentation.'
        };
      }
      if (loanAmount > income * 0.5) {
        return {
          type: 'warning',
          title: 'Loan Amount Review',
          message: 'Requested amount exceeds 50% of annual income. Consider a smaller amount.'
        };
      }
      return {
        type: 'success',
        title: 'Pre-qualification Positive',
        message: 'You appear to meet our initial qualification criteria!'
      };
    }
  },
  methods: {
    validateField(fieldName) {
      this.errors = {
        ...this.errors
      };
      delete this.errors[fieldName];
      const value = this.formData[fieldName];
      switch (fieldName) {
        case 'firstName':
        case 'lastName':
          if (!value) {
            this.errors[fieldName] = 'This field is required';
          } else if (value.length < 2) {
            this.errors[fieldName] = 'Must be at least 2 characters';
          }
          break;
        case 'email':
          if (!value) {
            this.errors[fieldName] = 'Email address is required';
          } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)) {
            this.errors[fieldName] = 'Please enter a valid email address';
          }
          break;
        case 'phone':
          if (!value) {
            this.errors[fieldName] = 'Phone number is required';
          } else if (!/^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$/.test(value)) {
            this.errors[fieldName] = 'Please enter a valid phone number';
          }
          break;
        case 'annualIncome':
          if (!value) {
            this.errors[fieldName] = 'Annual income is required';
          } else if (parseFloat(value) < 20000) {
            this.errors[fieldName] = 'Minimum annual income is $20,000';
          }
          break;
        case 'monthlyDebt':
        case 'housingPayment':
          if (!value) {
            this.errors[fieldName] = 'This field is required';
          } else if (parseFloat(value) < 0) {
            this.errors[fieldName] = 'Amount cannot be negative';
          }
          break;
        case 'loanAmount':
          if (!value) {
            this.errors[fieldName] = 'Loan amount is required';
          } else if (parseFloat(value) < 1000) {
            this.errors[fieldName] = 'Minimum loan amount is $1,000';
          } else if (parseFloat(value) > 100000) {
            this.errors[fieldName] = 'Maximum loan amount is $100,000';
          }
          break;
      }
      this.$forceUpdate();
    },
    isStepComplete() {
      switch (this.currentStep) {
        case 1:
          return this.formData.firstName && this.formData.lastName && this.formData.email && this.formData.phone;
        case 2:
          return this.formData.annualIncome && this.formData.monthlyDebt && this.formData.housingPayment;
        case 3:
          return this.formData.loanAmount;
        default:
          return false;
      }
    },
    nextStep() {
      this.validateCurrentStep();
      if (this.canProceed && this.currentStep < this.totalSteps) {
        this.isProcessing = true;
        this.loadingMessage = 'Validating information...';
        setTimeout(() => {
          this.currentStep++;
          this.isProcessing = false;
        }, 1000);
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    validateCurrentStep() {
      switch (this.currentStep) {
        case 1:
          this.validateField('firstName');
          this.validateField('lastName');
          this.validateField('email');
          this.validateField('phone');
          break;
        case 2:
          this.validateField('annualIncome');
          this.validateField('monthlyDebt');
          this.validateField('housingPayment');
          break;
        case 3:
          this.validateField('loanAmount');
          break;
      }
    },
    submitApplication() {
      this.validateCurrentStep();
      if (this.canProceed) {
        this.isProcessing = true;
        this.loadingMessage = 'Submitting application...';
        setTimeout(() => {
          this.loadingMessage = 'Processing documents...';
        }, 1000);
        setTimeout(() => {
          this.loadingMessage = 'Finalizing submission...';
        }, 2000);
        setTimeout(() => {
          this.isProcessing = false;
          alert('Application submitted successfully! You will receive confirmation via email.');
          console.log('Application submitted:', this.formData);
        }, 3000);
      }
    },
    triggerValidationErrors() {
      this.errors = {
        firstName: 'Test validation error',
        email: 'Invalid email format for testing',
        annualIncome: 'Income too low for testing',
        loanAmount: 'Amount exceeds limit for testing'
      };
    },
    clearAllData() {
      this.formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        annualIncome: '',
        monthlyDebt: '',
        housingPayment: '',
        loanAmount: ''
      };
      this.errors = {};
      this.currentStep = 1;
    },
    fillSampleData() {
      this.formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '(555) 123-4567',
        annualIncome: '75000',
        monthlyDebt: '850',
        housingPayment: '1200',
        loanAmount: '15000'
      };
      this.errors = {};
    },
    testLoadingStates() {
      this.isProcessing = true;
      this.loadingMessage = 'Testing loading state...';
      setTimeout(() => {
        this.isProcessing = false;
      }, 2000);
    }
  }
})`,...(o=(i=n.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};const T=["CompleteApplicationFlow"];export{n as CompleteApplicationFlow,T as __namedExportsOrder,x as default};
