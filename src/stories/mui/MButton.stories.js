import MButton from '../../components/mui/MButton.vue';

export default {
  title: 'MUI Components/Inputs/Button',
  component: MButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Button component with Mariner Finance brand styling. Optimized for financial applications with comprehensive accessibility support, loading states, and interactive controls for testing all variants.',
      },
      canvas: { sourceState: 'shown' },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard', enabled: true },
        ],
      },
    },
    backgrounds: {
      values: [
        { name: 'mariner-light', value: '#ffffff' },
        { name: 'mariner-surface', value: '#f4f4f4' },
        { name: 'financial-green', value: 'rgb(249, 255, 250)' },
      ],
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'Button text content',
      defaultValue: 'Button'
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'text'],
      description: 'Button variant style',
      defaultValue: 'filled'
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info'],
      description: 'Button color theme',
      defaultValue: 'primary'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable button interaction',
      defaultValue: false
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
      defaultValue: false
    },
    loadingText: {
      control: { type: 'text' },
      description: 'Text to show when loading',
      defaultValue: ''
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon class (e.g., fas fa-star)',
      defaultValue: ''
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make button full width',
      defaultValue: false
    }
  }
};

// Default story with controls
export const Default = (args) => ({
  components: { MButton },
  setup() {
    return { args };
  },
  template: '<MButton v-bind="args" @click="onClick" />',
  methods: {
    onClick() {
      console.log('Button clicked!');
    }
  }
});

Default.args = {
  text: 'Apply for Loan',
  variant: 'filled',
  color: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  loadingText: '',
  icon: '',
  fullWidth: false
};

// Mariner Finance Primary
export const MarinerPrimary = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4">
      <MButton text="Get Started Today" variant="filled" color="primary" size="large" class="mf-button-primary" />
      <MButton text="Apply Now" variant="filled" color="primary" class="mf-button-primary" />
      <MButton text="Learn More" variant="filled" color="primary" size="small" class="mf-button-primary" />
    </div>
  `
});

// Mariner Finance Secondary
export const MarinerSecondary = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4">
      <MButton text="Contact Support" variant="filled" color="secondary" size="large" class="mf-button-secondary" />
      <MButton text="View Account" variant="filled" color="secondary" class="mf-button-secondary" />
      <MButton text="Help" variant="filled" color="secondary" size="small" class="mf-button-secondary" />
    </div>
  `
});

// Outlined Variants
export const OutlinedVariants = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4">
      <div class="space-x-4">
        <MButton text="View Details" variant="outlined" color="primary" class="mf-button-outlined-primary" />
        <MButton text="Cancel" variant="outlined" color="secondary" class="mf-button-outlined-secondary" />
        <MButton text="Reset" variant="outlined" color="primary" />
      </div>
      <div class="space-x-4">
        <MButton text="Success Action" variant="outlined" color="success" />
        <MButton text="Warning Action" variant="outlined" color="warning" />
        <MButton text="Error Action" variant="outlined" color="error" />
      </div>
    </div>
  `
});

// Loading States
export const LoadingStates = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4">
      <div class="space-x-4">
        <MButton text="Processing Application" variant="filled" color="primary" loading class="mf-button-primary" />
        <MButton text="Submitting" variant="filled" color="secondary" loading class="mf-button-secondary" />
        <MButton text="Loading" variant="outlined" color="primary" loading />
      </div>
      <div class="space-x-4">
        <MButton text="Checking Eligibility" variant="filled" color="primary" loading loadingText="Please wait..." class="mf-button-primary" />
        <MButton text="Verifying" variant="outlined" color="secondary" loading loadingText="Verifying..." />
      </div>
    </div>
  `
});

