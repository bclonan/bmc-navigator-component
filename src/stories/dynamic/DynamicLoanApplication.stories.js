import { ref } from 'vue';
import MLayout from '../../components/ui/MLayout.vue';
import DynamicFormRenderer from '../../components/dynamic/DynamicFormRenderer.vue';

export default {
  title: 'Dynamic Forms/Complete Loan Application',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete dynamic loan application demonstrating built-in storage engine, property access/validation, conditional logic, real-time calculations, and comprehensive form state management.'
      }
    }
  }
};

// Comprehensive loan application schema
const loanApplicationSchema = {
  title: 'Dynamic Loan Application',
  description: 'Complete loan application with built-in storage engine and real-time validation',
  version: '1.0.0',
  
  defaults: {
    'personal.age': 25,
    'financial.creditScore': 700,
    'loan.amount': 15000,
    'loan.term': 36,
    'employment.grossMonthlyIncome': 4500,
    'financial.monthlyRent': 1200,
    'financial.monthlyDebtPayments': 450
  },
  
  sections: [
    {
      id: 'personal_info',
      title: 'Personal Information',
      description: 'Your basic personal and contact details',
      layout: 'grid',
      styling: {
        className: 'border-l-4 border-blue-400'
      },
      fields: [
        {
          id: 'personal.firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'Enter your legal first name',
          icon: 'fas fa-user',
          required: true,
          validation: [
            'required',
            { type: 'minLength', value: 2, message: 'First name must be at least 2 characters' },
            { type: 'pattern', value: '^[A-Za-z\\s\'-]+$', message: 'Only letters, spaces, hyphens, and apostrophes allowed' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-blue-50 border border-blue-200 rounded-lg'
          },
          helpText: 'Enter your legal first name as it appears on your ID'
        },
        {
          id: 'personal.lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Enter your legal last name',
          icon: 'fas fa-user',
          required: true,
          validation: [
            'required',
            { type: 'minLength', value: 2, message: 'Last name must be at least 2 characters' },
            { type: 'pattern', value: '^[A-Za-z\\s\'-]+$', message: 'Only letters, spaces, hyphens, and apostrophes allowed' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-blue-50 border border-blue-200 rounded-lg'
          }
        },
        {
          id: 'personal.email',
          label: 'Email Address',
          type: 'email',
          placeholder: 'your.email@example.com',
          icon: 'fas fa-envelope',
          required: true,
          validation: [
            'required',
            'email'
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-green-50 border border-green-300 rounded-lg',
            extendedClass: 'border-2 border-green-400 shadow-md'
          },
          helpText: 'We will send loan updates to this email address'
        },
        {
          id: 'personal.phone',
          label: 'Phone Number',
          type: 'tel',
          placeholder: '(555) 123-4567',
          icon: 'fas fa-phone',
          required: true,
          validation: [
            'required',
            'phone'
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-green-50 border border-green-200 rounded-lg'
          }
        },
        {
          id: 'personal.ssn',
          label: 'Social Security Number',
          type: 'password',
          placeholder: 'XXX-XX-XXXX',
          icon: 'fas fa-shield-alt',
          required: true,
          validation: [
            'required',
            'ssn'
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg',
            extendedClass: 'border-2 border-red-300 shadow-lg'
          },
          helpText: 'Your SSN is encrypted and secure - required for credit verification',
          showValidationStatus: true
        },
        {
          id: 'personal.age',
          label: 'Age',
          type: 'slider',
          min: 18,
          max: 100,
          step: 1,
          color: 'primary',
          showValue: true,
          required: true,
          validation: [
            'required',
            { type: 'minValue', value: 18, message: 'You must be at least 18 years old' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-purple-50 border border-purple-200 rounded-lg'
          },
          helpText: 'Minimum age requirement is 18'
        }
      ]
    },
    
    {
      id: 'address_info',
      title: 'Address Information',
      description: 'Your current residential address',
      layout: 'grid',
      styling: {
        className: 'border-l-4 border-yellow-400'
      },
      fields: [
        {
          id: 'address.street',
          label: 'Street Address',
          type: 'text',
          placeholder: '123 Main Street',
          icon: 'fas fa-map-marker-alt',
          required: true,
          validation: ['required'],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-yellow-50 border border-yellow-200 rounded-lg'
          }
        },
        {
          id: 'address.city',
          label: 'City',
          type: 'text',
          placeholder: 'Your city',
          icon: 'fas fa-city',
          required: true,
          validation: ['required'],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-yellow-50 border border-yellow-200 rounded-lg'
          }
        },
        {
          id: 'address.state',
          label: 'State',
          type: 'select',
          icon: 'fas fa-flag',
          required: true,
          searchable: true,
          validation: ['required'],
          options: [
            { value: 'AL', text: 'Alabama' },
            { value: 'AK', text: 'Alaska' },
            { value: 'AZ', text: 'Arizona' },
            { value: 'AR', text: 'Arkansas' },
            { value: 'CA', text: 'California' },
            { value: 'CO', text: 'Colorado' },
            { value: 'CT', text: 'Connecticut' },
            { value: 'DE', text: 'Delaware' },
            { value: 'FL', text: 'Florida' },
            { value: 'GA', text: 'Georgia' },
            { value: 'IL', text: 'Illinois' },
            { value: 'IN', text: 'Indiana' },
            { value: 'NY', text: 'New York' },
            { value: 'TX', text: 'Texas' },
            { value: 'WA', text: 'Washington' }
          ]
        },
        {
          id: 'address.zipCode',
          label: 'ZIP Code',
          type: 'text',
          placeholder: '12345',
          icon: 'fas fa-mail-bulk',
          required: true,
          validation: [
            'required',
            { type: 'pattern', value: '^\\d{5}(-\\d{4})?$', message: 'Enter a valid ZIP code' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-yellow-50 border border-yellow-200 rounded-lg'
          }
        },
        {
          id: 'address.residencyType',
          label: 'Residency Type',
          type: 'select',
          placeholder: 'Select residency type',
          icon: 'fas fa-home',
          required: true,
          validation: ['required'],
          options: [
            { value: 'own', text: 'Own' },
            { value: 'rent', text: 'Rent' },
            { value: 'with_family', text: 'Live with Family' },
            { value: 'other', text: 'Other' }
          ]
        }
      ]
    },
    
    {
      id: 'employment_info',
      title: 'Employment Information',
      description: 'Your current employment and income details',
      layout: 'grid',
      styling: {
        className: 'border-l-4 border-green-400'
      },
      fields: [
        {
          id: 'employment.status',
          label: 'Employment Status',
          type: 'select',
          placeholder: 'Select employment status',
          icon: 'fas fa-briefcase',
          required: true,
          validation: ['required'],
          layout: { colSpan: 2 },
          options: [
            { value: 'full_time', text: 'Full-time Employee' },
            { value: 'part_time', text: 'Part-time Employee' },
            { value: 'self_employed', text: 'Self-employed' },
            { value: 'contractor', text: 'Independent Contractor' },
            { value: 'retired', text: 'Retired' },
            { value: 'unemployed', text: 'Unemployed' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg'
          }
        },
        {
          id: 'employment.employer',
          label: 'Current Employer',
          type: 'text',
          placeholder: 'Company name',
          icon: 'fas fa-building',
          required: true,
          validation: ['required'],
          conditional: {
            dependencies: ['employment.status'],
            condition: 'data.employment.status !== "unemployed" && data.employment.status !== "retired"',
            action: 'show'
          },
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-green-50 border border-green-200 rounded-lg'
          }
        },
        {
          id: 'employment.jobTitle',
          label: 'Job Title',
          type: 'text',
          placeholder: 'Your position',
          icon: 'fas fa-id-card',
          required: true,
          validation: ['required'],
          conditional: {
            dependencies: ['employment.status'],
            condition: 'data.employment.status !== "unemployed" && data.employment.status !== "retired"',
            action: 'show'
          },
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-green-50 border border-green-200 rounded-lg'
          }
        },
        {
          id: 'employment.grossMonthlyIncome',
          label: 'Gross Monthly Income',
          type: 'slider',
          min: 1000,
          max: 25000,
          step: 100,
          color: 'success',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          required: true,
          validation: [
            'required',
            { type: 'minValue', value: 1000, message: 'Monthly income must be at least $1,000' }
          ],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl',
            extendedClass: 'border-2 border-green-400 shadow-lg'
          },
          helpText: 'Before taxes and deductions - used for loan qualification'
        },
        {
          id: 'employment.monthsEmployed',
          label: 'Months with Current Employer',
          type: 'slider',
          min: 0,
          max: 480,
          step: 1,
          color: 'warning',
          showValue: true,
          formatValue: '(value) => value + " months"',
          conditional: {
            dependencies: ['employment.status'],
            condition: 'data.employment.status !== "unemployed" && data.employment.status !== "retired"',
            action: 'show'
          },
          validation: [
            { type: 'minValue', value: 3, message: 'Must be employed for at least 3 months' }
          ],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-orange-50 border border-orange-200 rounded-lg'
          },
          helpText: 'Employment stability factor for loan approval'
        }
      ]
    },
    
    {
      id: 'financial_info',
      title: 'Financial Information',
      description: 'Your financial profile and obligations',
      layout: 'grid',
      styling: {
        className: 'border-l-4 border-purple-400'
      },
      fields: [
        {
          id: 'financial.bankName',
          label: 'Primary Bank',
          type: 'text',
          placeholder: 'Your primary bank',
          icon: 'fas fa-university',
          required: true,
          validation: ['required'],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-purple-50 border border-purple-200 rounded-lg'
          }
        },
        {
          id: 'financial.accountType',
          label: 'Account Type',
          type: 'select',
          placeholder: 'Select account type',
          icon: 'fas fa-credit-card',
          required: true,
          validation: ['required'],
          options: [
            { value: 'checking', text: 'Checking' },
            { value: 'savings', text: 'Savings' },
            { value: 'both', text: 'Both Checking & Savings' }
          ]
        },
        {
          id: 'financial.creditScore',
          label: 'Estimated Credit Score',
          type: 'slider',
          min: 300,
          max: 850,
          step: 5,
          showValue: true,
          showTicks: true,
          layout: { colSpan: 2 },
          validation: [
            { type: 'minValue', value: 300, message: 'Credit score must be between 300-850' },
            { type: 'maxValue', value: 850, message: 'Credit score must be between 300-850' }
          ],
          helpText: 'Your approximate credit score affects loan terms and rates'
        },
        {
          id: 'financial.monthlyRent',
          label: 'Monthly Rent/Mortgage',
          type: 'slider',
          min: 0,
          max: 8000,
          step: 50,
          color: 'warning',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-orange-50 border border-orange-200 rounded-lg'
          },
          helpText: 'Your housing payment amount'
        },
        {
          id: 'financial.monthlyDebtPayments',
          label: 'Monthly Debt Payments',
          type: 'slider',
          min: 0,
          max: 5000,
          step: 25,
          color: 'error',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-red-50 border border-red-200 rounded-lg'
          },
          helpText: 'Total monthly payments for credit cards, loans, etc.'
        }
      ]
    },
    
    {
      id: 'loan_details',
      title: 'Loan Configuration',
      description: 'Configure your loan amount and terms',
      layout: 'grid',
      styling: {
        className: 'border-l-4 border-indigo-400'
      },
      fields: [
        {
          id: 'loan.amount',
          label: 'Loan Amount',
          type: 'slider',
          min: 1000,
          max: 100000,
          step: 500,
          color: 'primary',
          showValue: true,
          formatValue: '(value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)',
          required: true,
          validation: [
            'required',
            { type: 'minValue', value: 1000, message: 'Minimum loan amount is $1,000' }
          ],
          layout: { colSpan: 2 },
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl',
            extendedClass: 'border-2 border-blue-400 shadow-xl'
          },
          helpText: 'How much do you need to borrow?'
        },
        {
          id: 'loan.purpose',
          label: 'Loan Purpose',
          type: 'select',
          placeholder: 'What will you use this loan for?',
          icon: 'fas fa-target',
          required: true,
          searchable: true,
          validation: ['required'],
          options: [
            { value: 'debt_consolidation', text: 'Debt Consolidation' },
            { value: 'home_improvement', text: 'Home Improvement' },
            { value: 'auto_repair', text: 'Auto Repair' },
            { value: 'medical', text: 'Medical Expenses' },
            { value: 'education', text: 'Education' },
            { value: 'vacation', text: 'Vacation' },
            { value: 'wedding', text: 'Wedding' },
            { value: 'business', text: 'Business Expenses' },
            { value: 'other', text: 'Other' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg'
          }
        },
        {
          id: 'loan.term',
          label: 'Loan Term (Months)',
          type: 'slider',
          min: 12,
          max: 84,
          step: 6,
          color: 'secondary',
          showValue: true,
          showTicks: true,
          formatValue: '(value) => value + " months"',
          required: true,
          validation: [
            'required',
            { type: 'minValue', value: 12, message: 'Minimum loan term is 12 months' }
          ],
          helpText: 'Repayment period - longer terms have lower monthly payments'
        },
        {
          id: 'loan.purposeDetails',
          label: 'Purpose Details',
          type: 'textarea',
          placeholder: 'Please provide more details about how you plan to use this loan...',
          rows: 3,
          layout: { colSpan: 2 },
          helpText: 'Additional details help us process your application (optional)'
        }
      ]
    },
    
    {
      id: 'agreements',
      title: 'Legal Agreements',
      description: 'Required agreements and authorizations',
      layout: 'single',
      fields: [
        {
          id: 'agreements.terms',
          label: 'I agree to the Terms and Conditions',
          type: 'checkbox',
          required: true,
          validation: [
            { type: 'custom', validator: '(value) => value === true', message: 'You must accept the Terms and Conditions to proceed' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg'
          }
        },
        {
          id: 'agreements.privacy',
          label: 'I have read and accept the Privacy Policy',
          type: 'checkbox',
          required: true,
          validation: [
            { type: 'custom', validator: '(value) => value === true', message: 'You must accept the Privacy Policy to proceed' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg'
          }
        },
        {
          id: 'agreements.creditCheck',
          label: 'I authorize credit check and information verification',
          type: 'checkbox',
          required: true,
          validation: [
            { type: 'custom', validator: '(value) => value === true', message: 'Credit check authorization is required for loan processing' }
          ],
          styling: {
            wrap: true,
            extend: true,
            wrapperClass: 'p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg',
            extendedClass: 'shadow-md border border-red-300'
          },
          helpText: 'Required for loan underwriting and approval process'
        },
        {
          id: 'agreements.electronicSignature',
          label: 'I consent to use electronic signature for this application',
          type: 'checkbox',
          required: true,
          validation: [
            { type: 'custom', validator: '(value) => value === true', message: 'Electronic signature consent is required' }
          ],
          styling: {
            wrap: true,
            wrapperClass: 'p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg'
          }
        },
        {
          id: 'agreements.marketing',
          label: 'I would like to receive promotional offers and financial tips (optional)',
          type: 'checkbox',
          required: false,
          styling: {
            wrap: true,
            wrapperClass: 'p-3 bg-blue-50 border border-blue-200 rounded-lg'
          },
          helpText: 'You can unsubscribe at any time'
        }
      ]
    }
  ]
};

