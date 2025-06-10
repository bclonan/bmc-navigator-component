import { ref, reactive } from 'vue';
import MAsyncLoader from '../../components/ui/MAsyncLoader.vue';
import MSkeletonGroup from '../../components/ui/MSkeletonGroup.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'Loading & Motion System/Async Loader',
  component: MAsyncLoader,
  parameters: {
    docs: {
      description: {
        component: 'Higher-order component for managing async data loading with comprehensive error handling, retry logic, and customizable loading states.'
      }
    }
  },
  argTypes: {
    loading: {
      control: { type: 'boolean' }
    },
    showRetry: {
      control: { type: 'boolean' }
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'card']
    }
  }
};

// Mock API functions
const mockApiSuccess = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        applications: [
          { id: 1, name: 'John Smith', amount: 25000, status: 'approved', applicant: 'John Smith' },
          { id: 2, name: 'Sarah Johnson', amount: 15000, status: 'pending', applicant: 'Sarah Johnson' },
          { id: 3, name: 'Mike Brown', amount: 35000, status: 'reviewing', applicant: 'Mike Brown' }
        ],
        total: 75000,
        nextPayment: {
          amount: 1250,
          dueDate: '2025-07-15'
        },
        payments: [
          { id: 1, amount: 1250, date: '2025-06-15', status: 'paid' },
          { id: 2, amount: 1250, date: '2025-05-15', status: 'paid' }
        ],
        totalPaid: 12500
      });
    }, delay);
  });
};

const mockApiError = (delay = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('Network connection failed. Please check your internet connection and try again.'));
    }, delay);
  });
};

const mockApiSlowSuccess = () => mockApiSuccess(3000);
const mockApiRandomError = () => {
  return Math.random() > 0.6 ? mockApiSuccess(1500) : mockApiError(1500);
};

