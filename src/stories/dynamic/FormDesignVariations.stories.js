import { ref } from 'vue';
import MLayout from '../../components/ui/MLayout.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';

export default {
  title: 'Dynamic Forms/Design Variations',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of different form design patterns, layouts, and styling approaches for various use cases including financial services, surveys, registration forms, and business applications.'
      }
    }
  }
};

// Card-based form design with wizard-style layout
const wizardFormSchema = {
  title: 'Multi-Step Wizard Form',
  description: 'Card-based wizard with progress tracking and advanced validation',
  
  defaults: {
    'step1.firstName': '',
    'step1.lastName': '',
    'step2.company': '',
    'step2.revenue': 100000,
    'step3.loanAmount': 50000
  },
  
  sections: [
    {
      id: 'step1_personal',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'step1.firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your first name',
          icon: 'fas fa-user',
          required: true,
          validation: ['required'],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm',
            extendedClass: 'border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
          }
        },
        {
          id: 'step1.lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter your last name',
          icon: 'fas fa-user',
          required: true,
          validation: ['required'],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm',
            extendedClass: 'border-2 border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200'
          }
        },
        {
          id: 'step1.email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'your.email@company.com',
          icon: 'fas fa-envelope',
          required: true,
          validation: ['required', 'email'],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm',
            extendedClass: 'border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
          }
        }
      ]
    },
    
    {
      id: 'step2_business',
      title: 'Business Information',
      description: 'Details about your business',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'step2.company',
          label: 'Company Name',
          type: 'text',
          placeholder: 'Your company name',
          icon: 'fas fa-building',
          required: true,
          validation: ['required'],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-md border border-green-200'
          }
        },
        {
          id: 'step2.industry',
          label: 'Industry',
          type: 'select',
          placeholder: 'Select your industry',
          icon: 'fas fa-industry',
          required: true,
          validation: ['required'],
          options: [
            { value: 'technology', text: 'Technology' },
            { value: 'finance', text: 'Finance' },
            { value: 'healthcare', text: 'Healthcare' },
            { value: 'retail', text: 'Retail' },
            { value: 'manufacturing', text: 'Manufacturing' },
            { value: 'other', text: 'Other' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-md border border-green-200'
          }
        },
        {
          id: 'step2.employees',
          label: 'Number of Employees',
          type: 'select',
          placeholder: 'Select company size',
          icon: 'fas fa-users',
          required: true,
          validation: ['required'],
          options: [
            { value: '1-10', text: '1-10 employees' },
            { value: '11-50', text: '11-50 employees' },
            { value: '51-200', text: '51-200 employees' },
            { value: '201-500', text: '201-500 employees' },
            { value: '500+', text: '500+ employees' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-md border border-green-200'
          }
        },
        {
          id: 'step2.revenue',
          label: 'Annual Revenue',
          type: 'slider',
          min: 10000,
          max: 10000000,
          step: 10000,
          color: 'success',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg',
            extendedClass: 'border-2 border-green-400'
          },
          helpText: 'Estimated annual revenue for your business'
        }
      ]
    },
    
    {
      id: 'step3_loan',
      title: 'Loan Requirements',
      description: 'Configure your loan needs',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'step3.loanAmount',
          label: 'Requested Loan Amount',
          type: 'slider',
          min: 5000,
          max: 500000,
          step: 1000,
          color: 'primary',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          required: true,
          validation: [
            'required',
            { type: 'minValue', value: 5000, message: 'Minimum loan amount is $5,000' }
          ],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-2xl shadow-xl border border-purple-300',
            extendedClass: 'border-3 border-purple-500 shadow-2xl'
          }
        },
        {
          id: 'step3.purpose',
          label: 'Loan Purpose',
          type: 'select',
          placeholder: 'Select loan purpose',
          icon: 'fas fa-target',
          required: true,
          validation: ['required'],
          options: [
            { value: 'equipment', text: 'Equipment Purchase' },
            { value: 'expansion', text: 'Business Expansion' },
            { value: 'inventory', text: 'Inventory Financing' },
            { value: 'working_capital', text: 'Working Capital' },
            { value: 'real_estate', text: 'Real Estate' },
            { value: 'other', text: 'Other' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-md border border-purple-200'
          }
        },
        {
          id: 'step3.urgency',
          label: 'Funding Timeline',
          type: 'select',
          placeholder: 'When do you need funding?',
          icon: 'fas fa-clock',
          required: true,
          validation: ['required'],
          options: [
            { value: 'immediate', text: 'Immediate (1-2 weeks)' },
            { value: 'soon', text: 'Soon (3-4 weeks)' },
            { value: 'flexible', text: 'Flexible (1-2 months)' },
            { value: 'planning', text: 'Planning (3+ months)' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-md border border-purple-200'
          }
        }
      ]
    }
  ]
};

