import { ref, reactive } from 'vue';
import MMotionRipple from '../../components/ui/MMotionRipple.vue';
import MMotionTransition from '../../components/ui/MMotionTransition.vue';
import MMotionFeedback from '../../components/ui/MMotionFeedback.vue';
import MButton from '../../components/ui/MButton.vue';
import MCard from '../../components/ui/MCard.vue';

export default {
  title: 'Loading & Motion System/Motion Components',
  parameters: {
    docs: {
      description: {
        component: 'Interactive motion and animation components for enhanced user feedback and micro-interactions in financial applications.'
      }
    }
  }
};

// Ripple Effects
export const RippleEffects = {
  argTypes: {
    color: {
      control: { type: 'color' }
    },
    size: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 }
    },
    duration: {
      control: { type: 'range', min: 200, max: 1000, step: 50 }
    }
  },
  args: {
    color: 'rgba(59, 130, 246, 0.3)',
    size: 1,
    duration: 600,
    center: false,
    unbounded: false
  },
  render: (args) => ({
    components: { MMotionRipple },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Basic Ripple -->
          <MMotionRipple 
            v-bind="args"
            class="bg-blue-100 hover:bg-blue-200 rounded-lg p-6 transition-colors cursor-pointer"
          >
            <div class="text-center">
              <div class="text-lg font-medium text-blue-900">Basic Ripple</div>
              <div class="text-sm text-blue-700">Click anywhere</div>
            </div>
          </MMotionRipple>
          
          <!-- Centered Ripple -->
          <MMotionRipple 
            v-bind="args"
            center
            class="bg-green-100 hover:bg-green-200 rounded-lg p-6 transition-colors cursor-pointer"
          >
            <div class="text-center">
              <div class="text-lg font-medium text-green-900">Centered Ripple</div>
              <div class="text-sm text-green-700">Always from center</div>
            </div>
          </MMotionRipple>
          
          <!-- Unbounded Ripple -->
          <MMotionRipple 
            v-bind="args"
            unbounded
            class="bg-purple-100 hover:bg-purple-200 rounded-lg p-6 transition-colors cursor-pointer"
          >
            <div class="text-center">
              <div class="text-lg font-medium text-purple-900">Unbounded Ripple</div>
              <div class="text-sm text-purple-700">Extends beyond bounds</div>
            </div>
          </MMotionRipple>
        </div>
        
        <!-- Financial Button Examples -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4">Financial Application Examples</h3>
          <div class="flex flex-wrap gap-4">
            <MMotionRipple 
              color="rgba(34, 197, 94, 0.3)"
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Approve Loan
            </MMotionRipple>
            
            <MMotionRipple 
              color="rgba(239, 68, 68, 0.3)"
              class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Reject Application
            </MMotionRipple>
            
            <MMotionRipple 
              color="rgba(59, 130, 246, 0.3)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Process Payment
            </MMotionRipple>
            
            <MMotionRipple 
              color="rgba(168, 85, 247, 0.3)"
              unbounded
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-colors cursor-pointer"
            >
              Quick Action
            </MMotionRipple>
          </div>
        </div>
      </div>
    `
  })
};

// Transition Effects
export const TransitionEffects = {
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'zoom', 'flip', 'bounce', 'elastic', 'shake', 'pulse']
    },
    duration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 }
    }
  },
  args: {
    name: 'fade',
    duration: 300,
    appear: true
  },
  render: (args) => ({
    components: { MMotionTransition, MButton },
    setup() {
      const showElements = ref([true, true, true]);
      
      const toggleElement = (index) => {
        showElements.value[index] = !showElements.value[index];
      };
      
      const toggleAll = () => {
        const newState = !showElements.value.every(Boolean);
        showElements.value = [newState, newState, newState];
      };
      
      return {
        args,
        showElements,
        toggleElement,
        toggleAll
      };
    },
    template: `
      <div class="space-y-6">
        <!-- Controls -->
        <div class="flex gap-4 mb-6">
          <MButton @click="toggleAll" text="Toggle All" />
          <MButton 
            v-for="(show, index) in showElements"
            :key="index"
            @click="toggleElement(index)"
            :text="'Toggle ' + (index + 1)"
            variant="outlined"
            size="small"
          />
        </div>
        
        <!-- Transition Examples -->
        <div class="space-y-4 min-h-[400px]">
          <MMotionTransition 
            v-for="(show, index) in showElements"
            :key="index"
            v-bind="args"
          >
            <div 
              v-if="show" 
              class="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6"
            >              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span class="text-lg font-bold text-blue-600">\{{ index + 1 }}</span>
                </div>
                <div>
                  <div class="font-semibold text-blue-900">Financial Card \{{ index + 1 }}</div>
                  <div class="text-sm text-blue-700">Loan Application #LA-\{{ String(index + 1).padStart(3, '0') }}</div>
                  <div class="text-xs text-blue-600 mt-1">Transition: \{{ args.name }}</div>
                </div>
                <div class="ml-auto text-right">
                  <div class="text-lg font-bold text-blue-900">$25,000</div>
                  <div class="text-sm text-blue-700">Approved</div>
                </div>
              </div>
            </div>
          </MMotionTransition>
        </div>
        
        <!-- All Transition Types Demo -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4">All Transition Types</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <div 
              v-for="transition in ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'zoom', 'flip', 'bounce', 'elastic', 'shake', 'pulse']"
              :key="transition"
              class="text-center"
            >
              <div class="mb-2">
                <MMotionTransition :name="transition" :duration="400" appear>
                  <div class="w-16 h-16 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center mx-auto">
                    <span class="text-xs font-medium text-blue-700">{{ transition.charAt(0).toUpperCase() }}</span>
                  </div>
                </MMotionTransition>
              </div>
              <div class="text-xs text-gray-600">{{ transition }}</div>
            </div>
          </div>
        </div>
      </div>
    `
  })
};

// Motion Feedback
export const MotionFeedback = {
  argTypes: {
    state: {
      control: { type: 'select' },
      options: ['idle', 'active', 'loading', 'success', 'error', 'warning', 'disabled']
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'medium', 'strong']
    },
    indicatorPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center']
    }
  },
  args: {
    state: 'idle',
    hover: true,
    focus: true,
    clickable: true,
    intensity: 'medium',
    showIndicators: true,
    showProgress: false,
    progress: 0,
    indicatorPosition: 'top-right'
  },
  render: (args) => ({
    components: { MMotionFeedback, MButton },
    setup() {
      const currentState = ref('idle');
      const progress = ref(0);
      
      const states = ['idle', 'active', 'loading', 'success', 'error', 'warning', 'disabled'];
      
      const cycleState = () => {
        const currentIndex = states.indexOf(currentState.value);
        const nextIndex = (currentIndex + 1) % states.length;
        currentState.value = states[nextIndex];
      };
      
      const simulateProcess = () => {
        currentState.value = 'loading';
        progress.value = 0;
        
        const interval = setInterval(() => {
          progress.value += Math.random() * 20;
          
          if (progress.value >= 100) {
            clearInterval(interval);
            progress.value = 100;
            currentState.value = Math.random() > 0.3 ? 'success' : 'error';
            
            setTimeout(() => {
              currentState.value = 'idle';
              progress.value = 0;
            }, 2000);
          }
        }, 300);
      };
      
      return {
        args,
        currentState,
        progress,
        cycleState,
        simulateProcess
      };
    },
    template: `
      <div class="space-y-8">
        <!-- Interactive Controls -->
        <div class="flex gap-4">
          <MButton @click="cycleState" :text="'Current State: ' + currentState" />
          <MButton @click="simulateProcess" text="Simulate Process" variant="outlined" />
        </div>
        
        <!-- Single Feedback Component -->
        <div class="flex justify-center">
          <MMotionFeedback
            :state="currentState"
            v-bind="args"
            :progress="progress"
            class="w-64 h-32 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg"
          >
            <template #default="{ state, isHovered, isFocused }">
              <div class="flex flex-col items-center justify-center h-full text-center p-4">
                <div class="text-lg font-semibold text-blue-900 mb-1">
                  {{ state.charAt(0).toUpperCase() + state.slice(1) }} State
                </div>
                <div class="text-sm text-blue-700">
                  {{ isHovered ? 'Hovering' : isFocused ? 'Focused' : 'Interactive Card' }}
                </div>
                <div v-if="progress > 0" class="text-xs text-blue-600 mt-1">
                  Progress: {{ Math.round(progress) }}%
                </div>
              </div>
            </template>
          </MMotionFeedback>
        </div>
        
        <!-- Different Intensity Levels -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4">Intensity Levels</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MMotionFeedback
              state="idle"
              hover
              clickable
              intensity="subtle"
              class="bg-white border border-gray-200 rounded-lg p-4 text-center"
            >
              <div class="font-medium">Subtle</div>
              <div class="text-sm text-gray-600">Minimal feedback</div>
            </MMotionFeedback>
            
            <MMotionFeedback
              state="idle"
              hover
              clickable
              intensity="medium"
              class="bg-white border border-gray-200 rounded-lg p-4 text-center"
            >
              <div class="font-medium">Medium</div>
              <div class="text-sm text-gray-600">Balanced feedback</div>
            </MMotionFeedback>
            
            <MMotionFeedback
              state="idle"
              hover
              clickable
              intensity="strong"
              class="bg-white border border-gray-200 rounded-lg p-4 text-center"
            >
              <div class="font-medium">Strong</div>
              <div class="text-sm text-gray-600">Pronounced feedback</div>
            </MMotionFeedback>
          </div>
        </div>
        
        <!-- Financial Application Examples -->
        <div class="bg-gray-50 p-6 rounded-lg">
          <h3 class="font-semibold text-gray-900 mb-4">Financial Application Examples</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Loan Application Status -->
            <MMotionFeedback
              state="success"
              hover
              show-indicators
              indicator-position="top-right"
              class="bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-bold text-green-900">$25,000</div>
                <div class="text-sm text-green-700">Loan Approved</div>
                <div class="text-xs text-green-600 mt-1">Application #LA-001</div>
              </div>
            </MMotionFeedback>
            
            <!-- Payment Processing -->
            <MMotionFeedback
              state="loading"
              show-progress
              :progress="75"
              show-indicators
              class="bg-blue-50 border border-blue-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-bold text-blue-900">$847.32</div>
                <div class="text-sm text-blue-700">Processing Payment</div>
                <div class="text-xs text-blue-600 mt-1">75% Complete</div>
              </div>
            </MMotionFeedback>
            
            <!-- Credit Score Update -->
            <MMotionFeedback
              state="warning"
              hover
              show-indicators
              indicator-position="center"
              class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-bold text-yellow-900">742</div>
                <div class="text-sm text-yellow-700">Credit Score</div>
                <div class="text-xs text-yellow-600 mt-1">Needs Update</div>
              </div>
            </MMotionFeedback>
            
            <!-- Account Error -->
            <MMotionFeedback
              state="error"
              hover
              show-indicators
              indicator-position="top-left"
              class="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div class="text-center">
                <div class="text-lg font-bold text-red-900">Error</div>
                <div class="text-sm text-red-700">Payment Failed</div>
                <div class="text-xs text-red-600 mt-1">Retry Required</div>
              </div>
            </MMotionFeedback>
          </div>
        </div>
      </div>
    `
  })
};

// Combined Interactive Demo
export const InteractiveFinancialDemo = {
  render: () => ({
    components: { MMotionRipple, MMotionTransition, MMotionFeedback, MButton, MCard },
    setup() {
      const applications = ref([
        { id: 1, name: 'John Smith', amount: 25000, status: 'pending', visible: true },
        { id: 2, name: 'Sarah Johnson', amount: 15000, status: 'approved', visible: true },
        { id: 3, name: 'Mike Brown', amount: 35000, status: 'reviewing', visible: true }
      ]);
      
      const processingStates = reactive({
        1: 'idle',
        2: 'success', 
        3: 'idle'
      });
      
      const showAll = ref(true);
      
      const processApplication = async (app) => {
        processingStates[app.id] = 'loading';
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Random outcome
        const outcomes = ['success', 'error', 'warning'];
        processingStates[app.id] = outcomes[Math.floor(Math.random() * outcomes.length)];
        
        // Update application status
        if (processingStates[app.id] === 'success') {
          app.status = 'approved';
        } else if (processingStates[app.id] === 'error') {
          app.status = 'rejected';
        }
        
        // Reset after delay
        setTimeout(() => {
          processingStates[app.id] = 'idle';
        }, 3000);
      };
      
      const toggleVisibility = () => {
        showAll.value = !showAll.value;
        applications.value.forEach(app => {
          setTimeout(() => {
            app.visible = showAll.value;
          }, Math.random() * 500);
        });
      };
      
      const addApplication = () => {
        const newApp = {
          id: applications.value.length + 1,
          name: 'New Applicant',
          amount: Math.floor(Math.random() * 50000) + 10000,
          status: 'pending',
          visible: true
        };
        
        applications.value.push(newApp);
        processingStates[newApp.id] = 'idle';
      };
      
      const removeApplication = (id) => {
        const app = applications.value.find(a => a.id === id);
        if (app) {
          app.visible = false;
          setTimeout(() => {
            const index = applications.value.findIndex(a => a.id === id);
            if (index > -1) {
              applications.value.splice(index, 1);
              delete processingStates[id];
            }
          }, 300);
        }
      };
      
      return {
        applications,
        processingStates,
        showAll,
        processApplication,
        toggleVisibility,
        addApplication,
        removeApplication
      };
    },
    template: `
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Interactive Financial Dashboard</h2>
          <p class="text-gray-600">Experience motion feedback in a realistic loan processing interface</p>
        </div>
        
        <!-- Dashboard Controls -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <div class="flex flex-wrap gap-4 justify-center">
            <MMotionRipple color="rgba(59, 130, 246, 0.3)">
              <MButton @click="toggleVisibility" :text="showAll ? 'Hide All' : 'Show All'" />
            </MMotionRipple>
            
            <MMotionRipple color="rgba(34, 197, 94, 0.3)">
              <MButton @click="addApplication" text="Add Application" variant="outlined" />
            </MMotionRipple>
          </div>
        </div>
        
        <!-- Application Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MMotionTransition
            v-for="application in applications"
            :key="application.id"
            name="scale"
            :duration="300"
          >
            <MMotionFeedback
              v-if="application.visible"
              :state="processingStates[application.id]"
              hover
              clickable
              show-indicators
              show-progress
              :progress="processingStates[application.id] === 'loading' ? 65 : 0"
              intensity="medium"
              class="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              <div class="p-6">
                <!-- Header -->
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ application.name }}</h3>
                    <p class="text-sm text-gray-600">Application #LA-{{ String(application.id).padStart(3, '0') }}</p>
                  </div>
                  
                  <MMotionRipple 
                    color="rgba(239, 68, 68, 0.3)"
                    center
                    size="0.8"
                  >
                    <button 
                      @click="removeApplication(application.id)"
                      class="w-6 h-6 text-gray-400 hover:text-red-500 transition-colors"
                      :disabled="processingStates[application.id] === 'loading'"
                    >
                      ×
                    </button>
                  </MMotionRipple>
                </div>
                
                <!-- Amount -->                <div class="mb-4">
                  <div class="text-2xl font-bold text-gray-900">
                    $\{{ application.amount.toLocaleString() }}
                  </div>
                  <div class="text-sm">
                    <span :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      application.status === 'approved' ? 'bg-green-100 text-green-800' :
                      application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      application.status === 'reviewing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      \{{ application.status.charAt(0).toUpperCase() + application.status.slice(1) }}
                    </span>
                  </div>
                </div>
                
                <!-- Actions -->
                <div class="space-y-2">
                  <MMotionRipple 
                    color="rgba(34, 197, 94, 0.3)"
                    class="w-full"
                  >
                    <button
                      @click="processApplication(application)"
                      :disabled="processingStates[application.id] === 'loading'"
                      class="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded transition-colors"
                    >
                      {{ 
                        processingStates[application.id] === 'loading' ? 'Processing...' :
                        processingStates[application.id] === 'success' ? 'Approved!' :
                        processingStates[application.id] === 'error' ? 'Rejected' :
                        processingStates[application.id] === 'warning' ? 'Needs Review' :
                        'Process Application'
                      }}
                    </button>
                  </MMotionRipple>
                  
                  <div class="grid grid-cols-2 gap-2">
                    <MMotionRipple 
                      color="rgba(59, 130, 246, 0.3)"
                      class="w-full"
                    >
                      <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm transition-colors">
                        Review
                      </button>
                    </MMotionRipple>
                    
                    <MMotionRipple 
                      color="rgba(107, 114, 128, 0.3)"
                      class="w-full"
                    >
                      <button class="w-full bg-gray-600 hover:bg-gray-700 text-white py-1 px-3 rounded text-sm transition-colors">
                        Details
                      </button>
                    </MMotionRipple>
                  </div>
                </div>
              </div>
            </MMotionFeedback>
          </MMotionTransition>
        </div>
        
        <!-- Summary Stats -->
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-blue-900 mb-4">Dashboard Summary</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MMotionFeedback hover intensity="subtle" class="bg-white rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">{{ applications.length }}</div>
              <div class="text-sm text-blue-800">Total Applications</div>
            </MMotionFeedback>
            
            <MMotionFeedback hover intensity="subtle" class="bg-white rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ applications.filter(a => a.status === 'approved').length }}
              </div>
              <div class="text-sm text-green-800">Approved</div>
            </MMotionFeedback>
            
            <MMotionFeedback hover intensity="subtle" class="bg-white rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-yellow-600">
                {{ applications.filter(a => a.status === 'pending' || a.status === 'reviewing').length }}
              </div>
              <div class="text-sm text-yellow-800">Pending</div>
            </MMotionFeedback>
              <MMotionFeedback hover intensity="subtle" class="bg-white rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">
                \${{ applications.reduce((sum, app) => sum + app.amount, 0).toLocaleString() }}
              </div>
              <div class="text-sm text-purple-800">Total Value</div>
            </MMotionFeedback>
          </div>
        </div>
      </div>
    `
  })
};
