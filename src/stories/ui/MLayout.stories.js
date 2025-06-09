import MLayout from '../../components/ui/MLayout.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'Material UI/MLayout',
  component: MLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Material Design layout component providing app bar, navigation drawer, and main content areas with responsive behavior.'
      }
    }
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark']
    }
  }
};

export const BasicLayout = {
  render: () => ({
    components: { MLayout, MCard },
    template: `
      <MLayout app-title="My Application">
        <div class="space-y-6">
          <h1 class="text-3xl font-bold">Welcome to the Dashboard</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MCard title="Card 1" subtitle="Sample content">
              <p>This is the main content area of the layout.</p>
            </MCard>
            
            <MCard title="Card 2" subtitle="More content">
              <p>The layout automatically handles responsive behavior.</p>
            </MCard>
            
            <MCard title="Card 3" subtitle="Additional info">
              <p>Content flows naturally within the layout structure.</p>
            </MCard>
          </div>
        </div>
      </MLayout>
    `
  })
};

export const WithDrawer = {
  render: () => ({
    components: { MLayout, MCard, MButton },
    data() {
      return {
        navigationItems: [
          { icon: 'fas fa-home', label: 'Dashboard', active: true },
          { icon: 'fas fa-chart-bar', label: 'Analytics' },
          { icon: 'fas fa-users', label: 'Customers' },
          { icon: 'fas fa-cog', label: 'Settings' }
        ]
      };
    },
    template: `
      <MLayout 
        app-title="Finance Dashboard" 
        :drawer="true"
        :permanent="true"
      >
        <template #navigation>
          <div class="space-y-2">
            <div 
              v-for="item in navigationItems" 
              :key="item.label"
              class="flex items-center p-3 rounded cursor-pointer transition-colors"
              :class="item.active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'"
            >
              <i :class="item.icon" class="w-5 mr-3"></i>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>
        
        <template #app-bar-actions>
          <MButton variant="text" prepend-icon="fas fa-bell" icon-only />
          <MButton variant="text" prepend-icon="fas fa-user-circle" icon-only />
        </template>
        
        <div class="space-y-6">
          <h1 class="text-3xl font-bold">Dashboard Overview</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MCard title="Total Loans" subtitle="Active applications">
              <div class="text-2xl font-bold text-blue-600">1,247</div>
            </MCard>
            
            <MCard title="Approved Today" subtitle="New approvals">
              <div class="text-2xl font-bold text-green-600">23</div>
            </MCard>
            
            <MCard title="Pending Review" subtitle="Awaiting decision">
              <div class="text-2xl font-bold text-yellow-600">45</div>
            </MCard>
            
            <MCard title="Total Volume" subtitle="This month">
              <div class="text-2xl font-bold text-purple-600">$2.4M</div>
            </MCard>
          </div>
        </div>
        
        <template #footer>
          <div class="p-4 text-center text-sm text-gray-600">
            © 2024 Mariner Finance. All rights reserved.
          </div>
        </template>
      </MLayout>
    `
  })
};

