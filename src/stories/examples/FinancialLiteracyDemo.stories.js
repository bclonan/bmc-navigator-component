import MInputWithTooltip from '../../components/mui/MInputWithTooltip.vue';
import MButton from '../../components/mui/MButton.vue';
import MTypography from '../../components/mui/MTypography.vue';
import MAlert from '../../components/mui/MAlert.vue';
import MChip from '../../components/mui/MChip.vue';
import MAppBar from '../../components/mui/MAppBar.vue';
import MToolbar from '../../components/mui/MToolbar.vue';
import MLinearProgress from '../../components/mui/MLinearProgress.vue';

export default {
  title: 'Financial Components/Financial Literacy/Educational Tooltips',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete loan application with contextual financial literacy tooltips providing expert insights and educational resources optimized for accessibility and user engagement.',
      },
      canvas: { sourceState: 'shown' },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'heading-order', enabled: true },
          { id: 'landmark-one-main', enabled: true },
          { id: 'region', enabled: true },
          { id: 'aria-tooltip-name', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true },
        ],
      },
    },
    backgrounds: {
      default: 'yourtownfinance-light',
      values: [
        { name: 'yourtownfinance-light', value: '#ffffff' },
        { name: 'yourtownfinance-surface', value: '#f4f4f4' },
        { name: 'financial-green', value: 'rgb(249, 255, 250)' },
      ],
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  argTypes: {
    showAnalytics: {
      control: { type: 'boolean' },
      description: 'Display usage analytics for educational content engagement',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    interactiveMode: {
      control: { type: 'boolean' },
      description: 'Enable interactive tooltips with expandable content',
      defaultValue: true,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    educationLevel: {
      control: { type: 'select' },
      options: ['beginner', 'intermediate', 'advanced'],
      description: 'Adjust content complexity for user education level',
      defaultValue: 'intermediate',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'intermediate' },
      },
    },
    accessibilityMode: {
      control: { type: 'boolean' },
      description: 'Enhanced accessibility features for screen readers',
      defaultValue: false,
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export const LoanApplicationDemo = () => ({
  components: {
    MInputWithTooltip,
    MButton,
    MTypography,
    MAlert,
    MChip,
    MAppBar,
    MToolbar,
    MLinearProgress
  },
  data() {
    return {
      currentStep: 1,
      totalSteps: 3,
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        annualIncome: '',
        employmentStatus: '',
        existingDebt: '',
        loanAmount: '',
        loanPurpose: '',
        loanTerm: '',
        creditScore: '',
        monthlyPayment: ''
      },
      errors: {},
      educationInteractions: [],
      showTips: true
    };
  },
  computed: {
    progressPercentage() {
      return (this.currentStep / this.totalSteps) * 100;
    },
    canProceed() {
      switch (this.currentStep) {
        case 1:
          return this.formData.firstName && this.formData.lastName && this.formData.email;
        case 2:
          return this.formData.annualIncome && this.formData.employmentStatus;
        case 3:
          return this.formData.loanAmount && this.formData.loanPurpose;
        default:
          return false;
      }
    }
  },
  methods: {
    nextStep() {
      if (this.canProceed && this.currentStep < this.totalSteps) {
        this.currentStep++;
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    handleTooltipAction(event) {
      this.educationInteractions.push({
        field: event.fieldName,
        timestamp: new Date().toLocaleTimeString(),
        resource: event.url,
        content: event.content?.title || 'Financial Education'
      });
      console.log('Financial education accessed:', event);
    },
    validateEmail(value) {
      if (value && !/\S+@\S+\.\S+/.test(value)) {
        this.errors.email = 'Please enter a valid email address';
      } else {
        delete this.errors.email;
      }
    },
    validateIncome(value) {
      if (value && (isNaN(value) || value < 1000)) {
        this.errors.annualIncome = 'Please enter a valid annual income';
      } else {
        delete this.errors.annualIncome;
      }
    },
    validateLoanAmount(value) {
      if (value && (isNaN(value) || value < 1000 || value > 100000)) {
        this.errors.loanAmount = 'Loan amount must be between $1,000 and $100,000';
      } else {
        delete this.errors.loanAmount;
      }
    },
    submitApplication() {
      alert('Demo completed! In a real application, this would submit your loan request with ' + this.educationInteractions.length + ' financial education interactions tracked.');
    }
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <MAppBar class="mf-app-bar">
        <MToolbar class="justify-between">
          <MTypography variant="h6" class="text-white font-bold">
            Financial Literacy Demo - Contextual Help System
          </MTypography>
          <div class="flex items-center space-x-4">
            <MChip text="Interactive Demo" color="info" variant="outlined" class="bg-white bg-opacity-20 text-white border-white border-opacity-30" />
            <MChip text="Step {{ currentStep }} of {{ totalSteps }}" color="success" variant="outlined" class="bg-white bg-opacity-20 text-white border-white border-opacity-30" />
          </div>
        </MToolbar>
      </MAppBar>

      <!-- Progress Bar -->
      <div class="pt-16 bg-white border-b">
        <div class="max-w-4xl mx-auto px-8 py-4">
          <div class="flex justify-between mb-2">
            <MTypography variant="body2" class="text-gray-600">Demo Progress</MTypography>
            <MTypography variant="body2" class="text-gray-600">{{ Math.round(progressPercentage) }}% Complete</MTypography>
          </div>
          <MLinearProgress :value="progressPercentage" variant="determinate" class="mf-progress-primary" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="max-w-4xl mx-auto p-8">
        
        <!-- Educational Alert -->
        <MAlert 
          v-if="showTips" 
          severity="info" 
          title="Interactive Financial Education" 
          class="mb-8 mf-alert-info"
          closable
          @close="showTips = false"
        >
          Click the help icons (?) next to form fields to access contextual financial literacy content with expert insights and educational resources.
        </MAlert>

        <!-- Step 1: Personal Information -->
        <div v-if="currentStep === 1" class="bg-white rounded-lg shadow-sm p-8">
          <MTypography variant="h4" class="mb-6" style="color: var(--mf-primary);">
            Personal Information
          </MTypography>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MInputWithTooltip
                v-model="formData.firstName"
                label="First Name"
                placeholder="Enter your first name"
                field-name="first-name"
                :custom-financial-content="{
                  title: 'Identity Verification',
                  content: 'Your legal name should match government-issued identification documents for smooth loan processing.',
                  financialInsight: 'Consistent personal information across all financial applications helps build trust with lenders and speeds up approval.',
                  icon: 'fas fa-user',
                  actionText: 'ID Requirements',
                  actionUrl: 'https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-get-a-mortgage-loan-en-241/'
                }"
                required
                @tooltip-action="handleTooltipAction"
              />
              
              <MInputWithTooltip
                v-model="formData.lastName"
                label="Last Name"
                placeholder="Enter your last name"
                field-name="last-name"
                :custom-financial-content="{
                  title: 'Legal Documentation',
                  content: 'Ensure your name exactly matches your Social Security card and other official documents.',
                  financialInsight: 'Name discrepancies can cause delays in loan processing and may require additional documentation.',
                  icon: 'fas fa-id-card'
                }"
                required
                @tooltip-action="handleTooltipAction"
              />
            </div>
            
            <MInputWithTooltip
              v-model="formData.email"
              label="Email Address"
              placeholder="your.email@example.com"
              type="email"
              field-name="email"
              :custom-financial-content="{
                title: 'Secure Communication',
                content: 'Your email will be used for loan updates, e-statements, and important account notifications.',
                financialInsight: 'Use a secure email account you check regularly to stay informed about your loan status and payments.',
                icon: 'fas fa-envelope',
                actionText: 'Email Security',
                actionUrl: 'https://www.consumer.ftc.gov/articles/0272-how-keep-your-personal-information-secure'
              }"
              :error="!!errors.email"
              :error-message="errors.email"
              :show-insight-badge="true"
              required
              full-width
              @blur="validateEmail(formData.email)"
              @tooltip-action="handleTooltipAction"
            />
            
            <MInputWithTooltip
              v-model="formData.phone"
              label="Phone Number"
              placeholder="(555) 123-4567"
              type="tel"
              field-name="phone"
              :custom-financial-content="{
                title: 'Contact Verification',
                content: 'Lenders may call to verify information or discuss your application status.',
                financialInsight: 'Having a reliable phone number speeds up the verification process and helps prevent loan fraud.',
                icon: 'fas fa-phone'
              }"
              helper-text="Used for verification and important updates"
              @tooltip-action="handleTooltipAction"
            />
          </div>
        </div>

        <!-- Step 2: Financial Information -->
        <div v-if="currentStep === 2" class="bg-white rounded-lg shadow-sm p-8">
          <MTypography variant="h4" class="mb-6" style="color: var(--mf-primary);">
            Financial Information
          </MTypography>
          
          <div class="space-y-6">
            <MInputWithTooltip
              v-model="formData.annualIncome"
              label="Annual Income"
              placeholder="$50,000"
              type="number"
              field-name="annual-income"
              :error="!!errors.annualIncome"
              :error-message="errors.annualIncome"
              :show-insight-badge="true"
              helper-text="Gross income before taxes and deductions"
              required
              full-width
              @blur="validateIncome(formData.annualIncome)"
              @tooltip-action="handleTooltipAction"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MInputWithTooltip
                v-model="formData.employmentStatus"
                label="Employment Status"
                placeholder="Full-time employed"
                field-name="employment"
                :show-insight-badge="true"
                helper-text="Current employment situation"
                required
                @tooltip-action="handleTooltipAction"
              />
              
              <MInputWithTooltip
                v-model="formData.existingDebt"
                label="Monthly Debt Payments"
                placeholder="$500"
                type="number"
                field-name="existing-debt"
                :show-insight-badge="true"
                helper-text="Include all monthly debt obligations"
                @tooltip-action="handleTooltipAction"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Loan Details -->
        <div v-if="currentStep === 3" class="bg-white rounded-lg shadow-sm p-8">
          <MTypography variant="h4" class="mb-6" style="color: var(--mf-primary);">
            Loan Requirements
          </MTypography>
          
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MInputWithTooltip
                v-model="formData.loanAmount"
                label="Loan Amount"
                placeholder="$15,000"
                type="number"
                field-name="loan-amount"
                :error="!!errors.loanAmount"
                :error-message="errors.loanAmount"
                :show-insight-badge="true"
                helper-text="Amount between $1,000 - $100,000"
                required
                @blur="validateLoanAmount(formData.loanAmount)"
                @tooltip-action="handleTooltipAction"
              />
              
              <MInputWithTooltip
                v-model="formData.loanTerm"
                label="Preferred Term"
                placeholder="60 months"
                field-name="loan-term"
                :show-insight-badge="true"
                helper-text="Repayment period preference"
                @tooltip-action="handleTooltipAction"
              />
            </div>
            
            <MInputWithTooltip
              v-model="formData.loanPurpose"
              label="Loan Purpose"
              placeholder="Debt consolidation"
              field-name="loan-purpose"
              :show-insight-badge="true"
              helper-text="Primary use for loan funds"
              full-width
              required
              @tooltip-action="handleTooltipAction"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MInputWithTooltip
                v-model="formData.creditScore"
                label="Estimated Credit Score"
                placeholder="750"
                type="number"
                field-name="credit-score"
                :show-insight-badge="true"
                helper-text="Approximate score (300-850)"
                @tooltip-action="handleTooltipAction"
              />
              
              <MInputWithTooltip
                v-model="formData.monthlyPayment"
                label="Affordable Monthly Payment"
                placeholder="$187"
                type="number"
                field-name="monthly-payment"
                :show-insight-badge="true"
                helper-text="Maximum comfortable payment"
                @tooltip-action="handleTooltipAction"
              />
            </div>
            
            <!-- Educational Summary -->
            <div v-if="educationInteractions.length > 0" class="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div class="flex items-center mb-4">
                <i class="fas fa-graduation-cap text-blue-600 text-xl mr-3"></i>
                <MTypography variant="h6" style="color: var(--mf-primary);">
                  Your Financial Education Journey
                </MTypography>
              </div>
              
              <MTypography variant="body2" class="text-gray-700 mb-4">
                You've accessed {{ educationInteractions.length }} financial education resource{{ educationInteractions.length > 1 ? 's' : '' }} during this application:
              </MTypography>
              
              <div class="space-y-2">
                <div v-for="(interaction, index) in educationInteractions.slice(0, 5)" :key="index" class="flex items-center text-sm text-blue-700">
                  <i class="fas fa-check-circle text-green-500 mr-2"></i>
                  <span>{{ interaction.content }} - {{ interaction.timestamp }}</span>
                </div>
                <div v-if="educationInteractions.length > 5" class="text-sm text-blue-600 italic">
                  ... and {{ educationInteractions.length - 5 }} more educational interactions
                </div>
              </div>
              
              <div class="mt-4 flex flex-wrap gap-2">
                <MChip 
                  v-for="interaction in educationInteractions.slice(0, 4)" 
                  :key="interaction.field"
                  :text="interaction.field.replace('-', ' ')"
                  size="small"
                  color="primary"
                  class="mf-chip-primary"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-8">
          <MButton 
            v-if="currentStep > 1"
            text="Previous Step"
            variant="outlined"
            color="secondary"
            @click="previousStep"
          />
          <div v-else></div>
          
          <div class="space-x-4">
            <MButton 
              v-if="currentStep < totalSteps"
              text="Continue"
              variant="filled"
              color="primary"
              class="mf-button-primary"
              :disabled="!canProceed"
              @click="nextStep"
            />
            <MButton 
              v-if="currentStep === totalSteps"
              text="Complete Demo"
              variant="filled"
              color="primary"
              class="mf-button-primary"
              @click="submitApplication"
            />
          </div>
        </div>
      </div>
    </div>
  `
});

export const EducationalResourcesOverview = () => ({
  components: { MTypography, MAlert, MChip },
  data() {
    return {
      resources: [
        {
          category: 'Loan Basics',
          items: [
            'Understanding APR vs Interest Rate',
            'How Loan Terms Affect Total Cost',
            'Personal Loan vs Credit Card Comparison',
            'Loan Purpose Planning'
          ]
        },
        {
          category: 'Credit & Income',
          items: [
            'Credit Score Impact on Rates',
            'Debt-to-Income Ratio Importance',
            'Employment Verification Process',
            'Income Documentation Requirements'
          ]
        },
        {
          category: 'Financial Wellness',
          items: [
            'Emergency Fund Planning',
            'Automatic Payment Benefits',
            'Rate Shopping Best Practices',
            'Long-term Financial Planning'
          ]
        },
        {
          category: 'Risk Management',
          items: [
            'Understanding Default Consequences',
            'Refinancing Opportunities',
            'Early Payment Strategies',
            'Loan Fee Awareness'
          ]
        }
      ]
    };
  },
  template: `
    <div class="p-8 max-w-6xl mx-auto">
      <div class="text-center mb-12">
        <MTypography variant="h3" class="mb-4" style="color: var(--mf-primary);">
          Comprehensive Financial Education Library
        </MTypography>
        <MTypography variant="body1" class="text-gray-600 max-w-3xl mx-auto">
          Our contextual help system provides access to expert financial insights and authoritative educational resources 
          from the Consumer Financial Protection Bureau and industry experts.
        </MTypography>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div v-for="resourceGroup in resources" :key="resourceGroup.category" class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex items-center mb-4">
            <i class="fas fa-book-open text-blue-600 text-lg mr-3"></i>
            <MTypography variant="h6" style="color: var(--mf-secondary);">
              {{ resourceGroup.category }}
            </MTypography>
          </div>
          
          <ul class="space-y-3">
            <li v-for="item in resourceGroup.items" :key="item" class="flex items-start">
              <i class="fas fa-check-circle text-green-500 text-sm mt-0.5 mr-3 flex-shrink-0"></i>
              <MTypography variant="body2" class="text-gray-700">{{ item }}</MTypography>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Implementation Features -->
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
          <i class="fas fa-magic text-blue-600 text-2xl mb-3"></i>
          <MTypography variant="h6" class="mb-2" style="color: var(--mf-primary);">
            Smart Content Matching
          </MTypography>
          <MTypography variant="body2" class="text-gray-700">
            Automatically displays relevant financial education based on form field context and user interaction patterns.
          </MTypography>
        </div>
        
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
          <i class="fas fa-shield-alt text-green-600 text-2xl mb-3"></i>
          <MTypography variant="h6" class="mb-2" style="color: var(--mf-success);">
            Authoritative Sources
          </MTypography>
          <MTypography variant="body2" class="text-gray-700">
            All content sourced from Consumer Financial Protection Bureau and recognized financial education authorities.
          </MTypography>
        </div>
        
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
          <i class="fas fa-chart-line text-purple-600 text-2xl mb-3"></i>
          <MTypography variant="h6" class="mb-2" style="color: var(--mf-secondary);">
            Usage Analytics
          </MTypography>
          <MTypography variant="body2" class="text-gray-700">
            Track educational engagement to improve content relevance and measure financial literacy impact.
          </MTypography>
        </div>
      </div>
      
      <MAlert 
        severity="success" 
        title="Feature Implementation Complete" 
        class="mf-alert-success"
      >
        The contextual help tooltip system with financial literacy insights is now fully implemented and integrated 
        with the Material-UI component library. Users can access expert financial education throughout their loan application journey.
      </MAlert>
    </div>
  `
});