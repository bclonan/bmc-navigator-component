import { ref } from 'vue';
import MLayout from '../../components/ui/MLayout.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';
import { useAdvancedValidation } from '../../composables/useAdvancedValidation.js';

export default {
  title: 'Validation/Advanced Patterns',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of advanced validation patterns for financial services including credit card validation, SSN verification, business validation, and complex conditional logic.'
      }
    }
  }
};

// Financial validation patterns schema
const financialValidationSchema = {
  title: 'Financial Services Validation',
  description: 'Advanced validation patterns for financial applications',
  
  sections: [
    {
      id: 'payment_info',
      title: 'Payment Information',
      description: 'Credit card and banking validation with real algorithms',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'payment.cardNumber',
          label: 'Credit Card Number',
          type: 'text',
          placeholder: '4111 1111 1111 1111',
          icon: 'fas fa-credit-card',
          required: true,
          validation: [
            'required',
            { type: 'custom', validator: 'financial.creditCard', message: 'Invalid credit card number (Luhn algorithm check)' }
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-green-500 rounded-r-lg shadow-md',
            extendedClass: 'border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200'
          },
          helpText: 'Enter a valid credit card number (Luhn algorithm validation)'
        },
        {
          id: 'payment.routingNumber',
          label: 'Bank Routing Number',
          type: 'text',
          placeholder: '021000021',
          icon: 'fas fa-university',
          required: true,
          validation: [
            'required',
            { type: 'custom', validator: 'financial.routingNumber', message: 'Invalid ABA routing number' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md'
          },
          helpText: 'Must be a valid 9-digit ABA routing number'
        },
        {
          id: 'payment.accountNumber',
          label: 'Account Number',
          type: 'text',
          placeholder: '123456789012',
          icon: 'fas fa-hashtag',
          required: true,
          validation: [
            'required',
            { type: 'custom', validator: 'financial.accountNumber', message: 'Invalid account number format' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md'
          },
          helpText: 'Bank account number (4-17 digits)'
        },
        {
          id: 'payment.iban',
          label: 'IBAN (International)',
          type: 'text',
          placeholder: 'GB82 WEST 1234 5698 7654 32',
          icon: 'fas fa-globe',
          validation: [
            { type: 'custom', validator: 'financial.iban', message: 'Invalid IBAN format' }
          ],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border border-purple-200 rounded-lg shadow-sm'
          },
          helpText: 'International Bank Account Number with mod-97 validation'
        }
      ]
    },
    
    {
      id: 'identity_verification',
      title: 'Identity Verification',
      description: 'Enhanced identity validation with advanced algorithms',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'identity.ssn',
          label: 'Social Security Number',
          type: 'password',
          placeholder: 'XXX-XX-XXXX',
          icon: 'fas fa-shield-alt',
          required: true,
          validation: [
            'required',
            { type: 'custom', validator: 'identity.ssnAdvanced', message: 'Invalid SSN format or blocked number' }
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-red-500 rounded-r-lg shadow-lg',
            extendedClass: 'border-2 border-red-300 focus:border-red-500 focus:ring focus:ring-red-200'
          },
          helpText: 'Enhanced SSN validation with area number checks'
        },
        {
          id: 'identity.driversLicense',
          label: 'Driver\'s License',
          type: 'text',
          placeholder: 'D1234567 (CA format)',
          icon: 'fas fa-id-card',
          validation: [
            { type: 'custom', validator: 'identity.driversLicense("CA")', message: 'Invalid California driver\'s license format' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border border-orange-200 rounded-lg shadow-sm'
          },
          helpText: 'State-specific driver\'s license validation'
        },
        {
          id: 'identity.passport',
          label: 'Passport Number',
          type: 'text',
          placeholder: '123456789 (US format)',
          icon: 'fas fa-passport',
          validation: [
            { type: 'custom', validator: 'identity.passport("US")', message: 'Invalid US passport number format' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border border-orange-200 rounded-lg shadow-sm'
          },
          helpText: 'Country-specific passport number validation'
        }
      ]
    },
    
    {
      id: 'business_validation',
      title: 'Business Information',
      description: 'Business entity validation and verification',
      layout: 'grid',
      styling: {
        className: 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl shadow-lg'
      },
      fields: [
        {
          id: 'business.taxId',
          label: 'Tax ID (EIN)',
          type: 'text',
          placeholder: '12-3456789',
          icon: 'fas fa-file-invoice-dollar',
          required: true,
          validation: [
            'required',
            { type: 'custom', validator: 'financial.taxId', message: 'Invalid Tax ID format' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-md'
          },
          helpText: 'Employer Identification Number validation'
        },
        {
          id: 'business.duns',
          label: 'DUNS Number',
          type: 'text',
          placeholder: '123456789',
          icon: 'fas fa-building',
          validation: [
            { type: 'custom', validator: 'business.duns', message: 'Invalid DUNS number format' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border border-indigo-200 rounded-lg shadow-sm'
          },
          helpText: 'Data Universal Numbering System identifier'
        },
        {
          id: 'business.naics',
          label: 'NAICS Code',
          type: 'text',
          placeholder: '541511',
          icon: 'fas fa-industry',
          validation: [
            { type: 'custom', validator: 'business.naics', message: 'Invalid NAICS code' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-white border border-indigo-200 rounded-lg shadow-sm'
          },
          helpText: 'North American Industry Classification System code'
        }
      ]
    }
  ]
};

export const FinancialValidationDemo = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(financialValidationSchema);
      const { createValidator } = useAdvancedValidation();
      
      return {
        formSchema,
        createValidator,
        async handleSubmission(formData) {
          await new Promise(resolve => setTimeout(resolve, 2000));
          return {
            success: true,
            message: 'Financial validation completed successfully!',
            data: { validationId: 'FIN-' + Date.now() }
          };
        }
      };
    },
    template: `
      <MLayout app-title="Financial Validation Patterns" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="financial_validation_demo"
          :on-submit="handleSubmission"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive financial validation patterns including credit card Luhn algorithm, ABA routing number validation, IBAN verification, enhanced SSN checks, and complex business validation rules.'
      }
    }
  }
};

export const ValidationComparisonDemo = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer, MCard, MButton },
    data() {
      return {
        currentPattern: 'financial',
        patterns: {
          financial: {
            title: 'Financial Validation',
            description: 'Credit cards, banking, and financial calculations',
            schema: financialValidationSchema
          }
        }
      };
    },
    computed: {
      currentSchema() {
        return this.patterns[this.currentPattern].schema;
      }
    },
    template: `
      <MLayout app-title="Validation Pattern Comparison" :drawer="false">
        <div class="space-y-6">
          <MCard title="Validation Pattern Selector" subtitle="Compare different validation approaches">
            <div class="flex flex-wrap gap-3 mb-4">
              <button
                v-for="(pattern, key) in patterns"
                :key="key"
                @click="currentPattern = key"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-200',
                  currentPattern === key 
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                ]"
              >
                {{ pattern.title }}
              </button>
            </div>
            
            <div class="text-center p-4 bg-gray-50 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">{{ patterns[currentPattern].title }}</h3>
              <p class="text-gray-600">{{ patterns[currentPattern].description }}</p>
            </div>
          </MCard>
          
          <DynamicFormRenderer
            :key="currentPattern"
            :schema="currentSchema"
            :storage-key="'validation_comparison_' + currentPattern"
          />
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive comparison of different validation pattern categories. Switch between financial, conditional, and async validation patterns to see implementation differences.'
      }
    }
  }
};