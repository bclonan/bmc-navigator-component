# State Management Guide

## Overview

This guide covers state management patterns and best practices for the Mariner Finance Vue 3 component library. We use a combination of Vue 3's Composition API, Pinia for global state management, and specialized composables for complex data handling.

## Architecture

### 1. Local Component State
Use Vue 3's `ref` and `reactive` for component-level state:

```javascript
import { ref, reactive, computed } from 'vue';

export default {
  setup() {
    // Simple reactive values
    const isLoading = ref(false);
    const errorMessage = ref('');
    
    // Complex reactive objects
    const formData = reactive({
      customerName: '',
      loanAmount: 0,
      creditScore: null
    });
    
    // Computed properties
    const isFormValid = computed(() => {
      return formData.customerName && 
             formData.loanAmount > 0 && 
             formData.creditScore;
    });
    
    return {
      isLoading,
      errorMessage,
      formData,
      isFormValid
    };
  }
};
```

### 2. Global State with Pinia

For application-wide state, we use Pinia stores:

```javascript
// stores/loanApplicationStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useLoanApplicationStore = defineStore('loanApplication', () => {
  // State
  const applications = ref([]);
  const currentApplication = ref(null);
  const isProcessing = ref(false);
  
  // Getters
  const pendingApplications = computed(() => 
    applications.value.filter(app => app.status === 'pending')
  );
  
  const approvedApplications = computed(() =>
    applications.value.filter(app => app.status === 'approved')
  );
  
  // Actions
  const addApplication = (application) => {
    applications.value.push({
      ...application,
      id: generateId(),
      createdAt: new Date(),
      status: 'pending'
    });
  };
  
  const updateApplicationStatus = (id, status) => {
    const app = applications.value.find(a => a.id === id);
    if (app) {
      app.status = status;
      app.updatedAt = new Date();
    }
  };
  
  const clearApplications = () => {
    applications.value = [];
    currentApplication.value = null;
  };
  
  return {
    // State
    applications,
    currentApplication,
    isProcessing,
    // Getters
    pendingApplications,
    approvedApplications,
    // Actions
    addApplication,
    updateApplicationStatus,
    clearApplications
  };
});

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
```

### 3. Specialized Composables

For complex business logic, use custom composables:

#### Form Validation Composable

```javascript
// composables/useFormValidation.js
import { ref, reactive, computed } from 'vue';

export function useFormValidation(initialData = {}) {
  const data = reactive({ ...initialData });
  const errors = ref({});
  const touched = ref({});
  const rules = ref({});
  
  const isValid = computed(() => {
    return Object.keys(errors.value).length === 0;
  });
  
  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0;
  });
  
  const setRules = (fieldRules) => {
    rules.value = { ...rules.value, ...fieldRules };
  };
  
  const validateField = (fieldName) => {
    const value = data[fieldName];
    const fieldRules = rules.value[fieldName] || [];
    
    delete errors.value[fieldName];
    
    for (const rule of fieldRules) {
      const result = rule(value);
      if (result !== true) {
        errors.value[fieldName] = result;
        break;
      }
    }
  };
  
  const validateAll = () => {
    Object.keys(rules.value).forEach(validateField);
    return isValid.value;
  };
  
  const touch = (fieldName) => {
    touched.value[fieldName] = true;
  };
  
  const reset = () => {
    Object.keys(data).forEach(key => {
      data[key] = initialData[key] || '';
    });
    errors.value = {};
    touched.value = {};
  };
  
  return {
    data,
    errors,
    touched,
    isValid,
    hasErrors,
    setRules,
    validateField,
    validateAll,
    touch,
    reset
  };
}
```

#### Storage Engine Composable

```javascript
// composables/useStorageEngine.js
import { ref, watch, computed } from 'vue';

export function useStorageEngine(options = {}) {
  const {
    key = 'mariner-app-data',
    storage = localStorage,
    autoSave = true,
    encryption = false
  } = options;
  
  const data = ref({});
  const isLoading = ref(false);
  const lastSaved = ref(null);
  
  // Load data from storage
  const load = () => {
    try {
      isLoading.value = true;
      const stored = storage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        data.value = encryption ? decrypt(parsed) : parsed;
      }
    } catch (error) {
      console.error('Failed to load data from storage:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  // Save data to storage
  const save = () => {
    try {
      const toStore = encryption ? encrypt(data.value) : data.value;
      storage.setItem(key, JSON.stringify(toStore));
      lastSaved.value = new Date();
    } catch (error) {
      console.error('Failed to save data to storage:', error);
    }
  };
  
  // Auto-save on data changes
  if (autoSave) {
    watch(data, save, { deep: true });
  }
  
  // Set value
  const set = (path, value) => {
    setNestedValue(data.value, path, value);
  };
  
  // Get value
  const get = (path) => {
    return getNestedValue(data.value, path);
  };
  
  // Clear all data
  const clear = () => {
    data.value = {};
    storage.removeItem(key);
  };
  
  // Initialize
  load();
  
  return {
    data: readonly(data),
    isLoading,
    lastSaved,
    load,
    save,
    set,
    get,
    clear
  };
}

// Helper functions
function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    if (!current[key]) current[key] = {};
    return current[key];
  }, obj);
  target[lastKey] = value;
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function encrypt(data) {
  // Simple encryption - replace with proper encryption in production
  return btoa(JSON.stringify(data));
}

function decrypt(data) {
  // Simple decryption - replace with proper decryption in production
  return JSON.parse(atob(data));
}

function readonly(obj) {
  return new Proxy(obj, {
    set() {
      console.warn('Attempting to modify readonly data');
      return false;
    }
  });
}
```