// Basic Usage
export const BasicUsage = {
  args: {
    loading: false,
    error: null,
    showRetry: true,
    variant: 'default'
  },
  render: (args) => ({
    components: { MAsyncLoader, MButton },
    setup() {
      const loading = ref(false);
      const error = ref(null);
      const data = ref(null);
      
      const loadData = async () => {
        loading.value = true;
        error.value = null;
        data.value = null;
        
        try {
          const result = await mockApiSuccess();
          data.value = result;
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
      
      const handleRetry = () => {
        loadData();
      };
      
      return { 
        ...args,
        loading,
        error,
        data,
        loadData,
        handleRetry
      };
    },
    template: `
      <div class="space-y-4">
        <MButton @click="loadData" :loading="loading" text="Load Data" />
        
        <MAsyncLoader
          :loading="loading"
          :error="error"
          :data="data"
          v-bind="$props"
          @retry="handleRetry"
        >
          <template #default="{ data }">
            <div v-if="data" class="space-y-4">
              <h3 class="font-semibold text-gray-900">Loan Applications</h3>
              <div class="grid gap-3">                <div 
                  v-for="app in data.applications" 
                  :key="app.id"
                  class="flex justify-between items-center p-3 bg-gray-50 rounded"
                >
                  <div>
                    <div class="font-medium">{{ app.name }}</div>
                    <div class="text-sm text-gray-600">{{ app.status }}</div>
                  </div>
                  <div class="text-lg font-semibold text-green-600">
                    \{{ app.amount.toLocaleString() }}
                  </div>
                </div>
              </div><div class="bg-blue-50 p-3 rounded">
                <div class="font-medium text-blue-900">
                  Total: \{{ data.total.toLocaleString() }}
                </div>
              </div>
            </div>
          </template>
        </MAsyncLoader>
      </div>
    `
  })
};

// Different Loading Components
export const CustomLoadingComponents = {
  render: () => ({
    components: { MAsyncLoader, MSkeletonGroup, MButton },
    setup() {
      const scenarios = reactive({
        card: { loading: false, error: null, data: null },
        table: { loading: false, error: null, data: null },
        list: { loading: false, error: null, data: null }
      });
      
      const loadData = async (scenario) => {
        scenarios[scenario].loading = true;
        scenarios[scenario].error = null;
        scenarios[scenario].data = null;
        
        try {
          const result = await mockApiSuccess(2000);
          scenarios[scenario].data = result;
        } catch (err) {
          scenarios[scenario].error = err.message;
        } finally {
          scenarios[scenario].loading = false;
        }
      };
      
      const handleRetry = (scenario) => {
        loadData(scenario);
      };
      
      return {
        scenarios,
        loadData,
        handleRetry
      };
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card Layout -->
        <div>
          <h3 class="font-medium mb-3">Card Skeleton</h3>
          <MButton @click="loadData('card')" :loading="scenarios.card.loading" text="Load Card Data" size="small" class="mb-4" />
          
          <MAsyncLoader
            :loading="scenarios.card.loading"
            :error="scenarios.card.error"
            :data="scenarios.card.data"
            loading-component="MSkeletonGroup"
            :loading-props="{ variant: 'card', showImage: true, contentLines: 3 }"
            @retry="handleRetry('card')"
          >
            <template #default="{ data }">
              <div v-if="data" class="border border-gray-200 rounded-lg p-4">
                <h4 class="font-semibold mb-2">Dashboard Card</h4>                <div class="text-2xl font-bold text-blue-600 mb-1">
                  \{{ data.total.toLocaleString() }}
                </div>
                <div class="text-sm text-gray-600">
                  {{ data.applications.length }} applications
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
        
        <!-- Table Layout -->
        <div>
          <h3 class="font-medium mb-3">Table Skeleton</h3>
          <MButton @click="loadData('table')" :loading="scenarios.table.loading" text="Load Table Data" size="small" class="mb-4" />
          
          <MAsyncLoader
            :loading="scenarios.table.loading"
            :error="scenarios.table.error"
            :data="scenarios.table.data"
            loading-component="MSkeletonGroup"
            :loading-props="{ variant: 'table', rows: 4, columns: 3 }"
            @retry="handleRetry('table')"
          >
            <template #default="{ data }">
              <div v-if="data" class="border border-gray-200 rounded overflow-hidden">
                <div class="bg-gray-50 px-3 py-2 border-b font-medium text-sm">
                  Applications Summary
                </div>
                <div class="divide-y">
                  <div 
                    v-for="app in data.applications" 
                    :key="app.id"
                    class="px-3 py-2 text-sm"
                  >
                    <div class="flex justify-between">
                      <span>\{{ app.name }}</span>
                      <span class="font-medium">$\{{ app.amount.toLocaleString() }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
        
        <!-- List Layout -->
        <div>
          <h3 class="font-medium mb-3">List Skeleton</h3>
          <MButton @click="loadData('list')" :loading="scenarios.list.loading" text="Load List Data" size="small" class="mb-4" />
          
          <MAsyncLoader
            :loading="scenarios.list.loading"
            :error="scenarios.list.error"
            :data="scenarios.list.data"
            loading-component="MSkeletonGroup"
            :loading-props="{ variant: 'list', items: 3, showActions: true }"
            @retry="handleRetry('list')"
          >
            <template #default="{ data }">
              <div v-if="data" class="space-y-2">
                <div 
                  v-for="app in data.applications" 
                  :key="app.id"
                  class="flex items-center gap-3 p-3 border border-gray-200 rounded"
                >
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-sm font-medium text-blue-600">\{{ app.name.charAt(0) }}</span>
                  </div>
                  <div class="flex-1">                    <div class="font-medium">\{{ app.name }}</div>
                    <div class="text-sm text-gray-600">\{{ app.status }}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">\{{ app.amount.toLocaleString() }}</div>
                  </div>
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
      </div>
    `
  })
};

// Error Handling
export const ErrorHandling = {
  render: () => ({
    components: { MAsyncLoader, MButton },
    setup() {
      const scenarios = reactive({
        networkError: { loading: false, error: null, data: null },
        autoRetry: { loading: false, error: null, data: null, retryCount: 0 },
        slowLoading: { loading: false, error: null, data: null }
      });
      
      const loadNetworkError = async () => {
        scenarios.networkError.loading = true;
        scenarios.networkError.error = null;
        scenarios.networkError.data = null;
        
        try {
          await mockApiError(1500);
        } catch (err) {
          scenarios.networkError.error = err.message;
        } finally {
          scenarios.networkError.loading = false;
        }
      };
      
      const loadAutoRetry = async () => {
        scenarios.autoRetry.loading = true;
        scenarios.autoRetry.error = null;
        scenarios.autoRetry.data = null;
        scenarios.autoRetry.retryCount++;
        
        try {
          const result = await mockApiRandomError();
          scenarios.autoRetry.data = result;
          scenarios.autoRetry.retryCount = 0;
        } catch (err) {
          scenarios.autoRetry.error = err.message;
        } finally {
          scenarios.autoRetry.loading = false;
        }
      };
      
      const loadSlowData = async () => {
        scenarios.slowLoading.loading = true;
        scenarios.slowLoading.error = null;
        scenarios.slowLoading.data = null;
        
        try {
          const result = await mockApiSlowSuccess();
          scenarios.slowLoading.data = result;
        } catch (err) {
          scenarios.slowLoading.error = err.message;
        } finally {
          scenarios.slowLoading.loading = false;
        }
      };
      
      return {
        scenarios,
        loadNetworkError,
        loadAutoRetry,
        loadSlowData
      };
    },
    template: `
      <div class="space-y-8">
        <!-- Network Error -->
        <div>
          <h3 class="text-lg font-medium mb-4">Network Error Handling</h3>
          <div class="flex gap-4 mb-4">
            <MButton @click="loadNetworkError" :loading="scenarios.networkError.loading" text="Trigger Network Error" color="error" variant="outlined" />
          </div>
          
          <MAsyncLoader
            :loading="scenarios.networkError.loading"
            :error="scenarios.networkError.error"
            :data="scenarios.networkError.data"
            :show-retry="true"
            error-title="Connection Failed"
            error-message="Unable to load loan applications. Please check your connection."
            @retry="loadNetworkError"
          >
            <template #default="{ data }">
              <div v-if="data" class="text-green-600 font-medium">
                ✓ Data loaded successfully
              </div>
            </template>
          </MAsyncLoader>
        </div>
        
        <!-- Auto Retry -->
        <div>
          <h3 class="text-lg font-medium mb-4">Auto Retry Logic (60% Success Rate)</h3>
          <div class="flex gap-4 mb-4">
            <MButton @click="loadAutoRetry" :loading="scenarios.autoRetry.loading" text="Load with Auto Retry" />
            <span v-if="scenarios.autoRetry.retryCount > 0" class="text-sm text-gray-600 self-center">
              Attempt: {{ scenarios.autoRetry.retryCount }}
            </span>
          </div>
          
          <MAsyncLoader
            :loading="scenarios.autoRetry.loading"
            :error="scenarios.autoRetry.error"
            :data="scenarios.autoRetry.data"
            :auto-retry-count="3"
            :auto-retry-delay="1500"
            @retry="loadAutoRetry"
          >
            <template #default="{ data }">
              <div v-if="data" class="space-y-2">
                <div class="text-green-600 font-medium">
                  ✓ Data loaded successfully after {{ scenarios.autoRetry.retryCount }} attempts
                </div>
                <div class="text-sm text-gray-600">
                  Loaded {{ data.applications.length }} applications
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
        
        <!-- Slow Loading -->
        <div>
          <h3 class="text-lg font-medium mb-4">Slow Loading (3 seconds)</h3>
          <div class="flex gap-4 mb-4">
            <MButton @click="loadSlowData" :loading="scenarios.slowLoading.loading" text="Load Slow Data" />
          </div>
          
          <MAsyncLoader
            :loading="scenarios.slowLoading.loading"
            :error="scenarios.slowLoading.error"
            :data="scenarios.slowLoading.data"
            :min-loading-time="1000"
            :loading-props="{ variant: 'card', animated: true }"
          >
            <template #default="{ data }">
              <div v-if="data" class="bg-green-50 border border-green-200 rounded p-4">
                <div class="text-green-800 font-medium">Slow data loaded successfully!</div>
                <div class="text-green-700 text-sm mt-1">
                  Total amount: \{{ data.total.toLocaleString() }}
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
      </div>
    `
  })
};

// Using Composables
export const UsingComposables = {
  render: () => ({
    components: { MAsyncLoader, MButton, MCard },
    setup() {
      // Basic loading state
      const basicLoader = useLoadingState({
        minLoadingTime: 500,
        onSuccess: (data) => console.log('Basic loader success:', data),
        onError: (error) => console.error('Basic loader error:', error)
      });
      
      // Async data with caching
      const { 
        isLoading: asyncLoading, 
        error: asyncError, 
        data: asyncData, 
        execute: executeAsync,
        refresh: refreshAsync 
      } = useAsyncData(
        () => mockApiSuccess(1500),
        {
          immediate: false,
          cache: true,
          transform: (data) => ({
            ...data,
            transformedAt: new Date().toISOString()
          })
        }
      );
      
      const loadBasicData = async () => {
        await basicLoader.executeWithLoading(() => mockApiSuccess(1000));
      };
      
      return {
        basicLoader,
        asyncLoading,
        asyncError,
        asyncData,
        executeAsync,
        refreshAsync,
        loadBasicData
      };
    },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Loading State -->
        <MCard title="useLoadingState Hook" subtitle="Manual loading management">
          <div class="space-y-4">
            <MButton 
              @click="loadBasicData" 
              :loading="basicLoader.isLoading.value" 
              text="Load Data"
              :disabled="basicLoader.isLoading.value"
            />
            
            <MAsyncLoader
              :loading="basicLoader.isLoading.value"
              :error="basicLoader.error.value"
              :data="basicLoader.data.value"
              @retry="basicLoader.retry"
            >
              <template #default="{ data }">
                <div v-if="data" class="bg-blue-50 p-3 rounded">
                  <div class="font-medium text-blue-900">Manual Loading Complete</div>
                  <div class="text-blue-700 text-sm">
                    {{ data.applications.length }} applications loaded
                  </div>
                </div>
              </template>
            </MAsyncLoader>
            
            <div class="text-xs text-gray-500 space-y-1">
              <div>Attempts: {{ basicLoader.attempts.value }}</div>
              <div>Can Retry: {{ basicLoader.canRetry.value ? 'Yes' : 'No' }}</div>
            </div>
          </div>
        </MCard>
        
        <!-- Async Data Hook -->
        <MCard title="useAsyncData Hook" subtitle="Automatic data management with caching">
          <div class="space-y-4">
            <div class="flex gap-2">
              <MButton 
                @click="executeAsync" 
                :loading="asyncLoading" 
                text="Load Data"
                size="small"
              />
              <MButton 
                @click="refreshAsync" 
                :loading="asyncLoading" 
                text="Refresh"
                variant="outlined"
                size="small"
              />
            </div>
            
            <MAsyncLoader
              :loading="asyncLoading"
              :error="asyncError"
              :data="asyncData"
              @retry="refreshAsync"
            >
              <template #default="{ data }">
                <div v-if="data" class="bg-green-50 p-3 rounded">
                  <div class="font-medium text-green-900">Cached Data Loaded</div>
                  <div class="text-green-700 text-sm mb-2">
                    Total: \{{ data.total.toLocaleString() }}
                  </div>
                  <div class="text-xs text-green-600">
                    Transformed at: {{ new Date(data.transformedAt).toLocaleTimeString() }}
                  </div>
                </div>
              </template>
            </MAsyncLoader>
          </div>
        </MCard>
      </div>
    `
  })
};

// Financial Use Cases
export const FinancialUseCases = {
  render: () => ({
    components: { MAsyncLoader, MButton },
    setup() {
      const loanApplications = reactive({
        loading: false,
        error: null,
        data: null
      });
      
      const creditReports = reactive({
        loading: false,
        error: null,
        data: null
      });
      
      const paymentHistory = reactive({
        loading: false,
        error: null,
        data: null
      });
      
      const loadLoanApplications = async () => {
        loanApplications.loading = true;
        loanApplications.error = null;
        loanApplications.data = null;
        
        try {
          await new Promise(resolve => setTimeout(resolve, 2000));
          loanApplications.data = {
            applications: [
              { id: 'LA-001', applicant: 'John Smith', amount: 25000, status: 'Under Review', submittedAt: '2025-06-08' },
              { id: 'LA-002', applicant: 'Sarah Johnson', amount: 15000, status: 'Approved', submittedAt: '2025-06-07' },
              { id: 'LA-003', applicant: 'Mike Brown', amount: 35000, status: 'Pending Documents', submittedAt: '2025-06-09' }
            ],
            summary: {
              total: 3,
              approved: 1,
              pending: 2,
              totalAmount: 75000
            }
          };
        } catch (err) {
          loanApplications.error = err.message;
        } finally {
          loanApplications.loading = false;
        }
      };
      
      const loadCreditReports = async () => {
        creditReports.loading = true;
        creditReports.error = null;
        creditReports.data = null;
        
        try {
          await new Promise(resolve => setTimeout(resolve, 1800));
          creditReports.data = {
            reports: [
              { bureau: 'Experian', score: 742, date: '2025-06-01', status: 'Current' },
              { bureau: 'Equifax', score: 738, date: '2025-06-01', status: 'Current' },
              { bureau: 'TransUnion', score: 745, date: '2025-06-01', status: 'Current' }
            ],
            average: 742,
            trend: '+12 points (30 days)'
          };
        } catch (err) {
          creditReports.error = err.message;
        } finally {
          creditReports.loading = false;
        }
      };
      
      const loadPaymentHistory = async () => {
        paymentHistory.loading = true;
        paymentHistory.error = null;
        paymentHistory.data = null;
        
        try {
          // Simulate occasional failure
          if (Math.random() > 0.7) {
            throw new Error('Payment service temporarily unavailable');
          }
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          paymentHistory.data = {
            payments: [
              { id: 'PMT-001', amount: 847.32, date: '2025-06-01', status: 'Completed' },
              { id: 'PMT-002', amount: 847.32, date: '2025-05-01', status: 'Completed' },
              { id: 'PMT-003', amount: 847.32, date: '2025-04-01', status: 'Completed' }
            ],
            nextPayment: { amount: 847.32, dueDate: '2025-07-01' },
            totalPaid: 2541.96
          };
        } catch (err) {
          paymentHistory.error = err.message;
        } finally {
          paymentHistory.loading = false;
        }
      };
      
      return {
        loanApplications,
        creditReports,
        paymentHistory,
        loadLoanApplications,
        loadCreditReports,
        loadPaymentHistory
      };
    },
    template: `
      <div class="space-y-8">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Financial Dashboard</h2>
          <p class="text-gray-600">Real-world loading scenarios for financial applications</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Loan Applications -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-900">Loan Applications</h3>
                <MButton 
                  @click="loadLoanApplications" 
                  :loading="loanApplications.loading"
                  text="Refresh"
                  size="small"
                  variant="outlined"
                />
              </div>
            </div>
            
            <div class="p-6">
              <MAsyncLoader
                :loading="loanApplications.loading"
                :error="loanApplications.error"
                :data="loanApplications.data"
                :loading-props="{ variant: 'list', items: 3, showActions: false }"
                @retry="loadLoanApplications"
              >
                <template #default="{ data }">
                  <div v-if="data" class="space-y-4">
                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <div class="bg-blue-50 p-3 rounded">
                        <div class="text-lg font-bold text-blue-600">{{ data.summary.total }}</div>
                        <div class="text-sm text-blue-800">Total Applications</div>
                      </div>
                      <div class="bg-green-50 p-3 rounded">
                        <div class="text-lg font-bold text-green-600">{{ data.summary.approved }}</div>
                        <div class="text-sm text-green-800">Approved</div>
                      </div>
                    </div>
                    
                    <div class="space-y-2">
                      <div 
                        v-for="app in data.applications" 
                        :key="app.id"
                        class="p-3 border border-gray-200 rounded"
                      >
                        <div class="font-medium text-sm">{{ app.applicant }}</div>
                        <div class="text-xs text-gray-600">{{ app.id }} • \${{ app.amount.toLocaleString() }}</div>
                        <div class="text-xs mt-1">
                          <span :class="[
                            'px-2 py-1 rounded-full text-xs',
                            app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                            app.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          ]">
                            {{ app.status }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </MAsyncLoader>
            </div>
          </div>
          
          <!-- Credit Reports -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-900">Credit Reports</h3>
                <MButton 
                  @click="loadCreditReports" 
                  :loading="creditReports.loading"
                  text="Update"
                  size="small"
                  variant="outlined"
                />
              </div>
            </div>
            
            <div class="p-6">
              <MAsyncLoader
                :loading="creditReports.loading"
                :error="creditReports.error"
                :data="creditReports.data"
                :loading-props="{ variant: 'card', showImage: false, contentLines: 4 }"
                @retry="loadCreditReports"
              >
                <template #default="{ data }">
                  <div v-if="data" class="space-y-4">
                    <div class="text-center bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded">
                      <div class="text-2xl font-bold text-gray-900">{{ data.average }}</div>
                      <div class="text-sm text-gray-600">Average Score</div>
                      <div class="text-xs text-green-600 mt-1">{{ data.trend }}</div>
                    </div>
                    
                    <div class="space-y-2">
                      <div 
                        v-for="report in data.reports" 
                        :key="report.bureau"
                        class="flex justify-between items-center p-2 border border-gray-200 rounded"
                      >
                        <div>
                          <div class="font-medium text-sm">{{ report.bureau }}</div>
                          <div class="text-xs text-gray-600">{{ report.date }}</div>
                        </div>
                        <div class="text-right">
                          <div class="font-bold text-lg">{{ report.score }}</div>
                          <div class="text-xs text-green-600">{{ report.status }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </MAsyncLoader>
            </div>
          </div>
          
          <!-- Payment History -->
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h3 class="font-semibold text-gray-900">Payment History</h3>
                <MButton 
                  @click="loadPaymentHistory" 
                  :loading="paymentHistory.loading"
                  text="Refresh"
                  size="small"
                  variant="outlined"
                />
              </div>
            </div>
            
            <div class="p-6">
              <MAsyncLoader
                :loading="paymentHistory.loading"
                :error="paymentHistory.error"
                :data="paymentHistory.data"
                :loading-props="{ variant: 'table', rows: 4, columns: 3 }"
                @retry="loadPaymentHistory"
              >
                <template #default="{ data }">
                  <div v-if="data" class="space-y-4">
                    <div class="bg-yellow-50 p-3 rounded">
                      <div class="text-sm font-medium text-yellow-800">Next Payment</div>
                      <div class="text-lg font-bold text-yellow-900">
                        \{{ data.nextPayment.amount }}
                      </div>
                      <div class="text-xs text-yellow-700">Due {{ data.nextPayment.dueDate }}</div>
                    </div>
                    
                    <div class="space-y-2">
                      <div class="text-sm font-medium text-gray-700">Recent Payments</div>
                      <div 
                        v-for="payment in data.payments" 
                        :key="payment.id"
                        class="flex justify-between items-center p-2 border border-gray-200 rounded"
                      >
                        <div>
                          <div class="font-medium text-sm">\{{ payment.amount }}</div>
                          <div class="text-xs text-gray-600">{{ payment.date }}</div>
                        </div>
                        <div class="text-xs">
                          <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                            {{ payment.status }}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="bg-gray-50 p-3 rounded">
                      <div class="text-sm text-gray-600">Total Paid This Year</div>
                      <div class="font-bold text-gray-900">\{{ data.totalPaid }}</div>
                    </div>
                  </div>
                </template>
              </MAsyncLoader>
            </div>
          </div>
        </div>
      </div>
    `
  })
};
