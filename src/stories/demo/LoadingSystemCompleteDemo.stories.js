import LoadingSystemDemo from '../../components/demo/LoadingSystemDemo.vue';

export default {
  title: 'Demo/Loading System Complete Demo',
  component: LoadingSystemDemo,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Complete Loading System Demonstration

This comprehensive demo showcases all the loading system components working together in realistic financial application scenarios:

## Features Demonstrated

### 🎭 Skeleton Loading Components
- **Basic Skeletons**: Text, circular, rectangular, and button variants
- **Financial Card Layout**: Credit card or loan application card skeletons
- **Loan Applications List**: List of loan applications with avatars and actions
- **Payment History Table**: Tabular financial data skeleton

### ⚡ Async Data Loading Management
- **Loan Application Status**: Complete async loading with error handling and retry logic
- **Credit Score Loading**: Specialized loading for credit score data
- **Auto-retry**: Automatic retry with exponential backoff
- **Error States**: User-friendly error messages with manual retry options

### 🎯 Interactive Motion & Feedback
- **Payment Buttons**: Ripple effects with loading states and progress indicators
- **Form Transitions**: Smooth animations for showing/hiding financial forms
- **State Management**: Success, error, and loading states with visual feedback
- **Progress Tracking**: Real-time progress indicators for payment processing

### 🎮 Interactive Controls
- Toggle loading states on/off
- Simulate error conditions
- Reset entire demo
- Real-time state changes

## Financial Use Cases

This demo represents real-world scenarios in financial applications:

1. **Loan Application Processing**: Loading states while fetching application status
2. **Credit Score Retrieval**: Specialized loading for credit reporting
3. **Payment Processing**: Interactive feedback during payment transactions
4. **Form Interactions**: Smooth transitions for financial forms

## Technical Implementation

- **Vue 3 Composition API**: Modern reactive patterns
- **Material Design**: Consistent with Google's design principles
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: GPU-accelerated animations, efficient state management
- **Responsive**: Mobile-optimized layouts and interactions

## Usage in Your Application

Each component can be used independently or composed together for complex UIs:

\`\`\`vue
<template>
  <!-- Skeleton loading for loan data -->
  <MSkeletonGroup layout="card" :lines="4" :show-image="true" />
  
  <!-- Async loading with error handling -->
  <MAsyncLoader :loading="loading" :error="error" @retry="retry">
    <LoanApplicationData />
  </MAsyncLoader>
  
  <!-- Interactive payment button -->
  <MMotionRipple>
    <MMotionFeedback :state="paymentState">
      <button @click="processPayment">Pay Now</button>
    </MMotionFeedback>
  </MMotionRipple>
</template>
\`\`\`

Try the interactive controls below to see all components in action!
        `
      }
    }
  },
  argTypes: {
    // No args needed for this demo
  }
};

// Default story
export const CompleteDemo = {
  render: () => ({
    components: { LoadingSystemDemo },
    template: '<LoadingSystemDemo />'
  })
};

// Focused skeleton demo
export const SkeletonFocus = {
  render: () => ({
    components: { LoadingSystemDemo },
    template: `
      <div style="max-width: 800px; margin: 2rem auto; padding: 2rem;">
        <h2 style="margin-bottom: 2rem; text-align: center;">Skeleton Loading Showcase</h2>
        <LoadingSystemDemo />
        <style>
          /* Hide non-skeleton sections for focused view */
          .demo-section:not(:first-of-type) {
            display: none;
          }
        </style>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Focused view of skeleton loading components for financial applications.'
      }
    }
  }
};

// Focused async loading demo  
export const AsyncLoadingFocus = {
  render: () => ({
    components: { LoadingSystemDemo },
    template: `
      <div style="max-width: 800px; margin: 2rem auto; padding: 2rem;">
        <h2 style="margin-bottom: 2rem; text-align: center;">Async Loading Showcase</h2>
        <LoadingSystemDemo />
        <style>
          /* Hide non-async sections for focused view */
          .demo-section:not(:nth-of-type(2)):not(:last-of-type) {
            display: none;
          }
        </style>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Focused view of async loading management with error handling and retry logic.'
      }
    }
  }
};

// Focused motion demo
export const MotionFocus = {
  render: () => ({
    components: { LoadingSystemDemo },
    template: `
      <div style="max-width: 800px; margin: 2rem auto; padding: 2rem;">
        <h2 style="margin-bottom: 2rem; text-align: center;">Interactive Motion Showcase</h2>
        <LoadingSystemDemo />
        <style>
          /* Hide non-motion sections for focused view */
          .demo-section:not(:nth-of-type(3)):not(:last-of-type) {
            display: none;
          }
        </style>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Focused view of interactive motion and feedback components for financial interactions.'
      }
    }
  }
};
