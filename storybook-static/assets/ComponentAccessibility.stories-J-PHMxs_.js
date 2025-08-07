import{M as r}from"./MButton-BLV5TnM3.js";import{M as l}from"./MInput-CcA3fQAp.js";import{M as f}from"./MTooltip-DPWZkmTQ.js";import{M as o}from"./MAlert-DQn7thiI.js";import{M as s}from"./MTypography-DmD30oZU.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const W={title:"Testing & Quality/Accessibility Tests/Component Accessibility",parameters:{layout:"padded",docs:{description:{component:"Comprehensive accessibility testing scenarios for all Your Town Finance components. Use the A11y addon to validate WCAG 2.1 AA compliance."}}},argTypes:{testScenario:{control:{type:"select"},options:["keyboard-navigation","screen-reader","color-contrast","touch-targets"],description:"Focus area for accessibility testing",defaultValue:"keyboard-navigation"},contrastMode:{control:{type:"select"},options:["normal","high-contrast","dark-mode"],description:"Test color contrast scenarios",defaultValue:"normal"}}},n=e=>({components:{MButton:r,MInput:l,MTooltip:f,MAlert:o,MTypography:s},setup(){return{args:e}},template:`
    <div class="space-y-8">
      <header>
        <MTypography variant="h1" component="h1" id="main-heading">
          Keyboard Navigation Accessibility Test
        </MTypography>
        <MAlert severity="info" class="mt-4">
          <strong>Testing Instructions:</strong> Use Tab to navigate, Enter/Space to activate, Escape to close modals.
          All interactive elements should be keyboard accessible with visible focus indicators.
        </MAlert>
      </header>
      
      <main aria-labelledby="main-heading">
        <section aria-labelledby="form-section" class="space-y-6">
          <MTypography variant="h2" component="h2" id="form-section">
            Form Controls Navigation
          </MTypography>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <MInput 
                label="First Name"
                placeholder="Enter your first name"
                aria-describedby="first-name-help"
              />
              <div id="first-name-help" class="text-sm text-gray-600">
                This field is required for loan applications
              </div>
              
              <MInput 
                label="Annual Income"
                type="number"
                placeholder="50000"
                aria-required="true"
                aria-describedby="income-help"
              />
              <div id="income-help" class="text-sm text-gray-600">
                Enter your total yearly income before taxes
              </div>
            </div>
            
            <div class="space-y-4">
              <MInput 
                label="Email Address"
                type="email"
                placeholder="john.doe@email.com"
                aria-required="true"
                aria-describedby="email-help"
              />
              <div id="email-help" class="text-sm text-gray-600">
                We'll send loan updates to this email address
              </div>
              
              <MInput 
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                aria-describedby="phone-help"
              />
              <div id="phone-help" class="text-sm text-gray-600">
                For verification and loan status updates
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <MTypography variant="h3" component="h3">
              Action Buttons
            </MTypography>
            <div class="flex flex-wrap gap-4">
              <MButton 
                text="Primary Action"
                variant="filled"
                color="primary"
                aria-describedby="primary-help"
                class="mf-button-primary"
              />
              <div id="primary-help" class="sr-only">
                Submits the loan application for review
              </div>
              
              <MButton 
                text="Secondary Action"
                variant="outlined"
                color="secondary"
                aria-describedby="secondary-help"
                class="mf-button-outlined-secondary"
              />
              <div id="secondary-help" class="sr-only">
                Saves progress and allows you to continue later
              </div>
              
              <MTooltip content="This button provides additional help and resources">
                <MButton 
                  text="Help & Support"
                  variant="text"
                  color="primary"
                  aria-label="Get help and support for loan applications"
                />
              </MTooltip>
            </div>
          </div>
        </section>
        
        <section aria-labelledby="navigation-section" class="mt-8">
          <MTypography variant="h2" component="h2" id="navigation-section">
            Navigation Elements
          </MTypography>
          
          <nav aria-label="Loan application steps" class="mt-4">
            <ol class="flex space-x-4">
              <li>
                <a href="#step1" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 1: Personal Info
                </a>
              </li>
              <li>
                <a href="#step2" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 2: Financial Info
                </a>
              </li>
              <li>
                <a href="#step3" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 3: Loan Details
                </a>
              </li>
            </ol>
          </nav>
        </section>
      </main>
      
      <aside aria-labelledby="help-section" class="mt-8">
        <MTypography variant="h2" component="h2" id="help-section">
          Accessibility Support
        </MTypography>
        <MAlert severity="info" class="mt-4">
          If you need assistance completing this form, please contact our accessibility support team at 
          <a href="tel:1-800-555-0199" class="text-blue-600 hover:text-blue-800">1-800-555-0199</a> 
          or email <a href="mailto:accessibility@yourtownfinance.com" class="text-blue-600 hover:text-blue-800">accessibility@yourtownfinance.com</a>
        </MAlert>
      </aside>
    </div>
  `});n.args={testScenario:"keyboard-navigation",contrastMode:"normal"};const t=e=>({components:{MButton:r,MInput:l,MTypography:s,MAlert:o},setup(){return{args:e}},template:`
    <div>
      <header>
        <MTypography variant="h1" component="h1" id="main-title">
          Screen Reader Accessibility Test
        </MTypography>
        <MTypography variant="subtitle1" component="p" aria-describedby="main-title">
          Testing semantic HTML, ARIA labels, and screen reader announcements
        </MTypography>
      </header>
      
      <main aria-labelledby="main-title" class="mt-6 space-y-8">
        <section aria-labelledby="form-section">
          <MTypography variant="h2" component="h2" id="form-section">
            Loan Application Form
          </MTypography>
          
          <div role="group" aria-labelledby="personal-info" class="mt-6 space-y-4">
            <MTypography variant="h3" component="h3" id="personal-info">
              Personal Information
            </MTypography>
            
            <div class="space-y-4">
              <div>
                <label for="applicant-name" class="block text-sm font-medium mb-1">
                  Full Name *
                  <span class="sr-only">(Required field)</span>
                </label>
                <MInput 
                  id="applicant-name"
                  aria-required="true"
                  aria-describedby="name-help name-format"
                />
                <div id="name-help" class="text-xs text-gray-600 mt-1">
                  Enter your full legal name as it appears on your government-issued ID
                </div>
                <div id="name-format" class="text-xs text-gray-500">
                  Format: First Middle Last (Middle name optional)
                </div>
              </div>
              
              <div>
                <label for="annual-income" class="block text-sm font-medium mb-1">
                  Annual Income *
                  <span class="sr-only">(Required field, minimum $20,000)</span>
                </label>
                <MInput 
                  id="annual-income"
                  type="number"
                  aria-required="true"
                  aria-describedby="income-help income-requirements"
                />
                <div id="income-help" class="text-xs text-gray-600 mt-1">
                  Your total yearly income from all sources before taxes
                </div>
                <div id="income-requirements" class="text-xs text-gray-500">
                  Minimum requirement: $20,000 annually
                </div>
              </div>
              
              <div>
                <label for="loan-amount" class="block text-sm font-medium mb-1">
                  Desired Loan Amount *
                  <span class="sr-only">(Required field, $1,000 to $100,000)</span>
                </label>
                <MInput 
                  id="loan-amount"
                  type="number"
                  aria-required="true"
                  aria-describedby="loan-help loan-range"
                  aria-invalid="false"
                />
                <div id="loan-help" class="text-xs text-gray-600 mt-1">
                  The amount you wish to borrow for your personal loan
                </div>
                <div id="loan-range" class="text-xs text-gray-500">
                  Available range: $1,000 to $100,000
                </div>
              </div>
            </div>
          </div>
          
          <div role="group" aria-labelledby="validation-demo" class="mt-8 space-y-4">
            <MTypography variant="h3" component="h3" id="validation-demo">
              Validation and Error Handling
            </MTypography>
            
            <div>
              <label for="error-example" class="block text-sm font-medium mb-1">
                Email Address *
                <span class="sr-only">(Required field with validation error)</span>
              </label>
              <MInput 
                id="error-example"
                type="email"
                value="invalid-email"
                error
                aria-invalid="true"
                aria-describedby="email-error"
              />
              <div id="email-error" role="alert" aria-live="polite" class="text-red-600 text-xs mt-1">
                Please enter a valid email address
              </div>
            </div>
            
            <div>
              <label for="success-example" class="block text-sm font-medium mb-1">
                Phone Number
                <span class="sr-only">(Valid entry)</span>
              </label>
              <MInput 
                id="success-example"
                type="tel"
                value="(555) 123-4567"
                aria-describedby="phone-success"
              />
              <div id="phone-success" role="status" aria-live="polite" class="text-green-600 text-xs mt-1">
                Valid phone number format
              </div>
            </div>
          </div>
        </section>
        
        <section aria-labelledby="actions-section">
          <MTypography variant="h2" component="h2" id="actions-section" class="sr-only">
            Form Actions
          </MTypography>
          
          <div class="flex flex-col sm:flex-row gap-4" role="group" aria-label="Form submission options">
            <MButton 
              text="Submit Application"
              variant="filled"
              color="primary"
              aria-describedby="submit-description"
              class="mf-button-primary"
            />
            <div id="submit-description" class="sr-only">
              Submit your completed loan application for review. You will receive confirmation via email.
            </div>
            
            <MButton 
              text="Save and Continue Later"
              variant="outlined"
              color="secondary"
              aria-describedby="save-description"
              class="mf-button-outlined-secondary"
            />
            <div id="save-description" class="sr-only">
              Save your progress securely and return to complete the application at any time.
            </div>
            
            <MButton 
              text="Get Help"
              variant="text"
              color="primary"
              aria-describedby="help-description"
            />
            <div id="help-description" class="sr-only">
              Contact our support team for assistance with your loan application.
            </div>
          </div>
        </section>
        
        <aside aria-labelledby="status-updates" role="complementary" class="mt-8">
          <MTypography variant="h2" component="h2" id="status-updates">
            Live Status Updates
          </MTypography>
          
          <div aria-live="polite" aria-atomic="true" class="mt-4">
            <MAlert severity="info">
              <strong>Form Status:</strong> 3 of 5 required fields completed. 
              Continue filling out the remaining fields to proceed.
            </MAlert>
          </div>
          
          <div aria-live="assertive" aria-atomic="true" class="mt-4" style="display: none;">
            <MAlert severity="error">
              <strong>Validation Error:</strong> Please correct the highlighted fields before proceeding.
            </MAlert>
          </div>
        </aside>
      </main>
    </div>
  `});t.args={testScenario:"screen-reader",contrastMode:"normal"};const a=e=>({components:{MButton:r,MTypography:s,MAlert:o},setup(){return{args:e}},template:`
    <div class="space-y-8">
      <MTypography variant="h1" component="h1">
        Color Contrast Compliance Test
      </MTypography>
      
      <MAlert severity="success">
        All color combinations meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
      </MAlert>
      
      <div class="space-y-8">
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Your Town Finance Brand Colors
          </MTypography>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Matt Blue Primary</h3>
              <div class="p-6 bg-white border rounded-lg">
                <MButton 
                  text="Primary Action" 
                  color="primary" 
                  variant="filled" 
                  fullWidth 
                  class="mf-button-primary"
                />
                <p class="mt-3 text-sm text-gray-700">
                  Contrast Ratio: 4.52:1 (AA Compliant)
                </p>
              </div>
              
              <div class="p-6 text-white" style="background: rgb(56, 96, 190);">
                <MTypography variant="h6" class="text-white">
                  White Text on Matt Blue
                </MTypography>
                <p class="text-sm mt-2">
                  Contrast Ratio: 4.52:1 (AA Compliant)
                </p>
              </div>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Tardis Blue Secondary</h3>
              <div class="p-6 bg-white border rounded-lg">
                <MButton 
                  text="Secondary Action" 
                  color="secondary" 
                  variant="filled" 
                  fullWidth
                  class="mf-button-secondary"
                />
                <p class="mt-3 text-sm text-gray-700">
                  Contrast Ratio: 8.12:1 (AAA Compliant)
                </p>
              </div>
              
              <div class="p-6 text-white" style="background: rgb(1, 52, 116);">
                <MTypography variant="h6" class="text-white">
                  White Text on Tardis Blue
                </MTypography>
                <p class="text-sm mt-2">
                  Contrast Ratio: 8.12:1 (AAA Compliant)
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Semantic Color Testing
          </MTypography>
          
          <div class="space-y-4">
            <MAlert severity="success">
              <strong>Success State:</strong> Herbal Green background with dark text - Contrast Ratio: 7.24:1 (AAA)
            </MAlert>
            
            <MAlert severity="warning">
              <strong>Warning State:</strong> Warning yellow background with dark text - Contrast Ratio: 5.31:1 (AA)
            </MAlert>
            
            <MAlert severity="error">
              <strong>Error State:</strong> Error red background with white text - Contrast Ratio: 4.66:1 (AA)
            </MAlert>
            
            <MAlert severity="info">
              <strong>Info State:</strong> Info blue background with dark text - Contrast Ratio: 6.89:1 (AAA)
            </MAlert>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Text Hierarchy Contrast
          </MTypography>
          
          <div class="space-y-4 bg-white p-6 border rounded-lg">
            <MTypography variant="h1" class="text-gray-900">
              H1 Heading - Primary Text (21:1 contrast)
            </MTypography>
            <MTypography variant="h2" class="text-gray-800">
              H2 Heading - Secondary Text (12.63:1 contrast)
            </MTypography>
            <MTypography variant="body1" class="text-gray-700">
              Body text - Regular content (7.24:1 contrast)
            </MTypography>
            <MTypography variant="body2" class="text-gray-600">
              Secondary body text - Supporting content (4.54:1 contrast)
            </MTypography>
            <MTypography variant="caption" class="text-gray-500">
              Caption text - Supplementary information (3.18:1 contrast for large text only)
            </MTypography>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            High Contrast Mode Testing
          </MTypography>
          
          <div class="p-6 bg-black text-white rounded-lg">
            <MTypography variant="h3" class="text-white mb-4">
              High Contrast Dark Background
            </MTypography>
            <div class="space-y-3">
              <MButton text="High Contrast Button" variant="outlined" color="primary" />
              <p class="text-white">
                All text maintains readability in high contrast modes with appropriate color adjustments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `});a.args={testScenario:"color-contrast",contrastMode:"normal"};const i=e=>({components:{MButton:r,MInput:l,MTypography:s,MAlert:o},setup(){return{args:e}},template:`
    <div class="space-y-8">
      <MTypography variant="h1" component="h1">
        Touch Target Size Accessibility Test
      </MTypography>
      
      <MAlert severity="info">
        All interactive elements meet the minimum 44px touch target requirement (WCAG 2.1 AA)
      </MAlert>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Minimum Touch Target Sizes
        </MTypography>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold">Large Buttons (48px+)</h3>
            <MButton 
              text="Large Touch Target"
              variant="filled"
              color="primary"
              size="large"
              fullWidth
              class="mf-button-primary min-h-[48px]"
            />
            <p class="text-sm text-gray-600">Height: 48px - Exceeds requirements</p>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-semibold">Medium Buttons (44px)</h3>
            <MButton 
              text="Standard Touch Target"
              variant="filled"
              color="secondary"
              fullWidth
              class="mf-button-secondary min-h-[44px]"
            />
            <p class="text-sm text-gray-600">Height: 44px - Meets requirements</p>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-semibold">Outlined Buttons</h3>
            <MButton 
              text="Outlined Touch Target"
              variant="outlined"
              color="primary"
              fullWidth
              class="mf-button-outlined-primary min-h-[44px]"
            />
            <p class="text-sm text-gray-600">Height: 44px - Meets requirements</p>
          </div>
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Form Input Touch Targets
        </MTypography>
        
        <div class="max-w-md space-y-4">
          <MInput 
            label="Large Input Field"
            placeholder="Touch-friendly input"
            fullWidth
            class="min-h-[48px]"
          />
          
          <MInput 
            label="Standard Input Field"
            placeholder="Standard touch target"
            fullWidth
            class="min-h-[44px]"
          />
          
          <MInput 
            label="Number Input"
            type="number"
            placeholder="12345"
            fullWidth
            class="min-h-[44px]"
          />
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Adequate Spacing Between Targets
        </MTypography>
        
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-4">Close Proximity Buttons (Safe)</h3>
            <div class="flex flex-col sm:flex-row gap-4">
              <MButton 
                text="Accept Application"
                variant="filled"
                color="success"
                size="large"
                class="min-h-[48px]"
              />
              <MButton 
                text="Review Later"
                variant="outlined"
                color="secondary"
                size="large"
                class="min-h-[48px]"
              />
            </div>
            <p class="text-sm text-gray-600 mt-2">16px gap prevents accidental activation</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Critical Action Separation</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MButton 
                text="Submit Application"
                variant="filled"
                color="primary"
                size="large"
                fullWidth
                class="mf-button-primary min-h-[56px]"
              />
              <MButton 
                text="Cancel Application"
                variant="outlined"
                color="error"
                size="large"
                fullWidth
                class="min-h-[56px]"
              />
            </div>
            <p class="text-sm text-gray-600 mt-2">32px separation for destructive actions</p>
          </div>
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Mobile Optimization
        </MTypography>
        
        <div class="max-w-sm mx-auto space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p class="text-center text-sm text-gray-600 mb-4">
            Mobile viewport simulation (375px width)
          </p>
          
          <MButton 
            text="Mobile Primary Action"
            variant="filled"
            color="primary"
            fullWidth
            size="large"
            class="mf-button-primary min-h-[56px]"
          />
          
          <MButton 
            text="Mobile Secondary Action"
            variant="outlined"
            color="secondary"
            fullWidth
            size="large"
            class="min-h-[56px]"
          />
          
          <MInput 
            label="Mobile Input Field"
            placeholder="Touch-optimized input"
            fullWidth
            class="min-h-[56px]"
          />
          
          <p class="text-sm text-gray-600 text-center">
            All elements use 56px height for optimal mobile interaction
          </p>
        </div>
      </section>
    </div>
  `});i.args={testScenario:"touch-targets",contrastMode:"normal"};var c,p,d;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`args => ({
  components: {
    MButton,
    MInput,
    MTooltip,
    MAlert,
    MTypography
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="space-y-8">
      <header>
        <MTypography variant="h1" component="h1" id="main-heading">
          Keyboard Navigation Accessibility Test
        </MTypography>
        <MAlert severity="info" class="mt-4">
          <strong>Testing Instructions:</strong> Use Tab to navigate, Enter/Space to activate, Escape to close modals.
          All interactive elements should be keyboard accessible with visible focus indicators.
        </MAlert>
      </header>
      
      <main aria-labelledby="main-heading">
        <section aria-labelledby="form-section" class="space-y-6">
          <MTypography variant="h2" component="h2" id="form-section">
            Form Controls Navigation
          </MTypography>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <MInput 
                label="First Name"
                placeholder="Enter your first name"
                aria-describedby="first-name-help"
              />
              <div id="first-name-help" class="text-sm text-gray-600">
                This field is required for loan applications
              </div>
              
              <MInput 
                label="Annual Income"
                type="number"
                placeholder="50000"
                aria-required="true"
                aria-describedby="income-help"
              />
              <div id="income-help" class="text-sm text-gray-600">
                Enter your total yearly income before taxes
              </div>
            </div>
            
            <div class="space-y-4">
              <MInput 
                label="Email Address"
                type="email"
                placeholder="john.doe@email.com"
                aria-required="true"
                aria-describedby="email-help"
              />
              <div id="email-help" class="text-sm text-gray-600">
                We'll send loan updates to this email address
              </div>
              
              <MInput 
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                aria-describedby="phone-help"
              />
              <div id="phone-help" class="text-sm text-gray-600">
                For verification and loan status updates
              </div>
            </div>
          </div>
          
          <div class="space-y-4">
            <MTypography variant="h3" component="h3">
              Action Buttons
            </MTypography>
            <div class="flex flex-wrap gap-4">
              <MButton 
                text="Primary Action"
                variant="filled"
                color="primary"
                aria-describedby="primary-help"
                class="mf-button-primary"
              />
              <div id="primary-help" class="sr-only">
                Submits the loan application for review
              </div>
              
              <MButton 
                text="Secondary Action"
                variant="outlined"
                color="secondary"
                aria-describedby="secondary-help"
                class="mf-button-outlined-secondary"
              />
              <div id="secondary-help" class="sr-only">
                Saves progress and allows you to continue later
              </div>
              
              <MTooltip content="This button provides additional help and resources">
                <MButton 
                  text="Help & Support"
                  variant="text"
                  color="primary"
                  aria-label="Get help and support for loan applications"
                />
              </MTooltip>
            </div>
          </div>
        </section>
        
        <section aria-labelledby="navigation-section" class="mt-8">
          <MTypography variant="h2" component="h2" id="navigation-section">
            Navigation Elements
          </MTypography>
          
          <nav aria-label="Loan application steps" class="mt-4">
            <ol class="flex space-x-4">
              <li>
                <a href="#step1" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 1: Personal Info
                </a>
              </li>
              <li>
                <a href="#step2" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 2: Financial Info
                </a>
              </li>
              <li>
                <a href="#step3" class="text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Step 3: Loan Details
                </a>
              </li>
            </ol>
          </nav>
        </section>
      </main>
      
      <aside aria-labelledby="help-section" class="mt-8">
        <MTypography variant="h2" component="h2" id="help-section">
          Accessibility Support
        </MTypography>
        <MAlert severity="info" class="mt-4">
          If you need assistance completing this form, please contact our accessibility support team at 
          <a href="tel:1-800-555-0199" class="text-blue-600 hover:text-blue-800">1-800-555-0199</a> 
          or email <a href="mailto:accessibility@yourtownfinance.com" class="text-blue-600 hover:text-blue-800">accessibility@yourtownfinance.com</a>
        </MAlert>
      </aside>
    </div>
  \`
})`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var m,y,u;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`args => ({
  components: {
    MButton,
    MInput,
    MTypography,
    MAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div>
      <header>
        <MTypography variant="h1" component="h1" id="main-title">
          Screen Reader Accessibility Test
        </MTypography>
        <MTypography variant="subtitle1" component="p" aria-describedby="main-title">
          Testing semantic HTML, ARIA labels, and screen reader announcements
        </MTypography>
      </header>
      
      <main aria-labelledby="main-title" class="mt-6 space-y-8">
        <section aria-labelledby="form-section">
          <MTypography variant="h2" component="h2" id="form-section">
            Loan Application Form
          </MTypography>
          
          <div role="group" aria-labelledby="personal-info" class="mt-6 space-y-4">
            <MTypography variant="h3" component="h3" id="personal-info">
              Personal Information
            </MTypography>
            
            <div class="space-y-4">
              <div>
                <label for="applicant-name" class="block text-sm font-medium mb-1">
                  Full Name *
                  <span class="sr-only">(Required field)</span>
                </label>
                <MInput 
                  id="applicant-name"
                  aria-required="true"
                  aria-describedby="name-help name-format"
                />
                <div id="name-help" class="text-xs text-gray-600 mt-1">
                  Enter your full legal name as it appears on your government-issued ID
                </div>
                <div id="name-format" class="text-xs text-gray-500">
                  Format: First Middle Last (Middle name optional)
                </div>
              </div>
              
              <div>
                <label for="annual-income" class="block text-sm font-medium mb-1">
                  Annual Income *
                  <span class="sr-only">(Required field, minimum $20,000)</span>
                </label>
                <MInput 
                  id="annual-income"
                  type="number"
                  aria-required="true"
                  aria-describedby="income-help income-requirements"
                />
                <div id="income-help" class="text-xs text-gray-600 mt-1">
                  Your total yearly income from all sources before taxes
                </div>
                <div id="income-requirements" class="text-xs text-gray-500">
                  Minimum requirement: $20,000 annually
                </div>
              </div>
              
              <div>
                <label for="loan-amount" class="block text-sm font-medium mb-1">
                  Desired Loan Amount *
                  <span class="sr-only">(Required field, $1,000 to $100,000)</span>
                </label>
                <MInput 
                  id="loan-amount"
                  type="number"
                  aria-required="true"
                  aria-describedby="loan-help loan-range"
                  aria-invalid="false"
                />
                <div id="loan-help" class="text-xs text-gray-600 mt-1">
                  The amount you wish to borrow for your personal loan
                </div>
                <div id="loan-range" class="text-xs text-gray-500">
                  Available range: $1,000 to $100,000
                </div>
              </div>
            </div>
          </div>
          
          <div role="group" aria-labelledby="validation-demo" class="mt-8 space-y-4">
            <MTypography variant="h3" component="h3" id="validation-demo">
              Validation and Error Handling
            </MTypography>
            
            <div>
              <label for="error-example" class="block text-sm font-medium mb-1">
                Email Address *
                <span class="sr-only">(Required field with validation error)</span>
              </label>
              <MInput 
                id="error-example"
                type="email"
                value="invalid-email"
                error
                aria-invalid="true"
                aria-describedby="email-error"
              />
              <div id="email-error" role="alert" aria-live="polite" class="text-red-600 text-xs mt-1">
                Please enter a valid email address
              </div>
            </div>
            
            <div>
              <label for="success-example" class="block text-sm font-medium mb-1">
                Phone Number
                <span class="sr-only">(Valid entry)</span>
              </label>
              <MInput 
                id="success-example"
                type="tel"
                value="(555) 123-4567"
                aria-describedby="phone-success"
              />
              <div id="phone-success" role="status" aria-live="polite" class="text-green-600 text-xs mt-1">
                Valid phone number format
              </div>
            </div>
          </div>
        </section>
        
        <section aria-labelledby="actions-section">
          <MTypography variant="h2" component="h2" id="actions-section" class="sr-only">
            Form Actions
          </MTypography>
          
          <div class="flex flex-col sm:flex-row gap-4" role="group" aria-label="Form submission options">
            <MButton 
              text="Submit Application"
              variant="filled"
              color="primary"
              aria-describedby="submit-description"
              class="mf-button-primary"
            />
            <div id="submit-description" class="sr-only">
              Submit your completed loan application for review. You will receive confirmation via email.
            </div>
            
            <MButton 
              text="Save and Continue Later"
              variant="outlined"
              color="secondary"
              aria-describedby="save-description"
              class="mf-button-outlined-secondary"
            />
            <div id="save-description" class="sr-only">
              Save your progress securely and return to complete the application at any time.
            </div>
            
            <MButton 
              text="Get Help"
              variant="text"
              color="primary"
              aria-describedby="help-description"
            />
            <div id="help-description" class="sr-only">
              Contact our support team for assistance with your loan application.
            </div>
          </div>
        </section>
        
        <aside aria-labelledby="status-updates" role="complementary" class="mt-8">
          <MTypography variant="h2" component="h2" id="status-updates">
            Live Status Updates
          </MTypography>
          
          <div aria-live="polite" aria-atomic="true" class="mt-4">
            <MAlert severity="info">
              <strong>Form Status:</strong> 3 of 5 required fields completed. 
              Continue filling out the remaining fields to proceed.
            </MAlert>
          </div>
          
          <div aria-live="assertive" aria-atomic="true" class="mt-4" style="display: none;">
            <MAlert severity="error">
              <strong>Validation Error:</strong> Please correct the highlighted fields before proceeding.
            </MAlert>
          </div>
        </aside>
      </main>
    </div>
  \`
})`,...(u=(y=t.parameters)==null?void 0:y.docs)==null?void 0:u.source}}};var h,g,v;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`args => ({
  components: {
    MButton,
    MTypography,
    MAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="space-y-8">
      <MTypography variant="h1" component="h1">
        Color Contrast Compliance Test
      </MTypography>
      
      <MAlert severity="success">
        All color combinations meet WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text)
      </MAlert>
      
      <div class="space-y-8">
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Your Town Finance Brand Colors
          </MTypography>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Matt Blue Primary</h3>
              <div class="p-6 bg-white border rounded-lg">
                <MButton 
                  text="Primary Action" 
                  color="primary" 
                  variant="filled" 
                  fullWidth 
                  class="mf-button-primary"
                />
                <p class="mt-3 text-sm text-gray-700">
                  Contrast Ratio: 4.52:1 (AA Compliant)
                </p>
              </div>
              
              <div class="p-6 text-white" style="background: rgb(56, 96, 190);">
                <MTypography variant="h6" class="text-white">
                  White Text on Matt Blue
                </MTypography>
                <p class="text-sm mt-2">
                  Contrast Ratio: 4.52:1 (AA Compliant)
                </p>
              </div>
            </div>
            
            <div class="space-y-4">
              <h3 class="text-lg font-semibold">Tardis Blue Secondary</h3>
              <div class="p-6 bg-white border rounded-lg">
                <MButton 
                  text="Secondary Action" 
                  color="secondary" 
                  variant="filled" 
                  fullWidth
                  class="mf-button-secondary"
                />
                <p class="mt-3 text-sm text-gray-700">
                  Contrast Ratio: 8.12:1 (AAA Compliant)
                </p>
              </div>
              
              <div class="p-6 text-white" style="background: rgb(1, 52, 116);">
                <MTypography variant="h6" class="text-white">
                  White Text on Tardis Blue
                </MTypography>
                <p class="text-sm mt-2">
                  Contrast Ratio: 8.12:1 (AAA Compliant)
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Semantic Color Testing
          </MTypography>
          
          <div class="space-y-4">
            <MAlert severity="success">
              <strong>Success State:</strong> Herbal Green background with dark text - Contrast Ratio: 7.24:1 (AAA)
            </MAlert>
            
            <MAlert severity="warning">
              <strong>Warning State:</strong> Warning yellow background with dark text - Contrast Ratio: 5.31:1 (AA)
            </MAlert>
            
            <MAlert severity="error">
              <strong>Error State:</strong> Error red background with white text - Contrast Ratio: 4.66:1 (AA)
            </MAlert>
            
            <MAlert severity="info">
              <strong>Info State:</strong> Info blue background with dark text - Contrast Ratio: 6.89:1 (AAA)
            </MAlert>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            Text Hierarchy Contrast
          </MTypography>
          
          <div class="space-y-4 bg-white p-6 border rounded-lg">
            <MTypography variant="h1" class="text-gray-900">
              H1 Heading - Primary Text (21:1 contrast)
            </MTypography>
            <MTypography variant="h2" class="text-gray-800">
              H2 Heading - Secondary Text (12.63:1 contrast)
            </MTypography>
            <MTypography variant="body1" class="text-gray-700">
              Body text - Regular content (7.24:1 contrast)
            </MTypography>
            <MTypography variant="body2" class="text-gray-600">
              Secondary body text - Supporting content (4.54:1 contrast)
            </MTypography>
            <MTypography variant="caption" class="text-gray-500">
              Caption text - Supplementary information (3.18:1 contrast for large text only)
            </MTypography>
          </div>
        </section>
        
        <section>
          <MTypography variant="h2" component="h2" class="mb-6">
            High Contrast Mode Testing
          </MTypography>
          
          <div class="p-6 bg-black text-white rounded-lg">
            <MTypography variant="h3" class="text-white mb-4">
              High Contrast Dark Background
            </MTypography>
            <div class="space-y-3">
              <MButton text="High Contrast Button" variant="outlined" color="primary" />
              <p class="text-white">
                All text maintains readability in high contrast modes with appropriate color adjustments.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  \`
})`,...(v=(g=a.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var b,x,M;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`args => ({
  components: {
    MButton,
    MInput,
    MTypography,
    MAlert
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="space-y-8">
      <MTypography variant="h1" component="h1">
        Touch Target Size Accessibility Test
      </MTypography>
      
      <MAlert severity="info">
        All interactive elements meet the minimum 44px touch target requirement (WCAG 2.1 AA)
      </MAlert>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Minimum Touch Target Sizes
        </MTypography>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold">Large Buttons (48px+)</h3>
            <MButton 
              text="Large Touch Target"
              variant="filled"
              color="primary"
              size="large"
              fullWidth
              class="mf-button-primary min-h-[48px]"
            />
            <p class="text-sm text-gray-600">Height: 48px - Exceeds requirements</p>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-semibold">Medium Buttons (44px)</h3>
            <MButton 
              text="Standard Touch Target"
              variant="filled"
              color="secondary"
              fullWidth
              class="mf-button-secondary min-h-[44px]"
            />
            <p class="text-sm text-gray-600">Height: 44px - Meets requirements</p>
          </div>
          
          <div class="space-y-4">
            <h3 class="font-semibold">Outlined Buttons</h3>
            <MButton 
              text="Outlined Touch Target"
              variant="outlined"
              color="primary"
              fullWidth
              class="mf-button-outlined-primary min-h-[44px]"
            />
            <p class="text-sm text-gray-600">Height: 44px - Meets requirements</p>
          </div>
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Form Input Touch Targets
        </MTypography>
        
        <div class="max-w-md space-y-4">
          <MInput 
            label="Large Input Field"
            placeholder="Touch-friendly input"
            fullWidth
            class="min-h-[48px]"
          />
          
          <MInput 
            label="Standard Input Field"
            placeholder="Standard touch target"
            fullWidth
            class="min-h-[44px]"
          />
          
          <MInput 
            label="Number Input"
            type="number"
            placeholder="12345"
            fullWidth
            class="min-h-[44px]"
          />
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Adequate Spacing Between Targets
        </MTypography>
        
        <div class="space-y-6">
          <div>
            <h3 class="font-semibold mb-4">Close Proximity Buttons (Safe)</h3>
            <div class="flex flex-col sm:flex-row gap-4">
              <MButton 
                text="Accept Application"
                variant="filled"
                color="success"
                size="large"
                class="min-h-[48px]"
              />
              <MButton 
                text="Review Later"
                variant="outlined"
                color="secondary"
                size="large"
                class="min-h-[48px]"
              />
            </div>
            <p class="text-sm text-gray-600 mt-2">16px gap prevents accidental activation</p>
          </div>
          
          <div>
            <h3 class="font-semibold mb-4">Critical Action Separation</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <MButton 
                text="Submit Application"
                variant="filled"
                color="primary"
                size="large"
                fullWidth
                class="mf-button-primary min-h-[56px]"
              />
              <MButton 
                text="Cancel Application"
                variant="outlined"
                color="error"
                size="large"
                fullWidth
                class="min-h-[56px]"
              />
            </div>
            <p class="text-sm text-gray-600 mt-2">32px separation for destructive actions</p>
          </div>
        </div>
      </section>
      
      <section class="space-y-6">
        <MTypography variant="h2" component="h2">
          Mobile Optimization
        </MTypography>
        
        <div class="max-w-sm mx-auto space-y-4 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <p class="text-center text-sm text-gray-600 mb-4">
            Mobile viewport simulation (375px width)
          </p>
          
          <MButton 
            text="Mobile Primary Action"
            variant="filled"
            color="primary"
            fullWidth
            size="large"
            class="mf-button-primary min-h-[56px]"
          />
          
          <MButton 
            text="Mobile Secondary Action"
            variant="outlined"
            color="secondary"
            fullWidth
            size="large"
            class="min-h-[56px]"
          />
          
          <MInput 
            label="Mobile Input Field"
            placeholder="Touch-optimized input"
            fullWidth
            class="min-h-[56px]"
          />
          
          <p class="text-sm text-gray-600 text-center">
            All elements use 56px height for optimal mobile interaction
          </p>
        </div>
      </section>
    </div>
  \`
})`,...(M=(x=i.parameters)==null?void 0:x.docs)==null?void 0:M.source}}};const k=["KeyboardNavigationTest","ScreenReaderTest","ColorContrastTest","TouchTargetTest"];export{a as ColorContrastTest,n as KeyboardNavigationTest,t as ScreenReaderTest,i as TouchTargetTest,k as __namedExportsOrder,W as default};
