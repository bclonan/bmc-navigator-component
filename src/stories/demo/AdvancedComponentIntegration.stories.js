import { ref, reactive, computed, watch } from 'vue';
import MChart from '../../components/charts/MChart.vue';
import MTable from '../../components/tables/MTable.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MLayout from '../../components/ui/MLayout.vue';
import StateTransitionVisualizer from '../../components/visualization/StateTransitionVisualizer.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import MThemeGenerator from '../../components/theming/MThemeGenerator.vue';

export default {
  title: 'Demo/Advanced Component Integration',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced demonstrations showing complex component interactions, real-time data flow, and integrated workflows for financial services applications.'
      }
    }
  }
};

// Real-time Dashboard with Live Data Updates
export const RealTimeDashboard = {
  render: () => ({
    components: { 
      MLayout, MCard, MChart, MTable, MSlider, MProgress, MButton, MTextField, MSelect 
    },
    setup() {
      const dashboardData = reactive({
        applications: {
          total: 1247,
          pending: 89,
          approved: 156,
          declined: 23,
          trending: 'up'
        },
        performance: {
          approvalRate: 72,
          avgProcessingTime: 2.4,
          customerSatisfaction: 4.6,
          portfolioHealth: 91
        },
        revenue: {
          monthly: 2847000,
          quarterly: 8341000,
          annual: 34820000,
          growth: 12.3
        }
      });

      // Live chart data with updates
      const realtimeData = ref({
        applications: Array.from({ length: 24 }, (_, i) => ({
          x: i,
          y: Math.floor(Math.random() * 50) + 20
        })),
        revenue: Array.from({ length: 12 }, (_, i) => ({
          x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
          y: Math.floor(Math.random() * 500000) + 2000000
        })),
        distribution: [
          { label: 'Personal Loans', value: 45, color: '#3b82f6' },
          { label: 'Auto Loans', value: 30, color: '#10b981' },
          { label: 'Mortgages', value: 20, color: '#f59e0b' },
          { label: 'Business', value: 5, color: '#ef4444' }
        ]
      });

      // Live table data
      const liveApplications = ref([
        {
          id: 'APP-2024-001',
          customer: 'Sarah Johnson',
          amount: 25000,
          type: 'Personal',
          status: 'processing',
          score: 720,
          time: '2m ago',
          progress: 75
        },
        {
          id: 'APP-2024-002',
          customer: 'Mike Chen',
          amount: 15000,
          type: 'Auto',
          status: 'approved',
          score: 680,
          time: '5m ago',
          progress: 100
        },
        {
          id: 'APP-2024-003',
          customer: 'Emily Davis',
          amount: 45000,
          type: 'Home',
          status: 'review',
          score: 750,
          time: '8m ago',
          progress: 60
        }
      ]);

      // Simulate real-time updates
      const startRealTimeUpdates = () => {
        setInterval(() => {
          // Update chart data
          realtimeData.value.applications.shift();
          realtimeData.value.applications.push({
            x: realtimeData.value.applications[realtimeData.value.applications.length - 1].x + 1,
            y: Math.floor(Math.random() * 50) + 20
          });

          // Update performance metrics
          dashboardData.performance.approvalRate = Math.max(65, Math.min(85, 
            dashboardData.performance.approvalRate + (Math.random() - 0.5) * 2));
          
          dashboardData.performance.avgProcessingTime = Math.max(1.5, Math.min(4.0,
            dashboardData.performance.avgProcessingTime + (Math.random() - 0.5) * 0.2));

          // Update applications count
          dashboardData.applications.total += Math.floor(Math.random() * 3);
          if (Math.random() > 0.7) {
            dashboardData.applications.pending += 1;
          }
        }, 3000);
      };

      return {
        dashboardData,
        realtimeData,
        liveApplications,
        startRealTimeUpdates
      };
    },
    mounted() {
      this.startRealTimeUpdates();
    },
    template: `
      <MLayout app-title="Mariner Finance - Real-Time Analytics" theme="light">
        <div class="space-y-6">
          <!-- Header -->
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Real-Time Dashboard</h1>
              <p class="text-gray-600">Live updates every 3 seconds</p>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-600">Live</span>
            </div>
          </div>

          <!-- Key Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MCard variant="elevated" padding="large">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600 mb-2">
                  {{ dashboardData.applications.total.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-600">Total Applications</div>
                <div class="mt-2">
                  <MProgress 
                    :value="Math.min(100, (dashboardData.applications.total / 1500) * 100)"
                    color="primary"
                    size="sm"
                  />
                </div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600 mb-2">
                  {{ dashboardData.performance.approvalRate.toFixed(1) }}%
                </div>
                <div class="text-sm text-gray-600">Approval Rate</div>
                <div class="mt-2">
                  <MProgress 
                    :value="dashboardData.performance.approvalRate"
                    color="success"
                    size="sm"
                  />
                </div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div class="text-center">
                <div class="text-3xl font-bold text-yellow-600 mb-2">
                  {{ dashboardData.performance.avgProcessingTime.toFixed(1) }}d
                </div>
                <div class="text-sm text-gray-600">Avg Processing</div>
                <div class="mt-2">
                  <MProgress 
                    :value="Math.max(0, 100 - (dashboardData.performance.avgProcessingTime * 25))"
                    color="warning"
                    size="sm"
                  />
                </div>
              </div>
            </MCard>

            <MCard variant="elevated" padding="large">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600 mb-2">
                  \${{ (dashboardData.revenue.monthly / 1000000).toFixed(1) }}M
                </div>
                <div class="text-sm text-gray-600">Monthly Revenue</div>
                <div class="mt-2">
                  <MProgress 
                    :value="(dashboardData.revenue.monthly / 5000000) * 100"
                    color="secondary"
                    size="sm"
                  />
                </div>
              </div>
            </MCard>
          </div>

          <!-- Charts Section -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Real-time Applications -->
            <div class="lg:col-span-2">
              <MCard title="Application Volume" subtitle="Live updates (last 24 hours)">
                <template #actions>
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span class="text-xs text-gray-500">Live</span>
                  </div>
                </template>
                <MChart
                  type="line"
                  :data="[{ label: 'Applications', color: '#3b82f6', data: realtimeData.applications }]"
                  :width="600"
                  :height="300"
                  :show-grid="true"
                  :show-points="true"                  :formatters="{
                    x: (value) => value + 'h ago',
                    y: (value) => value + ' apps'
                  }"
                />
              </MCard>
            </div>

            <!-- Loan Distribution -->
            <MCard title="Loan Distribution" subtitle="Current portfolio">
              <MChart
                type="pie"
                :data="realtimeData.distribution"
                :width="300"
                :height="300"
                :show-legend="true"
              />
            </MCard>
          </div>

          <!-- Revenue Trends -->
          <MCard title="Revenue Trends" subtitle="Monthly performance">
            <MChart
              type="bar"
              :data="realtimeData.revenue"
              :width="800"
              :height="350"
              :show-grid="true"              :formatters="{
                y: (value) => '$' + (value/1000000).toFixed(1) + 'M'
              }"
            />
          </MCard>

          <!-- Live Applications Table -->
          <MCard title="Live Application Feed" subtitle="Recent submissions">
            <template #actions>
              <MButton variant="outline" size="small" prepend-icon="fas fa-refresh">
                Refresh
              </MButton>
            </template>
            <MTable
              :data="liveApplications"
              :columns="[
                { key: 'id', label: 'Application ID', sortable: true },
                { key: 'customer', label: 'Customer', sortable: true },
                { key: 'amount', label: 'Amount', type: 'currency', sortable: true },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'score', label: 'Credit Score', sortable: true },
                { key: 'time', label: 'Submitted' },
                { key: 'progress', label: 'Progress', type: 'progress' }
              ]"
              :show-search="false"
              :show-pagination="false"
              :actions="[
                { key: 'view', label: 'View', variant: 'primary' },
                { key: 'approve', label: 'Quick Approve', variant: 'success' }
              ]"
            />
          </MCard>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Real-time dashboard with live data updates, demonstrating dynamic chart updates, progress indicators, and live table feeds.'
      }
    }
  }
};

// Advanced Form Integration with Cross-Field Validation
export const AdvancedFormIntegration = {
  render: () => ({
    components: { 
      DynamicFormRenderer, MCard, MButton, MProgress, StateTransitionVisualizer 
    },
    setup() {
      const formState = reactive({
        currentStep: 0,
        completedSteps: new Set(),
        validationErrors: {},
        formData: {}
      });

      const advancedFormConfig = {
        title: 'Advanced Loan Application',
        description: 'Multi-step form with complex validation and real-time calculations',
        sections: [
          {
            id: 'personal_info',
            title: 'Personal Information',
            step: 0,
            fields: [
              {
                id: 'firstName',
                type: 'text',
                label: 'First Name',
                required: true,
                validation: {
                  minLength: 2,
                  pattern: /^[a-zA-Z\s]+$/,
                  message: 'Must contain only letters'
                }
              },
              {
                id: 'lastName',
                type: 'text',
                label: 'Last Name',
                required: true,
                validation: {
                  minLength: 2,
                  pattern: /^[a-zA-Z\s]+$/
                }
              },
              {
                id: 'ssn',
                type: 'text',
                label: 'Social Security Number',
                required: true,
                validation: {
                  pattern: /^\d{3}-\d{2}-\d{4}$/,
                  message: 'Format: XXX-XX-XXXX'
                }
              },
              {
                id: 'dateOfBirth',
                type: 'date',
                label: 'Date of Birth',
                required: true,
                validation: {
                  custom: (value) => {
                    const age = (new Date() - new Date(value)) / (365.25 * 24 * 60 * 60 * 1000);
                    return age >= 18 && age <= 80;
                  },
                  message: 'Must be between 18 and 80 years old'
                }
              }
            ]
          },
          {
            id: 'financial_info',
            title: 'Financial Details',
            step: 1,
            fields: [
              {
                id: 'annualIncome',
                type: 'slider',
                label: 'Annual Income',
                min: 20000,
                max: 200000,
                step: 5000,
                unit: '$',
                formatValue: (value) => `$${value.toLocaleString()}`,
                required: true
              },
              {
                id: 'monthlyExpenses',
                type: 'slider',
                label: 'Monthly Expenses',
                min: 1000,
                max: 15000,
                step: 250,
                unit: '$',
                formatValue: (value) => `$${value.toLocaleString()}`,
                required: true,
                validation: {
                  custom: (value, formData) => {
                    const monthlyIncome = formData.annualIncome / 12;
                    return value < monthlyIncome * 0.8;
                  },
                  message: 'Expenses cannot exceed 80% of monthly income'
                }
              },
              {
                id: 'employmentType',
                type: 'select',
                label: 'Employment Type',
                required: true,
                options: [
                  { value: 'fullTime', label: 'Full-time Employee' },
                  { value: 'partTime', label: 'Part-time Employee' },
                  { value: 'selfEmployed', label: 'Self-employed' },
                  { value: 'contractor', label: 'Independent Contractor' }
                ]
              }
            ]
          },
          {
            id: 'loan_details',
            title: 'Loan Requirements',
            step: 2,
            fields: [
              {
                id: 'loanAmount',
                type: 'slider',
                label: 'Requested Amount',
                min: 5000,
                max: 100000,
                step: 1000,
                unit: '$',
                formatValue: (value) => `$${value.toLocaleString()}`,
                required: true,
                validation: {
                  custom: (value, formData) => {
                    const maxAffordable = (formData.annualIncome / 12 - formData.monthlyExpenses) * 36;
                    return value <= maxAffordable;
                  },
                  message: 'Amount exceeds affordability based on income and expenses'
                }
              },
              {
                id: 'loanTerm',
                type: 'select',
                label: 'Loan Term',
                required: true,
                options: [
                  { value: 12, label: '12 months' },
                  { value: 24, label: '24 months' },
                  { value: 36, label: '36 months' },
                  { value: 48, label: '48 months' },
                  { value: 60, label: '60 months' }
                ]
              },
              {
                id: 'loanPurpose',
                type: 'select',
                label: 'Loan Purpose',
                required: true,
                options: [
                  { value: 'debtConsolidation', label: 'Debt Consolidation' },
                  { value: 'homeImprovement', label: 'Home Improvement' },
                  { value: 'autoRepair', label: 'Auto Repair' },
                  { value: 'medical', label: 'Medical Expenses' },
                  { value: 'other', label: 'Other' }
                ]
              }
            ]
          }
        ]
      };

      const stepStates = computed(() => [
        {
          id: 'personal',
          label: 'Personal Info',
          step: 1,
          status: formState.completedSteps.has(0) ? 'completed' : 
                  formState.currentStep === 0 ? 'active' : 'pending',
          description: 'Basic information'
        },
        {
          id: 'financial',
          label: 'Financial Details',
          step: 2,
          status: formState.completedSteps.has(1) ? 'completed' : 
                  formState.currentStep === 1 ? 'active' : 'pending',
          description: 'Income and expenses'
        },
        {
          id: 'loan',
          label: 'Loan Details',
          step: 3,
          status: formState.completedSteps.has(2) ? 'completed' : 
                  formState.currentStep === 2 ? 'active' : 'pending',
          description: 'Loan requirements'
        }
      ]);

      const nextStep = () => {
        if (formState.currentStep < 2) {
          formState.completedSteps.add(formState.currentStep);
          formState.currentStep++;
        }
      };

      const prevStep = () => {
        if (formState.currentStep > 0) {
          formState.currentStep--;
        }
      };

      return {
        formState,
        advancedFormConfig,
        stepStates,
        nextStep,
        prevStep
      };
    },
    template: `
      <div class="min-h-screen bg-gray-50 py-8">
        <div class="max-w-6xl mx-auto px-4">
          <!-- Header -->
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Advanced Form Integration</h1>
            <p class="text-gray-600">Multi-step form with cross-field validation and real-time feedback</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <!-- Step Visualizer -->
            <div class="lg:col-span-1">
              <MCard title="Progress" variant="elevated" padding="large">
                <StateTransitionVisualizer
                  :states="stepStates"
                  :current-state="formState.currentStep"
                  layout="vertical"
                  :show-connections="true"
                  :animated="true"
                />
                
                <div class="mt-6">
                  <div class="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{{ Math.round(((formState.completedSteps.size + (formState.currentStep > 0 ? 0.5 : 0)) / 3) * 100) }}%</span>
                  </div>
                  <MProgress 
                    :value="((formState.completedSteps.size + (formState.currentStep > 0 ? 0.5 : 0)) / 3) * 100"
                    color="primary"
                    :show-percentage="false"
                  />
                </div>
              </MCard>
            </div>

            <!-- Form Content -->
            <div class="lg:col-span-3">
              <MCard variant="elevated" padding="large">
                <template #header>
                  <div>
                    <h2 class="text-xl font-semibold">
                      {{ advancedFormConfig.sections[formState.currentStep].title }}
                    </h2>
                    <p class="text-gray-600 text-sm">
                      Step {{ formState.currentStep + 1 }} of {{ advancedFormConfig.sections.length }}
                    </p>
                  </div>
                </template>

                <DynamicFormRenderer
                  :config="{ 
                    sections: [advancedFormConfig.sections[formState.currentStep]]
                  }"
                  :initial-data="formState.formData"
                  @form-data-changed="formState.formData = $event"
                  @validation-changed="formState.validationErrors = $event"
                />

                <template #footer>
                  <div class="flex justify-between">
                    <MButton
                      variant="outline"
                      text="Previous"
                      :disabled="formState.currentStep === 0"
                      @click="prevStep"
                    />
                    <MButton
                      variant="primary"
                      :text="formState.currentStep === 2 ? 'Submit Application' : 'Next Step'"
                      @click="nextStep"
                    />
                  </div>
                </template>
              </MCard>

              <!-- Real-time Validation Summary -->
              <MCard 
                v-if="Object.keys(formState.validationErrors).length > 0"
                title="Validation Issues"
                variant="outlined"
                class="mt-6"
              >
                <div class="space-y-2">
                  <div
                    v-for="(error, field) in formState.validationErrors"
                    :key="field"
                    class="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <svg class="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <div class="font-medium text-red-800">{{ field }}</div>
                      <div class="text-sm text-red-600">{{ error }}</div>
                    </div>
                  </div>
                </div>
              </MCard>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Advanced multi-step form with cross-field validation, real-time feedback, and integrated progress visualization.'
      }
    }
  }
};

