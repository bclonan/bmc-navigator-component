import { ref, reactive, computed } from 'vue';

/**
 * Advanced validation patterns for financial services and complex forms
 */
export function useAdvancedValidation() {
  
  // Validation result cache for performance
  const validationCache = new Map();
  const asyncValidationPromises = new Map();

  /**
   * Financial validation patterns
   */
  const financialValidators = {
    // Credit card number validation with Luhn algorithm
    creditCard: (value, message = 'Invalid credit card number') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length < 13 || cleanValue.length > 19) {
        return message;
      }
      
      // Luhn algorithm
      let sum = 0;
      let isEven = false;
      
      for (let i = cleanValue.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanValue[i]);
        
        if (isEven) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        
        sum += digit;
        isEven = !isEven;
      }
      
      return sum % 10 === 0 ? true : message;
    },

    // Bank routing number validation
    routingNumber: (value, message = 'Invalid routing number') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 9) {
        return message;
      }
      
      // ABA routing number checksum
      const digits = cleanValue.split('').map(Number);
      const checksum = (
        3 * (digits[0] + digits[3] + digits[6]) +
        7 * (digits[1] + digits[4] + digits[7]) +
        1 * (digits[2] + digits[5] + digits[8])
      ) % 10;
      
      return checksum === 0 ? true : message;
    },

    // Bank account number validation (basic format check)
    accountNumber: (value, message = 'Invalid account number format') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length < 4 || cleanValue.length > 17) {
        return message;
      }
      
      return true;
    },

    // IBAN validation
    iban: (value, message = 'Invalid IBAN') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\s/g, '').toUpperCase();
      if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(cleanValue)) {
        return message;
      }
      
      // Move first 4 characters to end
      const rearranged = cleanValue.slice(4) + cleanValue.slice(0, 4);
      
      // Replace letters with numbers (A=10, B=11, etc.)
      const numericString = rearranged.replace(/[A-Z]/g, (char) => 
        (char.charCodeAt(0) - 55).toString()
      );
      
      // Mod 97 check
      let remainder = '';
      for (let i = 0; i < numericString.length; i += 7) {
        remainder = (remainder + numericString.slice(i, i + 7)) % 97;
      }
      
      return remainder === 1 ? true : message;
    },

    // Tax ID validation (EIN format)
    taxId: (value, message = 'Invalid Tax ID format') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 9) {
        return message;
      }
      
      // Basic EIN format validation
      const firstTwo = cleanValue.slice(0, 2);
      const validPrefixes = [
        '01', '02', '03', '04', '05', '06', '10', '11', '12', '13', '14', '15', '16',
        '20', '21', '22', '23', '24', '25', '26', '27', '30', '31', '32', '33', '34',
        '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47',
        '48', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61',
        '62', '63', '64', '65', '66', '67', '68', '71', '72', '73', '74', '75', '76',
        '77', '80', '81', '82', '83', '84', '85', '86', '87', '88', '90', '91', '92',
        '93', '94', '95', '98', '99'
      ];
      
      return validPrefixes.includes(firstTwo) ? true : message;
    },

    // Income range validation
    incomeRange: (minIncome, maxIncome, message) => (value) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Income must be a valid number';
      }
      
      if (numValue < minIncome || numValue > maxIncome) {
        return message || `Income must be between $${minIncome.toLocaleString()} and $${maxIncome.toLocaleString()}`;
      }
      
      return true;
    },

    // Debt-to-income ratio validation
    debtToIncomeRatio: (maxRatio, message) => (value, allData) => {
      const monthlyIncome = Number(allData.employment?.grossMonthlyIncome) || 0;
      const monthlyDebt = Number(allData.financial?.monthlyDebtPayments) || 0;
      
      if (monthlyIncome === 0) {
        return 'Monthly income is required for debt-to-income calculation';
      }
      
      const ratio = (monthlyDebt / monthlyIncome) * 100;
      if (ratio > maxRatio) {
        return message || `Debt-to-income ratio (${ratio.toFixed(1)}%) exceeds maximum allowed (${maxRatio}%)`;
      }
      
      return true;
    }
  };

  /**
   * Identity validation patterns
   */
  const identityValidators = {
    // Enhanced SSN validation with area number checks
    ssnAdvanced: (value, message = 'Invalid Social Security Number') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 9) {
        return message;
      }
      
      const area = cleanValue.slice(0, 3);
      const group = cleanValue.slice(3, 5);
      const serial = cleanValue.slice(5, 9);
      
      // Invalid patterns
      if (area === '000' || area === '666' || area.startsWith('9')) {
        return message;
      }
      
      if (group === '00' || serial === '0000') {
        return message;
      }
      
      // Known invalid SSNs
      const invalidSSNs = [
        '123456789', '111111111', '222222222', '333333333',
        '444444444', '555555555', '777777777', '888888888'
      ];
      
      if (invalidSSNs.includes(cleanValue)) {
        return message;
      }
      
      return true;
    },

    // Driver's license validation (format varies by state)
    driversLicense: (state, message = 'Invalid driver\'s license format') => (value) => {
      if (!value) return true;
      
      const patterns = {
        'CA': /^[A-Z]\d{7}$/,
        'NY': /^\d{3}\s?\d{3}\s?\d{3}$/,
        'TX': /^\d{8}$/,
        'FL': /^[A-Z]\d{12}$/,
        'IL': /^[A-Z]\d{11}$/,
        // Add more state patterns as needed
      };
      
      const pattern = patterns[state];
      if (!pattern) {
        return true; // Skip validation for unsupported states
      }
      
      const cleanValue = value.replace(/\s/g, '').toUpperCase();
      return pattern.test(cleanValue) ? true : message;
    },

    // Passport number validation
    passport: (country = 'US', message = 'Invalid passport number') => (value) => {
      if (!value) return true;
      
      const patterns = {
        'US': /^\d{9}$/,
        'CA': /^[A-Z]{2}\d{6}$/,
        'UK': /^\d{9}$/,
        'DE': /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/
      };
      
      const pattern = patterns[country];
      if (!pattern) {
        return true; // Skip validation for unsupported countries
      }
      
      const cleanValue = value.replace(/\s/g, '').toUpperCase();
      return pattern.test(cleanValue) ? true : message;
    }
  };

  /**
   * Business validation patterns
   */
  const businessValidators = {
    // DUNS number validation
    duns: (value, message = 'Invalid DUNS number') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 9) {
        return message;
      }
      
      return true; // DUNS doesn't have a simple checksum algorithm
    },

    // NAICS code validation
    naics: (value, message = 'Invalid NAICS code') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length !== 6) {
        return message;
      }
      
      // Basic range check (NAICS codes are 11-92)
      const sector = parseInt(cleanValue.slice(0, 2));
      return (sector >= 11 && sector <= 92) ? true : message;
    },

    // Business license validation (basic format)
    businessLicense: (value, message = 'Invalid business license format') => {
      if (!value) return true;
      
      // General format: alphanumeric, 6-20 characters
      if (!/^[A-Z0-9]{6,20}$/i.test(value)) {
        return message;
      }
      
      return true;
    }
  };

  /**
   * Address validation patterns
   */
  const addressValidators = {
    // ZIP+4 validation
    zipPlusFour: (value, message = 'Invalid ZIP+4 format') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length === 5) {
        return /^\d{5}$/.test(cleanValue) ? true : message;
      } else if (cleanValue.length === 9) {
        return /^\d{5}\d{4}$/.test(cleanValue) ? true : message;
      }
      
      return message;
    },

    // Canadian postal code validation
    postalCodeCA: (value, message = 'Invalid Canadian postal code') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\s/g, '').toUpperCase();
      return /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanValue) ? true : message;
    },

    // UK postcode validation
    postcodeUK: (value, message = 'Invalid UK postcode') => {
      if (!value) return true;
      
      const cleanValue = value.replace(/\s/g, '').toUpperCase();
      return /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/.test(cleanValue) ? true : message;
    }
  };

  /**
   * Date and time validators
   */
  const dateValidators = {
    // Age validation
    age: (minAge, maxAge, message) => (value) => {
      if (!value) return true;
      
      const birthDate = new Date(value);
      const today = new Date();
      
      if (isNaN(birthDate.getTime())) {
        return 'Invalid date format';
      }
      
      if (birthDate > today) {
        return 'Birth date cannot be in the future';
      }
      
      const age = Math.floor((today - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
      
      if (age < minAge || age > maxAge) {
        return message || `Age must be between ${minAge} and ${maxAge} years`;
      }
      
      return true;
    },

    // Business hours validation
    businessHours: (startHour, endHour, message) => (value) => {
      if (!value) return true;
      
      const time = new Date(`1970-01-01T${value}:00`);
      if (isNaN(time.getTime())) {
        return 'Invalid time format';
      }
      
      const hour = time.getHours();
      if (hour < startHour || hour >= endHour) {
        return message || `Time must be between ${startHour}:00 and ${endHour}:00`;
      }
      
      return true;
    },

    // Date range validation
    dateRange: (minDate, maxDate, message) => (value) => {
      if (!value) return true;
      
      const date = new Date(value);
      const min = new Date(minDate);
      const max = new Date(maxDate);
      
      if (isNaN(date.getTime())) {
        return 'Invalid date format';
      }
      
      if (date < min || date > max) {
        return message || `Date must be between ${min.toLocaleDateString()} and ${max.toLocaleDateString()}`;
      }
      
      return true;
    }
  };

  /**
   * Async validation patterns
   */
  const asyncValidators = {
    // Email domain validation
    emailDomain: (allowedDomains, message) => async (value) => {
      if (!value) return true;
      
      const cacheKey = `emailDomain_${value}`;
      if (validationCache.has(cacheKey)) {
        return validationCache.get(cacheKey);
      }
      
      const domain = value.split('@')[1];
      if (!domain) {
        return 'Invalid email format';
      }
      
      if (allowedDomains && !allowedDomains.includes(domain)) {
        const result = message || `Email domain '${domain}' is not allowed`;
        validationCache.set(cacheKey, result);
        return result;
      }
      
      try {
        // Simulate DNS lookup
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // In real implementation, check MX records
        const blockedDomains = ['tempmail.com', '10minutemail.com', 'guerrillamail.com'];
        if (blockedDomains.some(blocked => domain.includes(blocked))) {
          const result = 'Temporary email addresses are not allowed';
          validationCache.set(cacheKey, result);
          return result;
        }
        
        validationCache.set(cacheKey, true);
        return true;
      } catch (error) {
        return 'Unable to verify email domain';
      }
    },

    // SSN verification (simulated)
    ssnVerification: (message = 'SSN verification failed') => async (value) => {
      if (!value) return true;
      
      const cacheKey = `ssnVerification_${value}`;
      if (validationCache.has(cacheKey)) {
        return validationCache.get(cacheKey);
      }
      
      try {
        // Simulate SSN verification API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const cleanValue = value.replace(/\D/g, '');
        
        // Simulate blocked SSNs
        const blockedSSNs = ['123456789', '987654321'];
        if (blockedSSNs.includes(cleanValue)) {
          const result = 'This SSN is flagged in our system';
          validationCache.set(cacheKey, result);
          return result;
        }
        
        validationCache.set(cacheKey, true);
        return true;
      } catch (error) {
        return 'Unable to verify SSN at this time';
      }
    },

    // Address verification
    addressVerification: (message = 'Address verification failed') => async (value, allData) => {
      if (!value) return true;
      
      const fullAddress = `${value} ${allData.address?.city} ${allData.address?.state} ${allData.address?.zipCode}`;
      const cacheKey = `addressVerification_${fullAddress}`;
      
      if (validationCache.has(cacheKey)) {
        return validationCache.get(cacheKey);
      }
      
      try {
        // Simulate address verification API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate unverifiable addresses
        if (value.toLowerCase().includes('fake') || value.toLowerCase().includes('test')) {
          const result = 'Address could not be verified';
          validationCache.set(cacheKey, result);
          return result;
        }
        
        validationCache.set(cacheKey, true);
        return true;
      } catch (error) {
        return 'Unable to verify address at this time';
      }
    },

    // Credit check simulation
    creditCheck: (minScore, message) => async (value, allData) => {
      const ssn = allData.personal?.ssn;
      if (!ssn) {
        return 'SSN required for credit check';
      }
      
      const cacheKey = `creditCheck_${ssn}`;
      if (validationCache.has(cacheKey)) {
        return validationCache.get(cacheKey);
      }
      
      try {
        // Simulate credit bureau API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate credit score based on SSN
        const cleanSSN = ssn.replace(/\D/g, '');
        const lastDigit = parseInt(cleanSSN.slice(-1));
        const simulatedScore = 500 + (lastDigit * 35); // 500-815 range
        
        if (simulatedScore < minScore) {
          const result = message || `Credit score (${simulatedScore}) below minimum requirement (${minScore})`;
          validationCache.set(cacheKey, result);
          return result;
        }
        
        validationCache.set(cacheKey, true);
        return true;
      } catch (error) {
        return 'Unable to perform credit check at this time';
      }
    }
  };

  /**
   * Conditional validation patterns
   */
  const conditionalValidators = {
    // Required if another field has a specific value
    requiredIf: (dependentField, dependentValue, message) => (value, allData) => {
      const dependentFieldValue = getNestedValue(allData, dependentField);
      
      if (dependentFieldValue === dependentValue) {
        if (!value || value === '') {
          return message || `This field is required when ${dependentField} is ${dependentValue}`;
        }
      }
      
      return true;
    },

    // Minimum value based on another field
    minValueIf: (dependentField, multiplier, message) => (value, allData) => {
      const dependentFieldValue = Number(getNestedValue(allData, dependentField)) || 0;
      const minValue = dependentFieldValue * multiplier;
      const currentValue = Number(value) || 0;
      
      if (currentValue < minValue) {
        return message || `Value must be at least ${minValue.toLocaleString()} (${multiplier}x ${dependentField})`;
      }
      
      return true;
    },

    // Cross-field comparison
    greaterThan: (compareField, message) => (value, allData) => {
      const compareValue = Number(getNestedValue(allData, compareField)) || 0;
      const currentValue = Number(value) || 0;
      
      if (currentValue <= compareValue) {
        return message || `Value must be greater than ${compareField} (${compareValue})`;
      }
      
      return true;
    },

    // Date comparison
    dateAfter: (compareField, message) => (value, allData) => {
      if (!value) return true;
      
      const compareValue = getNestedValue(allData, compareField);
      if (!compareValue) return true;
      
      const currentDate = new Date(value);
      const compareDate = new Date(compareValue);
      
      if (isNaN(currentDate.getTime()) || isNaN(compareDate.getTime())) {
        return 'Invalid date format';
      }
      
      if (currentDate <= compareDate) {
        return message || `Date must be after ${compareField}`;
      }
      
      return true;
    }
  };

  /**
   * Utility function to get nested object values
   */
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  /**
   * Create validation rule from pattern
   */
  const createValidator = (pattern, ...args) => {
    const [category, validatorName] = pattern.split('.');
    
    const validatorMap = {
      financial: financialValidators,
      identity: identityValidators,
      business: businessValidators,
      address: addressValidators,
      date: dateValidators,
      async: asyncValidators,
      conditional: conditionalValidators
    };
    
    const categoryValidators = validatorMap[category];
    if (!categoryValidators || !categoryValidators[validatorName]) {
      throw new Error(`Unknown validation pattern: ${pattern}`);
    }
    
    const validator = categoryValidators[validatorName];
    return typeof validator === 'function' ? validator(...args) : validator;
  };

  /**
   * Batch validation for multiple fields
   */
  const validateBatch = async (fields, data) => {
    const results = {};
    const promises = [];
    
    for (const [fieldPath, validators] of Object.entries(fields)) {
      const value = getNestedValue(data, fieldPath);
      
      for (const validator of validators) {
        if (typeof validator === 'function') {
          const result = validator(value, data);
          
          if (result instanceof Promise) {
            promises.push(
              result.then(res => ({ fieldPath, result: res }))
                   .catch(err => ({ fieldPath, result: err.message }))
            );
          } else if (result !== true) {
            results[fieldPath] = result;
            break; // Stop on first error
          }
        }
      }
    }
    
    // Wait for async validations
    const asyncResults = await Promise.all(promises);
    asyncResults.forEach(({ fieldPath, result }) => {
      if (result !== true && !results[fieldPath]) {
        results[fieldPath] = result;
      }
    });
    
    return results;
  };

  /**
   * Clear validation cache
   */
  const clearCache = (pattern) => {
    if (pattern) {
      for (const key of validationCache.keys()) {
        if (key.includes(pattern)) {
          validationCache.delete(key);
        }
      }
    } else {
      validationCache.clear();
    }
  };

  return {
    // Validator categories
    financialValidators,
    identityValidators,
    businessValidators,
    addressValidators,
    dateValidators,
    asyncValidators,
    conditionalValidators,
    
    // Utilities
    createValidator,
    validateBatch,
    clearCache,
    getNestedValue
  };
}