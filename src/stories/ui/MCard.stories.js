import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'UI/Content/Card',
  component: MCard,
  parameters: {
    docs: {
      description: {
        component: 'A flexible card component with header, body, and footer sections. Supports multiple variants and padding options.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'flat']
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large']
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'small', 'normal', 'large']
    },
    clickable: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    }
  }
};

export const Default = {
  args: {
    title: 'Loan Application Status',
    subtitle: 'Track your application progress',
    variant: 'default',
    size: 'medium',
    padding: 'normal',
    clickable: false,
    loading: false
  },
  render: (args) => ({
    components: { MCard, MButton },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args">
        <template #actions>
          <MButton variant="outline" size="small">View Details</MButton>
        </template>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Application ID:</span>
            <span class="text-sm text-gray-900">#LA-2024-001</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Loan Amount:</span>
            <span class="text-sm text-gray-900">$25,000</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Status:</span>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Under Review
            </span>
          </div>
          <div class="pt-4 border-t border-gray-200">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 60%"></div>
            </div>
            <p class="text-xs text-gray-600 mt-2">60% Complete</p>
          </div>
        </div>
        
        <template #footer>
          <div class="flex justify-between items-center">
            <span class="text-sm text-gray-600">Last updated: 2 hours ago</span>
            <MButton variant="primary" size="small">Continue Application</MButton>
          </div>
        </template>
      </MCard>
    `
  })
};

export const Elevated = {
  args: {
    ...Default.args,
    variant: 'elevated'
  },
  render: Default.render
};

export const Outlined = {
  args: {
    ...Default.args,
    variant: 'outlined'
  },
  render: Default.render
};

export const Clickable = {
  args: {
    ...Default.args,
    clickable: true,
    title: 'Personal Loan Offer',
    subtitle: 'Pre-approved offer available'
  },
  render: (args) => ({
    components: { MCard },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args" @click="onClick">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">$15,000</p>
            <p class="text-sm text-gray-600">at 8.99% APR</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-green-600 font-medium">✓ Pre-approved</p>
            <p class="text-xs text-gray-500 mt-1">Click to view details</p>
          </div>
        </div>
      </MCard>
    `,
    methods: {
      onClick() {
        alert('Card clicked! Redirecting to loan details...');
      }
    }
  })
};

export const CustomerProfile = {
  args: {
    title: 'Customer Profile',
    variant: 'default',
    padding: 'normal'
  },
  render: (args) => ({
    components: { MCard, MButton },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args">
        <template #actions>
          <MButton variant="outline" size="small">Edit Profile</MButton>
        </template>
        
        <div class="flex items-start space-x-4">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" 
            alt="Customer" 
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex-1 space-y-3">
            <div>
              <h4 class="text-lg font-semibold text-gray-900">John Smith</h4>
              <p class="text-sm text-gray-600">Customer since 2019</p>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="font-medium text-gray-700">Credit Score:</span>
                <span class="ml-2 text-green-600 font-semibold">742</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Total Loans:</span>
                <span class="ml-2 text-gray-900">3</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Account Status:</span>
                <span class="ml-2 text-green-600">Active</span>
              </div>
              <div>
                <span class="font-medium text-gray-700">Risk Level:</span>
                <span class="ml-2 text-blue-600">Low</span>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="flex space-x-2">
            <MButton variant="primary" size="small">View Loans</MButton>
            <MButton variant="outline" size="small">Payment History</MButton>
            <MButton variant="outline" size="small">Contact</MButton>
          </div>
        </template>
      </MCard>
    `
  })
};

export const LoanSummary = {
  args: {
    title: 'Loan Portfolio Summary',
    subtitle: 'Overview of all active loans',
    variant: 'elevated',
    padding: 'large'
  },
  render: (args) => ({
    components: { MCard },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">$2.4M</div>
            <div class="text-sm text-gray-600 mt-1">Total Outstanding</div>
            <div class="text-xs text-green-600 mt-1">↑ 12% from last month</div>
          </div>
          
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">247</div>
            <div class="text-sm text-gray-600 mt-1">Active Loans</div>
            <div class="text-xs text-blue-600 mt-1">↑ 8 new this week</div>
          </div>
          
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">96.2%</div>
            <div class="text-sm text-gray-600 mt-1">Collection Rate</div>
            <div class="text-xs text-green-600 mt-1">↑ 0.5% improvement</div>
          </div>
        </div>
        
        <div class="mt-6 pt-6 border-t border-gray-200">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Loan Distribution</h4>
          <div class="space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Personal Loans</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full" style="width: 65%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">65%</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Auto Loans</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-green-600 h-2 rounded-full" style="width: 25%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">25%</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Home Loans</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 rounded-full h-2">
                  <div class="bg-purple-600 h-2 rounded-full" style="width: 10%"></div>
                </div>
                <span class="text-sm font-medium text-gray-900">10%</span>
              </div>
            </div>
          </div>
        </div>
      </MCard>
    `
  })
};

export const Loading = {
  args: {
    ...Default.args,
    loading: true
  },
  render: Default.render
};

export const NoPadding = {
  args: {
    ...Default.args,
    padding: 'none',
    title: '',
    subtitle: ''
  },
  render: (args) => ({
    components: { MCard },
    setup() {
      return { args };
    },
    template: `
      <MCard v-bind="args">
        <img 
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop" 
          alt="Financial planning" 
          class="w-full h-48 object-cover"
        />
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Financial Planning Made Simple</h3>
          <p class="text-gray-600 text-sm mb-4">
            Take control of your financial future with our comprehensive planning tools and expert guidance.
          </p>
          <MButton variant="primary" size="small">Learn More</MButton>
        </div>
      </MCard>
    `
  })
};