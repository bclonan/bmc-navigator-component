/**
 * Flat, reusable configuration objects for forms and components
 * These configurations work in any JavaScript environment and follow uniform patterns
 */

// Base field configuration template
export const baseFieldConfig = {
  id: '',
  type: 'text',
  label: '',
  required: false,
  disabled: false,
  placeholder: '',
  helpText: '',
  error: '',
  variant: 'primary',
  size: 'medium'
};

// Slider configuration template
export const sliderConfig = {
  ...baseFieldConfig,
  type: 'slider',
  min: 0,
  max: 100,
  step: 1,
  unit: '',
  showTooltip: true,
  showMarkers: false,
  markers: [],
  formatValue: null
};

// Personal loan application form configuration
export const personalLoanFormConfig = {
  title: 'Personal Loan Application',
  description: 'Complete your loan application in 5 simple steps',
  version: '1.0',
  autoSave: true,
  validation: 'realtime',
  
  sections: [
    {
      id: 'personal_info',
      title: 'Personal Information',
      description: 'Tell us about yourself',
      step: 1,
      layout: 'grid',
      fields: [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          required: true,
          placeholder: 'Enter your first name',
          validation: 'name',
          colSpan: 1
        },
        {
          id: 'lastName',
          type: 'text',
          label: 'Last Name',
          required: true,
          placeholder: 'Enter your last name',
          validation: 'name',
          colSpan: 1
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'your.email@example.com',
          validation: 'email',
          colSpan: 2
        },
        {
          id: 'phone',
          type: 'tel',
          label: 'Phone Number',
          required: true,
          placeholder: '(555) 123-4567',
          validation: 'phone',
          colSpan: 1
        },
        {
          id: 'dateOfBirth',
          type: 'date',
          label: 'Date of Birth',
          required: true,
          validation: 'age_18_plus',
          colSpan: 1
        },
        {
          id: 'ssn',
          type: 'text',
          label: 'Social Security Number',
          required: true,
          placeholder: 'XXX-XX-XXXX',
          validation: 'ssn',
          colSpan: 2
        }
      ]
    },
    {
      id: 'loan_details',
      title: 'Loan Details',
      description: 'Specify your loan requirements',
      step: 2,
      layout: 'single',
      fields: [
        {
          id: 'loanAmount',
          type: 'slider',
          label: 'Loan Amount',
          required: true,
          min: 1000,
          max: 50000,
          step: 500,
          unit: '$',
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 1000, label: '$1K' },
            { value: 10000, label: '$10K' },
            { value: 25000, label: '$25K' },
            { value: 50000, label: '$50K' }
          ],
          formatValue: (value) => `$${value.toLocaleString()}`,
          helpText: 'Select your desired loan amount',
          variant: 'primary',
          defaultValue: 15000
        },
        {
          id: 'loanTerm',
          type: 'slider',
          label: 'Loan Term',
          required: true,
          min: 12,
          max: 84,
          step: 6,
          unit: 'months',
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 12, label: '1yr' },
            { value: 24, label: '2yr' },
            { value: 36, label: '3yr' },
            { value: 48, label: '4yr' },
            { value: 60, label: '5yr' },
            { value: 84, label: '7yr' }
          ],
          formatValue: (value) => {
            const years = Math.floor(value / 12);
            const months = value % 12;
            if (months === 0) return `${years} year${years > 1 ? 's' : ''}`;
            return `${years}y ${months}m`;
          },
          helpText: 'Choose your preferred repayment period',
          variant: 'secondary',
          defaultValue: 36
        },
        {
          id: 'loanPurpose',
          type: 'select',
          label: 'Loan Purpose',
          required: true,
          options: [
            { value: 'debt_consolidation', label: 'Debt Consolidation' },
            { value: 'home_improvement', label: 'Home Improvement' },
            { value: 'major_purchase', label: 'Major Purchase' },
            { value: 'medical_expenses', label: 'Medical Expenses' },
            { value: 'vacation', label: 'Vacation' },
            { value: 'other', label: 'Other' }
          ],
          helpText: 'What will you use this loan for?'
        }
      ]
    },
    {
      id: 'financial_info',
      title: 'Financial Information',
      description: 'Help us understand your financial situation',
      step: 3,
      layout: 'single',
      fields: [
        {
          id: 'monthlyIncome',
          type: 'slider',
          label: 'Monthly Income',
          required: true,
          min: 1000,
          max: 20000,
          step: 250,
          unit: '$',
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 1000, label: '$1K' },
            { value: 5000, label: '$5K' },
            { value: 10000, label: '$10K' },
            { value: 15000, label: '$15K' },
            { value: 20000, label: '$20K' }
          ],
          formatValue: (value) => `$${value.toLocaleString()}`,
          helpText: 'Your gross monthly income before taxes',
          variant: 'success',
          defaultValue: 5000
        },
        {
          id: 'monthlyExpenses',
          type: 'slider',
          label: 'Monthly Expenses',
          required: true,
          min: 500,
          max: 15000,
          step: 100,
          unit: '$',
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 500, label: '$500' },
            { value: 2000, label: '$2K' },
            { value: 5000, label: '$5K' },
            { value: 10000, label: '$10K' },
            { value: 15000, label: '$15K' }
          ],
          formatValue: (value) => `$${value.toLocaleString()}`,
          helpText: 'Your total monthly expenses including rent, utilities, etc.',
          variant: 'danger',
          defaultValue: 3000
        },
        {
          id: 'creditScore',
          type: 'slider',
          label: 'Estimated Credit Score',
          required: true,
          min: 300,
          max: 850,
          step: 10,
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 300, label: 'Poor' },
            { value: 500, label: 'Fair' },
            { value: 650, label: 'Good' },
            { value: 750, label: 'Excellent' }
          ],
          formatValue: (value) => {
            if (value >= 750) return `${value} (Excellent)`;
            if (value >= 650) return `${value} (Good)`;
            if (value >= 500) return `${value} (Fair)`;
            return `${value} (Poor)`;
          },
          helpText: 'Your approximate credit score range',
          variant: 'warning',
          defaultValue: 720
        },
        {
          id: 'debtToIncome',
          type: 'slider',
          label: 'Current Debt-to-Income Ratio',
          required: true,
          min: 0,
          max: 60,
          step: 1,
          unit: '%',
          showTooltip: true,
          showMarkers: true,
          markers: [
            { value: 0, label: '0%' },
            { value: 15, label: '15%' },
            { value: 28, label: '28%' },
            { value: 43, label: '43%' },
            { value: 60, label: '60%' }
          ],
          formatValue: (value) => `${value}%`,
          helpText: 'Percentage of income going to debt payments',
          variant: 'danger',
          defaultValue: 25
        }
      ]
    },
    {
      id: 'employment_info',
      title: 'Employment Information',
      description: 'Tell us about your employment',
      step: 4,
      layout: 'grid',
      fields: [
        {
          id: 'employmentStatus',
          type: 'select',
          label: 'Employment Status',
          required: true,
          options: [
            { value: 'employed_full_time', label: 'Employed Full-Time' },
            { value: 'employed_part_time', label: 'Employed Part-Time' },
            { value: 'self_employed', label: 'Self-Employed' },
            { value: 'retired', label: 'Retired' },
            { value: 'unemployed', label: 'Unemployed' },
            { value: 'student', label: 'Student' }
          ],
          colSpan: 2
        },
        {
          id: 'employer',
          type: 'text',
          label: 'Employer Name',
          required: true,
          placeholder: 'Company name',
          colSpan: 1
        },
        {
          id: 'jobTitle',
          type: 'text',
          label: 'Job Title',
          required: true,
          placeholder: 'Your position',
          colSpan: 1
        },
        {
          id: 'workExperience',
          type: 'select',
          label: 'Years at Current Job',
          required: true,
          options: [
            { value: 'less_than_1', label: 'Less than 1 year' },
            { value: '1_to_2', label: '1-2 years' },
            { value: '2_to_5', label: '2-5 years' },
            { value: '5_to_10', label: '5-10 years' },
            { value: 'more_than_10', label: 'More than 10 years' }
          ],
          colSpan: 2
        }
      ]
    },
    {
      id: 'review_submit',
      title: 'Review & Submit',
      description: 'Review your application before submitting',
      step: 5,
      layout: 'single',
      fields: [
        {
          id: 'termsAccepted',
          type: 'checkbox',
          label: 'I agree to the terms and conditions',
          required: true,
          helpText: 'You must accept the terms to proceed'
        },
        {
          id: 'privacyAccepted',
          type: 'checkbox',
          label: 'I agree to the privacy policy',
          required: true,
          helpText: 'Your information will be kept secure'
        },
        {
          id: 'marketingConsent',
          type: 'checkbox',
          label: 'I would like to receive marketing communications',
          required: false,
          helpText: 'Optional - you can unsubscribe at any time'
        }
      ]
    }
  ]
};

