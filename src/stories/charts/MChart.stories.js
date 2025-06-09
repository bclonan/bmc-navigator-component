import { ref, computed } from 'vue';
import MChart from '../../components/charts/MChart.vue';

export default {
  title: 'Data/Visualization/Chart',
  component: MChart,
  parameters: {
    docs: {
      description: {
        component: 'Reusable chart component supporting line, bar, and pie charts with flat configuration structures.'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'pie']
    }
  }
};

const Template = (args) => ({
  components: { MChart },
  setup() {
    return { args };
  },
  template: '<MChart v-bind="args" />'
});

// Financial performance line chart
export const LoanPerformanceTrend = Template.bind({});
LoanPerformanceTrend.args = {
  type: 'line',
  title: 'Loan Performance Trends',
  subtitle: 'Monthly loan application and approval rates',
  width: 600,
  height: 400,
  showGrid: true,
  showPoints: true,
  showLegend: true,
  data: [
    {
      label: 'Applications',
      color: '#3b82f6',
      data: [
        { x: 1, y: 850 },
        { x: 2, y: 920 },
        { x: 3, y: 1050 },
        { x: 4, y: 980 },
        { x: 5, y: 1150 },
        { x: 6, y: 1250 },
        { x: 7, y: 1180 },
        { x: 8, y: 1350 },
        { x: 9, y: 1420 },
        { x: 10, y: 1380 },
        { x: 11, y: 1500 },
        { x: 12, y: 1650 }
      ]
    },
    {
      label: 'Approvals',
      color: '#10b981',
      data: [
        { x: 1, y: 680 },
        { x: 2, y: 740 },
        { x: 3, y: 820 },
        { x: 4, y: 750 },
        { x: 5, y: 890 },
        { x: 6, y: 950 },
        { x: 7, y: 910 },
        { x: 8, y: 1020 },
        { x: 9, y: 1080 },
        { x: 10, y: 1050 },
        { x: 11, y: 1150 },
        { x: 12, y: 1250 }
      ]
    }
  ],
  formatters: {
    x: (value) => `Month ${value}`,
    y: (value) => value.toLocaleString()
  }
};

// Revenue by loan type bar chart
export const RevenueByLoanType = Template.bind({});
RevenueByLoanType.args = {
  type: 'bar',
  title: 'Revenue by Loan Type',
  subtitle: 'Q4 2024 revenue breakdown',
  width: 500,
  height: 350,
  data: [
    { x: 'Personal', y: 2850000, color: '#3b82f6' },
    { x: 'Auto', y: 1950000, color: '#10b981' },
    { x: 'Mortgage', y: 4200000, color: '#f59e0b' },
    { x: 'Business', y: 1650000, color: '#8b5cf6' },
    { x: 'Student', y: 890000, color: '#ef4444' }
  ],
  formatters: {
    y: (value) => `$${(value / 1000000).toFixed(1)}M`
  }
};

// Credit score distribution pie chart
export const CreditScoreDistribution = Template.bind({});
CreditScoreDistribution.args = {
  type: 'pie',
  title: 'Credit Score Distribution',
  subtitle: 'Customer credit score ranges',
  width: 500,
  height: 400,
  showLegend: true,
  data: [
    { x: 'Excellent (750+)', y: 2850, color: '#10b981' },
    { x: 'Good (650-749)', y: 4200, color: '#3b82f6' },
    { x: 'Fair (500-649)', y: 1950, color: '#f59e0b' },
    { x: 'Poor (<500)', y: 650, color: '#ef4444' }
  ]
};

// Interactive loan calculator chart
const InteractiveLoanChart = () => ({
  components: { MChart },
  setup() {
    const loanAmount = ref(25000);
    const interestRate = ref(8.5);
    const term = ref(60);
    
    const paymentData = computed(() => {
      const monthlyRate = interestRate.value / 100 / 12;
      const months = term.value;
      
      const monthlyPayment = loanAmount.value * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      
      let balance = loanAmount.value;
      const data = [];
      
      for (let month = 0; month <= months; month += 6) {
        data.push({ x: month, y: balance });
        
        for (let i = 0; i < 6 && month + i < months; i++) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = monthlyPayment - interestPayment;
          balance -= principalPayment;
        }
        
        if (balance < 0) balance = 0;
      }
      
      return data;
    });
    
    const paymentBreakdown = computed(() => {
      const monthlyRate = interestRate.value / 100 / 12;
      const months = term.value;
      const monthlyPayment = loanAmount.value * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayments = monthlyPayment * months;
      const totalInterest = totalPayments - loanAmount.value;
      
      return [
        { x: 'Principal', y: loanAmount.value, color: '#3b82f6' },
        { x: 'Interest', y: totalInterest, color: '#ef4444' }
      ];
    });
    
    return {
      loanAmount,
      interestRate,
      term,
      paymentData,
      paymentBreakdown
    };
  },
  template: `
    <div class="space-y-8 p-6">
      <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Calculator</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
          <input
            v-model.number="loanAmount"
            type="range"
            min="5000"
            max="100000"
            step="1000"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">\${{ loanAmount.toLocaleString() }}</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
          <input
            v-model.number="interestRate"
            type="range"
            min="3"
            max="25"
            step="0.1"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ interestRate }}%</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Term (months)</label>
          <input
            v-model.number="term"
            type="range"
            min="12"
            max="84"
            step="6"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ term }} months</div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="line"
          title="Loan Balance Over Time"
          :data="paymentData"
          :width="400"
          :height="300"
          :show-grid="true"
          :show-points="false"
          :formatters="{
            x: (value) => \`Month \${value}\`,
            y: (value) => \`$\${value.toLocaleString()}\`
          }"
        />
        
        <MChart
          type="pie"
          title="Payment Breakdown"
          :data="paymentBreakdown"
          :width="400"
          :height="300"
          :show-legend="true"
        />
      </div>
    </div>
  `
});

