import { reactive, computed, ref, onMounted } from 'vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import MProgress from '../../components/ui/MProgress.vue';
import MChart from '../../components/charts/MChart.vue';
import MTable from '../../components/tables/MTable.vue';
import MLayout from '../../components/layout/MLayout.vue';
import MNavbar from '../../components/layout/MNavbar.vue';
import MFooter from '../../components/layout/MFooter.vue';

export default {
  title: 'Demo/Comprehensive Component Demo',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A comprehensive demonstration of all Vue 3 Financial UI components working together in real-world scenarios.'
      }
    }
  }
};

export const FinancialDashboard = {
  render: () => ({
    components: { 
      MLayout, MNavbar, MFooter, MCard, MButton, MTextField, MSelect, 
      MCheckbox, MSlider, MProgress, MChart, MTable 
    },
    setup() {
      const dashboardState = reactive({
        activeTab: 'overview',
        isLoading: false,
        notifications: 3
      });

      const formData = reactive({
        loanAmount: 50000,
        interestRate: 5.5,
        term: 60,
        customerName: '',
        loanType: 'personal'
      });

      // Chart data
      const chartData = reactive({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Loan Applications',
          data: [65, 78, 90, 81, 95, 102],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)'
        }]
      });

      // Table data
      const tableData = ref([
        { id: 1, customer: 'John Doe', amount: '$25,000', status: 'Approved', date: '2025-06-01' },
        { id: 2, customer: 'Jane Smith', amount: '$45,000', status: 'Pending', date: '2025-06-05' },
        { id: 3, customer: 'Bob Johnson', amount: '$30,000', status: 'Approved', date: '2025-06-08' }
      ]);

      const tableColumns = [
        { key: 'customer', label: 'Customer', sortable: true },
        { key: 'amount', label: 'Amount', sortable: true },
        { key: 'status', label: 'Status', sortable: false },
        { key: 'date', label: 'Date', sortable: true }
      ];

      const monthlyPayment = computed(() => {
        const P = formData.loanAmount;
        const r = formData.interestRate / 100 / 12;
        const n = formData.term;
        
        if (r === 0) return P / n;
        
        return P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      });

      const navItems = ref([
        { label: 'Dashboard', href: '#', active: true },
        { label: 'Loans', href: '#' },
        { label: 'Applications', href: '#' },
        { label: 'Reports', href: '#' }
      ]);

      const setActiveTab = (tab) => {
        dashboardState.activeTab = tab;
      };      return {
        dashboardState,
        formData,
        chartData,
        tableData,
        tableColumns,
        monthlyPayment,
        navItems,
        setActiveTab
      };
    },
    template: `
      <MLayout class="min-h-screen bg-gray-50">
        <!-- Navigation -->
        <MNavbar 
          title="Financial Services Dashboard"
          :nav-items="navItems"
          show-user-menu
          :notifications="dashboardState.notifications"
        />

        <!-- Main Content -->
        <div class="flex-1 p-6">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p class="text-gray-600">Comprehensive financial services management platform</p>
          </div>

          <!-- Tab Navigation -->
          <div class="mb-6 border-b border-gray-200">
            <nav class="-mb-px flex space-x-8">
              <button 
                @click="setActiveTab('overview')"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  dashboardState.activeTab === 'overview' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Overview
              </button>
              <button 
                @click="setActiveTab('calculator')"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  dashboardState.activeTab === 'calculator' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Loan Calculator
              </button>
              <button 
                @click="setActiveTab('applications')"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  dashboardState.activeTab === 'applications' 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Applications
              </button>
            </nav>
          </div>

          <!-- Overview Tab -->
          <div v-if="dashboardState.activeTab === 'overview'" class="space-y-6">
            <!-- KPI Cards -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <MCard class="text-center">
                <div class="text-2xl font-bold text-blue-600">$2.4M</div>
                <div class="text-sm text-gray-500">Total Loans</div>
                <MProgress :value="75" class="mt-2" color="blue" />
              </MCard>
              
              <MCard class="text-center">
                <div class="text-2xl font-bold text-green-600">156</div>
                <div class="text-sm text-gray-500">Approved</div>
                <MProgress :value="85" class="mt-2" color="green" />
              </MCard>
              
              <MCard class="text-center">
                <div class="text-2xl font-bold text-yellow-600">23</div>
                <div class="text-sm text-gray-500">Pending</div>
                <MProgress :value="45" class="mt-2" color="yellow" />
              </MCard>
              
              <MCard class="text-center">
                <div class="text-2xl font-bold text-red-600">8</div>
                <div class="text-sm text-gray-500">Rejected</div>
                <MProgress :value="15" class="mt-2" color="red" />
              </MCard>
            </div>

            <!-- Chart -->
            <MCard title="Loan Applications Trend" subtitle="Monthly application volume">
              <MChart
                type="line"
                :data="chartData"
                :height="300"
                :show-grid="true"
                :show-points="true"
              />
            </MCard>
          </div>

          <!-- Calculator Tab -->
          <div v-if="dashboardState.activeTab === 'calculator'" class="space-y-6">
            <MCard title="Loan Calculator" subtitle="Calculate monthly payments and terms">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <MTextField
                    v-model="formData.customerName"
                    label="Customer Name"
                    placeholder="Enter customer name"
                  />
                  
                  <MSelect
                    v-model="formData.loanType"
                    label="Loan Type"
                    :options="[
                      { value: 'personal', label: 'Personal Loan' },
                      { value: 'auto', label: 'Auto Loan' },
                      { value: 'mortgage', label: 'Mortgage' },
                      { value: 'business', label: 'Business Loan' }
                    ]"
                  />
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Amount</label>
                    <MSlider
                      v-model="formData.loanAmount"
                      :min="5000"
                      :max="500000"
                      :step="1000"
                      :show-tooltip="true"
                    />
                    <div class="text-sm text-gray-600 mt-1">
                      Amount: {{ formData.loanAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Interest Rate (%)</label>
                    <MSlider
                      v-model="formData.interestRate"
                      :min="1"
                      :max="15"
                      :step="0.1"
                      :show-tooltip="true"
                    />
                    <div class="text-sm text-gray-600 mt-1">
                      Rate: {{ formData.interestRate }}%
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Term (months)</label>
                    <MSlider
                      v-model="formData.term"
                      :min="12"
                      :max="360"
                      :step="6"
                      :show-tooltip="true"
                    />
                    <div class="text-sm text-gray-600 mt-1">
                      Term: {{ formData.term }} months
                    </div>
                  </div>
                </div>
                
                <div class="bg-blue-50 p-6 rounded-lg">
                  <h3 class="text-lg font-semibold text-blue-900 mb-4">Loan Summary</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-blue-700">Principal Amount:</span>
                      <span class="font-semibold">{{ formData.loanAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-blue-700">Interest Rate:</span>
                      <span class="font-semibold">{{ formData.interestRate }}%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-blue-700">Term:</span>
                      <span class="font-semibold">{{ formData.term }} months</span>
                    </div>
                    <hr class="border-blue-200">
                    <div class="flex justify-between text-lg">
                      <span class="text-blue-900 font-semibold">Monthly Payment:</span>
                      <span class="font-bold text-blue-900">{{ monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</span>
                    </div>
                  </div>
                  
                  <div class="mt-6">
                    <MButton variant="primary" class="w-full">
                      Generate Loan Application
                    </MButton>
                  </div>
                </div>
              </div>
            </MCard>
          </div>

          <!-- Applications Tab -->
          <div v-if="dashboardState.activeTab === 'applications'" class="space-y-6">
            <MCard title="Recent Applications" subtitle="Latest loan application submissions">
              <MTable
                :data="tableData"
                :columns="tableColumns"
                :show-search="true"
                :show-pagination="true"
                :page-size="5"
                search-placeholder="Search applications..."
              />
            </MCard>
          </div>
        </div>        <!-- Footer -->
        <MFooter 
          copyright="© 2025 Financial Services Platform. All rights reserved."
          :links="[
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Support', href: '#' }
          ]"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'A complete financial dashboard demonstrating the integration of all components in a real-world banking application scenario.'
      }
    }
  }
};

export const ComponentShowcase = {
  render: () => ({
    components: { 
      MCard, MButton, MTextField, MSelect, MCheckbox, MSlider, MProgress, MChart, MTable 
    },
    setup() {
      const showcaseState = reactive({
        textValue: '',
        selectValue: 'option1',
        checkboxValue: false,
        sliderValue: 50,
        progressValue: 75
      });

      const sampleData = ref([
        { name: 'Product A', value: 100, category: 'Electronics' },
        { name: 'Product B', value: 200, category: 'Clothing' },
        { name: 'Product C', value: 150, category: 'Books' }
      ]);

      const chartData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Revenue',
          data: [10000, 15000, 12000, 18000],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)'
        }]
      };      return {
        showcaseState,
        sampleData,
        chartData
      };
    },
    template: `
      <div class="space-y-8 p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Component Showcase</h1>
          <p class="text-gray-600">Interactive demonstration of all UI components</p>
        </div>

        <!-- Form Components -->
        <MCard title="Form Components" subtitle="Interactive form elements">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <MTextField
                v-model="showcaseState.textValue"
                label="Text Input"
                placeholder="Enter some text..."
                help-text="This is a help text"
              />
              
              <MSelect
                v-model="showcaseState.selectValue"
                label="Select Options"
                :options="[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]"
              />
              
              <MCheckbox
                v-model="showcaseState.checkboxValue"
                label="Checkbox Option"
              />
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Slider Control</label>
                <MSlider
                  v-model="showcaseState.sliderValue"
                  :min="0"
                  :max="100"
                  :show-tooltip="true"
                />
                <div class="text-sm text-gray-600 mt-1">Value: {{ showcaseState.sliderValue }}</div>
              </div>
              
              <div>
                <label class="block text-sm font-medium mb-2">Progress Indicator</label>
                <MProgress :value="showcaseState.progressValue" color="blue" />
                <div class="text-sm text-gray-600 mt-1">{{ showcaseState.progressValue }}% Complete</div>
              </div>
              
              <div class="flex gap-2">
                <MButton variant="primary">Primary</MButton>
                <MButton variant="secondary">Secondary</MButton>
                <MButton variant="outline">Outline</MButton>
              </div>
            </div>
          </div>
        </MCard>

        <!-- Data Visualization -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MCard title="Chart Visualization" subtitle="Interactive data charts">
            <MChart
              type="bar"
              :data="chartData"
              :height="250"
              :show-grid="true"
            />
          </MCard>

          <MCard title="Data Table" subtitle="Sortable and searchable data">
            <MTable
              :data="sampleData"
              :columns="[
                { key: 'name', label: 'Name', sortable: true },
                { key: 'value', label: 'Value', sortable: true },
                { key: 'category', label: 'Category', sortable: false }
              ]"
              :show-search="true"
              search-placeholder="Search products..."
            />          </MCard>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'A comprehensive showcase of all individual components with interactive examples and real-time state updates.'
      }
    }
  }
}; 


