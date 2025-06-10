import { ref, reactive, computed, onMounted } from 'vue';
import MSkeleton from '../../components/ui/MSkeleton.vue';
import MSkeletonGroup from '../../components/ui/MSkeletonGroup.vue';
import MAsyncLoader from '../../components/ui/MAsyncLoader.vue';
import MMotionRipple from '../../components/ui/MMotionRipple.vue';
import MMotionTransition from '../../components/ui/MMotionTransition.vue';
import MMotionFeedback from '../../components/ui/MMotionFeedback.vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';
import { useLoadingState, useAsyncData } from '../../composables/useLoadingState.js';

export default {
  title: 'Loading & Motion System/Complete Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of skeleton loading components, HOC wrappers for API calls, and interactive motion states for enhanced user feedback in financial applications.'
      }
    }
  }
};

// Mock API functions for demonstrations
const mockApiCall = (delay = 2000, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network error occurred'));
      } else {
        resolve({
          loanApplications: [
            { id: 'LA-001', applicant: 'John Smith', amount: 25000, status: 'approved' },
            { id: 'LA-002', applicant: 'Sarah Johnson', amount: 15000, status: 'pending' },
            { id: 'LA-003', applicant: 'Mike Brown', amount: 35000, status: 'under review' }
          ],
          summary: {
            totalApplications: 3,
            approvedAmount: 25000,
            pendingAmount: 50000
          }
        });
      }
    }, delay);
  });
};

const mockSlowApiCall = () => mockApiCall(4000);
const mockFastApiCall = () => mockApiCall(800);
const mockFailingApiCall = () => mockApiCall(1500, true);

