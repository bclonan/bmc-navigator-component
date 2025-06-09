import { ref, computed, reactive, watch } from 'vue';
import { useFormValidation } from './useFormValidation.js';

/**
 * Complete loan application flow management
 * Handles multi-step forms, progress tracking, and data persistence
 */
export function useLoanFlow() {
  // Flow configuration
  const steps = ref([
    {
      id: 'personal',
      title: 'Personal Information',
      description: 'Basic contact and identity details',
      icon: 'fas fa-user',
      required: true
    },
    {
      id: 'employment',
      title: 'Employment Details',
      description: 'Current employment and income information',
      icon: 'fas fa-briefcase',
      required: true
    },
    {
      id: 'financial',
      title: 'Financial Profile',
      description: 'Assets, debts, and financial situation',
      icon: 'fas fa-chart-line',
      required: true
    },
    {
      id: 'loan',
      title: 'Loan Configuration',
      description: 'Loan amount, purpose, and terms',
      icon: 'fas fa-money-bill-wave',
      required: true
    },
    {
      id: 'documents',
      title: 'Document Upload',
      description: 'Required verification documents',
      icon: 'fas fa-file-upload',
      required: false
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Final review before submission',
      icon: 'fas fa-check-circle',
      required: true
    }
  ]);

  const currentStep = ref(0);
  const completedSteps = ref(new Set());
  const stepErrors = ref(new Set());

  // Application data structure
  const initialData = {
    personal: {
      firstName: '',
      lastName: '',
      middleName: '',
      suffix: '',
      ssn: '',
      dateOfBirth: '',
      email: '',
      phone: '',
      alternatePhone: '',
      maritalStatus: '',
      dependents: 0
    },
    address: {
      street: '',
      apartment: '',
      city: '',
      state: '',
      zipCode: '',
      residencyType: '',
      monthsAtAddress: 0,
      previousAddress: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    employment: {
      status: '',
      employer: '',
      jobTitle: '',
      workPhone: '',
      supervisor: '',
      monthsEmployed: 0,
      grossMonthlyIncome: 0,
      otherIncome: 0,
      otherIncomeSource: '',
      previousEmployer: {
        name: '',
        monthsEmployed: 0
      }
    },
    financial: {
      bankName: '',
      accountType: '',
      monthlyRent: 0,
      monthlyDebtPayments: 0,
      creditScore: 0,
      assets: {
        checking: 0,
        savings: 0,
        investments: 0,
        realEstate: 0,
        vehicle: 0,
        other: 0
      },
      debts: {
        creditCards: 0,
        autoLoans: 0,
        studentLoans: 0,
        mortgage: 0,
        other: 0
      }
    },
    loan: {
      amount: 15000,
      purpose: '',
      purposeDetails: '',
      term: 48,
      preferredPaymentDate: '',
      collateral: false,
      collateralDescription: '',
      coBorrower: false
    },
    coBorrower: {
      firstName: '',
      lastName: '',
      ssn: '',
      phone: '',
      relationship: '',
      income: 0
    },
    documents: {
      idVerification: [],
      incomeVerification: [],
      addressVerification: [],
      bankStatements: [],
      additional: []
    },
    agreements: {
      terms: false,
      privacy: false,
      creditCheck: false,
      electronicSignature: false,
      marketing: false
    },
    metadata: {
      applicationId: '',
      startedAt: new Date(),
      lastSaved: null,
      referralSource: '',
      campaignId: '',
      ipAddress: '',
      userAgent: ''
    }
  };

  // Form validation setup
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
    resetForm
  } = useFormValidation(initialData);

  // Validation rules for each step
  const setupValidationRules = () => {
    setValidationRules({
      // Personal Information
      'personal.firstName': [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(50),
        validators.pattern(/^[A-Za-z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
      ],
      'personal.lastName': [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(50),
        validators.pattern(/^[A-Za-z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
      ],
      'personal.ssn': [
        validators.required(),
        validators.ssn()
      ],
      'personal.dateOfBirth': [
        validators.required(),
        validators.custom((value) => {
          if (!value) return 'Date of birth is required';
          const today = new Date();
          const birthDate = new Date(value);
          const age = (today - birthDate) / (365.25 * 24 * 60 * 60 * 1000);
          if (age < 18) return 'You must be at least 18 years old';
          if (age > 100) return 'Please enter a valid date of birth';
          return true;
        })
      ],
      'personal.email': [
        validators.required(),
        validators.email()
      ],
      'personal.phone': [
        validators.required(),
        validators.phone()
      ],
      'personal.maritalStatus': [
        validators.required()
      ],

      // Address Information
      'address.street': [
        validators.required(),
        validators.minLength(5),
        validators.maxLength(100)
      ],
      'address.city': [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(50),
        validators.pattern(/^[A-Za-z\s'-]+$/, 'Only letters, spaces, hyphens, and apostrophes allowed')
      ],
      'address.state': [
        validators.required()
      ],
      'address.zipCode': [
        validators.required(),
        validators.pattern(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
      ],
      'address.residencyType': [
        validators.required()
      ],
      'address.monthsAtAddress': [
        validators.required(),
        validators.minValue(0)
      ],

      // Employment Information
      'employment.status': [
        validators.required()
      ],
      'employment.employer': [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(100)
      ],
      'employment.jobTitle': [
        validators.required(),
        validators.minLength(2),
        validators.maxLength(100)
      ],
      'employment.monthsEmployed': [
        validators.required(),
        validators.minValue(0)
      ],
      'employment.grossMonthlyIncome': [
        validators.required(),
        validators.minValue(1000, 'Monthly income must be at least $1,000')
      ],

      // Financial Information
      'financial.bankName': [
        validators.required(),
        validators.minLength(2)
      ],
      'financial.accountType': [
        validators.required()
      ],
      'financial.monthlyRent': [
        validators.required(),
        validators.minValue(0)
      ],
      'financial.monthlyDebtPayments': [
        validators.required(),
        validators.minValue(0)
      ],

      // Loan Information
      'loan.amount': [
        validators.required(),
        validators.minValue(1000, 'Minimum loan amount is $1,000'),
        validators.maxValue(50000, 'Maximum loan amount is $50,000')
      ],
      'loan.purpose': [
        validators.required()
      ],
      'loan.term': [
        validators.required(),
        validators.minValue(12),
        validators.maxValue(84)
      ],

      // Agreements
      'agreements.terms': [
        validators.custom((value) => value === true || 'You must accept the terms and conditions')
      ],
      'agreements.privacy': [
        validators.custom((value) => value === true || 'You must accept the privacy policy')
      ],
      'agreements.creditCheck': [
        validators.custom((value) => value === true || 'You must authorize the credit check')
      ],
      'agreements.electronicSignature': [
        validators.custom((value) => value === true || 'You must consent to electronic signature')
      ]
    });

    // Async validators for real-time validation
    setAsyncValidators({
      'personal.email': async (email) => {
        if (!email) return true;
        // Simulate email uniqueness check
        await new Promise(resolve => setTimeout(resolve, 300));
        if (email.includes('test@blocked.com')) {
          return 'This email address is not allowed';
        }
        return true;
      },
      'personal.ssn': async (ssn) => {
        if (!ssn) return true;
        // Simulate SSN validation
        await new Promise(resolve => setTimeout(resolve, 500));
        if (ssn === '123-45-6789') {
          return 'This SSN is invalid';
        }
        return true;
      }
    });
  };

  // Initialize validation rules
  setupValidationRules();

  // Step navigation
  const canNavigateToStep = (stepIndex) => {
    if (stepIndex === 0) return true;
    return completedSteps.value.has(stepIndex - 1) || completedSteps.value.has(stepIndex);
  };

  const goToStep = (stepIndex) => {
    if (canNavigateToStep(stepIndex)) {
      currentStep.value = stepIndex;
    }
  };

  const nextStep = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      completedSteps.value.add(currentStep.value);
      stepErrors.value.delete(currentStep.value);
      
      if (currentStep.value < steps.value.length - 1) {
        currentStep.value++;
      }
      
      await saveProgress();
    } else {
      stepErrors.value.add(currentStep.value);
    }
  };

  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--;
    }
  };

  // Step validation
  const validateCurrentStep = async () => {
    const step = steps.value[currentStep.value];
    const fieldsToValidate = getStepFields(step.id);
    
    const validationPromises = fieldsToValidate.map(field => validateField(field));
    const results = await Promise.all(validationPromises);
    
    return results.every(result => result === true);
  };

  const getStepFields = (stepId) => {
    const fieldMap = {
      personal: [
        'personal.firstName', 'personal.lastName', 'personal.ssn', 
        'personal.dateOfBirth', 'personal.email', 'personal.phone', 
        'personal.maritalStatus', 'address.street', 'address.city', 
        'address.state', 'address.zipCode', 'address.residencyType', 
        'address.monthsAtAddress'
      ],
      employment: [
        'employment.status', 'employment.employer', 'employment.jobTitle',
        'employment.monthsEmployed', 'employment.grossMonthlyIncome'
      ],
      financial: [
        'financial.bankName', 'financial.accountType', 
        'financial.monthlyRent', 'financial.monthlyDebtPayments'
      ],
      loan: [
        'loan.amount', 'loan.purpose', 'loan.term'
      ],
      documents: [], // Documents are handled separately
      review: [
        'agreements.terms', 'agreements.privacy', 
        'agreements.creditCheck', 'agreements.electronicSignature'
      ]
    };

    return fieldMap[stepId] || [];
  };

  // Progress calculation
  const progressPercentage = computed(() => {
    return Math.round((completedSteps.value.size / steps.value.length) * 100);
  });

  const currentStepInfo = computed(() => {
    return steps.value[currentStep.value];
  });

  const isFirstStep = computed(() => currentStep.value === 0);
  const isLastStep = computed(() => currentStep.value === steps.value.length - 1);

  // Auto-save functionality
  const saveProgress = async () => {
    try {
      formData.metadata.lastSaved = new Date();
      
      // Simulate API call to save progress
      const savedData = {
        applicationId: formData.metadata.applicationId || generateApplicationId(),
        currentStep: currentStep.value,
        completedSteps: Array.from(completedSteps.value),
        formData: JSON.parse(JSON.stringify(formData)),
        timestamp: new Date().toISOString()
      };

      // Save to localStorage as backup
      localStorage.setItem('loanApplicationProgress', JSON.stringify(savedData));
      
      return savedData;
    } catch (error) {
      console.error('Error saving progress:', error);
      throw error;
    }
  };

  // Load saved progress
  const loadProgress = () => {
    try {
      const saved = localStorage.getItem('loanApplicationProgress');
      if (saved) {
        const savedData = JSON.parse(saved);
        
        // Restore form data
        Object.assign(formData, savedData.formData);
        
        // Restore progress
        currentStep.value = savedData.currentStep || 0;
        completedSteps.value = new Set(savedData.completedSteps || []);
        
        return true;
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
    return false;
  };

  // Application submission
  const submitApplication = async () => {
    const isFormValid = await validateForm();
    
    if (!isFormValid) {
      // Find first step with errors and navigate to it
      const firstErrorStep = steps.value.findIndex(step => {
        const stepFields = getStepFields(step.id);
        return stepFields.some(field => hasFieldError(field));
      });
      
      if (firstErrorStep !== -1) {
        currentStep.value = firstErrorStep;
      }
      
      return { success: false, errors: 'Please correct all errors before submitting' };
    }

    return handleSubmit(async (data) => {
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear saved progress on successful submission
      localStorage.removeItem('loanApplicationProgress');
      
      return {
        applicationId: data.metadata.applicationId,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        estimatedDecisionTime: '24-48 hours'
      };
    });
  };

  // Utility functions
  const generateApplicationId = () => {
    return 'APP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const calculateDebtToIncome = computed(() => {
    const monthlyIncome = formData.employment.grossMonthlyIncome + formData.employment.otherIncome;
    const monthlyDebt = formData.financial.monthlyDebtPayments;
    
    if (monthlyIncome === 0) return 0;
    return Math.round((monthlyDebt / monthlyIncome) * 100);
  });

  const estimatedMonthlyPayment = computed(() => {
    const principal = formData.loan.amount;
    const termMonths = formData.loan.term;
    const estimatedRate = getEstimatedInterestRate();
    
    if (principal && termMonths && estimatedRate) {
      const monthlyRate = estimatedRate / 12;
      const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                      (Math.pow(1 + monthlyRate, termMonths) - 1);
      return Math.round(payment * 100) / 100;
    }
    return 0;
  });

  const getEstimatedInterestRate = () => {
    const creditScore = formData.financial.creditScore || 650;
    const debtToIncome = calculateDebtToIncome.value;
    
    let baseRate = 0.15; // 15%
    
    // Adjust based on credit score
    if (creditScore >= 750) baseRate -= 0.03;
    else if (creditScore >= 700) baseRate -= 0.02;
    else if (creditScore >= 650) baseRate -= 0.01;
    else if (creditScore < 600) baseRate += 0.03;
    
    // Adjust based on debt-to-income ratio
    if (debtToIncome > 40) baseRate += 0.02;
    else if (debtToIncome < 20) baseRate -= 0.01;
    
    return Math.max(0.08, Math.min(0.25, baseRate)); // Cap between 8% and 25%
  };

  // Auto-save on data changes
  watch(() => formData, () => {
    // Debounced auto-save
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(() => {
      saveProgress();
    }, 1000);
  }, { deep: true });

  // Initialize application ID
  if (!formData.metadata.applicationId) {
    formData.metadata.applicationId = generateApplicationId();
  }

  return {
    // State
    steps: computed(() => steps.value),
    currentStep: computed(() => currentStep.value),
    currentStepInfo,
    completedSteps: computed(() => completedSteps.value),
    stepErrors: computed(() => stepErrors.value),
    progressPercentage,
    isFirstStep,
    isLastStep,
    
    // Form data and validation
    formData,
    setFieldValue,
    touchField,
    getFieldError,
    hasFieldError,
    isValid,
    hasErrors,
    
    // Navigation
    canNavigateToStep,
    goToStep,
    nextStep,
    previousStep,
    
    // Validation
    validateCurrentStep,
    validateForm,
    
    // Persistence
    saveProgress,
    loadProgress,
    
    // Submission
    submitApplication,
    
    // Calculations
    calculateDebtToIncome,
    estimatedMonthlyPayment,
    getEstimatedInterestRate,
    
    // Utilities
    resetForm,
    generateApplicationId
  };
}