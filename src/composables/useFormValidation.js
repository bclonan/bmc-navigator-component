import { ref, computed, reactive } from 'vue';

/**
 * Form validation composable for comprehensive form state management
 * Provides validation rules, error handling, and form state utilities
 */
export function useFormValidation(initialData = {}) {
  // Form data and state
  const formData = reactive({ ...initialData });
  const errors = ref({});
  const touched = ref({});
  const isSubmitting = ref(false);
  const isValidating = ref(false);

  // Validation rules registry
  const validationRules = ref({});
  const asyncValidators = ref({});

  /**
   * Register validation rules for fields
   * @param {Object} rules - Field validation rules
   */
  const setValidationRules = (rules) => {
    Object.assign(validationRules.value, rules);
  };

  /**
   * Register async validators (e.g., for API calls)
   * @param {Object} validators - Async validator functions
   */
  const setAsyncValidators = (validators) => {
    Object.assign(asyncValidators.value, validators);
  };

  /**
   * Built-in validation rules
   */
  const validators = {
    required: (value, message = 'This field is required') => {
      if (Array.isArray(value)) return value.length > 0 || message;
      return (value !== null && value !== undefined && value !== '') || message;
    },

    email: (value, message = 'Please enter a valid email address') => {
      if (!value) return true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || message;
    },

    phone: (value, message = 'Please enter a valid phone number') => {
      if (!value) return true;
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(value.replace(/\D/g, '')) || message;
    },

    ssn: (value, message = 'Please enter a valid SSN') => {
      if (!value) return true;
      const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
      return ssnRegex.test(value) || message;
    },

    minLength: (min) => (value, message = `Minimum ${min} characters required`) => {
      if (!value) return true;
      return value.length >= min || message;
    },

    maxLength: (max) => (value, message = `Maximum ${max} characters allowed`) => {
      if (!value) return true;
      return value.length <= max || message;
    },

    minValue: (min) => (value, message = `Value must be at least ${min}`) => {
      if (value === null || value === undefined || value === '') return true;
      return Number(value) >= min || message;
    },

    maxValue: (max) => (value, message = `Value must be at most ${max}`) => {
      if (value === null || value === undefined || value === '') return true;
      return Number(value) <= max || message;
    },

    pattern: (regex, message = 'Invalid format') => (value) => {
      if (!value) return true;
      return regex.test(value) || message;
    },

    custom: (validatorFn) => validatorFn
  };

  /**
   * Validate a single field
   * @param {string} fieldName - Field to validate
   * @returns {Promise<boolean>} - Validation result
   */
  const validateField = async (fieldName) => {
    const rules = validationRules.value[fieldName];
    if (!rules) return true;

    const value = getFieldValue(fieldName);
    const fieldErrors = [];

    // Run synchronous validations
    for (const rule of rules) {
      const result = await rule(value);
      if (result !== true) {
        fieldErrors.push(result);
        break; // Stop at first error
      }
    }

    // Run async validations if sync validations pass
    if (fieldErrors.length === 0 && asyncValidators.value[fieldName]) {
      try {
        const asyncResult = await asyncValidators.value[fieldName](value);
        if (asyncResult !== true) {
          fieldErrors.push(asyncResult);
        }
      } catch (error) {
        fieldErrors.push('Validation error occurred');
      }
    }

    // Update errors
    if (fieldErrors.length > 0) {
      errors.value[fieldName] = fieldErrors[0];
      return false;
    } else {
      delete errors.value[fieldName];
      return true;
    }
  };

  /**
   * Validate entire form
   * @returns {Promise<boolean>} - Overall validation result
   */
  const validateForm = async () => {
    isValidating.value = true;
    const validationPromises = Object.keys(validationRules.value).map(validateField);
    const results = await Promise.all(validationPromises);
    isValidating.value = false;
    
    return results.every(result => result === true);
  };

  /**
   * Get nested field value using dot notation
   * @param {string} fieldPath - Field path (e.g., 'user.address.street')
   * @returns {any} - Field value
   */
  const getFieldValue = (fieldPath) => {
    return fieldPath.split('.').reduce((obj, key) => obj?.[key], formData);
  };

  /**
   * Set nested field value using dot notation
   * @param {string} fieldPath - Field path
   * @param {any} value - New value
   */
  const setFieldValue = (fieldPath, value) => {
    const keys = fieldPath.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => {
      if (!obj[key]) obj[key] = {};
      return obj[key];
    }, formData);
    target[lastKey] = value;

    // Mark field as touched
    touched.value[fieldPath] = true;

    // Validate field on change if it has been touched
    if (touched.value[fieldPath]) {
      validateField(fieldPath);
    }
  };

  /**
   * Mark field as touched
   * @param {string} fieldName - Field name
   */
  const touchField = (fieldName) => {
    touched.value[fieldName] = true;
    validateField(fieldName);
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    Object.assign(formData, initialData);
    errors.value = {};
    touched.value = {};
    isSubmitting.value = false;
  };

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    errors.value = {};
  };

  /**
   * Clear specific field error
   * @param {string} fieldName - Field name
   */
  const clearFieldError = (fieldName) => {
    delete errors.value[fieldName];
  };

  /**
   * Check if field has error
   * @param {string} fieldName - Field name
   * @returns {boolean} - Has error
   */
  const hasFieldError = (fieldName) => {
    return !!errors.value[fieldName];
  };

  /**
   * Get field error message
   * @param {string} fieldName - Field name
   * @returns {string} - Error message
   */
  const getFieldError = (fieldName) => {
    return errors.value[fieldName] || '';
  };

  /**
   * Check if field is touched
   * @param {string} fieldName - Field name
   * @returns {boolean} - Is touched
   */
  const isFieldTouched = (fieldName) => {
    return !!touched.value[fieldName];
  };

  // Computed properties
  const isValid = computed(() => Object.keys(errors.value).length === 0);
  const hasErrors = computed(() => Object.keys(errors.value).length > 0);
  const touchedFields = computed(() => Object.keys(touched.value));
  const errorFields = computed(() => Object.keys(errors.value));

  /**
   * Form submission handler
   * @param {Function} submitFn - Submit function
   * @returns {Promise} - Submit result
   */
  const handleSubmit = async (submitFn) => {
    isSubmitting.value = true;
    
    try {
      // Mark all fields as touched
      Object.keys(validationRules.value).forEach(field => {
        touched.value[field] = true;
      });

      // Validate form
      const isFormValid = await validateForm();
      
      if (!isFormValid) {
        isSubmitting.value = false;
        return { success: false, errors: errors.value };
      }

      // Submit form
      const result = await submitFn(formData);
      isSubmitting.value = false;
      
      return { success: true, data: result };
    } catch (error) {
      isSubmitting.value = false;
      return { success: false, error: error.message };
    }
  };

  return {
    // Data
    formData,
    errors: computed(() => errors.value),
    touched: computed(() => touched.value),
    
    // State
    isSubmitting: computed(() => isSubmitting.value),
    isValidating: computed(() => isValidating.value),
    isValid,
    hasErrors,
    touchedFields,
    errorFields,
    
    // Methods
    setValidationRules,
    setAsyncValidators,
    validateField,
    validateForm,
    getFieldValue,
    setFieldValue,
    touchField,
    resetForm,
    clearErrors,
    clearFieldError,
    hasFieldError,
    getFieldError,
    isFieldTouched,
    handleSubmit,
    
    // Validators
    validators
  };
}