// Skeleton Showcase Template
const SkeletonShowcaseTemplate = () => ({
  components: {
    MSkeleton,
    MSkeletonGroup,
    MCard
  },
  
  setup() {
    const selectedVariant = ref('text-block');
    const animationSpeed = ref('normal');
    const showCustom = ref(false);
    
    const skeletonVariants = [
      'text-block',
      'card', 
      'list',
      'table'
    ];
    
    const singleVariants = [
      'circular',
      'rectangular',
      'rounded',
      'text',
      'button',
      'avatar'
    ];
    
    return {
      selectedVariant,
      animationSpeed,
      showCustom,
      skeletonVariants,
      singleVariants
    };
  },
  
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Skeleton Loading Components</h1>
          <p class="text-gray-600">Comprehensive skeleton loading states for financial applications</p>
        </div>
        
        <!-- Controls -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Controls</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Group Variant</label>
              <select v-model="selectedVariant" class="w-full p-2 border border-gray-300 rounded-md">
                <option v-for="variant in skeletonVariants" :key="variant" :value="variant">
                  {{ variant.charAt(0).toUpperCase() + variant.slice(1).replace('-', ' ') }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Animation Speed</label>
              <select v-model="animationSpeed" class="w-full p-2 border border-gray-300 rounded-md">
                <option value="slow">Slow</option>
                <option value="normal">Normal</option>
                <option value="fast">Fast</option>
              </select>
            </div>
            
            <div>
              <label class="flex items-center">
                <input v-model="showCustom" type="checkbox" class="mr-2">
                Show Custom Skeletons
              </label>
            </div>
          </div>
        </div>
        
        <!-- Skeleton Group Examples -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MCard title="Group Skeleton" subtitle="Structured loading layouts">
            <MSkeletonGroup
              :variant="selectedVariant"
              :animation-speed="animationSpeed"
              :lines="4"
              :items="3"
              :rows="5"
              :columns="4"
              :show-avatar="true"
              :show-image="selectedVariant === 'card'"
              :show-actions="selectedVariant === 'list'"
            />
          </MCard>
          
          <MCard title="Financial Dashboard" subtitle="Real-world example">
            <MSkeletonGroup
              variant="card"
              :animation-speed="animationSpeed"
              :show-image="true"
              :content-lines="3"
              class="mb-4"
            />
            <MSkeletonGroup
              variant="table"
              :animation-speed="animationSpeed"
              :rows="4"
              :columns="5"
            />
          </MCard>
        </div>
        
        <!-- Individual Skeleton Examples -->
        <div v-if="showCustom" class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Individual Skeleton Components</h3>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div v-for="variant in singleVariants" :key="variant" class="text-center">
              <div class="mb-2">
                <MSkeleton
                  :variant="variant"
                  :width="variant === 'text' ? '100%' : variant === 'button' ? '120px' : '80px'"
                  :height="variant === 'text' ? '16px' : undefined"
                  :animation-speed="animationSpeed"
                />
              </div>
              <span class="text-xs text-gray-500">{{ variant }}</span>
            </div>
          </div>
        </div>
        
        <!-- Complex Financial Card Layout -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Complex Financial Card Layout</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loan Application Card -->
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center gap-3 mb-4">
                <MSkeleton variant="avatar" width="48px" height="48px" :animated="true" />
                <div class="flex-1">
                  <MSkeleton variant="text" width="75%" height="16px" class="mb-2" :animated="true" />
                  <MSkeleton variant="text" width="50%" height="14px" :animated="true" />
                </div>
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between">
                  <MSkeleton variant="text" width="40%" height="14px" :animated="true" />
                  <MSkeleton variant="text" width="30%" height="14px" :animated="true" />
                </div>
                <div class="flex justify-between">
                  <MSkeleton variant="text" width="35%" height="14px" :animated="true" />
                  <MSkeleton variant="text" width="25%" height="14px" :animated="true" />
                </div>
                <MSkeleton variant="rectangular" width="100%" height="4px" :animated="true" />
                <div class="flex gap-2 pt-2">
                  <MSkeleton variant="button" width="80px" height="32px" :animated="true" />
                  <MSkeleton variant="button" width="80px" height="32px" :animated="true" />
                </div>
              </div>
            </div>
            
            <!-- Chart Placeholder -->
            <div class="border border-gray-200 rounded-lg p-4">
              <MSkeleton variant="text" width="60%" height="18px" class="mb-4" :animated="true" />
              <MSkeleton variant="rectangular" width="100%" height="160px" class="mb-4" :animated="true" />
              <div class="flex justify-between">
                <MSkeleton variant="text" width="30%" height="12px" :animated="true" />
                <MSkeleton variant="text" width="30%" height="12px" :animated="true" />
                <MSkeleton variant="text" width="30%" height="12px" :animated="true" />
              </div>
            </div>
            
            <!-- Stats Card -->
            <div class="border border-gray-200 rounded-lg p-4">
              <MSkeleton variant="text" width="50%" height="16px" class="mb-4" :animated="true" />
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center">
                  <MSkeleton variant="text" width="100%" height="24px" class="mb-1" :animated="true" />
                  <MSkeleton variant="text" width="70%" height="12px" :animated="true" />
                </div>
                <div class="text-center">
                  <MSkeleton variant="text" width="100%" height="24px" class="mb-1" :animated="true" />
                  <MSkeleton variant="text" width="70%" height="12px" :animated="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
});

// Async Loader Showcase Template
const AsyncLoaderShowcaseTemplate = () => ({
  components: {
    MAsyncLoader,
    MSkeletonGroup,
    MCard,
    MButton
  },
  
  setup() {
    const { isLoading, error, data, retry, executeWithLoading } = useLoadingState({
      minLoadingTime: 1000,
      autoRetry: false,
      retryCount: 3,
      onError: (err) => console.error('Loading error:', err),
      onSuccess: (data) => console.log('Data loaded:', data)
    });
    
    const scenarios = reactive({
      basic: { loading: false, error: null, data: null },
      slow: { loading: false, error: null, data: null },
      failing: { loading: false, error: null, data: null },
      autoRetry: { loading: false, error: null, data: null }
    });
    
    const loadData = async (scenario) => {
      scenarios[scenario].loading = true;
      scenarios[scenario].error = null;
      scenarios[scenario].data = null;
      
      try {
        let result;
        switch (scenario) {
          case 'slow':
            result = await mockSlowApiCall();
            break;
          case 'failing':
            result = await mockFailingApiCall();
            break;
          case 'autoRetry':
            result = await mockApiCall(1500, Math.random() > 0.6);
            break;
          default:
            result = await mockFastApiCall();
        }
        
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
      isLoading,
      error,
      data,
      retry,
      executeWithLoading,
      scenarios,
      loadData,
      handleRetry
    };
  },
  
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Async Loader Components</h1>
          <p class="text-gray-600">HOC wrappers for API calls with comprehensive loading states</p>
        </div>
        
        <!-- Main Async Example -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Main Async Data Loader</h3>
          <div class="flex gap-4 mb-6">
            <MButton 
              @click="executeWithLoading(() => mockFastApiCall())"
              :loading="isLoading"
              text="Load Fast Data"
              variant="outlined"
            />
            <MButton 
              @click="executeWithLoading(() => mockSlowApiCall())"
              :loading="isLoading"
              text="Load Slow Data"
              variant="outlined"
            />
            <MButton 
              @click="executeWithLoading(() => mockFailingApiCall())"
              :loading="isLoading"
              text="Trigger Error"
              variant="outlined"
              color="error"
            />
          </div>
          
          <MAsyncLoader
            :loading="isLoading"
            :error="error"
            :data="data"
            :loading-props="{ variant: 'card', animated: true, lines: 3 }"
            @retry="retry"
          >
            <template #default="{ data }">
              <div v-if="data" class="space-y-4">
                <h4 class="font-semibold text-gray-900">Loan Applications Data</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    v-for="application in data.loanApplications" 
                    :key="application.id"
                    class="border border-gray-200 rounded-lg p-4"
                  >
                    <div class="font-medium">{{ application.applicant }}</div>
                    <div class="text-sm text-gray-600">$\{{ application.amount.toLocaleString() }}</div>
                    <div class="text-xs text-blue-600 mt-1">{{ application.status }}</div>
                  </div>
                </div>
                
                <div class="bg-gray-50 rounded-lg p-4">
                  <h5 class="font-medium mb-2">Summary</h5>
                  <div class="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div class="text-gray-600">Total Applications</div>
                      <div class="font-semibold">{{ data.summary.totalApplications }}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Approved Amount</div>
                      <div class="font-semibold text-green-600">$\{{ data.summary.approvedAmount.toLocaleString() }}</div>
                    </div>
                    <div>
                      <div class="text-gray-600">Pending Amount</div>
                      <div class="font-semibold text-yellow-600">$\{{ data.summary.pendingAmount.toLocaleString() }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </MAsyncLoader>
        </div>
        
        <!-- Multiple Scenario Examples -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Different Loading Scenarios -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900">Loading Scenarios</h3>
            
            <!-- Fast Loading -->
            <MCard title="Fast Loading (800ms)" subtitle="Quick API response">
              <div class="mb-4">
                <MButton 
                  @click="loadData('basic')"
                  :loading="scenarios.basic.loading"
                  text="Load Data"
                  variant="filled"
                  size="small"
                />
              </div>
              
              <MAsyncLoader
                :loading="scenarios.basic.loading"
                :error="scenarios.basic.error"
                :data="scenarios.basic.data"
                :loading-props="{ variant: 'list', items: 2, animated: true }"
                @retry="handleRetry('basic')"
              >
                <template #default="{ data }">
                  <div v-if="data" class="text-sm">
                    <div class="font-medium text-green-600">✓ Data loaded successfully</div>
                    <div class="text-gray-600">{{ data.loanApplications.length }} applications found</div>
                  </div>
                </template>
              </MAsyncLoader>
            </MCard>
            
            <!-- Slow Loading -->
            <MCard title="Slow Loading (4s)" subtitle="Simulated slow network">
              <div class="mb-4">
                <MButton 
                  @click="loadData('slow')"
                  :loading="scenarios.slow.loading"
                  text="Load Slow Data"
                  variant="filled"
                  size="small"
                />
              </div>
              
              <MAsyncLoader
                :loading="scenarios.slow.loading"
                :error="scenarios.slow.error"
                :data="scenarios.slow.data"
                :loading-props="{ variant: 'table', rows: 3, columns: 3, animated: true }"
                @retry="handleRetry('slow')"
              >
                <template #default="{ data }">
                  <div v-if="data" class="text-sm">
                    <div class="font-medium text-green-600">✓ Slow data loaded</div>
                    <div class="text-gray-600">Total amount: $\{{ data.summary.approvedAmount.toLocaleString() }}</div>
                  </div>
                </template>
              </MAsyncLoader>
            </MCard>
          </div>
          
          <!-- Error Scenarios -->
          <div class="space-y-6">
            <h3 class="text-lg font-semibold text-gray-900">Error Scenarios</h3>
            
            <!-- Failing Request -->
            <MCard title="Network Error" subtitle="Simulated API failure">
              <div class="mb-4">
                <MButton 
                  @click="loadData('failing')"
                  :loading="scenarios.failing.loading"
                  text="Trigger Error"
                  variant="outlined"
                  color="error"
                  size="small"
                />
              </div>
              
              <MAsyncLoader
                :loading="scenarios.failing.loading"
                :error="scenarios.failing.error"
                :data="scenarios.failing.data"
                :loading-props="{ variant: 'card', animated: true }"
                :show-retry="true"
                @retry="handleRetry('failing')"
              >
                <template #default="{ data }">
                  <div v-if="data" class="text-sm">
                    <div class="font-medium text-green-600">✓ Data recovered successfully</div>
                  </div>
                </template>
              </MAsyncLoader>
            </MCard>
            
            <!-- Auto Retry -->
            <MCard title="Auto Retry (40% fail rate)" subtitle="Demonstrates retry logic">
              <div class="mb-4">
                <MButton 
                  @click="loadData('autoRetry')"
                  :loading="scenarios.autoRetry.loading"
                  text="Load with Auto Retry"
                  variant="filled"
                  size="small"
                />
              </div>
              
              <MAsyncLoader
                :loading="scenarios.autoRetry.loading"
                :error="scenarios.autoRetry.error"
                :data="scenarios.autoRetry.data"
                :loading-props="{ variant: 'text-block', lines: 2, animated: true }"
                :auto-retry-count="2"
                :auto-retry-delay="1000"
                @retry="handleRetry('autoRetry')"
              >
                <template #default="{ data }">
                  <div v-if="data" class="text-sm">
                    <div class="font-medium text-green-600">✓ Auto retry successful</div>
                    <div class="text-gray-600">Data loaded after potential retries</div>
                  </div>
                </template>
              </MAsyncLoader>
            </MCard>
          </div>
        </div>
      </div>
    </div>
  `
});

// Motion Components Showcase
const MotionShowcaseTemplate = () => ({
  components: {
    MMotionRipple,
    MMotionTransition,
    MMotionFeedback,
    MCard,
    MButton
  },
  
  setup() {
    const showElements = ref([true, true, true]);
    const feedbackState = ref('idle');
    const selectedTransition = ref('fade');
    const rippleColor = ref('rgba(59, 130, 246, 0.3)');
    
    const transitions = [
      'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right',
      'scale', 'zoom', 'flip', 'bounce', 'elastic', 'shake', 'pulse'
    ];
    
    const feedbackStates = [
      'idle', 'active', 'loading', 'success', 'error', 'warning', 'disabled'
    ];
    
    const toggleElement = (index) => {
      showElements.value[index] = !showElements.value[index];
    };
    
    const cycleFeedbackState = () => {
      const currentIndex = feedbackStates.indexOf(feedbackState.value);
      const nextIndex = (currentIndex + 1) % feedbackStates.length;
      feedbackState.value = feedbackStates[nextIndex];
    };
    
    const simulateAsyncAction = () => {
      feedbackState.value = 'loading';
      
      setTimeout(() => {
        feedbackState.value = Math.random() > 0.5 ? 'success' : 'error';
        
        setTimeout(() => {
          feedbackState.value = 'idle';
        }, 2000);
      }, 2000);
    };
    
    return {
      showElements,
      feedbackState,
      selectedTransition,
      rippleColor,
      transitions,
      feedbackStates,
      toggleElement,
      cycleFeedbackState,
      simulateAsyncAction
    };
  },
  
  template: `
    <div class="min-h-screen bg-gray-50 p-6">
      <div class="max-w-7xl mx-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Motion & Animation Components</h1>
          <p class="text-gray-600">Interactive feedback and micro-animations for enhanced UX</p>
        </div>
        
        <!-- Motion Controls -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Controls</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Transition Type</label>
              <select v-model="selectedTransition" class="w-full p-2 border border-gray-300 rounded-md">
                <option v-for="transition in transitions" :key="transition" :value="transition">
                  {{ transition.charAt(0).toUpperCase() + transition.slice(1).replace('-', ' ') }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Feedback State</label>
              <select v-model="feedbackState" class="w-full p-2 border border-gray-300 rounded-md">
                <option v-for="state in feedbackStates" :key="state" :value="state">
                  {{ state.charAt(0).toUpperCase() + state.slice(1) }}
                </option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Ripple Color</label>
              <input 
                v-model="rippleColor" 
                type="text"
                placeholder="rgba(59, 130, 246, 0.3)"
                class="w-full p-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
        
        <!-- Ripple Effects -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <MCard title="Ripple Effects" subtitle="Click interactions with material design ripples">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <MMotionRipple 
                  :color="rippleColor"
                  class="bg-blue-100 hover:bg-blue-200 rounded-lg p-4 transition-colors"
                >
                  <div class="text-center">
                    <div class="text-sm font-medium">Primary Button</div>
                    <div class="text-xs text-gray-600">Click for ripple</div>
                  </div>
                </MMotionRipple>
                
                <MMotionRipple 
                  color="rgba(16, 185, 129, 0.3)"
                  center
                  class="bg-green-100 hover:bg-green-200 rounded-lg p-4 transition-colors"
                >
                  <div class="text-center">
                    <div class="text-sm font-medium">Centered Ripple</div>
                    <div class="text-xs text-gray-600">Always from center</div>
                  </div>
                </MMotionRipple>
              </div>
              
              <MMotionRipple 
                color="rgba(239, 68, 68, 0.3)"
                unbounded
                class="bg-red-100 hover:bg-red-200 rounded-lg p-6 transition-colors"
              >
                <div class="text-center">
                  <div class="text-lg font-medium">Unbounded Ripple</div>
                  <div class="text-sm text-gray-600">Ripple extends beyond boundaries</div>
                  <div class="text-xs text-gray-500 mt-2">Perfect for floating action buttons</div>
                </div>
              </MMotionRipple>
            </div>
          </MCard>
          
          <!-- Transitions -->
          <MCard title="Transition Effects" subtitle="Show/hide animations">
            <div class="space-y-4">
              <div class="flex gap-2 mb-4">
                <button 
                  v-for="(show, index) in showElements"
                  :key="index"
                  @click="toggleElement(index)"
                  class="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                >
                  Toggle {{ index + 1 }}
                </button>
              </div>
              
              <div class="space-y-3 min-h-[200px]">
                <MMotionTransition 
                  v-for="(show, index) in showElements"
                  :key="index"
                  :name="selectedTransition"
                  :duration="300"
                >
                  <div 
                    v-if="show" 
                    class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4"
                  >
                    <div class="font-medium text-blue-900">Financial Card {{ index + 1 }}</div>
                    <div class="text-sm text-blue-700">Loan Application #LA-{{ String(index + 1).padStart(3, '0') }}</div>
                    <div class="text-xs text-blue-600 mt-1">{{ selectedTransition }} transition</div>
                  </div>
                </MMotionTransition>
              </div>
            </div>
          </MCard>
        </div>
        
        <!-- Motion Feedback -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Motion Feedback Components</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Basic Feedback -->
            <MMotionFeedback
              :state="feedbackState"
              hover
              focus
              clickable
              class="bg-white border-2 border-gray-200 rounded-lg p-4"
            >
              <template #default="{ state, isHovered, isFocused }">
                <div class="text-center">
                  <div class="text-lg font-medium">{{ state.charAt(0).toUpperCase() + state.slice(1) }}</div>
                  <div class="text-sm text-gray-600 mt-1">
                    {{ isHovered ? 'Hovered' : isFocused ? 'Focused' : 'Interactive Card' }}
                  </div>
                </div>
              </template>
            </MMotionFeedback>
            
            <!-- With Indicators -->
            <MMotionFeedback
              :state="feedbackState"
              hover
              clickable
              show-indicators
              intensity="strong"
              class="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-medium text-purple-900">Status Indicators</div>
                <div class="text-sm text-purple-700">With visual feedback</div>
              </div>
            </MMotionFeedback>
            
            <!-- With Progress -->
            <MMotionFeedback
              :state="feedbackState"
              hover
              clickable
              show-progress
              :progress="feedbackState === 'loading' ? 45 : feedbackState === 'success' ? 100 : 0"
              class="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-medium text-green-900">With Progress</div>
                <div class="text-sm text-green-700">Shows completion state</div>
              </div>
            </MMotionFeedback>
            
            <!-- Financial Action Card -->
            <MMotionFeedback
              :state="feedbackState"
              hover
              clickable
              show-indicators
              show-progress
              :progress="feedbackState === 'loading' ? 65 : feedbackState === 'success' ? 100 : 0"
              intensity="medium"
              @click="simulateAsyncAction"
              class="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-4 cursor-pointer"
            >
              <div class="text-center">
                <div class="text-lg font-medium text-blue-900">Process Loan</div>
                <div class="text-sm text-blue-700">Click to simulate</div>
                <div class="text-xs text-blue-600 mt-1">Full feedback system</div>
              </div>
            </MMotionFeedback>
          </div>
          
          <div class="mt-6 flex gap-3 justify-center">
            <MButton 
              @click="cycleFeedbackState"
              text="Cycle State"
              variant="outlined"
              size="small"
            />
            <MButton 
              @click="simulateAsyncAction"
              text="Simulate Async Action"
              variant="filled"
              size="small"
            />
          </div>
        </div>
        
        <!-- Real-world Examples -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Real-world Financial Application Examples</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Loan Application Form -->
            <MMotionFeedback
              state="idle"
              hover
              clickable
              show-indicators
              intensity="subtle"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div class="p-4">
                <h4 class="font-semibold text-gray-900 mb-2">New Loan Application</h4>
                <p class="text-sm text-gray-600 mb-4">Start your loan application process</p>
                
                <MMotionRipple color="rgba(59, 130, 246, 0.2)">
                  <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
                    Begin Application
                  </button>
                </MMotionRipple>
              </div>
            </MMotionFeedback>
            
            <!-- Status Dashboard -->
            <MMotionFeedback
              state="success"
              hover
              show-indicators
              indicator-position="top-right"
              class="border border-green-200 rounded-lg bg-green-50"
            >
              <div class="p-4">
                <h4 class="font-semibold text-green-900 mb-2">Application Status</h4>
                <p class="text-sm text-green-700 mb-2">Application #LA-2024-001</p>
                <div class="text-lg font-bold text-green-800">Approved</div>
                <div class="text-sm text-green-600">$25,000 approved</div>
              </div>
            </MMotionFeedback>
            
            <!-- Payment Processing -->
            <MMotionFeedback
              state="loading"
              show-progress
              :progress="75"
              show-indicators
              class="border border-blue-200 rounded-lg bg-blue-50"
            >
              <div class="p-4">
                <h4 class="font-semibold text-blue-900 mb-2">Payment Processing</h4>
                <p class="text-sm text-blue-700 mb-2">Processing monthly payment</p>
                <div class="text-lg font-bold text-blue-800">$847.32</div>
                <div class="text-sm text-blue-600">Processing...</div>
              </div>
            </MMotionFeedback>
          </div>
        </div>
      </div>
    </div>
  `
});

// Main showcase combining all components
const CompleteLoadingShowcaseTemplate = () => ({
  components: {
    MSkeleton,
    MSkeletonGroup,
    MAsyncLoader,
    MMotionRipple,
    MMotionTransition,
    MMotionFeedback,
    MCard,
    MButton
  },
  
  setup() {
    const activeTab = ref('overview');
    const demoState = reactive({
      dashboardLoading: false,
      applicationLoading: false,
      paymentProcessing: false,
      error: null
    });
    
    const tabs = [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'skeleton', label: 'Skeleton', icon: '💀' },
      { id: 'async', label: 'Async Loader', icon: '🔄' },
      { id: 'motion', label: 'Motion', icon: '✨' }
    ];
    
    const simulateDashboardLoad = async () => {
      demoState.dashboardLoading = true;
      await new Promise(resolve => setTimeout(resolve, 2500));
      demoState.dashboardLoading = false;
    };
    
    const simulateApplicationSubmit = async () => {
      demoState.applicationLoading = true;
      await new Promise(resolve => setTimeout(resolve, 3000));
      demoState.applicationLoading = false;
    };
    
    const simulatePaymentProcess = async () => {
      demoState.paymentProcessing = true;
      await new Promise(resolve => setTimeout(resolve, 2000));
      demoState.paymentProcessing = false;
    };
    
    return {
      activeTab,
      demoState,
      tabs,
      simulateDashboardLoad,
      simulateApplicationSubmit,
      simulatePaymentProcess
    };
  },
  
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <h1 class="text-2xl font-bold text-gray-900">Financial Loading & Motion System</h1>
          <p class="text-gray-600 mt-1">Complete showcase of loading states and interactive feedback</p>
        </div>
      </div>
      
      <!-- Navigation -->
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-6">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              {{ tab.icon }} {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>
      
      <!-- Content -->
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Overview Tab -->
        <div v-if="activeTab === 'overview'" class="space-y-8">
          <div class="text-center mb-8">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Complete Loading System Demo</h2>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience a realistic financial application with comprehensive loading states, 
              skeleton loaders, async data management, and interactive motion feedback.
            </p>
          </div>
          
          <!-- Demo Controls -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Demo Controls</h3>
            <div class="flex flex-wrap gap-4">
              <MMotionFeedback
                :state="demoState.dashboardLoading ? 'loading' : 'idle'"
                hover
                clickable
                show-indicators
              >
                <MButton 
                  @click="simulateDashboardLoad"
                  :loading="demoState.dashboardLoading"
                  text="Load Dashboard"
                  variant="filled"
                />
              </MMotionFeedback>
              
              <MMotionFeedback
                :state="demoState.applicationLoading ? 'loading' : 'idle'"
                hover
                clickable
                show-indicators
              >
                <MButton 
                  @click="simulateApplicationSubmit"
                  :loading="demoState.applicationLoading"
                  text="Submit Application"
                  variant="outlined"
                />
              </MMotionFeedback>
              
              <MMotionFeedback
                :state="demoState.paymentProcessing ? 'loading' : 'idle'"
                hover
                clickable
                show-indicators
                show-progress
                :progress="demoState.paymentProcessing ? 60 : 0"
              >
                <MButton 
                  @click="simulatePaymentProcess"
                  :loading="demoState.paymentProcessing"
                  text="Process Payment"
                  variant="outlined"
                  color="success"
                />
              </MMotionFeedback>
            </div>
          </div>
          
          <!-- Live Dashboard Demo -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Main Dashboard Area -->
            <div class="lg:col-span-2">
              <MAsyncLoader
                :loading="demoState.dashboardLoading"
                :loading-props="{ variant: 'card', animated: true, showImage: true, contentLines: 4 }"
                variant="card"
              >
                <MCard title="Financial Dashboard" subtitle="Real-time loan metrics">
                  <div class="grid grid-cols-2 gap-4 mb-6">
                    <MMotionFeedback hover intensity="subtle" class="bg-blue-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-blue-600">$2.4M</div>
                      <div class="text-sm text-blue-800">Total Loans</div>
                    </MMotionFeedback>
                    
                    <MMotionFeedback hover intensity="subtle" class="bg-green-50 rounded-lg p-4">
                      <div class="text-2xl font-bold text-green-600">156</div>
                      <div class="text-sm text-green-800">Applications</div>
                    </MMotionFeedback>
                  </div>
                  
                  <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="font-medium">Processing Queue</span>
                      <span class="text-sm text-gray-600">12 pending</span>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span class="font-medium">Average Processing Time</span>
                      <span class="text-sm text-gray-600">2.4 days</span>
                    </div>
                  </div>
                </MCard>
              </MAsyncLoader>
            </div>
            
            <!-- Sidebar -->
            <div class="space-y-6">
              <!-- Application Form -->
              <MAsyncLoader
                :loading="demoState.applicationLoading"
                :loading-props="{ variant: 'list', items: 3, animated: true }"
              >
                <MCard title="Quick Application" subtitle="New loan request">
                  <div class="space-y-4">
                    <MMotionRipple class="w-full">
                      <input 
                        type="text" 
                        placeholder="Loan amount"
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </MMotionRipple>
                    
                    <MMotionRipple class="w-full">
                      <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option>Loan purpose</option>
                        <option>Home improvement</option>
                        <option>Debt consolidation</option>
                        <option>Business</option>
                      </select>
                    </MMotionRipple>
                    
                    <MMotionFeedback 
                      :state="demoState.applicationLoading ? 'loading' : 'idle'"
                      hover
                      clickable
                      class="w-full"
                    >
                      <button 
                        @click="simulateApplicationSubmit"
                        :disabled="demoState.applicationLoading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {{ demoState.applicationLoading ? 'Submitting...' : 'Submit Application' }}
                      </button>
                    </MMotionFeedback>
                  </div>
                </MCard>
              </MAsyncLoader>
              
              <!-- Payment Processing -->
              <MAsyncLoader
                :loading="demoState.paymentProcessing"
                :loading-props="{ variant: 'text-block', lines: 3, animated: true }"
              >
                <MCard title="Payment Center" subtitle="Monthly payment due">
                  <MMotionFeedback
                    :state="demoState.paymentProcessing ? 'loading' : 'idle'"
                    hover
                    clickable
                    show-progress
                    :progress="demoState.paymentProcessing ? 75 : 0"
                    class="space-y-3"
                  >
                    <div class="text-center">
                      <div class="text-2xl font-bold text-gray-900">$1,247.83</div>
                      <div class="text-sm text-gray-600">Due in 5 days</div>
                    </div>
                    
                    <button 
                      @click="simulatePaymentProcess"
                      :disabled="demoState.paymentProcessing"
                      class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {{ demoState.paymentProcessing ? 'Processing...' : 'Make Payment' }}
                    </button>
                  </MMotionFeedback>
                </MCard>
              </MAsyncLoader>
            </div>
          </div>
        </div>
        
        <!-- Other tabs would show individual component showcases -->
        <div v-if="activeTab === 'skeleton'">
          <SkeletonShowcase />
        </div>
        
        <div v-if="activeTab === 'async'">
          <AsyncLoaderShowcase />
        </div>
        
        <div v-if="activeTab === 'motion'">
          <MotionShowcase />
        </div>
      </div>
    </div>
  `
});

// Story exports
export const SkeletonShowcase = SkeletonShowcaseTemplate.bind({});
SkeletonShowcase.storyName = 'Skeleton Loading Components';

export const AsyncLoaderShowcase = AsyncLoaderShowcaseTemplate.bind({});
AsyncLoaderShowcase.storyName = 'Async Loader & HOC Wrappers';

export const MotionShowcase = MotionShowcaseTemplate.bind({});
MotionShowcase.storyName = 'Motion & Interactive Feedback';

export const CompleteLoadingShowcase = CompleteLoadingShowcaseTemplate.bind({});
CompleteLoadingShowcase.storyName = 'Complete Loading System Demo';
CompleteLoadingShowcase.parameters = {
  layout: 'fullscreen'
};