// Component Performance and Stress Testing
export const PerformanceStressTesting = {
  render: () => ({
    components: { MChart, MTable, MCard, MButton, MSlider, MProgress },
    setup() {
      const testConfig = reactive({
        chartDataSize: 100,
        tableDataSize: 500,
        chartType: 'line',
        updateInterval: 1000,
        isRunning: false
      });

      const performanceMetrics = reactive({
        chartRenderTime: 0,
        tableRenderTime: 0,
        memoryUsage: 0,
        updateCount: 0
      });

      const generateLargeDataset = (size, type = 'chart') => {
        const start = performance.now();
        
        let data;
        if (type === 'chart') {
          data = Array.from({ length: size }, (_, i) => ({
            x: i,
            y: Math.floor(Math.random() * 1000),
            category: ['A', 'B', 'C'][i % 3]
          }));
        } else {
          data = Array.from({ length: size }, (_, i) => ({
            id: `ITEM-${i.toString().padStart(6, '0')}`,
            name: `Item ${i + 1}`,
            value: Math.floor(Math.random() * 100000),
            category: ['Personal', 'Auto', 'Mortgage', 'Business'][i % 4],
            status: ['active', 'pending', 'completed', 'cancelled'][i % 4],
            date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            score: Math.floor(Math.random() * 850) + 300,
            amount: Math.floor(Math.random() * 100000) + 5000
          }));
        }

        const end = performance.now();
        
        if (type === 'chart') {
          performanceMetrics.chartRenderTime = end - start;
        } else {
          performanceMetrics.tableRenderTime = end - start;
        }

        return data;
      };

      const chartData = computed(() => generateLargeDataset(testConfig.chartDataSize, 'chart'));
      const tableData = computed(() => generateLargeDataset(testConfig.tableDataSize, 'table'));

      const startStressTest = () => {
        testConfig.isRunning = true;
        performanceMetrics.updateCount = 0;

        const interval = setInterval(() => {
          if (!testConfig.isRunning) {
            clearInterval(interval);
            return;
          }

          // Force re-render by changing data size slightly
          testConfig.chartDataSize = testConfig.chartDataSize === 100 ? 101 : 100;
          performanceMetrics.updateCount++;

          // Estimate memory usage (simplified)
          if (performance.memory) {
            performanceMetrics.memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
          }

          if (performanceMetrics.updateCount >= 100) {
            testConfig.isRunning = false;
          }
        }, testConfig.updateInterval);
      };

      return {
        testConfig,
        performanceMetrics,
        chartData,
        tableData,
        startStressTest
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <!-- Test Controls -->
        <MCard title="Performance Testing Suite" subtitle="Stress test components with large datasets">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label class="block text-sm font-medium mb-2">Chart Data Size</label>
              <MSlider
                v-model="testConfig.chartDataSize"
                :min="10"
                :max="5000"
                :step="10"
                :show-tooltip="true"
                :format-value="(value) => \`\${value} points\`"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Table Data Size</label>
              <MSlider
                v-model="testConfig.tableDataSize"
                :min="50"
                :max="10000"
                :step="50"
                :show-tooltip="true"
                :format-value="(value) => \`\${value} rows\`"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Update Interval (ms)</label>
              <MSlider
                v-model="testConfig.updateInterval"
                :min="100"
                :max="5000"
                :step="100"
                :show-tooltip="true"
                :format-value="(value) => \`\${value}ms\`"
              />
            </div>
          </div>

          <div class="flex space-x-4">
            <MButton
              variant="primary"
              text="Start Stress Test"
              :disabled="testConfig.isRunning"
              @click="startStressTest"
            />
            <MButton
              variant="outline"
              text="Stop Test"
              :disabled="!testConfig.isRunning"
              @click="testConfig.isRunning = false"
            />
          </div>

          <!-- Performance Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="text-sm text-blue-600 font-medium">Chart Render Time</div>
              <div class="text-2xl font-bold text-blue-900">{{ performanceMetrics.chartRenderTime.toFixed(2) }}ms</div>
            </div>
            
            <div class="bg-green-50 rounded-lg p-4">
              <div class="text-sm text-green-600 font-medium">Table Render Time</div>
              <div class="text-2xl font-bold text-green-900">{{ performanceMetrics.tableRenderTime.toFixed(2) }}ms</div>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-4">
              <div class="text-sm text-yellow-600 font-medium">Memory Usage</div>
              <div class="text-2xl font-bold text-yellow-900">{{ performanceMetrics.memoryUsage }}MB</div>
            </div>
            
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="text-sm text-purple-600 font-medium">Updates</div>
              <div class="text-2xl font-bold text-purple-900">{{ performanceMetrics.updateCount }}</div>
            </div>
          </div>

          <div v-if="testConfig.isRunning" class="mt-4">
            <div class="flex justify-between text-sm mb-2">
              <span>Test Progress</span>
              <span>{{ performanceMetrics.updateCount }}/100 updates</span>
            </div>
            <MProgress :value="performanceMetrics.updateCount" color="primary" />
          </div>
        </MCard>

        <!-- Performance Chart -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MCard title="Chart Performance Test" :subtitle="\`\${testConfig.chartDataSize} data points\`">
            <template #actions>
              <div class="text-sm text-gray-500">
                Render: {{ performanceMetrics.chartRenderTime.toFixed(2) }}ms
              </div>
            </template>
            <MChart
              :type="testConfig.chartType"
              :data="chartData"
              :width="400"
              :height="300"
              :show-grid="true"
              :show-points="testConfig.chartDataSize <= 500"
            />
          </MCard>

          <!-- Memory Usage Chart -->
          <MCard title="Memory Usage Monitor" subtitle="Real-time memory consumption">
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Heap Size</span>
                <span class="text-sm text-gray-600">{{ performanceMetrics.memoryUsage }}MB</span>
              </div>
              <MProgress 
                :value="Math.min(100, (performanceMetrics.memoryUsage / 100) * 100)"
                color="warning"
              />
              
              <div class="text-xs text-gray-500">
                Note: Memory monitoring requires Chrome DevTools API
              </div>
            </div>
          </MCard>
        </div>

        <!-- Performance Table -->
        <MCard title="Table Performance Test" :subtitle="\`\${testConfig.tableDataSize} rows\`">
          <template #actions>
            <div class="text-sm text-gray-500">
              Render: {{ performanceMetrics.tableRenderTime.toFixed(2) }}ms
            </div>
          </template>
          <MTable
            :data="tableData"
            :columns="[
              { key: 'id', label: 'ID', sortable: true },
              { key: 'name', label: 'Name', sortable: true },
              { key: 'value', label: 'Value', type: 'number', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'status', label: 'Status', type: 'status' },
              { key: 'date', label: 'Date', type: 'date', sortable: true },
              { key: 'score', label: 'Score', sortable: true },
              { key: 'amount', label: 'Amount', type: 'currency', sortable: true }
            ]"
            :page-size="50"
            :show-search="true"
            :show-pagination="true"
            :show-filters="true"
            :virtual-scrolling="testConfig.tableDataSize > 1000"
          />
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Performance stress testing with large datasets, real-time metrics monitoring, and optimization demonstrations.'
      }
    }
  }
};

