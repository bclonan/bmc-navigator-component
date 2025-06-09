import { ref, reactive } from 'vue';
import MTable from '../../components/tables/MTable.vue';

export default {
  title: 'Data/Tables/Table',
  component: MTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive data table with sorting, filtering, pagination, and selection using flat configuration structures.'
      }
    }
  }
};

// Loan applications table
const loanApplicationsData = [
  {
    id: 'APP-001',
    applicantName: 'John Smith',
    email: 'john.smith@email.com',
    loanAmount: 25000,
    loanType: 'Personal',
    creditScore: 750,
    status: 'approved',
    applicationDate: '2024-01-15',
    monthlyIncome: 6500,
    debtToIncome: 28,
    approved: true
  },
  {
    id: 'APP-002',
    applicantName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    loanAmount: 15000,
    loanType: 'Auto',
    creditScore: 680,
    status: 'pending',
    applicationDate: '2024-01-18',
    monthlyIncome: 4800,
    debtToIncome: 32,
    approved: false
  },
  {
    id: 'APP-003',
    applicantName: 'Michael Brown',
    email: 'michael.brown@email.com',
    loanAmount: 50000,
    loanType: 'Mortgage',
    creditScore: 720,
    status: 'approved',
    applicationDate: '2024-01-20',
    monthlyIncome: 8200,
    debtToIncome: 25,
    approved: true
  },
  {
    id: 'APP-004',
    applicantName: 'Emily Davis',
    email: 'emily.davis@email.com',
    loanAmount: 12000,
    loanType: 'Personal',
    creditScore: 620,
    status: 'rejected',
    applicationDate: '2024-01-22',
    monthlyIncome: 3500,
    debtToIncome: 45,
    approved: false
  },
  {
    id: 'APP-005',
    applicantName: 'David Wilson',
    email: 'david.wilson@email.com',
    loanAmount: 35000,
    loanType: 'Business',
    creditScore: 780,
    status: 'approved',
    applicationDate: '2024-01-25',
    monthlyIncome: 9500,
    debtToIncome: 22,
    approved: true
  },
  {
    id: 'APP-006',
    applicantName: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    loanAmount: 8000,
    loanType: 'Student',
    creditScore: 590,
    status: 'pending',
    applicationDate: '2024-01-28',
    monthlyIncome: 2800,
    debtToIncome: 38,
    approved: false
  },
  {
    id: 'APP-007',
    applicantName: 'Robert Taylor',
    email: 'robert.taylor@email.com',
    loanAmount: 40000,
    loanType: 'Auto',
    creditScore: 710,
    status: 'approved',
    applicationDate: '2024-01-30',
    monthlyIncome: 7200,
    debtToIncome: 30,
    approved: true
  },
  {
    id: 'APP-008',
    applicantName: 'Jennifer Martinez',
    email: 'jennifer.m@email.com',
    loanAmount: 18000,
    loanType: 'Personal',
    creditScore: 650,
    status: 'pending',
    applicationDate: '2024-02-02',
    monthlyIncome: 5200,
    debtToIncome: 35,
    approved: false
  }
];

const loanApplicationColumns = [
  {
    key: 'applicantName',
    label: 'Applicant',
    sortable: true
  },
  {
    key: 'loanAmount',
    label: 'Loan Amount',
    type: 'currency',
    sortable: true,
    align: 'right'
  },
  {
    key: 'loanType',
    label: 'Type',
    sortable: true
  },
  {
    key: 'creditScore',
    label: 'Credit Score',
    type: 'number',
    sortable: true,
    render: (value) => {
      const color = value >= 750 ? 'text-green-600' : value >= 650 ? 'text-blue-600' : value >= 500 ? 'text-yellow-600' : 'text-red-600';
      return `<span class="${color} font-medium">${value}</span>`;
    }
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    sortable: true
  },
  {
    key: 'applicationDate',
    label: 'Applied',
    type: 'date',
    sortable: true
  },
  {
    key: 'debtToIncome',
    label: 'DTI',
    sortable: true,
    render: (value) => `${value}%`
  }
];

