# Mariner Finance Vue 3 Component Library - Developer Guide

## Introduction

Welcome to the comprehensive Mariner Finance Vue 3 Component Library. This modern, enterprise-grade library provides Material-UI-inspired components specifically designed for financial applications, featuring advanced form rendering, responsive email templates, marketing widgets, and robust state management.

## Quick Start

### Installation

```bash
npm install @mariner-finance/vue-components
```

### Basic Usage

```javascript
import { createApp } from 'vue';
import { MarinerFinanceComponents } from '@mariner-finance/vue-components';
import '@mariner-finance/vue-components/dist/style.css';

const app = createApp(App);
app.use(MarinerFinanceComponents);
app.mount('#app');
```

### Component Import

```vue
<template>
  <div>
    <!-- Basic Button -->
    <MButton variant="filled" color="primary">
      Apply for Loan
    </MButton>
    
    <!-- Form Input with Validation -->
    <MInput
      label="Loan Amount"
      type="currency"
      v-model="loanAmount"
      :error="hasError"
      helper-text="Enter amount between $1,000 and $50,000"
    />
    
    <!-- Data Table with Enhanced Features -->
    <MTable
      :data="customerData"
      :columns="tableColumns"
      :selectable="true"
      :show-filters="true"
      @row-click="handleRowClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { MButton, MInput, MTable } from '@mariner-finance/vue-components';

const loanAmount = ref(25000);
const hasError = ref(false);
const customerData = ref([]);
const tableColumns = ref([]);

const handleRowClick = (row) => {
  console.log('Selected customer:', row);
};
</script>
```

## Architecture Overview

### Core Principles

1. **Accessibility First**: WCAG 2.1 AA compliant components with full keyboard navigation and screen reader support
2. **Brand Consistency**: Mariner Finance brand colors, typography, and styling throughout all components
3. **Responsive Design**: Mobile-first approach with fluid layouts adapting to all screen sizes
4. **Performance Optimized**: Tree-shakable imports, lazy loading, and efficient state management
5. **Type Safety**: Full TypeScript support with comprehensive type definitions

### Component Categories

#### 1. Core Components (Material-UI Analog)
- **Form Controls**: MButton, MInput, MSelect, MCheckbox, MRadio, MSwitch
- **Data Display**: MTable, MCard, MChip, MAvatar, MBadge, MTooltip
- **Feedback**: MAlert, MSnackbar, MProgress, MBackdrop, MSkeleton
- **Navigation**: MBreadcrumbs, MDrawer, MAppBar, MTabs, MPagination
- **Layout**: MContainer, MGrid, MStack, MDivider, MBox

#### 2. Financial Components
- **Form Rendering**: Dynamic form generator with validation and conditional logic
- **Loan Calculator**: Interactive payment calculators with real-time updates
- **Rate Display**: APR tables, comparison widgets, and promotional rates
- **Account Management**: Balance displays, payment history, and transaction tables

#### 3. Email Templates
- **Loan Notifications**: Approval, denial, and status update emails
- **Payment Reminders**: Due date notifications with payment options
- **Marketing Campaigns**: Promotional emails with special offers
- **Account Updates**: Security alerts and account changes

#### 4. Marketing Widgets
- **Lead Generation**: Quick apply forms and pre-qualification tools
- **Rate Comparison**: Competitive analysis tables and calculators
- **Customer Testimonials**: Rotating success stories and reviews
- **Branch Locator**: Store finder with maps and contact information

## Component Structure

### Standard Component Pattern

```vue
<template>
  <div :class="componentClasses" :style="componentStyles">
    <slot name="prepend" />
    
    <div class="component-content">
      <slot />
    </div>
    
    <slot name="append" />
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useTheme } from '@/composables/useTheme';
import { useBrandColors } from '@/composables/useBrandColors';

export default defineComponent({
  name: 'MComponent',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'primary', 'secondary'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const { currentTheme } = useTheme();
    const { getPrimaryColor } = useBrandColors();
    
    const componentClasses = computed(() => ({
      'mf-component': true,
      [`mf-component--${props.variant}`]: true,
      [`mf-component--${props.size}`]: true,
      'mf-component--disabled': props.disabled
    }));
    
    const componentStyles = computed(() => ({
      '--primary-color': getPrimaryColor(),
      '--theme-mode': currentTheme.value
    }));
    
    const handleClick = (event) => {
      if (!props.disabled) {
        emit('click', event);
      }
    };
    
    return {
      componentClasses,
      componentStyles,
      handleClick
    };
  }
});
</script>

<style scoped>
.mf-component {
  /* Base component styles */
  font-family: var(--mf-font-family);
  transition: all 0.2s ease;
}

.mf-component--primary {
  color: var(--primary-color);
}

.mf-component--disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
```