export const MobileResponsive = {
  render: () => ({
    components: { MLayout, MCard, MButton },
    data() {
      return {
        navigationItems: [
          { icon: 'fas fa-home', label: 'Home' },
          { icon: 'fas fa-credit-card', label: 'Payments' },
          { icon: 'fas fa-file-alt', label: 'Documents' },
          { icon: 'fas fa-phone', label: 'Contact' }
        ]
      };
    },
    template: `
      <MLayout 
        app-title="Mariner Mobile" 
        :drawer="true"
        drawer-width="280px"
      >
        <template #navigation>
          <div class="p-4">
            <div class="mb-6">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-2">
                JD
              </div>
              <div class="font-semibold">John Doe</div>
              <div class="text-sm text-gray-600">Account #ML-789456</div>
            </div>
            
            <nav class="space-y-1">
              <div 
                v-for="item in navigationItems" 
                :key="item.label"
                class="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <i :class="item.icon" class="w-5 mr-3 text-gray-600"></i>
                <span>{{ item.label }}</span>
              </div>
            </nav>
            
            <div class="mt-8 pt-4 border-t border-gray-200">
              <MButton variant="outlined" :full-width="true" text="Sign Out" prepend-icon="fas fa-sign-out-alt" />
            </div>
          </div>
        </template>
        
        <template #app-bar-actions>
          <MButton variant="text" prepend-icon="fas fa-bell" icon-only />
        </template>
        
        <div class="space-y-4">
          <!-- Quick Summary -->
          <MCard title="Account Summary">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div>
                <div class="text-lg font-bold">$18,750</div>
                <div class="text-sm text-gray-600">Remaining Balance</div>
              </div>
              <div>
                <div class="text-lg font-bold">$487.50</div>
                <div class="text-sm text-gray-600">Next Payment</div>
              </div>
            </div>
          </MCard>
          
          <!-- Recent Activity -->
          <MCard title="Recent Activity">
            <div class="space-y-3">
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div class="font-medium">Payment Received</div>
                  <div class="text-sm text-gray-600">Feb 15, 2024</div>
                </div>
                <div class="text-green-600 font-medium">-$487.50</div>
              </div>
              
              <div class="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <div class="font-medium">Late Fee Applied</div>
                  <div class="text-sm text-gray-600">Jan 20, 2024</div>
                </div>
                <div class="text-red-600 font-medium">+$25.00</div>
              </div>
            </div>
          </MCard>
          
          <!-- Quick Actions -->
          <MCard title="Quick Actions">
            <div class="grid grid-cols-2 gap-2">
              <MButton variant="outlined" text="Make Payment" prepend-icon="fas fa-credit-card" />
              <MButton variant="outlined" text="View Statements" prepend-icon="fas fa-file-pdf" />
              <MButton variant="outlined" text="Update Info" prepend-icon="fas fa-edit" />
              <MButton variant="outlined" text="Get Help" prepend-icon="fas fa-question-circle" />
            </div>
          </MCard>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

export const DarkTheme = {
  render: () => ({
    components: { MLayout, MCard, MButton },
    data() {
      return {
        navigationItems: [
          { icon: 'fas fa-tachometer-alt', label: 'Dashboard', active: true },
          { icon: 'fas fa-chart-line', label: 'Reports' },
          { icon: 'fas fa-users', label: 'Customers' },
          { icon: 'fas fa-cog', label: 'Settings' }
        ]
      };
    },
    template: `
      <MLayout 
        app-title="Admin Portal" 
        :drawer="true"
        :permanent="true"
        theme="dark"
      >
        <template #navigation>
          <div class="space-y-2">
            <div 
              v-for="item in navigationItems" 
              :key="item.label"
              class="flex items-center p-3 rounded cursor-pointer transition-colors"
              :class="item.active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'"
            >
              <i :class="item.icon" class="w-5 mr-3"></i>
              <span>{{ item.label }}</span>
            </div>
          </div>
        </template>
        
        <template #app-bar-actions>
          <MButton variant="text" prepend-icon="fas fa-search" icon-only />
          <MButton variant="text" prepend-icon="fas fa-bell" icon-only />
          <MButton variant="text" prepend-icon="fas fa-user" icon-only />
        </template>
        
        <div class="space-y-6">
          <h1 class="text-3xl font-bold text-white">System Overview</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MCard theme="dark" title="Server Status" subtitle="All systems operational">
              <div class="flex items-center">
                <div class="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                <span class="text-green-400">Online</span>
              </div>
            </MCard>
            
            <MCard theme="dark" title="Active Users" subtitle="Currently online">
              <div class="text-2xl font-bold text-blue-400">2,847</div>
            </MCard>
            
            <MCard theme="dark" title="System Load" subtitle="Average CPU usage">
              <div class="text-2xl font-bold text-yellow-400">34%</div>
            </MCard>
          </div>
        </div>
        
        <template #footer>
          <div class="p-4 text-center text-sm text-gray-400">
            Admin Portal v2.1.0 - Last updated: March 2024
          </div>
        </template>
      </MLayout>
    `
  })
};

export const WithToolbar = {
  render: () => ({
    components: { MLayout, MCard, MButton },
    template: `
      <MLayout app-title="Document Manager">
        <template #toolbar>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <h2 class="text-lg font-semibold">My Documents</h2>
              <span class="text-sm text-gray-600">234 files</span>
            </div>
            
            <div class="flex items-center space-x-2">
              <MButton variant="outlined" prepend-icon="fas fa-filter" text="Filter" size="sm" />
              <MButton variant="outlined" prepend-icon="fas fa-sort" text="Sort" size="sm" />
              <MButton prepend-icon="fas fa-plus" text="Upload" size="sm" />
            </div>
          </div>
        </template>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MCard title="Loan Agreement.pdf" subtitle="Uploaded 2 days ago">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">2.3 MB</span>
                <MButton variant="text" prepend-icon="fas fa-download" size="sm" />
              </div>
            </MCard>
            
            <MCard title="Income Statement.xlsx" subtitle="Uploaded 1 week ago">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">856 KB</span>
                <MButton variant="text" prepend-icon="fas fa-download" size="sm" />
              </div>
            </MCard>
            
            <MCard title="ID Verification.jpg" subtitle="Uploaded 2 weeks ago">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">1.2 MB</span>
                <MButton variant="text" prepend-icon="fas fa-download" size="sm" />
              </div>
            </MCard>
          </div>
        </div>
      </MLayout>
    `
  })
};