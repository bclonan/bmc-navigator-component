import{M as u}from"./MButton-BLV5TnM3.js";import{M as d}from"./MInput-CcA3fQAp.js";import{M as c}from"./MTypography-DmD30oZU.js";import{M as h}from"./MAlert-DQn7thiI.js";import{M as v}from"./MLinearProgress-D4GmZOV8.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const D={title:"Financial Components/Loan Application/Form Renderer",parameters:{layout:"fullscreen",docs:{description:{component:"Dynamic form renderer specifically designed for loan applications with validation, multi-step forms, and financial context tooltips."}}},argTypes:{formType:{control:{type:"select"},options:["personal-loan","auto-loan","home-improvement","debt-consolidation"],description:"Type of loan application form",defaultValue:"personal-loan"},enableValidation:{control:{type:"boolean"},description:"Enable real-time validation",defaultValue:!0},showProgress:{control:{type:"boolean"},description:"Show form completion progress",defaultValue:!0}}},e=t=>({components:{MButton:u,MInput:d,MTypography:c,MAlert:h,MLinearProgress:v},setup(){return{args:t}},template:`
    <div class="min-h-screen bg-gray-50 py-8">
      <div class="max-w-2xl mx-auto px-4">
        <div class="text-center mb-8">
          <MTypography variant="h1" class="text-3xl font-bold text-gray-900 mb-2">
            Personal Loan Application
          </MTypography>
          <MTypography variant="body1" class="text-gray-600">
            Apply for a personal loan with competitive rates
          </MTypography>
        </div>

        <div v-if="args.showProgress" class="mb-8">
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

          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MInput 
                label="First Name"
                v-model="formData.firstName"
                :error="!!errors.firstName"
                :helperText="errors.firstName"
                required
                fullWidth
              />
              <MInput 
                label="Last Name"
                v-model="formData.lastName"
                :error="!!errors.lastName"
                :helperText="errors.lastName"
                required
                fullWidth
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
            />
            
            <MInput 
              label="Phone Number"
              type="tel"
              v-model="formData.phone"
              :error="!!errors.phone"
              :helperText="errors.phone || 'For loan status updates and verification'"
              required
              fullWidth
            />
          </div>

          <div v-if="currentStep === 2" class="space-y-4">
            <MInput 
              label="Annual Income"
              type="number"
              v-model="formData.annualIncome"
              :error="!!errors.annualIncome"
              :helperText="errors.annualIncome || 'Your total yearly income before taxes'"
              required
              fullWidth
            />
            
            <MInput 
              label="Monthly Debt Payments"
              type="number"
              v-model="formData.monthlyDebt"
              :error="!!errors.monthlyDebt"
              :helperText="errors.monthlyDebt || 'Include credit cards, loans, and other monthly payments'"
              required
              fullWidth
            />
            
            <MInput 
              label="Monthly Housing Payment"
              type="number"
              v-model="formData.housingPayment"
              :error="!!errors.housingPayment"
              :helperText="errors.housingPayment || 'Rent or mortgage payment'"
              required
              fullWidth
            />
          </div>

          <div v-if="currentStep === 3" class="space-y-4">
            <MInput 
              label="Desired Loan Amount"
              type="number"
              v-model="formData.loanAmount"
              :error="!!errors.loanAmount"
              :helperText="errors.loanAmount || 'Enter amount between $1,000 - $100,000'"
              required
              fullWidth
            />
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <MTypography variant="h6" class="text-blue-800 mb-2">
                Estimated Monthly Payment
              </MTypography>
              <MTypography variant="h4" class="text-blue-900 font-bold">
                {{ estimatedPayment }}
              </MTypography>
              <MTypography variant="body2" class="text-blue-700">
                Based on 8.99% APR for 60 months
              </MTypography>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <MButton 
              v-if="currentStep > 1"
              text="Previous"
              variant="outlined"
              color="secondary"
              @click="previousStep"
            />
            <div v-else></div>
            
            <MButton 
              v-if="currentStep < totalSteps"
              text="Next"
              variant="filled"
              color="primary"
              @click="nextStep"
              class="mf-button-primary"
            />
            <MButton 
              v-else
              text="Submit Application"
              variant="filled"
              color="primary"
              @click="submitForm"
              class="mf-button-primary"
            />
          </div>
        </div>

        <MAlert severity="info" class="mt-6">
          <strong>Your information is secure:</strong> All data is encrypted and protected according to industry standards.
        </MAlert>
      </div>
    </div>
  `,data(){return{currentStep:1,totalSteps:3,stepTitles:["Personal Information","Financial Information","Loan Details"],formData:{firstName:"",lastName:"",email:"",phone:"",annualIncome:"",monthlyDebt:"",housingPayment:"",loanAmount:""},errors:{}}},computed:{progress(){return this.currentStep/this.totalSteps*100},estimatedPayment(){if(!this.formData.loanAmount)return"$0";const y=parseFloat(this.formData.loanAmount),r=.0899/12,a=60,f=y*r*Math.pow(1+r,a)/(Math.pow(1+r,a)-1);return"$"+Math.round(f).toLocaleString()}},methods:{nextStep(){this.currentStep<this.totalSteps&&this.currentStep++},previousStep(){this.currentStep>1&&this.currentStep--},submitForm(){alert("Application submitted successfully!"),console.log("Form data:",this.formData)}}});e.args={formType:"personal-loan",enableValidation:!0,showProgress:!0};const n=()=>({components:{MButton:u,MInput:d,MTypography:c,MAlert:h},template:`
    <div class="max-w-md mx-auto p-6">
      <MTypography variant="h2" class="text-xl font-semibold mb-6">
        Real-time Validation Demo
      </MTypography>
      
      <div class="space-y-4">
        <MInput 
          label="Annual Income"
          type="number"
          v-model="income"
          :error="incomeError !== ''"
          :helperText="incomeError || 'Minimum $20,000 required'"
          required
          fullWidth
        />
        
        <MInput 
          label="Email Address"
          type="email"
          v-model="email"
          :error="emailError !== ''"
          :helperText="emailError || 'Valid email format required'"
          required
          fullWidth
        />
        
        <MInput 
          label="Loan Amount"
          type="number"
          v-model="loanAmount"
          :error="loanError !== ''"
          :helperText="loanError || 'Between $1,000 - $100,000'"
          required
          fullWidth
        />
        
        <MAlert 
          v-if="hasErrors" 
          severity="error"
          class="mt-4"
        >
          Please correct the errors above before proceeding.
        </MAlert>
        
        <MAlert 
          v-else-if="allFieldsFilled" 
          severity="success"
          class="mt-4"
        >
          All fields are valid! Ready to proceed.
        </MAlert>
      </div>
    </div>
  `,data(){return{income:"",email:"",loanAmount:""}},computed:{incomeError(){return this.income&&this.income<2e4?"Minimum annual income is $20,000":""},emailError(){return this.email?/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)?"":"Please enter a valid email address":""},loanError(){return this.loanAmount?this.loanAmount<1e3?"Minimum loan amount is $1,000":this.loanAmount>1e5?"Maximum loan amount is $100,000":"":""},hasErrors(){return this.incomeError||this.emailError||this.loanError},allFieldsFilled(){return this.income&&this.email&&this.loanAmount&&!this.hasErrors}}});var o,l,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => ({
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
            Personal Loan Application
          </MTypography>
          <MTypography variant="body1" class="text-gray-600">
            Apply for a personal loan with competitive rates
          </MTypography>
        </div>

        <div v-if="args.showProgress" class="mb-8">
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

          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MInput 
                label="First Name"
                v-model="formData.firstName"
                :error="!!errors.firstName"
                :helperText="errors.firstName"
                required
                fullWidth
              />
              <MInput 
                label="Last Name"
                v-model="formData.lastName"
                :error="!!errors.lastName"
                :helperText="errors.lastName"
                required
                fullWidth
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
            />
            
            <MInput 
              label="Phone Number"
              type="tel"
              v-model="formData.phone"
              :error="!!errors.phone"
              :helperText="errors.phone || 'For loan status updates and verification'"
              required
              fullWidth
            />
          </div>

          <div v-if="currentStep === 2" class="space-y-4">
            <MInput 
              label="Annual Income"
              type="number"
              v-model="formData.annualIncome"
              :error="!!errors.annualIncome"
              :helperText="errors.annualIncome || 'Your total yearly income before taxes'"
              required
              fullWidth
            />
            
            <MInput 
              label="Monthly Debt Payments"
              type="number"
              v-model="formData.monthlyDebt"
              :error="!!errors.monthlyDebt"
              :helperText="errors.monthlyDebt || 'Include credit cards, loans, and other monthly payments'"
              required
              fullWidth
            />
            
            <MInput 
              label="Monthly Housing Payment"
              type="number"
              v-model="formData.housingPayment"
              :error="!!errors.housingPayment"
              :helperText="errors.housingPayment || 'Rent or mortgage payment'"
              required
              fullWidth
            />
          </div>

          <div v-if="currentStep === 3" class="space-y-4">
            <MInput 
              label="Desired Loan Amount"
              type="number"
              v-model="formData.loanAmount"
              :error="!!errors.loanAmount"
              :helperText="errors.loanAmount || 'Enter amount between $1,000 - $100,000'"
              required
              fullWidth
            />
            
            <div class="bg-blue-50 p-4 rounded-lg">
              <MTypography variant="h6" class="text-blue-800 mb-2">
                Estimated Monthly Payment
              </MTypography>
              <MTypography variant="h4" class="text-blue-900 font-bold">
                {{ estimatedPayment }}
              </MTypography>
              <MTypography variant="body2" class="text-blue-700">
                Based on 8.99% APR for 60 months
              </MTypography>
            </div>
          </div>

          <div class="flex justify-between mt-8">
            <MButton 
              v-if="currentStep > 1"
              text="Previous"
              variant="outlined"
              color="secondary"
              @click="previousStep"
            />
            <div v-else></div>
            
            <MButton 
              v-if="currentStep < totalSteps"
              text="Next"
              variant="filled"
              color="primary"
              @click="nextStep"
              class="mf-button-primary"
            />
            <MButton 
              v-else
              text="Submit Application"
              variant="filled"
              color="primary"
              @click="submitForm"
              class="mf-button-primary"
            />
          </div>
        </div>

        <MAlert severity="info" class="mt-6">
          <strong>Your information is secure:</strong> All data is encrypted and protected according to industry standards.
        </MAlert>
      </div>
    </div>
  \`,
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
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
    estimatedPayment() {
      if (!this.formData.loanAmount) return '$0';
      const amount = parseFloat(this.formData.loanAmount);
      const rate = 0.0899 / 12;
      const periods = 60;
      const payment = amount * rate * Math.pow(1 + rate, periods) / (Math.pow(1 + rate, periods) - 1);
      return '$' + Math.round(payment).toLocaleString();
    }
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    submitForm() {
      alert('Application submitted successfully!');
      console.log('Form data:', this.formData);
    }
  }
})`,...(s=(l=e.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};var i,m,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`() => ({
  components: {
    MButton,
    MInput,
    MTypography,
    MAlert
  },
  template: \`
    <div class="max-w-md mx-auto p-6">
      <MTypography variant="h2" class="text-xl font-semibold mb-6">
        Real-time Validation Demo
      </MTypography>
      
      <div class="space-y-4">
        <MInput 
          label="Annual Income"
          type="number"
          v-model="income"
          :error="incomeError !== ''"
          :helperText="incomeError || 'Minimum $20,000 required'"
          required
          fullWidth
        />
        
        <MInput 
          label="Email Address"
          type="email"
          v-model="email"
          :error="emailError !== ''"
          :helperText="emailError || 'Valid email format required'"
          required
          fullWidth
        />
        
        <MInput 
          label="Loan Amount"
          type="number"
          v-model="loanAmount"
          :error="loanError !== ''"
          :helperText="loanError || 'Between $1,000 - $100,000'"
          required
          fullWidth
        />
        
        <MAlert 
          v-if="hasErrors" 
          severity="error"
          class="mt-4"
        >
          Please correct the errors above before proceeding.
        </MAlert>
        
        <MAlert 
          v-else-if="allFieldsFilled" 
          severity="success"
          class="mt-4"
        >
          All fields are valid! Ready to proceed.
        </MAlert>
      </div>
    </div>
  \`,
  data() {
    return {
      income: '',
      email: '',
      loanAmount: ''
    };
  },
  computed: {
    incomeError() {
      if (!this.income) return '';
      if (this.income < 20000) return 'Minimum annual income is $20,000';
      return '';
    },
    emailError() {
      if (!this.email) return '';
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(this.email)) return 'Please enter a valid email address';
      return '';
    },
    loanError() {
      if (!this.loanAmount) return '';
      if (this.loanAmount < 1000) return 'Minimum loan amount is $1,000';
      if (this.loanAmount > 100000) return 'Maximum loan amount is $100,000';
      return '';
    },
    hasErrors() {
      return this.incomeError || this.emailError || this.loanError;
    },
    allFieldsFilled() {
      return this.income && this.email && this.loanAmount && !this.hasErrors;
    }
  }
})`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const I=["PersonalLoanApplication","ValidationDemo"];export{e as PersonalLoanApplication,n as ValidationDemo,I as __namedExportsOrder,D as default};