export const FullDynamicLoanApplication = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      const formSchema = ref(loanApplicationSchema);
      
      const handleFormSubmission = async (formData) => {
        console.log('Submitting loan application:', formData);
        
        // Simulate realistic loan processing
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Simulate approval logic based on form data
        const income = Number(formData.employment?.grossMonthlyIncome) || 0;
        const debtPayments = Number(formData.financial?.monthlyDebtPayments) || 0;
        const creditScore = Number(formData.financial?.creditScore) || 600;
        const loanAmount = Number(formData.loan?.amount) || 0;
        
        const debtToIncomeRatio = income > 0 ? (debtPayments / income) * 100 : 100;
        const loanToIncomeRatio = income > 0 ? (loanAmount / (income * 12)) * 100 : 100;
        
        // Approval logic
        let approved = true;
        let approvalReasons = [];
        
        if (creditScore < 600) {
          approved = false;
          approvalReasons.push('Credit score below minimum requirement');
        }
        
        if (debtToIncomeRatio > 45) {
          approved = false;
          approvalReasons.push('Debt-to-income ratio too high');
        }
        
        if (income < 2000) {
          approved = false;
          approvalReasons.push('Insufficient monthly income');
        }
        
        if (loanToIncomeRatio > 50) {
          approved = false;
          approvalReasons.push('Loan amount too high relative to income');
        }
        
        // Calculate interest rate based on credit score
        let interestRate = 0.18; // Default high rate
        if (creditScore >= 750) interestRate = 0.06;
        else if (creditScore >= 700) interestRate = 0.08;
        else if (creditScore >= 650) interestRate = 0.12;
        else if (creditScore >= 600) interestRate = 0.15;
        
        const term = Number(formData.loan?.term) || 36;
        const monthlyRate = interestRate / 12;
        const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
        
        return {
          applicationId: 'APP-' + Date.now(),
          status: approved ? 'approved' : 'declined',
          approved,
          reasons: approvalReasons,
          loanDetails: approved ? {
            amount: loanAmount,
            interestRate: (interestRate * 100).toFixed(2) + '%',
            term: term,
            monthlyPayment: monthlyPayment.toFixed(2),
            totalInterest: ((monthlyPayment * term) - loanAmount).toFixed(2)
          } : null,
          timestamp: new Date().toISOString(),
          nextSteps: approved 
            ? ['Complete identity verification', 'Upload required documents', 'Review and sign loan agreement']
            : ['Improve credit score', 'Reduce monthly debt obligations', 'Consider a co-signer']
        };
      };
      
      return {
        formSchema,
        handleFormSubmission
      };
    },
    template: `
      <MLayout app-title="Your Town Finance - Dynamic Loan Application" :drawer="false">
        <DynamicFormRenderer
          :schema="formSchema"
          storage-key="dynamic_loan_application"
          storage-type="localStorage"
          :on-submit="handleFormSubmission"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete dynamic loan application demonstrating: built-in storage engine with encryption and auto-save, property access with dot notation, real-time validation and conditional logic, calculated fields and live updates, semantic form styling with wrap/extend patterns, comprehensive state management with versioning, and realistic loan approval simulation.'
      }
    }
  }
};

export const StorageEngineFeatures = {
  render: () => ({
    components: { MLayout, DynamicFormRenderer },
    setup() {
      // Simplified schema to focus on storage features
      const storageSchema = ref({
        title: 'Storage Engine Demonstration',
        description: 'Showcasing built-in storage capabilities',
        
        defaults: {
          'demo.textField': 'Default value',
          'demo.numberField': 100,
          'demo.booleanField': true
        },
        
        sections: [
          {
            id: 'storage_demo',
            title: 'Storage Engine Features',
            description: 'Real-time property access, validation, and persistence',
            layout: 'grid',
            fields: [
              {
                id: 'demo.textField',
                label: 'Text Field (Auto-saved)',
                type: 'text',
                placeholder: 'Type something...',
                helpText: 'Changes are automatically saved with encryption'
              },
              {
                id: 'demo.numberField',
                label: 'Number Field (Validated)',
                type: 'slider',
                min: 0,
                max: 1000,
                step: 10,
                showValue: true,
                validation: [
                  { type: 'minValue', value: 50, message: 'Value must be at least 50' }
                ],
                helpText: 'Real-time validation with storage persistence'
              },
              {
                id: 'demo.selectField',
                label: 'Select Field (Conditional)',
                type: 'select',
                options: [
                  { value: 'option1', text: 'Show Additional Fields' },
                  { value: 'option2', text: 'Hide Additional Fields' }
                ],
                helpText: 'Controls visibility of other fields'
              },
              {
                id: 'demo.conditionalField',
                label: 'Conditional Field',
                type: 'text',
                placeholder: 'This field appears conditionally',
                conditional: {
                  dependencies: ['demo.selectField'],
                  condition: 'data.demo.selectField === "option1"',
                  action: 'show'
                },
                helpText: 'Visible only when "Show Additional Fields" is selected'
              },
              {
                id: 'demo.calculatedField',
                label: 'Calculated Field (Read-only)',
                type: 'text',
                disabled: true,
                calculation: {
                  dependencies: ['demo.numberField'],
                  formula: 'data.demo.numberField * 2.5',
                  type: 'number'
                },
                helpText: 'Automatically calculated based on number field value'
              },
              {
                id: 'demo.booleanField',
                label: 'Boolean Field (Persisted)',
                type: 'checkbox',
                helpText: 'State persisted across browser sessions'
              }
            ]
          }
        ]
      });
      
      return {
        storageSchema
      };
    },
    template: `
      <MLayout app-title="Storage Engine Demo" :drawer="false">
        <DynamicFormRenderer
          :schema="storageSchema"
          storage-key="storage_engine_demo"
          storage-type="localStorage"
        />
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates storage engine capabilities: auto-save with encryption, property watching and validation, conditional field logic, calculated fields, state persistence across sessions, and real-time data inspection.'
      }
    }
  }
};