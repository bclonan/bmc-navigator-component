import MCircularProgress from '../../components/mui/MCircularProgress.vue';
import MLinearProgress from '../../components/mui/MLinearProgress.vue';

export default {
  title: 'MUI Components/Feedback/Progress',
  parameters: {
    docs: {
      description: {
        component: 'Material-UI Progress components for indicating loading states and completion status with Your Town Finance brand styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['determinate', 'indeterminate'],
      description: 'Progress variant',
      defaultValue: 'indeterminate'
    },
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0-100)',
      defaultValue: 0
    },
    size: {
      control: { type: 'number' },
      description: 'Size of circular progress',
      defaultValue: 40
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Progress color',
      defaultValue: 'primary'
    }
  }
};

export const CircularProgress = (args) => ({
  components: { MCircularProgress },
  setup() {
    return { args };
  },
  template: '<MCircularProgress v-bind="args" />'
});

CircularProgress.args = {
  variant: 'indeterminate',
  value: 0,
  size: 40,
  color: 'primary'
};

export const LinearProgress = (args) => ({
  components: { MLinearProgress },
  setup() {
    return { args };
  },
  template: '<MLinearProgress v-bind="args" class="mf-progress-primary" />'
});

LinearProgress.args = {
  variant: 'indeterminate',
  value: 0,
  color: 'primary'
};

export const LoanApplicationProgress = () => ({
  components: { MLinearProgress, MCircularProgress },
  data() {
    return {
      applicationProgress: 75,
      verificationProgress: 45,
      isProcessing: true
    };
  },
  template: `
    <div class="space-y-8 max-w-2xl">
      <div>
        <h4 class="text-lg font-semibold mb-4" style="color: var(--mf-primary);">Application Progress</h4>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium">Overall Progress</span>
              <span class="text-sm font-medium">{{ applicationProgress }}%</span>
            </div>
            <MLinearProgress :value="applicationProgress" variant="determinate" class="mf-progress-primary" />
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium">Document Verification</span>
              <span class="text-sm font-medium">{{ verificationProgress }}%</span>
            </div>
            <MLinearProgress :value="verificationProgress" variant="determinate" color="success" />
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm font-medium">Credit Check</span>
              <span class="text-sm font-medium">Processing...</span>
            </div>
            <MLinearProgress variant="indeterminate" color="warning" />
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="text-lg font-semibold mb-4" style="color: var(--mf-secondary);">Processing States</h4>
        <div class="grid grid-cols-2 gap-6">
          <div class="flex items-center space-x-3">
            <MCircularProgress :size="32" color="primary" />
            <span class="text-sm">Reviewing Application</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <MCircularProgress :size="32" color="success" />
            <span class="text-sm">Verifying Income</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <MCircularProgress :size="32" color="warning" />
            <span class="text-sm">Credit Assessment</span>
          </div>
          
          <div class="flex items-center space-x-3">
            <MCircularProgress :size="32" color="info" />
            <span class="text-sm">Final Review</span>
          </div>
        </div>
      </div>
    </div>
  `
});

export const ProgressSizes = () => ({
  components: { MCircularProgress, MLinearProgress },
  template: `
    <div class="space-y-8">
      <div>
        <h4 class="text-lg font-semibold mb-4">Circular Progress Sizes</h4>
        <div class="flex items-center space-x-6">
          <div class="text-center">
            <MCircularProgress :size="20" color="primary" />
            <p class="text-sm mt-2">Small (20px)</p>
          </div>
          <div class="text-center">
            <MCircularProgress :size="40" color="primary" />
            <p class="text-sm mt-2">Medium (40px)</p>
          </div>
          <div class="text-center">
            <MCircularProgress :size="60" color="primary" />
            <p class="text-sm mt-2">Large (60px)</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="text-lg font-semibold mb-4">Linear Progress Variants</h4>
        <div class="space-y-4">
          <div>
            <p class="text-sm mb-2">Indeterminate</p>
            <MLinearProgress variant="indeterminate" class="mf-progress-primary" />
          </div>
          <div>
            <p class="text-sm mb-2">Determinate (65%)</p>
            <MLinearProgress variant="determinate" :value="65" class="mf-progress-primary" />
          </div>
          <div>
            <p class="text-sm mb-2">Buffer (Progress: 70%, Buffer: 80%)</p>
            <MLinearProgress variant="buffer" :value="70" :value-buffer="80" />
          </div>
        </div>
      </div>
    </div>
  `
});