// Compact dashboard-style form
const dashboardFormSchema = {
  title: 'Dashboard Settings',
  description: 'Compact form design for dashboard configurations',
  
  sections: [
    {
      id: 'dashboard_prefs',
      title: 'Dashboard Preferences',
      description: 'Customize your dashboard experience',
      layout: 'grid',
      styling: {
        className: 'bg-white border border-gray-200 rounded-lg shadow-sm'
      },
      fields: [
        {
          id: 'prefs.theme',
          label: 'Theme',
          type: 'select',
          options: [
            { value: 'light', text: 'Light' },
            { value: 'dark', text: 'Dark' },
            { value: 'auto', text: 'Auto' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-gray-50 rounded border'
          }
        },
        {
          id: 'prefs.language',
          label: 'Language',
          type: 'select',
          options: [
            { value: 'en', text: 'English' },
            { value: 'es', text: 'Español' },
            { value: 'fr', text: 'Français' },
            { value: 'de', text: 'Deutsch' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-gray-50 rounded border'
          }
        },
        {
          id: 'prefs.autoRefresh',
          label: 'Auto-refresh data every 30 seconds',
          type: 'checkbox',
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-blue-50 rounded border border-blue-200'
          }
        },
        {
          id: 'prefs.notifications',
          label: 'Enable push notifications',
          type: 'checkbox',
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-blue-50 rounded border border-blue-200'
          }
        },
        {
          id: 'prefs.refreshRate',
          label: 'Data Refresh Rate (seconds)',
          type: 'slider',
          min: 10,
          max: 300,
          step: 10,
          showValue: true,
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-indigo-50 rounded border border-indigo-200'
          }
        }
      ]
    }
  ]
};

// Survey-style form with different question types
const surveyFormSchema = {
  title: 'Customer Satisfaction Survey',
  description: 'Help us improve our services with your feedback',
  
  sections: [
    {
      id: 'rating_section',
      title: 'Service Rating',
      description: 'Rate your experience with our services',
      layout: 'single',
      styling: {
        className: 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg'
      },
      fields: [
        {
          id: 'survey.overallSatisfaction',
          label: 'Overall Satisfaction',
          type: 'slider',
          min: 1,
          max: 10,
          step: 1,
          color: 'warning',
          showValue: true,
          showTicks: true,
          formatValue: '(value) => value + "/10"',
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-6 bg-white rounded-xl shadow-md border-l-4 border-yellow-500',
            extendedClass: 'border-2 border-yellow-400'
          },
          helpText: 'Rate your overall satisfaction from 1 (very poor) to 10 (excellent)'
        },
        {
          id: 'survey.serviceQuality',
          label: 'Service Quality Rating',
          type: 'slider',
          min: 1,
          max: 5,
          step: 1,
          color: 'success',
          showValue: true,
          showTicks: true,
          formatValue: '(value) => "★".repeat(value) + "☆".repeat(5-value)',
          styling: {
            wrap: true,
            wrapperClass: 'p-6 bg-white rounded-xl shadow-md border-l-4 border-green-500'
          },
          helpText: 'Rate the quality of service you received'
        },
        {
          id: 'survey.recommendLikelihood',
          label: 'Likelihood to Recommend',
          type: 'slider',
          min: 0,
          max: 10,
          step: 1,
          color: 'primary',
          showValue: true,
          showTicks: true,
          styling: {
            wrap: true,
            wrapperClass: 'p-6 bg-white rounded-xl shadow-md border-l-4 border-blue-500'
          },
          helpText: 'How likely are you to recommend us to others? (0 = Not at all, 10 = Extremely likely)'
        }
      ]
    },
    
    {
      id: 'feedback_section',
      title: 'Detailed Feedback',
      description: 'Share your thoughts and suggestions',
      layout: 'single',
      styling: {
        className: 'bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg'
      },
      fields: [
        {
          id: 'survey.favoriteFeature',
          label: 'What did you like most about our service?',
          type: 'select',
          placeholder: 'Select your favorite aspect',
          options: [
            { value: 'speed', text: 'Fast processing time' },
            { value: 'support', text: 'Excellent customer support' },
            { value: 'rates', text: 'Competitive rates' },
            { value: 'ease', text: 'Easy application process' },
            { value: 'communication', text: 'Clear communication' },
            { value: 'other', text: 'Other' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-sm border border-green-200'
          }
        },
        {
          id: 'survey.improvements',
          label: 'What could we improve?',
          type: 'textarea',
          placeholder: 'Share your suggestions for improvement...',
          rows: 4,
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-sm border border-green-200'
          },
          helpText: 'Your feedback helps us serve you better'
        },
        {
          id: 'survey.additionalComments',
          label: 'Additional Comments',
          type: 'textarea',
          placeholder: 'Any other feedback or comments?',
          rows: 3,
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white rounded-lg shadow-sm border border-green-200'
          }
        }
      ]
    }
  ]
};