## State Management Architecture

### Pinia Store Pattern

```javascript
// stores/loanApplicationStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorageEngine } from '@/composables/useStorageEngine';

export const useLoanApplicationStore = defineStore('loanApplication', () => {
  // State
  const applications = ref([]);
  const currentStep = ref(1);
  const isSubmitting = ref(false);
  
  // Storage integration
  const { save, load } = useStorageEngine({
    key: 'loan-applications',
    autoSave: true
  });
  
  // Getters
  const pendingApplications = computed(() =>
    applications.value.filter(app => app.status === 'pending')
  );
  
  const completedApplications = computed(() =>
    applications.value.filter(app => app.status === 'completed')
  );
  
  // Actions
  const createApplication = (applicationData) => {
    const newApplication = {
      id: generateId(),
      ...applicationData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    applications.value.push(newApplication);
    save({ applications: applications.value });
    
    return newApplication;
  };
  
  const updateApplication = (id, updates) => {
    const index = applications.value.findIndex(app => app.id === id);
    if (index !== -1) {
      applications.value[index] = {
        ...applications.value[index],
        ...updates,
        updatedAt: new Date()
      };
      save({ applications: applications.value });
    }
  };
  
  const submitApplication = async (applicationId) => {
    try {
      isSubmitting.value = true;
      
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      updateApplication(applicationId, { 
        status: 'submitted',
        submittedAt: new Date()
      });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const initialize = async () => {
    const saved = await load();
    if (saved?.applications) {
      applications.value = saved.applications;
    }
  };
  
  return {
    // State
    applications,
    currentStep,
    isSubmitting,
    // Getters
    pendingApplications,
    completedApplications,
    // Actions
    createApplication,
    updateApplication,
    submitApplication,
    initialize
  };
});

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
```

### Composable Pattern

```javascript
// composables/useLoanCalculator.js
import { ref, computed, watch } from 'vue';

export function useLoanCalculator(initialAmount = 25000) {
  const loanAmount = ref(initialAmount);
  const interestRate = ref(8.99);
  const termMonths = ref(60);
  
  const monthlyPayment = computed(() => {
    const principal = loanAmount.value;
    const monthlyRate = (interestRate.value / 100) / 12;
    const numPayments = termMonths.value;
    
    if (monthlyRate === 0) {
      return principal / numPayments;
    }
    
    const monthlyPayment = principal * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
      
    return Math.round(monthlyPayment * 100) / 100;
  });
  
  const totalCost = computed(() => {
    return monthlyPayment.value * termMonths.value;
  });
  
  const totalInterest = computed(() => {
    return totalCost.value - loanAmount.value;
  });
  
  const paymentSchedule = computed(() => {
    const schedule = [];
    let remainingBalance = loanAmount.value;
    const monthlyRate = (interestRate.value / 100) / 12;
    
    for (let month = 1; month <= termMonths.value; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment.value - interestPayment;
      remainingBalance -= principalPayment;
      
      schedule.push({
        month,
        payment: monthlyPayment.value,
        principal: Math.round(principalPayment * 100) / 100,
        interest: Math.round(interestPayment * 100) / 100,
        balance: Math.max(0, Math.round(remainingBalance * 100) / 100)
      });
    }
    
    return schedule;
  });
  
  // Watchers for validation
  watch(loanAmount, (newAmount) => {
    if (newAmount < 1000) loanAmount.value = 1000;
    if (newAmount > 50000) loanAmount.value = 50000;
  });
  
  watch(termMonths, (newTerm) => {
    if (newTerm < 12) termMonths.value = 12;
    if (newTerm > 84) termMonths.value = 84;
  });
  
  const updateLoanAmount = (amount) => {
    loanAmount.value = Math.max(1000, Math.min(50000, amount));
  };
  
  const updateTerm = (months) => {
    termMonths.value = Math.max(12, Math.min(84, months));
  };
  
  const updateRate = (rate) => {
    interestRate.value = Math.max(0.1, Math.min(35.99, rate));
  };
  
  return {
    // State
    loanAmount,
    interestRate,
    termMonths,
    // Computed
    monthlyPayment,
    totalCost,
    totalInterest,
    paymentSchedule,
    // Methods
    updateLoanAmount,
    updateTerm,
    updateRate
  };
}
```

## Testing Strategy

### Unit Testing