const Template = (args) => ({
  components: { MTable },
  setup() {
    const selectedRows = ref([]);
    
    const handleRowClick = ({ row }) => {
      console.log('Row clicked:', row);
    };
    
    const handleActionClick = ({ action, row }) => {
      console.log(`Action ${action} clicked for:`, row);
    };
    
    const handleSelectionChange = (rows) => {
      selectedRows.value = rows;
      console.log('Selection changed:', rows);
    };
    
    return {
      args,
      selectedRows,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: `
    <MTable
      v-bind="args"
      @row-click="handleRowClick"
      @action-click="handleActionClick"
      @selection-change="handleSelectionChange"
    />
  `
});

export const LoanApplications = Template.bind({});
LoanApplications.args = {
  title: 'Loan Applications',
  subtitle: 'Manage and review loan applications',
  data: loanApplicationsData,
  columns: loanApplicationColumns,
  selectable: true,
  showSearch: true,
  showFilters: true,
  showPagination: true,
  showActions: true,
  showExport: true,
  pageSize: 5,
  rowClickable: true,
  actions: [
    { key: 'view', label: 'View', variant: 'primary' },
    { key: 'approve', label: 'Approve', variant: 'success' },
    { key: 'reject', label: 'Reject', variant: 'danger' }
  ],
  filterOptions: [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'approved', label: 'Approved' },
        { value: 'pending', label: 'Pending' },
        { value: 'rejected', label: 'Rejected' }
      ]
    },
    {
      key: 'loanType',
      label: 'Filter by Type',
      options: [
        { value: 'Personal', label: 'Personal' },
        { value: 'Auto', label: 'Auto' },
        { value: 'Mortgage', label: 'Mortgage' },
        { value: 'Business', label: 'Business' },
        { value: 'Student', label: 'Student' }
      ]
    }
  ]
};

// Customer portfolio table
const customerPortfolioData = [
  {
    id: 'CUST-001',
    customerName: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    totalLoans: 2,
    outstandingBalance: 45000,
    monthlyPayment: 1250,
    creditScore: 780,
    riskLevel: 'Low',
    lastPayment: '2024-01-28',
    status: 'active',
    joinDate: '2022-03-15'
  },
  {
    id: 'CUST-002',
    customerName: 'Bob Chen',
    email: 'bob.chen@email.com',
    totalLoans: 1,
    outstandingBalance: 18500,
    monthlyPayment: 485,
    creditScore: 720,
    riskLevel: 'Low',
    lastPayment: '2024-01-30',
    status: 'active',
    joinDate: '2023-01-20'
  },
  {
    id: 'CUST-003',
    customerName: 'Carol Davis',
    email: 'carol.davis@email.com',
    totalLoans: 3,
    outstandingBalance: 72000,
    monthlyPayment: 2100,
    creditScore: 650,
    riskLevel: 'Medium',
    lastPayment: '2024-01-25',
    status: 'active',
    joinDate: '2021-11-08'
  },
  {
    id: 'CUST-004',
    customerName: 'Daniel Rodriguez',
    email: 'daniel.r@email.com',
    totalLoans: 1,
    outstandingBalance: 8900,
    monthlyPayment: 320,
    creditScore: 580,
    riskLevel: 'High',
    lastPayment: '2024-01-15',
    status: 'delinquent',
    joinDate: '2023-08-12'
  }
];

const customerPortfolioColumns = [
  {
    key: 'customerName',
    label: 'Customer',
    sortable: true
  },
  {
    key: 'totalLoans',
    label: 'Loans',
    type: 'number',
    sortable: true,
    align: 'center'
  },
  {
    key: 'outstandingBalance',
    label: 'Outstanding',
    type: 'currency',
    sortable: true,
    align: 'right'
  },
  {
    key: 'monthlyPayment',
    label: 'Monthly Payment',
    type: 'currency',
    sortable: true,
    align: 'right'
  },
  {
    key: 'creditScore',
    label: 'Credit Score',
    type: 'number',
    sortable: true,
    render: (value) => {
      const color = value >= 750 ? 'text-green-600' : value >= 650 ? 'text-blue-600' : 'text-red-600';
      return `<span class="${color} font-semibold">${value}</span>`;
    }
  },
  {
    key: 'riskLevel',
    label: 'Risk',
    sortable: true,
    render: (value) => {
      const colorMap = {
        'Low': 'bg-green-100 text-green-800',
        'Medium': 'bg-yellow-100 text-yellow-800',
        'High': 'bg-red-100 text-red-800'
      };
      return `<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${colorMap[value]}">${value}</span>`;
    }
  },
  {
    key: 'status',
    label: 'Status',
    type: 'status',
    sortable: true
  },
  {
    key: 'lastPayment',
    label: 'Last Payment',
    type: 'date',
    sortable: true
  }
];

