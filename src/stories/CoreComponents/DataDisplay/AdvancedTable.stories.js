import { ref, computed } from 'vue';
import MTable from '../../../components/tables/MTable.vue';
import MButton from '../../../components/mui/MButton.vue';
import MInput from '../../../components/mui/MInput.vue';
import MTypography from '../../../components/mui/MTypography.vue';
import MAlert from '../../../components/mui/MAlert.vue';

export default {
  title: 'Core Components/Data Display/Advanced Table',
  component: MTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced data table with column spanning, grouped headers, multi-level filtering, financial summaries, and responsive design for Mariner Finance applications.',
      },
    },
  },
  argTypes: {
    enableColumnSpanning: {
      control: { type: 'boolean' },
      description: 'Enable column spanning for grouped data',
      defaultValue: true,
    },
    enableAdvancedFiltering: {
      control: { type: 'boolean' },
      description: 'Enable multi-condition filtering',
      defaultValue: true,
    },
    showFinancialSummary: {
      control: { type: 'boolean' },
      description: 'Show financial summary footer',
      defaultValue: true,
    },
  },
};

// Portfolio Analysis with Column Spanning
export const PortfolioAnalysis = (args) => ({
  components: { MTable, MButton, MTypography },
  setup() {
    const portfolioData = [
      {
        id: 'PORT-001',
        customerName: 'Alice Johnson',
        customerType: 'Premium',
        creditScore: 780,
        personalLoanCount: 1,
        personalLoanBalance: 25000,
        autoLoanCount: 1,
        autoLoanBalance: 32000,
        mortgageCount: 1,
        mortgageBalance: 185000,
        totalBalance: 242000,
        monthlyPayment: 2985,
        debtToIncome: 23.9,
        accountStatus: 'Current',
        riskLevel: 'Low'
      },
      {
        id: 'PORT-002',
        customerName: 'Robert Chen',
        customerType: 'Standard',
        creditScore: 720,
        personalLoanCount: 1,
        personalLoanBalance: 15000,
        autoLoanCount: 1,
        autoLoanBalance: 28000,
        mortgageCount: 0,
        mortgageBalance: 0,
        totalBalance: 43000,
        monthlyPayment: 945,
        debtToIncome: 12.1,
        accountStatus: 'Current',
        riskLevel: 'Low'
      },
      {
        id: 'PORT-003',
        customerName: 'Maria Rodriguez',
        customerType: 'Standard',
        creditScore: 680,
        personalLoanCount: 1,
        personalLoanBalance: 12000,
        autoLoanCount: 0,
        autoLoanBalance: 0,
        mortgageCount: 0,
        mortgageBalance: 0,
        totalBalance: 12000,
        monthlyPayment: 385,
        debtToIncome: 7.4,
        accountStatus: 'Current',
        riskLevel: 'Medium'
      },
      {
        id: 'PORT-004',
        customerName: 'David Thompson',
        customerType: 'Premium',
        creditScore: 650,
        personalLoanCount: 2,
        personalLoanBalance: 35000,
        autoLoanCount: 2,
        autoLoanBalance: 55000,
        mortgageCount: 0,
        mortgageBalance: 0,
        totalBalance: 90000,
        monthlyPayment: 2150,
        debtToIncome: 22.6,
        accountStatus: 'Late',
        riskLevel: 'Medium'
      }
    ];

    const portfolioColumns = [
      // Customer Information Group
      {
        key: 'customer-info',
        label: 'Customer Information',
        isGroup: true,
        children: [
          { 
            key: 'customerName', 
            label: 'Customer Name', 
            sortable: true,
            width: '180px'
          },
          { 
            key: 'customerType', 
            label: 'Type', 
            sortable: true,
            width: '100px',
            render: (value) => {
              const colors = {
                'Premium': 'bg-blue-100 text-blue-800',
                'Standard': 'bg-gray-100 text-gray-800',
                'VIP': 'bg-purple-100 text-purple-800'
              };
              return '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + colors[value] + '">' + value + '</span>';
            }
          },
          { 
            key: 'creditScore', 
            label: 'Credit Score', 
            sortable: true,
            width: '100px',
            render: (value) => {
              const color = value >= 750 ? 'text-green-600' : value >= 650 ? 'text-blue-600' : 'text-red-600';
              return '<span class="' + color + ' font-bold">' + value + '</span>';
            }
          }
        ]
      },
      // Loan Portfolio Group
      {
        key: 'loan-portfolio',
        label: 'Loan Portfolio Breakdown',
        isGroup: true,
        children: [
          { 
            key: 'personalLoanBalance', 
            label: 'Personal Loans', 
            sortable: true,
            width: '120px',
            align: 'right',
            render: (value, row) => {
              if (row.personalLoanCount > 0) {
                return row.personalLoanCount + ' loan(s)<br/>$' + value.toLocaleString();
              }
              return '<span class="text-gray-400">None</span>';
            }
          },
          { 
            key: 'autoLoanBalance', 
            label: 'Auto Loans', 
            sortable: true,
            width: '120px',
            align: 'right',
            render: (value, row) => {
              if (row.autoLoanCount > 0) {
                return row.autoLoanCount + ' loan(s)<br/>$' + value.toLocaleString();
              }
              return '<span class="text-gray-400">None</span>';
            }
          },
          { 
            key: 'mortgageBalance', 
            label: 'Mortgages', 
            sortable: true,
            width: '120px',
            align: 'right',
            render: (value, row) => {
              if (row.mortgageCount > 0) {
                return row.mortgageCount + ' loan(s)<br/>$' + value.toLocaleString();
              }
              return '<span class="text-gray-400">None</span>';
            }
          }
        ]
      },
      // Financial Summary Group
      {
        key: 'financial-summary',
        label: 'Financial Summary',
        isGroup: true,
        children: [
          { 
            key: 'totalBalance', 
            label: 'Total Balance', 
            sortable: true,
            width: '130px',
            align: 'right',
            render: (value) => '<span class="font-bold text-lg">$' + value.toLocaleString() + '</span>'
          },
          { 
            key: 'monthlyPayment', 
            label: 'Monthly Payment', 
            sortable: true,
            width: '130px',
            align: 'right',
            render: (value) => '<span class="font-semibold text-blue-600">$' + value.toLocaleString() + '</span>'
          },
          { 
            key: 'debtToIncome', 
            label: 'DTI Ratio', 
            sortable: true,
            width: '100px',
            align: 'center',
            render: (value) => {
              const color = value <= 20 ? 'text-green-600' : value <= 30 ? 'text-yellow-600' : 'text-red-600';
              return '<span class="' + color + ' font-bold">' + value + '%</span>';
            }
          }
        ]
      },
      // Risk & Status Group
      {
        key: 'risk-status',
        label: 'Risk & Status',
        isGroup: true,
        children: [
          { 
            key: 'riskLevel', 
            label: 'Risk Level', 
            sortable: true,
            width: '100px',
            render: (value) => {
              const colors = {
                'Low': 'bg-green-100 text-green-800',
                'Medium': 'bg-yellow-100 text-yellow-800',
                'High': 'bg-red-100 text-red-800'
              };
              return '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + colors[value] + '">' + value + '</span>';
            }
          },
          { 
            key: 'accountStatus', 
            label: 'Account Status', 
            sortable: true,
            width: '120px',
            render: (value) => {
              const colors = {
                'Current': 'bg-green-100 text-green-800',
                'Late': 'bg-red-100 text-red-800',
                'Delinquent': 'bg-red-200 text-red-900'
              };
              return '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + colors[value] + '">' + value + '</span>';
            }
          }
        ]
      }
    ];

    const selectedRows = ref([]);
    
    const handleRowClick = ({ row }) => {
      console.log('Portfolio row clicked:', row);
    };
    
    const handleActionClick = ({ action, row }) => {
      console.log('Action ' + action + ' clicked for portfolio:', row);
    };
    
    const handleSelectionChange = (rows) => {
      selectedRows.value = rows;
    };

    // Calculate portfolio summary
    const portfolioSummary = computed(() => {
      return portfolioData.reduce((acc, row) => {
        acc.totalCustomers += 1;
        acc.totalLoans += (row.personalLoanCount + row.autoLoanCount + row.mortgageCount);
        acc.totalBalance += row.totalBalance;
        acc.totalPayments += row.monthlyPayment;
        acc.avgCreditScore += row.creditScore;
        return acc;
      }, {
        totalCustomers: 0,
        totalLoans: 0,
        totalBalance: 0,
        totalPayments: 0,
        avgCreditScore: 0
      });
    });

    const finalSummary = computed(() => ({
      ...portfolioSummary.value,
      avgCreditScore: Math.round(portfolioSummary.value.avgCreditScore / portfolioData.length)
    }));
    
    return {
      args,
      portfolioData,
      portfolioColumns,
      selectedRows,
      finalSummary,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: `
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Portfolio Analysis Dashboard
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Comprehensive customer loan portfolio with grouped headers and financial metrics
        </MTypography>
      </div>

      <MTable
        title="Customer Portfolio Analysis"
        subtitle="Detailed loan portfolio breakdown by customer with risk assessment"
        :data="portfolioData"
        :columns="portfolioColumns"
        :selectable="true"
        :show-search="true"
        :show-filters="true"
        :show-pagination="false"
        :show-actions="true"
        :show-export="true"
        :row-clickable="true"
        :grouped-headers="args.enableColumnSpanning"
        :actions="[
          { key: 'details', label: 'View Details', variant: 'primary' },
          { key: 'contact', label: 'Contact Customer', variant: 'secondary' },
          { key: 'restructure', label: 'Restructure Loans', variant: 'warning' },
          { key: 'statements', label: 'Generate Statement', variant: 'info' }
        ]"
        :filter-options="[
          {
            key: 'customerType',
            label: 'Customer Type',
            options: [
              { value: 'Premium', label: 'Premium Customers' },
              { value: 'Standard', label: 'Standard Customers' },
              { value: 'VIP', label: 'VIP Customers' }
            ]
          },
          {
            key: 'accountStatus',
            label: 'Account Status',
            options: [
              { value: 'Current', label: 'Current' },
              { value: 'Late', label: 'Late Payments' },
              { value: 'Delinquent', label: 'Delinquent' }
            ]
          },
          {
            key: 'riskLevel',
            label: 'Risk Level',
            options: [
              { value: 'Low', label: 'Low Risk' },
              { value: 'Medium', label: 'Medium Risk' },
              { value: 'High', label: 'High Risk' }
            ]
          }
        ]"
        @row-click="handleRowClick"
        @action-click="handleActionClick"
        @selection-change="handleSelectionChange"
      />

      <div v-if="args.showFinancialSummary" class="bg-gray-50 rounded-lg p-6 border">
        <MTypography variant="h6" class="text-lg font-semibold mb-4 text-gray-800">
          Portfolio Summary
        </MTypography>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">{{ finalSummary.totalCustomers }}</div>
            <div class="text-sm text-gray-600">Total Customers</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">{{ finalSummary.totalLoans }}</div>
            <div class="text-sm text-gray-600">Active Loans</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">\${{ finalSummary.totalBalance.toLocaleString() }}</div>
            <div class="text-sm text-gray-600">Total Balance</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-orange-600">\${{ finalSummary.totalPayments.toLocaleString() }}</div>
            <div class="text-sm text-gray-600">Monthly Payments</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-indigo-600">{{ finalSummary.avgCreditScore }}</div>
            <div class="text-sm text-gray-600">Avg Credit Score</div>
          </div>
        </div>
      </div>
    </div>
  `
});

PortfolioAnalysis.args = {
  enableColumnSpanning: true,
  enableAdvancedFiltering: true,
  showFinancialSummary: true,
};

// Advanced Filtering Table
export const AdvancedFiltering = () => ({
  components: { MTable, MButton, MInput, MTypography, MAlert },
  setup() {
    const transactionData = ref([
      {
        id: 'TXN-001',
        date: '2024-02-28',
        customerName: 'Alice Johnson',
        transactionType: 'Payment',
        loanType: 'Personal',
        amount: 650.00,
        principal: 425.50,
        interest: 189.25,
        fees: 35.25,
        remainingBalance: 24350.00,
        paymentMethod: 'ACH',
        status: 'Completed'
      },
      {
        id: 'TXN-002',
        date: '2024-02-27',
        customerName: 'Robert Chen',
        transactionType: 'Disbursement',
        loanType: 'Personal',
        amount: 15000.00,
        principal: 15000.00,
        interest: 0.00,
        fees: 150.00,
        remainingBalance: 15000.00,
        paymentMethod: 'Wire Transfer',
        status: 'Completed'
      },
      {
        id: 'TXN-003',
        date: '2024-02-26',
        customerName: 'Maria Rodriguez',
        transactionType: 'Payment',
        loanType: 'Personal',
        amount: 385.00,
        principal: 265.80,
        interest: 119.20,
        fees: 0.00,
        remainingBalance: 11735.20,
        paymentMethod: 'ACH',
        status: 'Failed'
      },
      {
        id: 'TXN-004',
        date: '2024-02-25',
        customerName: 'David Thompson',
        transactionType: 'Late Fee',
        loanType: 'Auto',
        amount: 35.00,
        principal: 0.00,
        interest: 0.00,
        fees: 35.00,
        remainingBalance: 54035.00,
        paymentMethod: 'System',
        status: 'Applied'
      }
    ]);

    const advancedColumns = [
      {
        key: 'transaction-details',
        label: 'Transaction Information',
        isGroup: true,
        children: [
          { key: 'id', label: 'Transaction ID', sortable: true, width: '120px' },
          { key: 'date', label: 'Date', type: 'date', sortable: true, width: '100px' },
          { 
            key: 'transactionType', 
            label: 'Type', 
            sortable: true, 
            width: '120px',
            render: (value) => {
              const colors = {
                'Payment': 'bg-green-100 text-green-800',
                'Disbursement': 'bg-blue-100 text-blue-800',
                'Late Fee': 'bg-red-100 text-red-800',
                'Adjustment': 'bg-yellow-100 text-yellow-800'
              };
              return '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + colors[value] + '">' + value + '</span>';
            }
          },
          { 
            key: 'status', 
            label: 'Status', 
            sortable: true, 
            width: '100px',
            render: (value) => {
              const colors = {
                'Completed': 'bg-green-100 text-green-800',
                'Failed': 'bg-red-100 text-red-800',
                'Pending': 'bg-yellow-100 text-yellow-800',
                'Applied': 'bg-blue-100 text-blue-800'
              };
              return '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + colors[value] + '">' + value + '</span>';
            }
          }
        ]
      },
      {
        key: 'customer-loan',
        label: 'Customer & Loan',
        isGroup: true,
        children: [
          { key: 'customerName', label: 'Customer', sortable: true, width: '150px' },
          { key: 'loanType', label: 'Loan Type', sortable: true, width: '100px' },
          { key: 'paymentMethod', label: 'Payment Method', sortable: true, width: '120px' }
        ]
      },
      {
        key: 'financial-breakdown',
        label: 'Financial Breakdown',
        isGroup: true,
        children: [
          { 
            key: 'amount', 
            label: 'Total Amount', 
            type: 'currency', 
            sortable: true, 
            width: '110px', 
            align: 'right',
            render: (value) => '<span class="font-bold">$' + value.toFixed(2) + '</span>'
          },
          { 
            key: 'principal', 
            label: 'Principal', 
            type: 'currency', 
            sortable: true, 
            width: '100px', 
            align: 'right',
            render: (value) => '<span class="text-blue-600">$' + value.toFixed(2) + '</span>'
          },
          { 
            key: 'interest', 
            label: 'Interest', 
            type: 'currency', 
            sortable: true, 
            width: '100px', 
            align: 'right',
            render: (value) => '<span class="text-green-600">$' + value.toFixed(2) + '</span>'
          },
          { 
            key: 'fees', 
            label: 'Fees', 
            type: 'currency', 
            sortable: true, 
            width: '80px', 
            align: 'right',
            render: (value) => value > 0 ? '<span class="text-red-600">$' + value.toFixed(2) + '</span>' : '<span class="text-gray-400">$0.00</span>'
          },
          { 
            key: 'remainingBalance', 
            label: 'Remaining Balance', 
            type: 'currency', 
            sortable: true, 
            width: '130px', 
            align: 'right',
            render: (value) => '<span class="font-semibold text-purple-600">$' + value.toLocaleString() + '</span>'
          }
        ]
      }
    ];

    const filterCriteria = ref({
      dateRange: { start: '', end: '' },
      amountRange: { min: '', max: '' },
      transactionTypes: [],
      statuses: []
    });

    const filteredData = computed(() => {
      let filtered = [...transactionData.value];

      // Date range filter
      if (filterCriteria.value.dateRange.start) {
        filtered = filtered.filter(item => item.date >= filterCriteria.value.dateRange.start);
      }
      if (filterCriteria.value.dateRange.end) {
        filtered = filtered.filter(item => item.date <= filterCriteria.value.dateRange.end);
      }

      // Amount range filter
      if (filterCriteria.value.amountRange.min) {
        filtered = filtered.filter(item => item.amount >= parseFloat(filterCriteria.value.amountRange.min));
      }
      if (filterCriteria.value.amountRange.max) {
        filtered = filtered.filter(item => item.amount <= parseFloat(filterCriteria.value.amountRange.max));
      }

      return filtered;
    });

    const clearFilters = () => {
      filterCriteria.value = {
        dateRange: { start: '', end: '' },
        amountRange: { min: '', max: '' },
        transactionTypes: [],
        statuses: []
      };
    };

    return {
      transactionData,
      advancedColumns,
      filterCriteria,
      filteredData,
      clearFilters
    };
  },
  template: `
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Advanced Transaction Filtering
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Multi-condition filtering with date ranges, amount ranges, and financial breakdowns
        </MTypography>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border">
        <MTypography variant="h6" class="text-lg font-semibold mb-4">
          Advanced Filters
        </MTypography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.start"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.end"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
            <MInput 
              type="number" 
              placeholder="0.00"
              v-model="filterCriteria.amountRange.min"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
            <MInput 
              type="number" 
              placeholder="999999.99"
              v-model="filterCriteria.amountRange.max"
              fullWidth
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-4 items-center">
          <MButton 
            text="Clear All Filters"
            variant="outlined"
            color="secondary"
            size="small"
            @click="clearFilters"
          />
          <div class="text-sm text-gray-600">
            Showing {{ filteredData.length }} of {{ transactionData.length }} transactions
          </div>
        </div>
      </div>

      <MTable
        title="Transaction History"
        subtitle="Detailed transaction breakdown with advanced filtering capabilities"
        :data="filteredData"
        :columns="advancedColumns"
        :selectable="true"
        :show-search="true"
        :show-filters="false"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="6"
        :grouped-headers="true"
        :actions="[
          { key: 'details', label: 'View Details', variant: 'primary' },
          { key: 'receipt', label: 'Download Receipt', variant: 'secondary' },
          { key: 'dispute', label: 'Dispute Transaction', variant: 'warning' }
        ]"
      />
    </div>
  `
});

// Responsive Column Management
export const ResponsiveColumns = () => ({
  components: { MTable, MButton, MTypography },
  setup() {
    const screenSize = ref('desktop');
    
    const loanData = [
      {
        id: 'LOAN-001',
        customerName: 'Alice Johnson',
        loanType: 'Personal',
        amount: 25000,
        rate: 8.99,
        term: 60,
        monthlyPayment: 515.25,
        balance: 22500,
        status: 'Current',
        nextPayment: '2024-03-15',
        creditScore: 750
      },
      {
        id: 'LOAN-002',
        customerName: 'Robert Chen',
        loanType: 'Auto',
        amount: 32000,
        rate: 6.45,
        term: 72,
        monthlyPayment: 485.75,
        balance: 28900,
        status: 'Current',
        nextPayment: '2024-03-20',
        creditScore: 720
      },
      {
        id: 'LOAN-003',
        customerName: 'Maria Rodriguez',
        loanType: 'Personal',
        amount: 12000,
        rate: 12.99,
        term: 36,
        monthlyPayment: 385.50,
        balance: 8500,
        status: 'Late',
        nextPayment: '2024-03-10',
        creditScore: 680
      }
    ];

    const getColumnsForScreen = (size) => {
      const baseColumns = [
        { key: 'customerName', label: 'Customer', sortable: true, essential: true },
        { key: 'loanType', label: 'Type', sortable: true, essential: true },
        { key: 'amount', label: 'Amount', type: 'currency', sortable: true, essential: true, align: 'right' },
        { key: 'status', label: 'Status', type: 'status', sortable: true, essential: true }
      ];

      const tabletColumns = [
        ...baseColumns,
        { key: 'monthlyPayment', label: 'Payment', type: 'currency', sortable: true, align: 'right' },
        { key: 'nextPayment', label: 'Next Payment', type: 'date', sortable: true }
      ];

      const desktopColumns = [
        ...tabletColumns,
        { key: 'rate', label: 'Rate', sortable: true, render: (value) => value + '%' },
        { key: 'term', label: 'Term', sortable: true, render: (value) => value + ' mo' },
        { key: 'balance', label: 'Balance', type: 'currency', sortable: true, align: 'right' },
        { key: 'creditScore', label: 'Credit', sortable: true }
      ];

      switch (size) {
        case 'mobile': return baseColumns;
        case 'tablet': return tabletColumns;
        case 'desktop': return desktopColumns;
        default: return desktopColumns;
      }
    };

    const currentColumns = computed(() => getColumnsForScreen(screenSize.value));

    const setScreenSize = (size) => {
      screenSize.value = size;
    };

    return {
      loanData,
      currentColumns,
      screenSize,
      setScreenSize
    };
  },
  template: `
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Responsive Column Management
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Adaptive column display optimized for different screen sizes and user contexts
        </MTypography>
      </div>

      <div class="flex justify-center space-x-4 mb-6">
        <MButton 
          :text="'Mobile' + (screenSize === 'mobile' ? ' ✓' : '')"
          :variant="screenSize === 'mobile' ? 'filled' : 'outlined'"
          color="primary"
          size="small"
          @click="setScreenSize('mobile')"
          :class="screenSize === 'mobile' ? 'mf-button-primary' : ''"
        />
        <MButton 
          :text="'Tablet' + (screenSize === 'tablet' ? ' ✓' : '')"
          :variant="screenSize === 'tablet' ? 'filled' : 'outlined'"
          color="primary"
          size="small"
          @click="setScreenSize('tablet')"
          :class="screenSize === 'tablet' ? 'mf-button-primary' : ''"
        />
        <MButton 
          :text="'Desktop' + (screenSize === 'desktop' ? ' ✓' : '')"
          :variant="screenSize === 'desktop' ? 'filled' : 'outlined'"
          color="primary"
          size="small"
          @click="setScreenSize('desktop')"
          :class="screenSize === 'desktop' ? 'mf-button-primary' : ''"
        />
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p class="text-blue-800">
          <strong>Current View:</strong> {{ screenSize.charAt(0).toUpperCase() + screenSize.slice(1) }} 
          ({{ currentColumns.length }} columns)
        </p>
        <p class="text-blue-700 text-sm mt-1">
          Columns automatically adjust based on screen size to maintain optimal readability
        </p>
      </div>

      <MTable
        :title="'Loan Portfolio - ' + screenSize.charAt(0).toUpperCase() + screenSize.slice(1) + ' View'"
        subtitle="Responsive table demonstrating adaptive column management"
        :data="loanData"
        :columns="currentColumns"
        :selectable="true"
        :show-search="true"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="screenSize === 'desktop'"
        :show-export="true"
        :actions="[
          { key: 'view', label: 'View', variant: 'primary' },
          { key: 'edit', label: 'Edit', variant: 'secondary' }
        ]"
      />
    </div>
  `
});