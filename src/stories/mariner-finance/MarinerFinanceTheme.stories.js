import MButton from '../../components/mui/MButton.vue';
import MAlert from '../../components/mui/MAlert.vue';
import MChip from '../../components/mui/MChip.vue';
import MAppBar from '../../components/mui/MAppBar.vue';
import MToolbar from '../../components/mui/MToolbar.vue';
import MAvatar from '../../components/mui/MAvatar.vue';
import MBadge from '../../components/mui/MBadge.vue';
import MTypography from '../../components/mui/MTypography.vue';

export default {
  title: 'Mariner Finance/Brand Theme',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete Mariner Finance brand theme implementation with authentic colors and typography from https://loans.marinerfinance.com/select-amount and https://www.marinerfinance.com/',
      },
    },
  },
};

// Brand Colors Showcase
export const BrandColors = () => ({
  components: {
    MTypography,
  },
  template: `
    <div class="p-8 space-y-8">
      <MTypography variant="h3" class="mb-6">Mariner Finance Brand Colors</MTypography>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div class="w-full h-24 rounded-lg mb-2" style="background-color: rgb(56, 96, 190);"></div>
          <MTypography variant="subtitle1" class="font-semibold">Matt Blue</MTypography>
          <MTypography variant="body2" class="text-gray-600">rgb(56, 96, 190)</MTypography>
          <MTypography variant="body2" class="text-gray-600">Primary Brand</MTypography>
        </div>
        
        <div>
          <div class="w-full h-24 rounded-lg mb-2" style="background-color: rgb(1, 52, 116);"></div>
          <MTypography variant="subtitle1" class="font-semibold">Tardis Blue</MTypography>
          <MTypography variant="body2" class="text-gray-600">rgb(1, 52, 116)</MTypography>
          <MTypography variant="body2" class="text-gray-600">Secondary Brand</MTypography>
        </div>
        
        <div>
          <div class="w-full h-24 rounded-lg mb-2" style="background-color: rgb(50, 174, 136);"></div>
          <MTypography variant="subtitle1" class="font-semibold">Herbal Green</MTypography>
          <MTypography variant="body2" class="text-gray-600">rgb(50, 174, 136)</MTypography>
          <MTypography variant="body2" class="text-gray-600">Success Color</MTypography>
        </div>
        
        <div>
          <div class="w-full h-24 rounded-lg mb-2" style="background-color: rgb(255, 188, 35);"></div>
          <MTypography variant="subtitle1" class="font-semibold">Warning Yellow</MTypography>
          <MTypography variant="body2" class="text-gray-600">rgb(255, 188, 35)</MTypography>
          <MTypography variant="body2" class="text-gray-600">Warning Color</MTypography>
        </div>
      </div>
    </div>
  `,
});

// Button Showcase
export const BrandButtons = () => ({
  components: {
    MButton,
    MTypography,
  },
  template: `
    <div class="p-8 space-y-8">
      <MTypography variant="h3" class="mb-6">Mariner Finance Buttons</MTypography>
      
      <div class="space-y-6">
        <div>
          <MTypography variant="h6" class="mb-4">Primary Buttons</MTypography>
          <div class="flex gap-4 flex-wrap">
            <MButton text="Apply Now" variant="primary" class="mf-button-primary" />
            <MButton text="Get Started" variant="primary" size="large" class="mf-button-primary" />
            <MButton text="Learn More" variant="primary" size="small" class="mf-button-primary" />
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" class="mb-4">Secondary Buttons</MTypography>
          <div class="flex gap-4 flex-wrap">
            <MButton text="Contact Us" variant="secondary" class="mf-button-secondary" />
            <MButton text="Support" variant="secondary" size="large" class="mf-button-secondary" />
            <MButton text="Help" variant="secondary" size="small" class="mf-button-secondary" />
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" class="mb-4">Outlined Buttons</MTypography>
          <div class="flex gap-4 flex-wrap">
            <MButton text="View Details" variant="outlined" color="primary" class="mf-button-outlined-primary" />
            <MButton text="Cancel" variant="outlined" color="secondary" class="mf-button-outlined-secondary" />
            <MButton text="Reset" variant="outlined" color="primary" size="large" class="mf-button-outlined-primary" />
          </div>
        </div>
      </div>
    </div>
  `,
});