// Accessibility and Keyboard Navigation Demo
export const AccessibilityDemo = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MTextField, MSelect, MCheckbox, MSlider, MTable, MProgress 
    },
    setup() {
      const accessibilityState = reactive({
        currentFocus: 0,
        announcements: [],
        highContrast: false,
        reducedMotion: false,
        screenReaderMode: false,
        keyboardNavigation: true
      });

      const formData = reactive({
        name: '',
        email: '',
        loanAmount: 25000,
        loanType: '',
        agreeToTerms: false
      });

      const tableData = ref([
        {
          id: 'ACC-001',
          description: 'High contrast mode',
          status: 'Available',
          shortcut: 'Ctrl+Alt+H',
          level: 'AA'
        },
        {
          id: 'ACC-002', 
          description: 'Screen reader support',
          status: 'Active',
          shortcut: 'Tab navigation',
          level: 'AAA'
        },
        {
          id: 'ACC-003',
          description: 'Keyboard navigation',
          status: 'Active', 
          shortcut: 'Arrow keys',
          level: 'AA'
        },
        {
          id: 'ACC-004',
          description: 'Focus indicators',
          status: 'Active',
          shortcut: 'Tab/Shift+Tab',
          level: 'AA'
        }
      ]);

      const announceToScreenReader = (message) => {
        accessibilityState.announcements.push({
          id: Date.now(),
          message,
          timestamp: new Date().toLocaleTimeString()
        });
        
        // Simulate screen reader announcement
        if (accessibilityState.screenReaderMode) {
          console.log(`Screen Reader: ${message}`);
        }
      };

      const toggleHighContrast = () => {
        accessibilityState.highContrast = !accessibilityState.highContrast;
        announceToScreenReader(
          `High contrast mode ${accessibilityState.highContrast ? 'enabled' : 'disabled'}`
        );
      };

      const handleKeyboardShortcut = (event) => {
        if (event.ctrlKey && event.altKey && event.key === 'h') {
          event.preventDefault();
          toggleHighContrast();
        }
        
        if (event.key === 'F1') {
          event.preventDefault();
          announceToScreenReader('Help: Use Tab to navigate, Space to select, Enter to activate');
        }
      };

      const validateForm = () => {
        const errors = [];
        if (!formData.name.trim()) errors.push('Name is required');
        if (!formData.email.includes('@')) errors.push('Valid email is required');
        if (!formData.loanType) errors.push('Loan type selection is required');
        if (!formData.agreeToTerms) errors.push('Terms agreement is required');
        
        if (errors.length > 0) {
          announceToScreenReader(`Form has ${errors.length} errors: ${errors.join(', ')}`);
        } else {
          announceToScreenReader('Form is valid and ready to submit');
        }
        
        return errors;
      };      return {
        accessibilityState,
        formData,
        tableData,
        announceToScreenReader,
        toggleHighContrast,
        handleKeyboardShortcut,
        validateForm,
        formatCurrency: (value) => '$' + value.toLocaleString()
      };
    },
    mounted() {
      document.addEventListener('keydown', this.handleKeyboardShortcut);
      this.announceToScreenReader('Accessibility demo loaded. Press F1 for help.');
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this.handleKeyboardShortcut);
    },
    template: `
      <div 
        class="min-h-screen transition-all duration-300"
        :class="{
          'bg-black text-white': accessibilityState.highContrast,
          'bg-gray-50': !accessibilityState.highContrast
        }"
        @keydown="handleKeyboardShortcut"
      >
        <!-- Accessibility Controls -->
        <div class="bg-blue-900 text-white p-4">
          <div class="max-w-7xl mx-auto">
            <h1 class="text-2xl font-bold mb-2">Accessibility & Keyboard Navigation Demo</h1>
            <div class="flex flex-wrap gap-4 text-sm">
              <div>Press <kbd class="bg-blue-800 px-2 py-1 rounded">Ctrl+Alt+H</kbd> for high contrast</div>
              <div>Press <kbd class="bg-blue-800 px-2 py-1 rounded">F1</kbd> for help</div>
              <div>Use <kbd class="bg-blue-800 px-2 py-1 rounded">Tab</kbd> to navigate</div>
            </div>
          </div>
        </div>

        <!-- Screen Reader Announcements -->
        <div 
          class="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        >
          <div v-for="announcement in accessibilityState.announcements.slice(-1)" :key="announcement.id">
            {{ announcement.message }}
          </div>
        </div>

        <div class="max-w-7xl mx-auto p-6 space-y-8">
          <!-- Accessibility Settings -->
          <MCard 
            title="Accessibility Settings" 
            subtitle="Configure accessibility options"
            :class="{ 'border-2 border-yellow-400': accessibilityState.highContrast }"
          >
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="flex items-center justify-between">
                <label class="font-medium">High Contrast Mode</label>
                <MCheckbox
                  v-model="accessibilityState.highContrast"
                  @change="toggleHighContrast"
                  aria-label="Toggle high contrast mode"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <label class="font-medium">Screen Reader Mode</label>
                <MCheckbox
                  v-model="accessibilityState.screenReaderMode"
                  @change="announceToScreenReader('Screen reader mode toggled')"
                  aria-label="Toggle screen reader simulation"
                />
              </div>
              
              <div class="flex items-center justify-between">
                <label class="font-medium">Reduced Motion</label>
                <MCheckbox
                  v-model="accessibilityState.reducedMotion"
                  aria-label="Reduce animations and motion"
                />
              </div>
            </div>
          </MCard>

          <!-- Accessible Form -->
          <MCard title="Accessible Loan Application Form" subtitle="Fully keyboard navigable with screen reader support">
            <form @submit.prevent="validateForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MTextField
                  v-model="formData.name"
                  label="Full Name"
                  required
                  aria-describedby="name-help"
                  placeholder="Enter your full legal name"
                />
                <div id="name-help" class="text-sm text-gray-600">
                  Enter your name as it appears on official documents
                </div>

                <MTextField
                  v-model="formData.email"
                  label="Email Address"
                  type="email"
                  required
                  aria-describedby="email-help"
                  placeholder="your.email@example.com"
                />
                <div id="email-help" class="text-sm text-gray-600">
                  We'll use this email for loan status updates
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium mb-2">Loan Amount</label>
                <MSlider
                  v-model="formData.loanAmount"
                  :min="5000"
                  :max="100000"
                  :step="1000"
                  :show-tooltip="true"
                  :format-value="formatCurrency"
                  aria-label="Select loan amount"
                  aria-describedby="amount-help"
                />
                <div id="amount-help" class="text-sm text-gray-600 mt-1">
                  Current selection: ${formData?.loanAmount }
                </div>
              </div>

              <MSelect
                v-model="formData.loanType"
                label="Loan Type"
                :options="[
                  { value: 'personal', label: 'Personal Loan' },
                  { value: 'auto', label: 'Auto Loan' },
                  { value: 'mortgage', label: 'Mortgage' },
                  { value: 'business', label: 'Business Loan' }
                ]"
                required
                aria-describedby="type-help"
              />
              <div id="type-help" class="text-sm text-gray-600">
                Select the type of loan that best fits your needs
              </div>

              <div class="flex items-start space-x-3">
                <MCheckbox
                  v-model="formData.agreeToTerms"
                  id="terms-checkbox"
                  required
                  aria-describedby="terms-help"
                />
                <label for="terms-checkbox" class="text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>
              <div id="terms-help" class="text-sm text-gray-600">
                Please review our terms before agreeing
              </div>

              <div class="flex space-x-4">
                <MButton
                  type="submit"
                  variant="primary"
                  text="Validate Form"
                  aria-label="Validate form data"
                />
                <MButton
                  type="button"
                  variant="outline"
                  text="Reset Form"
                  @click="Object.keys(formData).forEach(key => formData[key] = key === 'loanAmount' ? 25000 : '')"
                  aria-label="Reset all form fields"
                />
              </div>
            </form>
          </MCard>

          <!-- Accessibility Features Table -->
          <MCard title="Accessibility Features" subtitle="WCAG compliance status">
            <MTable
              :data="tableData"              :columns="[
                { key: 'id', label: 'Feature ID', sortable: true },
                { key: 'description', label: 'Description', sortable: true },
                { key: 'status', label: 'Status', type: 'status' },
                { key: 'shortcut', label: 'Keyboard Shortcut' },
                { key: 'level', label: 'WCAG Level', sortable: true }
              ]"
              :show-search="true"
              :show-pagination="false"
              aria-label="Accessibility features table"
            />
          </MCard>

          <!-- Screen Reader Announcements Log -->
          <MCard 
            v-if="accessibilityState.screenReaderMode"
            title="Screen Reader Announcements"
            subtitle="Live announcements log"
          >
            <div class="space-y-2 max-h-60 overflow-y-auto">
              <div
                v-for="announcement in accessibilityState.announcements"
                :key="announcement.id"
                class="flex justify-between items-start p-3 bg-gray-100 rounded"
              >
                <span class="flex-1">{{ announcement.message }}</span>
                <span class="text-xs text-gray-500 ml-4">{{ announcement.timestamp }}</span>
              </div>
            </div>
          </MCard>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive accessibility demo with keyboard navigation, screen reader support, high contrast mode, and WCAG compliance features.'
      }
    }
  }
};

// Animation and Micro-interactions Demo
export const AnimationShowcase = {
  render: () => ({
    components: { 
      MCard, MButton, MProgress, StateTransitionVisualizer, MChart 
    },
    setup() {
      const animationState = reactive({
        currentDemo: 'loading',
        loadingProgress: 0,
        isAnimating: false,
        cardStates: ['idle', 'hover', 'loading', 'success', 'error'],
        currentCardState: 'idle',
        chartAnimationEnabled: true
      });

      const transitionSteps = ref([
        {
          id: 'init',
          title: 'Initialize',
          description: 'Setting up animation',
          status: 'completed'
        },
        {
          id: 'load',
          title: 'Loading',
          description: 'Loading data',
          status: 'active'
        },
        {
          id: 'process',
          title: 'Processing',
          description: 'Processing information',
          status: 'pending'
        },
        {
          id: 'complete',
          title: 'Complete',
          description: 'Animation finished',
          status: 'pending'
        }
      ]);

      const chartData = ref([
        { x: 1, y: 20 },
        { x: 2, y: 35 },
        { x: 3, y: 25 },
        { x: 4, y: 45 },
        { x: 5, y: 30 }
      ]);

      const startLoadingAnimation = () => {
        animationState.isAnimating = true;
        animationState.loadingProgress = 0;

        const interval = setInterval(() => {
          animationState.loadingProgress += 2;
          
          if (animationState.loadingProgress >= 100) {
            clearInterval(interval);
            animationState.isAnimating = false;
            animationState.loadingProgress = 100;
            
            setTimeout(() => {
              animationState.loadingProgress = 0;
            }, 1000);
          }
        }, 50);
      };

      const animateChart = () => {
        const newData = chartData.value.map(point => ({
          ...point,
          y: Math.floor(Math.random() * 50) + 10
        }));
        
        chartData.value = newData;
      };

      const cycleCardStates = () => {
        const currentIndex = animationState.cardStates.indexOf(animationState.currentCardState);
        const nextIndex = (currentIndex + 1) % animationState.cardStates.length;
        animationState.currentCardState = animationState.cardStates[nextIndex];
      };

      const bounceTransition = {
        name: 'bounce',
        enter: 'animate__animated animate__bounceIn',
        leave: 'animate__animated animate__bounceOut'
      };

      return {
        animationState,
        transitionSteps,
        chartData,
        startLoadingAnimation,
        animateChart,
        cycleCardStates,
        bounceTransition
      };
    },
    template: `
      <div class="space-y-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <!-- Animation Controls -->
        <MCard title="Animation Showcase" subtitle="Interactive demonstrations of component animations and micro-interactions">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MButton
              variant="primary"
              text="Start Loading Animation"
              @click="startLoadingAnimation"
              :disabled="animationState.isAnimating"
              class="transform transition-transform hover:scale-105"
            />
            
            <MButton
              variant="secondary"
              text="Animate Chart"
              @click="animateChart"
              class="transform transition-transform hover:scale-105"
            />
            
            <MButton
              variant="outline"
              text="Cycle Card States"
              @click="cycleCardStates"
              class="transform transition-transform hover:scale-105"
            />
          </div>
        </MCard>

        <!-- Loading Animations -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MCard title="Loading States" subtitle="Progressive loading indicators">
            <div class="space-y-6">
              <!-- Progress Bar Animation -->
              <div>
                <label class="block text-sm font-medium mb-2">Loading Progress</label>
                <MProgress 
                  :value="animationState.loadingProgress"
                  color="primary"
                  :animated="animationState.isAnimating"
                  class="transition-all duration-300"
                />
                <div class="text-sm text-gray-600 mt-1">
                  {{ animationState.loadingProgress }}% complete
                </div>
              </div>

              <!-- Skeleton Loading -->
              <div class="space-y-3">
                <div class="animate-pulse">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="space-y-2 mt-2">
                    <div class="h-3 bg-gray-200 rounded"></div>
                    <div class="h-3 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>

              <!-- Spinner Animation -->
              <div class="flex items-center space-x-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span class="text-sm text-gray-600">Processing...</span>
              </div>
            </div>
          </MCard>

          <!-- Card State Animations -->
          <MCard 
            title="Interactive Card States" 
            subtitle="Hover and state transitions"
            :class="{
              'transform scale-105 shadow-xl': animationState.currentCardState === 'hover',
              'animate-pulse': animationState.currentCardState === 'loading',
              'border-green-500 shadow-green-200': animationState.currentCardState === 'success',
              'border-red-500 shadow-red-200': animationState.currentCardState === 'error',
              'transition-all duration-300': true
            }"
          >
            <div class="text-center py-8">
              <div 
                class="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-500"
                :class="{
                  'bg-gray-100': animationState.currentCardState === 'idle',
                  'bg-blue-100': animationState.currentCardState === 'hover',
                  'bg-yellow-100 animate-pulse': animationState.currentCardState === 'loading',
                  'bg-green-100': animationState.currentCardState === 'success',
                  'bg-red-100': animationState.currentCardState === 'error'
                }"
              >
                <svg 
                  class="w-8 h-8 transition-transform duration-300" 
                  :class="{
                    'text-gray-600': animationState.currentCardState === 'idle',
                    'text-blue-600 scale-110': animationState.currentCardState === 'hover',
                    'text-yellow-600 animate-spin': animationState.currentCardState === 'loading',
                    'text-green-600': animationState.currentCardState === 'success',
                    'text-red-600': animationState.currentCardState === 'error'
                  }"
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
              
              <h3 class="text-lg font-semibold mb-2">
                Current State: {{ animationState.currentCardState }}
              </h3>
              
              <p class="text-gray-600">
                Click "Cycle Card States" to see different animation states
              </p>
            </div>
          </MCard>
        </div>

        <!-- Chart Animations -->
        <MCard title="Chart Animation" subtitle="Smooth data transitions">
          <MChart
            type="line"
            :data="chartData"
            :width="800"
            :height="300"
            :show-grid="true"
            :show-points="true"
            class="transition-all duration-500"
          />
        </MCard>

        <!-- State Transition Visualizer -->
        <MCard title="State Transition Animation" subtitle="Complex workflow visualization">
          <StateTransitionVisualizer
            :steps="transitionSteps"
            :current-step="1"
            :completed-steps="new Set([0])"
            :animated="true"
            animation-speed="normal"
          />
        </MCard>

        <!-- Micro-interactions Grid -->
        <MCard title="Micro-interactions" subtitle="Subtle feedback animations">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Hover Scale -->
            <div class="p-6 bg-blue-50 rounded-lg text-center transform transition-transform hover:scale-110 cursor-pointer">
              <div class="text-blue-600 font-medium">Hover Scale</div>
            </div>
            
            <!-- Bounce Click -->
            <div class="p-6 bg-green-50 rounded-lg text-center transform transition-transform active:scale-95 cursor-pointer">
              <div class="text-green-600 font-medium">Click Bounce</div>
            </div>
            
            <!-- Rotate Hover -->
            <div class="p-6 bg-purple-50 rounded-lg text-center transform transition-transform hover:rotate-3 cursor-pointer">
              <div class="text-purple-600 font-medium">Rotate Hover</div>
            </div>
            
            <!-- Slide Animation -->
            <div class="p-6 bg-yellow-50 rounded-lg text-center transform transition-transform hover:translate-x-2 cursor-pointer">
              <div class="text-yellow-600 font-medium">Slide Hover</div>
            </div>
          </div>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive animation showcase including loading states, state transitions, micro-interactions, and smooth data visualizations.'
      }
    }
  }
};

