import MButton from '../../components/mui/MButton.vue';
import MAlert from '../../components/mui/MAlert.vue';
import MChip from '../../components/mui/MChip.vue';
import MAppBar from '../../components/mui/MAppBar.vue';
import MToolbar from '../../components/mui/MToolbar.vue';
import MAvatar from '../../components/mui/MAvatar.vue';
import MBadge from '../../components/mui/MBadge.vue';
import MTypography from '../../components/mui/MTypography.vue';
import MInput from '../../components/mui/MInput.vue';
import MFormControl from '../../components/mui/MFormControl.vue';
import MInputLabel from '../../components/mui/MInputLabel.vue';
import MDialog from '../../components/mui/MDialog.vue';
import MDialogTitle from '../../components/mui/MDialogTitle.vue';
import MDialogContent from '../../components/mui/MDialogContent.vue';
import MDialogActions from '../../components/mui/MDialogActions.vue';
import MCircularProgress from '../../components/mui/MCircularProgress.vue';
import MLinearProgress from '../../components/mui/MLinearProgress.vue';

export default {
  title: 'MUI Components/Overview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete overview of Material-UI components with Mariner Finance brand theme integration. All components feature authentic brand colors, Muli typography, and consistent styling.',
      },
    },
  },
};

export const ComponentLibrary = () => ({
  components: {
    MButton,
    MAlert,
    MChip,
    MAppBar,
    MToolbar,
    MAvatar,
    MBadge,
    MTypography,
    MInput,
    MFormControl,
    MInputLabel,
    MDialog,
    MDialogTitle,
    MDialogContent,
    MDialogActions,
    MCircularProgress,
    MLinearProgress
  },
  data() {
    return {
      dialogOpen: false,
      progressValue: 65,
      notifications: 3
    };
  },
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header with Mariner Finance Branding -->
      <MAppBar class="mf-app-bar">
        <MToolbar class="justify-between">
          <div class="flex items-center space-x-4">
            <MTypography variant="h6" class="text-white font-bold">
              Mariner Finance Material-UI Components
            </MTypography>
            <MChip text="Complete Library" color="primary" variant="outlined" class="bg-white bg-opacity-20 text-white border-white border-opacity-30" />
          </div>
          <div class="flex items-center space-x-4">
            <MBadge :badge-content="notifications" color="warning">
              <MAvatar alt="Demo" class="mf-avatar" />
            </MBadge>
          </div>
        </MToolbar>
      </MAppBar>

      <!-- Main Content -->
      <div class="pt-16 p-8">
        <div class="max-w-7xl mx-auto space-y-12">
          
          <!-- Typography Section -->
          <section>
            <MTypography variant="h3" class="mb-6 font-bold" style="color: var(--mf-primary);">
              Typography & Brand Identity
            </MTypography>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="space-y-4">
                <MTypography variant="h1" style="font-family: var(--mf-font-family-bold); color: var(--mf-primary);">
                  Personal Loans
                </MTypography>
                <MTypography variant="h2" style="font-family: var(--mf-font-family-bold); color: var(--mf-secondary);">
                  Made Simple
                </MTypography>
                <MTypography variant="body1" style="color: var(--mf-text-primary);">
                  Experience financial freedom with competitive rates, flexible terms, and a streamlined application process designed with your needs in mind.
                </MTypography>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm">
                <MTypography variant="h5" class="mb-4" style="color: var(--mf-primary);">
                  Brand Colors
                </MTypography>
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 rounded" style="background-color: rgb(56, 96, 190);"></div>
                    <MTypography variant="body2">Matt Blue</MTypography>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 rounded" style="background-color: rgb(1, 52, 116);"></div>
                    <MTypography variant="body2">Tardis Blue</MTypography>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 rounded" style="background-color: rgb(50, 174, 136);"></div>
                    <MTypography variant="body2">Herbal Green</MTypography>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-6 h-6 rounded" style="background-color: rgb(255, 188, 35);"></div>
                    <MTypography variant="body2">Warning Yellow</MTypography>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Buttons Section -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              Interactive Elements
            </MTypography>
            
            <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div>
                <MTypography variant="h6" class="mb-4">Primary Actions</MTypography>
                <div class="flex gap-4 flex-wrap">
                  <MButton text="Apply for Loan" variant="filled" color="primary" class="mf-button-primary" />
                  <MButton text="Check Eligibility" variant="outlined" color="primary" class="mf-button-outlined-primary" />
                  <MButton text="Calculate Payment" variant="outlined" color="secondary" class="mf-button-outlined-secondary" />
                  <MButton text="Processing..." variant="filled" color="primary" loading class="mf-button-primary" />
                </div>
              </div>
              
              <div>
                <MTypography variant="h6" class="mb-4">Status & Information</MTypography>
                <div class="flex gap-3 flex-wrap">
                  <MChip text="Approved" color="success" class="mf-chip-success" />
                  <MChip text="Pending Review" color="warning" class="mf-chip-warning" />
                  <MChip text="Pre-Qualified" color="primary" class="mf-chip-primary" />
                  <MChip text="In Progress" color="info" />
                </div>
              </div>
            </div>
          </section>

          <!-- Forms Section -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              Form Components
            </MTypography>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MFormControl>
                  <MInputLabel class="mf-form-label">Loan Amount</MInputLabel>
                  <MInput 
                    variant="outlined" 
                    placeholder="$15,000" 
                    type="text"
                    class="mf-input-focused"
                  />
                </MFormControl>
                
                <MFormControl>
                  <MInputLabel class="mf-form-label">Email Address</MInputLabel>
                  <MInput 
                    variant="outlined" 
                    placeholder="your.email@example.com" 
                    type="email"
                    class="mf-input-focused"
                  />
                </MFormControl>
              </div>
            </div>
          </section>

          <!-- Feedback Section -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              Feedback & Notifications
            </MTypography>
            
            <div class="space-y-4">
              <MAlert severity="success" title="Application Approved!" class="mf-alert-success">
                Your personal loan application for $15,000 has been approved with an 8.99% APR.
              </MAlert>
              
              <MAlert severity="warning" title="Payment Due Soon" class="mf-alert-warning">
                Your next payment of $187.00 is due on February 15, 2024.
              </MAlert>
              
              <MAlert severity="info" title="New Rate Available" class="mf-alert-info">
                You may qualify for a lower interest rate. Check your eligibility today.
              </MAlert>
            </div>
          </section>

          <!-- Progress Indicators -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              Progress Indicators
            </MTypography>
            
            <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
              <div>
                <MTypography variant="body1" class="mb-2">Application Progress</MTypography>
                <MLinearProgress :value="progressValue" class="mf-progress-primary" />
                <MTypography variant="body2" class="mt-2 text-gray-600">{{ progressValue }}% Complete</MTypography>
              </div>
              
              <div class="flex items-center space-x-4">
                <MCircularProgress :size="40" />
                <MTypography variant="body1">Processing your application...</MTypography>
              </div>
            </div>
          </section>

          <!-- User Interface Elements -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              User Interface Elements
            </MTypography>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center space-x-4">
                  <MAvatar alt="John Doe" class="mf-avatar" />
                  <div>
                    <MTypography variant="subtitle1">John Doe</MTypography>
                    <MTypography variant="body2" color="textSecondary">Premium Customer</MTypography>
                  </div>
                </div>
                
                <div class="flex items-center space-x-4">
                  <MBadge badge-content="5" color="primary" class="mf-badge primary">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span class="text-xs">📧</span>
                    </div>
                  </MBadge>
                  
                  <MBadge badge-content="!" color="warning" class="mf-badge warning">
                    <div class="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <span class="text-xs">⚠️</span>
                    </div>
                  </MBadge>
                </div>
              </div>
              
              <MButton 
                text="Open Loan Details" 
                variant="outlined" 
                color="primary" 
                class="mf-button-outlined-primary"
                @click="dialogOpen = true"
              />
            </div>
          </section>

          <!-- Component Statistics -->
          <section>
            <MTypography variant="h4" class="mb-6" style="color: var(--mf-secondary);">
              Component Library Stats
            </MTypography>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <MTypography variant="h3" class="font-bold mb-2" style="color: var(--mf-primary);">25+</MTypography>
                <MTypography variant="body2">Components</MTypography>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <MTypography variant="h3" class="font-bold mb-2" style="color: var(--mf-success);">100%</MTypography>
                <MTypography variant="body2">Brand Compliant</MTypography>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <MTypography variant="h3" class="font-bold mb-2" style="color: var(--mf-secondary);">Vue 3</MTypography>
                <MTypography variant="body2">Composition API</MTypography>
              </div>
              
              <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <MTypography variant="h3" class="font-bold mb-2" style="color: var(--mf-warning-dark);">Muli</MTypography>
                <MTypography variant="body2">Brand Typography</MTypography>
              </div>
            </div>
          </section>

        </div>
      </div>

      <!-- Modal Dialog -->
      <MDialog :open="dialogOpen" @close="dialogOpen = false" class="mf-dialog">
        <MDialogTitle class="mf-dialog-title">Loan Application Details</MDialogTitle>
        <MDialogContent class="mf-dialog-content">
          <div class="space-y-4">
            <div class="flex justify-between">
              <MTypography variant="body1">Loan Amount:</MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">$15,000</MTypography>
            </div>
            <div class="flex justify-between">
              <MTypography variant="body1">Interest Rate:</MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-success);">8.99% APR</MTypography>
            </div>
            <div class="flex justify-between">
              <MTypography variant="body1">Monthly Payment:</MTypography>
              <MTypography variant="body1" class="font-semibold" style="color: var(--mf-primary);">$187.00</MTypography>
            </div>
            <div class="flex justify-between">
              <MTypography variant="body1">Term:</MTypography>
              <MTypography variant="body1" class="font-semibold">60 months</MTypography>
            </div>
          </div>
        </MDialogContent>
        <MDialogActions class="mf-dialog-actions">
          <MButton text="Cancel" variant="outlined" color="secondary" @click="dialogOpen = false" />
          <MButton text="Accept Terms" variant="filled" color="primary" class="mf-button-primary" @click="dialogOpen = false" />
        </MDialogActions>
      </MDialog>
    </div>
  `
});

export const ComponentCategories = () => ({
  components: { MTypography, MChip },
  template: `
    <div class="p-8 space-y-8">
      <MTypography variant="h3" class="mb-6" style="color: var(--mf-primary);">
        Material-UI Component Categories
      </MTypography>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Data Display -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Data Display
          </MTypography>
          <div class="space-y-2">
            <MChip text="Avatar" color="primary" size="small" class="mf-chip-primary" />
            <MChip text="Badge" color="primary" size="small" class="mf-chip-primary" />
            <MChip text="Chip" color="primary" size="small" class="mf-chip-primary" />
            <MChip text="Typography" color="primary" size="small" class="mf-chip-primary" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            Components for presenting data and user information with consistent brand styling.
          </MTypography>
        </div>
        
        <!-- Feedback -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Feedback
          </MTypography>
          <div class="space-y-2">
            <MChip text="Alert" color="success" size="small" class="mf-chip-success" />
            <MChip text="Circular Progress" color="success" size="small" />
            <MChip text="Linear Progress" color="success" size="small" />
            <MChip text="Snackbar" color="success" size="small" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            User feedback components for notifications, loading states, and status updates.
          </MTypography>
        </div>
        
        <!-- Inputs -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Inputs
          </MTypography>
          <div class="space-y-2">
            <MChip text="Button" color="warning" size="small" />
            <MChip text="Form Control" color="warning" size="small" />
            <MChip text="Input" color="warning" size="small" />
            <MChip text="Icon Button" color="warning" size="small" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            Interactive input components for forms and user interactions.
          </MTypography>
        </div>
        
        <!-- Layout -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Layout
          </MTypography>
          <div class="space-y-2">
            <MChip text="App Bar" color="info" size="small" />
            <MChip text="Drawer" color="info" size="small" />
            <MChip text="Toolbar" color="info" size="small" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            Structural components for application layout and navigation.
          </MTypography>
        </div>
        
        <!-- Navigation -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Navigation
          </MTypography>
          <div class="space-y-2">
            <MChip text="List" color="secondary" size="small" />
            <MChip text="List Item" color="secondary" size="small" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            Navigation components for menu systems and content organization.
          </MTypography>
        </div>
        
        <!-- Surfaces -->
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <MTypography variant="h5" class="mb-4" style="color: var(--mf-secondary);">
            Surfaces
          </MTypography>
          <div class="space-y-2">
            <MChip text="Dialog" color="default" size="small" />
            <MChip text="Dialog Title" color="default" size="small" />
            <MChip text="Dialog Content" color="default" size="small" />
            <MChip text="Dialog Actions" color="default" size="small" />
          </div>
          <MTypography variant="body2" class="mt-4 text-gray-600">
            Surface components for modals, cards, and content containers.
          </MTypography>
        </div>
        
      </div>
      
      <div class="mt-12 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-lg">
        <MTypography variant="h4" class="mb-4" style="color: var(--mf-primary);">
          Mariner Finance Brand Integration
        </MTypography>
        <MTypography variant="body1" class="mb-4" style="color: var(--mf-text-primary);">
          Every component in this library has been carefully crafted to reflect Mariner Finance's brand identity:
        </MTypography>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <MTypography variant="subtitle1" class="mb-2" style="color: var(--mf-secondary);">
              Brand Colors
            </MTypography>
            <MTypography variant="body2" style="color: var(--mf-text-secondary);">
              Matt Blue (rgb(56, 96, 190)) and Tardis Blue (rgb(1, 52, 116)) as primary colors, 
              with Herbal Green for success states and brand-appropriate warning colors.
            </MTypography>
          </div>
          <div>
            <MTypography variant="subtitle1" class="mb-2" style="color: var(--mf-secondary);">
              Typography
            </MTypography>
            <MTypography variant="body2" style="color: var(--mf-text-secondary);">
              Muli font family throughout the component library, matching Mariner Finance's 
              official website typography for brand consistency.
            </MTypography>
          </div>
        </div>
      </div>
    </div>
  `
});

ComponentLibrary.parameters = {
  docs: {
    description: {
      story: 'Complete showcase of all Material-UI components integrated with Mariner Finance brand theme, demonstrating real-world usage scenarios.',
    },
  },
};

ComponentCategories.parameters = {
  docs: {
    description: {
      story: 'Overview of component categories and their purposes within the Material-UI component library ecosystem.',
    },
  },
};