## Best Practices

### 1. State Separation
- **Local State**: UI state, form inputs, temporary data
- **Store State**: Shared data, user session, application settings
- **Persistent State**: User preferences, cached data, offline capabilities

### 2. State Updates
```javascript
// ✅ Good - Immutable updates
const updateCustomer = (id, updates) => {
  customers.value = customers.value.map(customer => 
    customer.id === id 
      ? { ...customer, ...updates }
      : customer
  );
};

// ❌ Bad - Direct mutation
const updateCustomer = (id, updates) => {
  const customer = customers.value.find(c => c.id === id);
  customer.name = updates.name; // Direct mutation
};
```

### 3. Async State Management
```javascript
export function useAsyncData(fetchFn) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);
  
  const execute = async (...args) => {
    try {
      isLoading.value = true;
      error.value = null;
      data.value = await fetchFn(...args);
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };
  
  const retry = () => execute();
  
  return {
    data: readonly(data),
    error: readonly(error),
    isLoading: readonly(isLoading),
    execute,
    retry
  };
}
```

### 4. Error Handling
```javascript
export const useErrorStore = defineStore('errors', () => {
  const errors = ref([]);
  
  const addError = (error) => {
    const errorItem = {
      id: generateId(),
      message: error.message || 'An error occurred',
      type: error.type || 'error',
      timestamp: new Date(),
      context: error.context || null
    };
    errors.value.push(errorItem);
    
    // Auto-remove after 5 seconds
    setTimeout(() => removeError(errorItem.id), 5000);
  };
  
  const removeError = (id) => {
    const index = errors.value.findIndex(e => e.id === id);
    if (index > -1) {
      errors.value.splice(index, 1);
    }
  };
  
  const clearErrors = () => {
    errors.value = [];
  };
  
  return {
    errors,
    addError,
    removeError,
    clearErrors
  };
});
```

## Testing State Management

### Unit Testing Stores
```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLoanApplicationStore } from '../stores/loanApplicationStore';

describe('Loan Application Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add application correctly', () => {
    const store = useLoanApplicationStore();
    const application = {
      customerName: 'John Doe',
      amount: 25000,
      term: 60
    };
    
    store.addApplication(application);
    
    expect(store.applications).toHaveLength(1);
    expect(store.applications[0]).toMatchObject(application);
    expect(store.applications[0].status).toBe('pending');
  });

  it('should update application status', () => {
    const store = useLoanApplicationStore();
    store.addApplication({ customerName: 'Jane Doe' });
    const appId = store.applications[0].id;
    
    store.updateApplicationStatus(appId, 'approved');
    
    expect(store.applications[0].status).toBe('approved');
  });
});
```

### Integration Testing
```javascript
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import LoanApplicationForm from '../components/LoanApplicationForm.vue';

describe('Loan Application Form Integration', () => {
  it('should submit application to store', async () => {
    const wrapper = mount(LoanApplicationForm, {
      global: {
        plugins: [createPinia()]
      }
    });
    
    await wrapper.find('[data-testid="customer-name"]').setValue('John Doe');
    await wrapper.find('[data-testid="loan-amount"]').setValue('25000');
    await wrapper.find('[data-testid="submit-btn"]').trigger('click');
    
    const store = useLoanApplicationStore();
    expect(store.applications).toHaveLength(1);
  });
});
```

## Performance Optimization

### 1. Lazy Loading
```javascript
// Lazy load store modules
const useLoanApplicationStore = () => {
  return import('../stores/loanApplicationStore').then(
    module => module.useLoanApplicationStore()
  );
};
```

### 2. Computed Caching
```javascript
const expensiveComputation = computed(() => {
  // Expensive operation only runs when dependencies change
  return applications.value
    .filter(app => app.status === 'approved')
    .reduce((total, app) => total + app.amount, 0);
});
```

### 3. Selective Reactivity
```javascript
// Use shallowRef for large arrays that don't need deep reactivity
const largeDataset = shallowRef([]);

// Use markRaw for non-reactive objects
const chartInstance = markRaw(new Chart());
```

## Common Patterns

### 1. Form State Pattern
```javascript
export function useFormState(initialData) {
  const formData = reactive({ ...initialData });
  const isDirty = ref(false);
  const isSubmitting = ref(false);
  
  const original = { ...initialData };
  
  const hasChanges = computed(() => {
    return JSON.stringify(formData) !== JSON.stringify(original);
  });
  
  const reset = () => {
    Object.assign(formData, original);
    isDirty.value = false;
  };
  
  const submit = async (submitFn) => {
    try {
      isSubmitting.value = true;
      await submitFn(formData);
      isDirty.value = false;
    } finally {
      isSubmitting.value = false;
    }
  };
  
  return {
    formData,
    isDirty,
    isSubmitting,
    hasChanges,
    reset,
    submit
  };
}
```

### 2. Loading State Pattern
```javascript
export function useLoadingState() {
  const isLoading = ref(false);
  const error = ref(null);
  
  const withLoading = async (asyncFn) => {
    try {
      isLoading.value = true;
      error.value = null;
      return await asyncFn();
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  
  return {
    isLoading,
    error,
    withLoading
  };
}
```

This state management approach provides scalable, maintainable, and testable patterns for the Mariner Finance component library.