export const CustomerPortfolio = Template.bind({});
CustomerPortfolio.args = {
  title: 'Customer Portfolio',
  subtitle: 'Manage customer accounts and loan portfolios',
  data: customerPortfolioData,
  columns: customerPortfolioColumns,
  selectable: true,
  showSearch: true,
  showFilters: true,
  showPagination: false,
  showActions: true,
  showExport: true,
  rowClickable: true,
  actions: [
    { key: 'details', label: 'Details', variant: 'primary' },
    { key: 'contact', label: 'Contact', variant: 'secondary' },
    { key: 'restructure', label: 'Restructure', variant: 'warning' }
  ],
  filterOptions: [
    {
      key: 'status',
      label: 'Filter by Status',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'delinquent', label: 'Delinquent' },
        { value: 'inactive', label: 'Inactive' }
      ]
    },
    {
      key: 'riskLevel',
      label: 'Filter by Risk',
      options: [
        { value: 'Low', label: 'Low Risk' },
        { value: 'Medium', label: 'Medium Risk' },
        { value: 'High', label: 'High Risk' }
      ]
    }
  ]
};

// Financial dashboard table
const dashboardMetricsData = [
  {
    metric: 'Total Loan Volume',
    thisMonth: 2850000,
    lastMonth: 2650000,
    change: 7.5,
    trend: 'up',
    target: 3000000
  },
  {
    metric: 'Applications Received',
    thisMonth: 1420,
    lastMonth: 1350,
    change: 5.2,
    trend: 'up',
    target: 1500
  },
  {
    metric: 'Approval Rate',
    thisMonth: 78.5,
    lastMonth: 76.2,
    change: 2.3,
    trend: 'up',
    target: 80
  },
  {
    metric: 'Average Loan Amount',
    thisMonth: 28500,
    lastMonth: 27800,
    change: 2.5,
    trend: 'up',
    target: 30000
  },
  {
    metric: 'Default Rate',
    thisMonth: 2.8,
    lastMonth: 3.2,
    change: -12.5,
    trend: 'down',
    target: 2.5
  },
  {
    metric: 'Processing Time (days)',
    thisMonth: 4.2,
    lastMonth: 4.8,
    change: -12.5,
    trend: 'down',
    target: 3.5
  }
];

const dashboardColumns = [
  {
    key: 'metric',
    label: 'Metric',
    sortable: false
  },
  {
    key: 'thisMonth',
    label: 'This Month',
    sortable: true,
    align: 'right',
    render: (value, row) => {
      if (row.metric.includes('Rate') || row.metric.includes('Time')) {
        return `<span class="font-semibold">${value}${row.metric.includes('Rate') ? '%' : ''}</span>`;
      }
      return `<span class="font-semibold">$${value.toLocaleString()}</span>`;
    }
  },
  {
    key: 'lastMonth',
    label: 'Last Month',
    sortable: true,
    align: 'right',
    render: (value, row) => {
      if (row.metric.includes('Rate') || row.metric.includes('Time')) {
        return `${value}${row.metric.includes('Rate') ? '%' : ''}`;
      }
      return `$${value.toLocaleString()}`;
    }
  },
  {
    key: 'change',
    label: 'Change',
    sortable: true,
    align: 'right',
    render: (value) => {
      const color = value > 0 ? 'text-green-600' : 'text-red-600';
      const arrow = value > 0 ? '↑' : '↓';
      return `<span class="${color} font-medium">${arrow} ${Math.abs(value)}%</span>`;
    }
  },
  {
    key: 'target',
    label: 'Target',
    sortable: true,
    align: 'right',
    render: (value, row) => {
      if (row.metric.includes('Rate') || row.metric.includes('Time')) {
        return `${value}${row.metric.includes('Rate') ? '%' : ''}`;
      }
      return `$${value.toLocaleString()}`;
    }
  }
];

export const DashboardMetrics = Template.bind({});
DashboardMetrics.args = {
  title: 'Key Performance Metrics',
  subtitle: 'Monthly performance indicators and targets',
  data: dashboardMetricsData,
  columns: dashboardColumns,
  selectable: false,
  showSearch: false,
  showFilters: false,
  showPagination: false,
  showActions: false,
  showExport: true,
  rowClickable: false
};

