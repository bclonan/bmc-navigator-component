import { ref, computed } from 'vue';
import MSlider from '../../components/ui/MSlider.vue';

export default {
  title: 'UI/Forms/Slider',
  component: MSlider,
  parameters: {
    docs: {
      description: {
        component: 'Mobile-responsive slider component with touch support, markers, tooltips, and comprehensive validation patterns.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    }
  }
};

const Template = (args) => ({
  components: { MSlider },
  setup() {
    const value = ref(args.modelValue || 50);
    return { value, args };
  },
  template: `
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  label: 'Basic Slider',
  min: 0,
  max: 100,
  step: 1,
  modelValue: 50
};

export const LoanAmount = Template.bind({});
LoanAmount.args = {
  label: 'Loan Amount',
  min: 1000,
  max: 50000,
  step: 500,
  modelValue: 15000,
  unit: '$',
  showTooltip: true,
  showMarkers: true,
  markers: [
    { value: 1000, label: '$1K' },
    { value: 10000, label: '$10K' },
    { value: 25000, label: '$25K' },
    { value: 50000, label: '$50K' }
  ],
  formatValue: (value) => `$${value.toLocaleString()}`,
  helpText: 'Select your desired loan amount',
  variant: 'primary'
};

export const MonthlyIncome = Template.bind({});
MonthlyIncome.args = {
  label: 'Monthly Income',
  min: 1000,
  max: 20000,
  step: 250,
  modelValue: 5000,
  unit: '$',
  showTooltip: true,
  showMarkers: true,
  markers: [
    { value: 1000, label: '$1K' },
    { value: 5000, label: '$5K' },
    { value: 10000, label: '$10K' },
    { value: 15000, label: '$15K' },
    { value: 20000, label: '$20K' }
  ],
  formatValue: (value) => `$${value.toLocaleString()}`,
  helpText: 'Your gross monthly income before taxes',
  variant: 'success'
};

export const CreditScore = Template.bind({});
CreditScore.args = {
  label: 'Estimated Credit Score',
  min: 300,
  max: 850,
  step: 10,
  modelValue: 720,
  showTooltip: true,
  showMarkers: true,
  markers: [
    { value: 300, label: 'Poor' },
    { value: 500, label: 'Fair' },
    { value: 650, label: 'Good' },
    { value: 750, label: 'Excellent' }
  ],
  formatValue: (value) => {
    if (value >= 750) return `${value} (Excellent)`;
    if (value >= 650) return `${value} (Good)`;
    if (value >= 500) return `${value} (Fair)`;
    return `${value} (Poor)`;
  },
  helpText: 'Your approximate credit score range',
  variant: 'warning'
};

export const DebtToIncome = Template.bind({});
DebtToIncome.args = {
  label: 'Current Debt-to-Income Ratio',
  min: 0,
  max: 60,
  step: 1,
  modelValue: 25,
  unit: '%',
  showTooltip: true,
  showMarkers: true,
  markers: [
    { value: 0, label: '0%' },
    { value: 15, label: '15%' },
    { value: 28, label: '28%' },
    { value: 43, label: '43%' },
    { value: 60, label: '60%' }
  ],
  formatValue: (value) => `${value}%`,
  helpText: 'Percentage of income going to debt payments',
  variant: 'danger'
};

export const LoanTerm = Template.bind({});
LoanTerm.args = {
  label: 'Loan Term',
  min: 12,
  max: 84,
  step: 6,
  modelValue: 36,
  unit: 'months',
  showTooltip: true,
  showMarkers: true,
  markers: [
    { value: 12, label: '1 year' },
    { value: 24, label: '2 years' },
    { value: 36, label: '3 years' },
    { value: 48, label: '4 years' },
    { value: 60, label: '5 years' },
    { value: 84, label: '7 years' }
  ],
  formatValue: (value) => {
    const years = Math.floor(value / 12);
    const months = value % 12;
    if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
    return `${years}y ${months}m`;
  },
  helpText: 'How long you want to take to repay the loan',
  variant: 'secondary'
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Slider',
  min: 0,
  max: 100,
  step: 1,
  modelValue: 50,
  disabled: true,
  helpText: 'This slider is disabled'
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Slider with Error',
  min: 1000,
  max: 50000,
  step: 500,
  modelValue: 60000,
  unit: '$',
  error: 'Amount exceeds maximum limit of $50,000',
  formatValue: (value) => `$${value.toLocaleString()}`
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  label: 'Small Slider',
  min: 0,
  max: 100,
  step: 1,
  modelValue: 30,
  size: 'small',
  variant: 'primary'
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  label: 'Large Slider',
  min: 0,
  max: 100,
  step: 1,
  modelValue: 70,
  size: 'large',
  variant: 'success',
  showTooltip: true
};

// Interactive demo showing real-time calculations
const InteractiveTemplate = () => ({
  components: { MSlider },
  setup() {
    const loanAmount = ref(15000);
    const loanTerm = ref(36);
    const interestRate = ref(8.5);
    
    const monthlyPayment = computed(() => {
      const principal = loanAmount.value;
      const monthlyRate = interestRate.value / 100 / 12;
      const numPayments = loanTerm.value;
      
      if (monthlyRate === 0) return principal / numPayments;
      
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    });
    
    const totalInterest = computed(() => {
      return (monthlyPayment.value * loanTerm.value) - loanAmount.value;
    });
    
    return {
      loanAmount,
      loanTerm,
      interestRate,
      monthlyPayment,
      totalInterest
    };
  },
  template: `
    <div class="p-6 space-y-8">
      <h3 class="text-lg font-semibold text-gray-900">Interactive Loan Calculator</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <MSlider
            v-model="loanAmount"
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
          />
          
          <MSlider
            v-model="loanTerm"
            label="Loan Term"
            :min="12"
            :max="84"
            :step="6"
            unit="months"
            :show-tooltip="true"
            :show-markers="true"
            :markers="[
              { value: 12, label: '1yr' },
              { value: 24, label: '2yr' },
              { value: 36, label: '3yr' },
              { value: 48, label: '4yr' },
              { value: 60, label: '5yr' },
              { value: 84, label: '7yr' }
            ]"
            :format-value="(value) => {
              const years = Math.floor(value / 12);
              const months = value % 12;
              if (months === 0) return \`\${years} year\${years > 1 ? 's' : ''}\`;
              return \`\${years}y \${months}m\`;
            }"
            variant="secondary"
          />
          
          <MSlider
            v-model="interestRate"
            label="Interest Rate"
            :min="3.0"
            :max="25.0"
            :step="0.1"
            unit="%"
            :show-tooltip="true"
            :format-value="(value) => \`\${value.toFixed(1)}%\`"
            variant="warning"
          />
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-md font-medium text-gray-900 mb-4">Loan Summary</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Loan Amount:</span>
              <span class="font-semibold">\${{ loanAmount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Term:</span>
              <span class="font-semibold">{{ loanTerm }} months</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Interest Rate:</span>
              <span class="font-semibold">{{ interestRate.toFixed(1) }}%</span>
            </div>
            <hr class="my-3">
            <div class="flex justify-between text-lg">
              <span class="text-gray-900 font-medium">Monthly Payment:</span>
              <span class="font-bold text-blue-600">\${{ monthlyPayment.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Interest:</span>
              <span class="font-semibold text-red-600">\${{ totalInterest.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Amount:</span>
              <span class="font-semibold">\${{ (loanAmount + totalInterest).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

export const InteractiveLoanCalculator = InteractiveTemplate.bind({});

// Mobile demonstration
const MobileTemplate = () => ({
  components: { MSlider },
  setup() {
    const values = ref({
      income: 4500,
      expenses: 2800,
      loanAmount: 12000
    });
    
    const availableIncome = computed(() => values.value.income - values.value.expenses);
    const maxPayment = computed(() => availableIncome.value * 0.3); // 30% rule
    const suggestedLoanAmount = computed(() => maxPayment.value * 36); // 3 year term
    
    return {
      values,
      availableIncome,
      maxPayment,
      suggestedLoanAmount
    };
  },
  template: `
    <div class="max-w-md mx-auto p-4 space-y-6 bg-white">
      <h3 class="text-lg font-semibold text-gray-900">Mobile Loan Calculator</h3>
      
      <MSlider
        v-model="values.income"
        label="Monthly Income"
        :min="1000"
        :max="15000"
        :step="100"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="success"
        size="large"
      />
      
      <MSlider
        v-model="values.expenses"
        label="Monthly Expenses"
        :min="500"
        :max="10000"
        :step="50"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="danger"
        size="large"
      />
      
      <MSlider
        v-model="values.loanAmount"
        label="Desired Loan Amount"
        :min="1000"
        :max="50000"
        :step="500"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="primary"
        size="large"
      />
      
      <div class="bg-blue-50 rounded-lg p-4">
        <h4 class="font-medium text-blue-900 mb-2">Quick Assessment</h4>
        <div class="text-sm space-y-1">
          <div class="flex justify-between">
            <span class="text-blue-700">Available Income:</span>
            <span class="font-medium">\${{ availableIncome.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Max Monthly Payment:</span>
            <span class="font-medium">\${{ maxPayment.toFixed(0) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Suggested Max Loan:</span>
            <span class="font-medium">\${{ suggestedLoanAmount.toFixed(0) }}</span>
          </div>
        </div>
      </div>
    </div>
  `
});

export const MobileOptimized = MobileTemplate.bind({});
MobileOptimized.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};