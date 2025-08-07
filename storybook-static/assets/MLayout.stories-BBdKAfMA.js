import{M as t}from"./MLayout-D_TTJrE-.js";import{M as e}from"./MCard-BMaDLVhA.js";import{M as l}from"./MButton-ClHapibe.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const k={title:"Material UI/MLayout",component:t,parameters:{layout:"fullscreen",docs:{description:{component:"Material Design layout component providing app bar, navigation drawer, and main content areas with responsive behavior."}}},argTypes:{theme:{control:{type:"select"},options:["light","dark"]}}},n={render:()=>({components:{MLayout:t,MCard:e},template:`
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
    `})},a={render:()=>({components:{MLayout:t,MCard:e,MButton:l},data(){return{navigationItems:[{icon:"fas fa-home",label:"Dashboard",active:!0},{icon:"fas fa-chart-bar",label:"Analytics"},{icon:"fas fa-users",label:"Customers"},{icon:"fas fa-cog",label:"Settings"}]}},template:`
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
            © 2024 Your Town Finance. All rights reserved.
          </div>
        </template>
      </MLayout>
    `})},i={render:()=>({components:{MLayout:t,MCard:e,MButton:l},data(){return{navigationItems:[{icon:"fas fa-home",label:"Home"},{icon:"fas fa-credit-card",label:"Payments"},{icon:"fas fa-file-alt",label:"Documents"},{icon:"fas fa-phone",label:"Contact"}]}},template:`
      <MLayout 
        app-title="YourTown Mobile"
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
    `}),parameters:{viewport:{defaultViewport:"mobile1"}}},s={render:()=>({components:{MLayout:t,MCard:e,MButton:l},data(){return{navigationItems:[{icon:"fas fa-tachometer-alt",label:"Dashboard",active:!0},{icon:"fas fa-chart-line",label:"Reports"},{icon:"fas fa-users",label:"Customers"},{icon:"fas fa-cog",label:"Settings"}]}},template:`
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
    `})},r={render:()=>({components:{MLayout:t,MCard:e,MButton:l},template:`
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
    `})};var o,d,c;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard
    },
    template: \`
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
    \`
  })
}`,...(c=(d=n.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,v,m;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton
    },
    data() {
      return {
        navigationItems: [{
          icon: 'fas fa-home',
          label: 'Dashboard',
          active: true
        }, {
          icon: 'fas fa-chart-bar',
          label: 'Analytics'
        }, {
          icon: 'fas fa-users',
          label: 'Customers'
        }, {
          icon: 'fas fa-cog',
          label: 'Settings'
        }]
      };
    },
    template: \`
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
            © 2024 Your Town Finance. All rights reserved.
          </div>
        </template>
      </MLayout>
    \`
  })
}`,...(m=(v=a.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var u,f,x;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton
    },
    data() {
      return {
        navigationItems: [{
          icon: 'fas fa-home',
          label: 'Home'
        }, {
          icon: 'fas fa-credit-card',
          label: 'Payments'
        }, {
          icon: 'fas fa-file-alt',
          label: 'Documents'
        }, {
          icon: 'fas fa-phone',
          label: 'Contact'
        }]
      };
    },
    template: \`
      <MLayout 
        app-title="YourTown Mobile"
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
    \`
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
}`,...(x=(f=i.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var g,b,y;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton
    },
    data() {
      return {
        navigationItems: [{
          icon: 'fas fa-tachometer-alt',
          label: 'Dashboard',
          active: true
        }, {
          icon: 'fas fa-chart-line',
          label: 'Reports'
        }, {
          icon: 'fas fa-users',
          label: 'Customers'
        }, {
          icon: 'fas fa-cog',
          label: 'Settings'
        }]
      };
    },
    template: \`
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
    \`
  })
}`,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var M,h,C;r.parameters={...r.parameters,docs:{...(M=r.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton
    },
    template: \`
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
    \`
  })
}`,...(C=(h=r.parameters)==null?void 0:h.docs)==null?void 0:C.source}}};const D=["BasicLayout","WithDrawer","MobileResponsive","DarkTheme","WithToolbar"];export{n as BasicLayout,s as DarkTheme,i as MobileResponsive,a as WithDrawer,r as WithToolbar,D as __namedExportsOrder,k as default};
