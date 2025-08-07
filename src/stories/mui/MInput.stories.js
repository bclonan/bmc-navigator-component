import MInput from '../../components/mui/MInput.vue';
import MFormControl from '../../components/mui/MFormControl.vue';
import MInputLabel from '../../components/mui/MInputLabel.vue';
import MFormHelperText from '../../components/mui/MFormHelperText.vue';

export default {
  title: 'Core Components/Form Controls/Input',
  component: MInput,
  parameters: {
    docs: {
      description: {
        component: 'Material-UI Input component for text input with Your Town Finance brand styling, validation states, and form integration.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Input value',
      defaultValue: ''
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
      defaultValue: 'Enter text...'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
      defaultValue: 'text'
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'standard'],
      description: 'Input variant',
      defaultValue: 'outlined'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Input size',
      defaultValue: 'medium'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable input',
      defaultValue: false
    },
    error: {
      control: { type: 'boolean' },
      description: 'Show error state',
      defaultValue: false
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required field',
      defaultValue: false
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Full width input',
      defaultValue: false
    }
  }
};

export const Default = (args) => ({
  components: { MInput },
  setup() {
    return { args };
  },
  template: `
    <MInput 
      v-bind="args" 
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  `,
  methods: {
    onInput(event) {
      console.log('Input event:', event.target.value);
    },
    onChange(event) {
      console.log('Change event:', event.target.value);
    },
    onFocus(event) {
      console.log('Focus event');
    },
    onBlur(event) {
      console.log('Blur event');
    }
  }
});

Default.args = {
  value: '',
  placeholder: 'Enter your information',
  type: 'text',
  variant: 'outlined',
  size: 'medium',
  disabled: false,
  error: false,
  required: false,
  fullWidth: false
};

export const LoanApplicationForm = () => ({
  components: { MInput, MFormControl, MInputLabel, MFormHelperText },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        income: '',
        loanAmount: '',
        ssn: ''
      },
      errors: {}
    };
  },
  methods: {
    validateField(field, value) {
      this.errors = { ...this.errors };
      
      switch (field) {
        case 'email':
          if (value && !/\S+@\S+\.\S+/.test(value)) {
            this.errors.email = 'Please enter a valid email address';
          } else {
            delete this.errors.email;
          }
          break;
        case 'phone':
          if (value && !/^\d{10}$/.test(value.replace(/\D/g, ''))) {
            this.errors.phone = 'Please enter a valid 10-digit phone number';
          } else {
            delete this.errors.phone;
          }
          break;
        case 'income':
          if (value && isNaN(value)) {
            this.errors.income = 'Please enter a valid income amount';
          } else {
            delete this.errors.income;
          }
          break;
      }
    }
  },
  template: `
    <div class="max-w-2xl space-y-6">
      <h3 class="text-2xl font-bold mb-6" style="color: var(--mf-primary);">Personal Loan Application</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">First Name *</MInputLabel>
          <MInput
            v-model="formData.firstName"
            placeholder="Enter your first name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Last Name *</MInputLabel>
          <MInput
            v-model="formData.lastName"
            placeholder="Enter your last name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Email Address *</MInputLabel>
        <MInput
          v-model="formData.email"
          type="email"
          placeholder="your.email@example.com"
          variant="outlined"
          required
          :error="!!errors.email"
          :class="{ 'mf-input-focused': !errors.email, 'mf-input-error': errors.email }"
          @blur="validateField('email', formData.email)"
        />
        <MFormHelperText 
          v-if="errors.email" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.email }}
        </MFormHelperText>
        <MFormHelperText 
          v-else
          class="mf-form-helper-text"
        >
          We'll use this to send you loan updates
        </MFormHelperText>
      </MFormControl>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Phone Number *</MInputLabel>
        <MInput
          v-model="formData.phone"
          type="tel"
          placeholder="(555) 123-4567"
          variant="outlined"
          required
          :error="!!errors.phone"
          :class="{ 'mf-input-focused': !errors.phone, 'mf-input-error': errors.phone }"
          @blur="validateField('phone', formData.phone)"
        />
        <MFormHelperText 
          v-if="errors.phone" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.phone }}
        </MFormHelperText>
      </MFormControl>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Annual Income *</MInputLabel>
          <MInput
            v-model="formData.income"
            type="number"
            placeholder="50000"
            variant="outlined"
            required
            :error="!!errors.income"
            :class="{ 'mf-input-focused': !errors.income, 'mf-input-error': errors.income }"
            @blur="validateField('income', formData.income)"
          />
          <MFormHelperText class="mf-form-helper-text">Before taxes</MFormHelperText>
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Loan Amount *</MInputLabel>
          <MInput
            v-model="formData.loanAmount"
            type="number"
            placeholder="15000"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
          <MFormHelperText class="mf-form-helper-text">$1,000 - $25,000</MFormHelperText>
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Social Security Number *</MInputLabel>
        <MInput
          v-model="formData.ssn"
          type="password"
          placeholder="XXX-XX-XXXX"
          variant="outlined"
          required
          :class="{ 'mf-input-focused': true }"
        />
        <MFormHelperText class="mf-form-helper-text">
          Your SSN is encrypted and used only for credit verification
        </MFormHelperText>
      </MFormControl>
    </div>
  `
});