```javascript
// tests/components/MButton.test.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MButton from '@/components/mui/MButton.vue';

describe('MButton', () => {
  it('renders with correct text', () => {
    const wrapper = mount(MButton, {
      props: { text: 'Apply Now' }
    });
    
    expect(wrapper.text()).toBe('Apply Now');
  });
  
  it('emits click event when clicked', async () => {
    const wrapper = mount(MButton, {
      props: { text: 'Click Me' }
    });
    
    await wrapper.trigger('click');
    
    expect(wrapper.emitted('click')).toHaveLength(1);
  });
  
  it('applies correct variant classes', () => {
    const wrapper = mount(MButton, {
      props: { 
        text: 'Primary Button',
        variant: 'filled',
        color: 'primary'
      }
    });
    
    expect(wrapper.classes()).toContain('mf-button-primary');
    expect(wrapper.classes()).toContain('mf-button-filled');
  });
  
  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(MButton, {
      props: { 
        text: 'Disabled Button',
        disabled: true
      }
    });
    
    expect(wrapper.attributes('disabled')).toBeDefined();
    expect(wrapper.classes()).toContain('mf-button-disabled');
  });
});
```

### Integration Testing

```javascript
// tests/integration/LoanApplication.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import LoanApplicationForm from '@/components/forms/LoanApplicationForm.vue';
import { useLoanApplicationStore } from '@/stores/loanApplicationStore';

describe('Loan Application Integration', () => {
  let wrapper;
  let store;
  
  beforeEach(() => {
    const pinia = createPinia();
    
    wrapper = mount(LoanApplicationForm, {
      global: {
        plugins: [pinia]
      }
    });
    
    store = useLoanApplicationStore();
  });
  
  it('submits loan application successfully', async () => {
    // Fill out form
    await wrapper.find('[data-testid="customer-name"]').setValue('John Doe');
    await wrapper.find('[data-testid="loan-amount"]').setValue('25000');
    await wrapper.find('[data-testid="annual-income"]').setValue('75000');
    
    // Submit form
    await wrapper.find('[data-testid="submit-button"]').trigger('click');
    
    // Verify application was created
    expect(store.applications).toHaveLength(1);
    expect(store.applications[0].customerName).toBe('John Doe');
    expect(store.applications[0].loanAmount).toBe(25000);
  });
});
```

### Visual Regression Testing

```javascript
// tests/visual/EmailTemplates.visual.test.js
import { describe, it } from 'vitest';
import { setupVisualTesting } from '@/utils/visualTesting';

describe('Email Templates Visual Tests', () => {
  const { captureScreenshot, compareWithBaseline } = setupVisualTesting();
  
  it('renders loan approval email correctly', async () => {
    const screenshot = await captureScreenshot('EmailTemplates', {
      templateType: 'approval',
      customerName: 'John Smith',
      loanAmount: 25000
    });
    
    await compareWithBaseline('email-approval-standard', screenshot);
  });
  
  it('renders payment reminder email correctly', async () => {
    const screenshot = await captureScreenshot('EmailTemplates', {
      templateType: 'payment-reminder',
      customerName: 'Jane Doe',
      paymentAmount: 515
    });
    
    await compareWithBaseline('email-payment-reminder', screenshot);
  });
});
```

## Performance Optimization

### Code Splitting

```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/loan-application',
    name: 'LoanApplication',
    component: () => import('@/views/LoanApplication.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/customer-portal',
    name: 'CustomerPortal',
    component: () => import('@/views/CustomerPortal.vue'),
    meta: { requiresAuth: true }
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
```

### Tree Shaking

```javascript
// main.js - Import only needed components
import { createApp } from 'vue';
import { 
  MButton, 
  MInput, 
  MTable, 
  MCard 
} from '@mariner-finance/vue-components';

const app = createApp(App);

// Register only used components
app.component('MButton', MButton);
app.component('MInput', MInput);
app.component('MTable', MTable);
app.component('MCard', MCard);

app.mount('#app');
```

## Deployment

### Build Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MarinerFinanceComponents',
      fileName: (format) => `mariner-finance-components.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
```

### Package.json Configuration

```json
{
  "name": "@mariner-finance/vue-components",
  "version": "1.0.0",
  "type": "module",
  "files": [
    "dist"
  ],
  "main": "./dist/mariner-finance-components.umd.js",
  "module": "./dist/mariner-finance-components.es.js",
  "exports": {
    ".": {
      "import": "./dist/mariner-finance-components.es.js",
      "require": "./dist/mariner-finance-components.umd.js"
    },
    "./dist/style.css": "./dist/style.css"
  },
  "peerDependencies": {
    "vue": "^3.3.0"
  },
  "scripts": {
    "build": "vite build",
    "build:lib": "vite build --config vite.lib.config.js",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

This comprehensive developer guide provides everything needed to understand, implement, and extend the Mariner Finance Vue 3 Component Library effectively.