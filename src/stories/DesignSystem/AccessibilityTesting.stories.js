import MButton from '../../components/mui/MButton.vue';
import MInput from '../../components/mui/MInput.vue';
import MTooltip from '../../components/mui/MTooltip.vue';
import MAlert from '../../components/mui/MAlert.vue';
import MTypography from '../../components/mui/MTypography.vue';

export default {
  title: 'Design System/Accessibility Testing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Comprehensive accessibility testing scenarios for Mariner Finance components. Use the A11y addon to validate WCAG 2.1 AA compliance across all interactive elements.',
      },
      canvas: { sourceState: 'shown' },
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'button-name', enabled: true },
          { id: 'heading-order', enabled: true },
          { id: 'landmark-one-main', enabled: true },
          { id: 'region', enabled: true },
          { id: 'aria-tooltip-name', enabled: true },
          { id: 'form-field-multiple-labels', enabled: true },
          { id: 'focus-order-semantics', enabled: true },
          { id: 'keyboard', enabled: true },
        ],
      },
    },
    backgrounds: {
      default: 'mariner-light',
      values: [
        { name: 'mariner-light', value: '#ffffff' },
        { name: 'high-contrast', value: '#000000' },
        { name: 'medium-contrast', value: '#666666' },
      ],
    },
  },
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['mariner', 'high-contrast', 'default'],
      description: 'Test different themes for accessibility compliance',
      defaultValue: 'mariner',
    },
    fontSize: {
      control: { type: 'range', min: 12, max: 24, step: 2 },
      description: 'Test font size accessibility (zoom simulation)',
      defaultValue: 16,
    },
    testMode: {
      control: { type: 'select' },
      options: ['keyboard-only', 'screen-reader', 'motor-impaired', 'all'],
      description: 'Accessibility testing mode focus',
      defaultValue: 'all',
    },
  },
};

export const KeyboardNavigation = (args) => ({
  components: { MButton, MInput, MTooltip, MAlert, MTypography },
  setup() {
    return { args };
  },
  template: `
    <div :style="{ fontSize: args.fontSize + 'px' }" class="space-y-6">
      <MTypography variant="h2" component="h1">
        Keyboard Navigation Test
      </MTypography>
      
      <MAlert severity="info">
        <strong>Testing Instructions:</strong> Use Tab to navigate, Enter/Space to activate, Escape to close modals.
        All interactive elements should be keyboard accessible with visible focus indicators.
      </MAlert>
      
      <div class="space-y-4">
        <MTypography variant="h6" component="h2">
          Form Controls
        </MTypography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MInput 
            label="Loan Amount"
            type="number"
            placeholder="Enter amount"
            aria-describedby="loan-help"
          />
          <div id="loan-help" class="text-sm text-gray-600">
            Enter your desired loan amount between $1,000 - $100,000
          </div>
          
          <MInput 
            label="Annual Income"
            type="number"
            placeholder="Enter income"
            required
            aria-required="true"
          />
        </div>
        
        <div class="space-x-4">
          <MButton 
            text="Primary Action"
            variant="filled"
            color="primary"
            aria-describedby="primary-help"
          />
          <div id="primary-help" class="sr-only">
            This is the main action button for loan application
          </div>
          
          <MButton 
            text="Secondary Action"
            variant="outlined"
            color="secondary"
          />
          
          <MTooltip content="This button saves your progress for later">
            <MButton 
              text="Save for Later"
              variant="text"
              color="primary"
              aria-label="Save application progress for later completion"
            />
          </MTooltip>
        </div>
      </div>
    </div>
  `,
});

KeyboardNavigation.args = {
  theme: 'mariner',
  fontSize: 16,
  testMode: 'keyboard-only',
};

