import { ref, reactive } from 'vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MCheckbox from '../../components/ui/MCheckbox.vue';
import MSlider from '../../components/ui/MSlider.vue';
import { useFormValidation } from '../../composables/useFormValidation.js';

export default {
  title: 'Loan Application/Form State Management',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive demonstration of form state management utilities including validation, error handling, field interaction patterns, and real-time updates for financial services applications.'
      }
    }
  }
};

export const ValidationPatterns = {
  render: () => ({
    components: { MCard, MButton, MTextField, MSelect, MCheckbox, MSlider },
    setup() {
      const { 
        formData, 
        setValidationRules, 
        setAsyncValidators,
        validateField, 
        validateForm, 
        setFieldValue, 
        touchField,
        getFieldError,
        hasFieldError,
        isValid,
        hasErrors,
        handleSubmit,
        validators,
        resetForm,
        clearFieldError
      } = useFormValidation({
        personal: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          ssn: '',
          age: 18
        },
        financial: {
          income: 0,
          creditScore: 650
        },
        preferences: {
          contactMethod: '',
          newsletter: false
        }
      });

      // Setup validation rules
      setValidationRules({
        'personal.firstName': [
          validators.required('First name is required'),
          validators.minLength(2, 'First name must be at least 2 characters'),
          validators.pattern(/^[A-Za-z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
        ],
        'personal.lastName': [
          validators.required('Last name is required'),
          validators.minLength(2, 'Last name must be at least 2 characters'),
          validators.pattern(/^[A-Za-z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
        ],
        'personal.email': [
          validators.required('Email is required'),
          validators.email('Please enter a valid email address')
        ],
        'personal.phone': [
          validators.required('Phone number is required'),
          validators.phone('Please enter a valid phone number')
        ],
        'personal.ssn': [
          validators.required('SSN is required'),
          validators.ssn('Please enter a valid SSN (XXX-XX-XXXX)')
        ],
        'personal.age': [
          validators.required('Age is required'),
          validators.minValue(18, 'You must be at least 18 years old'),
          validators.maxValue(100, 'Please enter a valid age')
        ],
        'financial.income': [
          validators.required('Income is required'),
          validators.minValue(1000, 'Monthly income must be at least $1,000')
        ],
        'financial.creditScore': [
          validators.minValue(300, 'Credit score must be between 300-850'),
          validators.maxValue(850, 'Credit score must be between 300-850')
        ],
        'preferences.contactMethod': [
          validators.required('Please select a contact method')
        ]
      });

      // Setup async validators
      setAsyncValidators({
        'personal.email': async (email) => {
          if (!email) return true;
          // Simulate email validation API call
          await new Promise(resolve => setTimeout(resolve, 500));
          if (email.includes('blocked@')) {
            return 'This email domain is not allowed';
          }
          return true;
        },
        'personal.ssn': async (ssn) => {
          if (!ssn) return true;
          // Simulate SSN validation
          await new Promise(resolve => setTimeout(resolve, 300));
          if (ssn === '123-45-6789') {
            return 'This SSN is invalid';
          }
          return true;
        }
      });

      const isSubmitting = ref(false);
      const submitResult = ref(null);

      return {
        formData,
        setFieldValue,
        touchField,
        getFieldError,
        hasFieldError,
        isValid,
        hasErrors,
        validateField,
        validateForm,
        resetForm,
        clearFieldError,
        isSubmitting,
        submitResult,
        async handleFormSubmit() {
          const result = await handleSubmit(async (data) => {
            // Simulate API submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            return { id: 'APP-' + Date.now(), status: 'submitted' };
          });
          
          submitResult.value = result;
          return result;
        }
      };
    },
    data() {
      return {
        contactMethods: [
          { value: 'email', text: 'Email' },
          { value: 'phone', text: 'Phone' },
          { value: 'mail', text: 'Mail' }
        ]
      };
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
    template: `
      <div class="max-w-4xl mx-auto space-y-6">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">Form State Management Demo</h1>
          <div class="text-sm">
            <span class="font-medium">Form Status:</span>
            <span :class="isValid ? 'text-green-600' : 'text-red-600'">
              {{ isValid ? 'Valid' : 'Has Errors' }}
            </span>
          </div>
        </div>
        
        <!-- Real-time Validation Examples -->
        <MCard title="Personal Information" subtitle="Real-time validation with async checks">
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MTextField 
                :model-value="formData.personal.firstName"
                @update:model-value="setFieldValue('personal.firstName', $event)"
                @blur="touchField('personal.firstName')"
                label="First Name" 
                placeholder="Enter your first name"
                prepend-icon="fas fa-user"
                :required="true"
                :error-message="getFieldError('personal.firstName')"
                :wrap="true"
                wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
              />
              
              <MTextField 
                :model-value="formData.personal.lastName"
                @update:model-value="setFieldValue('personal.lastName', $event)"
                @blur="touchField('personal.lastName')"
                label="Last Name" 
                placeholder="Enter your last name"
                prepend-icon="fas fa-user"
                :required="true"
                :error-message="getFieldError('personal.lastName')"
                :wrap="true"
                wrapper-class="p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg"
              />
            </div>
            
            <MTextField 
              :model-value="formData.personal.email"
              @update:model-value="setFieldValue('personal.email', $event)"
              @blur="touchField('personal.email')"
              type="email"
              label="Email Address (Async Validation)" 
              placeholder="your.email@example.com"
              prepend-icon="fas fa-envelope"
              :required="true"
              :error-message="getFieldError('personal.email')"
              helper-text="Try 'blocked@test.com' to see async validation error"
              :wrap="true"
              :extend="true"
              wrapper-class="p-4 bg-yellow-50 border border-yellow-300 rounded-lg"
              extended-class="border-2 border-yellow-400"
            />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MTextField 
                :model-value="formData.personal.phone"
                @update:model-value="setFieldValue('personal.phone', $event)"
                @blur="touchField('personal.phone')"
                type="tel"
                label="Phone Number" 
                placeholder="(555) 123-4567"
                prepend-icon="fas fa-phone"
                :required="true"
                :error-message="getFieldError('personal.phone')"
                helper-text="Enter a valid US phone number"
              />
              
              <MTextField 
                :model-value="formData.personal.ssn"
                @update:model-value="setFieldValue('personal.ssn', $event)"
                @blur="touchField('personal.ssn')"
                type="password"
                label="SSN (Async Validation)" 
                placeholder="XXX-XX-XXXX"
                prepend-icon="fas fa-shield-alt"
                :required="true"
                :error-message="getFieldError('personal.ssn')"
                helper-text="Try '123-45-6789' to see async validation error"
                :wrap="true"
                wrapper-class="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Age: {{ formData.personal.age }}</label>
              <MSlider 
                :model-value="formData.personal.age"
                @update:model-value="setFieldValue('personal.age', $event)"
                @blur="touchField('personal.age')"
                :min="16"
                :max="100"
                :step="1"
                color="primary"
                :show-value="true"
                helper-text="Must be 18 or older"
                :error-message="getFieldError('personal.age')"
                :wrap="true"
                wrapper-class="p-3 bg-green-50 border border-green-200 rounded-lg"
              />
            </div>
          </div>
        </MCard>
        
        <!-- Financial Information with Conditional Validation -->
        <MCard title="Financial Information" subtitle="Conditional validation and real-time calculations">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Monthly Income: {{ formatCurrency(formData.financial.income) }}</label>
              <MSlider 
                :model-value="formData.financial.income"
                @update:model-value="setFieldValue('financial.income', $event)"
                @blur="touchField('financial.income')"
                :min="0"
                :max="15000"
                :step="100"
                color="success"
                :show-value="true"
                :format-value="formatCurrency"
                helper-text="Minimum $1,000 monthly income required"
                :error-message="getFieldError('financial.income')"
                :wrap="true"
                :extend="true"
                wrapper-class="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
                extended-class="border-2 border-green-400 shadow-lg"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-2">Credit Score: {{ formData.financial.creditScore }}</label>
              <MSlider 
                :model-value="formData.financial.creditScore"
                @update:model-value="setFieldValue('financial.creditScore', $event)"
                @blur="touchField('financial.creditScore')"
                :min="300"
                :max="850"
                :step="5"
                :color="formData.financial.creditScore >= 750 ? 'success' : formData.financial.creditScore >= 650 ? 'warning' : 'error'"
                :show-value="true"
                :show-ticks="true"
                helper-text="Credit score affects loan terms"
                :error-message="getFieldError('financial.creditScore')"
              />
            </div>
            
            <!-- Real-time calculation display -->
            <div class="p-4 bg-blue-50 rounded-lg">
              <h4 class="font-semibold mb-2">Real-time Calculations</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="font-medium">Annual Income:</span> 
                  {{ formatCurrency(formData.financial.income * 12) }}
                </div>
                <div>
                  <span class="font-medium">Credit Rating:</span> 
                  <span :class="{
                    'text-green-600': formData.financial.creditScore >= 750,
                    'text-yellow-600': formData.financial.creditScore >= 650 && formData.financial.creditScore < 750,
                    'text-red-600': formData.financial.creditScore < 650
                  }">
                    {{ formData.financial.creditScore >= 750 ? 'Excellent' : formData.financial.creditScore >= 650 ? 'Good' : 'Fair' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </MCard>
        
        <!-- User Preferences with Complex Logic -->
        <MCard title="User Preferences" subtitle="Complex validation logic and conditional fields">
          <div class="space-y-4">
            <MSelect 
              :model-value="formData.preferences.contactMethod"
              @update:model-value="setFieldValue('preferences.contactMethod', $event)"
              @blur="touchField('preferences.contactMethod')"
              label="Preferred Contact Method" 
              :options="contactMethods"
              placeholder="Select contact method"
              prepend-icon="fas fa-phone"
              :required="true"
              :error-message="getFieldError('preferences.contactMethod')"
              :wrap="true"
              wrapper-class="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg"
            />
            
            <MCheckbox 
              :model-value="formData.preferences.newsletter"
              @update:model-value="setFieldValue('preferences.newsletter', $event)"
              label="Subscribe to newsletter and promotional offers"
              color="secondary"
              helper-text="Optional - you can unsubscribe at any time"
            />
          </div>
        </MCard>
        
        <!-- Form Actions and State Display -->
        <div class="flex flex-col lg:flex-row gap-6">
          <MCard title="Form Actions" subtitle="Test form operations" class="flex-1">
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <MButton 
                  @click="validateForm" 
                  variant="outlined" 
                  text="Validate All Fields" 
                  prepend-icon="fas fa-check-circle"
                  :full-width="true"
                />
                <MButton 
                  @click="resetForm" 
                  variant="outlined" 
                  color="warning"
                  text="Reset Form" 
                  prepend-icon="fas fa-undo"
                  :full-width="true"
                />
              </div>
              
              <MButton 
                @click="handleFormSubmit" 
                :disabled="!isValid || isSubmitting"
                :loading="isSubmitting"
                text="Submit Application" 
                prepend-icon="fas fa-paper-plane"
                :full-width="true"
              />
              
              <div v-if="submitResult" class="p-3 rounded-lg" :class="{
                'bg-green-50 text-green-800': submitResult.success,
                'bg-red-50 text-red-800': !submitResult.success
              }">
                <div class="font-semibold">
                  {{ submitResult.success ? 'Success!' : 'Error' }}
                </div>
                <div class="text-sm">
                  {{ submitResult.success ? 'Application submitted successfully' : submitResult.error || 'Please correct errors' }}
                </div>
                <div v-if="submitResult.success && submitResult.data" class="text-xs mt-1">
                  ID: {{ submitResult.data.id }}
                </div>
              </div>
            </div>
          </MCard>
          
          <MCard title="Form State" subtitle="Live form validation status" class="flex-1">
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span>Form Valid:</span>
                <span :class="isValid ? 'text-green-600' : 'text-red-600'">
                  {{ isValid ? 'Yes' : 'No' }}
                </span>
              </div>
              
              <div class="flex justify-between">
                <span>Has Errors:</span>
                <span :class="hasErrors ? 'text-red-600' : 'text-green-600'">
                  {{ hasErrors ? 'Yes' : 'No' }}
                </span>
              </div>
              
              <div class="border-t pt-3">
                <div class="font-medium mb-2">Field Errors:</div>
                <div v-if="!hasErrors" class="text-green-600 text-xs">No errors</div>
                <div v-else class="space-y-1">
                  <div 
                    v-for="(error, field) in formData" 
                    :key="field"
                    class="text-red-600 text-xs"
                  >
                    <!-- This would show actual errors in real implementation -->
                  </div>
                </div>
              </div>
              
              <div class="border-t pt-3">
                <div class="font-medium mb-2">Form Data Preview:</div>
                <div class="bg-gray-100 p-2 rounded text-xs max-h-40 overflow-auto">
                  <pre>{{ JSON.stringify(formData, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </MCard>
        </div>
        
        <!-- Advanced Form Patterns -->
        <MCard title="Advanced Patterns" subtitle="Field interaction and dynamic validation">
          <div class="space-y-4">
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 class="font-semibold mb-2">Key Features Demonstrated:</h4>
              <ul class="text-sm space-y-1">
                <li>• Real-time validation with instant feedback</li>
                <li>• Async validation for server-side checks</li>
                <li>• Conditional validation based on other field values</li>
                <li>• Custom validation rules and error messages</li>
                <li>• Form state management with reactive updates</li>
                <li>• Field-level error handling and clearing</li>
                <li>• Semantic styling based on validation state</li>
                <li>• Complex form submission with loading states</li>
              </ul>
            </div>
            
            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 class="font-semibold mb-2">Usage in Financial Services:</h4>
              <ul class="text-sm space-y-1">
                <li>• SSN validation against government databases</li>
                <li>• Email verification for account security</li>
                <li>• Income validation for loan eligibility</li>
                <li>• Real-time credit score impact calculations</li>
                <li>• Progressive disclosure based on user input</li>
                <li>• Compliance validation for regulatory requirements</li>
              </ul>
            </div>
          </div>
        </MCard>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive form state management demonstration showing validation patterns, error handling, async validation, conditional logic, and real-time updates commonly used in financial services applications.'
      }
    }
  }
};