// With Icons
export const WithIcons = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4">
      <div class="space-x-4">
        <MButton text="Download Statement" variant="filled" color="primary" icon="fas fa-download" class="mf-button-primary" />
        <MButton text="Print" variant="outlined" color="secondary" icon="fas fa-print" />
        <MButton text="Share" variant="text" color="primary" icon="fas fa-share" />
      </div>
      <div class="space-x-4">
        <MButton text="Calculate" variant="filled" color="success" icon="fas fa-calculator" />
        <MButton text="Warning" variant="filled" color="warning" icon="fas fa-exclamation-triangle" />
        <MButton text="Delete" variant="outlined" color="error" icon="fas fa-trash" />
      </div>
    </div>
  `
});

// Sizes Showcase
export const Sizes = () => ({
  components: { MButton },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Primary Buttons</h4>
        <div class="space-x-4 flex items-center">
          <MButton text="Small" variant="filled" color="primary" size="small" class="mf-button-primary" />
          <MButton text="Medium" variant="filled" color="primary" size="medium" class="mf-button-primary" />
          <MButton text="Large" variant="filled" color="primary" size="large" class="mf-button-primary" />
        </div>
      </div>
      <div>
        <h4 class="mb-4 text-lg font-semibold">Outlined Buttons</h4>
        <div class="space-x-4 flex items-center">
          <MButton text="Small" variant="outlined" color="primary" size="small" class="mf-button-outlined-primary" />
          <MButton text="Medium" variant="outlined" color="primary" size="medium" class="mf-button-outlined-primary" />
          <MButton text="Large" variant="outlined" color="primary" size="large" class="mf-button-outlined-primary" />
        </div>
      </div>
    </div>
  `
});

// Full Width
export const FullWidth = () => ({
  components: { MButton },
  template: `
    <div class="space-y-4 max-w-md">
      <MButton text="Apply for Personal Loan" variant="filled" color="primary" full-width class="mf-button-primary" />
      <MButton text="Check Your Rate" variant="outlined" color="primary" full-width class="mf-button-outlined-primary" />
      <MButton text="Contact a Specialist" variant="filled" color="secondary" full-width class="mf-button-secondary" />
    </div>
  `
});

// Financial Actions
export const FinancialActions = () => ({
  components: { MButton },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Loan Applications</h4>
        <div class="space-x-4">
          <MButton text="Apply for Personal Loan" variant="filled" color="primary" icon="fas fa-money-bill-wave" class="mf-button-primary" />
          <MButton text="Check Eligibility" variant="outlined" color="primary" icon="fas fa-check-circle" class="mf-button-outlined-primary" />
          <MButton text="Calculate Payment" variant="text" color="primary" icon="fas fa-calculator" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Account Management</h4>
        <div class="space-x-4">
          <MButton text="Make Payment" variant="filled" color="success" icon="fas fa-credit-card" />
          <MButton text="View Statements" variant="outlined" color="secondary" icon="fas fa-file-alt" />
          <MButton text="Contact Support" variant="filled" color="secondary" icon="fas fa-headset" class="mf-button-secondary" />
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Alerts & Notifications</h4>
        <div class="space-x-4">
          <MButton text="Payment Due Soon" variant="filled" color="warning" icon="fas fa-exclamation-triangle" />
          <MButton text="Rate Change Alert" variant="outlined" color="warning" icon="fas fa-bell" />
          <MButton text="Account Locked" variant="filled" color="error" icon="fas fa-lock" />
        </div>
      </div>
    </div>
  `
});

// Interactive Playground
export const Playground = (args) => ({
  components: { MButton },
  setup() {
    return { args };
  },
  template: `
    <div class="p-8">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Interactive Button Playground</h3>
        <p class="text-gray-600">Use the controls below to customize the button appearance and behavior.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MButton 
          v-bind="args" 
          @click="onClick"
          :class="getButtonClass(args)"
        />
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Click the button to see console output. Use the Controls panel to modify properties.
      </div>
    </div>
  `,
  methods: {
    onClick() {
      console.log('Playground button clicked with args:', this.args);
      alert(`Button clicked!\nText: ${this.args.text}\nVariant: ${this.args.variant}\nColor: ${this.args.color}`);
    },
    getButtonClass(args) {
      if (args.variant === 'filled' && args.color === 'primary') return 'mf-button-primary';
      if (args.variant === 'filled' && args.color === 'secondary') return 'mf-button-secondary';
      if (args.variant === 'outlined' && args.color === 'primary') return 'mf-button-outlined-primary';
      if (args.variant === 'outlined' && args.color === 'secondary') return 'mf-button-outlined-secondary';
      return '';
    }
  }
});

Playground.args = {
  text: 'Interactive Button',
  variant: 'filled',
  color: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  loadingText: 'Loading...',
  icon: '',
  fullWidth: false
};