export const ProgressColors = () => ({
  components: { MCircularProgress, MLinearProgress },
  template: `
    <div class="space-y-8">
      <div>
        <h4 class="text-lg font-semibold mb-4">Circular Progress Colors</h4>
        <div class="flex items-center space-x-6 flex-wrap gap-4">
          <div class="text-center">
            <MCircularProgress color="primary" />
            <p class="text-sm mt-2">Primary</p>
          </div>
          <div class="text-center">
            <MCircularProgress color="secondary" />
            <p class="text-sm mt-2">Secondary</p>
          </div>
          <div class="text-center">
            <MCircularProgress color="success" />
            <p class="text-sm mt-2">Success</p>
          </div>
          <div class="text-center">
            <MCircularProgress color="warning" />
            <p class="text-sm mt-2">Warning</p>
          </div>
          <div class="text-center">
            <MCircularProgress color="error" />
            <p class="text-sm mt-2">Error</p>
          </div>
          <div class="text-center">
            <MCircularProgress color="info" />
            <p class="text-sm mt-2">Info</p>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="text-lg font-semibold mb-4">Linear Progress Colors</h4>
        <div class="space-y-4">
          <div>
            <p class="text-sm mb-2">Primary</p>
            <MLinearProgress :value="60" variant="determinate" color="primary" class="mf-progress-primary" />
          </div>
          <div>
            <p class="text-sm mb-2">Secondary</p>
            <MLinearProgress :value="60" variant="determinate" color="secondary" />
          </div>
          <div>
            <p class="text-sm mb-2">Success</p>
            <MLinearProgress :value="60" variant="determinate" color="success" />
          </div>
          <div>
            <p class="text-sm mb-2">Warning</p>
            <MLinearProgress :value="60" variant="determinate" color="warning" />
          </div>
          <div>
            <p class="text-sm mb-2">Error</p>
            <MLinearProgress :value="60" variant="determinate" color="error" />
          </div>
          <div>
            <p class="text-sm mb-2">Info</p>
            <MLinearProgress :value="60" variant="determinate" color="info" />
          </div>
        </div>
      </div>
    </div>
  `
});

export const Playground = (args) => ({
  components: { MCircularProgress, MLinearProgress },
  setup() {
    return { args };
  },
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Progress Playground</h3>
        <p class="text-gray-600">Customize progress indicators using the controls panel.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 class="text-lg font-semibold mb-4">Circular Progress</h4>
          <div class="flex justify-center">
            <MCircularProgress 
              v-bind="args"
              :class="args.color === 'primary' ? 'mf-progress-primary' : ''"
            />
          </div>
          <div class="mt-4 text-sm text-gray-600">
            Size: {{ args.size }}px, Value: {{ args.variant === 'determinate' ? args.value + '%' : 'Indeterminate' }}
          </div>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h4 class="text-lg font-semibold mb-4">Linear Progress</h4>
          <MLinearProgress 
            v-bind="args"
            :class="args.color === 'primary' ? 'mf-progress-primary' : ''"
          />
          <div class="mt-4 text-sm text-gray-600">
            Value: {{ args.variant === 'determinate' ? args.value + '%' : 'Indeterminate' }}
          </div>
        </div>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Use the Controls panel to modify progress properties and see real-time changes.
      </div>
    </div>
  `
});

Playground.args = {
  variant: 'determinate',
  value: 75,
  size: 40,
  color: 'primary'
};