// Mobile Responsive Demo
export const MobileResponsiveShowcase = {
  render: () => ({
    components: { 
      MLayout, MCard, MButton, MChart, MTable, MSlider, StateTransitionVisualizer 
    },
    setup() {
      const viewportState = reactive({
        currentViewport: 'desktop',
        viewports: {
          mobile: { width: '375px', height: '667px', label: 'Mobile (375px)' },
          tablet: { width: '768px', height: '1024px', label: 'Tablet (768px)' },
          desktop: { width: '1200px', height: '800px', label: 'Desktop (1200px)' }
        },
        orientation: 'portrait'
      });

      const mobileData = reactive({
        revenue: [
          { x: 'Q1', y: 1200000 },
          { x: 'Q2', y: 1500000 },
          { x: 'Q3', y: 1800000 },
          { x: 'Q4', y: 2100000 }
        ],
        applications: [
          { id: 'APP-001', name: 'John Smith', amount: 25000, status: 'approved' },
          { id: 'APP-002', name: 'Sarah Johnson', amount: 15000, status: 'pending' },
          { id: 'APP-003', name: 'Mike Chen', amount: 35000, status: 'review' }
        ],
        loanAmount: 25000
      });

      const mobileSteps = ref([
        { id: 'personal', title: 'Personal Info', description: 'Basic details', status: 'completed' },
        { id: 'financial', title: 'Financial', description: 'Income & expenses', status: 'active' },
        { id: 'review', title: 'Review', description: 'Final review', status: 'pending' }
      ]);

      const setViewport = (viewport) => {
        viewportState.currentViewport = viewport;
      };

      return {
        viewportState,
        mobileData,
        mobileSteps,
        setViewport
      };
    },
    template: `
      <div class="space-y-6">
        <!-- Viewport Controls -->
        <MCard title="Mobile Responsive Showcase" subtitle="Test components across different screen sizes">
          <div class="flex flex-wrap gap-4 mb-6">
            <MButton
              v-for="(viewport, key) in viewportState.viewports"
              :key="key"
              :variant="viewportState.currentViewport === key ? 'primary' : 'outline'"
              :text="viewport.label"
              @click="setViewport(key)"
              size="small"
            />
          </div>
          
          <!-- Orientation Toggle -->
          <div class="flex items-center space-x-4">
            <span class="text-sm font-medium">Orientation:</span>
            <MButton
              variant="outline"
              :text="viewportState.orientation"
              @click="viewportState.orientation = viewportState.orientation === 'portrait' ? 'landscape' : 'portrait'"
              size="small"
            />
          </div>
        </MCard>

        <!-- Responsive Preview Frame -->
        <MCard title="Live Preview" subtitle="Component behavior at different screen sizes">
          <div class="flex justify-center p-8 bg-gray-100 rounded-lg">
            <div 
              class="bg-white shadow-xl rounded-lg overflow-hidden transition-all duration-500"
              :style="{
                width: viewportState.viewports[viewportState.currentViewport].width,
                height: viewportState.viewports[viewportState.currentViewport].height,
                transform: viewportState.orientation === 'landscape' ? 'rotate(90deg)' : 'rotate(0deg)'
              }"
            >
              <!-- Mobile App Content -->
              <div class="h-full overflow-auto">
                <!-- Mobile Header -->
                <div class="bg-blue-600 text-white p-4 sticky top-0 z-10">
                  <div class="flex items-center justify-between">
                    <h1 class="text-lg font-semibold truncate">Mariner Finance</h1>
                    <button class="p-2 hover:bg-blue-700 rounded">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="p-4 space-y-6">
                  <!-- Mobile Dashboard Cards -->
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-50 p-4 rounded-lg text-center">
                      <div class="text-2xl font-bold text-green-600">$2.1M</div>
                      <div class="text-sm text-gray-600">Q4 Revenue</div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg text-center">
                      <div class="text-2xl font-bold text-blue-600">156</div>
                      <div class="text-sm text-gray-600">Applications</div>
                    </div>
                  </div>

                  <!-- Mobile Chart -->
                  <div class="bg-white rounded-lg shadow p-4">
                    <h3 class="font-semibold mb-3">Revenue Trend</h3>
                    <MChart
                      type="line"
                      :data="mobileData.revenue"
                      :width="viewportState.currentViewport === 'mobile' ? 300 : 500"
                      :height="200"
                      :show-grid="false"
                      :show-points="true"
                    />
                  </div>

                  <!-- Mobile Loan Calculator -->
                  <div class="bg-white rounded-lg shadow p-4">
                    <h3 class="font-semibold mb-3">Quick Calculator</h3>
                    <div class="space-y-4">
                      <div>
                        <label class="block text-sm font-medium mb-2">Loan Amount</label>
                        <MSlider
                          v-model="mobileData.loanAmount"
                          :min="5000"
                          :max="100000"
                          :step="1000"
                          :show-tooltip="true"
                          :format-value="(value) => \`$\${value.toLocaleString()}\`"
                        />
                      </div>
                      
                      <div class="bg-gray-50 p-3 rounded text-center">
                        <div class="text-lg font-semibold">\${{ Math.round(mobileData.loanAmount * 0.05) }}/month</div>
                        <div class="text-sm text-gray-600">Estimated payment</div>
                      </div>
                    </div>
                  </div>

                  <!-- Mobile Process Steps -->
                  <div class="bg-white rounded-lg shadow p-4">
                    <h3 class="font-semibold mb-3">Application Process</h3>
                    <StateTransitionVisualizer
                      :steps="mobileSteps"
                      :current-step="1"
                      :completed-steps="new Set([0])"
                      layout="vertical"
                      :compact="viewportState.currentViewport === 'mobile'"
                      :animated="true"
                    />
                  </div>

                  <!-- Mobile Table -->
                  <div class="bg-white rounded-lg shadow p-4">
                    <h3 class="font-semibold mb-3">Recent Applications</h3>
                    <MTable
                      :data="mobileData.applications"
                      :columns="viewportState.currentViewport === 'mobile' ? [
                        { key: 'name', label: 'Name' },
                        { key: 'amount', label: 'Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'status' }
                      ] : [
                        { key: 'id', label: 'ID' },
                        { key: 'name', label: 'Name' },
                        { key: 'amount', label: 'Amount', type: 'currency' },
                        { key: 'status', label: 'Status', type: 'status' }
                      ]"
                      :show-search="false"
                      :show-pagination="false"
                      :page-size="viewportState.currentViewport === 'mobile' ? 3 : 10"
                    />
                  </div>

                  <!-- Mobile Action Buttons -->
                  <div class="space-y-3">
                    <MButton
                      variant="primary"
                      text="Apply for Loan"
                      class="w-full"
                      size="large"
                    />
                    <MButton
                      variant="outline"
                      text="Check Application Status"
                      class="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Responsive Guidelines -->
          <div class="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 class="font-semibold text-blue-900 mb-2">Responsive Design Guidelines</h4>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• <strong>Mobile (< 768px):</strong> Single column layout, larger touch targets, simplified navigation</li>
              <li>• <strong>Tablet (768px - 1024px):</strong> Two-column layout, medium-sized components</li>
              <li>• <strong>Desktop (> 1024px):</strong> Multi-column layout, full feature set, hover interactions</li>
            </ul>
          </div>
        </MCard>

        <!-- Responsive Features -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MCard title="Touch-Friendly" subtitle="Optimized for mobile interaction">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">44px minimum touch targets</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">Thumb-friendly navigation</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">Swipe gestures supported</span>
              </div>
            </div>
          </MCard>

          <MCard title="Performance" subtitle="Optimized for mobile networks">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">Lazy loading images</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">Compressed assets</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                </svg>
                </div>
                <span class="text-sm">Efficient rendering</span>
              </div>
            </div>
          </MCard>

          <MCard title="Accessibility" subtitle="Mobile accessibility features">
            <div class="space-y-3">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm">Screen reader support</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm">Voice control ready</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-sm">High contrast mode</span>
              </div>
            </div>
          </MCard>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-responsive showcase demonstrating how components adapt to different screen sizes and orientations with touch-friendly interactions.'
      }
    }
  }
};