// Minimal registration form
const registrationFormSchema = {
  title: 'Quick Registration',
  description: 'Minimal form design for fast user onboarding',
  
  sections: [
    {
      id: 'quick_registration',
      title: 'Create Your Account',
      description: 'Get started in less than 2 minutes',
      layout: 'single',
      styling: {
        className: 'bg-white border border-gray-100 rounded-2xl shadow-xl'
      },
      fields: [
        {
          id: 'reg.email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'Enter your email',
          icon: 'fas fa-envelope',
          required: true,
          validation: ['required', 'email'],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-1',
            extendedClass: 'text-lg p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm'
          }
        },
        {
          id: 'reg.password',
          label: 'Password',
          type: 'password',
          placeholder: 'Create a secure password',
          icon: 'fas fa-lock',
          required: true,
          validation: [
            'required',
            { type: 'minLength', value: 8, message: 'Password must be at least 8 characters' }
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-1',
            extendedClass: 'text-lg p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 shadow-sm'
          }
        },
        {
          id: 'reg.terms',
          label: 'I agree to the Terms of Service and Privacy Policy',
          type: 'checkbox',
          required: true,
          validation: [
            { type: 'custom', validator: '(value) => value === true', message: 'You must accept the terms to continue' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-gray-50 rounded-lg border border-gray-200 text-center'
          }
        }
      ]
    }
  ]
};

export const WizardStyleForm = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(wizardFormSchema);
      
      return {
        formSchema,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 1500));
          return {
            success: true,
            message: 'Wizard form completed successfully!',
            data: { applicationId: 'WIZ-' + Date.now() }
          };
        }
      };
    },
    template: `
      <MLayout app-title="Wizard Form Demo" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="wizard_form_demo"
          :on-submit="handleSubmission"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Card-based wizard form with gradient backgrounds, advanced styling, and step-by-step progression. Features enhanced visual hierarchy with colored borders, shadows, and custom wrapper styling.'
      }
    }
  }
};

export const DashboardCompactForm = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(dashboardFormSchema);
      
      return {
        formSchema,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 500));
          return {
            success: true,
            message: 'Settings saved successfully!',
            data: formData
          };
        }
      };
    },
    template: `
      <MLayout app-title="Dashboard Settings" :drawer="false">
        <div class="max-w-2xl mx-auto p-6">
          <DynamicFormRenderer
            :schema="formSchema"
            storage-key="dashboard_settings"
            :on-submit="handleSubmission"
          />
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Compact dashboard-style form with minimal spacing and clean design. Perfect for settings panels and configuration interfaces with space constraints.'
      }
    }
  }
};

export const SurveyForm = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(surveyFormSchema);
      
      return {
        formSchema,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 1000));
          return {
            success: true,
            message: 'Thank you for your feedback!',
            data: { responseId: 'SURVEY-' + Date.now() }
          };
        }
      };
    },
    template: `
      <MLayout app-title="Customer Survey" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="customer_survey"
          :on-submit="handleSubmission"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Survey-style form with rating sliders, star ratings, and feedback sections. Features gradient backgrounds and specialized question types for customer feedback collection.'
      }
    }
  }
};

export const MinimalRegistration = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(registrationFormSchema);
      
      return {
        formSchema,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 800));
          return {
            success: true,
            message: 'Account created successfully! Welcome aboard!',
            data: { userId: 'USER-' + Date.now() }
          };
        }
      };
    },
    template: `
      <MLayout app-title="User Registration" :drawer="false">
        <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
          <div class="w-full max-w-md">
            <DynamicFormRenderer
              :schema="formSchema"
              storage-key="user_registration"
              :on-submit="handleSubmission"
            />
          </div>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Minimal registration form with large input fields, centered layout, and minimal visual elements. Designed for quick user onboarding with reduced friction.'
      }
    }
  }
};