// State transition configuration for visualizer
export const loanApplicationStates = {
  states: [
    {
      id: 'personal_info',
      label: 'Personal Info',
      description: 'Basic information',
      step: 1,
      icon: 'user',
      color: 'blue'
    },
    {
      id: 'loan_details',
      label: 'Loan Details',
      description: 'Amount and term',
      step: 2,
      icon: 'dollar-sign',
      color: 'green'
    },
    {
      id: 'financial_info',
      label: 'Financial Info',
      description: 'Income and expenses',
      step: 3,
      icon: 'chart-line',
      color: 'purple'
    },
    {
      id: 'employment_info',
      label: 'Employment',
      description: 'Work information',
      step: 4,
      icon: 'briefcase',
      color: 'orange'
    },
    {
      id: 'review_submit',
      label: 'Review',
      description: 'Final review',
      step: 5,
      icon: 'check-circle',
      color: 'emerald'
    }
  ],
  
  transitions: [
    { from: 'personal_info', to: 'loan_details', label: 'Next' },
    { from: 'loan_details', to: 'financial_info', label: 'Continue' },
    { from: 'financial_info', to: 'employment_info', label: 'Proceed' },
    { from: 'employment_info', to: 'review_submit', label: 'Review' },
    { from: 'review_submit', to: 'completed', label: 'Submit' }
  ]
};

// Mobile-responsive configuration
export const mobileConfig = {
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px'
  },
  
  touchTargets: {
    minimum: '44px',
    comfortable: '48px',
    large: '56px'
  },
  
  sliderMobile: {
    size: 'large',
    showTooltip: true,
    trackHeight: '8px',
    thumbSize: '24px',
    markerSize: '12px'
  }
};

// Export utility function to merge configs
export function mergeConfig(baseConfig, overrides = {}) {
  return {
    ...baseConfig,
    ...overrides,
    sections: baseConfig.sections?.map(section => ({
      ...section,
      ...overrides.sections?.find(s => s.id === section.id),
      fields: section.fields?.map(field => ({
        ...field,
        ...overrides.sections?.find(s => s.id === section.id)?.fields?.find(f => f.id === field.id)
      }))
    }))
  };
}