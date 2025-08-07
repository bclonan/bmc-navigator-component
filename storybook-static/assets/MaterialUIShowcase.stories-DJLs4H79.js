import{M as p}from"./MLayout-D_TTJrE-.js";import{M as m}from"./MCard-BMaDLVhA.js";import{M as u}from"./MButton-ClHapibe.js";import{M as v}from"./MTextField-OPGGVjaU.js";import{M as x}from"./MSelect-BPYUGOCn.js";import{M as f}from"./MCheckbox-B-c44SKF.js";import{M as g}from"./MSlider-CAxFof3m.js";import{M as b}from"./MProgress-Dbt3URTC.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const B={title:"Material UI/Complete Showcase",parameters:{layout:"fullscreen",docs:{description:{component:"Complete showcase of all Material UI components working together in a real-world dashboard scenario."}}}},n={render:()=>({components:{MLayout:p,MCard:m,MButton:u,MTextField:v,MSelect:x,MCheckbox:f,MSlider:g,MProgress:b},data(){return{navigationItems:[{icon:"fas fa-tachometer-alt",label:"Dashboard",route:"dashboard",active:!0},{icon:"fas fa-file-alt",label:"Applications",route:"applications"},{icon:"fas fa-credit-card",label:"Payments",route:"payments"},{icon:"fas fa-users",label:"Customers",route:"customers"},{icon:"fas fa-chart-bar",label:"Reports",route:"reports"},{icon:"fas fa-cog",label:"Settings",route:"settings"}],loanApplication:{amount:15e3,term:"60",purpose:"",firstName:"",lastName:"",email:"",phone:"",income:"",creditScore:650,agreeTerms:!1,marketingOptIn:!0},loanTerms:[{value:"12",text:"12 months"},{value:"24",text:"24 months"},{value:"36",text:"36 months"},{value:"48",text:"48 months"},{value:"60",text:"60 months"},{value:"72",text:"72 months"}],loanPurposes:[{value:"debt_consolidation",text:"Debt Consolidation"},{value:"home_improvement",text:"Home Improvement"},{value:"auto_repair",text:"Auto Repair"},{value:"medical",text:"Medical Expenses"},{value:"education",text:"Education"},{value:"other",text:"Other"}],stats:{totalApplications:1247,approvedToday:23,pendingReview:45,totalVolume:24e5},applicationProgress:75,systemHealth:92}},computed:{estimatedPayment(){const e=this.loanApplication.amount,t=.15/12,i=parseInt(this.loanApplication.term);if(e&&i){const h=e*(t*Math.pow(1+t,i))/(Math.pow(1+t,i)-1);return Math.round(h*100)/100}return 0},creditScoreColor(){return this.loanApplication.creditScore>=750?"success":this.loanApplication.creditScore>=650?"warning":"error"}},methods:{handleNavigation(e){this.navigationItems.forEach(t=>t.active=!1),e.active=!0},formatCurrency(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}).format(e)},submitApplication(){alert("Application submitted successfully!")}},template:`
      <MLayout 
        app-title="Your Town Finance Portal"
        :drawer="true"
        :permanent="true"
        drawer-width="280px"
      >
        <template #navigation>
          <div class="p-4">
            <!-- User Profile -->
            <div class="mb-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  MF
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Your Town Finance</div>
                  <div class="text-sm text-gray-600">Admin Portal</div>
                </div>
              </div>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="space-y-1">
              <div 
                v-for="item in navigationItems" 
                :key="item.route"
                class="flex items-center p-3 rounded-lg cursor-pointer transition-colors"
                :class="item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
                @click="handleNavigation(item)"
              >
                <i :class="item.icon" class="w-5 mr-3"></i>
                <span>{{ item.label }}</span>
              </div>
            </nav>
          </div>
        </template>
        
        <template #app-bar-actions>
          <MButton variant="text" prepend-icon="fas fa-bell" icon-only />
          <MButton variant="text" prepend-icon="fas fa-user-circle" icon-only />
        </template>
        
        <div class="space-y-6">
          <!-- Dashboard Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Loan Management Dashboard</h1>
            <p class="text-gray-600">Manage applications, track performance, and monitor system health</p>
          </div>
          
          <!-- Key Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MCard title="Total Applications" subtitle="All time">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-blue-600">{{ stats.totalApplications.toLocaleString() }}</div>
                <i class="fas fa-file-alt text-2xl text-blue-600"></i>
              </div>
            </MCard>
            
            <MCard title="Approved Today" subtitle="New approvals">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-green-600">{{ stats.approvedToday }}</div>
                <i class="fas fa-check-circle text-2xl text-green-600"></i>
              </div>
            </MCard>
            
            <MCard title="Pending Review" subtitle="Awaiting decision">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-yellow-600">{{ stats.pendingReview }}</div>
                <i class="fas fa-clock text-2xl text-yellow-600"></i>
              </div>
            </MCard>
            
            <MCard title="Total Volume" subtitle="This month">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-purple-600">{{ formatCurrency(stats.totalVolume) }}</div>
                <i class="fas fa-dollar-sign text-2xl text-purple-600"></i>
              </div>
            </MCard>
          </div>
          
          <!-- System Status -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MCard title="Application Processing" subtitle="Current system performance">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Processing Queue</span>
                    <span>{{ applicationProgress }}%</span>
                  </div>
                  <MProgress 
                    :value="applicationProgress" 
                    color="primary" 
                    :show-percentage="false"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>System Health</span>
                    <span>{{ systemHealth }}%</span>
                  </div>
                  <MProgress 
                    :value="systemHealth" 
                    color="success" 
                    :show-percentage="false"
                  />
                </div>
              </div>
            </MCard>
            
            <MCard title="Quick Actions" subtitle="Common tasks">
              <div class="grid grid-cols-2 gap-3">
                <MButton 
                  variant="outlined" 
                  text="New Application" 
                  prepend-icon="fas fa-plus" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="Generate Report" 
                  prepend-icon="fas fa-chart-bar" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="Review Queue" 
                  prepend-icon="fas fa-list" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="System Settings" 
                  prepend-icon="fas fa-cog" 
                  :full-width="true"
                />
              </div>
            </MCard>
          </div>
          
          <!-- Loan Application Form -->
          <MCard title="New Loan Application" subtitle="Quick application entry">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Personal Information -->
              <MTextField 
                v-model="loanApplication.firstName"
                label="First Name" 
                :required="true"
                placeholder="John"
              />
              
              <MTextField 
                v-model="loanApplication.lastName"
                label="Last Name" 
                :required="true"
                placeholder="Doe"
              />
              
              <MTextField 
                v-model="loanApplication.email"
                type="email"
                label="Email Address" 
                :required="true"
                placeholder="john.doe@email.com"
                prepend-icon="fas fa-envelope"
              />
              
              <MTextField 
                v-model="loanApplication.phone"
                type="tel"
                label="Phone Number" 
                :required="true"
                placeholder="(555) 123-4567"
                prepend-icon="fas fa-phone"
              />
              
              <MTextField 
                v-model="loanApplication.income"
                type="number"
                label="Annual Income" 
                :required="true"
                placeholder="50000"
                prepend-icon="fas fa-dollar-sign"
              />
              
              <MSelect 
                v-model="loanApplication.purpose"
                :options="loanPurposes"
                label="Loan Purpose" 
                :required="true"
                placeholder="Select purpose..."
              />
            </div>
            
            <!-- Loan Details -->
            <div class="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Loan Configuration</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Amount: {{ formatCurrency(loanApplication.amount) }}</label>
                    <MSlider 
                      v-model="loanApplication.amount"
                      :min="1000"
                      :max="50000"
                      :step="500"
                      color="primary"
                    />
                  </div>
                  
                  <MSelect 
                    v-model="loanApplication.term"
                    :options="loanTerms"
                    label="Loan Term" 
                    :required="true"
                  />
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Credit Score: {{ loanApplication.creditScore }}</label>
                    <MSlider 
                      v-model="loanApplication.creditScore"
                      :min="300"
                      :max="850"
                      :step="5"
                      :color="creditScoreColor"
                    />
                  </div>
                  
                  <div class="p-3 bg-blue-50 rounded">
                    <div class="text-sm text-blue-800">
                      <strong>Estimated Monthly Payment:</strong> {{ formatCurrency(estimatedPayment) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Agreement Checkboxes -->
            <div class="mt-6 space-y-3">
              <MCheckbox 
                v-model="loanApplication.agreeTerms"
                :required="true"
                color="primary"
              >
                I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
              </MCheckbox>
              
              <MCheckbox 
                v-model="loanApplication.marketingOptIn"
                color="secondary"
              >
                I would like to receive promotional offers and updates via email
              </MCheckbox>
            </div>
            
            <!-- Submit Actions -->
            <template #actions>
              <div class="flex justify-between w-full">
                <MButton variant="outlined" text="Save Draft" />
                <MButton 
                  text="Submit Application" 
                  :disabled="!loanApplication.agreeTerms"
                  @click="submitApplication"
                />
              </div>
            </template>
          </MCard>
        </div>
        
        <template #footer>
          <div class="p-4 bg-gray-50 border-t border-gray-200">
            <div class="flex justify-between items-center text-sm text-gray-600">
              <div>© 2024 Your Town Finance. All rights reserved.</div>
              <div class="flex space-x-4">
                <a href="#" class="hover:text-blue-600">Privacy Policy</a>
                <a href="#" class="hover:text-blue-600">Terms of Service</a>
                <a href="#" class="hover:text-blue-600">Support</a>
              </div>
            </div>
          </div>
        </template>
      </MLayout>
    `}),parameters:{docs:{description:{story:"Complete Material UI showcase demonstrating a fully functional loan management dashboard with all components integrated."}}}},a={render:()=>({components:{MLayout:p,MCard:m,MButton:u,MTextField:v,MSelect:x,MCheckbox:f,MSlider:g,MProgress:b},data(){return{textValue:"",selectValue:"",checkboxValue:!1,sliderValue:50,progressValue:75,selectOptions:[{value:"option1",text:"Option 1"},{value:"option2",text:"Option 2"},{value:"option3",text:"Option 3"}]}},template:`
      <MLayout app-title="Material UI Component Library">
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Material UI Components</h1>
            <p class="text-xl text-gray-600">A comprehensive Vue 3 component library following Material Design principles</p>
          </div>
          
          <!-- Buttons Section -->
          <MCard title="Buttons" subtitle="Various button styles and configurations">
            <div class="space-y-4">
              <div class="flex flex-wrap gap-3">
                <MButton text="Primary" />
                <MButton variant="outlined" text="Outlined" />
                <MButton variant="text" text="Text" />
                <MButton variant="elevated" text="Elevated" />
              </div>
              
              <div class="flex flex-wrap gap-3">
                <MButton color="success" text="Success" />
                <MButton color="warning" text="Warning" />
                <MButton color="error" text="Error" />
                <MButton :loading="true" text="Loading" />
              </div>
            </div>
          </MCard>
          
          <!-- Form Controls Section -->
          <MCard title="Form Controls" subtitle="Input fields and interactive elements">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <MTextField 
                  v-model="textValue"
                  label="Text Field" 
                  placeholder="Enter text..."
                  prepend-icon="fas fa-user"
                />
                
                <MSelect 
                  v-model="selectValue"
                  :options="selectOptions"
                  label="Select Field" 
                  placeholder="Choose option..."
                />
                
                <MCheckbox 
                  v-model="checkboxValue"
                  label="Checkbox Option"
                />
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Slider: {{ sliderValue }}</label>
                  <MSlider 
                    v-model="sliderValue"
                    :min="0"
                    :max="100"
                    color="primary"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Progress</label>
                  <MProgress 
                    :value="progressValue" 
                    :show-percentage="true"
                    color="success"
                  />
                </div>
              </div>
            </div>
          </MCard>
          
          <!-- Layout Section -->
          <MCard title="Layout System" subtitle="Responsive layout components">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MCard variant="outlined" title="Navigation" subtitle="Drawer-based navigation">
                <p class="text-sm text-gray-600">Responsive navigation drawer with mobile support</p>
              </MCard>
              
              <MCard variant="outlined" title="App Bar" subtitle="Top navigation bar">
                <p class="text-sm text-gray-600">Customizable app bar with actions and branding</p>
              </MCard>
              
              <MCard variant="outlined" title="Content Areas" subtitle="Flexible content layout">
                <p class="text-sm text-gray-600">Main content, toolbar, and footer areas</p>
              </MCard>
            </div>
          </MCard>
          
          <!-- Features Section -->
          <MCard title="Key Features" subtitle="What makes this library special">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Vue 3 Options API
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Material Design Principles
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Tailwind CSS Integration
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Accessibility Support
                </li>
              </ul>
              
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Responsive Design
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Dark Mode Support
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Comprehensive Documentation
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Production Ready
                </li>
              </ul>
            </div>
          </MCard>
        </div>
      </MLayout>
    `})};var l,s,o;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton,
      MTextField,
      MSelect,
      MCheckbox,
      MSlider,
      MProgress
    },
    data() {
      return {
        // Navigation
        navigationItems: [{
          icon: 'fas fa-tachometer-alt',
          label: 'Dashboard',
          route: 'dashboard',
          active: true
        }, {
          icon: 'fas fa-file-alt',
          label: 'Applications',
          route: 'applications'
        }, {
          icon: 'fas fa-credit-card',
          label: 'Payments',
          route: 'payments'
        }, {
          icon: 'fas fa-users',
          label: 'Customers',
          route: 'customers'
        }, {
          icon: 'fas fa-chart-bar',
          label: 'Reports',
          route: 'reports'
        }, {
          icon: 'fas fa-cog',
          label: 'Settings',
          route: 'settings'
        }],
        // Form data
        loanApplication: {
          amount: 15000,
          term: '60',
          purpose: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          income: '',
          creditScore: 650,
          agreeTerms: false,
          marketingOptIn: true
        },
        // Select options
        loanTerms: [{
          value: '12',
          text: '12 months'
        }, {
          value: '24',
          text: '24 months'
        }, {
          value: '36',
          text: '36 months'
        }, {
          value: '48',
          text: '48 months'
        }, {
          value: '60',
          text: '60 months'
        }, {
          value: '72',
          text: '72 months'
        }],
        loanPurposes: [{
          value: 'debt_consolidation',
          text: 'Debt Consolidation'
        }, {
          value: 'home_improvement',
          text: 'Home Improvement'
        }, {
          value: 'auto_repair',
          text: 'Auto Repair'
        }, {
          value: 'medical',
          text: 'Medical Expenses'
        }, {
          value: 'education',
          text: 'Education'
        }, {
          value: 'other',
          text: 'Other'
        }],
        // Dashboard data
        stats: {
          totalApplications: 1247,
          approvedToday: 23,
          pendingReview: 45,
          totalVolume: 2400000
        },
        applicationProgress: 75,
        systemHealth: 92
      };
    },
    computed: {
      estimatedPayment() {
        const principal = this.loanApplication.amount;
        const rate = 0.15 / 12; // 15% APR monthly
        const payments = parseInt(this.loanApplication.term);
        if (principal && payments) {
          const payment = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
          return Math.round(payment * 100) / 100;
        }
        return 0;
      },
      creditScoreColor() {
        if (this.loanApplication.creditScore >= 750) return 'success';
        if (this.loanApplication.creditScore >= 650) return 'warning';
        return 'error';
      }
    },
    methods: {
      handleNavigation(item) {
        this.navigationItems.forEach(nav => nav.active = false);
        item.active = true;
      },
      formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(amount);
      },
      submitApplication() {
        alert('Application submitted successfully!');
      }
    },
    template: \`
      <MLayout 
        app-title="Your Town Finance Portal"
        :drawer="true"
        :permanent="true"
        drawer-width="280px"
      >
        <template #navigation>
          <div class="p-4">
            <!-- User Profile -->
            <div class="mb-6 p-4 bg-blue-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                  MF
                </div>
                <div>
                  <div class="font-semibold text-gray-900">Your Town Finance</div>
                  <div class="text-sm text-gray-600">Admin Portal</div>
                </div>
              </div>
            </div>
            
            <!-- Navigation Menu -->
            <nav class="space-y-1">
              <div 
                v-for="item in navigationItems" 
                :key="item.route"
                class="flex items-center p-3 rounded-lg cursor-pointer transition-colors"
                :class="item.active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'"
                @click="handleNavigation(item)"
              >
                <i :class="item.icon" class="w-5 mr-3"></i>
                <span>{{ item.label }}</span>
              </div>
            </nav>
          </div>
        </template>
        
        <template #app-bar-actions>
          <MButton variant="text" prepend-icon="fas fa-bell" icon-only />
          <MButton variant="text" prepend-icon="fas fa-user-circle" icon-only />
        </template>
        
        <div class="space-y-6">
          <!-- Dashboard Header -->
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Loan Management Dashboard</h1>
            <p class="text-gray-600">Manage applications, track performance, and monitor system health</p>
          </div>
          
          <!-- Key Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MCard title="Total Applications" subtitle="All time">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-blue-600">{{ stats.totalApplications.toLocaleString() }}</div>
                <i class="fas fa-file-alt text-2xl text-blue-600"></i>
              </div>
            </MCard>
            
            <MCard title="Approved Today" subtitle="New approvals">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-green-600">{{ stats.approvedToday }}</div>
                <i class="fas fa-check-circle text-2xl text-green-600"></i>
              </div>
            </MCard>
            
            <MCard title="Pending Review" subtitle="Awaiting decision">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-yellow-600">{{ stats.pendingReview }}</div>
                <i class="fas fa-clock text-2xl text-yellow-600"></i>
              </div>
            </MCard>
            
            <MCard title="Total Volume" subtitle="This month">
              <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-purple-600">{{ formatCurrency(stats.totalVolume) }}</div>
                <i class="fas fa-dollar-sign text-2xl text-purple-600"></i>
              </div>
            </MCard>
          </div>
          
          <!-- System Status -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MCard title="Application Processing" subtitle="Current system performance">
              <div class="space-y-4">
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>Processing Queue</span>
                    <span>{{ applicationProgress }}%</span>
                  </div>
                  <MProgress 
                    :value="applicationProgress" 
                    color="primary" 
                    :show-percentage="false"
                  />
                </div>
                
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span>System Health</span>
                    <span>{{ systemHealth }}%</span>
                  </div>
                  <MProgress 
                    :value="systemHealth" 
                    color="success" 
                    :show-percentage="false"
                  />
                </div>
              </div>
            </MCard>
            
            <MCard title="Quick Actions" subtitle="Common tasks">
              <div class="grid grid-cols-2 gap-3">
                <MButton 
                  variant="outlined" 
                  text="New Application" 
                  prepend-icon="fas fa-plus" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="Generate Report" 
                  prepend-icon="fas fa-chart-bar" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="Review Queue" 
                  prepend-icon="fas fa-list" 
                  :full-width="true"
                />
                <MButton 
                  variant="outlined" 
                  text="System Settings" 
                  prepend-icon="fas fa-cog" 
                  :full-width="true"
                />
              </div>
            </MCard>
          </div>
          
          <!-- Loan Application Form -->
          <MCard title="New Loan Application" subtitle="Quick application entry">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Personal Information -->
              <MTextField 
                v-model="loanApplication.firstName"
                label="First Name" 
                :required="true"
                placeholder="John"
              />
              
              <MTextField 
                v-model="loanApplication.lastName"
                label="Last Name" 
                :required="true"
                placeholder="Doe"
              />
              
              <MTextField 
                v-model="loanApplication.email"
                type="email"
                label="Email Address" 
                :required="true"
                placeholder="john.doe@email.com"
                prepend-icon="fas fa-envelope"
              />
              
              <MTextField 
                v-model="loanApplication.phone"
                type="tel"
                label="Phone Number" 
                :required="true"
                placeholder="(555) 123-4567"
                prepend-icon="fas fa-phone"
              />
              
              <MTextField 
                v-model="loanApplication.income"
                type="number"
                label="Annual Income" 
                :required="true"
                placeholder="50000"
                prepend-icon="fas fa-dollar-sign"
              />
              
              <MSelect 
                v-model="loanApplication.purpose"
                :options="loanPurposes"
                label="Loan Purpose" 
                :required="true"
                placeholder="Select purpose..."
              />
            </div>
            
            <!-- Loan Details -->
            <div class="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Loan Configuration</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Loan Amount: {{ formatCurrency(loanApplication.amount) }}</label>
                    <MSlider 
                      v-model="loanApplication.amount"
                      :min="1000"
                      :max="50000"
                      :step="500"
                      color="primary"
                    />
                  </div>
                  
                  <MSelect 
                    v-model="loanApplication.term"
                    :options="loanTerms"
                    label="Loan Term" 
                    :required="true"
                  />
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Credit Score: {{ loanApplication.creditScore }}</label>
                    <MSlider 
                      v-model="loanApplication.creditScore"
                      :min="300"
                      :max="850"
                      :step="5"
                      :color="creditScoreColor"
                    />
                  </div>
                  
                  <div class="p-3 bg-blue-50 rounded">
                    <div class="text-sm text-blue-800">
                      <strong>Estimated Monthly Payment:</strong> {{ formatCurrency(estimatedPayment) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Agreement Checkboxes -->
            <div class="mt-6 space-y-3">
              <MCheckbox 
                v-model="loanApplication.agreeTerms"
                :required="true"
                color="primary"
              >
                I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a> and <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
              </MCheckbox>
              
              <MCheckbox 
                v-model="loanApplication.marketingOptIn"
                color="secondary"
              >
                I would like to receive promotional offers and updates via email
              </MCheckbox>
            </div>
            
            <!-- Submit Actions -->
            <template #actions>
              <div class="flex justify-between w-full">
                <MButton variant="outlined" text="Save Draft" />
                <MButton 
                  text="Submit Application" 
                  :disabled="!loanApplication.agreeTerms"
                  @click="submitApplication"
                />
              </div>
            </template>
          </MCard>
        </div>
        
        <template #footer>
          <div class="p-4 bg-gray-50 border-t border-gray-200">
            <div class="flex justify-between items-center text-sm text-gray-600">
              <div>© 2024 Your Town Finance. All rights reserved.</div>
              <div class="flex space-x-4">
                <a href="#" class="hover:text-blue-600">Privacy Policy</a>
                <a href="#" class="hover:text-blue-600">Terms of Service</a>
                <a href="#" class="hover:text-blue-600">Support</a>
              </div>
            </div>
          </div>
        </template>
      </MLayout>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete Material UI showcase demonstrating a fully functional loan management dashboard with all components integrated.'
      }
    }
  }
}`,...(o=(s=n.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var r,c,d;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MLayout,
      MCard,
      MButton,
      MTextField,
      MSelect,
      MCheckbox,
      MSlider,
      MProgress
    },
    data() {
      return {
        textValue: '',
        selectValue: '',
        checkboxValue: false,
        sliderValue: 50,
        progressValue: 75,
        selectOptions: [{
          value: 'option1',
          text: 'Option 1'
        }, {
          value: 'option2',
          text: 'Option 2'
        }, {
          value: 'option3',
          text: 'Option 3'
        }]
      };
    },
    template: \`
      <MLayout app-title="Material UI Component Library">
        <div class="space-y-8">
          <div>
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Material UI Components</h1>
            <p class="text-xl text-gray-600">A comprehensive Vue 3 component library following Material Design principles</p>
          </div>
          
          <!-- Buttons Section -->
          <MCard title="Buttons" subtitle="Various button styles and configurations">
            <div class="space-y-4">
              <div class="flex flex-wrap gap-3">
                <MButton text="Primary" />
                <MButton variant="outlined" text="Outlined" />
                <MButton variant="text" text="Text" />
                <MButton variant="elevated" text="Elevated" />
              </div>
              
              <div class="flex flex-wrap gap-3">
                <MButton color="success" text="Success" />
                <MButton color="warning" text="Warning" />
                <MButton color="error" text="Error" />
                <MButton :loading="true" text="Loading" />
              </div>
            </div>
          </MCard>
          
          <!-- Form Controls Section -->
          <MCard title="Form Controls" subtitle="Input fields and interactive elements">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <MTextField 
                  v-model="textValue"
                  label="Text Field" 
                  placeholder="Enter text..."
                  prepend-icon="fas fa-user"
                />
                
                <MSelect 
                  v-model="selectValue"
                  :options="selectOptions"
                  label="Select Field" 
                  placeholder="Choose option..."
                />
                
                <MCheckbox 
                  v-model="checkboxValue"
                  label="Checkbox Option"
                />
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-2">Slider: {{ sliderValue }}</label>
                  <MSlider 
                    v-model="sliderValue"
                    :min="0"
                    :max="100"
                    color="primary"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-2">Progress</label>
                  <MProgress 
                    :value="progressValue" 
                    :show-percentage="true"
                    color="success"
                  />
                </div>
              </div>
            </div>
          </MCard>
          
          <!-- Layout Section -->
          <MCard title="Layout System" subtitle="Responsive layout components">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <MCard variant="outlined" title="Navigation" subtitle="Drawer-based navigation">
                <p class="text-sm text-gray-600">Responsive navigation drawer with mobile support</p>
              </MCard>
              
              <MCard variant="outlined" title="App Bar" subtitle="Top navigation bar">
                <p class="text-sm text-gray-600">Customizable app bar with actions and branding</p>
              </MCard>
              
              <MCard variant="outlined" title="Content Areas" subtitle="Flexible content layout">
                <p class="text-sm text-gray-600">Main content, toolbar, and footer areas</p>
              </MCard>
            </div>
          </MCard>
          
          <!-- Features Section -->
          <MCard title="Key Features" subtitle="What makes this library special">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Vue 3 Options API
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Material Design Principles
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Tailwind CSS Integration
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Accessibility Support
                </li>
              </ul>
              
              <ul class="space-y-2">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Responsive Design
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Dark Mode Support
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Comprehensive Documentation
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-600 mr-2"></i>
                  Production Ready
                </li>
              </ul>
            </div>
          </MCard>
        </div>
      </MLayout>
    \`
  })
}`,...(d=(c=a.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const L=["YourTownFinanceDashboard","ComponentLibraryOverview"];export{a as ComponentLibraryOverview,n as YourTownFinanceDashboard,L as __namedExportsOrder,B as default};
