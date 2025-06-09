import MSlider from '../../components/ui/MSlider.vue';

export default {
  title: 'Material UI/MSlider',
  component: MSlider,
  parameters: {
    docs: {
      description: {
        component: 'Material Design slider component with customizable range, step values, and visual feedback.'
      }
    }
  },
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error']
    }
  }
};

export const Default = {
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    modelValue: 50
  }
};

export const Colors = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        values: {
          primary: 25,
          secondary: 40,
          success: 60,
          warning: 75,
          error: 90
        }
      };
    },
    template: `
      <div class="space-y-6">
        <MSlider 
          v-model="values.primary"
          color="primary"
          label="Primary Color"
          :min="0"
          :max="100"
        />
        
        <MSlider 
          v-model="values.secondary"
          color="secondary"
          label="Secondary Color"
          :min="0"
          :max="100"
        />
        
        <MSlider 
          v-model="values.success"
          color="success"
          label="Success Color"
          :min="0"
          :max="100"
        />
        
        <MSlider 
          v-model="values.warning"
          color="warning"
          label="Warning Color"
          :min="0"
          :max="100"
        />
        
        <MSlider 
          v-model="values.error"
          color="error"
          label="Error Color"
          :min="0"
          :max="100"
        />
      </div>
    `
  })
};

export const CustomRanges = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        values: {
          temperature: 72,
          price: 250,
          rating: 4.2,
          progress: 0.75
        }
      };
    },
    template: `
      <div class="space-y-6">
        <MSlider 
          v-model="values.temperature"
          label="Temperature (°F)"
          :min="32"
          :max="100"
          :step="1"
          color="warning"
          :show-value="true"
          helper-text="Adjust your preferred temperature"
        />
        
        <MSlider 
          v-model="values.price"
          label="Price Range ($)"
          :min="0"
          :max="1000"
          :step="25"
          color="success"
          :show-value="true"
          :format-value="(value) => '$' + value"
          helper-text="Set your budget range"
        />
        
        <MSlider 
          v-model="values.rating"
          label="Rating"
          :min="1"
          :max="5"
          :step="0.1"
          color="primary"
          :show-value="true"
          :format-value="(value) => value.toFixed(1) + ' stars'"
          helper-text="Rate your experience"
        />
        
        <MSlider 
          v-model="values.progress"
          label="Progress"
          :min="0"
          :max="1"
          :step="0.01"
          color="secondary"
          :show-value="true"
          :format-value="(value) => Math.round(value * 100) + '%'"
          helper-text="Current completion status"
        />
      </div>
    `
  })
};

export const WithTicks = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        values: {
          volume: 50,
          quality: 3,
          interval: 10
        }
      };
    },
    template: `
      <div class="space-y-6">
        <MSlider 
          v-model="values.volume"
          label="Volume Control"
          :min="0"
          :max="100"
          :step="10"
          color="primary"
          :show-ticks="true"
          :show-tick-labels="true"
          helper-text="Adjust audio volume in 10% increments"
        />
        
        <MSlider 
          v-model="values.quality"
          label="Quality Setting"
          :min="1"
          :max="5"
          :step="1"
          color="success"
          :show-ticks="true"
          :show-tick-labels="true"
          :format-value="(value) => ['Low', 'Medium', 'High', 'Ultra', 'Max'][value - 1]"
          helper-text="Choose quality level"
        />
        
        <MSlider 
          v-model="values.interval"
          label="Update Interval"
          :min="5"
          :max="60"
          :step="5"
          color="warning"
          :show-ticks="true"
          tick-position="both"
          :format-value="(value) => value + 's'"
          helper-text="Set refresh interval in seconds"
        />
      </div>
    `
  })
};

export const States = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        values: {
          normal: 50,
          disabled: 30,
          required: 75,
          error: 25
        }
      };
    },
    template: `
      <div class="space-y-6">
        <MSlider 
          v-model="values.normal"
          label="Normal State"
          :min="0"
          :max="100"
          color="primary"
          helper-text="Standard slider functionality"
        />
        
        <MSlider 
          v-model="values.disabled"
          label="Disabled State"
          :min="0"
          :max="100"
          :disabled="true"
          color="primary"
          helper-text="This slider is disabled"
        />
        
        <MSlider 
          v-model="values.required"
          label="Required Field"
          :min="0"
          :max="100"
          :required="true"
          color="primary"
          helper-text="This field is required"
        />
        
        <MSlider 
          v-model="values.error"
          label="Error State"
          :min="0"
          :max="100"
          color="error"
          error-message="Value must be above 50"
          helper-text="This slider has an error"
        />
      </div>
    `
  })
};

