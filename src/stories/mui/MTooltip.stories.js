import MTooltip from '../../components/mui/MTooltip.vue';
import MInputWithTooltip from '../../components/mui/MInputWithTooltip.vue';
import MButton from '../../components/mui/MButton.vue';
import MTypography from '../../components/mui/MTypography.vue';
import { financialLiteracyContent, getFinancialLiteracyContent } from '../../data/financialLiteracyContent.js';

export default {
  title: 'MUI Components/Feedback/Tooltip & Financial Literacy',
  component: MTooltip,
  parameters: {
    docs: {
      description: {
        component: 'Contextual help tooltips with financial literacy insights to educate users about loan terms, financial concepts, and best practices.',
      },
    },
  },
  argTypes: {
    content: {
      control: { type: 'text' },
      description: 'Tooltip content text',
      defaultValue: 'This is helpful information about this field.'
    },
    title: {
      control: { type: 'text' },
      description: 'Tooltip title',
      defaultValue: 'Financial Guidance'
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon class (FontAwesome)',
      defaultValue: 'fas fa-info-circle'
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Tooltip placement',
      defaultValue: 'top'
    },
    financialInsight: {
      control: { type: 'text' },
      description: 'Financial literacy insight',
      defaultValue: 'This tip helps you make better financial decisions.'
    },
    actionText: {
      control: { type: 'text' },
      description: 'Action button text',
      defaultValue: 'Learn More'
    },
    actionUrl: {
      control: { type: 'text' },
      description: 'Action button URL',
      defaultValue: 'https://www.consumerfinance.gov'
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximum tooltip width',
      defaultValue: '300px'
    },
    delay: {
      control: { type: 'number' },
      description: 'Show delay in milliseconds',
      defaultValue: 200
    }
  }
};

export const BasicTooltip = (args) => ({
  components: { MTooltip, MButton },
  setup() {
    return { args };
  },
  template: `
    <div class="p-8 flex justify-center">
      <MTooltip v-bind="args" @action="handleAction">
        <MButton text="Hover for Help" variant="outlined" color="primary" />
      </MTooltip>
    </div>
  `,
  methods: {
    handleAction(url) {
      console.log('Tooltip action clicked:', url);
    }
  }
});

BasicTooltip.args = {
  content: 'This is a helpful tooltip with financial guidance.',
  title: 'Financial Guidance',
  icon: 'fas fa-info-circle',
  placement: 'top',
  financialInsight: 'Understanding this concept can help you save money on your loan.',
  actionText: 'Learn More',
  actionUrl: 'https://www.consumerfinance.gov',
  maxWidth: '300px',
  delay: 200
};

export const FinancialLiteracyTooltips = () => ({
  components: { MTooltip, MTypography },
  data() {
    return {
      concepts: [
        { key: 'apr', label: 'APR', position: 'top' },
        { key: 'creditScore', label: 'Credit Score', position: 'right' },
        { key: 'loanTerm', label: 'Loan Term', position: 'bottom' },
        { key: 'monthlyPayment', label: 'Monthly Payment', position: 'left' },
        { key: 'debtToIncome', label: 'Debt-to-Income', position: 'top' },
        { key: 'loanPurpose', label: 'Loan Purpose', position: 'bottom' }
      ]
    };
  },
  methods: {
    getContent(key) {
      return financialLiteracyContent[key];
    },
    handleTooltipAction(url) {
      console.log('Opening financial education resource:', url);
    }
  },
  template: `
    <div class="p-8">
      <MTypography variant="h4" class="mb-8 text-center" style="color: var(--mf-primary);">
        Financial Literacy Concepts
      </MTypography>
      
      <div class="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div v-for="concept in concepts" :key="concept.key" class="text-center">
          <MTooltip
            :title="getContent(concept.key).title"
            :content="getContent(concept.key).content"
            :financial-insight="getContent(concept.key).financialInsight"
            :icon="getContent(concept.key).icon"
            :action-text="getContent(concept.key).actionText"
            :action-url="getContent(concept.key).actionUrl"
            :placement="concept.position"
            @action="handleTooltipAction"
          >
            <div class="bg-white border-2 border-blue-200 hover:border-blue-400 rounded-lg p-4 cursor-help transition-all duration-200 hover:shadow-md">
              <i :class="[getContent(concept.key).icon, 'text-2xl text-blue-600 mb-2']"></i>
              <MTypography variant="subtitle2" class="font-semibold">
                {{ concept.label }}
              </MTypography>
            </div>
          </MTooltip>
        </div>
      </div>
      
      <div class="mt-8 text-center">
        <MTypography variant="body2" class="text-gray-600">
          Hover over each concept to learn more about financial terms and get expert insights.
        </MTypography>
      </div>
    </div>
  `
});