// Financial Dashboard
export const FinancialDashboard = () => ({
  components: {
    MAppBar,
    MToolbar,
    MTypography,
    MButton,
    MAvatar,
    MBadge,
    MAlert,
    MChip,
  },
  data() {
    return {
      notifications: 3,
      loanAmount: '$15,000',
      interestRate: '8.99%',
      monthlyPayment: '$187',
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Mariner Finance App Bar -->
      <MAppBar class="mf-app-bar">
        <MToolbar class="justify-between">
          <div class="flex items-center space-x-4">
            <MTypography variant="h6" class="text-white font-bold">
              Mariner Finance
            </MTypography>
            <MChip 
              text="Dashboard" 
              color="primary" 
              variant="outlined" 
              class="bg-white bg-opacity-20 text-white border-white border-opacity-30"
            />
          </div>
          
          <div class="flex items-center space-x-4">
            <MBadge :badge-content="notifications" color="warning">
              <MButton 
                text="Notifications" 
                variant="text" 
                class="text-white hover:bg-white hover:bg-opacity-10"
              />
            </MBadge>
            <MAvatar 
              :src="null" 
              alt="John D" 
              class="mf-avatar"
            />
          </div>
        </MToolbar>
      </MAppBar>
      
      <!-- Dashboard Content -->
      <div class="pt-16 p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Welcome Section -->
          <div class="mb-8">
            <MTypography variant="h4" class="mb-2 font-bold" style="color: var(--mf-primary);">
              Welcome back, John
            </MTypography>
            <MTypography variant="body1" class="text-gray-600">
              Manage your loans and explore new financial opportunities
            </MTypography>
          </div>
          
          <!-- Alert Section -->
          <div class="mb-8">
            <MAlert 
              severity="success" 
              title="Application Approved!" 
              class="mf-alert-success"
            >
              Your personal loan application for <strong>$10,000</strong> has been approved. 
              Funds will be available in your account within 1-2 business days.
            </MAlert>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <MTypography variant="h5" class="font-bold mb-2" style="color: var(--mf-primary);">
                {{ loanAmount }}
              </MTypography>
              <MTypography variant="body2" class="text-gray-600">
                Available Credit
              </MTypography>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <MTypography variant="h5" class="font-bold mb-2" style="color: var(--mf-success);">
                {{ interestRate }}
              </MTypography>
              <MTypography variant="body2" class="text-gray-600">
                Best Rate Available
              </MTypography>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
              <MTypography variant="h5" class="font-bold mb-2" style="color: var(--mf-secondary);">
                {{ monthlyPayment }}
              </MTypography>
              <MTypography variant="body2" class="text-gray-600">
                Estimated Monthly
              </MTypography>
            </div>
          </div>
          
          <!-- Quick Actions -->
          <div class="bg-white p-6 rounded-lg shadow-sm">
            <MTypography variant="h6" class="mb-4 font-semibold">
              Quick Actions
            </MTypography>
            <div class="flex gap-4 flex-wrap">
              <MButton 
                text="Apply for New Loan" 
                variant="primary" 
                class="mf-button-primary"
              />
              <MButton 
                text="Calculate Payment" 
                variant="outlined" 
                color="primary"
                class="mf-button-outlined-primary"
              />
              <MButton 
                text="Contact Support" 
                variant="outlined" 
                color="secondary"
                class="mf-button-outlined-secondary"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

// Typography Showcase
export const BrandTypography = () => ({
  components: {
    MTypography,
  },
  template: `
    <div class="p-8 space-y-8" style="font-family: var(--mf-font-family);">
      <MTypography variant="h3" class="mb-6">Mariner Finance Typography</MTypography>
      
      <div class="space-y-6">
        <div>
          <MTypography variant="h1" class="mb-2" style="font-family: var(--mf-font-family-bold);">
            Personal Loans Made Simple
          </MTypography>
          <MTypography variant="body2" class="text-gray-500">
            MuliBold, 2.5rem, Weight 700
          </MTypography>
        </div>
        
        <div>
          <MTypography variant="h2" class="mb-2" style="font-family: var(--mf-font-family-bold);">
            Get the Funds You Need
          </MTypography>
          <MTypography variant="body2" class="text-gray-500">
            MuliBold, 2rem, Weight 700
          </MTypography>
        </div>
        
        <div>
          <MTypography variant="body1" class="mb-2">
            At Mariner Finance, we understand that life can present unexpected financial challenges. 
            Whether you need funds for home improvements, debt consolidation, or unexpected expenses, 
            our personal loans are designed to help you achieve your financial goals.
          </MTypography>
          <MTypography variant="body2" class="text-gray-500">
            Muli, 1rem, Weight 400, Line Height 1.5
          </MTypography>
        </div>
      </div>
    </div>
  `,
});

// Component Showcase
export const ComponentShowcase = () => ({
  components: {
    MAlert,
    MChip,
    MAvatar,
    MBadge,
    MTypography,
  },
  template: `
    <div class="p-8 space-y-8">
      <MTypography variant="h3" class="mb-6">Mariner Finance Components</MTypography>
      
      <!-- Alerts -->
      <div>
        <MTypography variant="h6" class="mb-4">Alerts</MTypography>
        <div class="space-y-4">
          <MAlert severity="success" title="Loan Approved" class="mf-alert-success">
            Your personal loan has been approved for $15,000 at 8.99% APR.
          </MAlert>
          <MAlert severity="warning" title="Payment Due Soon" class="mf-alert-warning">
            Your next payment of $187.00 is due on February 15, 2024.
          </MAlert>
          <MAlert severity="info" title="Rate Change Notice" class="mf-alert-info">
            New competitive rates are now available. Check if you qualify for a lower rate.
          </MAlert>
        </div>
      </div>
      
      <!-- Chips -->
      <div>
        <MTypography variant="h6" class="mb-4">Status Chips</MTypography>
        <div class="flex gap-3 flex-wrap">
          <MChip text="Approved" color="success" class="mf-chip-success" />
          <MChip text="Pending Review" color="warning" />
          <MChip text="In Progress" color="primary" class="mf-chip-primary" />
          <MChip text="Pre-Qualified" color="info" />
          <MChip text="Active Loan" color="success" />
        </div>
      </div>
      
      <!-- Avatars and Badges -->
      <div>
        <MTypography variant="h6" class="mb-4">User Elements</MTypography>
        <div class="flex gap-6 items-center">
          <MAvatar src="" alt="JD" class="mf-avatar" />
          <MAvatar src="" alt="MR" class="mf-avatar secondary" />
          
          <MBadge badge-content="3" color="primary" class="mf-badge primary">
            <div class="w-8 h-8 bg-gray-200 rounded"></div>
          </MBadge>
          
          <MBadge badge-content="!" color="warning" class="mf-badge warning">
            <div class="w-8 h-8 bg-gray-200 rounded"></div>
          </MBadge>
        </div>
      </div>
    </div>
  `,
});