export const InputVariants = () => ({
  components: { MInput, MFormControl, MInputLabel },
  template: `
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Outlined (Default)</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="outlined" placeholder="Enter text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="outlined" value="Sample text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Filled</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="filled" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="filled" value="Sample text" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Standard</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="standard" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="standard" value="Sample text" />
          </MFormControl>
        </div>
      </div>
    </div>
  `
});

export const InputStates = () => ({
  components: { MInput, MFormControl, MInputLabel, MFormHelperText },
  template: `
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Normal State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Normal Input</MInputLabel>
          <MInput variant="outlined" placeholder="Enter your information" :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>This is helper text</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Focused State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Focused Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input appears focused" class="mf-input-focused" />
          <MFormHelperText>Your Town Finance brand focus styling</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Error State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Error Input</MInputLabel>
          <MInput variant="outlined" value="invalid@email" error class="mf-input-error" />
          <MFormHelperText error>Please enter a valid email address</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Disabled State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Disabled Input</MInputLabel>
          <MInput variant="outlined" value="Cannot edit this field" disabled />
          <MFormHelperText>This field is disabled</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Required Field</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Required Input *</MInputLabel>
          <MInput variant="outlined" placeholder="This field is required" required :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>* Required field</MFormHelperText>
        </MFormControl>
      </div>
    </div>
  `
});

export const InputSizes = () => ({
  components: { MInput, MFormControl, MInputLabel },
  template: `
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Size</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Small Input</MInputLabel>
          <MInput size="small" variant="outlined" placeholder="Small input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Size (Default)</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Medium Input</MInputLabel>
          <MInput size="medium" variant="outlined" placeholder="Medium input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Full Width</h4>
        <MFormControl>
          <MInputLabel>Full Width Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input takes full width" fullWidth :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
    </div>
  `
});

export const Playground = (args) => ({
  components: { MInput, MFormControl, MInputLabel, MFormHelperText },
  setup() {
    return { args };
  },
  data() {
    return {
      inputValue: args.value || ''
    };
  },
  template: `
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Input Playground</h3>
        <p class="text-gray-600">Customize the input using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MFormControl :class="args.fullWidth ? 'w-full' : 'max-w-md'">
          <MInputLabel v-if="args.label">{{ args.label }}</MInputLabel>
          <MInput 
            v-model="inputValue"
            v-bind="args"
            :class="getInputClass(args)"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          />
          <MFormHelperText v-if="args.helperText" :error="args.error">
            {{ args.helperText }}
          </MFormHelperText>
        </MFormControl>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Current value: "{{ inputValue }}" - Use the Controls panel to modify input properties.
      </div>
    </div>
  `,
  methods: {
    onInput(event) {
      this.inputValue = event.target.value;
      console.log('Input event:', event.target.value);
    },
    onChange(event) {
      console.log('Change event:', event.target.value);
    },
    onFocus() {
      console.log('Input focused');
    },
    onBlur() {
      console.log('Input blurred');
    },
    getInputClass(args) {
      if (args.error) return 'mf-input-error';
      return 'mf-input-focused';
    }
  }
});

Playground.args = {
  value: '',
  placeholder: 'Enter your loan amount',
  type: 'text',
  variant: 'outlined',
  size: 'medium',
  disabled: false,
  error: false,
  required: true,
  fullWidth: false,
  label: 'Loan Amount',
  helperText: 'Enter amount between $1,000 and $25,000'
};