export const FormLayoutComparison = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer, MCard, MButton },
    data() {
      return {
        currentLayout: 'card',
        layouts: {
          card: {
            title: 'Card Layout',
            description: 'Form sections in individual cards',
            schema: {
              title: 'Card Layout Demo',
              description: 'Each section is rendered as a separate card',
              sections: [
                {
                  id: 'section1',
                  title: 'Personal Details',
                  description: 'Basic information',
                  layout: 'grid',
                  styling: { className: 'bg-blue-50 border border-blue-200 rounded-lg shadow' },
                  fields: [
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' }
                  ]
                },
                {
                  id: 'section2',
                  title: 'Preferences',
                  description: 'Your preferences',
                  layout: 'grid',
                  styling: { className: 'bg-green-50 border border-green-200 rounded-lg shadow' },
                  fields: [
                    { id: 'theme', label: 'Theme', type: 'select', options: [{ value: 'light', text: 'Light' }, { value: 'dark', text: 'Dark' }] },
                    { id: 'notifications', label: 'Enable notifications', type: 'checkbox' }
                  ]
                }
              ]
            }
          },
          inline: {
            title: 'Inline Layout',
            description: 'All fields in a single flow',
            schema: {
              title: 'Inline Layout Demo',
              description: 'Fields flow together without section breaks',
              sections: [
                {
                  id: 'inline_section',
                  title: 'All Information',
                  description: 'Complete form in one section',
                  layout: 'grid',
                  styling: { className: 'bg-white border border-gray-200 rounded-lg shadow-lg' },
                  fields: [
                    { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your name' },
                    { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { id: 'theme', label: 'Theme', type: 'select', options: [{ value: 'light', text: 'Light' }, { value: 'dark', text: 'Dark' }] },
                    { id: 'notifications', label: 'Enable notifications', type: 'checkbox' }
                  ]
                }
              ]
            }
          },
          stacked: {
            title: 'Stacked Layout',
            description: 'Vertical single-column layout',
            schema: {
              title: 'Stacked Layout Demo',
              description: 'Single column vertical layout',
              sections: [
                {
                  id: 'stacked_section',
                  title: 'Form Fields',
                  description: 'All fields in single column',
                  layout: 'single',
                  styling: { className: 'bg-gradient-to-b from-purple-50 to-pink-50 border border-purple-200 rounded-lg shadow' },
                  fields: [
                    { 
                      id: 'name', 
                      label: 'Full Name', 
                      type: 'text', 
                      placeholder: 'Enter your name',
                      styling: { wrap: true, wrapperClass: 'p-4 bg-white rounded border' }
                    },
                    { 
                      id: 'email', 
                      label: 'Email', 
                      type: 'email', 
                      placeholder: 'your@email.com',
                      styling: { wrap: true, wrapperClass: 'p-4 bg-white rounded border' }
                    },
                    { 
                      id: 'theme', 
                      label: 'Theme', 
                      type: 'select', 
                      options: [{ value: 'light', text: 'Light' }, { value: 'dark', text: 'Dark' }],
                      styling: { wrap: true, wrapperClass: 'p-4 bg-white rounded border' }
                    },
                    { 
                      id: 'notifications', 
                      label: 'Enable notifications', 
                      type: 'checkbox',
                      styling: { wrap: true, wrapperClass: 'p-4 bg-white rounded border' }
                    }
                  ]
                }
              ]
            }
          }
        }
      };
    },
    computed: {
      currentSchema() {
        return this.layouts[this.currentLayout].schema;
      }
    },
    template: `
      <MLayout app-title="Form Layout Comparison" :drawer="false">
        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">Form Layout Variations</h2>
            <p class="text-gray-600 mb-4">Compare different form layout approaches and styling patterns.</p>
            
            <div class="flex space-x-2 mb-6">
              <button
                v-for="(layout, key) in layouts"
                :key="key"
                @click="currentLayout = key"
                :class="[
                  'px-4 py-2 rounded transition-colors',
                  currentLayout === key 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                {{ layout.title }}
              </button>
            </div>
            
            <div class="text-center mb-6">
              <h3 class="text-lg font-semibold">{{ layouts[currentLayout].title }}</h3>
              <p class="text-gray-600">{{ layouts[currentLayout].description }}</p>
            </div>
          </div>
          
          <DynamicFormRenderer
            :key="currentLayout"
            :schema="currentSchema"
            :storage-key="'layout_demo_' + currentLayout"
          />
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of different form layout patterns including card-based sections, inline flows, and stacked single-column layouts. Switch between layouts to see styling differences.'
      }
    }
  }
};

export const AdvancedStylingShowcase = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const advancedSchema = ref({
        title: 'Advanced Styling Showcase',
        description: 'Demonstration of advanced styling capabilities',
        
        sections: [
          {
            id: 'gradient_section',
            title: 'Gradient Styling',
            description: 'Fields with gradient backgrounds and effects',
            layout: 'grid',
            styling: {
              className: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-2xl shadow-2xl text-white'
            },
            fields: [
              {
                id: 'gradient.field1',
                label: 'Gradient Input',
                type: 'text',
                placeholder: 'Styled with gradients',
                styling: {
                  wrap: true,
                  extend: true,
                  wrapperClass: 'p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30',
                  extendedClass: 'bg-white bg-opacity-90 text-gray-900 border-0 rounded-lg shadow-lg'
                }
              },
              {
                id: 'gradient.slider',
                label: 'Gradient Slider',
                type: 'slider',
                min: 0,
                max: 100,
                showValue: true,
                color: 'secondary',
                styling: {
                  wrap: true,
                  wrapperClass: 'p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl border border-white border-opacity-30'
                }
              }
            ]
          },
          
          {
            id: 'shadow_section',
            title: 'Shadow Effects',
            description: 'Various shadow and depth effects',
            layout: 'grid',
            styling: {
              className: 'bg-white rounded-3xl shadow-2xl border border-gray-100'
            },
            fields: [
              {
                id: 'shadow.field1',
                label: 'Subtle Shadow',
                type: 'text',
                placeholder: 'Subtle shadow effect',
                styling: {
                  wrap: true,
                  extend: true,
                  wrapperClass: 'p-3 bg-gray-50 rounded-lg shadow-sm',
                  extendedClass: 'shadow-md focus:shadow-lg transition-shadow duration-300'
                }
              },
              {
                id: 'shadow.field2',
                label: 'Heavy Shadow',
                type: 'text',
                placeholder: 'Heavy shadow effect',
                styling: {
                  wrap: true,
                  extend: true,
                  wrapperClass: 'p-4 bg-blue-50 rounded-xl shadow-lg',
                  extendedClass: 'shadow-2xl focus:shadow-3xl transition-shadow duration-300'
                }
              }
            ]
          },
          
          {
            id: 'border_section',
            title: 'Border Variations',
            description: 'Different border styles and effects',
            layout: 'grid',
            styling: {
              className: 'bg-gray-50 rounded-2xl border-4 border-dashed border-gray-300'
            },
            fields: [
              {
                id: 'border.field1',
                label: 'Colored Border',
                type: 'text',
                placeholder: 'Colorful border styling',
                styling: {
                  wrap: true,
                  extend: true,
                  wrapperClass: 'p-4 bg-white rounded-lg border-l-8 border-blue-500',
                  extendedClass: 'border-2 border-blue-300 focus:border-blue-600'
                }
              },
              {
                id: 'border.field2',
                label: 'Gradient Border',
                type: 'text',
                placeholder: 'Gradient border effect',
                styling: {
                  wrap: true,
                  extend: true,
                  wrapperClass: 'p-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg',
                  extendedClass: 'bg-white rounded-md border-0'
                }
              }
            ]
          }
        ]
      });
      
      return {
        advancedSchema
      };
    },
    template: `
      <MLayout app-title="Advanced Styling Demo" :drawer="false">
        <DynamicFormRenderer
          :schema="advancedSchema"
          storage-key="advanced_styling_demo"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of advanced styling capabilities including gradients, shadows, borders, backdrop blur effects, and complex visual hierarchies using the wrap/extend styling system.'
      }
    }
  }
};