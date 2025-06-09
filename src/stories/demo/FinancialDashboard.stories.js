import { ref, reactive, computed } from 'vue';
import MChart from '../../components/charts/MChart.vue';
import MTable from '../../components/tables/MTable.vue';
import MSlider from '../../components/ui/MSlider.vue';
import StateTransitionVisualizer from '../../components/visualization/StateTransitionVisualizer.vue';
import { 
  chartConfigs, 
  tableConfigs, 
  dashboardConfig,
  generateChartData,
  generateTableData 
} from '../../config/formConfigs.js';

export default {
  title: 'Demo/Financial Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete financial services dashboard with charts, tables, and interactive analytics using flat configuration structures.'
      }
    }
  }
};

// Financial services dashboard with real-time data
const FinancialServicesTemplate = () => ({
  components: { MChart, MTable, MSlider, StateTransitionVisualizer },
  setup() {
    // Dashboard state
    const dashboardData = reactive({
      timeRange: 'month',
      selectedMetric: 'all',
      refreshInterval: 30,
      autoRefresh: true
    });
    
    // Real-time loan performance data
    const loanPerformanceData = ref([
      {
        label: 'Applications',
        color: '#3b82f6',
        data: [
          { x: 1, y: 1250 }, { x: 2, y: 1380 }, { x: 3, y: 1420 },
          { x: 4, y: 1350 }, { x: 5, y: 1580 }, { x: 6, y: 1650 },
          { x: 7, y: 1480 }, { x: 8, y: 1720 }, { x: 9, y: 1850 },
          { x: 10, y: 1780 }, { x: 11, y: 1920 }, { x: 12, y: 2050 }
        ]
      },
      {
        label: 'Approvals',
        color: '#10b981',
        data: [
          { x: 1, y: 980 }, { x: 2, y: 1050 }, { x: 3, y: 1120 },
          { x: 4, y: 1080 }, { x: 5, y: 1240 }, { x: 6, y: 1320 },
          { x: 7, y: 1180 }, { x: 8, y: 1380 }, { x: 9, y: 1450 },
          { x: 10, y: 1420 }, { x: 11, y: 1540 }, { x: 12, y: 1650 }
        ]
      }
    ]);
    
    // Revenue by loan type data
    const revenueData = ref([
      { x: 'Personal', y: 3850000, color: '#3b82f6' },
      { x: 'Auto', y: 2950000, color: '#10b981' },
      { x: 'Mortgage', y: 5200000, color: '#f59e0b' },
      { x: 'Business', y: 1850000, color: '#8b5cf6' },
      { x: 'Student', y: 1150000, color: '#ef4444' }
    ]);
    
    // Credit score distribution
    const creditScoreData = ref([
      { x: 'Excellent (750+)', y: 3250, color: '#10b981' },
      { x: 'Good (650-749)', y: 4800, color: '#3b82f6' },
      { x: 'Fair (500-649)', y: 2150, color: '#f59e0b' },
      { x: 'Poor (<500)', y: 890, color: '#ef4444' }
    ]);
    
    // Loan applications table data
    const loanApplicationsData = ref([
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
        debtToIncome: 28
      },
      {
        id: 'APP-002',
        applicantName: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        loanAmount: 45000,
        loanType: 'Auto',
        creditScore: 720,
        status: 'pending',
        applicationDate: '2024-01-18',
        monthlyIncome: 7200,
        debtToIncome: 32
      },
      {
        id: 'APP-003',
        applicantName: 'Michael Brown',
        email: 'michael.brown@email.com',
        loanAmount: 125000,
        loanType: 'Mortgage',
        creditScore: 780,
        status: 'approved',
        applicationDate: '2024-01-20',
        monthlyIncome: 9500,
        debtToIncome: 25
      },
      {
        id: 'APP-004',
        applicantName: 'Emily Davis',
        email: 'emily.davis@email.com',
        loanAmount: 18000,
        loanType: 'Personal',
        creditScore: 680,
        status: 'pending',
        applicationDate: '2024-01-22',
        monthlyIncome: 5200,
        debtToIncome: 35
      },
      {
        id: 'APP-005',
        applicantName: 'David Wilson',
        email: 'david.wilson@email.com',
        loanAmount: 85000,
        loanType: 'Business',
        creditScore: 760,
        status: 'approved',
        applicationDate: '2024-01-25',
        monthlyIncome: 12000,
        debtToIncome: 22
      }
    ]);
    
    // Key metrics data
    const keyMetricsData = ref([
      {
        metric: 'Total Loan Volume',
        thisMonth: 15200000,
        lastMonth: 14850000,
        change: 2.4,
        target: 16000000
      },
      {
        metric: 'Applications Received',
        thisMonth: 2150,
        lastMonth: 2050,
        change: 4.9,
        target: 2300
      },
      {
        metric: 'Approval Rate',
        thisMonth: 82.5,
        lastMonth: 78.2,
        change: 5.5,
        target: 85
      },
      {
        metric: 'Average Processing Time',
        thisMonth: 3.2,
        lastMonth: 3.8,
        change: -15.8,
        target: 3.0
      },
      {
        metric: 'Default Rate',
        thisMonth: 2.1,
        lastMonth: 2.4,
        change: -12.5,
        target: 2.0
      }
    ]);
    
    // Portfolio states for visualization
    const portfolioStates = ref([
      {
        id: 'applications',
        label: 'Applications',
        description: 'New submissions',
        step: 1,
        icon: 'document-text',
        color: 'blue',
        active: false,
        completed: true,
        count: 2150
      },
      {
        id: 'underwriting',
        label: 'Underwriting',
        description: 'Credit assessment',
        step: 2,
        icon: 'clipboard-check',
        color: 'yellow',
        active: true,
        completed: false,
        count: 485
      },
      {
        id: 'approval',
        label: 'Approval',
        description: 'Final decision',
        step: 3,
        icon: 'check-circle',
        color: 'green',
        active: false,
        completed: false,
        count: 1775
      },
      {
        id: 'funding',
        label: 'Funding',
        description: 'Disbursement',
        step: 4,
        icon: 'currency-dollar',
        color: 'emerald',
        active: false,
        completed: false,
        count: 1650
      }
    ]);
    
    // Computed analytics
    const analytics = computed(() => {
      const totalApplications = loanApplicationsData.value.length;
      const approvedCount = loanApplicationsData.value.filter(app => app.status === 'approved').length;
      const pendingCount = loanApplicationsData.value.filter(app => app.status === 'pending').length;
      const approvalRate = totalApplications > 0 ? (approvedCount / totalApplications) * 100 : 0;
      
      const totalVolume = loanApplicationsData.value.reduce((sum, app) => 
        app.status === 'approved' ? sum + app.loanAmount : sum, 0
      );
      
      const avgLoanAmount = approvedCount > 0 ? totalVolume / approvedCount : 0;
      
      return {
        totalApplications,
        approvedCount,
        pendingCount,
        approvalRate,
        totalVolume,
        avgLoanAmount
      };
    });
    
    // Table action handlers
    const handleApplicationAction = ({ action, row }) => {
      const index = loanApplicationsData.value.findIndex(app => app.id === row.id);
      if (index === -1) return;
      
      switch (action) {
        case 'approve':
          loanApplicationsData.value[index].status = 'approved';
          break;
        case 'reject':
          loanApplicationsData.value[index].status = 'rejected';
          break;
        case 'view':
          console.log('Viewing application:', row);
          break;
      }
    };
    
    // Dashboard controls
    const refreshDashboard = () => {
      console.log('Refreshing dashboard data...');
      // In real implementation, this would fetch fresh data
    };
    
    const exportDashboard = () => {
      console.log('Exporting dashboard data...');
      // In real implementation, this would generate export
    };
    
    return {
      dashboardData,
      loanPerformanceData,
      revenueData,
      creditScoreData,
      loanApplicationsData,
      keyMetricsData,
      portfolioStates,
      analytics,
      handleApplicationAction,
      refreshDashboard,
      exportDashboard,
      chartConfigs,
      tableConfigs
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Dashboard Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Financial Services Dashboard</h1>
              <p class="mt-1 text-gray-600">Comprehensive loan portfolio management and analytics</p>
            </div>
            <div class="mt-4 lg:mt-0 flex items-center space-x-4">
              <select
                v-model="dashboardData.timeRange"
                class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              <button
                @click="refreshDashboard"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Refresh
              </button>
              <button
                @click="exportDashboard"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm font-medium text-gray-500">Total Applications</p>
                <p class="text-2xl font-semibold text-gray-900">{{ analytics.totalApplications.toLocaleString() }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm font-medium text-gray-500">Approval Rate</p>
                <p class="text-2xl font-semibold text-gray-900">{{ analytics.approvalRate.toFixed(1) }}%</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm font-medium text-gray-500">Total Volume</p>
                <p class="text-2xl font-semibold text-gray-900">\${{ (analytics.totalVolume / 1000000).toFixed(1) }}M</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
              </div>
              <div class="ml-4 flex-1">
                <p class="text-sm font-medium text-gray-500">Avg Loan Amount</p>
                <p class="text-2xl font-semibold text-gray-900">\${{ analytics.avgLoanAmount.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Portfolio Pipeline Visualization -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Loan Pipeline Status</h3>
          <StateTransitionVisualizer
            :states="portfolioStates"
            :current-state="2"
            layout="horizontal"
            :show-connections="true"
            :animated="true"
            :show-counts="true"
          />
        </div>

        <!-- Charts Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Loan Performance Trends -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <MChart
              type="line"
              title="Loan Performance Trends"
              subtitle="Monthly applications and approvals"
              :data="loanPerformanceData"
              :width="500"
              :height="350"
              :show-grid="true"
              :show-points="true"
              :show-legend="true"
              :formatters="{
                x: (value) => \`Month \${value}\`,
                y: (value) => value.toLocaleString()
              }"
            />
          </div>

          <!-- Credit Score Distribution -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <MChart
              type="pie"
              title="Credit Score Distribution"
              subtitle="Customer credit score ranges"
              :data="creditScoreData"
              :width="500"
              :height="350"
              :show-legend="true"
            />
          </div>
        </div>

        <!-- Revenue Analysis -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <MChart
            type="bar"
            title="Revenue by Loan Type"
            subtitle="Current quarter performance breakdown"
            :data="revenueData"
            :width="1000"
            :height="400"
            :formatters="{
              y: (value) => \`$\${(value / 1000000).toFixed(1)}M\`
            }"
          />
        </div>

        <!-- Key Metrics Table -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <MTable
            title="Key Performance Metrics"
            subtitle="Monthly performance indicators and targets"
            :data="keyMetricsData"
            :columns="[
              { key: 'metric', label: 'Metric', sortable: false },
              { 
                key: 'thisMonth', 
                label: 'This Month', 
                sortable: true, 
                align: 'right',
                render: (value, row) => {
                  if (row.metric.includes('Rate') || row.metric.includes('Time')) {
                    return \`<span class='font-semibold'>\${value}\${row.metric.includes('Rate') ? '%' : ''}</span>\`;
                  }
                  return \`<span class='font-semibold'>$\${value.toLocaleString()}</span>\`;
                }
              },
              { 
                key: 'lastMonth', 
                label: 'Last Month', 
                sortable: true, 
                align: 'right',
                render: (value, row) => {
                  if (row.metric.includes('Rate') || row.metric.includes('Time')) {
                    return \`\${value}\${row.metric.includes('Rate') ? '%' : ''}\`;
                  }
                  return \`$\${value.toLocaleString()}\`;
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
                  return \`<span class='\${color} font-medium'>\${arrow} \${Math.abs(value)}%</span>\`;
                }
              }
            ]"
            :selectable="false"
            :show-search="false"
            :show-filters="false"
            :show-pagination="false"
            :show-actions="false"
            :show-export="true"
          />
        </div>

        <!-- Recent Applications Table -->
        <div class="bg-white rounded-lg shadow-sm">
          <MTable
            title="Recent Loan Applications"
            subtitle="Latest applications requiring attention"
            :data="loanApplicationsData"
            :columns="[
              { key: 'applicantName', label: 'Applicant', sortable: true },
              { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
              { key: 'loanType', label: 'Type', sortable: true },
              { 
                key: 'creditScore', 
                label: 'Credit Score', 
                type: 'number', 
                sortable: true,
                render: (value) => {
                  const color = value >= 750 ? 'text-green-600' : value >= 650 ? 'text-blue-600' : value >= 500 ? 'text-yellow-600' : 'text-red-600';
                  return \`<span class='\${color} font-medium'>\${value}</span>\`;
                }
              },
              { key: 'status', label: 'Status', type: 'status', sortable: true },
              { key: 'applicationDate', label: 'Applied', type: 'date', sortable: true },
              { key: 'debtToIncome', label: 'DTI', sortable: true, render: (value) => \`\${value}%\` }
            ]"
            :selectable="true"
            :show-search="true"
            :show-filters="true"
            :show-pagination="true"
            :show-actions="true"
            :show-export="true"
            :page-size="5"
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
            @action-click="handleApplicationAction"
          />
        </div>
      </div>
    </div>
  `
});

export const ComprehensiveDashboard = FinancialServicesTemplate.bind({});
ComprehensiveDashboard.storyName = 'Complete Financial Dashboard';

// Mobile-optimized dashboard
const MobileDashboardTemplate = () => ({
  components: { MChart, MTable, MSlider },
  setup() {
    const quickMetrics = ref([
      { x: 'Applications', y: 2150 },
      { x: 'Approved', y: 1775 },
      { x: 'Pending', y: 375 }
    ]);
    
    const mobileApplications = ref([
      {
        id: 'APP-001',
        applicantName: 'John Smith',
        loanAmount: 25000,
        status: 'approved'
      },
      {
        id: 'APP-002',
        applicantName: 'Sarah Johnson',
        loanAmount: 45000,
        status: 'pending'
      },
      {
        id: 'APP-003',
        applicantName: 'Michael Brown',
        loanAmount: 125000,
        status: 'approved'
      }
    ]);
    
    return {
      quickMetrics,
      mobileApplications
    };
  },
  template: `
    <div class="max-w-md mx-auto p-4 space-y-6 bg-white min-h-screen">
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p class="text-gray-600">Quick overview</p>
      </div>
      
      <!-- Quick Stats -->
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">2.1K</div>
          <div class="text-xs text-blue-700">Applications</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-600">82%</div>
          <div class="text-xs text-green-700">Approval Rate</div>
        </div>
        <div class="text-center p-4 bg-yellow-50 rounded-lg">
          <div class="text-2xl font-bold text-yellow-600">$15M</div>
          <div class="text-xs text-yellow-700">Volume</div>
        </div>
      </div>
      
      <!-- Quick Chart -->
      <MChart
        type="bar"
        title="This Month"
        :data="quickMetrics"
        :width="350"
        :height="200"
        :responsive="true"
      />
      
      <!-- Recent Applications -->
      <MTable
        title="Recent Applications"
        :data="mobileApplications"
        :columns="[
          { key: 'applicantName', label: 'Applicant', sortable: true },
          { key: 'loanAmount', label: 'Amount', type: 'currency', align: 'right' },
          { key: 'status', label: 'Status', type: 'status' }
        ]"
        :selectable="false"
        :show-search="false"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :responsive="true"
        :actions="[{ key: 'view', label: 'View' }]"
      />
    </div>
  `
});

export const MobileDashboard = MobileDashboardTemplate.bind({});
MobileDashboard.parameters = {
  viewport: {
    defaultViewport: 'mobile1'
  }
};

// Analytics dashboard focused on charts
const AnalyticsDashboardTemplate = () => ({
  components: { MChart, MSlider },
  setup() {
    const timeRange = ref(12);
    
    const trendData = computed(() => [
      {
        label: 'Approval Rate',
        color: '#10b981',
        data: Array.from({ length: timeRange.value }, (_, i) => ({
          x: i + 1,
          y: 75 + Math.random() * 15
        }))
      },
      {
        label: 'Default Rate',
        color: '#ef4444',
        data: Array.from({ length: timeRange.value }, (_, i) => ({
          x: i + 1,
          y: 2 + Math.random() * 3
        }))
      }
    ]);
    
    const volumeData = computed(() => 
      Array.from({ length: 6 }, (_, i) => ({
        x: ['Personal', 'Auto', 'Mortgage', 'Business', 'Student', 'Other'][i],
        y: Math.floor(Math.random() * 5000000) + 1000000
      }))
    );
    
    return {
      timeRange,
      trendData,
      volumeData
    };
  },
  template: `
    <div class="space-y-8 p-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Time Range:</span>
          <MSlider
            v-model="timeRange"
            :min="6"
            :max="24"
            :step="3"
            :show-tooltip="true"
            :format-value="(value) => \`\${value} months\`"
            class="w-32"
          />
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="line"
          title="Performance Trends"
          subtitle="Key metrics over time"
          :data="trendData"
          :width="500"
          :height="350"
          :show-grid="true"
          :show-points="true"
          :show-legend="true"
          :formatters="{
            x: (value) => \`Month \${value}\`,
            y: (value) => \`\${value.toFixed(1)}%\`
          }"
        />
        
        <MChart
          type="bar"
          title="Volume by Category"
          subtitle="Current period breakdown"
          :data="volumeData"
          :width="500"
          :height="350"
          :formatters="{
            y: (value) => \`$\${(value / 1000000).toFixed(1)}M\`
          }"
        />
      </div>
    </div>
  `
});

export const AnalyticsDashboard = AnalyticsDashboardTemplate.bind({});
AnalyticsDashboard.parameters = {
  layout: 'fullscreen'
};