export const WrapExtendFunctionality = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        values: {
          wrapped: 30,
          extended: 60,
          both: 80,
          budget: 500,
          risk: 3
        }
      };
    },
    template: `
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Slider -->
        <MSlider 
          v-model="values.wrapped"
          label="Wrapped Slider"
          :min="0"
          :max="100"
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          color="primary"
          :show-value="true"
          helper-text="This slider has custom wrapper styling"
        />
        
        <!-- Extended Slider -->
        <MSlider 
          v-model="values.extended"
          label="Extended Slider"
          :min="0"
          :max="100"
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300 p-2 rounded"
          color="secondary"
          :show-value="true"
          helper-text="This slider has extended classes"
        />
        
        <!-- Both Wrap and Extend -->
        <MSlider 
          v-model="values.both"
          label="Wrapped & Extended Slider"
          :min="0"
          :max="100"
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
          extended-class="border-2 border-green-400 shadow-xl"
          color="success"
          :show-value="true"
          helper-text="Combines both wrap and extend features"
        />
        
        <!-- Semantic Grouping Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Financial Controls</h4>
          <div class="space-y-6">
            <MSlider 
              v-model="values.budget"
              label="Monthly Budget"
              :min="100"
              :max="2000"
              :step="50"
              :wrap="true"
              wrapper-class="p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg"
              color="success"
              :show-value="true"
              :format-value="(value) => '$' + value"
              helper-text="Set your monthly spending limit"
            />
            
            <MSlider 
              v-model="values.risk"
              label="Risk Tolerance"
              :min="1"
              :max="5"
              :step="1"
              :extend="true"
              extended-class="border border-orange-300 bg-orange-50 p-3 rounded-lg"
              color="warning"
              :show-ticks="true"
              :show-tick-labels="true"
              :format-value="(value) => ['Conservative', 'Low', 'Moderate', 'Aggressive', 'High'][value - 1]"
              helper-text="Investment risk preference"
            />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrap and extend functionality for semantic form grouping and custom styling of slider components.'
      }
    }
  }
};

export const MarinerFinanceExample = {
  render: () => ({
    components: { MSlider },
    data() {
      return {
        application: {
          loanAmount: 15000,
          downPayment: 2000,
          creditScore: 650,
          income: 45000,
          debtRatio: 0.3,
          loanTerm: 48
        }
      };
    },
    computed: {
      monthlyPayment() {
        const principal = this.application.loanAmount - this.application.downPayment;
        const rate = this.getInterestRate() / 12;
        const payments = this.application.loanTerm;
        
        if (principal && payments && rate) {
          const payment = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
          return Math.round(payment * 100) / 100;
        }
        return 0;
      },
      
      creditScoreColor() {
        if (this.application.creditScore >= 750) return 'success';
        if (this.application.creditScore >= 650) return 'warning';
        return 'error';
      },
      
      debtRatioColor() {
        if (this.application.debtRatio <= 0.3) return 'success';
        if (this.application.debtRatio <= 0.4) return 'warning';
        return 'error';
      }
    },
    methods: {
      getInterestRate() {
        if (this.application.creditScore >= 750) return 0.08;
        if (this.application.creditScore >= 700) return 0.12;
        if (this.application.creditScore >= 650) return 0.15;
        return 0.18;
      },
      
      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(value);
      },
      
      formatPercent(value) {
        return Math.round(value * 100) + '%';
      }
    },
    template: `
      <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Calculator</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Loan Configuration -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold mb-4">Loan Details</h3>
            
            <MSlider 
              v-model="application.loanAmount"
              label="Loan Amount"
              :min="1000"
              :max="50000"
              :step="500"
              color="primary"
              :show-value="true"
              :format-value="formatCurrency"
              helper-text="Amount you want to borrow"
            />
            
            <MSlider 
              v-model="application.downPayment"
              label="Down Payment"
              :min="0"
              :max="application.loanAmount * 0.5"
              :step="100"
              color="success"
              :show-value="true"
              :format-value="formatCurrency"
              helper-text="Initial payment amount"
            />
            
            <MSlider 
              v-model="application.loanTerm"
              label="Loan Term (months)"
              :min="12"
              :max="84"
              :step="6"
              color="secondary"
              :show-value="true"
              :show-ticks="true"
              helper-text="Repayment period in months"
            />
          </div>
          
          <!-- Financial Profile -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold mb-4">Your Financial Profile</h3>
            
            <MSlider 
              v-model="application.creditScore"
              label="Credit Score"
              :min="300"
              :max="850"
              :step="5"
              :color="creditScoreColor"
              :show-value="true"
              :show-ticks="true"
              helper-text="Your current credit score"
            />
            
            <MSlider 
              v-model="application.income"
              label="Annual Income"
              :min="20000"
              :max="150000"
              :step="1000"
              color="primary"
              :show-value="true"
              :format-value="formatCurrency"
              helper-text="Your yearly gross income"
            />
            
            <MSlider 
              v-model="application.debtRatio"
              label="Debt-to-Income Ratio"
              :min="0"
              :max="0.6"
              :step="0.01"
              :color="debtRatioColor"
              :show-value="true"
              :format-value="formatPercent"
              helper-text="Current debt payments vs income"
            />
          </div>
        </div>
        
        <!-- Loan Summary -->
        <div class="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 class="text-lg font-semibold mb-4">Loan Summary</h3>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(application.loanAmount - application.downPayment) }}</div>
              <div class="text-sm text-gray-600">Loan Principal</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-green-600">{{ formatCurrency(monthlyPayment) }}</div>
              <div class="text-sm text-gray-600">Monthly Payment</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-purple-600">{{ (getInterestRate() * 100).toFixed(1) }}%</div>
              <div class="text-sm text-gray-600">Interest Rate</div>
            </div>
            <div>
              <div class="text-2xl font-bold text-orange-600">{{ formatCurrency(monthlyPayment * application.loanTerm) }}</div>
              <div class="text-sm text-gray-600">Total Cost</div>
            </div>
          </div>
          
          <div class="mt-4 p-3 bg-white rounded text-sm text-gray-700">
            <strong>Note:</strong> These calculations are estimates. Final terms may vary based on credit approval and verification of information.
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive loan calculator demonstrating slider usage in financial services with real-time calculations and conditional styling.'
      }
    }
  }
};