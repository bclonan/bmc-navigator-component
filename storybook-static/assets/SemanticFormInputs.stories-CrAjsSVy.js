import{M as c}from"./MTextField-OPGGVjaU.js";import{M as u}from"./MSelect-BPYUGOCn.js";import{M as m}from"./MCheckbox-B-c44SKF.js";import{M as b}from"./MSlider-CAxFof3m.js";import{M as g}from"./MButton-ClHapibe.js";import{M as f}from"./MCard-BMaDLVhA.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const k={title:"Material UI/Semantic Form Inputs",parameters:{docs:{description:{component:"Comprehensive showcase of all semantic form inputs with wrap/extend functionality for creating cohesive form sections and custom styling."}}}},n={render:()=>({components:{MTextField:c,MSelect:u,MCheckbox:m,MSlider:b,MButton:g,MCard:f},data(){return{form:{personalInfo:{firstName:"",lastName:"",email:"",phone:""},preferences:{theme:"",language:"",notifications:!1,marketing:!1,newsletter:!1},settings:{volume:75,quality:3,autoSave:!0,privacy:2}},themeOptions:[{value:"light",text:"Light Theme"},{value:"dark",text:"Dark Theme"},{value:"auto",text:"Auto (System)"}],languageOptions:[{value:"en",text:"English"},{value:"es",text:"Spanish"},{value:"fr",text:"French"},{value:"de",text:"German"}]}},template:`
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center mb-8">Semantic Form Inputs - Wrap & Extend Demo</h1>
        
        <!-- Personal Information Section -->
        <MCard title="Personal Information" subtitle="Basic contact details">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Standard field -->
            <MTextField 
              v-model="form.personalInfo.firstName"
              label="First Name" 
              placeholder="Enter your first name"
              prepend-icon="fas fa-user"
              :required="true"
            />
            
            <!-- Wrapped field with custom styling -->
            <MTextField 
              v-model="form.personalInfo.lastName"
              label="Last Name" 
              placeholder="Enter your last name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            />
            
            <!-- Extended field with enhanced appearance -->
            <MTextField 
              v-model="form.personalInfo.email"
              type="email"
              label="Email Address" 
              placeholder="your.email@example.com"
              prepend-icon="fas fa-envelope"
              :required="true"
              :extend="true"
              extended-class="shadow-md border-2 border-purple-300"
            />
            
            <!-- Both wrap and extend -->
            <MTextField 
              v-model="form.personalInfo.phone"
              type="tel"
              label="Phone Number" 
              placeholder="(555) 123-4567"
              prepend-icon="fas fa-phone"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
              extended-class="border-2 border-green-400 shadow-lg"
              helper-text="Primary contact number"
            />
          </div>
        </MCard>
        
        <!-- Preferences Section -->
        <MCard title="User Preferences" subtitle="Customize your experience">
          <div class="space-y-6">
            <!-- Select components with different wrap/extend styles -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSelect 
                v-model="form.preferences.theme"
                label="Theme Preference" 
                :options="themeOptions"
                placeholder="Choose theme..."
                prepend-icon="fas fa-palette"
                :wrap="true"
                wrapper-class="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
              />
              
              <MSelect 
                v-model="form.preferences.language"
                label="Language" 
                :options="languageOptions"
                placeholder="Select language..."
                prepend-icon="fas fa-globe"
                :extend="true"
                extended-class="border-2 border-indigo-300 shadow-md bg-indigo-50"
              />
            </div>
            
            <!-- Checkbox group with semantic styling -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold">Communication Preferences</h4>
              
              <!-- Critical notification - wrapped with warning styling -->
              <MCheckbox 
                v-model="form.preferences.notifications"
                label="Enable push notifications"
                :wrap="true"
                wrapper-class="p-3 bg-red-50 border-l-4 border-red-400 rounded-r"
                color="error"
                helper-text="Important system alerts and updates"
              />
              
              <!-- Marketing - extended with secondary styling -->
              <MCheckbox 
                v-model="form.preferences.marketing"
                label="Receive marketing communications"
                :extend="true"
                extended-class="border border-blue-300 bg-blue-50 p-3 rounded-lg"
                color="secondary"
                helper-text="Promotional offers and product updates"
              />
              
              <!-- Newsletter - both wrap and extend -->
              <MCheckbox 
                v-model="form.preferences.newsletter"
                label="Subscribe to monthly newsletter"
                :wrap="true"
                :extend="true"
                wrapper-class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
                extended-class="border-2 border-yellow-400 shadow-md"
                color="warning"
                helper-text="Monthly digest of features and tips"
              />
            </div>
          </div>
        </MCard>
        
        <!-- Settings Section -->
        <MCard title="Application Settings" subtitle="Fine-tune your experience">
          <div class="space-y-6">
            <!-- Audio volume - wrapped with audio theme -->
            <MSlider 
              v-model="form.settings.volume"
              label="Audio Volume"
              :min="0"
              :max="100"
              :step="5"
              color="primary"
              :show-value="true"
              :show-ticks="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
              :format-value="(value) => value + '%'"
              helper-text="System audio level"
            />
            
            <!-- Quality setting - extended with premium styling -->
            <MSlider 
              v-model="form.settings.quality"
              label="Video Quality"
              :min="1"
              :max="5"
              :step="1"
              color="success"
              :show-value="true"
              :show-ticks="true"
              :show-tick-labels="true"
              :extend="true"
              extended-class="shadow-lg border-2 border-green-300 p-3 rounded-lg bg-green-50"
              :format-value="(value) => ['Low', 'Medium', 'High', 'Ultra', 'Max'][value - 1]"
              helper-text="Streaming quality preference"
            />
            
            <!-- Privacy level - both wrap and extend with security theme -->
            <MSlider 
              v-model="form.settings.privacy"
              label="Privacy Level"
              :min="1"
              :max="3"
              :step="1"
              color="warning"
              :show-value="true"
              :show-ticks="true"
              :wrap="true"
              :extend="true"
              wrapper-class="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl"
              extended-class="border-2 border-orange-400 shadow-xl"
              :format-value="(value) => ['Public', 'Friends', 'Private'][value - 1]"
              helper-text="Data sharing preferences"
            />
            
            <!-- Auto-save toggle -->
            <MCheckbox 
              v-model="form.settings.autoSave"
              label="Enable automatic saving"
              :wrap="true"
              wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              color="success"
              helper-text="Automatically save changes every 30 seconds"
            />
          </div>
        </MCard>
        
        <!-- Form Actions -->
        <div class="flex justify-between items-center">
          <MButton variant="outlined" text="Reset to Defaults" />
          <div class="space-x-3">
            <MButton variant="outlined" text="Save Draft" />
            <MButton text="Save Settings" prepend-icon="fas fa-save" />
          </div>
        </div>
        
        <!-- Live Preview -->
        <MCard title="Live Form Data" subtitle="Current form state">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(form, null, 2) }}</pre>
        </MCard>
      </div>
    `}),parameters:{docs:{description:{story:"Complete demonstration of wrap and extend functionality across all semantic form inputs, showing how to create cohesive form sections with custom styling and semantic meaning."}}}},r={render:()=>({components:{MTextField:c,MSelect:u,MCheckbox:m,MSlider:b,MButton:g,MCard:f},data(){return{loanApplication:{personalInfo:{firstName:"",lastName:"",ssn:"",dateOfBirth:""},employment:{employer:"",jobTitle:"",employmentType:"",workYears:2,income:45e3},loanDetails:{amount:15e3,purpose:"",term:"48",collateral:!1},agreements:{terms:!1,privacy:!1,creditCheck:!1,marketing:!1}},employmentTypes:[{value:"full_time",text:"Full-time Employee"},{value:"part_time",text:"Part-time Employee"},{value:"self_employed",text:"Self-employed"},{value:"contractor",text:"Independent Contractor"}],loanPurposes:[{value:"debt_consolidation",text:"Debt Consolidation"},{value:"home_improvement",text:"Home Improvement"},{value:"auto_repair",text:"Auto Repair"},{value:"medical",text:"Medical Expenses"},{value:"education",text:"Education"},{value:"other",text:"Other"}],loanTerms:[{value:"24",text:"24 months"},{value:"36",text:"36 months"},{value:"48",text:"48 months"},{value:"60",text:"60 months"},{value:"72",text:"72 months"}]}},computed:{estimatedPayment(){const e=this.loanApplication.loanDetails.amount,t=.15/12,a=parseInt(this.loanApplication.loanDetails.term);if(e&&a){const v=e*(t*Math.pow(1+t,a))/(Math.pow(1+t,a)-1);return Math.round(v*100)/100}return 0}},methods:{formatCurrency(e){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0}).format(e)}},template:`
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center mb-8">Your Town Finance - Loan Application</h1>
        
        <!-- Personal Information - High Security Section -->
        <MCard title="Personal Information" subtitle="Secure and confidential">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MTextField 
              v-model="loanApplication.personalInfo.firstName"
              label="First Name" 
              placeholder="Legal first name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.lastName"
              label="Last Name" 
              placeholder="Legal last name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.ssn"
              type="password"
              label="Social Security Number" 
              placeholder="XXX-XX-XXXX"
              prepend-icon="fas fa-shield-alt"
              :required="true"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
              extended-class="border-2 border-red-300 shadow-md"
              helper-text="Encrypted and secure - required for credit check"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.dateOfBirth"
              type="date"
              label="Date of Birth" 
              prepend-icon="fas fa-calendar"
              :required="true"
              :extend="true"
              extended-class="border-2 border-gray-300 shadow-sm"
            />
          </div>
        </MCard>
        
        <!-- Employment Information -->
        <MCard title="Employment Information" subtitle="Current employment details">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MTextField 
                v-model="loanApplication.employment.employer"
                label="Current Employer" 
                placeholder="Company name"
                prepend-icon="fas fa-building"
                :required="true"
                :wrap="true"
                wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              />
              
              <MTextField 
                v-model="loanApplication.employment.jobTitle"
                label="Job Title" 
                placeholder="Your position"
                prepend-icon="fas fa-briefcase"
                :required="true"
                :wrap="true"
                wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              />
            </div>
            
            <MSelect 
              v-model="loanApplication.employment.employmentType"
              label="Employment Type" 
              :options="employmentTypes"
              placeholder="Select employment type..."
              prepend-icon="fas fa-id-card"
              :required="true"
              :extend="true"
              extended-class="border-2 border-green-300 bg-green-50"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSlider 
                v-model="loanApplication.employment.workYears"
                label="Years with Current Employer"
                :min="0"
                :max="20"
                :step="0.5"
                color="success"
                :show-value="true"
                :show-ticks="true"
                :wrap="true"
                wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
                :format-value="(value) => value + ' years'"
                helper-text="Employment stability factor"
              />
              
              <MSlider 
                v-model="loanApplication.employment.income"
                label="Annual Income"
                :min="20000"
                :max="150000"
                :step="1000"
                color="primary"
                :show-value="true"
                :wrap="true"
                :extend="true"
                wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                extended-class="border-2 border-blue-400 shadow-lg"
                :format-value="formatCurrency"
                helper-text="Gross annual income before taxes"
              />
            </div>
          </div>
        </MCard>
        
        <!-- Loan Configuration -->
        <MCard title="Loan Details" subtitle="Configure your loan">
          <div class="space-y-6">
            <MSlider 
              v-model="loanApplication.loanDetails.amount"
              label="Loan Amount"
              :min="1000"
              :max="50000"
              :step="500"
              color="primary"
              :show-value="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
              :format-value="formatCurrency"
              helper-text="How much do you need to borrow?"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSelect 
                v-model="loanApplication.loanDetails.purpose"
                label="Loan Purpose" 
                :options="loanPurposes"
                placeholder="What will you use this loan for?"
                prepend-icon="fas fa-target"
                :required="true"
                :searchable="true"
                :wrap="true"
                wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
              />
              
              <MSelect 
                v-model="loanApplication.loanDetails.term"
                label="Loan Term" 
                :options="loanTerms"
                placeholder="Repayment period"
                prepend-icon="fas fa-calendar-alt"
                :required="true"
                :extend="true"
                extended-class="border-2 border-purple-300 shadow-md bg-purple-50"
              />
            </div>
            
            <MCheckbox 
              v-model="loanApplication.loanDetails.collateral"
              label="I can provide collateral to secure this loan"
              :wrap="true"
              wrapper-class="p-3 bg-yellow-50 border border-yellow-300 rounded-lg"
              color="warning"
              helper-text="Collateral may help you qualify for better terms"
            />
          </div>
        </MCard>
        
        <!-- Legal Agreements -->
        <MCard title="Required Agreements" subtitle="Legal acknowledgments">
          <div class="space-y-4">
            <MCheckbox 
              v-model="loanApplication.agreements.terms"
              :required="true"
              color="error"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            >
              I agree to the <a href="#" class="text-blue-600 hover:underline font-semibold">Terms and Conditions</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.privacy"
              :required="true"
              color="error"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            >
              I have read and accept the <a href="#" class="text-blue-600 hover:underline font-semibold">Privacy Policy</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.creditCheck"
              :required="true"
              color="error"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
              extended-class="shadow-md border border-red-300"
            >
              I authorize Your Town Finance to check my credit and verify my information
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.marketing"
              color="secondary"
              :wrap="true"
              wrapper-class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
              label="I would like to receive promotional offers and financial tips"
              helper-text="Optional - you can unsubscribe at any time"
            />
          </div>
        </MCard>
        
        <!-- Loan Summary -->
        <MCard title="Loan Summary" subtitle="Review your application">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(loanApplication.loanDetails.amount) }}</div>
              <div class="text-sm text-gray-600">Loan Amount</div>
            </div>
            <div class="p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ formatCurrency(estimatedPayment) }}</div>
              <div class="text-sm text-gray-600">Est. Monthly Payment</div>
            </div>
            <div class="p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ loanApplication.loanDetails.term }} months</div>
              <div class="text-sm text-gray-600">Loan Term</div>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">
              <strong>Note:</strong> This is an estimate. Final terms will be determined after credit approval and verification of information.
            </p>
          </div>
        </MCard>
        
        <!-- Form Actions -->
        <div class="flex justify-between items-center">
          <MButton variant="outlined" text="Save as Draft" prepend-icon="fas fa-save" />
          <div class="space-x-3">
            <MButton variant="outlined" text="Review Application" />
            <MButton text="Submit Application" prepend-icon="fas fa-paper-plane" />
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Real-world financial services form demonstrating semantic grouping with wrap/extend functionality for different security levels, form sections, and user experience patterns."}}}};var o,l,i;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField,
      MSelect,
      MCheckbox,
      MSlider,
      MButton,
      MCard
    },
    data() {
      return {
        form: {
          personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          },
          preferences: {
            theme: '',
            language: '',
            notifications: false,
            marketing: false,
            newsletter: false
          },
          settings: {
            volume: 75,
            quality: 3,
            autoSave: true,
            privacy: 2
          }
        },
        themeOptions: [{
          value: 'light',
          text: 'Light Theme'
        }, {
          value: 'dark',
          text: 'Dark Theme'
        }, {
          value: 'auto',
          text: 'Auto (System)'
        }],
        languageOptions: [{
          value: 'en',
          text: 'English'
        }, {
          value: 'es',
          text: 'Spanish'
        }, {
          value: 'fr',
          text: 'French'
        }, {
          value: 'de',
          text: 'German'
        }]
      };
    },
    template: \`
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center mb-8">Semantic Form Inputs - Wrap & Extend Demo</h1>
        
        <!-- Personal Information Section -->
        <MCard title="Personal Information" subtitle="Basic contact details">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Standard field -->
            <MTextField 
              v-model="form.personalInfo.firstName"
              label="First Name" 
              placeholder="Enter your first name"
              prepend-icon="fas fa-user"
              :required="true"
            />
            
            <!-- Wrapped field with custom styling -->
            <MTextField 
              v-model="form.personalInfo.lastName"
              label="Last Name" 
              placeholder="Enter your last name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
            />
            
            <!-- Extended field with enhanced appearance -->
            <MTextField 
              v-model="form.personalInfo.email"
              type="email"
              label="Email Address" 
              placeholder="your.email@example.com"
              prepend-icon="fas fa-envelope"
              :required="true"
              :extend="true"
              extended-class="shadow-md border-2 border-purple-300"
            />
            
            <!-- Both wrap and extend -->
            <MTextField 
              v-model="form.personalInfo.phone"
              type="tel"
              label="Phone Number" 
              placeholder="(555) 123-4567"
              prepend-icon="fas fa-phone"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
              extended-class="border-2 border-green-400 shadow-lg"
              helper-text="Primary contact number"
            />
          </div>
        </MCard>
        
        <!-- Preferences Section -->
        <MCard title="User Preferences" subtitle="Customize your experience">
          <div class="space-y-6">
            <!-- Select components with different wrap/extend styles -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSelect 
                v-model="form.preferences.theme"
                label="Theme Preference" 
                :options="themeOptions"
                placeholder="Choose theme..."
                prepend-icon="fas fa-palette"
                :wrap="true"
                wrapper-class="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
              />
              
              <MSelect 
                v-model="form.preferences.language"
                label="Language" 
                :options="languageOptions"
                placeholder="Select language..."
                prepend-icon="fas fa-globe"
                :extend="true"
                extended-class="border-2 border-indigo-300 shadow-md bg-indigo-50"
              />
            </div>
            
            <!-- Checkbox group with semantic styling -->
            <div class="space-y-4">
              <h4 class="text-lg font-semibold">Communication Preferences</h4>
              
              <!-- Critical notification - wrapped with warning styling -->
              <MCheckbox 
                v-model="form.preferences.notifications"
                label="Enable push notifications"
                :wrap="true"
                wrapper-class="p-3 bg-red-50 border-l-4 border-red-400 rounded-r"
                color="error"
                helper-text="Important system alerts and updates"
              />
              
              <!-- Marketing - extended with secondary styling -->
              <MCheckbox 
                v-model="form.preferences.marketing"
                label="Receive marketing communications"
                :extend="true"
                extended-class="border border-blue-300 bg-blue-50 p-3 rounded-lg"
                color="secondary"
                helper-text="Promotional offers and product updates"
              />
              
              <!-- Newsletter - both wrap and extend -->
              <MCheckbox 
                v-model="form.preferences.newsletter"
                label="Subscribe to monthly newsletter"
                :wrap="true"
                :extend="true"
                wrapper-class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl"
                extended-class="border-2 border-yellow-400 shadow-md"
                color="warning"
                helper-text="Monthly digest of features and tips"
              />
            </div>
          </div>
        </MCard>
        
        <!-- Settings Section -->
        <MCard title="Application Settings" subtitle="Fine-tune your experience">
          <div class="space-y-6">
            <!-- Audio volume - wrapped with audio theme -->
            <MSlider 
              v-model="form.settings.volume"
              label="Audio Volume"
              :min="0"
              :max="100"
              :step="5"
              color="primary"
              :show-value="true"
              :show-ticks="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border border-blue-200 rounded-lg"
              :format-value="(value) => value + '%'"
              helper-text="System audio level"
            />
            
            <!-- Quality setting - extended with premium styling -->
            <MSlider 
              v-model="form.settings.quality"
              label="Video Quality"
              :min="1"
              :max="5"
              :step="1"
              color="success"
              :show-value="true"
              :show-ticks="true"
              :show-tick-labels="true"
              :extend="true"
              extended-class="shadow-lg border-2 border-green-300 p-3 rounded-lg bg-green-50"
              :format-value="(value) => ['Low', 'Medium', 'High', 'Ultra', 'Max'][value - 1]"
              helper-text="Streaming quality preference"
            />
            
            <!-- Privacy level - both wrap and extend with security theme -->
            <MSlider 
              v-model="form.settings.privacy"
              label="Privacy Level"
              :min="1"
              :max="3"
              :step="1"
              color="warning"
              :show-value="true"
              :show-ticks="true"
              :wrap="true"
              :extend="true"
              wrapper-class="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl"
              extended-class="border-2 border-orange-400 shadow-xl"
              :format-value="(value) => ['Public', 'Friends', 'Private'][value - 1]"
              helper-text="Data sharing preferences"
            />
            
            <!-- Auto-save toggle -->
            <MCheckbox 
              v-model="form.settings.autoSave"
              label="Enable automatic saving"
              :wrap="true"
              wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              color="success"
              helper-text="Automatically save changes every 30 seconds"
            />
          </div>
        </MCard>
        
        <!-- Form Actions -->
        <div class="flex justify-between items-center">
          <MButton variant="outlined" text="Reset to Defaults" />
          <div class="space-x-3">
            <MButton variant="outlined" text="Save Draft" />
            <MButton text="Save Settings" prepend-icon="fas fa-save" />
          </div>
        </div>
        
        <!-- Live Preview -->
        <MCard title="Live Form Data" subtitle="Current form state">
          <pre class="bg-gray-100 p-4 rounded text-sm overflow-auto">{{ JSON.stringify(form, null, 2) }}</pre>
        </MCard>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete demonstration of wrap and extend functionality across all semantic form inputs, showing how to create cohesive form sections with custom styling and semantic meaning.'
      }
    }
  }
}`,...(i=(l=n.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var s,d,p;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField,
      MSelect,
      MCheckbox,
      MSlider,
      MButton,
      MCard
    },
    data() {
      return {
        loanApplication: {
          personalInfo: {
            firstName: '',
            lastName: '',
            ssn: '',
            dateOfBirth: ''
          },
          employment: {
            employer: '',
            jobTitle: '',
            employmentType: '',
            workYears: 2,
            income: 45000
          },
          loanDetails: {
            amount: 15000,
            purpose: '',
            term: '48',
            collateral: false
          },
          agreements: {
            terms: false,
            privacy: false,
            creditCheck: false,
            marketing: false
          }
        },
        employmentTypes: [{
          value: 'full_time',
          text: 'Full-time Employee'
        }, {
          value: 'part_time',
          text: 'Part-time Employee'
        }, {
          value: 'self_employed',
          text: 'Self-employed'
        }, {
          value: 'contractor',
          text: 'Independent Contractor'
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
        loanTerms: [{
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
        }]
      };
    },
    computed: {
      estimatedPayment() {
        const principal = this.loanApplication.loanDetails.amount;
        const rate = 0.15 / 12; // 15% APR monthly
        const payments = parseInt(this.loanApplication.loanDetails.term);
        if (principal && payments) {
          const payment = principal * (rate * Math.pow(1 + rate, payments)) / (Math.pow(1 + rate, payments) - 1);
          return Math.round(payment * 100) / 100;
        }
        return 0;
      }
    },
    methods: {
      formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0
        }).format(value);
      }
    },
    template: \`
      <div class="max-w-6xl mx-auto space-y-8">
        <h1 class="text-3xl font-bold text-center mb-8">Your Town Finance - Loan Application</h1>
        
        <!-- Personal Information - High Security Section -->
        <MCard title="Personal Information" subtitle="Secure and confidential">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MTextField 
              v-model="loanApplication.personalInfo.firstName"
              label="First Name" 
              placeholder="Legal first name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.lastName"
              label="Last Name" 
              placeholder="Legal last name"
              prepend-icon="fas fa-user"
              :required="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.ssn"
              type="password"
              label="Social Security Number" 
              placeholder="XXX-XX-XXXX"
              prepend-icon="fas fa-shield-alt"
              :required="true"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
              extended-class="border-2 border-red-300 shadow-md"
              helper-text="Encrypted and secure - required for credit check"
            />
            
            <MTextField 
              v-model="loanApplication.personalInfo.dateOfBirth"
              type="date"
              label="Date of Birth" 
              prepend-icon="fas fa-calendar"
              :required="true"
              :extend="true"
              extended-class="border-2 border-gray-300 shadow-sm"
            />
          </div>
        </MCard>
        
        <!-- Employment Information -->
        <MCard title="Employment Information" subtitle="Current employment details">
          <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MTextField 
                v-model="loanApplication.employment.employer"
                label="Current Employer" 
                placeholder="Company name"
                prepend-icon="fas fa-building"
                :required="true"
                :wrap="true"
                wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              />
              
              <MTextField 
                v-model="loanApplication.employment.jobTitle"
                label="Job Title" 
                placeholder="Your position"
                prepend-icon="fas fa-briefcase"
                :required="true"
                :wrap="true"
                wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              />
            </div>
            
            <MSelect 
              v-model="loanApplication.employment.employmentType"
              label="Employment Type" 
              :options="employmentTypes"
              placeholder="Select employment type..."
              prepend-icon="fas fa-id-card"
              :required="true"
              :extend="true"
              extended-class="border-2 border-green-300 bg-green-50"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSlider 
                v-model="loanApplication.employment.workYears"
                label="Years with Current Employer"
                :min="0"
                :max="20"
                :step="0.5"
                color="success"
                :show-value="true"
                :show-ticks="true"
                :wrap="true"
                wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
                :format-value="(value) => value + ' years'"
                helper-text="Employment stability factor"
              />
              
              <MSlider 
                v-model="loanApplication.employment.income"
                label="Annual Income"
                :min="20000"
                :max="150000"
                :step="1000"
                color="primary"
                :show-value="true"
                :wrap="true"
                :extend="true"
                wrapper-class="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl"
                extended-class="border-2 border-blue-400 shadow-lg"
                :format-value="formatCurrency"
                helper-text="Gross annual income before taxes"
              />
            </div>
          </div>
        </MCard>
        
        <!-- Loan Configuration -->
        <MCard title="Loan Details" subtitle="Configure your loan">
          <div class="space-y-6">
            <MSlider 
              v-model="loanApplication.loanDetails.amount"
              label="Loan Amount"
              :min="1000"
              :max="50000"
              :step="500"
              color="primary"
              :show-value="true"
              :wrap="true"
              wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
              :format-value="formatCurrency"
              helper-text="How much do you need to borrow?"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSelect 
                v-model="loanApplication.loanDetails.purpose"
                label="Loan Purpose" 
                :options="loanPurposes"
                placeholder="What will you use this loan for?"
                prepend-icon="fas fa-target"
                :required="true"
                :searchable="true"
                :wrap="true"
                wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
              />
              
              <MSelect 
                v-model="loanApplication.loanDetails.term"
                label="Loan Term" 
                :options="loanTerms"
                placeholder="Repayment period"
                prepend-icon="fas fa-calendar-alt"
                :required="true"
                :extend="true"
                extended-class="border-2 border-purple-300 shadow-md bg-purple-50"
              />
            </div>
            
            <MCheckbox 
              v-model="loanApplication.loanDetails.collateral"
              label="I can provide collateral to secure this loan"
              :wrap="true"
              wrapper-class="p-3 bg-yellow-50 border border-yellow-300 rounded-lg"
              color="warning"
              helper-text="Collateral may help you qualify for better terms"
            />
          </div>
        </MCard>
        
        <!-- Legal Agreements -->
        <MCard title="Required Agreements" subtitle="Legal acknowledgments">
          <div class="space-y-4">
            <MCheckbox 
              v-model="loanApplication.agreements.terms"
              :required="true"
              color="error"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            >
              I agree to the <a href="#" class="text-blue-600 hover:underline font-semibold">Terms and Conditions</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.privacy"
              :required="true"
              color="error"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
            >
              I have read and accept the <a href="#" class="text-blue-600 hover:underline font-semibold">Privacy Policy</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.creditCheck"
              :required="true"
              color="error"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg"
              extended-class="shadow-md border border-red-300"
            >
              I authorize Your Town Finance to check my credit and verify my information
            </MCheckbox>
            
            <MCheckbox 
              v-model="loanApplication.agreements.marketing"
              color="secondary"
              :wrap="true"
              wrapper-class="p-3 bg-blue-50 border border-blue-200 rounded-lg"
              label="I would like to receive promotional offers and financial tips"
              helper-text="Optional - you can unsubscribe at any time"
            />
          </div>
        </MCard>
        
        <!-- Loan Summary -->
        <MCard title="Loan Summary" subtitle="Review your application">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div class="p-4 bg-blue-50 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(loanApplication.loanDetails.amount) }}</div>
              <div class="text-sm text-gray-600">Loan Amount</div>
            </div>
            <div class="p-4 bg-green-50 rounded-lg">
              <div class="text-2xl font-bold text-green-600">{{ formatCurrency(estimatedPayment) }}</div>
              <div class="text-sm text-gray-600">Est. Monthly Payment</div>
            </div>
            <div class="p-4 bg-purple-50 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">{{ loanApplication.loanDetails.term }} months</div>
              <div class="text-sm text-gray-600">Loan Term</div>
            </div>
          </div>
          
          <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p class="text-sm text-yellow-800">
              <strong>Note:</strong> This is an estimate. Final terms will be determined after credit approval and verification of information.
            </p>
          </div>
        </MCard>
        
        <!-- Form Actions -->
        <div class="flex justify-between items-center">
          <MButton variant="outlined" text="Save as Draft" prepend-icon="fas fa-save" />
          <div class="space-x-3">
            <MButton variant="outlined" text="Review Application" />
            <MButton text="Submit Application" prepend-icon="fas fa-paper-plane" />
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Real-world financial services form demonstrating semantic grouping with wrap/extend functionality for different security levels, form sections, and user experience patterns.'
      }
    }
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const T=["WrapExtendShowcase","FinancialServicesForms"];export{r as FinancialServicesForms,n as WrapExtendShowcase,T as __namedExportsOrder,k as default};