export const InteractiveLoanCalculator = InteractiveLoanChart.bind({});

// Financial dashboard with multiple charts
const FinancialDashboardTemplate = () => ({
  components: { MChart },
  setup() {
    const monthlyMetrics = [
      { x: 'Jan', y: 1250000 },
      { x: 'Feb', y: 1350000 },
      { x: 'Mar', y: 1450000 },
      { x: 'Apr', y: 1380000 },
      { x: 'May', y: 1550000 },
      { x: 'Jun', y: 1650000 }
    ];
    
    const approvalRates = [
      {
        label: 'Approved',
        color: '#10b981',
        data: [
          { x: 1, y: 78 },
          { x: 2, y: 82 },
          { x: 3, y: 79 },
          { x: 4, y: 85 },
          { x: 5, y: 88 },
          { x: 6, y: 86 }
        ]
      },
      {
        label: 'Pending',
        color: '#f59e0b',
        data: [
          { x: 1, y: 15 },
          { x: 2, y: 12 },
          { x: 3, y: 14 },
          { x: 4, y: 10 },
          { x: 5, y: 8 },
          { x: 6, y: 9 }
        ]
      },
      {
        label: 'Rejected',
        color: '#ef4444',
        data: [
          { x: 1, y: 7 },
          { x: 2, y: 6 },
          { x: 3, y: 7 },
          { x: 4, y: 5 },
          { x: 5, y: 4 },
          { x: 6, y: 5 }
        ]
      }
    ];
    
    const portfolioDistribution = [
      { x: 'Personal Loans', y: 45, color: '#3b82f6' },
      { x: 'Auto Loans', y: 25, color: '#10b981' },
      { x: 'Mortgages', y: 20, color: '#f59e0b' },
      { x: 'Business Loans', y: 10, color: '#8b5cf6' }
    ];
    
    return {
      monthlyMetrics,
      approvalRates,
      portfolioDistribution
    };
  },
  template: `
    <div class="space-y-8 p-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
        <p class="text-gray-600">Comprehensive view of loan portfolio performance</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="bar"
          title="Monthly Revenue"
          subtitle="Last 6 months performance"
          :data="monthlyMetrics"
          :width="500"
          :height="300"
          :formatters="{
            y: (value) => \`$\${(value / 1000000).toFixed(1)}M\`
          }"
        />
        
        <MChart
          type="pie"
          title="Portfolio Distribution"
          subtitle="Loan types by volume"
          :data="portfolioDistribution"
          :width="500"
          :height="300"
          :show-legend="true"
        />
      </div>
      
      <MChart
        type="line"
        title="Approval Rates by Month"
        subtitle="Application processing outcomes"
        :data="approvalRates"
        :width="1000"
        :height="400"
        :show-grid="true"
        :show-points="true"
        :show-legend="true"
        :formatters="{
          x: (value) => \`Month \${value}\`,
          y: (value) => \`\${value}%\`
        }"
      />
    </div>
  `
});

export const FinancialDashboard = FinancialDashboardTemplate.bind({});
FinancialDashboard.parameters = {
  layout: 'fullscreen'
};

// Mobile responsive charts
const MobileCharts = () => ({
  components: { MChart },
  setup() {
    const mobileData = [
      { x: 'Q1', y: 85000 },
      { x: 'Q2', y: 92000 },
      { x: 'Q3', y: 78000 },
      { x: 'Q4', y: 95000 }
    ];
    
    return { mobileData };
  },
  template: `
    <div class="max-w-md mx-auto p-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-900">Mobile Dashboard</h2>
      
      <MChart
        type="bar"
        title="Quarterly Performance"
        :data="mobileData"
        :width="350"
        :height="250"
        :responsive="true"
        :formatters="{
          y: (value) => \`$\${(value / 1000).toFixed(0)}K\`
        }"
      />
    </div>
  `
});

export const MobileResponsive = MobileCharts.bind({});
MobileResponsive.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};