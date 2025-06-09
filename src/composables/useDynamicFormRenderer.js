import { ref, reactive, computed, watch } from 'vue';
import { useStorageEngine } from './useStorageEngine.js';

/**
 * Dynamic form renderer with built-in storage engine and validation
 * Supports rendering complex forms from JSON schema with real-time validation
 */
export function useDynamicFormRenderer(options = {}) {
  const {
    storageKey = 'dynamic_form',
    autoSave = true,
    enableValidation = true,
    enableConditionalLogic = true,
    enableCalculations = true
  } = options;

  // Initialize storage engine
  const storage = useStorageEngine({
    storageKey,
    autoSave,
    enableVersioning: true,
    enableEncryption: true,
    compressionEnabled: true
  });

  // Form schema and state
  const formSchema = ref({});
  const fieldComponents = reactive(new Map());
  const conditionalRules = reactive(new Map());
  const calculationRules = reactive(new Map());
  const validationErrors = reactive(new Map());
  const touchedFields = reactive(new Set());
  const dependencyGraph = reactive(new Map());

  // Built-in field types with their component mappings
  const defaultFieldTypes = {
    text: 'MTextField',
    email: 'MTextField',
    password: 'MTextField',
    tel: 'MTextField',
    number: 'MTextField',
    date: 'MTextField',
    textarea: 'MTextField',
    select: 'MSelect',
    checkbox: 'MCheckbox',
    radio: 'MRadioGroup',
    slider: 'MSlider',
    switch: 'MSwitch',
    file: 'MFileInput',
    currency: 'MCurrencyInput',
    ssn: 'MSSNInput'
  };

  // Validation rules library
  const validationRules = {
    required: (value, message = 'This field is required') => {
      if (value === null || value === undefined || value === '') {
        return message;
      }
      return true;
    },
    
    minLength: (min, message) => (value) => {
      if (value && value.length < min) {
        return message || `Minimum length is ${min} characters`;
      }
      return true;
    },
    
    maxLength: (max, message) => (value) => {
      if (value && value.length > max) {
        return message || `Maximum length is ${max} characters`;
      }
      return true;
    },
    
    pattern: (regex, message) => (value) => {
      if (value && !regex.test(value)) {
        return message || 'Invalid format';
      }
      return true;
    },
    
    email: (value, message = 'Please enter a valid email address') => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return message;
      }
      return true;
    },
    
    phone: (value, message = 'Please enter a valid phone number') => {
      if (value && !/^\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/.test(value)) {
        return message;
      }
      return true;
    },
    
    ssn: (value, message = 'Please enter a valid SSN (XXX-XX-XXXX)') => {
      if (value && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
        return message;
      }
      return true;
    },
    
    minValue: (min, message) => (value) => {
      if (value !== null && value !== undefined && Number(value) < min) {
        return message || `Minimum value is ${min}`;
      }
      return true;
    },
    
    maxValue: (max, message) => (value) => {
      if (value !== null && value !== undefined && Number(value) > max) {
        return message || `Maximum value is ${max}`;
      }
      return true;
    },
    
    custom: (validatorFn, message) => (value, allData) => {
      const result = validatorFn(value, allData);
      return result === true ? true : (message || result);
    }
  };

  /**
   * Load form schema and initialize the form
   */
  const loadSchema = (schema) => {
    formSchema.value = schema;
    initializeForm();
  };

  /**
   * Initialize form based on schema
   */
  const initializeForm = () => {
    if (!formSchema.value.fields) return;

    // Clear existing state
    fieldComponents.clear();
    conditionalRules.clear();
    calculationRules.clear();
    validationErrors.clear();
    dependencyGraph.clear();

    // Process each field in the schema
    formSchema.value.fields.forEach(field => {
      processField(field);
    });

    // Set default values
    if (formSchema.value.defaults) {
      Object.entries(formSchema.value.defaults).forEach(([path, value]) => {
        storage.setProperty(path, value);
      });
    }

    // Initialize validation watchers
    if (enableValidation) {
      setupValidationWatchers();
    }

    // Initialize conditional logic
    if (enableConditionalLogic) {
      setupConditionalLogic();
    }

    // Initialize calculations
    if (enableCalculations) {
      setupCalculations();
    }
  };

  /**
   * Process individual field from schema
   */
  const processField = (field) => {
    const {
      id,
      type = 'text',
      component,
      validation = [],
      conditional,
      calculation,
      dependencies = []
    } = field;

    // Register field component
    fieldComponents.set(id, {
      ...field,
      component: component || defaultFieldTypes[type] || 'MTextField'
    });

    // Setup validation rules
    if (validation.length > 0) {
      const validators = validation.map(rule => {
        if (typeof rule === 'string') {
          return validationRules[rule];
        } else if (typeof rule === 'object') {
          const { type: ruleType, ...params } = rule;
          return validationRules[ruleType](...Object.values(params), rule.message);
        }
        return rule;
      });

      storage.addValidator(id, (value, allData) => {
        for (const validator of validators) {
          const result = validator(value, allData);
          if (result !== true) {
            return result;
          }
        }
        return true;
      });
    }

    // Setup conditional rules
    if (conditional) {
      conditionalRules.set(id, conditional);
    }

    // Setup calculation rules
    if (calculation) {
      calculationRules.set(id, calculation);
    }

    // Build dependency graph
    if (dependencies.length > 0) {
      dependencyGraph.set(id, dependencies);
      dependencies.forEach(dep => {
        if (!dependencyGraph.has(dep)) {
          dependencyGraph.set(dep, []);
        }
        dependencyGraph.get(dep).push(id);
      });
    }
  };

  /**
   * Setup validation watchers
   */
  const setupValidationWatchers = () => {
    fieldComponents.forEach((field, fieldId) => {
      storage.watchProperty(fieldId, (value) => {
        validateField(fieldId);
      });
    });
  };

  /**
   * Setup conditional logic watchers
   */
  const setupConditionalLogic = () => {
    conditionalRules.forEach((rule, fieldId) => {
      const { dependencies = [], condition } = rule;
      
      dependencies.forEach(dep => {
        storage.watchProperty(dep, () => {
          evaluateConditional(fieldId, rule);
        });
      });
      
      // Initial evaluation
      evaluateConditional(fieldId, rule);
    });
  };

  /**
   * Setup calculation watchers
   */
  const setupCalculations = () => {
    calculationRules.forEach((rule, fieldId) => {
      const { dependencies = [], formula } = rule;
      
      dependencies.forEach(dep => {
        storage.watchProperty(dep, () => {
          executeCalculation(fieldId, rule);
        });
      });
      
      // Initial calculation
      executeCalculation(fieldId, rule);
    });
  };

  /**
   * Validate a specific field
   */
  const validateField = (fieldId) => {
    const field = fieldComponents.get(fieldId);
    if (!field) return true;

    const value = storage.getProperty(fieldId);
    const allData = storage.storage.data;

    // Clear existing errors
    validationErrors.delete(fieldId);

    // Run validation if field is touched or has value
    if (touchedFields.has(fieldId) || (value !== null && value !== undefined && value !== '')) {
      const result = storage.validateAll();
      if (result !== true && result[fieldId]) {
        validationErrors.set(fieldId, result[fieldId]);
        return false;
      }
    }

    return true;
  };

  /**
   * Evaluate conditional logic for a field
   */
  const evaluateConditional = (fieldId, rule) => {
    const { condition, action = 'show' } = rule;
    const allData = storage.storage.data;

    try {
      // Create a safe evaluation context
      const context = {
        data: allData,
        get: (path) => storage.getProperty(path),
        has: (path) => storage.hasProperty(path),
        Math,
        Number,
        String,
        Array,
        Object
      };

      // Evaluate condition function
      const result = typeof condition === 'function' 
        ? condition(context) 
        : evaluateExpression(condition, context);

      // Apply action based on result
      const field = fieldComponents.get(fieldId);
      if (field) {
        switch (action) {
          case 'show':
            field.visible = result;
            break;
          case 'enable':
            field.disabled = !result;
            break;
          case 'require':
            field.required = result;
            break;
        }
      }
    } catch (error) {
      console.warn(`Conditional evaluation error for field ${fieldId}:`, error);
    }
  };

  /**
   * Execute calculation for a field
   */
  const executeCalculation = (fieldId, rule) => {
    const { formula, type = 'number' } = rule;
    const allData = storage.storage.data;

    try {
      const context = {
        data: allData,
        get: (path) => storage.getProperty(path, 0),
        has: (path) => storage.hasProperty(path),
        Math,
        Number,
        String,
        Array,
        Object
      };

      const result = typeof formula === 'function'
        ? formula(context)
        : evaluateExpression(formula, context);

      // Format result based on type
      let formattedResult;
      switch (type) {
        case 'currency':
          formattedResult = Number(result).toFixed(2);
          break;
        case 'percentage':
          formattedResult = (Number(result) * 100).toFixed(1);
          break;
        case 'integer':
          formattedResult = Math.round(Number(result));
          break;
        default:
          formattedResult = result;
      }

      storage.setProperty(fieldId, formattedResult);
    } catch (error) {
      console.warn(`Calculation error for field ${fieldId}:`, error);
    }
  };

  /**
   * Safe expression evaluation
   */
  const evaluateExpression = (expression, context) => {
    // Simple expression evaluator - in production, use a proper expression parser
    const func = new Function(...Object.keys(context), `return ${expression}`);
    return func(...Object.values(context));
  };

  /**
   * Set field value with validation and dependency updates
   */
  const setFieldValue = (fieldId, value) => {
    storage.setProperty(fieldId, value);
    touchedFields.add(fieldId);
    
    // Trigger dependent field updates
    if (dependencyGraph.has(fieldId)) {
      const dependents = dependencyGraph.get(fieldId);
      dependents.forEach(depFieldId => {
        // Re-evaluate conditionals
        if (conditionalRules.has(depFieldId)) {
          evaluateConditional(depFieldId, conditionalRules.get(depFieldId));
        }
        
        // Re-run calculations
        if (calculationRules.has(depFieldId)) {
          executeCalculation(depFieldId, calculationRules.get(depFieldId));
        }
        
        // Re-validate dependent fields
        validateField(depFieldId);
      });
    }
    
    // Validate current field
    validateField(fieldId);
  };

  /**
   * Get field value
   */
  const getFieldValue = (fieldId, defaultValue) => {
    return storage.getProperty(fieldId, defaultValue);
  };

  /**
   * Get field error message
   */
  const getFieldError = (fieldId) => {
    return validationErrors.get(fieldId) || null;
  };

  /**
   * Check if field has error
   */
  const hasFieldError = (fieldId) => {
    return validationErrors.has(fieldId);
  };

  /**
   * Touch a field (mark as interacted with)
   */
  const touchField = (fieldId) => {
    touchedFields.add(fieldId);
    validateField(fieldId);
  };

  /**
   * Get field configuration
   */
  const getFieldConfig = (fieldId) => {
    return fieldComponents.get(fieldId) || null;
  };

  /**
   * Check if field should be visible
   */
  const isFieldVisible = (fieldId) => {
    const field = fieldComponents.get(fieldId);
    return field ? field.visible !== false : true;
  };

  /**
   * Check if field is disabled
   */
  const isFieldDisabled = (fieldId) => {
    const field = fieldComponents.get(fieldId);
    return field ? field.disabled === true : false;
  };

  /**
   * Validate entire form
   */
  const validateForm = () => {
    let isValid = true;
    
    fieldComponents.forEach((field, fieldId) => {
      touchedFields.add(fieldId);
      if (!validateField(fieldId)) {
        isValid = false;
      }
    });
    
    return isValid;
  };

  /**
   * Submit form with validation
   */
  const submitForm = async (submitHandler) => {
    const isValid = validateForm();
    
    if (!isValid) {
      return {
        success: false,
        errors: Object.fromEntries(validationErrors),
        message: 'Please correct the errors before submitting'
      };
    }
    
    try {
      const result = await submitHandler(storage.storage.data);
      return {
        success: true,
        data: result,
        message: 'Form submitted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: 'Submission failed'
      };
    }
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    storage.clear();
    validationErrors.clear();
    touchedFields.clear();
    
    // Reset to default values
    if (formSchema.value.defaults) {
      Object.entries(formSchema.value.defaults).forEach(([path, value]) => {
        storage.setProperty(path, value);
      });
    }
  };

  /**
   * Export form data
   */
  const exportForm = (format = 'json') => {
    return storage.exportData(format);
  };

  /**
   * Import form data
   */
  const importForm = (data, format = 'json') => {
    return storage.importData(data, format);
  };

  // Computed properties
  const isFormValid = computed(() => validationErrors.size === 0);
  const formData = computed(() => storage.storage.data);
  const hasUnsavedChanges = computed(() => storage.hasUnsavedChanges);
  const formErrors = computed(() => Object.fromEntries(validationErrors));

  return {
    // Core functionality
    loadSchema,
    resetForm,
    submitForm,
    validateForm,
    
    // Field operations
    setFieldValue,
    getFieldValue,
    touchField,
    getFieldConfig,
    getFieldError,
    hasFieldError,
    isFieldVisible,
    isFieldDisabled,
    
    // State
    formSchema: readonly(formSchema),
    fieldComponents: readonly(fieldComponents),
    isFormValid,
    formData,
    formErrors,
    hasUnsavedChanges,
    
    // Storage operations
    storage,
    exportForm,
    importForm,
    
    // Advanced features
    addCustomValidator: (fieldId, validator) => storage.addValidator(fieldId, validator),
    addCustomCalculation: (fieldId, rule) => {
      calculationRules.set(fieldId, rule);
      setupCalculations();
    },
    addConditionalRule: (fieldId, rule) => {
      conditionalRules.set(fieldId, rule);
      setupConditionalLogic();
    }
  };
}

/**
 * Create a readonly proxy
 */
function readonly(obj) {
  return new Proxy(obj, {
    set() {
      console.warn('Direct mutation not allowed');
      return false;
    }
  });
}