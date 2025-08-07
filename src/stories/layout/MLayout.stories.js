import MLayout from '../../components/layout/MLayout.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'Layout/Structure/Layout',
  component: MLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A flexible layout component with header, sidebar, main content, and footer areas. Supports multiple variants and responsive design.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'sidebar', 'dashboard', 'minimal']
    },
    showHeader: {
      control: { type: 'boolean' }
    },
    showSidebar: {
      control: { type: 'boolean' }
    },
    showFooter: {
      control: { type: 'boolean' }
    },
    showBreadcrumb: {
      control: { type: 'boolean' }
    },
    fluid: {
      control: { type: 'boolean' }
    },
    sidebarPosition: {
      control: { type: 'select' },
      options: ['left', 'right']
    }
  }
};

const navbarConfig = {
  brand: {
    text: 'Your Town Finance',
    logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzM2ODNmNiIvPgo8cGF0aCBkPSJNOCAyMEwxNiAxMkwyNCAyMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+'
  },
  navigationItems: [
    { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
    { id: 'applications', label: 'Applications', href: '#applications' },
    { id: 'customers', label: 'Customers', href: '#customers' },
    { id: 'reports', label: 'Reports', href: '#reports' }
  ],
  actionItems: [
    {
      id: 'user',
      type: 'user',
      name: 'John Admin',
      email: 'admin@yourtownfinance.com',
      showName: true,
      menuItems: [
        { id: 'profile', label: 'Profile', href: '#profile' },
        { id: 'settings', label: 'Settings', href: '#settings' },
        { id: 'logout', label: 'Sign Out', href: '#logout' }
      ]
    }
  ]
};

const sidebarItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'dashboard',
    href: '#dashboard',
    active: true
  },
  {
    id: 'applications',
    label: 'Loan Applications',
    icon: 'documents',
    href: '#applications',
    badge: { text: '12', variant: 'primary' }
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: 'users',
    href: '#customers'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'analytics',
    href: '#analytics',
    children: [
      { id: 'performance', label: 'Performance', href: '#performance' },
      { id: 'revenue', label: 'Revenue', href: '#revenue' },
      { id: 'trends', label: 'Market Trends', href: '#trends' }
    ],
    expanded: true
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    href: '#settings'
  }
];

const breadcrumbItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'dashboard', label: 'Dashboard', href: '#dashboard' },
  { id: 'current', label: 'Current Page' }
];

export const Default = {
  args: {
    variant: 'default',
    showHeader: true,
    showFooter: true,
    showBreadcrumb: false,
    showSidebar: false,
    navbar: navbarConfig,
    pageTitle: 'Financial Dashboard',
    pageSubtitle: 'Monitor your financial services performance',
    fluid: false
  },
  render: (args) => ({
    components: { MLayout, MButton },
    setup() {
      return { args };
    },
    template: `
      <MLayout v-bind="args">
        <template #actions>
          <MButton variant="primary">New Application</MButton>
          <MButton variant="outline">Export Data</MButton>
        </template>
        
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Total Applications</h3>
              <p class="text-3xl font-bold text-blue-600">1,247</p>
              <p class="text-sm text-gray-600 mt-1">+12% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Approval Rate</h3>
              <p class="text-3xl font-bold text-green-600">87.3%</p>
              <p class="text-sm text-gray-600 mt-1">+2.1% from last month</p>
            </div>
            <div class="bg-white p-6 rounded-lg border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Average Loan</h3>
              <p class="text-3xl font-bold text-purple-600">$25,400</p>
              <p class="text-sm text-gray-600 mt-1">-3.2% from last month</p>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-lg border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">New loan application submitted</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-001 - $15,000</p>
                </div>
                <span class="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p class="font-medium text-gray-900">Loan approved</p>
                  <p class="text-sm text-gray-600">Application #LA-2024-899 - $22,500</p>
                </div>
                <span class="text-sm text-gray-500">15 minutes ago</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div>
                  <p class="font-medium text-gray-900">Payment received</p>
                  <p class="text-sm text-gray-600">Customer ID #C-4567 - $485.00</p>
                </div>
                <span class="text-sm text-gray-500">1 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </MLayout>
    `
  })
};

export const WithSidebar = {
  args: {
    ...Default.args,
    variant: 'sidebar',
    showSidebar: true,
    sidebarItems: sidebarItems,
    showBreadcrumb: true,
    breadcrumbItems: breadcrumbItems
  },
  render: Default.render
};

export const Dashboard = {
  args: {
    ...WithSidebar.args,
    variant: 'dashboard'
  },
  render: Default.render
};

export const RightSidebar = {
  args: {
    ...WithSidebar.args,
    sidebarPosition: 'right'
  },
  render: Default.render
};

export const Minimal = {
  args: {
    variant: 'minimal',
    showHeader: false,
    showFooter: false,
    showSidebar: false,
    pageTitle: 'Loan Application',
    pageSubtitle: 'Complete your personal loan application'
  },
  render: (args) => ({
    components: { MLayout, MButton },
    setup() {
      return { args };
    },
    template: `
      <MLayout v-bind="args">
        <div class="max-w-2xl mx-auto">
          <div class="bg-white p-8 rounded-lg border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-8">
              <MButton variant="outline">Previous</MButton>
              <MButton variant="primary">Continue</MButton>
            </div>
          </div>
        </div>
      </MLayout>
    `
  })
};

export const Fluid = {
  args: {
    ...WithSidebar.args,
    fluid: true
  },
  render: Default.render
};