export const ColorContrastTest = (args) => ({
  components: { MButton, MTypography, MAlert },
  setup() {
    return { args };
  },
  template: `
    <div :style="{ fontSize: args.fontSize + 'px' }" class="space-y-6">
      <MTypography variant="h2" component="h1">
        Color Contrast Compliance Test
      </MTypography>
      
      <MAlert severity="success">
        All color combinations meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
      </MAlert>
      
      <div class="space-y-8">
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Primary Brand Colors
          </MTypography>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-white border rounded">
              <MButton text="Matt Blue Primary" color="primary" variant="filled" fullWidth />
              <p class="mt-2 text-sm">Matt Blue on white background</p>
            </div>
            <div class="p-4" style="background: rgb(56, 96, 190);">
              <MTypography variant="body1" class="text-white">
                White text on Matt Blue background
              </MTypography>
            </div>
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Secondary Colors
          </MTypography>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-white border rounded">
              <MButton text="Tardis Blue Secondary" color="secondary" variant="filled" fullWidth />
              <p class="mt-2 text-sm">Tardis Blue on white background</p>
            </div>
            <div class="p-4" style="background: rgb(1, 52, 116);">
              <MTypography variant="body1" class="text-white">
                White text on Tardis Blue background
              </MTypography>
            </div>
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Semantic Colors
          </MTypography>
          <div class="space-y-4">
            <MAlert severity="success">
              Success state with Herbal Green - excellent contrast ratio
            </MAlert>
            <MAlert severity="warning">
              Warning state with appropriate yellow contrast
            </MAlert>
            <MAlert severity="error">
              Error state with sufficient red contrast
            </MAlert>
            <MAlert severity="info">
              Info state with accessible blue contrast
            </MAlert>
          </div>
        </div>
      </div>
    </div>
  `,
});

ColorContrastTest.args = {
  theme: 'mariner',
  fontSize: 16,
  testMode: 'all',
};

export const ScreenReaderTest = (args) => ({
  components: { MButton, MInput, MTypography, MAlert, MTooltip },
  setup() {
    return { args };
  },
  template: `
    <div :style="{ fontSize: args.fontSize + 'px' }">
      <header>
        <MTypography variant="h1" component="h1" id="main-heading">
          Screen Reader Accessibility Test
        </MTypography>
        <MTypography variant="subtitle1" component="p" aria-describedby="main-heading">
          Testing semantic HTML, ARIA labels, and screen reader announcements
        </MTypography>
      </header>
      
      <main aria-labelledby="main-heading" class="mt-6 space-y-6">
        <section aria-labelledby="form-section">
          <MTypography variant="h2" component="h2" id="form-section">
            Loan Application Form
          </MTypography>
          
          <div role="group" aria-labelledby="personal-info" class="mt-4 space-y-4">
            <MTypography variant="h3" component="h3" id="personal-info">
              Personal Information
            </MTypography>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="first-name" class="block text-sm font-medium mb-1">
                  First Name *
                  <span class="sr-only">(Required field)</span>
                </label>
                <MInput 
                  id="first-name"
                  aria-required="true"
                  aria-describedby="first-name-help"
                />
                <div id="first-name-help" class="text-xs text-gray-600 mt-1">
                  Enter your legal first name as it appears on your ID
                </div>
              </div>
              
              <div>
                <label for="annual-income" class="block text-sm font-medium mb-1">
                  Annual Income
                </label>
                <MInput 
                  id="annual-income"
                  type="number"
                  aria-describedby="income-help income-format"
                />
                <div id="income-help" class="text-xs text-gray-600 mt-1">
                  Your total yearly income before taxes
                </div>
                <div id="income-format" class="text-xs text-gray-500">
                  Format: Numbers only, no commas or dollar signs
                </div>
              </div>
            </div>
          </div>
          
          <div role="group" aria-labelledby="loan-details" class="mt-6 space-y-4">
            <MTypography variant="h3" component="h3" id="loan-details">
              Loan Details
            </MTypography>
            
            <div class="space-y-4">
              <div>
                <MTooltip content="APR includes both interest rate and any additional fees">
                  <label for="loan-amount" class="inline-flex items-center text-sm font-medium">
                    Desired Loan Amount
                    <button 
                      type="button"
                      aria-label="Get help about loan amounts"
                      class="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ℹ️
                    </button>
                  </label>
                </MTooltip>
                <MInput 
                  id="loan-amount"
                  type="number"
                  aria-describedby="amount-range amount-purpose"
                />
                <div id="amount-range" class="text-xs text-gray-600 mt-1">
                  Available range: $1,000 to $100,000
                </div>
                <div id="amount-purpose" class="text-xs text-gray-500">
                  Consider your monthly budget when selecting an amount
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section aria-labelledby="actions-section">
          <MTypography variant="h2" component="h2" id="actions-section" class="sr-only">
            Form Actions
          </MTypography>
          
          <div class="flex flex-col sm:flex-row gap-4" role="group" aria-label="Form submission actions">
            <MButton 
              text="Submit Application"
              variant="filled"
              color="primary"
              aria-describedby="submit-help"
            />
            <div id="submit-help" class="sr-only">
              Submitting will send your application for review. You cannot edit after submission.
            </div>
            
            <MButton 
              text="Save Draft"
              variant="outlined"
              color="secondary"
              aria-describedby="save-help"
            />
            <div id="save-help" class="sr-only">
              Save your progress to continue later. Your information will be stored securely.
            </div>
            
            <MButton 
              text="Cancel"
              variant="text"
              color="error"
              aria-describedby="cancel-help"
            />
            <div id="cancel-help" class="sr-only">
              Cancel application and return to dashboard. Unsaved changes will be lost.
            </div>
          </div>
        </section>
        
        <aside aria-labelledby="help-section" class="mt-8">
          <MTypography variant="h2" component="h2" id="help-section">
            Need Help?
          </MTypography>
          <MAlert severity="info" role="complementary">
            <strong>Accessibility Support:</strong> 
            If you need assistance with this form, please call our accessibility helpline at 
            <a href="tel:1-800-555-0199" aria-label="Call accessibility helpline at 1-800-555-0199">
              1-800-555-0199
            </a> 
            or email 
            <a href="mailto:accessibility@marinerfinance.com" aria-label="Email accessibility support">
              accessibility@marinerfinance.com
            </a>
          </MAlert>
        </aside>
      </main>
    </div>
  `,
});