export const LoanApplicationWithTooltips = () => ({
  components: { MInputWithTooltip, MTypography },
  data() {
    return {
      formData: {
        loanAmount: '',
        annualIncome: '',
        creditScore: '',
        loanTerm: '',
        loanPurpose: '',
        monthlyPayment: '',
        existingDebt: ''
      }
    };
  },
  methods: {
    handleTooltipAction(event) {
      console.log('Financial education action:', event);
    }
  },
  template: `
    <div class="max-w-4xl mx-auto p-8">
      <MTypography variant="h4" class="mb-8 text-center" style="color: var(--mf-primary);">
        Loan Application with Financial Literacy Help
      </MTypography>
      
      <div class="bg-white rounded-lg shadow-sm p-8 space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MInputWithTooltip
            v-model="formData.loanAmount"
            label="Loan Amount"
            placeholder="$15,000"
            type="number"
            field-name="loan-amount"
            :show-financial-help="true"
            :show-insight-badge="true"
            required
            @tooltip-action="handleTooltipAction"
          />
          
          <MInputWithTooltip
            v-model="formData.annualIncome"
            label="Annual Income"
            placeholder="$50,000"
            type="number"
            field-name="annual-income"
            :show-financial-help="true"
            helper-text="Before taxes and deductions"
            required
            @tooltip-action="handleTooltipAction"
          />
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MInputWithTooltip
            v-model="formData.creditScore"
            label="Credit Score"
            placeholder="750"
            type="number"
            field-name="credit-score"
            :show-financial-help="true"
            :show-insight-badge="true"
            helper-text="Approximate credit score (300-850)"
            @tooltip-action="handleTooltipAction"
          />
          
          <MInputWithTooltip
            v-model="formData.loanTerm"
            label="Loan Term"
            placeholder="60 months"
            type="text"
            field-name="loan-term"
            :show-financial-help="true"
            helper-text="How long to repay the loan"
            @tooltip-action="handleTooltipAction"
          />
        </div>
        
        <MInputWithTooltip
          v-model="formData.loanPurpose"
          label="Loan Purpose"
          placeholder="Debt consolidation"
          type="text"
          field-name="loan-purpose"
          :show-financial-help="true"
          :show-insight-badge="true"
          full-width
          helper-text="What will you use this loan for?"
          @tooltip-action="handleTooltipAction"
        />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MInputWithTooltip
            v-model="formData.monthlyPayment"
            label="Desired Monthly Payment"
            placeholder="$187"
            type="number"
            field-name="monthly-payment"
            :show-financial-help="true"
            helper-text="What you can afford monthly"
            @tooltip-action="handleTooltipAction"
          />
          
          <MInputWithTooltip
            v-model="formData.existingDebt"
            label="Existing Monthly Debt"
            placeholder="$500"
            type="number"
            field-name="existing-debt"
            :show-financial-help="true"
            :show-insight-badge="true"
            helper-text="Current monthly debt payments"
            @tooltip-action="handleTooltipAction"
          />
        </div>
        
        <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
          <div class="flex items-start">
            <i class="fas fa-lightbulb text-blue-500 mt-1 mr-3"></i>
            <div>
              <MTypography variant="subtitle2" class="font-semibold text-blue-800 mb-1">
                Financial Education Tip
              </MTypography>
              <MTypography variant="body2" class="text-blue-700">
                Click the help icons (?) next to each field to learn more about financial concepts and get expert insights that can help you make better borrowing decisions.
              </MTypography>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const TooltipPlacements = () => ({
  components: { MTooltip, MButton },
  template: `
    <div class="p-16 space-y-16">
      <div class="text-center">
        <h3 class="text-xl font-semibold mb-8">Tooltip Placement Options</h3>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <MTooltip
              title="Top Placement"
              content="This tooltip appears above the element."
              financial-insight="Top placement works well for elements at the bottom of the screen."
              icon="fas fa-arrow-up"
              placement="top"
            >
              <MButton text="Top" variant="outlined" color="primary" />
            </MTooltip>
          </div>
          
          <div class="text-center">
            <MTooltip
              title="Right Placement"
              content="This tooltip appears to the right of the element."
              financial-insight="Right placement is ideal for left-aligned form elements."
              icon="fas fa-arrow-right"
              placement="right"
            >
              <MButton text="Right" variant="outlined" color="primary" />
            </MTooltip>
          </div>
          
          <div class="text-center">
            <MTooltip
              title="Bottom Placement"
              content="This tooltip appears below the element."
              financial-insight="Bottom placement is perfect for header elements and navigation."
              icon="fas fa-arrow-down"
              placement="bottom"
            >
              <MButton text="Bottom" variant="outlined" color="primary" />
            </MTooltip>
          </div>
          
          <div class="text-center">
            <MTooltip
              title="Left Placement"
              content="This tooltip appears to the left of the element."
              financial-insight="Left placement works well for right-aligned content."
              icon="fas fa-arrow-left"
              placement="left"
            >
              <MButton text="Left" variant="outlined" color="primary" />
            </MTooltip>
          </div>
        </div>
      </div>
    </div>
  `
});

export const FinancialConceptsShowcase = () => ({
  components: { MTooltip, MTypography },
  data() {
    return {
      financialConcepts: [
        { key: 'apr', icon: 'fas fa-percentage', name: 'APR' },
        { key: 'creditScore', icon: 'fas fa-chart-line', name: 'Credit Score' },
        { key: 'debtToIncome', icon: 'fas fa-balance-scale', name: 'Debt-to-Income' },
        { key: 'loanTerm', icon: 'fas fa-calendar-alt', name: 'Loan Term' },
        { key: 'monthlyPayment', icon: 'fas fa-calculator', name: 'Monthly Payment' },
        { key: 'loanPurpose', icon: 'fas fa-bullseye', name: 'Loan Purpose' },
        { key: 'emergencyFund', icon: 'fas fa-piggy-bank', name: 'Emergency Fund' },
        { key: 'autopay', icon: 'fas fa-sync-alt', name: 'AutoPay Benefits' },
        { key: 'loanShopping', icon: 'fas fa-shopping-cart', name: 'Rate Shopping' },
        { key: 'refinancing', icon: 'fas fa-redo-alt', name: 'Refinancing' },
        { key: 'loanDefault', icon: 'fas fa-exclamation-triangle', name: 'Default Risks' },
        { key: 'financialPlanning', icon: 'fas fa-route', name: 'Financial Planning' }
      ]
    };
  },
  methods: {
    getContent(key) {
      return financialLiteracyContent[key];
    },
    handleAction(url) {
      console.log('Opening:', url);
    }
  },
  template: `
    <div class="p-8">
      <div class="text-center mb-8">
        <MTypography variant="h3" class="mb-4" style="color: var(--mf-primary);">
          Complete Financial Literacy Library
        </MTypography>
        <MTypography variant="body1" class="text-gray-600 max-w-2xl mx-auto">
          Comprehensive financial education tooltips covering all aspects of personal loans and financial wellness. 
          Hover over each concept to access expert insights and educational resources.
        </MTypography>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div v-for="concept in financialConcepts" :key="concept.key" class="group">
          <MTooltip
            :title="getContent(concept.key).title"
            :content="getContent(concept.key).content"
            :financial-insight="getContent(concept.key).financialInsight"
            :icon="getContent(concept.key).icon"
            :action-text="getContent(concept.key).actionText"
            :action-url="getContent(concept.key).actionUrl"
            placement="top"
            @action="handleAction"
          >
            <div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 group-hover:border-blue-300 rounded-xl p-6 cursor-help transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="text-center">
                <div class="w-12 h-12 mx-auto mb-3 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-300">
                  <i :class="[concept.icon, 'text-blue-600 text-lg']"></i>
                </div>
                <MTypography variant="subtitle2" class="font-semibold text-gray-800 group-hover:text-blue-800 transition-colors duration-300">
                  {{ concept.name }}
                </MTypography>
                <div class="mt-2 w-8 h-0.5 bg-blue-200 group-hover:bg-blue-400 mx-auto transition-colors duration-300"></div>
              </div>
            </div>
          </MTooltip>
        </div>
      </div>
      
      <div class="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <div class="text-center">
          <i class="fas fa-graduation-cap text-3xl text-blue-600 mb-4"></i>
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-primary);">
            Financial Education at Your Fingertips
          </MTypography>
          <MTypography variant="body1" class="text-gray-700 max-w-3xl mx-auto">
            Our financial literacy tooltips provide instant access to expert insights, helping you understand loan terms, 
            make informed decisions, and build long-term financial wellness. Each tooltip includes actionable tips and 
            links to authoritative financial education resources.
          </MTypography>
        </div>
      </div>
    </div>
  `
});

export const Playground = (args) => ({
  components: { MTooltip, MButton },
  setup() {
    return { args };
  },
  template: `
    <div class="p-16 flex justify-center">
      <div class="text-center">
        <h3 class="text-xl font-semibold mb-8">Tooltip Playground</h3>
        
        <MTooltip v-bind="args" @action="handleAction">
          <MButton text="Interactive Tooltip Demo" variant="filled" color="primary" class="mf-button-primary" />
        </MTooltip>
        
        <div class="mt-8 text-sm text-gray-600 max-w-md">
          Use the Controls panel to customize the tooltip content, placement, and financial insights.
        </div>
      </div>
    </div>
  `,
  methods: {
    handleAction(url) {
      console.log('Tooltip action clicked:', url);
      alert('Opening financial education resource: ' + url);
    }
  }
});

Playground.args = {
  content: 'Understanding APR helps you compare loan offers and choose the most cost-effective option for your financial situation.',
  title: 'Annual Percentage Rate (APR)',
  icon: 'fas fa-percentage',
  placement: 'top',
  financialInsight: 'Even a 1% difference in APR can save you thousands of dollars over the life of your loan.',
  actionText: 'Learn More',
  actionUrl: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loans-interest-rate-and-its-apr-en-135/',
  maxWidth: '350px',
  delay: 200
};