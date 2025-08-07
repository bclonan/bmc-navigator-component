import MInput from '../../../components/mui/MInput.vue';

export default {
  title: 'Core Components/Form Controls/Input',
  component: MInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Input component with Your Town Finance styling. Supports validation, various input types, and accessibility features optimized for financial data entry.',
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Input label text',
      defaultValue: 'Label',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'HTML input type',
      defaultValue: 'text',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Mark field as required',
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable input',
      defaultValue: false,
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
      defaultValue: false,
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text below input',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make input full width',
      defaultValue: false,
    },
  },
};

export const Interactive = (args) => ({
  components: { MInput },
  setup() {
    return { args };
  },
  template: `
    <div class="w-80">
      <MInput v-bind="args" />
    </div>
  `,
});

Interactive.args = {
  label: 'Annual Income',
  type: 'number',
  placeholder: 'Enter your annual income',
  required: false,
  disabled: false,
  error: false,
  helperText: 'Enter your total yearly income before taxes',
  fullWidth: true,
};

export const FinancialInputs = () => ({
  components: { MInput },
  template: `
    <div class="space-y-6 max-w-md">
      <h3 class="text-xl font-semibold mb-4">Financial Data Inputs</h3>
      
      <MInput 
        label="Loan Amount" 
        type="number" 
        placeholder="15000"
        helperText="Enter amount between $1,000 - $100,000"
        required
        fullWidth
      />
      
      <MInput 
        label="Annual Income" 
        type="number" 
        placeholder="50000"
        helperText="Your total yearly income before taxes"
        required
        fullWidth
      />
      
      <MInput 
        label="Monthly Debt Payments" 
        type="number" 
        placeholder="850"
        helperText="Include credit cards, loans, and other monthly payments"
        fullWidth
      />
      
      <MInput 
        label="Social Security Number" 
        type="password" 
        placeholder="XXX-XX-XXXX"
        helperText="Your SSN is encrypted and secure"
        required
        fullWidth
      />
      
      <MInput 
        label="Email Address" 
        type="email" 
        placeholder="john.doe@email.com"
        helperText="We'll send loan updates to this email"
        required
        fullWidth
      />
      
      <MInput 
        label="Phone Number" 
        type="tel" 
        placeholder="(555) 123-4567"
        helperText="For loan status updates and verification"
        required
        fullWidth
      />
    </div>
  `,
});

export const ValidationStates = () => ({
  components: { MInput },
  template: `
    <div class="space-y-6 max-w-md">
      <h3 class="text-xl font-semibold mb-4">Validation States</h3>
      
      <MInput 
        label="Valid Input" 
        type="text" 
        value="John Doe"
        helperText="This field is correctly filled"
        fullWidth
      />
      
      <MInput 
        label="Required Field" 
        type="text" 
        placeholder="This field is required"
        required
        helperText="Please fill in this required field"
        fullWidth
      />
      
      <MInput 
        label="Invalid Email" 
        type="email" 
        value="invalid-email"
        error
        helperText="Please enter a valid email address"
        fullWidth
      />
      
      <MInput 
        label="Income Too Low" 
        type="number" 
        value="15000"
        error
        helperText="Minimum annual income requirement is $20,000"
        fullWidth
      />
      
      <MInput 
        label="Disabled Field" 
        type="text" 
        value="This field is disabled"
        disabled
        helperText="This field cannot be modified"
        fullWidth
      />
      
      <MInput 
        label="Processing..." 
        type="text" 
        value="Verifying information"
        disabled
        helperText="Please wait while we verify your information"
        fullWidth
      />
    </div>
  `,
});

export const InputTypes = () => ({
  components: { MInput },
  template: `
    <div class="space-y-6 max-w-md">
      <h3 class="text-xl font-semibold mb-4">Input Types</h3>
      
      <MInput 
        label="Text Input" 
        type="text" 
        placeholder="Enter text"
        helperText="Standard text input"
        fullWidth
      />
      
      <MInput 
        label="Number Input" 
        type="number" 
        placeholder="12345"
        helperText="Numeric values only"
        fullWidth
      />
      
      <MInput 
        label="Email Input" 
        type="email" 
        placeholder="user@example.com"
        helperText="Email address format"
        fullWidth
      />
      
      <MInput 
        label="Password Input" 
        type="password" 
        placeholder="••••••••"
        helperText="Secure password field"
        fullWidth
      />
      
      <MInput 
        label="Phone Input" 
        type="tel" 
        placeholder="(555) 123-4567"
        helperText="Phone number format"
        fullWidth
      />
      
      <MInput 
        label="URL Input" 
        type="url" 
        placeholder="https://example.com"
        helperText="Website URL format"
        fullWidth
      />
    </div>
  `,
});

export const AccessibilityShowcase = () => ({
  components: { MInput },
  template: `
    <div class="space-y-6 max-w-md">
      <h3 class="text-xl font-semibold mb-4">Accessibility Features</h3>
      
      <MInput 
        label="Properly Labeled Field"
        type="text" 
        placeholder="Tab to focus"
        helperText="This field has proper label association"
        aria-describedby="help-1"
        fullWidth
      />
      <div id="help-1" class="sr-only">Additional context for screen readers</div>
      
      <MInput 
        label="Required Field with Indicator"
        type="email" 
        placeholder="required@example.com"
        required
        aria-required="true"
        helperText="Required fields are properly marked for screen readers"
        fullWidth
      />
      
      <MInput 
        label="Error State with Announcement"
        type="number" 
        value="invalid"
        error
        aria-invalid="true"
        helperText="Screen readers will announce this error state"
        fullWidth
      />
      
      <MInput 
        label="Field with Detailed Description"
        type="text" 
        placeholder="Enter information"
        aria-describedby="detailed-help"
        helperText="Complex help text is properly associated"
        fullWidth
      />
      <div id="detailed-help" class="text-sm text-gray-600 mt-1">
        This field accepts alphanumeric characters and common punctuation. 
        Maximum length is 100 characters.
      </div>
      
      <div class="border-t pt-4">
        <p class="text-sm text-gray-600 mb-3">
          <strong>Keyboard Navigation:</strong> Use Tab to move between fields, 
          Enter to submit forms, Escape to cancel.
        </p>
        <p class="text-sm text-gray-600">
          <strong>Screen Reader Support:</strong> All fields include proper labels, 
          descriptions, and state announcements.
        </p>
      </div>
    </div>
  `,
});