ScreenReaderTest.args = {
  theme: 'mariner',
  fontSize: 16,
  testMode: 'screen-reader',
};

export const MotorImpairmentTest = (args) => ({
  components: { MButton, MTypography, MAlert },
  setup() {
    return { args };
  },
  template: `
    <div :style="{ fontSize: args.fontSize + 'px' }" class="space-y-6">
      <MTypography variant="h2" component="h1">
        Motor Impairment Accessibility Test
      </MTypography>
      
      <MAlert severity="info">
        Testing large touch targets (minimum 44px), sufficient spacing between interactive elements,
        and click target optimization for users with motor impairments.
      </MAlert>
      
      <div class="space-y-8">
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Large Touch Targets
          </MTypography>
          <div class="space-y-4">
            <MButton 
              text="Large Primary Action"
              variant="filled"
              color="primary"
              size="large"
              fullWidth
              class="min-h-[48px]"
            />
            <MButton 
              text="Large Secondary Action"
              variant="outlined"
              color="secondary"
              size="large"
              fullWidth
              class="min-h-[48px]"
            />
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Adequate Spacing
          </MTypography>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <MButton 
              text="Option A"
              variant="filled"
              color="primary"
              size="large"
              fullWidth
              class="min-h-[60px]"
            />
            <MButton 
              text="Option B"
              variant="filled"
              color="secondary"
              size="large"
              fullWidth
              class="min-h-[60px]"
            />
            <MButton 
              text="Option C"
              variant="outlined"
              color="primary"
              size="large"
              fullWidth
              class="min-h-[60px]"
            />
          </div>
        </div>
        
        <div>
          <MTypography variant="h6" component="h2" class="mb-4">
            Error Recovery
          </MTypography>
          <div class="space-y-4">
            <MAlert severity="warning">
              <strong>Accidental Click Protection:</strong> Important actions require confirmation
            </MAlert>
            <div class="flex flex-col sm:flex-row gap-4">
              <MButton 
                text="Delete Application"
                variant="outlined"
                color="error"
                size="large"
                aria-describedby="delete-warning"
              />
              <div id="delete-warning" class="text-sm text-gray-600 self-center">
                This action requires confirmation and can be undone within 30 seconds
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

MotorImpairmentTest.args = {
  theme: 'mariner',
  fontSize: 18,
  testMode: 'motor-impaired',
};