// Interactive table with real-time updates
const InteractiveTable = () => ({
  components: { MTable },
  setup() {
    const data = ref([...loanApplicationsData]);
    const selectedRows = ref([]);
    
    const addRandomApplication = () => {
      const names = ['Alex Thompson', 'Maria Garcia', 'James Lee', 'Sophie Wang'];
      const types = ['Personal', 'Auto', 'Mortgage', 'Business'];
      const statuses = ['pending', 'approved', 'rejected'];
      
      const newApp = {
        id: `APP-${String(data.value.length + 1).padStart(3, '0')}`,
        applicantName: names[Math.floor(Math.random() * names.length)],
        email: `user${Date.now()}@email.com`,
        loanAmount: Math.floor(Math.random() * 50000) + 5000,
        loanType: types[Math.floor(Math.random() * types.length)],
        creditScore: Math.floor(Math.random() * 300) + 500,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        applicationDate: new Date().toISOString().split('T')[0],
        monthlyIncome: Math.floor(Math.random() * 8000) + 3000,
        debtToIncome: Math.floor(Math.random() * 40) + 20,
        approved: Math.random() > 0.5
      };
      
      data.value.push(newApp);
    };
    
    const removeSelected = () => {
      const selectedIds = selectedRows.value.map(row => row.id);
      data.value = data.value.filter(row => !selectedIds.includes(row.id));
      selectedRows.value = [];
    };
    
    const handleSelectionChange = (rows) => {
      selectedRows.value = rows;
    };
    
    const handleActionClick = ({ action, row }) => {
      if (action === 'approve') {
        const index = data.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
          data.value[index].status = 'approved';
          data.value[index].approved = true;
        }
      } else if (action === 'reject') {
        const index = data.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
          data.value[index].status = 'rejected';
          data.value[index].approved = false;
        }
      }
    };
    
    return {
      data,
      selectedRows,
      addRandomApplication,
      removeSelected,
      handleSelectionChange,
      handleActionClick
    };
  },
  template: `
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Management</h2>
        <div class="flex space-x-3">
          <button
            @click="addRandomApplication"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Application
          </button>
          <button
            v-if="selectedRows.length > 0"
            @click="removeSelected"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Remove Selected ({{ selectedRows.length }})
          </button>
        </div>
      </div>
      
      <MTable
        title="Live Loan Applications"
        subtitle="Real-time application management with actions"
        :data="data"
        :columns="[
          { key: 'applicantName', label: 'Applicant', sortable: true },
          { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
          { key: 'loanType', label: 'Type', sortable: true },
          { key: 'creditScore', label: 'Credit Score', type: 'number', sortable: true },
          { key: 'status', label: 'Status', type: 'status', sortable: true },
          { key: 'applicationDate', label: 'Applied', type: 'date', sortable: true }
        ]"
        :selectable="true"
        :show-search="true"
        :show-filters="true"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="6"
        :row-clickable="true"
        :actions="[
          { key: 'view', label: 'View', variant: 'primary' },
          { key: 'approve', label: 'Approve', variant: 'success' },
          { key: 'reject', label: 'Reject', variant: 'danger' }
        ]"
        :filter-options="[
          {
            key: 'status',
            label: 'Filter by Status',
            options: [
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
              { value: 'rejected', label: 'Rejected' }
            ]
          },
          {
            key: 'loanType',
            label: 'Filter by Type',
            options: [
              { value: 'Personal', label: 'Personal' },
              { value: 'Auto', label: 'Auto' },
              { value: 'Mortgage', label: 'Mortgage' },
              { value: 'Business', label: 'Business' }
            ]
          }
        ]"
        @selection-change="handleSelectionChange"
        @action-click="handleActionClick"
      />
    </div>
  `
});

export const InteractiveLoanManagement = InteractiveTable.bind({});
InteractiveLoanManagement.parameters = {
  layout: 'fullscreen'
};

// Mobile responsive table
const MobileTable = () => ({
  components: { MTable },
  setup() {
    const mobileData = loanApplicationsData.slice(0, 4);
    const mobileColumns = [
      { key: 'applicantName', label: 'Applicant', sortable: true },
      { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
      { key: 'status', label: 'Status', type: 'status', sortable: true }
    ];
    
    return { mobileData, mobileColumns };
  },
  template: `
    <div class="max-w-md mx-auto p-4">
      <MTable
        title="Loan Applications"
        subtitle="Mobile optimized view"
        :data="mobileData"
        :columns="mobileColumns"
        :selectable="false"
        :show-search="true"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :show-export="false"
        :responsive="true"
        :actions="[
          { key: 'view', label: 'View' }
        ]"
      />
    </div>
  `
});

export const MobileResponsive = MobileTable.bind({});
MobileResponsive.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};